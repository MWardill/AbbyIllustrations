import { gallerySchema } from '@/app/(protected)/gallery-maint/validation';
import { getGalleries, createGallery, deleteGallery, updateGallery } from '@/db/queries/gallery-maint/galleries';
import { getErrorMessage } from '@/src/lib/errorUtils';
import { NextResponse } from 'next/server';
import { z } from 'zod';

//I think these API methods are all superfluous... I SHOULD be using Next 'use server' routes, but I wrote them already so w/e

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

export async function POST(req: Request) {
  const body = await req.json();

  const parsed = gallerySchema.safeParse(body);

  if (!parsed.success) {
    const flattened = z.treeifyError(parsed.error);
    return NextResponse.json(
      {
        fieldErrors: {
          title: flattened.properties?.title?.errors[0],
          menuTitle: flattened.properties?.menuTitle?.errors[0],
          description: flattened.properties?.description?.errors[0],
        },
        message: 'Validation failed',
      },
      { status: 400 }
    );
  }

  try {    
    const { title, description, menuTitle, imagePosition } = parsed.data;
    const pos = imagePosition === '' ? null : imagePosition;
    await createGallery(title, description, menuTitle, pos);
  } catch (error) {
    console.error('Failed to create gallery:', error);
    return NextResponse.json(
      { message: getErrorMessage(error) ?? 'Failed to create gallery' },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { id, ...data } = body;

  if (!id) {
    return NextResponse.json(
      { message: 'Gallery ID is required' },
      { status: 400 }
    );
  }

  const parsed = gallerySchema.safeParse(data);

  if (!parsed.success) {
    const flattened = z.treeifyError(parsed.error);
    return NextResponse.json(
      {
        fieldErrors: {
          title: flattened.properties?.title?.errors[0],
          menuTitle: flattened.properties?.menuTitle?.errors[0],
          description: flattened.properties?.description?.errors[0],
        },
        message: 'Validation failed',
      },
      { status: 400 }
    );
  }

  try {
    const { title, description, menuTitle, imagePosition } = parsed.data;
    const pos = imagePosition === '' ? null : imagePosition;
    await updateGallery(id, title, description, menuTitle, pos);
  } catch (error) {
    console.error('Failed to update gallery:', error);
    return NextResponse.json(
      { message: getErrorMessage(error) ?? 'Failed to update gallery' },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const galleryId = url.searchParams.get('id');

    if (!galleryId) {
      return NextResponse.json(
        { message: 'Gallery ID is required' },
        { status: 400 }
      );
    }

    await deleteGallery(parseInt(galleryId, 10));
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Failed to delete gallery:', error);
    return NextResponse.json(
      { message: getErrorMessage(error) ?? 'Failed to delete gallery' },
      { status: 500 }
    );
  }
}
