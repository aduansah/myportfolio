"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { SiteContent } from "@/lib/content-types";
import { getDefaultSiteContent } from "@/lib/default-content";

type SiteContentContextValue = {
  content: SiteContent;
  loading: boolean;
  refresh: () => Promise<void>;
};

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

type SiteContentProviderProps = {
  children: ReactNode;
  initialContent?: SiteContent;
};

export function SiteContentProvider({ children, initialContent }: SiteContentProviderProps) {
  const [content, setContent] = useState<SiteContent>(initialContent ?? getDefaultSiteContent());
  const [loading, setLoading] = useState(!initialContent);

  const refresh = useCallback(async () => {
    try {
      const response = await fetch("/api/content", { cache: "no-store" });
      if (!response.ok) return;
      const data = (await response.json()) as SiteContent;
      setContent(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!initialContent) {
      void refresh();
    }
  }, [initialContent, refresh]);

  const value = useMemo(
    () => ({
      content,
      loading,
      refresh,
    }),
    [content, loading, refresh],
  );

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error("useSiteContent must be used within SiteContentProvider");
  }
  return context;
}
