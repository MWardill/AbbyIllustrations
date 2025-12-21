import { z } from "zod";

export const gallerySchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Title must be at least 2 characters.")
    .max(100, "Title must be 100 characters or less."),
  menuTitle: z
    .string()
    .trim()
    .min(2, "Menu title  must be at least 2 characters.")
    .max(50, "Menu title must be 50 characters or less.")
    .optional(),
  description: z
    .string()
    .trim()
    .min(2, "Description must be at least 5 characters.")
    .max(500, "Description must be 500 characters or less."),
  imagePosition: z
    .enum(['top', 'center', 'bottom', 'left', 'right'])
    .nullable()
    .or(z.literal(''))
    .optional(),
});

export type GalleryInput = z.infer<typeof gallerySchema>;