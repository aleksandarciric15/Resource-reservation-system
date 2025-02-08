import { Reservation } from "@/api/models/api-composition";
import { Company, defaultCompanyTime } from "@/api/models/department";
import { ColorResource, Resource, ResourceType } from "@/api/models/resource";
import { getAllReservationsByDate } from "@/api/services/api-composition-service";
import { getCompanyData } from "@/api/services/department-service";
import {
  fetchAllResources,
  fetchAllResourceTypes,
} from "@/api/services/resource-service";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import DayTimeline from "./components/DayTimeline";
import Legend from "./components/Legend";
import { ResourceTypeFilter } from "./components/ResourceTypeFilter";
import { getColorFromString } from "@/utils/math-utils";
import { LoadingSpinner } from "../shared/LoadingSpinner";

export default function Schedule() {
  const [date, setDate] = useState<Date>(new Date());
  const [openCalendar, setOpenCalendar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allResourceTypes, setAllResourceTypes] = useState<ResourceType[]>([]);
  const [allResources, setAllResources] = useState<Resource[]>([]);
  const [allResourceWithColors, setAllResourcesWithColors] = useState<
    ColorResource[]
  >([]);
  const [allReservations, setAllReservations] = useState<Reservation[]>([]);
  const [selectedResourceType, setSelectedResourceType] = useState<
    ResourceType | undefined
  >(undefined);
  const [company, setCompany] = useState<Company | null>(null);

  useEffect(() => {
    const fetInitialData = async () => {
      await handleFetchAllResources();
      await handleFetchAllResourceTypes();
      await handleFetchCompanyData();
      await handleFetchAllReservationsByDate(date.toISOString().split("T")[0]);
    };

    fetInitialData();
  }, []);

  useEffect(() => {
    console.log("Date is changed!");
    if (date) {
      handleFetchAllReservationsByDate(format(date, "yyyy-MM-dd"));
      setOpenCalendar(false);
    }
  }, [date]);

  const handleFetchAllReservationsByDate = async (date: string) => {
    try {
      const response: Reservation[] = await getAllReservationsByDate(date);
      setAllReservations(response);
    } catch (error) {
      toast.error("Couldn't load reservations!");
    }
  };

  const handleFetchAllResources = async () => {
    try {
      const response: Resource[] = await fetchAllResources();
      setAllResources(response);
      const pAllResourcesWithColors: ColorResource[] = response.map(
        (resource) => ({
          ...resource,
          color: getColorFromString(resource.resourceTypeName),
        })
      );
      setAllResourcesWithColors(pAllResourcesWithColors);
    } catch (error) {
      toast.error("Couldn't load resources!");
    }
  };

  const handleFetchAllResourceTypes = async () => {
    try {
      const response: ResourceType[] = await fetchAllResourceTypes();
      setAllResourceTypes(response);
    } catch (error) {
      toast.error("Couldn't load resource types!");
    }
  };

  const handleFetchCompanyData = async () => {
    try {
      const response: Company = await getCompanyData();
      setCompany(response);
    } catch (error) {
      toast.error("Couldn't load company data!");
    }
  };

  const filteredResources: ColorResource[] = selectedResourceType
    ? allResourceWithColors.filter(
        (r) => r.resourceTypeId === selectedResourceType.id
      )
    : allResourceWithColors;

  return (
    <div className="container mx-auto p-4 space-y-6 ">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Resource Schedule
      </h1>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 ">
        <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
          <PopoverTrigger asChild>
            <Button
              onClick={() => setOpenCalendar(true)}
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <ResourceTypeFilter
          resourceTypes={allResourceTypes}
          selectedType={selectedResourceType}
          onSelectType={setSelectedResourceType}
        />
      </div>
      <DayTimeline
        date={date}
        allResources={filteredResources}
        reservations={allReservations}
        companyHours={{
          startTime: company?.workTimeStart ?? defaultCompanyTime.startTime,
          endTime: company?.workTimeEnd ?? defaultCompanyTime.endTime,
        }}
      />
      <Legend resources={filteredResources} />
      <LoadingSpinner loading={loading} />
    </div>
  );
}
