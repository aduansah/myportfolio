import { NextResponse } from "next/server";
import path from "path";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { uploadImageBlob, uploadImageLocal, useBlobStorage } from "@/lib/blob-storage";

export const runtime = "nodejs";

const MAX_BYTES = 20 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".heic", ".heif", ".avif"]);

function sanitizeFilename(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function isAllowedImage(fileName: string, mimeType: string) {
  if (mimeType.startsWith("image/")) return true;
  const ext = path.extname(fileName).toLowerCase();
  return ALLOWED_EXTENSIONS.has(ext);
}

function guessContentType(fileName: string, mimeType: string) {
  if (mimeType) return mimeType;
  const ext = path.extname(fileName).toLowerCase();
  const map: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".heic": "image/heic",
    ".heif": "image/heif",
    ".avif": "image/avif",
  };
  return map[ext] ?? "application/octet-stream";
}

function getUploadError(error: unknown) {
  if (error instanceof Error) {
    if (error.message.includes("EROFS") || error.message.includes("read-only file system")) {
      return "Upload storage is not configured for production. Add a Vercel Blob store to the project.";
    }
    return error.message;
  }
  return "Upload failed";
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized. Please log in again." }, { status: 401 });
  }

  if (process.env.VERCEL === "1" && !useBlobStorage()) {
    return NextResponse.json(
      {
        error:
          "Upload storage is not configured. In Vercel, add a Blob store (Storage → Blob) and redeploy.",
      },
      { status: 503 },
    );
  }

  try {
    const formData = await request.formData();
    const entry = formData.get("file");

    if (!entry || typeof entry === "string") {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const file = entry as File | Blob;
    const fileName = file instanceof File ? file.name : "upload.jpg";
    const mimeType = file.type ?? "";

    if (!isAllowedImage(fileName, mimeType)) {
      return NextResponse.json(
        { error: "Unsupported file type. Use JPG, PNG, WEBP, GIF, or HEIC." },
        { status: 400 },
      );
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "File exceeds 20MB limit" }, { status: 400 });
    }

    const ext = path.extname(fileName).toLowerCase() || ".jpg";
    const base = sanitizeFilename(path.basename(fileName, ext)) || "upload";
    const filename = `${Date.now()}-${base}${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    const contentType = guessContentType(fileName, mimeType);

    const url = useBlobStorage()
      ? await uploadImageBlob(buffer, filename, contentType)
      : await uploadImageLocal(buffer, filename);

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Upload failed:", error);
    return NextResponse.json({ error: getUploadError(error) }, { status: 500 });
  }
}
