'use client';

import { useState } from 'react';
import type { GalleryImage } from '@/db/queries/gallery-maint/galleries';
import Image from '@/src/components/images/Image';
import { blobUrl } from '@/src/lib/blobUtils';
import styles from './GalleryImageGrid.module.css';

interface GalleryImageGridProps {
    images: GalleryImage[];
}

export function GalleryImageGrid({ images }: GalleryImageGridProps) {
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);    
    const [shouldSlideOut, setShouldSlideOut] = useState(false);
    const [shouldSlideIn, setShouldSlideIn] = useState(false);

    //This is some janky stuff but I dont know why I'm even spending time on this since its not public facing
    const handleImageSelect = (image: GalleryImage) => {                        
        if(selectedImage) {
            setShouldSlideOut(true);
            setShouldSlideIn(false);
            setTimeout(() => {
                setShouldSlideOut(false);
                setShouldSlideIn(true);
                setSelectedImage(image);
            }, 500);
        } else {
            setSelectedImage(image);
        }
            
        
    };

    if (images.length === 0) {
        return <p className="text-gray-500">No images in this gallery</p>;
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-4 items-start">            
            <div className={styles.gridContainer}>
                {images.map((image) => (
                    <div 
                        key={image.id} 
                        className="card bg-base-100 shadow-md lg:w-48 lg:h-56 cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => handleImageSelect(image)}
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
            
            {selectedImage && (
            <div key={selectedImage.id} className={`flex justify-center items-start w-full lg:w-auto ${shouldSlideOut ? styles.previewCardRemove : styles.previewCardChange}`}>
                <div className="card bg-base-100 shadow-md lg:h-[700px]">
                    <figure className="relative w-full lg:h-full bg-gray-200 flex justify-center items-start p-2">
                          <Image
                                src={blobUrl(selectedImage.pathname)}
                                alt={selectedImage.alt}
                                className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                                expand={true}                                
                                 />
                    </figure>
                    <div className="card-body p-2 text-xs overflow-hidden space-y-2">
                        <p className="truncate"><span className="font-medium">Alt:</span> {selectedImage.alt}</p>
                        {selectedImage.about && <p className="truncate"><span className="font-medium">About:</span> {selectedImage.about}</p>}
                        <p className="text-gray-500 text-xs">Updated: {new Date(selectedImage.updatedAt).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
            )}
            
            <div className="hidden lg:block" />
        </div>
    );
}
