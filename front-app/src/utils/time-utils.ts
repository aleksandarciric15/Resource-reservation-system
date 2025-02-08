import { format } from "date-fns";

export const formatReservationDateTime = (
  date: string,
  startTime: string,
  endTime: string
) => {
  const startDateTime = new Date(`${date}T${startTime}`);
  const endDateTime = new Date(`${date}T${endTime}`);

  return `${format(startDateTime, "MMM d, yyyy HH:mm")} - ${format(
    endDateTime,
    "HH:mm"
  )}`;
};
