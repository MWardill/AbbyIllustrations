'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { type GalleryImage } from '@/db/queries/gallery-maint/galleries';
import { updateGalleryImage, deleteGalleryImage } from '../actions';
import { toast } from "sonner";
import { handleError } from '@/src/lib/errorUtils';
import { GalleryImageForm } from './GalleryImageForm';
import { GalleryImageGrid } from './GalleryImageGrid';

interface GalleryImageMaintProps {
    images: GalleryImage[];
}

export function GalleryImageMaint({ images }: GalleryImageMaintProps) {
    const router = useRouter();
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
    const [shouldSlideOut, setShouldSlideOut] = useState(false);

    const handleImageSelect = (image: GalleryImage) => {
        if (selectedImage) {
            setShouldSlideOut(true);
            setTimeout(() => {
                setShouldSlideOut(false);
                setSelectedImage(image);
            }, 500);
        } else {
            setSelectedImage(image);
        }
    };

    const handleSave = async (formData: Partial<GalleryImage>) => {
        if (!selectedImage) return;

        try {
            await updateGalleryImage(selectedImage.id, formData);                    
            router.refresh();
            toast.success("Image updated successfully");
            setSelectedImage({ ...selectedImage, ...formData, updatedAt: new Date() } as GalleryImage);
        } catch (error) {
            handleError(error);
        }
    };

    const handleDelete = async () => {
        if (!selectedImage) return;

        try {
            await deleteGalleryImage(selectedImage.id);
            router.refresh();
            toast.success("Image deleted successfully");
            setSelectedImage(null);
        } catch (error) {
            handleError(error);
        }
    };

    if (images.length === 0) {
        return <p className="text-gray-500">No images in this gallery</p>;
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-4 items-start">
            <GalleryImageGrid 
                images={images} 
                selectedImage={selectedImage} 
                onSelect={handleImageSelect} 
            />

            {selectedImage && (
                <GalleryImageForm
                    image={selectedImage}
                    shouldSlideOut={shouldSlideOut}
                    onSave={handleSave}
                    onDelete={handleDelete}
                    onCancel={() => setSelectedImage(null)}
                />
            )}

            <div className="hidden lg:block" />
        </div>
    );
}
