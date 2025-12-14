'use client';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/gallery-maint')}
      className="btn btn-ghost gap-2"
      title="Back to gallery maintenance"
    >
      <ChevronLeft className="h-4 w-4" />
      Back to Gallery Maintenance
    </button>
  );
}
