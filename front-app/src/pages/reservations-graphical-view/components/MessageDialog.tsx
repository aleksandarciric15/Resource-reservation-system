import type { Reservation } from "@/api/models/api-composition";
import { ColorResource } from "@/api/models/resource";
import { sendMessage } from "@/api/services/notification-service";
import TextareaFormField from "@/components/shared/TextareaFormField";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useKeycloak } from "@/pages/shared/KeycloakProvider";
import { formatReservationDateTime } from "@/utils/time-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const messageSchema = z.object({
  message: z
    .string()
    .min(10, "Message must have at least 10 characters!")
    .max(500, "Message must be less than 500 characters"),
});

type MessageFormValues = z.infer<typeof messageSchema>;

interface MessageDialogProps {
  resource: ColorResource;
  reservation: Reservation;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function MessageDialog({
  resource,
  reservation,
  isOpen,
  setIsOpen,
}: MessageDialogProps) {
  const [isSending, setIsSending] = useState(false);
  const { userId, authenticated, profile } = useKeycloak();

  const form = useForm<MessageFormValues>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = async (data: MessageFormValues) => {
    setIsSending(true);
    try {
      if (!authenticated) return;

      const dateTimeFormat = formatReservationDateTime(
        reservation.date,
        reservation.startTime,
        reservation.endTime
      );

      const request = {
        senderId: userId,
        receiverId: reservation.employee.userId,
        resourceId: resource.id,
        message: data.message,
        senderName: `${profile?.firstName} ${profile?.lastName}`,
        senderUsername: profile?.username,
        resourceName: resource.name,
        resourceTypeName: resource.resourceTypeName,
        reservationDateTime: dateTimeFormat,
      };

      await sendMessage(request);

      toast.success("Message has been sent successfully!");
    } catch (error) {
      toast.error("Couldn't send message!");
    } finally {
      setIsOpen(false);
      setIsSending(false);
      form.reset({});
    }
  };

  useEffect(() => {
    if (!isOpen) {
      form.reset({});
    }
  }, [isOpen, form]);

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Send Message</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <TextareaFormField
            control={form.control}
            label="Message"
            name="message"
            description="Here enter your message."
            placeholder="I have a ..."
          />
          <DialogFooter>
            <Button type="submit" disabled={isSending}>
              {isSending ? "Sending..." : "Send Message"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
