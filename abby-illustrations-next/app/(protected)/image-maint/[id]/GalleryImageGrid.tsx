'use client';

import type { GalleryImage } from '@/db/queries/gallery-maint/galleries';
import Image from '@/src/components/images/Image';
import { blobUrl } from '@/src/lib/blobUtils';
import styles from './GalleryImageGrid.module.css';

interface GalleryImageGridProps {
    images: GalleryImage[];
    selectedImage: GalleryImage | null;
    onSelect: (image: GalleryImage) => void;
}

export function GalleryImageGrid({ images, selectedImage, onSelect }: GalleryImageGridProps) {
    return (
        <div className={`${styles.gridContainer} ${selectedImage ? 'hidden! lg:grid!' : ''}`}>
            {images.map((image) => (
                <div 
                    key={image.id} 
                    className="card bg-base-100 shadow-md lg:w-48 lg:h-56 cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => onSelect(image)}
                >
                    <figure className="relative w-full lg:h-40 bg-gray-200">
                        <Image
                            src={blobUrl(image.pathname)}
                            alt={image.alt}
                            className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                            expand={false}
                            width={160}
                            height={128}
                        />
                    </figure>
                    <div className="card-body p-2 space-y-0 text-xs flex-1 overflow-hidden">
                        <p className="truncate">
                            <span className="font-medium">Alt:</span> {image.alt}
                        </p>
                        {image.about && (
                            <p className="truncate">
                                <span className="font-medium">About:</span> {image.about}
                            </p>
                        )}
                        <p className="text-gray-500 text-xs">
                            Updated: {new Date(image.updatedAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
