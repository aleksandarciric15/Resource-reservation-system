import { Message } from "@/api/models/notification";
import TextareaFormField from "@/components/shared/TextareaFormField";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNotificationContext } from "../shared/NotificationProvider";
import {
  markAllUserMessagesAsRead,
  markMessageAsRead,
  sendMessage,
} from "@/api/services/notification-service";
import { toast } from "sonner";
import { useKeycloak } from "../shared/KeycloakProvider";
import { MessageSquareX } from "lucide-react";

const messageSchema = z.object({
  message: z
    .string()
    .min(10, "Message must have at least 10 characters!")
    .max(500, "Message must be less than 500 characters"),
});

type MessageFormValues = z.infer<typeof messageSchema>;

export default function MessagesPage() {
  const { userId, profile } = useKeycloak();
  const { messages, emptyMessages, removeMessage } = useNotificationContext();
  const [notViewedMessages, setNotViewedMessages] = useState<Message[]>([]);
  const [replyTo, setReplyTo] = useState<Message | null>(null);
  const [isSending, setIsSending] = useState(false);

  const form = useForm<MessageFormValues>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: "",
    },
  });

  useEffect(() => {
    setNotViewedMessages(messages);
  }, []);

  const handleMarkAsRead = async (id: number) => {
    try {
      await markMessageAsRead(id);

      setNotViewedMessages((prevMessages) => {
        const index = prevMessages.findIndex((message) => message.id === id);
        if (index === -1) return prevMessages;

        const updatedMessages = [...prevMessages];
        updatedMessages[index] = { ...updatedMessages[index], isRead: true };
        return updatedMessages;
      });

      removeMessage(id);

      toast.success("Message marked as read");
    } catch (error) {
      toast.error("Couldn't mark message as read!");
    }
  };

  const handleMarkAllMessagesAsRead = async () => {
    try {
      await markAllUserMessagesAsRead(userId);
      setNotViewedMessages((prevMessages) =>
        prevMessages.map((message) => ({
          ...message,
          isRead: true,
        }))
      );
      toast.success("All notifications marked as read");
      emptyMessages();
    } catch (error) {
      toast.error("Couldn't mark notifications as read!");
    }
  };

  const handleReply = (message: Message) => {
    setReplyTo(message);
  };

  const handleSendReply = async (data: MessageFormValues) => {
    if (replyTo) {
      setIsSending(true);
      try {
        const request = {
          senderId: userId,
          receiverId: replyTo.senderId,
          resourceId: replyTo.resourceId,
          message: data.message,
          senderName: `${profile?.firstName} ${profile?.lastName}`,
          senderUsername: profile?.username,
          resourceName: replyTo.resourceName,
          resourceTypeName: replyTo.resourceTypeName,
          reservationDateTime: replyTo.reservationDateTime,
        };

        await sendMessage(request);

        toast.success("Message has been sent successfully!");
      } catch (error) {
        toast.error("Couldn't send message!");
      } finally {
        setIsSending(false);
        setReplyTo(null);
        form.reset({});
      }
    }
  };

  return (
    <div className="max-w-screen-md mx-auto p-4 md:p-8 lg:p-12">
      <h1 className="text-3xl font-bold mb-6 flex justify-center">Messages</h1>
      <div className="space-y-4">
        {notViewedMessages?.length > 0 ? (
          notViewedMessages.map((message) => (
            <Card
              key={message.id}
              className={`transition-all duration-300  ${
                message.isRead ? "bg-gray-50" : "bg-white shadow-md"
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.senderUsername}`}
                    />
                    <AvatarFallback>{message.senderName}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {message.senderName}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      @{message.senderUsername}
                    </p>
                    <p className="mt-1 text-sm text-gray-900">
                      {message.message}
                    </p>
                    <div className="mt-2 flex items-center space-x-2 text-xs text-gray-500">
                      <span>
                        {format(
                          new Date(message.createdAt),
                          "MMM d, yyyy HH:mm"
                        )}
                      </span>
                      <span>•</span>
                      <Badge variant="outline">{message.resourceName}</Badge>
                      <span>•</span>
                      <span>Reserved for: {message.reservationDateTime}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  {!message.isRead && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMarkAsRead(message.id)}
                    >
                      Mark as Read
                    </Button>
                  )}
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleReply(message)}
                  >
                    Reply
                  </Button>
                </div>
                {replyTo?.id === message.id && (
                  <div className="mt-4">
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(handleSendReply)}
                        className="space-y-4"
                      >
                        <TextareaFormField
                          control={form.control}
                          label="Message"
                          name="message"
                          description="Type your reply here..."
                          placeholder="I have a ..."
                        />
                        <Button type="submit" disabled={isSending}>
                          {isSending ? "Sending..." : "Send Reply"}
                        </Button>
                      </form>
                    </Form>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="p-6 text-center shadow-md">
            <MessageSquareX className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-xl font-semibold">No new messages</p>
            <p className="text-gray-500 mt-2">
              We'll notify you when something important happens.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
