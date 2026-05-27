import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const runtime = "nodejs";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
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

function getUploadError(error: unknown) {
  if (error instanceof Error) return error.message;
  return "Upload failed";
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized. Please log in again." }, { status: 401 });
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

    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(path.join(UPLOAD_DIR, filename), buffer);

    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch (error) {
    console.error("Upload failed:", error);
    return NextResponse.json({ error: getUploadError(error) }, { status: 500 });
  }
}
