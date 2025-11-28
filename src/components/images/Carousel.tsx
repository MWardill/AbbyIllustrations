import { useRef } from 'react';
import { Image } from '../../components/images';

const carouselCardClass = "carousel-item w-[85%] sm:w-[45%] lg:w-[28%] shrink-0";
const carouselImgClass = "w-full h-auto rounded-box shadow-md object-cover transition-all duration-300 hover:scale-105";

export type CarouselImage = {
    src: string;
    alt: string;
    eager?: boolean;
}

type CarouselProps = {
    images: CarouselImage[];
}

export default function Carousel({ images }: CarouselProps) {
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
                    <div key={index} className={carouselCardClass}>
                        <Image
                            src={image.src}
                            alt={image.alt}
                            className={carouselImgClass}
                            eager={image.eager}
                        />
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