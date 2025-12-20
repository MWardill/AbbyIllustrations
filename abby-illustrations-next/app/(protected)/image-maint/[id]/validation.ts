import { z } from 'zod';

export const galleryImageSchema = z.object({
    alt: z.string().min(1, "Alt text is required"),
    about: z.string().optional().nullable(),
    author: z.string().min(2, "Author must be at least 2 characters").optional().nullable(),
    createdDate: z.string().optional().nullable(),
    primaryImage: z.boolean().optional(),
});

export type GalleryImageFormData = z.infer<typeof galleryImageSchema>;
