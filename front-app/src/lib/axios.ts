import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
// import environments from "@/environments/config";
import {
  ACCESS_TOKEN_STORAGE_KEY,
  ApiEndpoints,
  REFRESH_TOKEN_STORAGE_KEY,
} from "@/utils/constants";
import { TokensDTO } from "@/api/contracts/auth-contract";

// const axiosConfiguration = {
//   baseURL: environments().baseApiPath,
// };

const refreshUserTokens = async (accessToken: string, refreshToken: string) => {
  const api = `${ApiEndpoints.Authentication}/refresh`;
  const response = await axios.post<TokensDTO>(api, {
    accessToken: accessToken,
    refreshToken: refreshToken,
  });

  var newTokens = response.data;
  localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, newTokens.accessToken);
  localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, newTokens.refreshToken);

  return newTokens.accessToken;
};

type FailedRequestQueueItem = {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
  config: InternalAxiosRequestConfig<any>;
};

const failedRequestQueue: FailedRequestQueueItem[] = [];
var isRefreshingToken: boolean;

export default {
  getAxios: (useAuthentication: boolean = false) => {
    // const axiosInstance = axios.create(axiosConfiguration);
    const axiosInstance = axios.create();
    axiosInstance.defaults.headers.common["Content-Type"] = "application/json";
    const token = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
    axiosInstance.interceptors.request.use(
      (requestConfig) => {
        if (requestConfig.data instanceof FormData)
          delete requestConfig.headers["Content-Type"];

        requestConfig.headers.Authorization = `Bearer ${token}`;
        return requestConfig;
      },
      (error) => Promise.reject(error)
    );

    if (!useAuthentication || token === null) return axiosInstance;

    axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config;
        // If the error status is 401 it means the token has expired and we need to refresh it
        if (originalRequest && error.response?.status == 401) {
          //If already sent request to refresh token, queue the request
          if (!isRefreshingToken) {
            try {
              isRefreshingToken = true;
              const refreshToken = localStorage.getItem(
                REFRESH_TOKEN_STORAGE_KEY
              );
              if (refreshToken !== null && refreshToken !== undefined) {
                var newAccessToken = await refreshUserTokens(
                  token,
                  refreshToken
                );
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                failedRequestQueue.forEach(
                  async ({ config, resolve, reject }) => {
                    await axios.request(config).then(resolve).catch(reject);
                  }
                );

                // Clear the queue
                failedRequestQueue.length = 0;
                return axios.request(originalRequest);
              }
            } catch (error) {
              throw error;
            } finally {
              isRefreshingToken = false;
            }
          }

          return new Promise<void>((resolve, reject) => {
            failedRequestQueue.push({
              config: originalRequest,
              resolve,
              reject,
            });
          });
        }
        return Promise.reject(error);
      }
    );

    return axiosInstance;
  },
};
