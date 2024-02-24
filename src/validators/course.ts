import { z } from "zod";

export const courseSchema = z.object({
  title: z.string().min(3).max(100),
  units: z.array(z.string()),
});
