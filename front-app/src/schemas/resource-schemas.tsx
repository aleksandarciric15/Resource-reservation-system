import { z } from "zod";

export const reserveTableSchema = z.object({
  reason: z.string().min(5, "Minimum 5 characters!"),
});
