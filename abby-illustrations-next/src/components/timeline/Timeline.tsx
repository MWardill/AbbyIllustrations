'use client';
import { useEffect, useRef, useState, useCallback, Children, isValidElement, cloneElement } from 'react';

interface TimelineProps {
    children: React.ReactNode;
}

export default function Timeline({ children }: TimelineProps) {
    const timelineRef = useRef<HTMLUListElement>(null);
    const [activeIndex, setActiveIndex] = useState(-1);

    const handleScroll = useCallback(() => {
        if (!timelineRef.current) return;

        const items = timelineRef.current.querySelectorAll('li');
        const viewportMiddle = window.innerHeight / 2;

        let newActiveIndex = -1;
        items.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            // If the middle of the viewport has passed the top of this item
            if (rect.top < viewportMiddle) {
                newActiveIndex = index;
            }
        });

        setActiveIndex(newActiveIndex);
    }, []);

    useEffect(() => {
        let scrollContainer: HTMLElement | null = null;

        // Small delay to ensure DOM is ready
        const timer = setTimeout(() => {
            // Find the scrollable container by traversing up
            let element: HTMLElement | null = timelineRef.current;
            while (element) {
                if (element.classList.contains('drawer-content')) {
                    scrollContainer = element;
                    scrollContainer.addEventListener('scroll', handleScroll);
                    handleScroll(); // Initial calculation
                    break;
                }
                element = element.parentElement;
            }
        }, 100);

        return () => {
            clearTimeout(timer);
            if (scrollContainer) {
                scrollContainer.removeEventListener('scroll', handleScroll);
            }
        };
    }, [handleScroll]);

    // Clone children and inject isActive, isFirst, isLast props automatically
    const childArray = Children.toArray(children).filter(isValidElement);
    const enhancedChildren = childArray.map((child, index) => {                
        return cloneElement(child, {
            isActive: activeIndex >= index,
            isFirst: index === 0,
            isLast: index === childArray.length - 1,
        } as Record<string, unknown>);
    });

    return (
        <ul
            ref={timelineRef}
            className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical"
        >
            {enhancedChildren}
        </ul>
    );
}
