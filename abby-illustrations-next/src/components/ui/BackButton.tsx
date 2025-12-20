'use client';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

interface BackButtonProps {
  text?: string;
}

export function BackButton({ text = 'Back' }: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="btn btn-ghost gap-2"
      title="Go back"
    >
      <ChevronLeft className="h-4 w-4" />
      {text}
    </button>
  );
}
