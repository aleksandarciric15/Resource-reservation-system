export type Notification = {
  id: number;
  userId: string;
  message: string;
  reservationId: number;
  reservationDate: Date;
  createdAt: Date;
  isRead: boolean;
  title: string;
  type: string;
};

export enum NotificationType {
  ADMIN_MAKE_DENY_RESERVATION = "ADMIN_MAKE_DENY_RESERVATION",
}

export type Message = {
  id: number;
  senderId: number;
  receiverId: number;
  resourceId: number;
  message: string;
  senderName: string;
  senderUsername: string;
  resourceName: string;
  resourceTypeName: string;
  reservationDateTime: string;
  createdAt: Date;
  isRead: boolean;
};

export enum MessageType {
  RESOURCE_MESSAGE = "RESOURCE_MESSAGE",
}
