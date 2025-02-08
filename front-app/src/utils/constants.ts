import environments from "@/environments/config";

export const ACCESS_TOKEN_STORAGE_KEY = "front_app_access_token";
export const REFRESH_TOKEN_STORAGE_KEY = "front_app_refresh_token";

export const BASE_API_PATH_USER = environments().baseApiPathUser;
export const BASE_API_PATH_DEPARTMENT = environments().baseApiPathDepartment;
export const BASE_API_PATH_RESERVATION = environments().baseApiPathReservation;
export const BASE_API_PATH_RESOURCE = environments().baseApiPathResource;
export const BASE_API_PATH_API_COMPOSITION =
  environments().baseApiPathApiComposition;
export const BASE_API_PATH_API_NOTIFICATION =
  environments().baseApiPathApiNotification;

const API_PREFIX = environments().apiResourcePrefix;

export const ApiEndpoints = {
  Authentication: `${API_PREFIX}/auth`,
  Resources: `${API_PREFIX}/resources`,
  ResourceTypes: `${API_PREFIX}/resource-types`,
  Reservations: `${API_PREFIX}/reservations`,
  Company: `${API_PREFIX}/company`,
  Departments: `${API_PREFIX}/departments`,
  Users: `${API_PREFIX}/users`,
  ApiComposition: `${API_PREFIX}/composition`,
  Notifications: `${API_PREFIX}/notifications`,
  Messages: `${API_PREFIX}/messages`,
  Reports: `${API_PREFIX}/report`,
};
