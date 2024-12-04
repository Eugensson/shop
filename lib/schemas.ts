import { z } from "zod";

export const feedbackFormSchema = z.object({
  username: z
    .string()
    .min(1, {
      message: "Required field.",
    })
    .max(64, {
      message: "Max 64 characters.",
    }),
  phone: z.string(),
  email: z
    .string()
    .min(1, {
      message: "Required field",
    })
    .email({
      message: "Invalid email format",
    }),
  message: z
    .string()
    .min(1, {
      message: "Required field",
    })
    .max(1000, {
      message: "Max 1000 characters.",
    }),
});
