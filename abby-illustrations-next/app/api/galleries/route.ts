import { getGalleries } from '@/db/queries/gallery-maint/galleries';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await getGalleries();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Failed to fetch galleries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch galleries' },
      { status: 500 }
    );
  }
}
