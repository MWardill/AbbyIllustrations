import fs from 'fs';
import path from 'path';
import Home from './Home';
import type { ImageInfo } from '@/src/types/images';
export type { ImageInfo } from '@/src/types/images';

function getImagesFromFolder(
  relativeFolder: string,
  options?: { exts?: string[]; defaultAlt?: string },
): ImageInfo[] {
  const { exts = ['.jpg', '.jpeg', '.png'], defaultAlt = 'Image' } = options || {};
  const dir = path.join(process.cwd(), 'public', relativeFolder);

  const files = fs
    .readdirSync(dir)
    .filter((name) => exts.some((ext) => name.toLowerCase().endsWith(ext)));

  return files.map((name) => ({
    src: `/${relativeFolder}/${name}`,
    alt: name
      .replace(/\.(jpg|jpeg|png)$/i, '')
      .replace(/_/g, ' ') || defaultAlt,
  }));
}

export default function Page() {
  const observerImages = getImagesFromFolder('images/observer', { defaultAlt: 'Observer image' });
  const companyImages = getImagesFromFolder('images/company', { defaultAlt: 'Company image' });
  const vaImagesRaw = getImagesFromFolder('images/v-and-a', { exts: ['.jpg', '.jpeg'], defaultAlt: 'V&A image' });
  const madeImages = getImagesFromFolder('images/made', { defaultAlt: 'Made image' });
  const weddingImages = getImagesFromFolder('images/wedding', { exts: ['.jpg', '.jpeg', '.png'], defaultAlt: 'Wedding image' });
  const freckBlueImages = getImagesFromFolder('images/frecklesblue', { defaultAlt: 'Freckles and Blue image' });

  const vaImages = vaImagesRaw
    .map((img) => ({
      ...img,
      filename: img.src.split('/').pop() || '',
    }))
    .sort((a, b) => { //This is just garbage from when I had this as a basic react app - I need to remove it
      const aIsDSCN = a.filename.startsWith('DSCN');
      const bIsDSCN = b.filename.startsWith('DSCN');
      if (aIsDSCN && !bIsDSCN) return 1;
      if (!aIsDSCN && bIsDSCN) return -1;
      return 0;
    });

  return (
    <Home
      observerImages={observerImages}
      companyImages={companyImages}
      vaImages={vaImages}
      madeImages={madeImages}
      weddingImages={weddingImages}
      freckBlueImages={freckBlueImages}
    />
  );
}