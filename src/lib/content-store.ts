import { promises as fs } from "fs";
import path from "path";
import type { SiteContent } from "@/lib/content-types";
import { getDefaultSiteContent } from "@/lib/default-content";

const DATA_DIR = path.join(process.cwd(), "data");
const CONTENT_FILE = path.join(DATA_DIR, "site-content.json");

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const raw = await fs.readFile(CONTENT_FILE, "utf8");
    return JSON.parse(raw) as SiteContent;
  } catch {
    const defaults = getDefaultSiteContent();
    await saveSiteContent(defaults);
    return defaults;
  }
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(CONTENT_FILE, JSON.stringify(content, null, 2), "utf8");
}
