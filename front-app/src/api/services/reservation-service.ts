import { ApiEndpoints, BASE_API_PATH_RESERVATION } from "@/utils/constants";
import { TableReservation } from "../contracts/resource-contract";
import { sendAxiosRequest } from "./base-service";
import {
  DenyReservationDTO,
  ReservationDTO,
} from "../contracts/reservation-contract";

const fetchAllReservations = async (): Promise<any> => {
  var url = `http://localhost/api/v1/reservations`;
  return sendAxiosRequest<void, any>({
    method: "GET",
    url: url,
  }).then((response) => {
    return response.data as any;
  });
};

const reserveTable = async (data: TableReservation): Promise<void> => {
  var url = `${BASE_API_PATH_RESERVATION}${ApiEndpoints.Reservations}/reserve`;
  return sendAxiosRequest<TableReservation, void>({
    method: "POST",
    url: url,
    data: data,
  }).then((response) => {
    return response.data;
  });
};

const createReservation = async (data: ReservationDTO): Promise<void> => {
  var url = `${BASE_API_PATH_RESERVATION}${ApiEndpoints.Reservations}/reserve`;
  return sendAxiosRequest<ReservationDTO, void>({
    method: "POST",
    url: url,
    data: data,
  }).then((response) => {
    return response.data;
  });
};

const denyReservation = async (data: DenyReservationDTO): Promise<void> => {
  var url = `${BASE_API_PATH_RESERVATION}${ApiEndpoints.Reservations}/deny`;
  return sendAxiosRequest<DenyReservationDTO, void>({
    method: "PUT",
    url: url,
    data: data,
  }).then((response) => {
    return response.data;
  });
};

export {
  reserveTable,
  createReservation,
  denyReservation,
  fetchAllReservations,
};
