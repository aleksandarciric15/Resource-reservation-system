import {
  getCompanyData,
  setCompanyData,
} from "@/api/services/department-service";
import TextareaFormField from "@/components/shared/TextareaFormField";
import { Button } from "@/components/ui/button";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  description: z.string().min(10, { message: "Minimum 10 characters." }),
  workTimeStart: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Please enter a valid time in HH:MM format.",
  }),
  workTimeEnd: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Please enter a valid time in HH:MM format.",
  }),
});

export default function CompanySettings() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      workTimeStart: "07:00",
      workTimeEnd: "16:00",
    },
  });

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const data = await getCompanyData();
        form.reset(data);
      } catch (error) {
        toast.error("Couldn't load company settings!");
      }
    };

    fetchCompanyData();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      await setCompanyData(values);
      toast.success("Successfully updated company settings");
    } catch (error) {
      toast.error("Failed to update company settings");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="max-w-screen-lg">
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter company name" {...field} />
              </FormControl>
              <FormDescription>Company name should be unique</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <TextareaFormField
          control={form.control}
          name="description"
          label="Description"
          description="A little bit about your company"
          placeholder="This company is ..."
          className="max-w-screen-lg"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="workTimeStart"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Work Time Start</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormDescription>
                  Enter the start of work hours (e.g., 07:00)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="workTimeEnd"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Work Time End</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormDescription>
                  Enter the end of work hours (e.g., 16:00)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="mt-8">
          Save Settings
        </Button>
      </form>
    </Form>
  );
}
