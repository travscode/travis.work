"use client";

import { useId, useState, type ReactNode } from "react";

// Footer layout with a "Show sitemap" toggle. The full sitemap columns are
// server-rendered into the HTML (so search engines still find every link) and
// collapsed visually until the visitor asks for them.
export default function FooterSitemap({
  before,
  after,
  columns,
  pageCount,
}: {
  before: ReactNode;
  after: ReactNode;
  columns: ReactNode[];
  pageCount: number;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <>
      <div className="grid md:grid-cols-12 gap-12">
        {before}

        <div className="md:col-span-3">
          <div className="font-mono text-xs uppercase tracking-[0.18em] opacity-50">Sitemap</div>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((o) => !o)}
            className="group mt-4 inline-flex items-center gap-2 text-sm text-tw-white/70 hover:text-tw-accent transition-colors cursor-pointer"
          >
            <span>{open ? "Hide sitemap" : "Show sitemap"}</span>
            <span
              aria-hidden
              className={`inline-block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "rotate-45" : ""}`}
            >
              +
            </span>
          </button>
          <p className="mt-2 text-xs text-tw-white/40">
            {pageCount} pages: every service, platform, industry and area.
          </p>
        </div>

        {after}
      </div>

      <div
        id={panelId}
        inert={!open}
        className={`grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-12 pt-16">
            {columns.map((col, i) => (
              <div
                key={i}
                className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: open ? `${120 + i * 90}ms` : "0ms" }}
              >
                {col}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
