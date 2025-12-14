'use client';
import type { GalleryImage } from '@/db/queries/gallery-maint/galleries';
import Image from '@/src/components/images/Image';
import { blobUrl } from '@/src/lib/blobUtils';
import styles from './GalleryImageGrid.module.css';

interface GalleryImageGridProps {
    images: GalleryImage[];
}

export function GalleryImageGrid({ images }: GalleryImageGridProps) {
    return (
        <>
            {images.length > 0 ? (
                <div className="flex justify-center">
                    <div className={styles.gridContainer}>
                        {images.map((image) => (
                            <div key={image.id} className="border rounded-lg overflow-hidden bg-gray-50">
                                <div className="relative w-full aspect-square bg-gray-200">
                                    <Image
                                        src={blobUrl(image.pathname)}
                                        alt={image.alt}
                                        className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                                        expand={false}
                                        width={300}
                                        height={300}
                                    />
                                </div>
                                <div className="p-3 space-y-1 text-sm">
                                    <p><span className="font-medium">Alt:</span> {image.alt}</p>
                                    {image.about && <p><span className="font-medium">About:</span> {image.about}</p>}
                                    {image.createdDate && <p><span className="font-medium">Created:</span> {image.createdDate}</p>}
                                    <p><span className="font-medium">Updated:</span> {new Date(image.updatedAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p className="text-gray-500">No images in this gallery</p>
            )}
        </>
    );
}
