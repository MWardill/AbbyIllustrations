import { getGalleryImagesByTitle } from "@/db/queries/gallery-maint/galleries";
import GalleryRoot from "./GalleryRoot";

export default async function Gallery({params}: {params: Promise<{ "gallery-slug": string }>}) {
  const { "gallery-slug": gallerySlug } = await params;
  const decodedSlug = decodeURIComponent(gallerySlug);
  
  const images = await getGalleryImagesByTitle(decodedSlug);

  return (
      <GalleryRoot images={images} galleryTitle={decodedSlug} />
  );
}
