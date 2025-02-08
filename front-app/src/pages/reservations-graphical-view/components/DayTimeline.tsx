import type { Reservation } from "@/api/models/api-composition";
import type { ColorResource } from "@/api/models/resource";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useKeycloak } from "@/pages/shared/KeycloakProvider";
import { formatReservationDateTime } from "@/utils/time-utils";
import { addHours, format, parse } from "date-fns";
import { MessageSquareIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { MessageDialog } from "./MessageDialog";

interface DayTimelineProps {
  date: Date;
  allResources: ColorResource[];
  reservations: Reservation[];
  companyHours: { startTime: string; endTime: string };
}

export default function DayTimeline({
  date,
  allResources,
  reservations,
  companyHours,
}: DayTimelineProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { userId } = useKeycloak();
  const [minTableWidth, setMinTableWidth] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);

  const openDialog = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setSelectedReservation(null);
    setIsDialogOpen(false);
  };

  const startTime = parse(companyHours.startTime, "HH:mm", date);
  const endTime = parse(companyHours.endTime, "HH:mm", date);
  const timeSlots: string[] = [];
  let currentTime = startTime;
  while (currentTime <= endTime) {
    timeSlots.push(format(currentTime, "HH:mm"));
    currentTime = addHours(currentTime, 1);
  }

  useEffect(() => {
    const calculateMinWidth = () => {
      const timeSlotWidth = 100; // Minimum width for each time slot
      const resourceColumnWidth = 160; // Width of the resource column
      const totalWidth = timeSlots.length * timeSlotWidth + resourceColumnWidth;
      setMinTableWidth(totalWidth);
    };

    calculateMinWidth();
    window.addEventListener("resize", calculateMinWidth);
    return () => window.removeEventListener("resize", calculateMinWidth);
  }, []);

  useEffect(() => {
    // Trigger animation after a short delay
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const dateString = format(date, "yyyy-MM-dd");
  const filteredReservations = reservations;
  // const filteredReservations = reservations.filter(
  //   (r) => r.date === dateString
  // );

  const getReservationStyle = (
    resource: ColorResource,
    reservation: Reservation
  ) => {
    const start = parse(reservation.startTime, "HH:mm:ss", date);
    const end = parse(reservation.endTime, "HH:mm:ss", date);
    const totalSlots = timeSlots.length;
    const startSlotIndex = timeSlots.findIndex(
      (slot) => parse(slot, "HH:mm", date) >= start
    );
    const endSlotIndex = timeSlots.findIndex(
      (slot) => parse(slot, "HH:mm", date) >= end
    );

    const startPercentage = (startSlotIndex / totalSlots) * 100;
    const endPercentage = (endSlotIndex / totalSlots) * 100;
    const width = endPercentage - startPercentage;

    return {
      position: "absolute" as const,
      left: `${startPercentage}%`,
      width: animate ? `calc(${width}% - 4px)` : "0%",
      height: "80%",
      top: "10%",
      backgroundColor: resource.color,
      borderRadius: "4px",
      transition: "width 0.5s ease-out",
      margin: "0 2px",
    };
  };

  const handleSendingMessage = (
    resource: ColorResource,
    reservation: Reservation
  ) => {
    const dateTimeFormat = formatReservationDateTime(
      reservation.date,
      reservation.startTime,
      reservation.endTime
    );

    return {
      senderId: "this",
      receiverId: reservation.employee.userId,
      resourceId: resource.id,
      senderName: `${reservation.employee.firstName} ${reservation.employee.lastName}`,
      senderUsername: reservation.employee.username,
      resourceName: resource.name,
      resourceTypeName: resource.resourceTypeName,
      reservationDateTime: dateTimeFormat,
    };
  };

  return (
    <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden">
      <div
        ref={scrollRef}
        className="overflow-x-auto scrollbar-hidden"
        style={{ maxWidth: "100vw" }}
      >
        <div
          style={{ minWidth: `${minTableWidth}px`, width: "100%" }}
          className="max-h-[500px] scrollbar-hidden"
        >
          <table className="w-full border-collapse table-fixed pr-[4px]">
            <colgroup>
              <col style={{ width: "160px" }} />
              {timeSlots.map((_, index) => (
                <col
                  key={index}
                  style={{ width: `${100 / timeSlots.length}%` }}
                />
              ))}
            </colgroup>
            <thead className="sticky top-0 z-10 bg-gray-100">
              <tr>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 z-20 bg-gray-100">
                  Resource
                </th>
                {timeSlots.map((time, index) => (
                  <th
                    key={time}
                    className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {time}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allResources.map((resource) => (
                <tr key={resource.id} className="border-t border-gray-200">
                  <td className="p-3 text-sm font-medium text-gray-900 bg-white sticky left-0 z-10">
                    {resource.name}
                  </td>
                  <td colSpan={timeSlots.length} className="relative p-0">
                    {filteredReservations
                      .filter((reservation) =>
                        reservation.resources.some((r) => r.id === resource.id)
                      )
                      .map((reservation) => (
                        <div
                          key={
                            reservation.id.toString() + resource.id.toString()
                          }
                        >
                          <TooltipProvider
                            key={
                              reservation.id.toString() + resource.id.toString()
                            }
                          >
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div
                                  style={getReservationStyle(
                                    resource,
                                    reservation
                                  )}
                                  className="cursor-pointer transition-all duration-200 ease-in-out hover:opacity-80"
                                  onClick={() => openDialog(reservation)}
                                ></div>
                              </TooltipTrigger>
                              <TooltipContent className="p-5 bg-white rounded-2xl shadow-xl border border-gray-300 z-50 max-w-xs">
                                <h3 className="font-semibold text-xl text-gray-900 mb-3">
                                  {reservation.employee.firstName}{" "}
                                  {reservation.employee.lastName}
                                </h3>
                                <div className="space-y-2 text-sm text-gray-700">
                                  <div className="flex justify-between border-b pb-2">
                                    <span className="font-medium text-gray-600">
                                      From:
                                    </span>
                                    <span className="text-gray-900">
                                      {reservation.startTime.slice(0, 5)}
                                    </span>
                                  </div>
                                  <div className="flex justify-between border-b pb-2">
                                    <span className="font-medium text-gray-600">
                                      To:
                                    </span>
                                    <span className="text-gray-900">
                                      {reservation.endTime.slice(0, 5)}
                                    </span>
                                  </div>
                                  <div className="border-b pb-2">
                                    <span className="font-medium text-gray-600">
                                      Reason:
                                    </span>
                                    <p className="text-gray-900 mt-1">
                                      {reservation.reason}
                                    </p>
                                  </div>
                                </div>
                                <h4 className="font-semibold text-base text-gray-800 mt-4 mb-2">
                                  Resource Details:
                                </h4>
                                <p className="text-gray-700 leading-relaxed">
                                  {resource.description}
                                </p>
                                {reservation.employee.userId !== userId && (
                                  <Button
                                    variant="secondary"
                                    size="sm"
                                    className="mt-4 w-full flex items-center justify-center gap-2"
                                    onClick={() => openDialog(reservation)}
                                  >
                                    <MessageSquareIcon className="w-4 h-4" />
                                    <span>Send Message</span>
                                  </Button>
                                )}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          {selectedReservation && (
                            <Dialog
                              open={isDialogOpen}
                              onOpenChange={closeDialog}
                            >
                              <DialogContent>
                                <MessageDialog
                                  resource={resource}
                                  reservation={selectedReservation}
                                  isOpen={isDialogOpen}
                                  setIsOpen={closeDialog}
                                />
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                      ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
