'use server';
// import { db } from "@/src/db";
// import { imageGalleries } from "@/src/db/schema";
import { revalidatePath } from "next/cache";
import { getGalleries as fetchGalleries } from '@/db/queries/gallery-maint/galleries';

export async function getGalleries() {
  return await fetchGalleries();
}

type ActionState =
    | { ok: true }
    | { ok: false; fieldErrors?: { title?: string; description?: string }; formError?: string };

export async function createGalleryAction(
    _prevState: ActionState,
    formData: FormData
): Promise<ActionState> {
    const title = String(formData.get("title") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();

    const fieldErrors: ActionState extends any ? any : never = {};
    if (title.length < 2) fieldErrors.title = "Title must be at least 2 characters.";
    if (description.length < 5) fieldErrors.description = "Description must be at least 5 characters.";

    if (fieldErrors.title || fieldErrors.description) {
        return { ok: false, fieldErrors };
    }

    try {

        console.log('Adding new gallery:', {
            gallery_title: title,
            gallery_description: description,
        });
        // await db.insert(imageGalleries).values({
        //     galleryTitle: title,
        //     galleryDescription: description,
        // });

        // re-fetch server components on the page that lists galleries
        revalidatePath("/gallery-maint"); // adjust to your route
        return { ok: true };
    } catch (e) {
        return { ok: false, formError: "Failed to create gallery." };
    }
}