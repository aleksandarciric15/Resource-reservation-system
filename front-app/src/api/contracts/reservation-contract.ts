import { ResourceDTO } from "./resource-contract";

export type ReservationDateTimeDTO = {
  date: string;
  startTime: string;
  endTime: string;
};

export type ReservationDTO = {
  date: string;
  startTime: string;
  endTime: string;
  employeeId: string;
  reason: string;
  resources: ResourceDTO[];
  admin: boolean;
};

export type MakeReservationResourceDTO = {
  id: number;
  name: string;
  description: string;
};

export type DenyReservationDTO = {
  reservationId: number;
  admin: boolean;
};
