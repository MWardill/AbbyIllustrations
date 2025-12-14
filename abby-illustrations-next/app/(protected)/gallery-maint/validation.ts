import { z } from "zod";

export const gallerySchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Title must be at least 2 characters.")
    .max(100, "Title must be 100 characters or less."),
  description: z
    .string()
    .trim()
    .min(2, "Description must be at least 5 characters.")
    .max(500, "Description must be 500 characters or less."),
});

export type GalleryInput = z.infer<typeof gallerySchema>;