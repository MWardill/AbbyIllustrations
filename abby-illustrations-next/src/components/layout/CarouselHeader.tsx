"use client";

import { useEffect, useMemo, useRef } from "react";
import { Carousel } from "@/src/components/images";
import { useScroll } from "@/src/hooks/ScrollContext";

export default function CarouselHeader() {
  const { handleCarouselNavigate } = useScroll();
  const carouselRef = useRef<HTMLDivElement>(null);

  const carouselImages = useMemo(
    () => [
      { src: "/images/dog-pictures/Abby_Wardill_Dog_Illustration_Smaller_1000.jpg", alt: "Dog Illustrations", eager: true, onClick: () => handleCarouselNavigate?.("/dog-portraits") },
      { src: "/images/pet-portraits/Cat_Abby_Wright.jpg", alt: "Pet Portraits", eager: true, onClick: () => handleCarouselNavigate?.("/pet-portraits") },
      { src: "/images/portraits/Greta_Thunberg_600.jpg", alt: "Portraits", eager: true, onClick: () => handleCarouselNavigate?.("/portraits") },
      { src: "/images/fashion-illustrations/Anna_Calvi.jpg", alt: "Fashion Illustrations", eager: true, onClick: () => handleCarouselNavigate?.("/fashion-images") },
      { src: "/images/baby-pictures/Baby_Girl_Website_700.jpg", alt: "Baby Illustrations", eager: true, onClick: () => handleCarouselNavigate?.("/baby-portraits") },
      { src: "/images/animal-illustrations/piggy.jpeg", alt: "Animal Illustrations", eager: true, onClick: () => handleCarouselNavigate?.("/animal-images") },
      { src: "/images/christmas-animals/Rabbit_Card_Abby_Wright_600.jpg", alt: "Christmas Animals", eager: true, onClick: () => handleCarouselNavigate?.("/christmas-animals") },
    ],
    [handleCarouselNavigate]
  );

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    // Find the scroll container. In your shell it's the drawer-content div.
    const container = el.closest(".drawer-content") as HTMLElement | null;
    if (!container) return;

    const setHeightVar = () => {
      const h = el.offsetHeight;
      container.style.setProperty("--carousel-height", `${h}`);
    };

    setHeightVar();
    const ro = new ResizeObserver(setHeightVar);
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  return (
    <div ref={carouselRef} className="pt-8 px-4">
      <Carousel images={carouselImages} />
    </div>
  );
}
