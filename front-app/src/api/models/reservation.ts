import { Resource } from "./resource";

export type ReservationDateTime = {
  date: string;
  startTime: string;
  endTime: string;
};

export type Reservation = {
  date: string;
  startTime: string;
  endTime: string;
  employeeId: number;
  reason: string;
  resources: Resource[];
  admin: boolean;
};

export type MakeReservationResource = {
  id: number;
  name: string;
  description: string;
};

export type DenyReservation = {
  reservationId: number;
  admin: boolean;
};
