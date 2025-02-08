import { ApiEndpoints, BASE_API_PATH_RESOURCE } from "@/utils/constants";
import { ReservationDateTimeDTO } from "../contracts/reservation-contract";
import {
  AvailableResourceDTO,
  ResourceDTO,
  ResourceTypeDTO,
} from "../contracts/resource-contract";
import { AvailableResource, Resource, ResourceType } from "../models/resource";
import { sendAxiosRequest } from "./base-service";

const fetchAllResources = async (): Promise<Resource[]> => {
  var url = `${BASE_API_PATH_RESOURCE}${ApiEndpoints.Resources}`;
  return sendAxiosRequest<void, ResourceDTO[]>({
    method: "GET",
    url: url,
  }).then((response) => {
    return response.data as Resource[];
  });
};

const fetchAvailableResources = async (
  data: ReservationDateTimeDTO
): Promise<AvailableResource[]> => {
  var url = `${BASE_API_PATH_RESOURCE}${ApiEndpoints.Resources}/avilable-resources`;
  return sendAxiosRequest<ReservationDateTimeDTO, AvailableResourceDTO[]>({
    method: "POST",
    url: url,
    data: data,
  }).then((response) => {
    return response.data as AvailableResource[];
  });
};

const fetchAllResourceTypes = async (): Promise<ResourceType[]> => {
  var url = `${BASE_API_PATH_RESOURCE}${ApiEndpoints.ResourceTypes}`;
  return sendAxiosRequest<void, ResourceTypeDTO[]>({
    method: "GET",
    url: url,
  }).then((response) => {
    return response.data as ResourceType[];
  });
};

const createResource = async (data: any): Promise<Resource> => {
  var url = `${BASE_API_PATH_RESOURCE}${ApiEndpoints.Resources}/create`;
  return sendAxiosRequest<any, Resource>({
    method: "POST",
    url: url,
    data: data,
  }).then((response) => {
    return response.data;
  });
};

const editResource = async (data: any): Promise<Resource> => {
  var url = `${BASE_API_PATH_RESOURCE}${ApiEndpoints.Resources}/edit`;
  return sendAxiosRequest<any, Resource>({
    method: "PUT",
    url: url,
    data: data,
  }).then((response) => {
    return response.data;
  });
};

const deleteResource = async (id: number): Promise<any> => {
  var url = `${BASE_API_PATH_RESOURCE}${ApiEndpoints.Resources}/${id}/delete`;
  return sendAxiosRequest<any, Resource>({
    method: "DELETE",
    url: url,
  }).then((response) => {
    return response.data;
  });
};

const createResourceType = async (data: any): Promise<ResourceType> => {
  var url = `${BASE_API_PATH_RESOURCE}${ApiEndpoints.ResourceTypes}/create`;
  return sendAxiosRequest<any, ResourceTypeDTO>({
    method: "POST",
    url: url,
    data: data,
  }).then((response) => {
    return response.data as ResourceType;
  });
};

const editResourceType = async (data: any): Promise<ResourceType> => {
  var url = `${BASE_API_PATH_RESOURCE}${ApiEndpoints.ResourceTypes}/edit`;
  return sendAxiosRequest<any, ResourceTypeDTO>({
    method: "PUT",
    url: url,
    data: data,
  }).then((response) => {
    return response.data as ResourceType;
  });
};

export {
  fetchAllResources,
  fetchAvailableResources,
  fetchAllResourceTypes,
  createResource,
  editResource,
  deleteResource,
  createResourceType,
  editResourceType,
};
