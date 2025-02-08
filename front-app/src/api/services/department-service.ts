import { ApiEndpoints, BASE_API_PATH_DEPARTMENT } from "@/utils/constants";
import {} from "../contracts/resource-contract";
import { sendAxiosRequest } from "./base-service";
import { CompanyDTO } from "../contracts/department-contract";
import { Company } from "../models/department";

const getCompanyData = async (): Promise<Company> => {
  var url = `${BASE_API_PATH_DEPARTMENT}${ApiEndpoints.Company}/get-data`;
  return sendAxiosRequest<void, CompanyDTO>({
    method: "GET",
    url: url,
  }).then((response) => {
    return response.data as Company;
  });
};

const setCompanyData = async (data: any): Promise<void> => {
  var url = `${BASE_API_PATH_DEPARTMENT}${ApiEndpoints.Company}/set-company`;
  return sendAxiosRequest<any, void>({
    method: "POST",
    url: url,
    data: data,
  }).then((response) => {
    return response.data;
  });
};

const getAllDepartments = async (): Promise<any> => {
  var url = `${BASE_API_PATH_DEPARTMENT}${ApiEndpoints.Departments}`;
  return sendAxiosRequest<any, any>({
    method: "GET",
    url: url,
  }).then((response) => {
    return response.data;
  });
};

const createDepartment = async (data: any): Promise<any> => {
  var url = `${BASE_API_PATH_DEPARTMENT}${ApiEndpoints.Departments}/create`;
  return sendAxiosRequest<any, any>({
    method: "POST",
    url: url,
    data: data,
  }).then((response) => {
    return response.data;
  });
};

const editDepartment = async (data: any): Promise<any> => {
  var url = `${BASE_API_PATH_DEPARTMENT}${ApiEndpoints.Departments}/edit`;
  return sendAxiosRequest<any, any>({
    method: "PUT",
    url: url,
    data: data,
  }).then((response) => {
    return response.data;
  });
};

export {
  setCompanyData,
  getCompanyData,
  getAllDepartments,
  createDepartment,
  editDepartment,
};
