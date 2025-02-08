import { Message, Notification } from "@/api/models/notification";
import { createContext, useState, useContext, ReactNode } from "react";

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  emptyNotifications: () => void;
  messages: Message[];
  addMessage: (message: Message) => void;
  emptyMessages: () => void;
  removeMessage: (id: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  const addNotification = (notification: Notification) => {
    setNotifications((prev) => [...prev, notification]);
  };

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const emptyNotifications = () => {
    setNotifications([]);
  };

  const emptyMessages = () => {
    setMessages([]);
  };

  const removeMessage = (id: number) => {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.id !== id)
    );
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        emptyNotifications,
        messages,
        addMessage,
        emptyMessages,
        removeMessage,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotificationContext must be used within a NotificationProvider"
    );
  }
  return context;
};
