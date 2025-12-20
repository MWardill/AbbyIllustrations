import { Carousel } from "@/src/components/images";
import CarouselHeader from "@/src/components/layout/CarouselHeader";
import { useScroll } from "@/src/hooks/ScrollContext";


export default function Layout({ children }: { children: React.ReactNode }) {

  

  return (
    <>
      <div className="pt-8 px-4">
        <CarouselHeader  />
      </div>
       <main className="min-h-screen px-6 pb-6">
        <div className="route-children" style={{ viewTransitionName: "route-children" }}>
          {children}
        </div>
      </main>
    </>
  );
}