import { list } from "@vercel/blob";

export const BLOB_BASE = 'https://7ec1rjem3s1walis.public.blob.vercel-storage.com'

export function blobUrl(pathname: string) {
  // pathname example: "art/foo.jpg"
  return `${BLOB_BASE}/${pathname.replace(/^\//, '')}`;
}

export async function getBlobFiles(folder: string) {  
  return await list({
    prefix: folder,   
    limit: 100, //I'm just not worrying about paging for now - I don't want to erroneously make a bunch of requests for on reason, and realistically there will never be more than ~10 per folder
  });  
}