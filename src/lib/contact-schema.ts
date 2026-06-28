import { z } from "zod";

// Shared by the client form (inline validation) and the API route (trusted
// server-side validation). Keep these in sync — one source of truth.
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.email("Please enter a valid email address").max(200),
  phone: z.string().trim().max(40).optional(),
  subject: z.string().trim().max(150).optional(),
  message: z
    .string()
    .trim()
    .min(10, "Please share a little more so we can help")
    .max(5000, "That message is a bit too long"),
  // Honeypot — real users never fill this; bots often do. Kept permissive so
  // the API route can silently accept (200) when it's filled, rather than
  // returning a validation error that signals the trap to bots.
  company: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
