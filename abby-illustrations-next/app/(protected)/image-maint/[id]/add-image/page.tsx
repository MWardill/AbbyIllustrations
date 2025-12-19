import { uploadImages } from '../../actions';
import { AddImage } from './AddImage';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AddImagePage({ params }: PageProps) {
  const { id: idString } = await params;
  const id = Number(idString);

  const handleUpload = async (formData: FormData) => {
    'use server';
    await uploadImages(id, formData);
  };

  return (
    <AddImage id={id} onUpload={handleUpload} />
  );
}
