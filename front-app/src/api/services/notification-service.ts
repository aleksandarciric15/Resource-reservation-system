import {
  ApiEndpoints,
  BASE_API_PATH_API_NOTIFICATION,
} from "@/utils/constants";
import { sendAxiosRequest } from "./base-service";
import {
  MessageDTO,
  NotificationDTO,
} from "../contracts/notification-contract";
import { Message, Notification } from "../models/notification";

const getUnreadNotifications = async (userId: any): Promise<Notification[]> => {
  var url = `${BASE_API_PATH_API_NOTIFICATION}${ApiEndpoints.Notifications}/${userId}/unread`;
  return sendAxiosRequest<void, NotificationDTO[]>({
    method: "GET",
    url: url,
  }).then((response) => {
    return response.data as Notification[];
  });
};

const markAllUserNotificationsAsRead = async (userId: any): Promise<any> => {
  var url = `${BASE_API_PATH_API_NOTIFICATION}${ApiEndpoints.Notifications}/user/${userId}/read`;
  return sendAxiosRequest<void, any>({
    method: "POST",
    url: url,
  }).then((response) => {
    return response.data;
  });
};

const getUnreadReceivedMessages = async (userId: any): Promise<Message[]> => {
  var url = `${BASE_API_PATH_API_NOTIFICATION}${ApiEndpoints.Messages}/received`;
  return sendAxiosRequest<any, MessageDTO[]>({
    method: "GET",
    url: url,
    queryParams: {
      receiverId: userId,
    },
  }).then((response) => {
    return response.data as Message[];
  });
};

const sendMessage = async (data: any): Promise<any> => {
  var url = `${BASE_API_PATH_API_NOTIFICATION}${ApiEndpoints.Messages}/send`;
  return sendAxiosRequest<any, any>({
    method: "POST",
    url: url,
    data: data,
  }).then((response) => {
    return response.data;
  });
};

const markMessageAsRead = async (messageId: number): Promise<any> => {
  var url = `${BASE_API_PATH_API_NOTIFICATION}${ApiEndpoints.Messages}/read`;
  return sendAxiosRequest<any, any>({
    method: "PUT",
    url: url,
    queryParams: {
      messageId: messageId,
    },
  }).then((response) => {
    return response.data;
  });
};

const markAllUserMessagesAsRead = async (userId: any): Promise<any> => {
  var url = `${BASE_API_PATH_API_NOTIFICATION}${ApiEndpoints.Messages}/receiver/read`;
  return sendAxiosRequest<any, any>({
    method: "PUT",
    url: url,
    queryParams: {
      receiverId: userId,
    },
  }).then((response) => {
    return response.data;
  });
};

export {
  getUnreadNotifications,
  markAllUserNotificationsAsRead,
  sendMessage,
  getUnreadReceivedMessages,
  markMessageAsRead,
  markAllUserMessagesAsRead,
};
