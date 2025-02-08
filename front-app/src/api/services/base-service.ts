import axios from "@/lib/axios";
import { AxiosError } from "axios";

type SendAxiosRequestParams<TData, TResponse> = {
  url: string;
  method: string;
  requireAuth?: boolean;
  data?: TData | null;
  queryParams?: any;
  headers?: any;
  onRespond?: (data: TResponse) => void;
  onError?: (error: AxiosError) => void;
};

const sendAxiosRequest = async <TData, TResponse>(
  params: SendAxiosRequestParams<TData, TResponse>
) => {
  const authenticate = params.requireAuth ?? false;

  let instance = authenticate ? axios.getAxios(true) : axios.getAxios(false);

  return instance
    .request<TResponse>({
      method: params.method,
      url: params.url,
      data: params.data,
      params: params.queryParams,
      headers: params.headers,
    })
    .then((response) => {
      if (params.onRespond) params.onRespond(response.data);
      return response;
    })
    .catch((error) => {
      console.error("UNHANDLED AXIOS ERROR: ", error);
      throw error;
    });
};

export { sendAxiosRequest };
