import { head, list, put } from "@vercel/blob";
import { promises as fs } from "fs";
import path from "path";

export const CONTENT_BLOB_PATH = "cms/site-content.json";

export function useBlobStorage() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export async function uploadImageBlob(
  buffer: Buffer,
  filename: string,
  contentType: string,
): Promise<string> {
  const blob = await put(`uploads/${filename}`, buffer, {
    access: "public",
    contentType: contentType || "application/octet-stream",
    addRandomSuffix: false,
    allowOverwrite: true,
  });

  return blob.url;
}

export async function readContentBlob(): Promise<string | null> {
  if (!useBlobStorage()) return null;

  try {
    const metadata = await head(CONTENT_BLOB_PATH);
    const response = await fetch(metadata.url, { cache: "no-store" });
    if (!response.ok) return null;
    return response.text();
  } catch {
    const { blobs } = await list({ prefix: "cms/", limit: 10 });
    const match = blobs.find((blob) => blob.pathname === CONTENT_BLOB_PATH);
    if (!match) return null;

    const response = await fetch(match.url, { cache: "no-store" });
    if (!response.ok) return null;
    return response.text();
  }
}

export async function writeContentBlob(content: string): Promise<void> {
  await put(CONTENT_BLOB_PATH, content, {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

export async function uploadImageLocal(buffer: Buffer, filename: string): Promise<string> {
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(path.join(uploadDir, filename), buffer);
  return `/uploads/${filename}`;
}
