import { Reservation } from "@/api/models/api-composition";
import { getAllReservations } from "@/api/services/api-composition-service";
import { denyReservation } from "@/api/services/reservation-service";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDownIcon, ChevronUpIcon, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Pagination } from "./Pagination";
import YesNoModal from "./YesNoModal";

export default function ReservationManagement() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState<
    number | null
  >(null);
  const [expandedReservation, setExpandedReservation] = useState<number | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // 10 as default
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchAllReservations = async () => {
      try {
        const data: Reservation[] = await getAllReservations();
        setReservations(data);
      } catch (error) {
        toast.error("Couldn't load reservations!");
      }
    };

    fetchAllReservations();
  }, []);

  const toggleReservation = (id: number) => {
    setExpandedReservation(expandedReservation === id ? null : id);
  };

  const filteredReservations = reservations.filter((reservation) => {
    const dateMatch = dateFilter ? reservation.date === dateFilter : true;
    const statusMatch =
      statusFilter === "all"
        ? true
        : statusFilter === "approved"
        ? !reservation.denied
        : reservation.denied;
    return dateMatch && statusMatch;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredReservations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleDenyClick = (id: number) => {
    setSelectedReservationId(id);
    setShowModal(true);
  };

  const confirmDenyReservation = async () => {
    if (selectedReservationId !== null) {
      setShowModal(false);
      handleDenyReservation(selectedReservationId);
      setSelectedReservationId(null);
    }
  };

  const handleDenyReservation = async (id: number) => {
    try {
      const pdata = { reservationId: id, admin: true };
      await denyReservation(pdata);
      setReservations(
        reservations.map((res) =>
          res.id === id ? { ...res, denied: true } : res
        )
      );
      toast.success("Reservation denied successfully!");
    } catch (error) {
      toast.error("Failed to deny reservation!");
    }
  };

  return (
    <div className="space-y-4 p-4">
      <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4 mb-4">
        <Input
          type="date"
          placeholder="Filter by date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="w-full sm:w-auto"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="denied">Denied</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {currentItems.map((reservation) => (
        <Card key={reservation.id} className="overflow-hidden">
          <CardContent className="p-2">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleReservation(reservation.id)}
            >
              <div className="flex-1">
                <h3 className="text-sm font-semibold">
                  {reservation.employee.firstName}{" "}
                  {reservation.employee.lastName}
                </h3>
                <p className="text-xs text-gray-500">
                  {reservation.date} | {reservation.startTime} -{" "}
                  {reservation.endTime}
                </p>
              </div>
              <div className="flex items-center">
                <Badge
                  variant={reservation.denied ? "destructive" : "default"}
                  className="mr-2"
                >
                  {reservation.denied ? "Denied" : "Approved"}
                </Badge>
                {!reservation.denied && (
                  <Button
                    variant="remove"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDenyClick(reservation.id);
                    }}
                    className="mr-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
                <Button variant="ghost" size="icon">
                  {expandedReservation === reservation.id ? (
                    <ChevronUpIcon className="h-4 w-4" />
                  ) : (
                    <ChevronDownIcon className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            {expandedReservation === reservation.id && (
              <div className="mt-2 p-2 bg-gray-50 rounded-md text-sm">
                <p className="font-semibold">Reason:</p>
                <p className="mb-2">{reservation.reason}</p>
                <p className="font-semibold">Reserved Resources:</p>
                <ul className="list-disc pl-5">
                  {reservation.resources.map((resource) => (
                    <li key={resource.id}>
                      {resource.name} (ID: {resource.id}) -{" "}
                      {resource.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
      <div className="mt-4">
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={filteredReservations.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>

      <YesNoModal
        showModal={showModal}
        setShowModal={setShowModal}
        onConfirmation={confirmDenyReservation}
        title="Confirm your action"
        description="Do you really want to deny reservation?"
      />
    </div>
  );
}
