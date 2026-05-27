import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getBlobStorageStatus } from "@/lib/blob-storage";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const status = getBlobStorageStatus();

  return NextResponse.json({
    onVercel: status.onVercel,
    blobConfigured: status.ready,
    ready: status.ready,
    message: status.message,
  });
}
