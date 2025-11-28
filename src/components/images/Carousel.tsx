import { useRef } from 'react';
import { Image } from '../../components/images';

const carouselImgClass = "w-full h-auto rounded-box shadow-md object-cover transition-all duration-300 hover:scale-105";
const carouselImgClickableClass = carouselImgClass + " cursor-pointer";

export type CarouselImage = {
    src: string;
    alt: string;
    eager?: boolean;
    onClick?: () => void;
}

type CarouselProps = {
    images: CarouselImage[];
    itemWidth?: {        
        sm?: number;
        lg?: number;
    };
}

export default function Carousel({ 
    images, 
    itemWidth = { sm: 45, lg: 20 } 
}: CarouselProps) {
    const carouselRef = useRef<HTMLDivElement>(null);

    const scrollByOne = (dir: "left" | "right") => {
        const el = carouselRef.current
        if (!el) return

        const first = el.querySelector(":scope > *") as HTMLElement | null

        const cs = getComputedStyle(el)
        const gap = parseFloat(cs.columnGap || cs.gap || "0")

        const step = (first?.offsetWidth ?? el.clientWidth * 0.8) + gap

        const behavior: ScrollBehavior =
            window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"

        const max = el.scrollWidth - el.clientWidth
        const nextLeft = el.scrollLeft + (dir === "left" ? -step : step)
        const clamped = Math.max(0, Math.min(max, nextLeft))

        el.scrollTo({ left: clamped, behavior })
    }

    const handleImageClick = (index: number, onClick?: () => void) => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        const items = carousel.querySelectorAll(":scope > *");
        const clickedItem = items[index] as HTMLElement;
        
        if (clickedItem) {
            const carouselRect = carousel.getBoundingClientRect();
            const elementRect = clickedItem.getBoundingClientRect();

            // Check which side is cut off and scroll accordingly
            if (elementRect.left < carouselRect.left) {
                scrollByOne('left');
            } else if (elementRect.right > carouselRect.right) {
                scrollByOne('right');
            }
        }

        if (onClick) {
            onClick();
        }
    };

    return (
        <div className="relative w-full">
            <button
                onClick={() => scrollByOne('left')}
                className="btn btn-circle btn-lg btn-ghost absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-base-100/80 hover:bg-base-100 text-2xl"
                aria-label="Scroll left"
            >
                ❮
            </button>
            <div
                ref={carouselRef}
                className="carousel carousel-center w-full gap-4 rounded-box bg-base-200 p-4 px-12 overflow-x-auto scroll-smooth"
            >
                {images.map((image, index) => (
                    <div 
                        key={index} 
                        className="carousel-item shrink-0 relative group"
                        style={{
                            '--carousel-width-sm': `${itemWidth.sm}%`,
                            '--carousel-width-lg': `${itemWidth.lg}%`,
                        } as React.CSSProperties}
                    >
                        <Image
                            src={image.src}
                            alt={image.alt}
                            className={image.onClick ? carouselImgClickableClass : carouselImgClass}
                            eager={image.eager}
                            onClick={() => handleImageClick(index, image.onClick)}
                        />
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-base-100/80 px-3 py-1 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                            {image.alt}
                        </div>
                    </div>
                ))}
            </div>
            <button
                onClick={() => scrollByOne('right')}
                className="btn btn-circle btn-lg btn-ghost absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-base-100/80 hover:bg-base-100 text-2xl"
                aria-label="Scroll right"
            >
                ❯
            </button>
        </div>
    )
}