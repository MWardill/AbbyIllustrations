import fs from 'fs';
import path from 'path';

export enum GalleryFileType {
  JPG = '.jpg',
  JPEG = '.jpeg',
  PNG = '.png',
}

const DEFAULT_GALLERY_FILE_TYPES: GalleryFileType[] = [
  GalleryFileType.JPG,
  GalleryFileType.JPEG,
  GalleryFileType.PNG,
];

function normalizeFolder(folder: string): string {
  return folder.replace(/^\/+|\/+$/g, '');
}

function buildImagePath(folder: string, fileName: string): string {
  if (fileName.startsWith('/')) {
    return fileName;
  }

  return `/${folder}/${fileName}`.replace(/\/+/g, '/');
}

export function getGalleryImages(
  folder: string,
  fileTypes: GalleryFileType[] = DEFAULT_GALLERY_FILE_TYPES,
): string[] {
  const normalizedFolder = normalizeFolder(folder);

  const dir = path.join(process.cwd(), 'public', normalizedFolder);

  if (!fs.existsSync(dir)) {
    return [];
  }

  const allowedExtensions = fileTypes.map((type) => type.toLowerCase());

  const files = fs
    .readdirSync(dir)
    .filter((name) => allowedExtensions.some((ext) => name.toLowerCase().endsWith(ext)));

  return files.map((name) => buildImagePath(normalizedFolder, name));
}
