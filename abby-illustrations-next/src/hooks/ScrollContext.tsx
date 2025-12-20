import { createContext, useContext } from 'react';

type ScrollContextType = {
    scrollToTop: () => void;
    scrollToContent: () => void;
      handleCarouselNavigate?: (path: string) => void;
};

export const ScrollContext = createContext<ScrollContextType>({
    scrollToTop: () => {},
    scrollToContent: () => {},
});

export const useScroll = () => useContext(ScrollContext);
