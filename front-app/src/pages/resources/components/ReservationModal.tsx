"use client";

import TextareaFormField from "@/components/shared/TextareaFormField";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { reserveTableSchema } from "@/schemas/resource-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: z.infer<typeof reserveTableSchema>) => void;
  seatName: string;
}

export function ReservationModal({
  isOpen,
  onClose,
  onSubmit,
  seatName,
}: ReservationModalProps) {
  const reserveTableForm = useForm<z.infer<typeof reserveTableSchema>>({
    resolver: zodResolver(reserveTableSchema),
    defaultValues: {},
  });

  const handleSubmit = (data: z.infer<typeof reserveTableSchema>) => {
    onSubmit(data);
    reserveTableForm.reset({});
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reserve {seatName}</DialogTitle>
        </DialogHeader>
        <Form {...reserveTableForm}>
          <form onSubmit={reserveTableForm.handleSubmit(handleSubmit)}>
            <TextareaFormField
              control={reserveTableForm.control}
              name="reason"
              label="Reason"
              description="Expline why you want to reserve this table (max 300 characters)"
              placeholder="I want to reserve this table because ..."
            />
            <DialogFooter className="mt-4">
              <Button type="submit">Reserve Seat</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
