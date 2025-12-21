"use client";

import { useGalleries } from "@/src/hooks/GalleryContext";
import ImageGallery from "@/src/components/gallery/ImageGallery";
import { notFound } from "next/navigation";

interface GalleryRootProps {
    images: string[];
    galleryTitle: string;
}

export default function GalleryRoot({ images, galleryTitle }: GalleryRootProps) {
    const { galleries } = useGalleries();
    const gallery = galleries.find(g => g.gallery_title === galleryTitle);

    if (!gallery) {
        notFound();
    }

    const paragraphs = gallery.gallery_description
        .split(/\n\s*\n/)
        .map(p => p.trim())
        .filter(Boolean);

    return (
        <ImageGallery title={gallery.menu_title || gallery.gallery_title} photos={images}  objectPosition={gallery.image_position || 'center'}>
            {paragraphs.map((p, i) => (
                <p key={i} className="mt-3">
                    {p}
                </p>
            ))}
        </ImageGallery>
    );
}
