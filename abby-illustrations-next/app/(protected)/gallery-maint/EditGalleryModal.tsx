'use client';
import { ConfirmCancelModal } from '@/src/components/ui';
import type { GalleryImage } from '@/db/queries/gallery-maint/galleries';
import Image from '@/src/components/images/Image';
import { blobUrl } from '@/src/lib/blobUtils';
import { FaSlidersH } from 'react-icons/fa';

interface EditGalleryModalProps {
    isOpen: boolean;
    galleryTitle: string;
    galleryImages: GalleryImage[];
    onClose: () => void;
    onTransitionEnd?: () => void;
}

export function EditGalleryModal({ isOpen, galleryTitle, galleryImages, onClose, onTransitionEnd }: EditGalleryModalProps) {
    return (
        <ConfirmCancelModal
            isOpen={isOpen}
            title={`Edit Gallery: ${galleryTitle}`}
            description="Manage images for this gallery"
            onClose={onClose}
            onConfirm={onClose}
            confirmText="Done"
            cancelText="Close"
            onTransitionEnd={onTransitionEnd}
        >            
            {galleryImages.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                    {galleryImages.map((image) => (
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
            ) : (
                <p className="text-gray-500">No images in this gallery</p>
            )}
        </ConfirmCancelModal>
    );
}
