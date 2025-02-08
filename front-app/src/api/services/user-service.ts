import { ApiEndpoints, BASE_API_PATH_USER } from "@/utils/constants";
import { UserDTO } from "../contracts/user-contract";
import { User } from "../models/user";
import { sendAxiosRequest } from "./base-service";

const getEmployees = async (): Promise<User[]> => {
  var url = `${BASE_API_PATH_USER}${ApiEndpoints.Users}/employees`;
  return sendAxiosRequest<void, UserDTO[]>({
    method: "GET",
    url: url,
  }).then((response) => {
    return response.data as User[];
  });
};

const getEmployee = async (userId: string) => {
  var url = `${BASE_API_PATH_USER}${ApiEndpoints.Users}/${userId}/employee`;
  return sendAxiosRequest<any, UserDTO>({
    method: "GET",
    url: url,
  }).then((response) => {
    return response.data as User;
  });
};

const setDepartment = async (data: any): Promise<any> => {
  var url = `${BASE_API_PATH_USER}${ApiEndpoints.Users}/set-department`;
  return sendAxiosRequest<any, any>({
    method: "POST",
    url: url,
    data: data,
  }).then((response) => {
    return response.data;
  });
};

export { getEmployees, setDepartment, getEmployee };
