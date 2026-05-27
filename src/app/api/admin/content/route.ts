import { NextResponse } from "next/server";
import type { SiteContent } from "@/lib/content-types";
import {
  ADMIN_COOKIE,
  createSessionToken,
  getSessionCookieOptions,
  isAdminAuthenticated,
  verifyAdminPassword,
} from "@/lib/admin-auth";
import { getSiteContent, saveSiteContent } from "@/lib/content-store";

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as SiteContent;
    if (!body.portfolioTabs || !body.caseStudies || !body.testimonials) {
      return NextResponse.json({ error: "Invalid content payload" }, { status: 400 });
    }

    await saveSiteContent(body);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to save content" }, { status: 500 });
  }
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const content = await getSiteContent();
  return NextResponse.json(content);
}
