import { useState, useEffect } from "react";
import { format, addDays } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ReservationModal } from "./ReservationModal";
import { toast } from "sonner";
import { reserveTableSchema } from "@/schemas/resource-schemas";
import { z } from "zod";
import { reserveTable } from "@/api/services/reservation-service";
import { TableReservation } from "@/api/contracts/resource-contract";

interface Seat {
  id: string;
  name: string;
  description: string;
  isAvailable: boolean;
  reservedBy?: string;
}

interface TableAvailabilityProps {
  selectedDate: Date | undefined;
}

export default function TableAvailability({
  selectedDate,
}: TableAvailabilityProps) {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);

  useEffect(() => {
    if (selectedDate) {
      console.log("Slected date in table availablilty", selectedDate);
      const newSeats = generateSeatsForDate(selectedDate);
      setSeats(newSeats);
    }
  }, [selectedDate]);

  const generateSeatsForDate = (date: Date): Seat[] => {
    const dayOfWeek = date.getDay();
    return [
      {
        id: "1",
        name: "Desk A1",
        description: "Window seat with standing desk",
        isAvailable: dayOfWeek !== 0 && dayOfWeek !== 6,
      },
      {
        id: "2",
        name: "Desk A2",
        description: "Quiet corner desk",
        isAvailable: dayOfWeek !== 0 && dayOfWeek !== 6,
      },
      {
        id: "3",
        name: "Desk B1",
        description: "Near the coffee machine",
        isAvailable: dayOfWeek !== 0 && dayOfWeek !== 6,
      },
      {
        id: "4",
        name: "Desk B2",
        description: "Collaborative space",
        isAvailable: dayOfWeek !== 0 && dayOfWeek !== 6,
      },
      {
        id: "5",
        name: "Desk C1",
        description: "Private booth",
        isAvailable: dayOfWeek !== 0 && dayOfWeek !== 6,
      },
      {
        id: "6",
        name: "Desk C2",
        description: "Near the printer",
        isAvailable: dayOfWeek !== 0 && dayOfWeek !== 6,
      },
    ].map((seat) => ({
      ...seat,
      isAvailable: seat.isAvailable && Math.random() > 0.3,
      reservedBy: seat.isAvailable
        ? undefined
        : ["John Doe", "Jane Smith", "Alice Johnson"][
            Math.floor(Math.random() * 3)
          ],
    }));
  };

  const handleReservation = async (
    data: z.infer<typeof reserveTableSchema>
  ) => {
    if (selectedSeat && selectedDate) {
      try {
        const request: TableReservation = {
          reason: data.reason,
          resourceId: 1,
          employeeId: 1,
          reservationTime: format(selectedDate, "dd.MM.yyyy HH:mm:ss"),
        };
        console.log(request);
        await reserveTable(request);

        toast.success("Successfully created this!");

        setSeats(
          seats.map((seat) =>
            seat.id === selectedSeat.id
              ? { ...seat, isAvailable: false, reservedBy: "User this" }
              : seat
          )
        );
      } catch (error) {
        toast.error("Couldn't create reservation!");
      }

      setSelectedSeat(null);
    }
  };

  const today = new Date();
  const maxDate = addDays(today, 7);

  if (!selectedDate || selectedDate < today || selectedDate > maxDate) {
    return (
      <div className="text-center text-gray-600">
        Please select a date within the next 7 days to view seat availability.
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold text-gray-900">
        Seat Availability for {format(selectedDate, "MMMM d, yyyy")}
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {seats.map((seat) => (
          <TooltipProvider key={seat.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Card
                  className={`${
                    seat.isAvailable
                      ? "bg-green-50 hover:bg-green-100"
                      : "bg-red-50 hover:bg-red-100"
                  }`}
                >
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold">{seat.name}</h3>
                    <p className="text-sm text-gray-600">{seat.description}</p>
                  </CardContent>
                  <CardFooter>
                    {seat.isAvailable ? (
                      <Button onClick={() => setSelectedSeat(seat)}>
                        Reserve
                      </Button>
                    ) : (
                      <p className="text-sm font-medium text-red-600">
                        Reserved by {seat.reservedBy}
                      </p>
                    )}
                  </CardFooter>
                </Card>
              </TooltipTrigger>
              <TooltipContent className="bg-white p-4 shadow-xl">
                <div className="text-sm">
                  <p className="font-semibold text-gray-900">{seat.name}</p>
                  <p className="text-gray-600">{seat.description}</p>
                  {seat.isAvailable ? (
                    <p className="mt-2 font-medium text-green-600">Available</p>
                  ) : (
                    <p className="mt-2 font-medium text-red-600">
                      Reserved by {seat.reservedBy}
                    </p>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
      <ReservationModal
        isOpen={!!selectedSeat}
        onClose={() => setSelectedSeat(null)}
        onSubmit={handleReservation}
        seatName={selectedSeat?.name || ""}
      />
    </div>
  );
}
