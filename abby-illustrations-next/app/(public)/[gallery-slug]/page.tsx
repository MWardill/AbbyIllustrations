import { getGalleryImagesByTitle } from "@/db/queries/gallery-maint/galleries";
import { blobUrl } from "@/src/lib/blobUtils";
import GalleryRoot from "./GalleryRoot";

export default async function Gallery({params}: {params: Promise<{ "gallery-slug": string }>}) {
  const { "gallery-slug": gallerySlug } = await params;
  const decodedSlug = decodeURIComponent(gallerySlug);
  
  const images = await getGalleryImagesByTitle(decodedSlug);
  const imageUrls = images.map(image => blobUrl(image.pathname));

  return (
      <GalleryRoot images={imageUrls} galleryTitle={decodedSlug} />
  );
}
