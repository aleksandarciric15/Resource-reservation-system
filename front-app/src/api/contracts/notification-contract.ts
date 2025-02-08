export type NotificationDTO = {
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

export type MessageDTO = {
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
