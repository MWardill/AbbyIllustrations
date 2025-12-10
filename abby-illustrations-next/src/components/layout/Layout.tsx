"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTransitionRouter } from "next-view-transitions";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { ScrollContext } from "../../hooks";
import { Carousel } from "../images";
import { usePathname } from "next/navigation";

type LayoutProps = {
    children: React.ReactNode;
};


export default function Layout({ children }: LayoutProps) {
    const router = useTransitionRouter();
    const pathname = usePathname();

    const drawerContentRef = useRef<HTMLDivElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);

    const pendingScrollRef = useRef(false);
    const pendingTargetRef = useRef<number | null>(null);
    const [scrollBuffer, setScrollBuffer] = useState(0);

    // Custom smooth scroll with easing for a slower, smoother feel
    const smoothScrollTo = useCallback((targetTop: number, duration: number = 800) => {
        const container = drawerContentRef.current;
        if (!container) return;

        const startTop = container.scrollTop;
        const distance = targetTop - startTop;
        const startTime = performance.now();


        // Easing function: slow start, fast middle, slow end
        const easeInOutCubic = (t: number): number => {
            return t < 0.5 ? 4 * (t ** 3) : 1 - ((-2 * t + 2) ** 3) / 2;
        };

        const animateScroll = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = easeInOutCubic(progress);

            container.scrollTop = startTop + distance * easeProgress;

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        };

        requestAnimationFrame(animateScroll);
    }, []);

    const scrollToTop = () => {
        smoothScrollTo(0, 800);
    };

    const scrollToContent = useCallback(() => {
        setTimeout(() => {
            const container = drawerContentRef.current;
            const carousel = carouselRef.current;
            if (!container || !carousel) return;

            const carouselHeight = carousel.offsetHeight;
            const targetTop = carouselHeight * (1 - 0.25);
            const maxScrollTop = Math.max(0, container.scrollHeight - container.clientHeight);

            if (maxScrollTop >= targetTop) {
                pendingTargetRef.current = targetTop;
                setScrollBuffer(0);
                smoothScrollTo(targetTop, 700);
                return;
            }

            const neededBuffer = targetTop - maxScrollTop + 1;
            pendingTargetRef.current = targetTop;
            setScrollBuffer(current => {
                if (Math.abs(current - neededBuffer) < 1) {
                    requestAnimationFrame(() => smoothScrollTo(targetTop, 700));
                    return current;
                }
                return neededBuffer;
            });
        }, 50);
    }, [smoothScrollTo]);

    useEffect(() => {
        if (!pendingScrollRef.current) return;
        pendingScrollRef.current = false;

        const doc = document as Document & {
            activeViewTransition?: ViewTransition;
        };

        const vt = doc.activeViewTransition;
        if (vt?.finished) {
            vt.finished.then(() => scrollToContent());
            return;
        }

        // Fallback if API unavailable
        requestAnimationFrame(() => scrollToContent());
    }, [pathname, scrollToContent]);


    const handleImageClick = (path: string) => {
        pendingScrollRef.current = true;
        router.push(path);
    };

    const carouselImages = [
        { src: "/images/dog-pictures/Abby_Wardill_Dog_Illustration_Smaller_1000.jpg", alt: "Dog Illustrations", eager: true, onClick: () => handleImageClick("/dog-portraits") },
        { src: "/images/pet-portraits/Cat_Abby_Wright.jpg", alt: "Pet Portraits", eager: true, onClick: () => handleImageClick("/pet-portraits") },
        { src: "/images/portraits/Greta_Thunberg_600.jpg", alt: "Portraits", eager: true, onClick: () => handleImageClick("/portraits") },
        { src: "/images/fashion-illustrations/Anna_Calvi.jpg", alt: "Fashion Illustrations", eager: true, onClick: () => handleImageClick("/fashion-images") },
        { src: "/images/baby-pictures/Baby_Girl_Website_700.jpg", alt: "Baby Illustrations", eager: true, onClick: () => handleImageClick("/baby-portraits") },
        { src: "/images/animal-illustrations/piggy.jpeg", alt: "Animal Illustrations", eager: true, onClick: () => handleImageClick("/animal-images") },
        { src: "/images/christmas-animals/Rabbit_Card_Abby_Wright_600.jpg", alt: "Christmas Animals", eager: true, onClick: () => handleImageClick("/christmas-animals") },
    ];

    return (
        <ScrollContext.Provider value={{ scrollToTop, scrollToContent }}>
            <div className="h-screen flex flex-col overflow-hidden">
                <Navbar />

                <div className="drawer lg:drawer-open flex-1 overflow-hidden">
                    <input id="site-drawer" type="checkbox" className="drawer-toggle" />

                    <div ref={drawerContentRef} className="drawer-content flex flex-col bg-base-200/50 overflow-y-auto relative">
                        <div ref={carouselRef} className="pt-8 px-4">
                            <Carousel images={carouselImages} />
                        </div>
                        <main className="min-h-screen px-6 pb-6">
                            <div className="route-children" style={{viewTransitionName: 'route-children'}}>
                                {children}
                            </div>

                            <div className="hidden md:block fixed bottom-2 right-3 text-[10px] px-10 text-gray-400/70 pointer-events-none select-none">
                                Next v1.1
                            </div>
                        </main>
                    </div>

                    <Sidebar />
                </div>
            </div>
        </ScrollContext.Provider>
    )
}
