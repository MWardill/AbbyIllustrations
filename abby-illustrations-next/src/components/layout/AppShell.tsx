"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";

import Navbar from "@/src/components/layout/Navbar";
import Sidebar from "@/src/components/layout/Sidebar";
import { ScrollContext } from "@/src/hooks/ScrollContext";
import { Toaster } from "sonner";
import { Gallery } from "@/db/queries/gallery-maint/galleries";
import { GalleryProvider } from "@/src/hooks/GalleryContext";

export default function AppShell({ children, galleries }: { children: React.ReactNode; galleries: Gallery[] }) {
  const router = useTransitionRouter();
  const pathname = usePathname();

  const drawerContentRef = useRef<HTMLDivElement>(null);

  const pendingScrollRef = useRef(false);
  const pendingTargetRef = useRef<number | null>(null);
  const [scrollBuffer, setScrollBuffer] = useState(0);

  const smoothScrollTo = useCallback((targetTop: number, duration: number = 800) => {
    const container = drawerContentRef.current;
    if (!container) return;

    const startTop = container.scrollTop;
    const distance = targetTop - startTop;
    const startTime = performance.now();

    const easeInOutCubic = (t: number): number =>
      t < 0.5 ? 4 * t ** 3 : 1 - ((-2 * t + 2) ** 3) / 2;

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = easeInOutCubic(progress);

      container.scrollTop = startTop + distance * easeProgress;

      if (progress < 1) requestAnimationFrame(animateScroll);
    };

    requestAnimationFrame(animateScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    smoothScrollTo(0, 800);
  }, [smoothScrollTo]);

  
  const scrollToContent = useCallback(() => {
    setTimeout(() => {
      const container = drawerContentRef.current;
      if (!container) return;

      const cssVal = getComputedStyle(container).getPropertyValue("--carousel-height");
      const carouselHeight = Number.parseFloat(cssVal || "0") || 0;

      // if no carousel, do nothing (or scroll to top—your call)
      if (carouselHeight <= 0) return;

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
      setScrollBuffer((current) => {
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

    const doc = document as Document & { activeViewTransition?: ViewTransition };
    const vt = doc.activeViewTransition;

    if (vt?.finished) {
      vt.finished.then(() => scrollToContent());
      return;
    }

    requestAnimationFrame(() => scrollToContent());
  }, [pathname, scrollToContent]);

  // Keep this in context so the carousel header can call it
  const handleCarouselNavigate = useCallback(
    (path: string) => {
      pendingScrollRef.current = true;
      router.push(path);
    },
    [router]
  );

  const value = useMemo(
    () => ({
      scrollToTop,
      scrollToContent,
      // optional: expose this so carousel header doesn't re-implement router logic
      handleCarouselNavigate,
    }),
    [scrollToTop, scrollToContent, handleCarouselNavigate]
  );

  return (
    <GalleryProvider galleries={galleries}>
      <ScrollContext.Provider value={value}>
        <div className="h-screen flex flex-col overflow-hidden">
          <Navbar />

          <div className="drawer lg:drawer-open flex-1 overflow-hidden">
            <input id="site-drawer" type="checkbox" className="drawer-toggle" />

            <div
              ref={drawerContentRef}
              className="drawer-content flex flex-col bg-base-200/50 overflow-y-auto relative"
              style={{ paddingBottom: scrollBuffer }}
            >            
              {children}
              <div className="hidden md:block fixed bottom-2 right-3 text-[10px] px-10 text-gray-400/70 pointer-events-none select-none">
                Next v1.2
              </div>
            </div>

            <Sidebar />
          </div>
        </div>
        <Toaster position="top-right" richColors closeButton />
      </ScrollContext.Provider>
    </GalleryProvider>
  );
}
