import { Resource } from "@/api/models/resource";
import { User } from "@/api/models/user";
import { getReservationReport } from "@/api/services/report-service";
import { fetchAllResources } from "@/api/services/resource-service";
import { getEmployees } from "@/api/services/user-service";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

const ReportingDashboard: React.FC = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  );
  const [resourceId, setResourceId] = useState<string>("all");
  const [userId, setUserId] = useState<string>("all");
  const [denied, setDenied] = useState<boolean | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [reportData, setReportData] = useState<any>(null);

  useEffect(() => {
    fetchResources();
    fetchUsers();
    fetchReservationReport();
  }, []);

  const fetchResources = async () => {
    try {
      const data = await fetchAllResources();
      setResources(data);
    } catch (error) {
      toast.error("Couldn't load resources!");
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await getEmployees();
      setUsers(data);
    } catch (error) {
      toast.error("Couldn't load users!");
    }
  };

  const fetchReservationReport = async () => {
    const requestData = {
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd"),
      resourceId: resourceId !== "all" ? resourceId : null,
      userId: userId !== "all" ? userId : null,
      denied: denied,
    };
    try {
      const data = await getReservationReport(requestData);
      setReportData(data);
    } catch (error) {
      toast.error("Couldn't load report!");
    }
  };
  const reportType = denied === true ? "denied" : "approved";

  const DatePickerWithRange = ({
    date,
    setDate,
    label,
  }: {
    date: Date;
    setDate: (date: Date) => void;
    label: string;
  }) => {
    return (
      <div className="flex flex-col space-y-2">
        <label>{label}</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  };

  return (
    <div className="p-6  mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center flex justify-start w-full">
        Resource Reservation Reporting Dashboard
      </h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Report Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            <DatePickerWithRange
              date={startDate}
              setDate={setStartDate}
              label="Start Date"
            />
            <DatePickerWithRange
              date={endDate}
              setDate={setEndDate}
              label="End Date"
            />
            <div className="flex flex-col space-y-2">
              <label htmlFor="reservation-type">Reservation Type</label>
              <Select
                value={denied?.toString()}
                onValueChange={(value) => setDenied(value === "true")}
              >
                <SelectTrigger id="reservation-type">
                  <SelectValue placeholder="Select reservation type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="false">Approved</SelectItem>
                  <SelectItem value="true">Denied</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="resource">Resource</label>
              <Select value={resourceId} onValueChange={setResourceId}>
                <SelectTrigger id="resource">
                  <SelectValue placeholder="Select resource" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Resources</SelectItem>
                  {resources.map((resource: any) => (
                    <SelectItem
                      key={resource.id}
                      value={resource.id.toString()}
                    >
                      {resource.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="user">User</label>
              <Select value={userId} onValueChange={setUserId}>
                <SelectTrigger id="user">
                  <SelectValue placeholder="Select user" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  {users.map((user: any) => (
                    <SelectItem key={user.userId} value={user.userId}>
                      {user.firstName} {user.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full" onClick={fetchReservationReport}>
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Reservations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{reportData?.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average per day</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">
              {reportData?.average?.toFixed(2)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Date Range</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      </div>
      <Card className="max-w-screen-lg">
        <CardHeader>
          <CardTitle>Reservations Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              [reportType]: {
                label: reportType.charAt(0).toUpperCase() + reportType.slice(1),
                color:
                  reportType === "approved"
                    ? "hsl(var(--chart-1))"
                    : "hsl(var(--chart-2))",
              },
            }}
            className="h-[400px] max-w-screen-lg overflow-x-auto"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={reportData?.data}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke={`var(--color-${reportType})`}
                  strokeWidth={3}
                  dot={{ fill: `var(--color-${reportType})`, strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportingDashboard;
