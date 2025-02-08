import {
  MessageType,
  Notification,
  NotificationType,
} from "@/api/models/notification";
import {
  getUnreadNotifications,
  getUnreadReceivedMessages,
  markAllUserNotificationsAsRead,
} from "@/api/services/notification-service";
import { Card } from "@/components/ui/card";
import {
  ApiEndpoints,
  BASE_API_PATH_API_NOTIFICATION,
} from "@/utils/constants";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useKeycloak } from "./KeycloakProvider";
import { useNotificationContext } from "./NotificationProvider";
import {
  Bell,
  Calendar,
  Info,
  AlertTriangle,
  CheckCircle,
  MessageCircleMore,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const MessageCircleNotification = () => {
  const { userId, authenticated } = useKeycloak();
  const [newMessages, setNewMessages] = useState<boolean>(false);
  const navigate = useNavigate();
  const { addMessage, emptyMessages } = useNotificationContext();

  useEffect(() => {
    if (!authenticated) return;
    emptyMessages();
    const fetchMessages = async () => {
      try {
        const response = await getUnreadReceivedMessages(userId);
        if (response && response.length > 0) {
          response.forEach((message) => addMessage(message));
          setNewMessages(true);
        }
      } catch (error) {
        toast.error("Coulnd't load messages!");
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    if (!authenticated) return;
    const url = `${BASE_API_PATH_API_NOTIFICATION}${ApiEndpoints.Messages}/stream/${userId}`;
    const sse = new EventSource(url);

    const messageType = MessageType.RESOURCE_MESSAGE;
    sse.addEventListener(messageType, (event) => {
      const notification = JSON.parse(event.data);
      setNewMessages(true);
      addMessage(notification);
    });

    sse.onerror = () => {
      sse.close();
    };

    return () => {
      sse.close();
    };
  }, []);

  const handleMessageClick = () => {
    setNewMessages(false);
    navigate("employee/messages");
  };

  return (
    <div className="rounded-full p-2  bg-[hsl(var(--background))]">
      <button onClick={handleMessageClick} className="notification-bell">
        <span className="relative">
          <MessageCircleMore />
          {newMessages && (
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
          )}
        </span>
      </button>
    </div>
  );
};

const NotificationBell = () => {
  const { userId, authenticated } = useKeycloak();
  const [newNotifications, setNewNotifications] = useState<boolean>(false);
  const navigate = useNavigate();
  const { addNotification, emptyNotifications } = useNotificationContext();

  useEffect(() => {
    if (!authenticated) return;
    emptyNotifications();
    const fetchNotifications = async () => {
      try {
        const response: Notification[] = await getUnreadNotifications(userId);
        if (response && response.length > 0) {
          response.forEach((notification) => addNotification(notification));
          setNewNotifications(true);
        }
      } catch (error) {
        toast.error("Notification error happened!");
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    if (!authenticated) return;
    const url = `${BASE_API_PATH_API_NOTIFICATION}${ApiEndpoints.Notifications}/stream/${userId}`;
    const sse = new EventSource(url);

    const notificationType = NotificationType.ADMIN_MAKE_DENY_RESERVATION;
    sse.addEventListener(notificationType, (event) => {
      const notification = JSON.parse(event.data);
      setNewNotifications(true);
      addNotification(notification);
    });

    sse.onerror = () => {
      sse.close();
    };

    return () => {
      sse.close();
    };
  }, []);

  const handleNotificationClick = () => {
    setNewNotifications(false);
    navigate("employee/notifications");
  };

  return (
    <div className="rounded-full p-2  bg-[hsl(var(--background))]">
      <button onClick={handleNotificationClick} className="notification-bell">
        🛎️
        {newNotifications && (
          <span className="relative">
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
          </span>
        )}
      </button>
    </div>
  );
};

const NotificationPage = () => {
  const { notifications, emptyNotifications } = useNotificationContext();
  const [notViewedNotifications, setNotViewedNotifications] = useState<
    Notification[] | []
  >([]);
  const { userId } = useKeycloak();

  useEffect(() => {
    setNotViewedNotifications(notifications);
  }, []);

  const handleMarkAllAsRead = async () => {
    try {
      await markAllUserNotificationsAsRead(userId);
      setNotViewedNotifications((prevNotifications) =>
        prevNotifications.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );
      toast.success("All notifications marked as read");
      emptyNotifications();
    } catch (error) {
      toast.error("Couldn't mark notifications as read!");
    }
  };

  const groupNotificationsByDate = (notifications: Notification[]) => {
    const groups: { [key: string]: Notification[] } = {};
    notifications.forEach((notification) => {
      const date = new Date(notification.createdAt).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(notification);
    });
    return groups;
  };

  const getNotificationIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "info":
        return <Info className="w-5 h-5 text-blue-500" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const groupedNotifications = groupNotificationsByDate(notViewedNotifications);

  return (
    <div className="flex flex-col items-center p-4 md:p-8 lg:p-12">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>
      <div className="w-full max-w-3xl">
        {notViewedNotifications.length > 0 ? (
          <>
            <div className="flex justify-end mb-4">
              <Button onClick={handleMarkAllAsRead} variant="outline">
                Mark all as read
              </Button>
            </div>
            {Object.entries(groupedNotifications).map(
              ([date, notifications]) => (
                <div key={date} className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">{date}</h2>
                  <ul className="space-y-4">
                    {notifications.map((notification, index) => (
                      <motion.li
                        key={notification.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Card
                          className={`p-4 shadow-md ${
                            notification.isRead ? "bg-gray-50" : "bg-white"
                          }`}
                        >
                          <div className="flex items-start">
                            <div className="mr-4 mt-1">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-grow">
                              <h3 className="text-lg font-semibold">
                                {notification.title}
                              </h3>
                              <p className="text-gray-700 dark:text-gray-300 mt-1">
                                {notification.message}
                              </p>
                              <div className="flex items-center mt-2 text-sm text-gray-500">
                                <Calendar className="w-4 h-4 mr-1" />
                                <time
                                  dateTime={new Date(
                                    notification.createdAt
                                  ).toISOString()}
                                >
                                  {new Date(
                                    notification.createdAt
                                  ).toLocaleTimeString()}
                                </time>
                              </div>

                              <div className="mt-2 text-sm text-gray-500">
                                <span className="font-medium">
                                  Reservation for:
                                </span>{" "}
                                <time
                                  dateTime={new Date(
                                    notification.reservationDate
                                  ).toISOString()}
                                >
                                  {new Date(
                                    notification.reservationDate
                                  ).toLocaleDateString()}
                                </time>
                              </div>
                            </div>
                            {!notification.isRead && (
                              <span
                                className="w-3 h-3 bg-blue-500 rounded-full"
                                aria-hidden="true"
                              />
                            )}
                          </div>
                        </Card>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </>
        ) : (
          <Card className="p-6 text-center shadow-md">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-xl font-semibold">No new notifications</p>
            <p className="text-gray-500 mt-2">
              We'll notify you when something important happens.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export { NotificationBell, NotificationPage, MessageCircleNotification };
