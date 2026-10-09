"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
  MotionConfig,
} from "motion/react";
import Header from "@/components/Header";
import SiteFooter from "@/components/services/SiteFooter";
import HeroArt, { type ArtKey } from "@/components/services/HeroArt";
import {
  SplitHeadline,
  Reveal,
  ScrollText,
  Marquee,
  Magnetic,
  RotatingBadge,
  Eyebrow,
  EASE_OUT,
} from "@/components/services/motion";
import { priceLabel } from "@/data/services";
import { cn } from "@/lib/utils";

export interface Service {
  title: string;
  slug: string;
  tag: string;
  visual?: string;
  art?: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  kicker: string;
  images: { square: string };
  hero: {
    headline: string;
    subheadline: string;
    description: string;
    cta: string;
  };
  story: string;
  benefits: { title: string; description: string }[];
  process: { step: number; title: string; description: string }[];
  features: string[];
  pricing: { starting: string | null; timeline: string };
  faqs: { q: string; a: string }[];
}

export interface WorkItem {
  href: string;
  label: string;
  imageUrl: string;
  services?: string;
  client?: string;
  year: string;
}

export interface RelatedService {
  slug: string;
  tag: string;
  subheadline: string;
  price: string;
}

export const CLIENTS = [
  "Google",
  "United Nations",
  "Featured by Apple",
  "Wendy's",
  "Australian Open",
  "HBF",
  "KitKat",
  "Heinz",
  "VML",
  "Wunderman Thompson",
  "Cannes Lions",
  "D&AD",
  "The One Show",
  "Spike Awards",
];

export const STATS = [
  { value: "20+", label: "years designing & building digital things" },
  { value: "Apple", label: "featured work on the App Store" },
  { value: "Top 5", label: "AI startup in Australia (IOOKI Labs)" },
  { value: "#5", label: "Shopping, AU App Store — Hunter Markets" },
];

const ART_BY_SLUG: Record<string, ArtKey> = {
  "web-design": "structure",
  brand: "mark",
  seo: "signal",
  geo: "interference",
  "app-design": "touch",
  "app-development": "rule30",
  "ai-development": "field",
  "ui-ux": "system",
  "graphic-design": "ampersand",
  wordpress: "layers",
};
const artFor = (s: Service) => (s.art as ArtKey) || ART_BY_SLUG[s.slug] || "layers";

/* Small abstract glyphs for the benefit cards */
const Glyph = ({ i }: { i: number }) => {
  const shapes = [
    <circle key="c" cx="20" cy="20" r="14" />,
    <rect key="r" x="7" y="7" width="26" height="26" rx="4" />,
    <path key="t" d="M20 5 L35 33 L5 33 Z" />,
    <path key="a" d="M6 34 A28 28 0 0 1 34 6 L34 34 Z" />,
  ];
  return (
    <motion.svg
      viewBox="0 0 40 40"
      className="w-10 h-10 fill-current"
      whileHover={{ rotate: 90 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
    >
      {shapes[i % shapes.length]}
    </motion.svg>
  );
};

function Faq({ faqs }: { faqs: Service["faqs"] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ul className="border-t border-tw-black/15">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <Reveal as="li" key={i} delay={i * 0.05} className="border-b border-tw-black/15">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-start gap-6 py-6 text-left cursor-pointer group"
            >
              <span className="font-mono text-sm opacity-40 pt-1 w-8 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="flex-1 font-object-bold text-xl md:text-2xl tracking-[-0.02em] group-hover:translate-x-1 transition-transform duration-500">
                {f.q}
              </h3>
              <motion.span
                className="w-9 h-9 shrink-0 rounded-full border border-tw-black/30 flex items-center justify-center text-lg"
                animate={{
                  rotate: isOpen ? 45 : 0,
                  backgroundColor: isOpen ? "#111111" : "rgba(17,17,17,0)",
                  color: isOpen ? "#E0D3BD" : "#111111",
                }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
              >
                +
              </motion.span>
            </button>
            {/* Answer stays in the DOM when closed so it's always crawlable */}
            <motion.div
              initial={false}
              animate={{
                height: isOpen ? "auto" : 0,
                opacity: isOpen ? 1 : 0,
              }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
              className="overflow-hidden"
            >
              <p className="pl-14 pr-14 pb-8 text-base md:text-lg leading-relaxed max-w-3xl text-tw-black/75">
                {f.a}
              </p>
            </motion.div>
          </Reveal>
        );
      })}
    </ul>
  );
}

function Process({ steps }: { steps: Service["process"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.6", "end 0.6"],
  });
  const [current, setCurrent] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setCurrent(Math.min(steps.length - 1, Math.floor(v * steps.length)));
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="grid lg:grid-cols-12 gap-10 lg:gap-16">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-32">
          <Eyebrow index="03">How it works</Eyebrow>
          <h2 className="mt-6 font-object-heavy text-5xl md:text-7xl tracking-[-0.04em] leading-[0.95]">
            Simple process. No surprises.
          </h2>
          <div className="mt-10 hidden lg:flex items-end gap-4">
            <div className="relative h-[9rem] overflow-hidden font-object-thin text-[9rem] leading-none tracking-[-0.06em]">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={current}
                  className="block"
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.6, ease: EASE_OUT }}
                >
                  {String(current + 1).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="font-mono text-lg pb-6 opacity-50">
              / {String(steps.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
      <ol className="lg:col-span-7 relative pl-10">
        <div className="absolute left-0 top-2 bottom-2 w-px bg-tw-black/15">
          <motion.div
            className="w-full bg-tw-black origin-top"
            style={{ height: lineHeight }}
          />
        </div>
        {steps.map((step, i) => (
          <motion.li
            key={step.step}
            className="relative py-10 md:py-14 border-b border-tw-black/10 last:border-0"
            animate={{ opacity: i <= current ? 1 : 0.35 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span
              className="absolute -left-10 top-[3.1rem] md:top-[4.1rem] -translate-x-1/2 w-3 h-3 rounded-full border-2 border-tw-black"
              animate={{
                backgroundColor: i <= current ? "#111111" : "#E0D3BD",
                scale: i === current ? 1.4 : 1,
              }}
            />
            <span className="font-mono text-sm opacity-50">
              Step {String(step.step).padStart(2, "0")}
            </span>
            <h3 className="mt-2 font-object-bold text-3xl md:text-4xl tracking-[-0.03em]">
              {step.title}
            </h3>
            <p className="mt-4 text-lg leading-relaxed max-w-xl text-tw-black/70">
              {step.description}
            </p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

export default function ServicePage({
  service,
  work,
  related,
}: {
  service: Service;
  work: WorkItem[];
  related: RelatedService[];
}) {
  const router = useRouter();
  const [showBar, setShowBar] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => {
    const nearBottom =
      typeof document !== "undefined" &&
      v + window.innerHeight > document.body.scrollHeight - 900;
    setShowBar(v > window.innerHeight * 0.9 && !nearBottom);
  });

  const openContact = () => router.push(`/contact?service=${service.slug}`);

  // Parallax for the CTA block
  const ctaRef = useRef<HTMLElement>(null);
  const { scrollYProgress: ctaProgress } = useScroll({
    target: ctaRef,
    offset: ["start end", "end end"],
  });
  const ctaScale = useTransform(ctaProgress, [0, 1], [0.86, 1]);
  const ctaRadius = useTransform(ctaProgress, [0, 1], [64, 0]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="grain min-h-screen bg-tw-white text-tw-black font-object-regular selection:bg-tw-black selection:text-tw-white">
        <Header variant="light" />

        <main>
          {/* ---------------- HERO ---------------- */}
          <section className="relative isolate overflow-hidden md:min-h-[100svh] px-5 md:px-10 pt-8 md:pt-36 pb-16 flex flex-col">
            {/* Live print in the background, faded out behind the copy */}
            <div className="absolute inset-0 -z-10 rise" style={{ animationDelay: "0.3s" }}>
              <HeroArt
                art={artFor(service)}
                className="w-full h-full mix-blend-multiply opacity-60 md:opacity-100 [mask-image:linear-gradient(to_top,black_30%,transparent_95%)] md:[mask-image:linear-gradient(to_right,transparent_8%,rgba(0,0,0,0.35)_38%,black_62%)]"
              />
            </div>
            <nav aria-label="Breadcrumb" className="text-xs">
              <ol className="flex items-center gap-2 text-tw-black/60">
                <li>
                  <Link href="/" className="hover:text-tw-black transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/services" className="hover:text-tw-black transition-colors">
                    Services
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="text-tw-black">
                  {service.tag}
                </li>
              </ol>
            </nav>

            <div className="flex-1 grid lg:grid-cols-12 gap-12 lg:gap-10 items-center mt-10 lg:mt-0">
              <div className="lg:col-span-7">
                <div
                  className="rise inline-flex items-center gap-2.5 rounded-full border border-tw-black/20 px-4 py-2 text-xs font-object-bold uppercase tracking-wider"
                  style={{ animationDelay: "0.1s" }}
                >
                  <span className="relative flex w-2 h-2">
                    <span className="absolute inset-0 rounded-full bg-tw-accent animate-ping" />
                    <span className="relative w-2 h-2 rounded-full bg-tw-accent" />
                  </span>
                  {service.kicker}
                </div>

                <SplitHeadline
                  text={service.h1}
                  className="mt-8 font-object-heavy text-[13vw] md:text-[7.5vw] lg:text-[5.6vw] leading-[0.92] tracking-[-0.045em]"
                  delay={0.2}
                  onLoad
                />

                <div className="rise" style={{ animationDelay: "0.7s" }}>
                  <p className="mt-8 text-xl md:text-2xl leading-snug max-w-2xl">
                    {service.hero.subheadline}
                  </p>
                  <p className="mt-4 text-base leading-relaxed max-w-xl text-tw-black/70">
                    {service.hero.description}
                  </p>
                </div>

                <div
                  className="rise mt-10 flex flex-wrap items-center gap-4"
                  style={{ animationDelay: "0.9s" }}
                >
                  <Magnetic>
                    <button
                      onClick={openContact}
                      className="group relative overflow-hidden rounded-full bg-tw-black text-tw-white pl-7 pr-3 py-3 font-object-bold inline-flex items-center gap-4 cursor-pointer"
                    >
                      <span className="relative z-10">{service.hero.cta}</span>
                      <span className="relative z-10 w-10 h-10 rounded-full bg-tw-accent text-tw-black flex items-center justify-center transition-transform duration-500 group-hover:rotate-[-45deg]">
                        →
                      </span>
                    </button>
                  </Magnetic>
                  <a
                    href="#pricing"
                    className="rounded-full border border-tw-black/25 px-6 py-4 text-sm font-object-bold hover:bg-tw-black hover:text-tw-white transition-colors duration-300"
                  >
                    {priceLabel(service)} · {service.pricing.timeline}
                  </a>
                </div>
              </div>

            </div>

            <motion.div
              className="absolute bottom-10 right-10 w-32 md:w-36 hidden md:block text-tw-black z-10"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4, duration: 0.8, ease: EASE_OUT }}
            >
              <RotatingBadge text="Free 30 min chat · No hard sell · ">
                <button
                  onClick={openContact}
                  aria-label="Book a free 30 minute chat"
                  className="w-14 h-14 rounded-full bg-tw-black text-tw-white flex items-center justify-center text-xl cursor-pointer hover:bg-tw-accent hover:text-tw-black transition-colors"
                >
                  ↗
                </button>
              </RotatingBadge>
            </motion.div>
          </section>

          {/* ---------------- MARQUEE ---------------- */}
          <section aria-label="Clients and awards" className="bg-tw-black text-tw-white py-6 -rotate-1 scale-[1.02]">
            <Marquee
              items={CLIENTS}
              className="font-object-bold text-2xl md:text-4xl tracking-[-0.03em]"
            />
          </section>

          {/* ---------------- STORY ---------------- */}
          <section className="px-5 md:px-10 py-28 md:py-44">
            <div className="grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-3">
                <Eyebrow index="01">The short version</Eyebrow>
                <Reveal className="mt-10 hidden lg:block">
                  <div className="relative w-40 aspect-[3/4] rounded-2xl overflow-hidden rotate-[-3deg] shadow-xl">
                    <Image
                      src="/assets/media/trav_bio.jpg"
                      alt="Travis Weerts, designer and developer in the Perth Hills"
                      fill
                      sizes="160px"
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-5 text-xs leading-relaxed text-tw-black/60 max-w-[12rem]">
                    Travis Weerts — designer, developer & creative consultant.
                    Perth, WA.
                  </p>
                </Reveal>
              </div>
              <div className="lg:col-span-9">
                <ScrollText
                  text={service.story}
                  className="font-object-bold text-3xl md:text-5xl lg:text-[3.6vw] leading-[1.1] tracking-[-0.03em]"
                />
                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-tw-black/15 border border-tw-black/15 rounded-3xl overflow-hidden">
                  {STATS.map((s, i) => (
                    <Reveal key={s.label} delay={i * 0.08} className="bg-tw-white p-6 md:p-8">
                      <div className="font-object-heavy text-4xl md:text-5xl tracking-[-0.04em]">
                        {s.value}
                      </div>
                      <div className="mt-3 text-sm leading-snug text-tw-black/65">
                        {s.label}
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ---------------- BENEFITS ---------------- */}
          <section className="px-5 md:px-10 pb-28 md:pb-44">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
              <div>
                <Eyebrow index="02">What you get</Eyebrow>
                <SplitHeadline
                  as="h2"
                  text={`Why people choose me for ${service.tag.toLowerCase()}.`}
                  className="mt-6 font-object-heavy text-5xl md:text-7xl tracking-[-0.04em] leading-[0.95] max-w-4xl"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
              {service.benefits.map((b, i) => (
                <Reveal key={b.title} delay={i * 0.1}>
                  <motion.article
                    className={cn(
                      "group relative h-full min-h-[22rem] rounded-[28px] p-8 flex flex-col overflow-hidden cursor-default",
                      i % 2 === 0
                        ? "bg-tw-paper text-tw-black"
                        : "bg-tw-black text-tw-white",
                    )}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.5, ease: EASE_OUT }}
                  >
                    <div className="flex items-start justify-between">
                      <Glyph i={i} />
                      <span className="font-mono text-sm opacity-40">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-auto pt-16 font-object-bold text-2xl md:text-3xl tracking-[-0.03em] leading-tight">
                      {b.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed opacity-75">
                      {b.description}
                    </p>
                    <span
                      aria-hidden
                      className="absolute -right-16 -bottom-16 w-48 h-48 rounded-full bg-tw-accent scale-0 group-hover:scale-100 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] mix-blend-multiply"
                    />
                  </motion.article>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ---------------- PROCESS ---------------- */}
          <section className="px-5 md:px-10 py-28 md:py-40 border-t border-tw-black/15">
            <Process steps={service.process} />
          </section>

          {/* ---------------- INCLUDED + PRICING ---------------- */}
          <section id="pricing" className="px-5 md:px-10 py-28 md:py-40 bg-tw-paper scroll-mt-24">
            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-7">
                <Eyebrow index="04">What&apos;s included</Eyebrow>
                <h2 className="mt-6 font-object-heavy text-5xl md:text-7xl tracking-[-0.04em] leading-[0.95]">
                  The spec sheet.
                </h2>
                <dl className="mt-12 border-t border-tw-black">
                  {service.features.map((f, i) => (
                    <Reveal
                      key={f}
                      delay={i * 0.03}
                      y={12}
                      className="flex items-baseline gap-4 py-4 border-b border-tw-black/15"
                    >
                      <dt className="font-mono text-xs opacity-40 w-8">
                        {String(i + 1).padStart(2, "0")}
                      </dt>
                      <dd className="font-object-bold text-lg md:text-xl tracking-[-0.02em]">
                        {f}
                      </dd>
                      <span className="flex-1 border-b border-dotted border-tw-black/30 translate-y-[-4px]" />
                      <span className="text-sm">✓</span>
                    </Reveal>
                  ))}
                </dl>
              </div>
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-32">
                  <Reveal>
                    <div className="relative rounded-[32px] bg-tw-black text-tw-white p-8 md:p-10 overflow-hidden">
                      <motion.div
                        aria-hidden
                        className="absolute -top-24 -right-24 w-72 h-72 rounded-full border border-tw-white/10"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                      >
                        <span className="absolute top-1/2 -left-1.5 w-3 h-3 rounded-full bg-tw-accent" />
                      </motion.div>
                      <div className="font-mono text-sm uppercase opacity-60">
                        {service.tag} · Perth
                      </div>
                      <div className="mt-8 text-sm opacity-60">
                        {service.pricing.starting ? "Starting from" : "Priced to fit"}
                      </div>
                      <div className="font-object-heavy text-6xl md:text-7xl tracking-[-0.05em]">
                        {service.pricing.starting ?? "Your quote"}
                      </div>
                      <div className="mt-2 text-sm opacity-60">
                        {service.pricing.starting ? "AUD · " : ""}
                        {service.pricing.timeline}
                      </div>
                      {!service.pricing.starting && (
                        <p className="mt-6 text-sm leading-relaxed text-tw-white/75">
                          Every project is different, so we start with a free
                          consult to work out what&apos;s involved. You get a
                          fixed quote — and can pay it off monthly.
                        </p>
                      )}
                      <ul className="mt-8 space-y-3 text-sm">
                        {[
                          "Free 30-minute discovery chat",
                          "Fixed quote before we start",
                          "Monthly payment plans available",
                          "Work directly with me — no hand-offs",
                        ].map((t) => (
                          <li key={t} className="flex gap-3">
                            <span className="text-tw-accent">●</span>
                            {t}
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={openContact}
                        className="mt-10 w-full rounded-full bg-tw-white text-tw-black py-4 font-object-bold hover:bg-tw-accent transition-colors duration-300 cursor-pointer"
                      >
                        Get a quote →
                      </button>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </section>

          {/* ---------------- WORK ---------------- */}
          {work.length > 0 && (
            <section className="px-5 md:px-10 py-28 md:py-40">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
                <div>
                  <Eyebrow index="05">Selected work</Eyebrow>
                  <h2 className="mt-6 font-object-heavy text-5xl md:text-7xl tracking-[-0.04em] leading-[0.95]">
                    Proof, not promises.
                  </h2>
                </div>
                <Link
                  href="/work"
                  className="self-start md:self-auto rounded-full border border-tw-black/25 px-6 py-3 text-sm font-object-bold hover:bg-tw-black hover:text-tw-white transition-colors"
                >
                  See all work →
                </Link>
              </div>
              <div className="grid md:grid-cols-3 gap-5">
                {work.map((w, i) => (
                  <Reveal key={w.label} delay={i * 0.12}>
                    <Link href={w.href} className="group block">
                      <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-tw-black/10">
                        <Image
                          src={w.imageUrl}
                          alt={`${w.label} — ${w.services ?? service.tag} by Travis Weerts`}
                          fill
                          sizes="(min-width: 768px) 33vw, 100vw"
                          className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                        />
                        <span className="absolute top-4 left-4 rounded-full bg-tw-white/90 backdrop-blur px-3 py-1 text-[11px] font-object-bold">
                          {w.year}
                        </span>
                      </div>
                      <div className="mt-4 flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-object-bold text-xl tracking-[-0.02em]">
                            {w.label}
                          </h3>
                          {w.services && (
                            <p className="mt-1 text-sm text-tw-black/60">
                              {w.services}
                            </p>
                          )}
                        </div>
                        <span className="w-10 h-10 shrink-0 rounded-full border border-tw-black/25 flex items-center justify-center transition-all duration-500 group-hover:bg-tw-black group-hover:text-tw-white group-hover:rotate-[-45deg]">
                          →
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          {/* ---------------- FAQ ---------------- */}
          <section className="px-5 md:px-10 py-28 md:py-40 border-t border-tw-black/15">
            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <Eyebrow index="06">Questions</Eyebrow>
                <h2 className="mt-6 font-object-heavy text-5xl md:text-6xl tracking-[-0.04em] leading-[0.95]">
                  {service.tag} FAQs
                </h2>
                <p className="mt-6 text-tw-black/70 max-w-sm">
                  Can&apos;t see your question?{" "}
                  <button
                    onClick={openContact}
                    className="underline underline-offset-4 hover:text-tw-black cursor-pointer"
                  >
                    Just ask
                  </button>{" "}
                  — I reply to every message personally.
                </p>
              </div>
              <div className="lg:col-span-8">
                <Faq faqs={service.faqs} />
              </div>
            </div>
          </section>

          {/* ---------------- RELATED SERVICES ---------------- */}
          {related.length > 0 && (
            <section className="px-5 md:px-10 pb-28 md:pb-40">
              <Eyebrow index="07">Pairs well with</Eyebrow>
              <ul className="mt-10 border-t border-tw-black">
                {related.map((r, i) => (
                  <Reveal as="li" key={r.slug} delay={i * 0.06}>
                    <Link
                      href={`/services/${r.slug}`}
                      className="group relative flex items-center gap-6 py-7 md:py-9 border-b border-tw-black/20 overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-tw-black origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                      <span className="relative font-mono text-sm opacity-50 w-10 pl-2 group-hover:text-tw-white transition-colors">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="relative font-object-heavy text-4xl md:text-6xl tracking-[-0.04em] group-hover:text-tw-white group-hover:translate-x-4 transition-all duration-500">
                        {r.tag}
                      </span>
                      <span className="relative hidden md:block ml-auto text-sm text-tw-black/60 max-w-xs text-right group-hover:text-tw-white/70 transition-colors">
                        {r.subheadline}
                      </span>
                      <span className="relative w-12 h-12 shrink-0 mr-2 ml-auto md:ml-6 rounded-full border border-current flex items-center justify-center group-hover:text-tw-white group-hover:rotate-[-45deg] transition-all duration-500">
                        →
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </ul>
            </section>
          )}

          {/* ---------------- CTA ---------------- */}
          <section ref={ctaRef} className="px-0">
            <motion.div
              style={{ scale: ctaScale, borderTopLeftRadius: ctaRadius, borderTopRightRadius: ctaRadius }}
              className="bg-tw-black text-tw-white px-5 md:px-10 pt-28 md:pt-40 pb-20 origin-bottom overflow-hidden relative"
            >
              <Marquee
                items={["Let's make it real", "Got an idea?", "Free 30 min chat", "Perth Hills, WA"]}
                speed={30}
                className="absolute top-8 left-0 right-0 font-mono text-sm uppercase opacity-40"
              />
              <SplitHeadline
                as="h2"
                text="Got something in your head? Let's make it real."
                className="font-object-heavy text-[12vw] md:text-[8vw] leading-[0.9] tracking-[-0.05em] max-w-[14ch]"
              />
              <div className="mt-14 flex flex-col md:flex-row md:items-center gap-8">
                <Magnetic strength={0.4}>
                  <button
                    onClick={openContact}
                    className="w-44 h-44 md:w-52 md:h-52 rounded-full bg-tw-accent text-tw-black font-object-bold text-lg flex items-center justify-center text-center leading-tight hover:bg-tw-white transition-colors duration-300 cursor-pointer"
                  >
                    Start a<br />project →
                  </button>
                </Magnetic>
                <p className="max-w-md text-tw-white/70 leading-relaxed">
                  Tell me a little about what you&apos;re working on. I&apos;ll reply
                  within one business day with honest thoughts — even if I&apos;m not
                  the right fit.
                </p>
              </div>
            </motion.div>
          </section>
        </main>

        <SiteFooter />

        {/* ---------------- STICKY CTA ---------------- */}
        <AnimatePresence>
          {showBar && (
            <motion.div
              className="fixed bottom-5 left-1/2 z-[90] -translate-x-1/2"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
            >
              <div className="flex items-center gap-4 rounded-full bg-tw-black/90 backdrop-blur text-tw-white pl-6 pr-2 py-2 shadow-2xl whitespace-nowrap">
                <span className="text-sm hidden sm:inline">
                  <b className="font-object-bold">{service.tag}</b>
                  <span className="opacity-60"> · {priceLabel(service).toLowerCase()}</span>
                </span>
                <button
                  onClick={openContact}
                  className="rounded-full bg-tw-accent text-tw-black px-5 py-2.5 text-sm font-object-bold hover:bg-tw-white transition-colors cursor-pointer"
                >
                  Book a free chat →
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </MotionConfig>
  );
}
