import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Image } from '../images';

interface CardImage {
    src: string;
    alt: string;
}

interface TimelineCardProps {
    images: CardImage[];
    title: string;
    children: React.ReactNode;
    /** Controls where the image is cropped from. Default is 'center'. */
    objectPosition?: 'top' | 'center' | 'bottom' | 'left' | 'right';
}

export default function TimelineCard({ images, title, children, objectPosition = 'center' }: TimelineCardProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [aspectRatio, setAspectRatio] = useState<number | null>(null);

    // Calculate aspect ratio from the first image
    useEffect(() => {
        if (images.length === 0) return;

        const img = new window.Image();
        img.onload = () => {
            setAspectRatio(img.width / img.height);
        };
        img.src = images[0].src;
    }, [images]);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const objectPositionClass = {
        top: 'object-top',
        center: 'object-center',
        bottom: 'object-bottom',
        left: 'object-left',
        right: 'object-right',
    }[objectPosition];

    return (
        <div className="bg-base-100 shadow-sm w-full max-w-xl overflow-hidden rounded-lg">
            <div
                className="relative overflow-hidden"
                style={{ aspectRatio: aspectRatio ?? 4 / 3 }}
            >
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                            index === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <Image
                            src={image.src}
                            alt={image.alt}
                            className={`w-full h-full object-cover ${objectPositionClass}`}
                        />
                    </div>
                ))}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={goToPrevious}
                            className="absolute left-2 top-1/2 -translate-y-1/2 btn btn-circle btn-sm bg-base-100/80 hover:bg-base-100 border-none z-10"
                            aria-label="Previous image"
                        >
                            <FaChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                            onClick={goToNext}
                            className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-circle btn-sm bg-base-100/80 hover:bg-base-100 border-none z-10"
                            aria-label="Next image"
                        >
                            <FaChevronRight className="h-4 w-4" />
                        </button>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-colors ${
                                        index === currentIndex ? 'bg-primary' : 'bg-base-100/60'
                                    }`}
                                    aria-label={`Go to image ${index + 1}`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
            <div className="p-4 text-left">
                <h2 className="text-xl font-bold mb-2">
                    {title}
                </h2>
                {children}
            </div>
        </div>
    );
}
