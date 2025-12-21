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

    return (
        <ImageGallery title={gallery.menu_title || gallery.gallery_title} photos={images}>
            <p>{gallery.gallery_description}</p>
        </ImageGallery>
    );
}
