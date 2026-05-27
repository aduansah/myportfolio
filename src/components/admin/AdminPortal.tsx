"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, LogOut, Save } from "lucide-react";
import type { CaseStudy, PortfolioImage, SiteContent, Testimonial } from "@/lib/content-types";
import { getDefaultSiteContent } from "@/lib/default-content";

type AdminSection = "portfolio" | "case-studies" | "testimonials";

async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch("/api/admin/upload", {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  if (!response.ok) {
    const data = (await response.json()) as { error?: string };
    throw new Error(data.error ?? "Upload failed");
  }
  const data = (await response.json()) as { url: string };
  return data.url;
}

function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        setError("Incorrect password");
        return;
      }

      onSuccess();
    } catch {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6">
      <form
        onSubmit={submit}
        className="glass w-full max-w-md rounded-luxury p-8"
      >
        <div className="mb-6 flex items-center gap-3 text-gold">
          <Lock className="h-5 w-5" />
          <p className="text-xs uppercase tracking-[0.35em]">Admin Portal</p>
        </div>
        <h1 className="font-display text-3xl font-semibold text-white">Sign in</h1>
        <p className="mt-2 text-sm text-muted">Manage portfolio content, uploads, and case studies.</p>

        <label className="mt-8 block text-sm text-muted">
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-xl border border-white/10 bg-black-soft px-4 py-3 text-white outline-none focus:border-gold/50"
            autoFocus
          />
        </label>

        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-luxury bg-gold px-4 py-3 text-sm font-semibold text-black transition hover:gold-glow disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Enter Admin"}
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}) {
  const className =
    "mt-2 w-full rounded-xl border border-white/10 bg-black-soft px-4 py-3 text-white outline-none focus:border-gold/50";

  return (
    <label className="block text-sm text-muted">
      {label}
      {multiline ? (
        <textarea
          rows={4}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={className}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={className}
        />
      )}
    </label>
  );
}

function PortfolioEditor({
  content,
  onChange,
  onPersist,
}: {
  content: SiteContent;
  onChange: (next: SiteContent) => void;
  onPersist: (next: SiteContent) => Promise<boolean>;
}) {
  const [tabId, setTabId] = useState(content.portfolioTabs[0]?.id ?? "");
  const [subId, setSubId] = useState(content.portfolioTabs[0]?.subsections[0]?.id ?? "");
  const [newTitle, setNewTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const activeTab = content.portfolioTabs.find((tab) => tab.id === tabId) ?? content.portfolioTabs[0];
  const activeSub =
    activeTab?.subsections.find((sub) => sub.id === subId) ?? activeTab?.subsections[0];

  const buildNextContent = (images: PortfolioImage[]) => {
    if (!activeTab || !activeSub) return content;

    const nextTabs = content.portfolioTabs.map((tab) => {
      if (tab.id !== activeTab.id) return tab;
      return {
        ...tab,
        subsections: tab.subsections.map((sub) =>
          sub.id === activeSub.id ? { ...sub, images } : sub,
        ),
      };
    });

    return { ...content, portfolioTabs: nextTabs };
  };

  const updateImages = (images: PortfolioImage[]) => {
    onChange(buildNextContent(images));
  };

  const handleUpload = async (file: File, replaceIndex?: number) => {
    setUploading(true);
    setMessage("");
    try {
      const url = await uploadImage(file);
      const title = newTitle.trim() || file.name.replace(/\.[^.]+$/, "");
      const nextImage: PortfolioImage = { title, image: url };

      let images: PortfolioImage[];
      if (typeof replaceIndex === "number") {
        images = [...(activeSub?.images ?? [])];
        images[replaceIndex] = { ...images[replaceIndex], image: url };
      } else {
        images = [...(activeSub?.images ?? []), nextImage];
        setNewTitle("");
      }

      const nextContent = buildNextContent(images);
      onChange(nextContent);

      const saved = await onPersist(nextContent);
      setMessage(saved ? "Uploaded and published to the site." : "Upload finished but save failed. Try Save Changes.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  if (!activeTab || !activeSub) {
    return <p className="text-muted">No portfolio sections configured.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm text-muted">
          Category
          <select
            value={activeTab.id}
            onChange={(event) => {
              const nextTab = content.portfolioTabs.find((tab) => tab.id === event.target.value);
              setTabId(event.target.value);
              setSubId(nextTab?.subsections[0]?.id ?? "");
            }}
            className="mt-2 w-full rounded-xl border border-white/10 bg-black-soft px-4 py-3 text-white outline-none"
          >
            {content.portfolioTabs.map((tab) => (
              <option key={tab.id} value={tab.id}>
                {tab.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm text-muted">
          Subcategory
          <select
            value={activeSub.id}
            onChange={(event) => setSubId(event.target.value)}
            className="mt-2 w-full rounded-xl border border-white/10 bg-black-soft px-4 py-3 text-white outline-none"
          >
            {activeTab.subsections.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="glass rounded-luxury p-5">
        <h3 className="font-display text-xl font-semibold text-white">Add new work</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
          <Field label="Title" value={newTitle} onChange={setNewTitle} />
          <label className="block text-sm text-muted">
            Image file
            <input
              type="file"
              accept="image/*"
              disabled={uploading}
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void handleUpload(file);
                event.currentTarget.value = "";
              }}
              className="mt-2 block w-full text-sm text-muted file:mr-4 file:rounded-lg file:border-0 file:bg-gold file:px-4 file:py-2 file:text-sm file:font-semibold file:text-black"
            />
          </label>
        </div>
        {message && <p className="mt-3 text-sm text-gold">{message}</p>}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {activeSub.images.map((item, index) => (
          <article key={`${item.image}-${index}`} className="glass overflow-hidden rounded-luxury">
            <div className="relative aspect-[4/3] bg-black-soft">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
            </div>
            <div className="space-y-3 p-4">
              <Field
                label="Title"
                value={item.title}
                onChange={(title) => {
                  const images = [...activeSub.images];
                  images[index] = { ...images[index], title };
                  updateImages(images);
                }}
              />
              <label className="block text-sm text-muted">
                Replace image
                <input
                  type="file"
                  accept="image/*"
                  disabled={uploading}
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) void handleUpload(file, index);
                    event.currentTarget.value = "";
                  }}
                  className="mt-2 block w-full text-xs text-muted file:mr-3 file:rounded-lg file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-white"
                />
              </label>
              <button
                type="button"
                onClick={() => {
                  const nextContent = buildNextContent(activeSub.images.filter((_, i) => i !== index));
                  onChange(nextContent);
                  void onPersist(nextContent).then((saved) => {
                    setMessage(saved ? "Item deleted and published." : "Deleted locally but save failed.");
                  });
                }}
                className="text-sm text-red-400 transition hover:text-red-300"
              >
                Delete item
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function CaseStudiesEditor({
  content,
  onChange,
  onPersist,
}: {
  content: SiteContent;
  onChange: (next: SiteContent) => void;
  onPersist: (next: SiteContent) => Promise<boolean>;
}) {
  const updateStudy = (index: number, patch: Partial<CaseStudy>) => {
    const caseStudies = content.caseStudies.map((study, i) =>
      i === index ? { ...study, ...patch } : study,
    );
    onChange({ ...content, caseStudies });
  };

  const addStudy = () => {
    onChange({
      ...content,
      caseStudies: [
        ...content.caseStudies,
        {
          id: `case-${Date.now()}`,
          client: "New Client",
          title: "New case study title",
          problem: "",
          process: "",
          solution: "",
          result: "",
          image: "",
        },
      ],
    });
  };

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={addStudy}
        className="rounded-luxury border border-gold/30 px-4 py-2 text-sm font-semibold text-gold transition hover:bg-gold/10"
      >
        Add case study
      </button>

      {content.caseStudies.map((study, index) => (
        <article key={study.id} className="glass rounded-luxury p-5">
          <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
            <div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-black-soft">
                {study.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={study.image} alt={study.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-muted">No image</div>
                )}
              </div>
              <label className="mt-3 block text-sm text-muted">
                Upload hero image
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;
                    try {
                      const url = await uploadImage(file);
                      updateStudy(index, { image: url });
                    } catch {
                      /* ignore */
                    }
                    event.currentTarget.value = "";
                  }}
                  className="mt-2 block w-full text-xs text-muted file:mr-3 file:rounded-lg file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-white"
                />
              </label>
            </div>

            <div className="space-y-3">
              <Field label="Client" value={study.client} onChange={(client) => updateStudy(index, { client })} />
              <Field label="Title" value={study.title} onChange={(title) => updateStudy(index, { title })} />
              <Field
                label="Problem"
                value={study.problem}
                onChange={(problem) => updateStudy(index, { problem })}
                multiline
              />
              <Field
                label="Process"
                value={study.process}
                onChange={(process) => updateStudy(index, { process })}
                multiline
              />
              <Field
                label="Solution"
                value={study.solution}
                onChange={(solution) => updateStudy(index, { solution })}
                multiline
              />
              <Field
                label="Final result"
                value={study.result}
                onChange={(result) => updateStudy(index, { result })}
                multiline
              />
              <button
                type="button"
                onClick={() => {
                  const nextContent = {
                    ...content,
                    caseStudies: content.caseStudies.filter((_, i) => i !== index),
                  };
                  onChange(nextContent);
                  void onPersist(nextContent);
                }}
                className="text-sm text-red-400 transition hover:text-red-300"
              >
                Delete case study
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function TestimonialsEditor({
  content,
  onChange,
  onPersist,
}: {
  content: SiteContent;
  onChange: (next: SiteContent) => void;
  onPersist: (next: SiteContent) => Promise<boolean>;
}) {
  const updateItem = (index: number, patch: Partial<Testimonial>) => {
    const testimonials = content.testimonials.map((item, i) =>
      i === index ? { ...item, ...patch } : item,
    );
    onChange({ ...content, testimonials });
  };

  const addItem = () => {
    onChange({
      ...content,
      testimonials: [
        ...content.testimonials,
        {
          id: `testimonial-${Date.now()}`,
          quote: "",
          name: "",
          role: "",
        },
      ],
    });
  };

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={addItem}
        className="rounded-luxury border border-gold/30 px-4 py-2 text-sm font-semibold text-gold transition hover:bg-gold/10"
      >
        Add testimonial
      </button>

      {content.testimonials.map((item, index) => (
        <article key={item.id} className="glass space-y-3 rounded-luxury p-5">
          <Field label="Quote" value={item.quote} onChange={(quote) => updateItem(index, { quote })} multiline />
          <Field label="Name" value={item.name} onChange={(name) => updateItem(index, { name })} />
          <Field label="Role" value={item.role} onChange={(role) => updateItem(index, { role })} />
          <button
            type="button"
            onClick={() => {
              const nextContent = {
                ...content,
                testimonials: content.testimonials.filter((_, i) => i !== index),
              };
              onChange(nextContent);
              void onPersist(nextContent);
            }}
            className="text-sm text-red-400 transition hover:text-red-300"
          >
            Delete testimonial
          </button>
        </article>
      ))}
    </div>
  );
}

export function AdminPortal() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [section, setSection] = useState<AdminSection>("portfolio");
  const [content, setContent] = useState<SiteContent>(getDefaultSiteContent());
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  const loadSession = useCallback(async () => {
    const sessionRes = await fetch("/api/admin/session", { credentials: "include" });
    const session = (await sessionRes.json()) as { authenticated: boolean };
    setAuthenticated(session.authenticated);

    if (session.authenticated) {
      const contentRes = await fetch("/api/admin/content", { credentials: "include" });
      if (contentRes.ok) {
        setContent((await contentRes.json()) as SiteContent);
      }
    }
  }, []);

  useEffect(() => {
    void loadSession();
  }, [loadSession]);

  const persistContent = async (nextContent: SiteContent) => {
    setContent(nextContent);
    setSaving(true);
    setStatus("");

    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nextContent),
      });

      if (!response.ok) {
        setStatus("Save failed. Check your session and try again.");
        return false;
      }

      setStatus("Saved. Changes are live on the website.");
      return true;
    } catch {
      setStatus("Save failed.");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const saveContent = async () => {
    await persistContent(content);
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    setAuthenticated(false);
    router.push("/");
  };

  if (authenticated === null) {
    return <div className="min-h-screen bg-black" />;
  }

  if (!authenticated) {
    return <AdminLogin onSuccess={() => void loadSession()} />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-black/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gold">Hidden Admin Portal</p>
            <h1 className="font-display text-2xl font-semibold">Portfolio CMS</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => void saveContent()}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-luxury bg-gold px-4 py-2.5 text-sm font-semibold text-black transition hover:gold-glow disabled:opacity-60"
            >
              <Save className="h-4 w-4" />
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => {
                router.push("/");
                router.refresh();
              }}
              className="rounded-luxury border border-white/10 px-4 py-2.5 text-sm text-muted transition hover:text-white"
            >
              View site
            </button>
            <button
              type="button"
              onClick={() => void logout()}
              className="inline-flex items-center gap-2 rounded-luxury border border-white/10 px-4 py-2.5 text-sm text-muted transition hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 lg:grid-cols-[220px_1fr]">
        <aside className="space-y-2">
          {([
            ["portfolio", "Portfolio"],
            ["case-studies", "Case Studies"],
            ["testimonials", "Testimonials"],
          ] as const).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setSection(id)}
              className={`w-full rounded-xl px-4 py-3 text-left text-sm transition ${
                section === id
                  ? "bg-gold font-semibold text-black"
                  : "bg-white/[0.04] text-muted hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </aside>

        <main>
          {status && <p className="mb-4 text-sm text-gold">{status}</p>}

          {section === "portfolio" && (
            <PortfolioEditor content={content} onChange={setContent} onPersist={persistContent} />
          )}
          {section === "case-studies" && (
            <CaseStudiesEditor content={content} onChange={setContent} onPersist={persistContent} />
          )}
          {section === "testimonials" && (
            <TestimonialsEditor content={content} onChange={setContent} onPersist={persistContent} />
          )}
        </main>
      </div>
    </div>
  );
}
