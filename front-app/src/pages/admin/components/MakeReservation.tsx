import type { Company } from "@/api/models/department";
import type { AvailableResource, Resource } from "@/api/models/resource";
import type { User } from "@/api/models/user";
import { getCompanyData } from "@/api/services/department-service";
import { createReservation } from "@/api/services/reservation-service";
import { fetchAvailableResources } from "@/api/services/resource-service";
import { getEmployees } from "@/api/services/user-service";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { IntervalTimePicker } from "@/pages/shared/IntervalTimePicker";
import { useKeycloak } from "@/pages/shared/KeycloakProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const baseFormSchema = z.object({
  date: z.string().refine(
    (val) => {
      const date = new Date(val);
      return (
        !isNaN(date.getTime()) &&
        date >= new Date(new Date().setHours(0, 0, 0, 0))
      );
    },
    {
      message: "Please enter a valid date not earlier than today.",
    }
  ),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  reason: z.string().min(10, {
    message: "Reason must be at least 10 characters.",
  }),
  resourceTypeId: z.string().optional(),
  resourceId: z.string().optional(),
});

const formSchemaAdmin = baseFormSchema.extend({
  employeeId: z
    .string({
      required_error: "Please select an employee.",
    })
    .refine((value) => value.trim() !== "", {
      message: "Please select an employee.",
    }),
});

const formSchemaEmployee = baseFormSchema;

type FormSchemaType =
  | z.infer<typeof formSchemaAdmin>
  | z.infer<typeof formSchemaEmployee>;

export default function MakeReservation() {
  const { roles, userId } = useKeycloak();
  const [availableResources, setAvailableResources] = useState<
    AvailableResource[]
  >([]);
  const [employees, setEmployees] = useState<User[]>([]);
  const [company, setCompany] = useState<Company | null>(null);
  const [selectedResources, setSelectedResources] = useState<Resource[]>([]);
  const [selectedResourceType, setSelectedResourceType] = useState<
    string | null
  >(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isAdmin = roles.includes("admin");
  const formSchema = isAdmin ? formSchemaAdmin : formSchemaEmployee;

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: "",
      startTime: "",
      endTime: "",
      reason: "",
      resourceTypeId: "",
      resourceId: "",
      ...(isAdmin ? { employeeId: "" } : {}),
    },
  });

  const { date, startTime, endTime } = form.watch();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        if (isAdmin) {
          const data = await getEmployees();
          setEmployees(data);
        }
        const companyData: Company = await getCompanyData();
        setCompany(companyData);
      } catch (error) {
        toast.error("Couldn't load initial data!");
      }
    };

    fetchInitialData();
  }, [isAdmin]);

  const handleFetchResources = async () => {
    if (date && startTime && endTime) {
      setIsLoading(true);
      try {
        const resources: AvailableResource[] = await fetchAvailableResources({
          date,
          startTime,
          endTime,
        });
        setAvailableResources(resources);
        setIsLoading(false);
      } catch (error) {
        setAvailableResources([]);
        setIsLoading(false);
      }
    }
  };

  const onSubmit = async (values: any) => {
    if (selectedResources.length === 0) {
      setFormError("Please select at least one resource.");
      return;
    }
    setFormError(null);
    const result = {
      ...values,
      resources: selectedResources,
      date: new Date(values.date).toISOString().split("T")[0], // Format as yyyy-MM-dd
    };
    console.log(result);

    const employeeId = !isAdmin ? userId : values.employeeId;

    try {
      await createReservation({
        ...result,
        admin: isAdmin,
        employeeId: employeeId,
      });
      toast.success("Reservation created successfully!");
    } catch (error) {
      toast.error("Couldn't create reservation!");
    }
  };

  const handleResourceTypeChange = (value: string) => {
    setSelectedResourceType(value);
    form.setValue("resourceTypeId", value);
    form.setValue("resourceId", "");
  };

  const [selectedResourceTypes, setSelectedResourceTypes] = useState<
    Set<string>
  >(new Set());

  const handleResourceChange = (value: string) => {
    const resourceType = availableResources.find(
      (rt) => rt.id.toString() === selectedResourceType
    );

    if (resourceType) {
      const resource = resourceType.resources.find(
        (r: any) => r.id.toString() === value
      );

      if (resource && !selectedResources.some((r) => r.id === resource.id)) {
        setSelectedResources([
          ...selectedResources,
          { ...resource, resourceTypeId: resourceType.id },
        ]);
        setSelectedResourceTypes(
          (prev) => new Set([...prev, selectedResourceType!])
        );
        setSelectedResourceType(null);
        form.setValue("resourceTypeId", "");
      }

      form.setValue("resourceId", "");
    }
  };

  const removeResource = (resourceId: number) => {
    setSelectedResources((prev) => {
      const updatedResources = prev.filter((r) => r.id !== resourceId);
      const remainingTypes = new Set(
        updatedResources.map((r) => r.resourceTypeId.toString())
      );

      setSelectedResourceTypes(remainingTypes);
      return updatedResources;
    });
  };

  return (
    <div>
      {roles.includes("employee") && !roles.includes("admin") && (
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Make Reservation
        </h1>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Select Date and Time</CardTitle>
              <CardDescription>
                Choose the date and time for your reservation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reservation Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field: { onChange } }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <IntervalTimePicker
                          workStartTime={company?.workTimeStart ?? "8:00"}
                          workEndTime={company?.workTimeEnd ?? "16:00"}
                          onIntervalSelect={(start, end) => {
                            onChange(start);
                            form.setValue("endTime", end);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                onClick={handleFetchResources}
                disabled={!date || !startTime || !endTime || isLoading}
              >
                {isLoading
                  ? "Fetching Resources..."
                  : "Fetch Available Resources"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reservation Details</CardTitle>
              <CardDescription>
                Fill in the details for your reservation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isAdmin && (
                <FormField
                  control={form.control}
                  name="employeeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employee</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an employee" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {employees.map((employee) => (
                            <SelectItem
                              key={employee.id}
                              value={employee.userId}
                            >
                              {employee.firstName} {employee.lastName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter reason for reservation"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a brief explanation for the reservation.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {availableResources.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Select Resources</CardTitle>
                <CardDescription>
                  Choose the resources you need for your reservation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="resourceTypeId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Resource Type</FormLabel>
                        <Select
                          onValueChange={handleResourceTypeChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a resource type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {availableResources.map((resourceType) => (
                              <SelectItem
                                key={resourceType.id}
                                value={resourceType.id.toString()}
                                disabled={selectedResourceTypes.has(
                                  resourceType.id.toString()
                                )}
                              >
                                {resourceType.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {selectedResourceType && (
                    <FormField
                      control={form.control}
                      name="resourceId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Resource</FormLabel>
                          <Select
                            onValueChange={handleResourceChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a resource" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {availableResources
                                .find(
                                  (rt) =>
                                    rt.id.toString() === selectedResourceType
                                )
                                ?.resources.map((resource: any) => (
                                  <SelectItem
                                    key={resource.id}
                                    value={resource.id.toString()}
                                    disabled={selectedResources.some(
                                      (r) => r.id === resource.id
                                    )}
                                  >
                                    {resource.name}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
                {selectedResources.length > 0 && (
                  <div className="space-y-2">
                    <FormLabel>Selected Resources</FormLabel>
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                      {selectedResources.map((resource) => (
                        <Card key={resource.id}>
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                              {resource.name}
                            </CardTitle>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeResource(resource.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </CardHeader>
                          <CardContent>
                            <CardDescription>
                              {resource.description}
                            </CardDescription>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
          {formError && <div className="text-red-500 text-sm">{formError}</div>}
          <Button type="submit">Make Reservation</Button>
        </form>
      </Form>
    </div>
  );
}
