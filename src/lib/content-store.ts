import { promises as fs } from "fs";
import path from "path";
import type { SiteContent } from "@/lib/content-types";
import { readContentBlob, useBlobStorage, writeContentBlob } from "@/lib/blob-storage";
import { getDefaultSiteContent } from "@/lib/default-content";

const DATA_DIR = path.join(process.cwd(), "data");
const CONTENT_FILE = path.join(DATA_DIR, "site-content.json");

async function readLocalContent(): Promise<SiteContent | null> {
  try {
    const raw = await fs.readFile(CONTENT_FILE, "utf8");
    return JSON.parse(raw) as SiteContent;
  } catch {
    return null;
  }
}

async function writeLocalContent(content: SiteContent): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(CONTENT_FILE, JSON.stringify(content, null, 2), "utf8");
}

export async function getSiteContent(): Promise<SiteContent> {
  if (useBlobStorage()) {
    const raw = await readContentBlob();
    if (raw) {
      return JSON.parse(raw) as SiteContent;
    }

    const local = await readLocalContent();
    const seed = local ?? getDefaultSiteContent();
    await writeContentBlob(JSON.stringify(seed, null, 2));
    return seed;
  }

  const local = await readLocalContent();
  if (local) return local;

  const defaults = getDefaultSiteContent();
  await writeLocalContent(defaults);
  return defaults;
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  const serialized = JSON.stringify(content, null, 2);

  if (useBlobStorage()) {
    await writeContentBlob(serialized);
    return;
  }

  await writeLocalContent(content);
}
