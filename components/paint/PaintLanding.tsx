"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, MotionConfig, useScroll, useTransform } from "motion/react";
import { sendGAEvent } from "@next/third-parties/google";
import Header from "@/components/Header";
import SiteFooter from "@/components/services/SiteFooter";
import { cn } from "@/lib/utils";
import {
  PAINT,
  heroReels,
  stories,
  steps,
  formats,
  extensions,
  packages,
  appearances,
  faqs,
  useCases,
  type PaintClip,
} from "@/data/paint";

const EASE = [0.22, 1, 0.36, 1] as const;

/** The artwork's own rainbow, pulled from the strokes in the video */
const RAINBOW =
  "linear-gradient(90deg,#ff3d7f,#ff8a00,#ffe600,#7dff3a,#00e0ff,#3d6bff,#b44dff,#ff3d7f)";

/* ------------------------------------------------------------------ */
/* Wordmark: P_AI_NT / W_TH / OUR__ / MI__NDS                          */
/* ------------------------------------------------------------------ */

const WORDMARK = ["P_AI_NT", "W_TH", "OUR__", "MI__NDS"];

function Wordmark({ className }: { className?: string }) {
  return (
    <h1 className={cn("font-sans font-normal leading-[0.86] tracking-[-0.04em] text-white", className)}>
      <span className="sr-only">Paint With Our Minds</span>
      <span aria-hidden className="block">
        {WORDMARK.map((line, li) => (
          <span key={line} className="block overflow-hidden">
            <span className="word-rise inline-block" style={{ animationDelay: `${0.1 + li * 0.09}s` }}>
              {line.split("").map((ch, i) =>
                ch === "_" ? (
                  <span key={i} className="pwom-underscore">
                    _
                  </span>
                ) : (
                  <span key={i}>{ch}</span>
                ),
              )}
              {li === WORDMARK.length - 1 && <span className="pwom-cursor">_</span>}
            </span>
          </span>
        ))}
      </span>
    </h1>
  );
}

/* ------------------------------------------------------------------ */
/* Clip: a 9:16 video that starts at an offset and only plays on screen */
/* ------------------------------------------------------------------ */

function Clip({ clip, className, eager }: { clip: PaintClip; className?: string; eager?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const seek = () => {
      if (clip.start && v.currentTime < 0.1) v.currentTime = clip.start;
    };
    v.addEventListener("loadedmetadata", seek);
    if (v.readyState >= 1) seek();
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.05 },
    );
    io.observe(v);
    return () => {
      io.disconnect();
      v.removeEventListener("loadedmetadata", seek);
    };
  }, [clip.start]);

  return (
    <video
      ref={ref}
      className={cn("h-full w-full object-cover", className)}
      style={{
        filter: clip.hue ? `hue-rotate(${clip.hue}deg) saturate(1.15)` : undefined,
        transform: clip.mirror ? "scaleX(-1)" : undefined,
      }}
      src={clip.video}
      poster={clip.poster}
      muted
      loop
      playsInline
      preload={eager ? "auto" : "metadata"}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const up = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const down = useTransform(scrollYProgress, [0, 1], ["-10%", "8%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  // Six reels in three columns, each column drifting the opposite way
  const columns = [heroReels.slice(0, 2), heroReels.slice(2, 4), heroReels.slice(4, 6)];

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden bg-black">
      {/* Blurred full-bleed wash of the artwork */}
      <video
        aria-hidden
        className="absolute inset-0 h-full w-full scale-125 object-cover opacity-45 blur-2xl"
        src={PAINT.heroVideo}
        poster={PAINT.heroPoster}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Drifting wall of reels */}
      <motion.div
        aria-hidden
        style={{ opacity: fade }}
        className="absolute inset-y-0 right-[-30%] md:right-[-4%] flex w-[120%] md:w-[62%] gap-3 md:gap-4 rotate-[-6deg] origin-center"
      >
        {columns.map((col, ci) => (
          <motion.div
            key={ci}
            style={{ y: ci % 2 ? down : up }}
            className={cn("flex flex-1 flex-col gap-3 md:gap-4", ci === 1 ? "pt-0" : "pt-[22vh]")}
          >
            {col.map((clip, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.25 + ci * 0.12 + i * 0.1, ease: EASE }}
                className="relative aspect-[9/16] overflow-hidden rounded-[22px] ring-1 ring-white/10"
              >
                <Clip clip={clip} eager={i === 0} />
              </motion.div>
            ))}
          </motion.div>
        ))}
      </motion.div>

      {/* Legibility scrim */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent md:via-black/40" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#070708] to-transparent" />

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-5 pb-12 pt-28 md:px-10 md:pb-16">
        <div className="rise font-mono text-[11px] uppercase tracking-[0.22em] text-white/70" style={{ animationDelay: "0.05s" }}>
          A bookable AI art activation · Perth + Australia-wide
        </div>
        <Wordmark className="mt-6 text-[19vw] md:text-[11vw] lg:text-[9.5vw]" />
        <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-end">
          <p className="rise md:col-span-5 text-lg md:text-xl leading-snug text-white/85" style={{ animationDelay: "0.55s" }}>
            A live painting that listens to the room. Guests talk to it from their phones, and AI turns
            the mood of the crowd into colour, shape and motion on the big screen.
          </p>
          <div className="rise md:col-span-7 flex flex-wrap gap-3 md:justify-end" style={{ animationDelay: "0.7s" }}>
            <a
              href="#book"
              className="pwom-rainbow-btn rounded-full px-6 py-3.5 text-sm font-medium text-black"
            >
              Book the experience
            </a>
            <a
              href="#stories"
              className="rounded-full border border-white/25 px-6 py-3.5 text-sm text-white hover:bg-white hover:text-black transition-colors"
            >
              See what it paints
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Marquee                                                             */
/* ------------------------------------------------------------------ */

function Ticker() {
  const words = ["SAY_IT", "FEEL_IT", "PA_INT_IT", "SEE_IT", "SHARE_IT"];
  const row = [...words, ...words, ...words];
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-[#070708] py-5">
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap font-sans text-3xl md:text-5xl tracking-[-0.03em]">
        {[...row, ...row].map((w, i) => (
          <span key={i} className={i % 2 ? "text-white/30" : "pwom-rainbow-text"}>
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section helpers                                                     */
/* ------------------------------------------------------------------ */

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/50">
      {children}
    </div>
  );
}

function FadeUp({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* How it works                                                        */
/* ------------------------------------------------------------------ */

function HowItWorks() {
  return (
    <section className="px-5 py-24 md:px-10 md:py-36">
      <div className="grid gap-12 md:grid-cols-12">
        <FadeUp className="md:col-span-5">
          <Label>What it is</Label>
          <h2 className="mt-5 font-sans text-4xl md:text-6xl leading-[0.95] tracking-[-0.04em]">
            A word cloud that turned into a painting.
          </h2>
          <p className="mt-6 max-w-md text-white/70 leading-relaxed">
            Paint With Our Minds is a live AI artwork for events. It listens to what people say, reads the
            emotion behind it, and paints the room&apos;s collective mood in real time. Nobody needs to be an
            artist. Everybody ends up in the painting.
          </p>
        </FadeUp>
        <div className="md:col-span-7 grid gap-4 sm:grid-cols-3">
          {steps.map((s, i) => (
            <FadeUp key={s.n} delay={i * 0.1} className="rounded-[22px] border border-white/10 bg-white/[0.03] p-6">
              <div className="pwom-rainbow-text font-mono text-sm">{s.n}</div>
              <h3 className="mt-10 font-sans text-2xl tracking-[-0.03em]">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/65">{s.body}</p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Stories viewer                                                      */
/* ------------------------------------------------------------------ */

const STORY_MS = 6000;

function Stories() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const story = stories[index];

  const go = useCallback((dir: number) => {
    setIndex((i) => (i + dir + stories.length) % stories.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !inView) return;
    let raf = 0;
    let last = performance.now();
    const tick = (t: number) => {
      const dt = t - last;
      last = t;
      setProgress((p) => {
        const n = p + dt / STORY_MS;
        if (n >= 1) {
          go(1);
          return 0;
        }
        return n;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused, inView, go, index]);

  return (
    <section id="stories" className="scroll-mt-20 px-5 py-24 md:px-10 md:py-36 bg-[#0d0d0f]">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <Label>Stories from the canvas</Label>
          <h2 className="mt-5 font-sans text-4xl md:text-6xl leading-[0.95] tracking-[-0.04em]">
            Every crowd paints something different.
          </h2>
          <p className="mt-6 max-w-md text-white/70 leading-relaxed">
            The mood of the room decides the style. Tap through a few of the artwork types it makes.
          </p>

          {/* Story bubbles */}
          <div className="mt-10 flex flex-wrap gap-5">
            {stories.map((s, i) => (
              <button
                key={s.id}
                onClick={() => {
                  setIndex(i);
                  setProgress(0);
                }}
                className="group flex flex-col items-center gap-2"
                aria-label={`Show ${s.title}`}
                aria-current={i === index}
              >
                <span
                  className={cn(
                    "rounded-full p-[3px] transition-transform group-hover:scale-105",
                    i === index ? "" : "opacity-60",
                  )}
                  style={{ background: i === index ? RAINBOW : "rgba(255,255,255,0.2)" }}
                >
                  <span className="block h-16 w-16 overflow-hidden rounded-full border-[3px] border-[#0d0d0f]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={s.poster}
                      alt=""
                      className="h-full w-full object-cover"
                      style={{
                        filter: s.hue ? `hue-rotate(${s.hue}deg)` : undefined,
                        transform: s.mirror ? "scaleX(-1)" : undefined,
                      }}
                    />
                  </span>
                </span>
                <span className={cn("text-xs", i === index ? "text-white" : "text-white/50")}>{s.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Phone-sized story player */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="relative flex items-center gap-6">
            {/* Peeking neighbours */}
            <div className="hidden md:block w-40 aspect-[9/16] overflow-hidden rounded-[22px] opacity-30 scale-90">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={stories[(index - 1 + stories.length) % stories.length].poster} alt="" className="h-full w-full object-cover" />
            </div>

            <div
              ref={wrapRef}
              className="relative w-[78vw] max-w-[380px] aspect-[9/16] overflow-hidden rounded-[28px] bg-black ring-1 ring-white/15 shadow-[0_40px_120px_-30px_rgba(255,61,127,0.45)]"
              onPointerDown={() => setPaused(true)}
              onPointerUp={() => setPaused(false)}
              onPointerLeave={() => setPaused(false)}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={story.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <Clip clip={story} eager />
                </motion.div>
              </AnimatePresence>

              {/* Progress bars */}
              <div className="absolute inset-x-3 top-3 z-10 flex gap-1.5">
                {stories.map((s, i) => (
                  <div key={s.id} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/30">
                    <div
                      className="h-full bg-white"
                      style={{ width: i < index ? "100%" : i === index ? `${progress * 100}%` : "0%" }}
                    />
                  </div>
                ))}
              </div>

              <div className="absolute inset-x-3 top-7 z-10 flex items-center gap-2 text-xs text-white">
                <span className="h-6 w-6 rounded-full" style={{ background: RAINBOW }} />
                <span className="font-medium">paint_with_our_minds</span>
                <span className="text-white/60">{story.name.toLowerCase()}</span>
              </div>

              {/* Caption */}
              <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5 pt-24">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={story.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
                      Prompt: {story.prompt}
                    </div>
                    <div className="mt-2 font-sans text-3xl tracking-[-0.03em] text-white">{story.title}</div>
                    <p className="mt-2 text-sm leading-snug text-white/80">{story.caption}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Tap zones */}
              <button aria-label="Previous story" onClick={() => go(-1)} className="absolute inset-y-0 left-0 z-20 w-1/3" />
              <button aria-label="Next story" onClick={() => go(1)} className="absolute inset-y-0 right-0 z-20 w-2/3" />
            </div>

            <div className="hidden md:block w-40 aspect-[9/16] overflow-hidden rounded-[22px] opacity-30 scale-90">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={stories[(index + 1) % stories.length].poster} alt="" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Made for                                                            */
/* ------------------------------------------------------------------ */

function MadeFor() {
  return (
    <section className="px-5 py-24 md:px-10 md:py-32">
      <Label>Made for</Label>
      <h2 className="mt-5 max-w-4xl font-sans text-4xl md:text-6xl leading-[0.95] tracking-[-0.04em]">
        Anywhere creativity, technology and a curious crowd collide.
      </h2>
      <ul className="mt-12 flex flex-wrap gap-3">
        {useCases.map((u, i) => (
          <motion.li
            key={u}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
            className="pwom-chip rounded-full border border-white/15 px-5 py-3 text-base md:text-lg"
          >
            {u}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Formats + extensions                                                */
/* ------------------------------------------------------------------ */

function FormatIcon({ id }: { id: string }) {
  if (id === "projector")
    return (
      <div className="relative h-full w-full">
        <div className="absolute inset-x-[12%] top-[12%] bottom-[30%] rounded-md overflow-hidden opacity-90" style={{ background: RAINBOW, filter: "blur(10px)" }} />
        <div className="absolute bottom-[10%] left-1/2 h-4 w-12 -translate-x-1/2 rounded bg-white/80" />
      </div>
    );
  if (id === "frame")
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-[85%] aspect-[9/16] border-[6px] border-[#2a2622] bg-black p-0.5 shadow-xl">
          <div className="h-full w-full" style={{ background: RAINBOW, filter: "blur(4px)" }} />
        </div>
      </div>
    );
  return (
    <div className="grid h-full grid-cols-6 grid-rows-3 gap-[3px] p-3">
      {Array.from({ length: 18 }).map((_, i) => (
        <div key={i} className="rounded-[2px]" style={{ background: RAINBOW, backgroundSize: "600% 100%", backgroundPosition: `${(i % 6) * 20}% 0` }} />
      ))}
    </div>
  );
}

function Formats() {
  return (
    <section className="px-5 py-24 md:px-10 md:py-32 bg-[#0d0d0f]">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <Label>Formats</Label>
          <h2 className="mt-5 font-sans text-4xl md:text-5xl leading-[0.95] tracking-[-0.04em]">
            Big wall, framed piece, or both.
          </h2>
        </div>
        <div className="md:col-span-8 grid gap-4 sm:grid-cols-3">
          {formats.map((f, i) => (
            <FadeUp key={f.id} delay={i * 0.08} className="rounded-[22px] border border-white/10 bg-black p-5">
              <div className="aspect-[4/3] overflow-hidden rounded-[14px] bg-white/[0.04]">
                <FormatIcon id={f.id} />
              </div>
              <h3 className="mt-5 font-sans text-2xl tracking-[-0.03em]">{f.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{f.body}</p>
              <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">{f.spec}</div>
            </FadeUp>
          ))}
        </div>
      </div>

      <div className="mt-28">
        <Label>Extensions</Label>
        <h2 className="mt-5 max-w-3xl font-sans text-4xl md:text-5xl leading-[0.95] tracking-[-0.04em]">
          Turn it up. Let the crowd, their faces, bodies and voices in.
        </h2>
        <div className="mt-12 grid gap-px overflow-hidden rounded-[22px] border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
          {extensions.map((x, i) => (
            <FadeUp key={x.id} delay={i * 0.08} className="group relative bg-[#0d0d0f] p-7 md:p-9 overflow-hidden">
              <div
                className="absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-60"
                style={{ background: RAINBOW }}
              />
              <div className="relative">
                <div className="font-mono text-sm text-white/40">+{String(i + 1).padStart(2, "0")}</div>
                <h3 className="mt-12 font-sans text-3xl tracking-[-0.03em]">{x.name}</h3>
                <p className="mt-3 leading-relaxed text-white/65">{x.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Packages                                                            */
/* ------------------------------------------------------------------ */

function Packages({ onPick }: { onPick: (name: string) => void }) {
  return (
    <section className="px-5 py-24 md:px-10 md:py-36">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Label>Booking</Label>
          <h2 className="mt-5 font-sans text-4xl md:text-6xl leading-[0.95] tracking-[-0.04em]">
            What it costs.
          </h2>
        </div>
        <p className="max-w-sm text-sm text-white/60 leading-relaxed">
          Indicative pricing, excluding hardware hire and travel outside Perth. Every event is a little
          different, so send an enquiry for a proper quote.
        </p>
      </div>

      <div className="mt-14 grid gap-4 lg:grid-cols-3">
        {packages.map((p, i) => (
          <FadeUp
            key={p.id}
            delay={i * 0.08}
            className={cn(
              "relative flex flex-col rounded-[26px] p-7 md:p-8",
              p.featured ? "pwom-featured text-black" : "border border-white/10 bg-white/[0.03]",
            )}
          >
            {p.featured && (
              <div className="absolute right-6 top-6 rounded-full bg-black px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white">
                Most booked
              </div>
            )}
            <h3 className="font-sans text-2xl tracking-[-0.03em]">{p.name}</h3>
            <p className={cn("mt-2 text-sm", p.featured ? "text-black/70" : "text-white/60")}>{p.blurb}</p>
            <div className="mt-8 font-sans text-5xl tracking-[-0.04em]">{p.price}</div>
            <ul className={cn("mt-8 space-y-3 text-sm", p.featured ? "text-black/80" : "text-white/75")}>
              {p.items.map((it) => (
                <li key={it} className="flex gap-3">
                  <span aria-hidden>_</span>
                  {it}
                </li>
              ))}
            </ul>
            <a
              href="#book"
              onClick={() => onPick(p.name)}
              className={cn(
                "mt-10 rounded-full px-5 py-3 text-center text-sm transition-colors",
                p.featured ? "bg-black text-white hover:bg-black/80" : "border border-white/20 hover:bg-white hover:text-black",
              )}
            >
              Enquire about {p.name}
            </a>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Track record + FAQ                                                  */
/* ------------------------------------------------------------------ */

function Proof() {
  return (
    <section className="px-5 py-24 md:px-10 md:py-32 bg-[#0d0d0f]">
      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-6">
          <Label>Where it&apos;s been</Label>
          <ol className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {appearances.map((a) => (
              <li key={a.where} className="grid grid-cols-[5rem_1fr] gap-4 py-6">
                <span className="font-mono text-sm text-white/50">{a.year}</span>
                <div>
                  <div className={cn("font-sans text-2xl md:text-3xl tracking-[-0.03em]", a.year === "Next" && "pwom-rainbow-text")}>
                    {a.where}
                  </div>
                  <div className="mt-1 text-sm text-white/55">{a.note}</div>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap gap-5 text-sm">
            <a href={PAINT.canvasUrl} target="_blank" rel="noopener" className="underline underline-offset-4 hover:text-white text-white/70">
              Try it in your browser
            </a>
            <a href={PAINT.mediumUrl} target="_blank" rel="noopener" className="underline underline-offset-4 hover:text-white text-white/70">
              Read the story on Medium
            </a>
            <Link href="/work/paint-with-our-minds" className="underline underline-offset-4 hover:text-white text-white/70">
              Project case study
            </Link>
          </div>
        </div>

        <div className="md:col-span-6">
          <Label>Questions</Label>
          <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg">
                  {f.q}
                  <span className="font-mono text-white/40 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-white/65 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Enquiry form                                                        */
/* ------------------------------------------------------------------ */

const FORMAT_OPTIONS = ["Projection", "Frame TV", "LED wall", "Not sure yet"];
const EXTRA_OPTIONS = extensions.map((x) => x.name);
const CROWD_OPTIONS = ["Under 50", "50 – 200", "200 – 1,000", "1,000+"];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

const inputCls =
  "w-full border-b border-white/20 bg-transparent py-3 text-lg text-white placeholder:text-white/30 outline-none focus:border-white transition-colors";

function Chips({
  options,
  value,
  onChange,
  multi,
}: {
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
  multi?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = value.includes(o);
        return (
          <button
            type="button"
            key={o}
            aria-pressed={on}
            onClick={() => onChange(multi ? (on ? value.filter((v) => v !== o) : [...value, o]) : on ? [] : [o])}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-colors",
              on ? "border-white bg-white text-black" : "border-white/20 text-white/80 hover:border-white/60",
            )}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

function Enquiry({ pkg, setPkg }: { pkg: string; setPkg: (v: string) => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [format, setFormat] = useState<string[]>([]);
  const [extras, setExtras] = useState<string[]>([]);
  const [crowd, setCrowd] = useState<string[]>([]);
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    const message = [
      `PAINT WITH OUR MINDS ENQUIRY`,
      `Organisation: ${org || "-"}`,
      `Event date: ${date || "-"}`,
      `Location: ${location || "-"}`,
      `Package: ${pkg || "-"}`,
      `Format: ${format.join(", ") || "-"}`,
      `Extensions: ${extras.join(", ") || "-"}`,
      `Crowd size: ${crowd.join(", ") || "-"}`,
      ``,
      details || "(no extra details)",
    ].join("\n");
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, source: "paint-with-our-minds" }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      sendGAEvent("event", "generate_lead", { source: "paint-with-our-minds", package: pkg });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="book" className="relative scroll-mt-16 overflow-hidden px-5 py-24 md:px-10 md:py-36">
      {/* Painted backdrop */}
      <video
        aria-hidden
        className="absolute inset-0 h-full w-full scale-125 object-cover opacity-30 blur-3xl"
        src={heroReels[3].video}
        poster={heroReels[3].poster}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#070708] via-black/60 to-[#070708]" />

      <div className="relative grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Label>Book it</Label>
          <h2 className="mt-5 font-sans text-5xl md:text-7xl leading-[0.9] tracking-[-0.05em]">
            Bring the painting to your event<span className="pwom-cursor">_</span>
          </h2>
          <p className="mt-6 max-w-md text-white/75 leading-relaxed">
            Tell me a little about it and I&apos;ll come back within a day with availability, a quote and a
            few ideas for making it yours.
          </p>
        </div>

        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {status === "sent" ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-[26px] border border-white/15 bg-black/50 p-10 backdrop-blur"
              >
                <div className="pwom-rainbow-text font-sans text-4xl tracking-[-0.04em]">Thanks, {name.split(" ")[0] || "friend"}.</div>
                <p className="mt-4 text-white/75">
                  Your enquiry is in. Keep an eye on {email}... I&apos;ll be in touch shortly.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={submit}
                className="grid gap-8 rounded-[26px] border border-white/15 bg-black/50 p-6 md:p-10 backdrop-blur"
              >
                <div className="grid gap-8 md:grid-cols-2">
                  <Field label="Your name">
                    <input required className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder="Alex Painter" autoComplete="name" />
                  </Field>
                  <Field label="Email">
                    <input required type="email" className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="alex@company.com" autoComplete="email" />
                  </Field>
                  <Field label="Organisation">
                    <input className={inputCls} value={org} onChange={(e) => setOrg(e.target.value)} placeholder="Company, school or venue" autoComplete="organization" />
                  </Field>
                  <Field label="Event date">
                    <input className={inputCls} value={date} onChange={(e) => setDate(e.target.value)} placeholder="e.g. 14 March or 'sometime in May'" />
                  </Field>
                  <Field label="Location">
                    <input className={inputCls} value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City / venue" />
                  </Field>
                  <Field label="Package">
                    <select className={cn(inputCls, "appearance-none")} value={pkg} onChange={(e) => setPkg(e.target.value)}>
                      <option value="" className="bg-black">Not sure yet</option>
                      {packages.map((p) => (
                        <option key={p.id} value={p.name} className="bg-black">
                          {p.name} ({p.price})
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">Format</span>
                  <div className="mt-3"><Chips options={FORMAT_OPTIONS} value={format} onChange={setFormat} /></div>
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">Extensions</span>
                  <div className="mt-3"><Chips options={EXTRA_OPTIONS} value={extras} onChange={setExtras} multi /></div>
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">Crowd size</span>
                  <div className="mt-3"><Chips options={CROWD_OPTIONS} value={crowd} onChange={setCrowd} /></div>
                </div>

                <Field label="Anything else?">
                  <textarea
                    rows={3}
                    className={cn(inputCls, "resize-none")}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="The vibe, the audience, what you'd love people to walk away with..."
                  />
                </Field>

                <div className="flex flex-wrap items-center gap-5">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="pwom-rainbow-btn rounded-full px-8 py-4 text-sm font-medium text-black disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending..." : "Send enquiry"}
                  </button>
                  {status === "error" && (
                    <p className="text-sm text-[#ff8a8a]">
                      Something went wrong. Try again, or email me directly.
                    </p>
                  )}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function PaintLanding() {
  const [pkg, setPkg] = useState("");
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#070708] text-white font-sans selection:bg-white selection:text-black">
        <Header />
        <main>
          <Hero />
          <Ticker />
          <HowItWorks />
          <Stories />
          <MadeFor />
          <Formats />
          <Packages onPick={setPkg} />
          <Proof />
          <Enquiry pkg={pkg} setPkg={setPkg} />
        </main>
        <SiteFooter />
      </div>
    </MotionConfig>
  );
}
