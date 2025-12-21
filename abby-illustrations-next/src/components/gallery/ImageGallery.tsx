import { Image } from '../images';
import type { GalleryImage } from '@/db/queries/gallery-maint/galleries';
import { blobUrl } from '@/src/lib/blobUtils';

interface ImageGalleryProps {
    title: string;
    photos: GalleryImage[];
    children: React.ReactNode;
    /** Controls where the image is cropped from. Default is 'top'. */
    objectPosition?: 'top' | 'center' | 'bottom' | 'left' | 'right';
}

export default function ImageGallery({ title, photos, children, objectPosition = 'top' }: ImageGalleryProps) {
    const objectPositionClass = {
        top: 'object-top',
        center: 'object-center',
        bottom: 'object-bottom',
        left: 'object-left',
        right: 'object-right',
    }[objectPosition];

    return (
        <div className="flex flex-col md:flex-row pt-10 pb-50">
            <div className="md:w-1/5 md:pr-4 md:sticky md:top-20 md:self-start">
                <h1 className="text-3xl font-bold">{title}</h1>
                {children}
            </div>
            <div className="hidden md:block w-px bg-gray-300 mx-4"></div>
            <div className="mt-6 md:mt-0 md:w-2/3">
                <div className="flex flex-col gap-4 md:grid md:grid-cols-3">
                    {photos.map((photo, index) => (
                        <div key={index} className="rounded-box overflow-hidden aspect-3/4">
                            <Image 
                                src={blobUrl(photo.pathname)} 
                                alt={photo.alt || `${title} ${index + 1}`} 
                                className={`w-full h-full object-cover ${objectPositionClass}`} 
                                expand 
                                author={photo.author}
                                about={photo.about}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
