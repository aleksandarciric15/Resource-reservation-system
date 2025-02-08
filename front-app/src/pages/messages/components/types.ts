export type User = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
};

export type Message = {
  id: string;
  createdAt: string;
  isRead: boolean;
  message: string;
  receiverId: string;
  sender: User;
  reservationDate: string;
  resourceName: string;
};
