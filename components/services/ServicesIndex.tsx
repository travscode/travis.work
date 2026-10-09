"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  MotionConfig,
} from "motion/react";
import Header from "@/components/Header";
import SiteFooter from "@/components/services/SiteFooter";
import {
  SplitHeadline,
  Reveal,
  ScrollText,
  Marquee,
  Magnetic,
  Eyebrow,
  EASE_OUT,
} from "@/components/services/motion";
import { CLIENTS, STATS } from "@/components/services/ServicePage";

interface ServiceSummary {
  slug: string;
  title: string;
  tag: string;
  image: string;
  subheadline: string;
  price: string;
  timeline: string;
  features: string[];
}

export default function ServicesIndex({
  services,
  platforms = [],
}: {
  services: ServiceSummary[];
  platforms?: ServiceSummary[];
}) {
  const router = useRouter();
  const [hovered, setHovered] = useState<number | null>(null);

  // Floating preview that follows the cursor across the list
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 150, damping: 20, mass: 0.5 });
  const y = useSpring(my, { stiffness: 150, damping: 20, mass: 0.5 });

  return (
    <MotionConfig reducedMotion="user">
      <div className="grain min-h-screen bg-tw-white text-tw-black font-object-regular selection:bg-tw-black selection:text-tw-white">
        <Header variant="light" />

        <main>
          {/* ---------------- HERO ---------------- */}
          <section className="px-5 md:px-10 pt-10 md:pt-44 pb-20">
            <nav aria-label="Breadcrumb" className="text-xs text-tw-black/60">
              <Link href="/" className="hover:text-tw-black">
                Home
              </Link>{" "}
              / <span className="text-tw-black">Services</span>
            </nav>
            <div
              className="rise mt-10 inline-flex items-center gap-2.5 rounded-full border border-tw-black/20 px-4 py-2 text-xs font-object-bold uppercase tracking-wider"
              style={{ animationDelay: "0.1s" }}
            >
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-tw-accent animate-ping" />
                <span className="relative w-2 h-2 rounded-full bg-tw-accent" />
              </span>
              Taking on new projects
            </div>
            <SplitHeadline
              text="Design, development & AI services in Perth."
              className="mt-8 font-object-heavy text-[13vw] md:text-[8.5vw] leading-[0.88] tracking-[-0.05em] max-w-[16ch]"
              delay={0.15}
              onLoad
            />
            <div
              className="rise mt-12 grid md:grid-cols-12 gap-8"
              style={{ animationDelay: "0.7s" }}
            >
              <p className="md:col-span-6 lg:col-span-5 text-xl md:text-2xl leading-snug">
                One person, end to end. I&apos;m Travis — an award-winning
                designer and developer in the Perth Hills helping businesses
                go from “idea in your head” to something real people use.{" "}
                <Link href="/start" className="underline underline-offset-4 decoration-tw-black/30 hover:decoration-tw-black">
                  Small business or indie founder? Start here.
                </Link>
              </p>
              <div className="md:col-span-6 lg:col-span-4 lg:col-start-9 flex md:justify-end items-end gap-4">
                <Magnetic>
                  <button
                    onClick={() => router.push("/contact")}
                    className="group rounded-full bg-tw-black text-tw-white pl-7 pr-3 py-3 font-object-bold inline-flex items-center gap-4 cursor-pointer"
                  >
                    Start a project
                    <span className="w-10 h-10 rounded-full bg-tw-accent text-tw-black flex items-center justify-center transition-transform duration-500 group-hover:rotate-[-45deg]">
                      →
                    </span>
                  </button>
                </Magnetic>
              </div>
            </div>
          </section>

          <section
            aria-label="Clients and awards"
            className="bg-tw-black text-tw-white py-6 -rotate-1 scale-[1.02]"
          >
            <Marquee
              items={CLIENTS}
              className="font-object-bold text-2xl md:text-4xl tracking-[-0.03em]"
            />
          </section>

          {/* ---------------- SERVICE LIST ---------------- */}
          <section
            className="relative px-5 md:px-10 py-28 md:py-40"
            onMouseMove={(e) => {
              mx.set(e.clientX);
              my.set(e.clientY);
            }}
          >
            <div className="flex items-end justify-between mb-10">
              <Eyebrow index="01">Services</Eyebrow>
              <span className="font-mono text-xs uppercase tracking-[0.18em] opacity-50">
                {String(services.length).padStart(2, "0")} disciplines
              </span>
            </div>

            <ul
              className="border-t border-tw-black"
              onMouseLeave={() => setHovered(null)}
            >
              {services.map((s, i) => (
                <Reveal as="li" key={s.slug} delay={i * 0.04} y={20}>
                  <Link
                    href={`/services/${s.slug}`}
                    onMouseEnter={() => setHovered(i)}
                    className="group relative grid grid-cols-12 items-center gap-4 py-7 md:py-9 border-b border-tw-black/20"
                  >
                    <span className="col-span-2 md:col-span-1 font-mono text-sm opacity-50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="col-span-10 md:col-span-6">
                      <h2 className="font-object-heavy text-4xl md:text-6xl lg:text-7xl tracking-[-0.045em] leading-none transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-6">
                        {s.tag}
                      </h2>
                      <p className="mt-3 text-sm text-tw-black/60 md:hidden">
                        {s.subheadline}
                      </p>
                    </div>
                    <p className="hidden md:block md:col-span-3 text-sm leading-snug text-tw-black/65 transition-colors group-hover:text-tw-black">
                      {s.subheadline}
                    </p>
                    <div className="hidden md:flex md:col-span-2 items-center justify-end gap-4">
                      <span className="text-sm font-object-bold whitespace-nowrap">
                        {s.price}
                      </span>
                      <span className="w-12 h-12 shrink-0 rounded-full border border-tw-black/30 flex items-center justify-center transition-all duration-500 group-hover:bg-tw-black group-hover:text-tw-white group-hover:rotate-[-45deg]">
                        →
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </ul>

            {/* Cursor-following preview card */}
            <motion.div
              className="pointer-events-none fixed top-0 left-0 z-40 hidden lg:block"
              style={{ x, y }}
            >
              <AnimatePresence>
                {hovered !== null && (
                  <motion.div
                    key="preview"
                    className="relative -translate-x-1/2 -translate-y-1/2 w-72 aspect-square rounded-[24px] overflow-hidden shadow-2xl"
                    initial={{ scale: 0.4, opacity: 0, rotate: -8 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0.4, opacity: 0, rotate: 8 }}
                    transition={{ duration: 0.45, ease: EASE_OUT }}
                  >
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.div
                        key={hovered}
                        className="absolute inset-0"
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "-100%" }}
                        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                      >
                        <Image
                          src={`/assets/media/${services[hovered].image}`}
                          alt=""
                          fill
                          sizes="288px"
                          className="object-cover"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </section>

          {/* ---------------- PLATFORMS ---------------- */}
          {platforms.length > 0 && (
            <section className="px-5 md:px-10 pb-28 md:pb-40">
              <div className="grid lg:grid-cols-12 gap-8 mb-12">
                <div className="lg:col-span-5">
                  <Eyebrow index="02">Platforms</Eyebrow>
                  <h2 className="mt-6 font-object-heavy text-5xl md:text-6xl tracking-[-0.04em] leading-[0.95]">
                    Already on a platform? I build on all the big ones.
                  </h2>
                </div>
                <p className="lg:col-span-5 lg:col-start-8 self-end text-lg leading-snug text-tw-black/70">
                  New store, redesign, speed fix or a move between platforms. Same
                  care, whichever tool suits your business best.
                </p>
              </div>
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-tw-black/15 border border-tw-black/15 rounded-[28px] overflow-hidden">
                {platforms.map((p, i) => (
                  <Reveal as="li" key={p.slug} delay={i * 0.05} y={16} className="bg-tw-white">
                    <Link
                      href={`/services/${p.slug}`}
                      className="group relative flex flex-col h-full min-h-[15rem] p-7 md:p-8 overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-tw-black origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                      <span className="relative flex items-start justify-between">
                        <span className="font-mono text-xs opacity-50 group-hover:text-tw-white transition-colors">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="w-10 h-10 rounded-full border border-current flex items-center justify-center group-hover:text-tw-white group-hover:rotate-[-45deg] transition-all duration-500">
                          →
                        </span>
                      </span>
                      <h3 className="relative mt-auto pt-10 font-object-heavy text-4xl md:text-5xl tracking-[-0.045em] group-hover:text-tw-white transition-colors duration-500">
                        {p.tag}
                      </h3>
                      <p className="relative mt-3 text-sm leading-snug text-tw-black/65 group-hover:text-tw-white/70 transition-colors duration-500">
                        {p.subheadline}
                      </p>
                      <span className="relative mt-4 text-xs font-object-bold group-hover:text-tw-accent transition-colors duration-500">
                        {p.price}
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </ul>
            </section>
          )}

          {/* ---------------- ABOUT ---------------- */}
          <section className="px-5 md:px-10 pb-28 md:pb-40">
            <div className="grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-3">
                <Eyebrow index={platforms.length ? "03" : "02"}>Who you&apos;ll work with</Eyebrow>
                <Reveal className="mt-10">
                  <div className="relative w-48 aspect-[3/4] rounded-2xl overflow-hidden rotate-[-3deg] shadow-xl">
                    <Image
                      src="/assets/media/trav_bio.jpg"
                      alt="Travis Weerts, web designer and developer in Perth"
                      fill
                      sizes="192px"
                      className="object-cover"
                    />
                  </div>
                </Reveal>
              </div>
              <div className="lg:col-span-9">
                <ScrollText
                  text="No account managers. No juniors. No mystery. When you hire me, you get the same person from the first coffee to launch day — someone who's designed for Google and the UN, built apps featured by Apple, and still gets excited about a local business's first website."
                  className="font-object-bold text-3xl md:text-5xl lg:text-[3.4vw] leading-[1.1] tracking-[-0.03em]"
                />
                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-tw-black/15 border border-tw-black/15 rounded-3xl overflow-hidden">
                  {STATS.map((s, i) => (
                    <Reveal
                      key={s.label}
                      delay={i * 0.08}
                      className="bg-tw-white p-6 md:p-8"
                    >
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

          {/* ---------------- CTA ---------------- */}
          <section className="bg-tw-black text-tw-white px-5 md:px-10 py-28 md:py-40 rounded-t-[48px]">
            <SplitHeadline
              as="h2"
              text="Not sure which one you need? That's what the first chat is for."
              className="font-object-heavy text-[10vw] md:text-[6.5vw] leading-[0.92] tracking-[-0.05em] max-w-[18ch]"
            />
            <div className="mt-14 flex flex-col md:flex-row md:items-center gap-8">
              <Magnetic strength={0.4}>
                <button
                  onClick={() => router.push("/contact")}
                  className="w-44 h-44 md:w-52 md:h-52 rounded-full bg-tw-accent text-tw-black font-object-bold text-lg flex items-center justify-center text-center leading-tight hover:bg-tw-white transition-colors duration-300 cursor-pointer"
                >
                  Book a free
                  <br />
                  30 min chat →
                </button>
              </Magnetic>
              <p className="max-w-md text-tw-white/70 leading-relaxed">
                Based in Perth and working with businesses across
                Perth, WA, Australia and beyond. Happy to meet in person in the
                Hills or over video.
              </p>
            </div>
          </section>
        </main>

        <SiteFooter />

      </div>
    </MotionConfig>
  );
}
