import { getGalleries } from './actions';
import GalleryMaint from './GalleryMaint';

export default async function GalleryMaintPage() {

  const loadGalleries = async () => {
    try {
      return await getGalleries();

    } catch (err) {
      console.error('Failed to fetch galleries', err);
    }
  };

  const galleries = await loadGalleries();
  return (<GalleryMaint initialGalleries={galleries!} />);

}