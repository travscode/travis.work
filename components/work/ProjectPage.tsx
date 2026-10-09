"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { animate, motion, useInView, MotionConfig, useScroll, useTransform } from "motion/react";
import Header from "@/components/Header";
import SiteFooter from "@/components/services/SiteFooter";
import FillPill from "@/components/FillPill";
import { SplitHeadline, Reveal, Eyebrow, Magnetic, EASE_SLIDE } from "@/components/services/motion";
import { serviceHref, splitServices } from "@/lib/serviceLinks";
import type { ProjectDetails, Stat } from "@/lib/work";

export interface ProjectView {
  label: string;
  slug: string;
  year: string;
  date?: string;
  client?: string;
  agency?: string;
  agencyLink?: string;
  link?: string;
  linkLabel?: string;
  services?: string;
  imageUrl: string;
  videoUrl?: string;
  notesHtml?: string;
}

interface Neighbour {
  label: string;
  slug: string;
  imageUrl: string;
  services?: string;
}

/** Number that counts up the first time it scrolls into view. */
function Counter({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [shown, setShown] = useState(0);
  const decimals = String(stat.value).includes(".") ? String(stat.value).split(".")[1].length : 0;

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, stat.value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setShown(v),
    });
    return () => controls.stop();
  }, [inView, stat.value]);

  const formatted = shown.toLocaleString("en-AU", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return (
    <span ref={ref} className="tabular-nums">
      {stat.prefix}
      {formatted}
      {stat.suffix}
    </span>
  );
}

export default function ProjectPage({
  project,
  details,
  prev,
  next,
}: {
  project: ProjectView;
  details: ProjectDetails | null;
  prev: Neighbour;
  next: Neighbour;
}) {
  const services = splitServices(project.services);
  const mediaRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: mediaRef, offset: ["start end", "end start"] });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const meta = [
    project.client && { k: "Client", v: project.client },
    project.agency && { k: "With", v: project.agency, href: project.agencyLink },
    { k: "When", v: project.date || project.year },
  ].filter(Boolean) as { k: string; v: string; href?: string }[];

  return (
    <MotionConfig reducedMotion="user">
      <div className="grain min-h-screen bg-tw-white text-tw-black font-object-regular selection:bg-tw-black selection:text-tw-white">
        <Header />

        <main>
          {/* ---------------- HERO ---------------- */}
          <section className="px-5 md:px-10 pt-8 md:pt-32 pb-12">
            <nav aria-label="Breadcrumb" className="text-xs text-tw-black/60">
              <ol className="flex items-center gap-2">
                <li><Link href="/" className="hover:text-tw-black">Home</Link></li>
                <li aria-hidden>/</li>
                <li><Link href="/work" className="hover:text-tw-black">Work</Link></li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="text-tw-black">{project.label}</li>
              </ol>
            </nav>

            <div className="mt-10 grid lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8">
                <div className="rise font-mono text-xs uppercase tracking-[0.18em] opacity-60" style={{ animationDelay: "0.1s" }}>
                  {project.year}
                  {project.client ? ` · ${project.client}` : ""}
                </div>
                <SplitHeadline
                  text={project.label}
                  className="mt-5 font-object-heavy text-[13vw] md:text-[8vw] lg:text-[6.4vw] leading-[0.9] tracking-[-0.05em]"
                  delay={0.15}
                  onLoad
                />
              </div>
              {details?.headline && (
                <p className="rise lg:col-span-4 text-xl md:text-2xl leading-snug" style={{ animationDelay: "0.6s" }}>
                  {details.headline}
                </p>
              )}
            </div>
          </section>

          {/* ---------------- MEDIA ---------------- */}
          <section className="px-5 md:px-10">
            <motion.div
              ref={mediaRef}
              className="relative overflow-hidden rounded-[28px] bg-tw-black/10 aspect-[16/10] md:aspect-[16/8]"
              initial={{ clipPath: "inset(12% 6% 12% 6% round 28px)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0% round 28px)" }}
              transition={{ duration: 1.3, delay: 0.3, ease: EASE_SLIDE }}
            >
              <motion.div className="absolute inset-[-6%_0]" style={{ y: mediaY }}>
                {project.videoUrl ? (
                  <video
                    className="w-full h-full object-cover"
                    src={project.videoUrl}
                    poster={project.imageUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <Image
                    src={project.imageUrl}
                    alt={`${project.label}${project.services ? ` — ${project.services}` : ""} by Travis Weerts`}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                  />
                )}
              </motion.div>
            </motion.div>
          </section>

          {/* ---------------- META ---------------- */}
          <section className="px-5 md:px-10 py-14 md:py-20 grid md:grid-cols-12 gap-10 border-b border-tw-black/15">
            <dl className="md:col-span-5 grid grid-cols-2 gap-x-6 gap-y-8 text-sm">
              {meta.map((m) => (
                <div key={m.k}>
                  <dt className="font-mono text-xs uppercase tracking-[0.18em] opacity-50">{m.k}</dt>
                  <dd className="mt-2 font-object-bold text-lg leading-tight">
                    {m.href ? (
                      <a href={m.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-tw-black/30 hover:decoration-tw-black">
                        {m.v}
                      </a>
                    ) : (
                      m.v
                    )}
                  </dd>
                </div>
              ))}
              {project.link && (
                <div>
                  <dt className="font-mono text-xs uppercase tracking-[0.18em] opacity-50">{project.linkLabel || "See it"}</dt>
                  <dd className="mt-2 font-object-bold text-lg leading-tight">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-tw-black/30 hover:decoration-tw-black">
                      Visit ↗
                    </a>
                  </dd>
                </div>
              )}
            </dl>
            {services.length > 0 && (
              <div className="md:col-span-6 md:col-start-7">
                <div className="font-mono text-xs uppercase tracking-[0.18em] opacity-50">What I did</div>
                <h2 className="mt-4 flex flex-wrap gap-2">
                  {services.map((s) => (
                    <FillPill key={s} href={serviceHref(s)} fill="dark" className="px-4 py-2 text-sm font-object-bold">
                      {s}
                    </FillPill>
                  ))}
                </h2>
              </div>
            )}
          </section>

          {/* ---------------- STATS ---------------- */}
          {details && details.stats.length > 0 && (
            <section className="bg-tw-black text-tw-white px-5 md:px-10 py-20 md:py-28">
              <Eyebrow index="01" className="text-tw-white">The numbers</Eyebrow>
              <div className={`mt-12 grid gap-px bg-tw-white/15 rounded-[28px] overflow-hidden ${details.stats.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
                {details.stats.map((s, i) => (
                  <Reveal key={s.label} delay={i * 0.1} className="bg-tw-black p-8 md:p-10">
                    <div className="font-object-heavy text-6xl md:text-8xl tracking-[-0.05em] text-tw-accent">
                      <Counter stat={s} />
                    </div>
                    <div className="mt-4 text-base md:text-lg leading-snug text-tw-white/80 max-w-xs">{s.label}</div>
                    {s.source && (
                      <a href={s.source} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block font-mono text-[10px] uppercase tracking-[0.18em] text-tw-white/40 hover:text-tw-white">
                        Source ↗
                      </a>
                    )}
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          {/* ---------------- STORY ---------------- */}
          <section className="px-5 md:px-10 py-20 md:py-32">
            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-3">
                <Eyebrow index={details?.stats.length ? "02" : "01"}>The story</Eyebrow>
              </div>
              <div className="lg:col-span-7">
                {details?.intro && (
                  <Reveal>
                    <p className="font-object-bold text-2xl md:text-4xl leading-[1.15] tracking-[-0.025em]">{details.intro}</p>
                  </Reveal>
                )}
                {details?.html ? (
                  <Reveal className="prose-tw mt-10" y={20}>
                    <div dangerouslySetInnerHTML={{ __html: details.html }} />
                  </Reveal>
                ) : (
                  project.notesHtml && (
                    <Reveal className="prose-tw" y={20}>
                      <div dangerouslySetInnerHTML={{ __html: project.notesHtml }} />
                    </Reveal>
                  )
                )}
              </div>
            </div>

            {details && details.highlights.length > 0 && (
              <ul className="mt-20 grid md:grid-cols-3 gap-4">
                {details.highlights.map((h, i) => (
                  <Reveal as="li" key={h} delay={i * 0.08} className="rounded-[24px] bg-tw-paper border border-tw-black/10 p-7">
                    <span className="font-mono text-xs opacity-40">{String(i + 1).padStart(2, "0")}</span>
                    <p className="mt-6 font-object-bold text-xl leading-snug tracking-[-0.02em]">{h}</p>
                  </Reveal>
                ))}
              </ul>
            )}
          </section>

          {/* ---------------- QUOTE ---------------- */}
          {details?.quote && (
            <section className="px-5 md:px-10 pb-24 md:pb-32">
              <Reveal>
                <figure className="max-w-5xl">
                  <blockquote className="font-object-heavy text-4xl md:text-6xl leading-[1.02] tracking-[-0.04em]">
                    <span className="text-tw-accent">“</span>
                    {details.quote.text}
                    <span className="text-tw-accent">”</span>
                  </blockquote>
                  {(details.quote.by || details.quote.source) && (
                    <figcaption className="mt-6 font-mono text-xs uppercase tracking-[0.18em] opacity-60">
                      {details.quote.source ? (
                        <a href={details.quote.source} target="_blank" rel="noopener noreferrer" className="hover:opacity-100">
                          {details.quote.by || "Source"} ↗
                        </a>
                      ) : (
                        details.quote.by
                      )}
                    </figcaption>
                  )}
                </figure>
              </Reveal>
            </section>
          )}

          {/* ---------------- NEXT / PREV ---------------- */}
          <section className="border-t border-tw-black/15 grid md:grid-cols-2">
            {[
              { n: prev, dir: "Previous" },
              { n: next, dir: "Next" },
            ].map(({ n, dir }) => (
              <Link
                key={dir}
                href={`/work/${n.slug}`}
                className="group relative flex items-center gap-6 p-6 md:p-10 border-b md:border-b-0 md:even:border-l border-tw-black/15 overflow-hidden"
              >
                <span className="absolute inset-0 bg-tw-black origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                <div className="relative w-20 h-20 md:w-28 md:h-28 shrink-0 rounded-2xl overflow-hidden bg-tw-black/10">
                  <Image src={n.imageUrl} alt="" fill sizes="112px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="relative min-w-0">
                  <div className="font-mono text-xs uppercase tracking-[0.18em] opacity-50 group-hover:text-tw-white transition-colors">
                    {dir} project
                  </div>
                  <div className="mt-2 font-object-heavy text-2xl md:text-4xl tracking-[-0.04em] leading-none group-hover:text-tw-white transition-colors truncate">
                    {n.label}
                  </div>
                </div>
                <span className="relative ml-auto w-12 h-12 shrink-0 rounded-full border border-current flex items-center justify-center group-hover:text-tw-white group-hover:rotate-[-45deg] transition-all duration-500">
                  →
                </span>
              </Link>
            ))}
          </section>

          {/* ---------------- CTA ---------------- */}
          <section className="bg-tw-black text-tw-white px-5 md:px-10 py-24 md:py-36">
            <SplitHeadline
              as="h2"
              text="Got something like this in mind?"
              className="font-object-heavy text-[11vw] md:text-[7vw] leading-[0.9] tracking-[-0.05em] max-w-[13ch]"
            />
            <div className="mt-12 flex flex-col md:flex-row md:items-center gap-8">
              <Magnetic strength={0.4}>
                <Link
                  href="/contact"
                  className="w-44 h-44 md:w-52 md:h-52 rounded-full bg-tw-accent text-tw-black font-object-bold text-lg flex items-center justify-center text-center leading-tight hover:bg-tw-white transition-colors duration-300"
                >
                  Start a<br />project →
                </Link>
              </Magnetic>
              <p className="max-w-md text-tw-white/70 leading-relaxed">
                Big brand or brand new idea, the process is the same: a relaxed chat, an
                honest plan and a fixed quote.{" "}
                <Link href="/start" className="underline underline-offset-4 hover:text-tw-white">
                  Small business or indie founder? Start here.
                </Link>
              </p>
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
    </MotionConfig>
  );
}

