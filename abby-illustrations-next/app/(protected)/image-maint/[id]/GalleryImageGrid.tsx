'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { GalleryImage } from '@/db/queries/gallery-maint/galleries';
import { updateImage } from '@/db/queries/gallery-maint/galleries';
import Image from '@/src/components/images/Image';
import { blobUrl } from '@/src/lib/blobUtils';
import styles from './GalleryImageGrid.module.css';

interface GalleryImageGridProps {
    images: GalleryImage[];
}

export function GalleryImageGrid({ images }: GalleryImageGridProps) {
    const router = useRouter();
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
    const [formData, setFormData] = useState<Partial<GalleryImage>>({});
    const [shouldSlideOut, setShouldSlideOut] = useState(false);    

    //This is some janky stuff but I dont know why I'm even spending time on this since its not public facing
    const handleImageSelect = (image: GalleryImage) => {                        
        if(selectedImage) {
            setShouldSlideOut(true);            
            setTimeout(() => {
                setShouldSlideOut(false);                
                setSelectedImage(image);
                setFormData(image);
            }, 500);
        } else {
            setSelectedImage(image);
            setFormData(image);
        }
            
        
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedImage) return;
        
        try {
            await updateImage(selectedImage.id, formData);
            router.refresh();
            setSelectedImage({ ...selectedImage, ...formData, updatedAt: new Date() } as GalleryImage);
        } catch (error) {
            console.error('Failed to update image', error);
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
            <div key={selectedImage.id} className={`sticky top-4 flex justify-center items-start w-full lg:w-auto ${shouldSlideOut ? styles.previewCardRemove : styles.previewCardChange}`}>
                <div className="card bg-base-100 shadow-md lg:h-[75vh]">
                    <figure className="relative w-full lg:h-full  flex justify-center items-start p-2">
                          <Image
                                src={blobUrl(selectedImage.pathname)}
                                alt={selectedImage.alt}
                                className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                                expand={true}                                
                                 />
                    </figure>
                    <div className="card-body p-2 text-xs overflow-hidden space-y-2">
                        <form onSubmit={handleUpdate} className="flex flex-col gap-2 w-full">
                            <div className="form-control w-full">
                                <label className="label py-1">
                                    <span className="label-text text-xs font-medium">Alt Text</span>
                                </label>
                                <input 
                                    type="text" 
                                    className="input input-bordered input-sm w-full text-xs" 
                                    value={formData.alt || ''} 
                                    onChange={(e) => setFormData({...formData, alt: e.target.value})}
                                />
                            </div>

                            <div className="form-control w-full">
                                <label className="label py-1">
                                    <span className="label-text text-xs font-medium">About</span>
                                </label>
                                <textarea 
                                    className="textarea textarea-bordered textarea-sm w-full text-xs" 
                                    value={formData.about || ''} 
                                    onChange={(e) => setFormData({...formData, about: e.target.value})}
                                    rows={3}
                                />
                            </div>

                            <div className="form-control w-full">
                                <label className="label py-1">
                                    <span className="label-text text-xs font-medium">Author</span>
                                </label>
                                <input 
                                    type="text" 
                                    className="input input-bordered input-sm w-full text-xs" 
                                    value={formData.author || ''} 
                                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                                />
                            </div>

                            <div className="form-control w-full">
                                <label className="label py-1">
                                    <span className="label-text text-xs font-medium">Created Date</span>
                                </label>
                                <input 
                                    type="date" 
                                    className="input input-bordered input-sm w-full text-xs" 
                                    value={formData.createdDate ? String(formData.createdDate) : ''} 
                                    onChange={(e) => setFormData({...formData, createdDate: e.target.value})}
                                />
                            </div>

                            <div className="mt-2">
                                <p className="text-gray-500 text-xs">Updated: {new Date(selectedImage.updatedAt).toLocaleDateString()}</p>
                            </div>

                            <button type="submit" className="btn btn-primary btn-sm mt-2 w-full">
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            )}
            
            <div className="hidden lg:block" />
        </div>
    );
}
