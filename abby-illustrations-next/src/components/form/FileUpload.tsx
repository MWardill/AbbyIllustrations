'use client';

import { useState, useCallback } from 'react';
import { Upload, X } from 'lucide-react';
import { handleError } from '@/src/lib/errorUtils';

interface FileUploadProps {
  onUpload: (formData: FormData) => Promise<void>;
}

export function FileUpload({ onUpload }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files).filter(file => 
        file.type.startsWith('image/')
      );
      setFiles(prev => [...prev, ...newFiles]);
    }
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const newFiles = Array.from(e.target.files).filter(file => 
        file.type.startsWith('image/')
      );
      setFiles(prev => [...prev, ...newFiles]);
    }
  }, []);

  const removeFile = (indexToRemove: number) => {
    setFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    
    setIsUploading(true);
    try {
      const CHUNK_SIZE = 500 * 1024; // 500KB chunks to stay under Next.js server action limit
      let currentBatch: File[] = [];
      let currentSize = 0;

      for (const file of files) {
        const newSize = currentSize + file.size;
        
        if (newSize > CHUNK_SIZE && currentBatch.length > 0) {          
          const formData = new FormData();
          currentBatch.forEach(f => {
            formData.append('files', f);
          });
          await onUpload(formData);
          
          currentBatch = [file];
          currentSize = file.size;
        } else {          
          currentBatch.push(file);
          currentSize = newSize;
        }
      }
      
      if (currentBatch.length > 0) {
        const formData = new FormData();
        currentBatch.forEach(f => {
          formData.append('files', f);
        });
        await onUpload(formData);
      }

      setFiles([]); // Clear files after successful upload
    } catch (error) {
      handleError(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex justify-end">
        <button
          onClick={handleUpload}
          disabled={isUploading || files.length === 0}
          className="btn btn-primary"
        >
          {isUploading ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Uploading...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Upload {files.length > 0 ? `${files.length} ${files.length === 1 ? 'file' : 'files'}` : 'Files'}
            </>
          )}
        </button>
      </div>
      <div 
        className={`
          relative flex-1 flex flex-col items-center justify-center 
          border-2 border-dashed rounded-xl transition-colors
          ${dragActive ? 'border-primary bg-primary/5' : 'border-base-300 bg-base-100'}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleChange}
        />
        
        <div className="flex flex-col items-center gap-4 p-8 text-center pointer-events-none">
          <div className="p-4 rounded-full bg-base-200">
            <Upload className="w-8 h-8 text-base-content/70" />
          </div>
          <div>
            <p className="text-lg font-semibold">
              Drop images here or click to upload
            </p>
            <p className="text-sm text-base-content/60 mt-1">
              Supports JPG, PNG, WEBP
            </p>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-h-[30vh] overflow-y-auto p-1">
          {files.map((file, index) => (
            <div key={`${file.name}-${index}`} className="relative group aspect-square rounded-lg overflow-hidden border border-base-300 bg-base-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => removeFile(index)}
                className="absolute top-1 right-1 p-1 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/50 text-white text-xs truncate">
                {file.name}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
