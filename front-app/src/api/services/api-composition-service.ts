import { ApiEndpoints, BASE_API_PATH_API_COMPOSITION } from "@/utils/constants";
import { sendAxiosRequest } from "./base-service";
import { Reservation } from "../models/api-composition";
import { ReservationDTO } from "../contracts/api-composition-contract";

const getAllReservations = async (): Promise<Reservation[]> => {
  var url = `${BASE_API_PATH_API_COMPOSITION}${ApiEndpoints.ApiComposition}/reservations`;
  return sendAxiosRequest<void, ReservationDTO[]>({
    method: "GET",
    url: url,
  }).then((response) => {
    return response.data as Reservation[];
  });
};

const getAllReservationsByDate = async (
  date: string
): Promise<Reservation[]> => {
  var url = `${BASE_API_PATH_API_COMPOSITION}${ApiEndpoints.ApiComposition}/reservations/date`;
  return sendAxiosRequest<any, ReservationDTO[]>({
    method: "GET",
    url: url,
    queryParams: {
      date: date,
    },
  }).then((response) => {
    return response.data as Reservation[];
  });
};

export { getAllReservations, getAllReservationsByDate };
