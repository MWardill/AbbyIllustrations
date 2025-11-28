import { useCallback, useRef } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import { ScrollContext } from "../../hooks"
import { Carousel } from "../images"
import animalImg from '../../assets/animal-illustrations/piggy.jpeg';
import babyImg from '../../assets/baby-pictures/Baby_Girl_Website_700.jpg';
import christmasImg from '../../assets/christmas-animals/Rabbit_Card_Abby_Wright_600.jpg';
import dogImg from '../../assets/dog-pictures/Abby_Wardill_Dog_Illustration_Smaller_1000.jpg';
import fashionImg from '../../assets/fashion-illustrations/Anna_Calvi.jpg';
import portraitImg from '../../assets/portraits/Greta_Thunberg_600.jpg';

export default function Layout() {
    const navigate = useNavigate();
    const drawerContentRef = useRef<HTMLDivElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);

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
        navigate(path);
        scrollToContent();
    };

    const carouselImages = [
        { src: dogImg, alt: "Dog Illustrations", eager: true, onClick: () => handleImageClick("/dog-portraits") },
        { src: portraitImg, alt: "Portraits", eager: true, onClick: () => handleImageClick("/portraits") }, 
        { src: fashionImg, alt: "Fashion Illustrations", eager: true, onClick: () => handleImageClick("/fashion-images") }, 
        { src: babyImg, alt: "Baby Illustrations", eager: true, onClick: () => handleImageClick("/baby-portraits") },  
        { src: animalImg, alt: "Animal Illustrations", eager: true, onClick: () => handleImageClick("/animal-images") },                 
        { src: christmasImg, alt: "Christmas Animals", eager: true, onClick: () => handleImageClick("/christmas-animals") },        
    ];

    return (
        <ScrollContext.Provider value={{ scrollToTop, scrollToContent }}>
            <div className="h-screen flex flex-col overflow-hidden">
                <Navbar />

                <div className="drawer lg:drawer-open flex-1 overflow-hidden">
                    <input id="site-drawer" type="checkbox" className="drawer-toggle" />

                    <div ref={drawerContentRef} className="drawer-content flex flex-col bg-base-200/50 overflow-y-auto">
                        <div ref={carouselRef} className="pt-8 px-4">
                            <Carousel images={carouselImages} />
                        </div>
                        <main className="min-h-screen px-6 pb-6">
                            <Outlet />
                        </main>
                    </div>

                    <Sidebar />
                </div>
            </div>
        </ScrollContext.Provider>
    )
}
