"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { ScrollContext } from "../../hooks";
import { Carousel } from "../images";
import { AnimatePresence, motion } from "framer-motion";

type LayoutProps = {
    children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    const router = useRouter();
    const drawerContentRef = useRef<HTMLDivElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);

    const pathname = usePathname();

    const [displayedChildren, setDisplayedChildren] = useState(children);
    const [displayedPath, setDisplayedPath] = useState(pathname);
    const [pendingChildren, setPendingChildren] = useState<React.ReactNode | null>(null);
    const [pendingPath, setPendingPath] = useState<string | null>(null);
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);

    /* eslint-disable react-hooks/set-state-in-effect */
    useEffect(() => {
        if (pathname === displayedPath || pathname === pendingPath) {
            return;
        }

        // We intentionally trigger state updates here to queue the next page
        // before the current one finishes its exit animation. This keeps the
        // previous React tree mounted until AnimatePresence completes the
        // transition.
        setPendingChildren(children);
        setPendingPath(pathname);
        setIsAnimatingOut(true);
    }, [children, pathname, displayedPath, pendingPath]);
    /* eslint-enable react-hooks/set-state-in-effect */

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

    const scrollToContent = () => {
        setTimeout(() => {
            if (carouselRef.current) {
                const carouselHeight = carouselRef.current.offsetHeight;
                smoothScrollTo(carouselHeight / 1.3, 700);
            }
        }, 50);
    };

    const handleImageClick = (path: string) => {
        router.push(path);
        scrollToContent();
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
                        <AnimatePresence
                            mode="wait"
                            initial={false}
                            onExitComplete={() => {
                                if (pendingChildren && pendingPath) {
                                    setDisplayedChildren(pendingChildren);
                                    setDisplayedPath(pendingPath);
                                    setPendingChildren(null);
                                    setPendingPath(null);
                                }
                                setIsAnimatingOut(false);
                            }}
                        >
                            {!(isAnimatingOut && pendingChildren) && (
                                <motion.main
                                    key={displayedPath}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="min-h-screen px-6 pb-6"
                                >
                                    {displayedChildren}

                                    <div className="hidden md:block fixed bottom-2 right-3 text-[10px] text-gray-400/70 pointer-events-none select-none">
                                        v1.1
                                    </div>
                                </motion.main>
                            )}
                        </AnimatePresence>
                    </div>

                    <Sidebar />
                </div>
            </div>
        </ScrollContext.Provider>
    )
}
