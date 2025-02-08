import { ApiEndpoints, BASE_API_PATH_RESERVATION } from "@/utils/constants";
import { sendAxiosRequest } from "./base-service";

const getReservationReport = async (data: any): Promise<any> => {
  var url = `${BASE_API_PATH_RESERVATION}${ApiEndpoints.Reports}/reservations`;
  return sendAxiosRequest<any, any>({
    method: "POST",
    url: url,
    data: data,
  }).then((response) => {
    return response.data;
  });
};

export { getReservationReport };
