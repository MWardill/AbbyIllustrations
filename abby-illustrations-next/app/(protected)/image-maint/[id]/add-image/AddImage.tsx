'use client';

import { BackButton } from '@/src/components/ui/BackButton';
import { FileUpload } from '@/src/components/form/FileUpload';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface AddImageProps {
  id: number;
  onUpload: (formData: FormData) => Promise<void>;
}

export function AddImage({ id, onUpload }: AddImageProps) {
  const router = useRouter();  
  const handleUploadWrapper = async (formData: FormData) => {
    try {
      await onUpload(formData);
      toast.success('Images uploaded successfully');
      router.push(`/image-maint/${id}`);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error('Failed to upload images');
    }
  };

  return (
    <div className="p-8 h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <h1 className="text-2xl font-bold">Add Images</h1>
        <BackButton text="Return to Image Maintenance" />
      </div>
      <div className="flex-1 min-h-0">
        <FileUpload onUpload={handleUploadWrapper} />
      </div>
    </div>
  );
}
