import { Image } from '../images';

interface ImageGalleryProps {
    title: string;
    photos: string[];
    children: React.ReactNode;
}

export default function ImageGallery({ title, photos, children }: ImageGalleryProps) {
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
                        <div key={index} className="rounded-box overflow-hidden">
                            <Image src={photo} alt={`${title} ${index + 1}`} className="w-full h-auto object-cover" expand />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
