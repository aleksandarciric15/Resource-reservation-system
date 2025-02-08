import { z } from "zod";

const timeSchema = z.object({
  time: z.string().refine((value) => {
    if (!value) return false;
    const [hours, minutes] = value.split(":").map(Number);
    return hours >= 8 && hours < 20 && minutes === 0;
  }, "Please select a valid time between 08:00 and 20:00 in 1-hour steps"),
});

type TimeFormData = z.infer<typeof timeSchema>;
