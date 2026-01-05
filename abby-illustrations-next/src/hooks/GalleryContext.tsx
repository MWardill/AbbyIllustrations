"use client";

import { createContext, useContext } from "react";
import { Gallery } from "@/db/queries/gallery-maint/galleries";

type GalleryContextType = {
  galleries: Gallery[];
};

const GalleryContext = createContext<GalleryContextType | null>(null);

export function GalleryProvider({
  children,
  galleries,
}: {
  children: React.ReactNode;
  galleries: Gallery[];
}) {
  return (
    <GalleryContext.Provider value={{ galleries }}>
      {children}
    </GalleryContext.Provider>
  );
}

export function useGalleries() {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error("useGalleries must be used within a GalleryProvider");
  }
  return context;
}
