"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, MotionConfig } from "motion/react";
import Header from "@/components/Header";
import SiteFooter from "@/components/services/SiteFooter";
import HeroArt from "@/components/services/HeroArt";
import { SplitHeadline, Reveal, Marquee, Magnetic, Eyebrow, EASE_OUT } from "@/components/services/motion";
import { CLIENTS } from "@/components/services/ServicePage";
import { cn } from "@/lib/utils";
import { START_FAQS } from "@/data/start";



const OFFERS = [
  {
    no: "01",
    title: "Get online",
    line: "A fast, good-looking website that brings in enquiries.",
    price: "Websites from $1,500",
    href: "/services/web-design",
    points: ["Designed around your customers", "Mobile-first and fast", "Set up for Google from day one"],
    tone: "bg-tw-paper",
  },
  {
    no: "02",
    title: "Look the part",
    line: "A logo and brand that makes you look as good as you are.",
    price: "Brands from $1,200",
    href: "/services/brand",
    points: ["Logo and visual identity", "Colours, type and simple guidelines", "Ready for signage, socials and print"],
    tone: "bg-tw-black text-tw-white",
  },
  {
    no: "03",
    title: "Get found",
    line: "Show up when locals search for what you do.",
    price: "SEO from $500/month",
    href: "/services/seo",
    points: ["Google Business Profile sorted", "Local SEO and search-ready pages", "Plain-English monthly updates"],
    tone: "bg-tw-paper",
  },
];

const STEPS = [
  { t: "Have a chat", d: "A free 30 minutes, in person in Perth or on a call. Tell me what you're trying to do. No prep, no jargon." },
  { t: "Get a plan and a fixed quote", d: "I'll suggest the leanest way to get you where you want to go, with a fixed price and the option to pay monthly." },
  { t: "Make it real", d: "We build it together in small steps, so you see progress every week and stay in control of the budget." },
];

const PROMISES = [
  "Fixed quotes, no surprises",
  "Monthly payment plans",
  "You own everything",
  "No lock-in contracts",
  "Straight talk, no jargon",
  "Work directly with me",
];

export default function StartPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <MotionConfig reducedMotion="user">
      <div className="grain min-h-screen bg-tw-white text-tw-black font-object-regular selection:bg-tw-black selection:text-tw-white">
        <Header />

        <main>
          {/* ---------------- HERO ---------------- */}
          <section className="relative isolate overflow-hidden md:min-h-[100svh] px-5 md:px-10 pt-10 md:pt-40 pb-20 flex flex-col">
            <div className="absolute inset-0 -z-10 rise" style={{ animationDelay: "0.3s" }}>
              <HeroArt
                art="mark"
                className="w-full h-full mix-blend-multiply opacity-50 md:opacity-100 [mask-image:linear-gradient(to_top,black_30%,transparent_95%)] md:[mask-image:linear-gradient(to_right,transparent_10%,rgba(0,0,0,0.35)_42%,black_68%)]"
              />
            </div>
            <div className="rise inline-flex self-start items-center gap-2.5 rounded-full border border-tw-black/20 px-4 py-2 text-xs font-object-bold uppercase tracking-wider" style={{ animationDelay: "0.1s" }}>
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-tw-accent animate-ping" />
                <span className="relative w-2 h-2 rounded-full bg-tw-accent" />
              </span>
              For small businesses & indie founders
            </div>
            <SplitHeadline
              text="Small business? Big idea? Let's just get started."
              className="mt-8 font-object-heavy text-[13vw] md:text-[8vw] lg:text-[6.6vw] leading-[0.9] tracking-[-0.05em] max-w-[13ch]"
              delay={0.15}
              onLoad
            />
            <div className="rise mt-10 max-w-xl" style={{ animationDelay: "0.8s" }}>
              <p className="text-xl md:text-2xl leading-snug">
                Award-winning design and development, without the agency price tag. Websites,
                brands and apps for Perth small businesses and startups, with fixed quotes
                and monthly payment plans.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Magnetic>
                  <Link href="/contact" className="group rounded-full bg-tw-black text-tw-white pl-7 pr-3 py-3 font-object-bold inline-flex items-center gap-4">
                    Book a free chat
                    <span className="w-10 h-10 rounded-full bg-tw-accent text-tw-black flex items-center justify-center transition-transform duration-500 group-hover:rotate-[-45deg]">→</span>
                  </Link>
                </Magnetic>
                <a href="#offers" className="rounded-full border border-tw-black/25 px-6 py-4 text-sm font-object-bold hover:bg-tw-black hover:text-tw-white transition-colors duration-300">
                  See where to start ↓
                </a>
              </div>
            </div>
          </section>

          {/* ---------------- REASSURANCE ---------------- */}
          <section className="bg-tw-black text-tw-white py-6 -rotate-1 scale-[1.02]" aria-label="Clients">
            <Marquee items={CLIENTS} className="font-object-bold text-2xl md:text-4xl tracking-[-0.03em]" />
          </section>

          <section className="px-5 md:px-10 py-28 md:py-40">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              <Reveal className="lg:col-span-4">
                <div className="relative w-56 md:w-64 aspect-[3/4] rounded-[24px] overflow-hidden rotate-[-3deg] shadow-xl">
                  <Image src="/assets/media/trav_bio.jpg" alt="Travis Weerts, web designer for small businesses in Perth" fill sizes="256px" className="object-cover" />
                </div>
              </Reveal>
              <div className="lg:col-span-8">
                <Eyebrow index="01">The honest bit</Eyebrow>
                <Reveal>
                  <p className="mt-8 font-object-bold text-3xl md:text-5xl leading-[1.1] tracking-[-0.03em]">
                    Yes, I&apos;ve designed for Google, the UN and the Olympics. But some of my favourite
                    work is for a local winery, a bar in an old bottle shop or a founder with nothing
                    but an idea and a lot of nerve.
                  </p>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="mt-8 text-lg leading-relaxed text-tw-black/70 max-w-2xl">
                    Big agencies charge for account managers, meetings and overheads. When you work
                    with me, you get the same craft without the layers. You talk to the person doing
                    the work, and every dollar goes into the thing you&apos;re building.
                  </p>
                </Reveal>
              </div>
            </div>
          </section>

          {/* ---------------- OFFERS ---------------- */}
          <section id="offers" className="px-5 md:px-10 pb-28 md:pb-40 scroll-mt-24">
            <Eyebrow index="02">Where most people start</Eyebrow>
            <h2 className="mt-6 font-object-heavy text-5xl md:text-7xl tracking-[-0.04em] leading-[0.95] max-w-4xl">
              Pick a starting point. We&apos;ll grow from there.
            </h2>
            <div className="mt-14 grid md:grid-cols-3 gap-4">
              {OFFERS.map((o, i) => (
                <Reveal key={o.no} delay={i * 0.1}>
                  <Link href={o.href} className={cn("group relative flex flex-col h-full min-h-[26rem] rounded-[28px] p-8 overflow-hidden", o.tone)}>
                    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.5, ease: EASE_OUT }} className="flex flex-col h-full">
                      <div className="flex justify-between items-start">
                        <span className="font-mono text-xs opacity-50">{o.no}</span>
                        <span className="w-10 h-10 rounded-full border border-current flex items-center justify-center transition-transform duration-500 group-hover:rotate-[-45deg]">→</span>
                      </div>
                      <h3 className="mt-14 font-object-heavy text-4xl md:text-5xl tracking-[-0.045em]">{o.title}</h3>
                      <p className="mt-3 text-base leading-snug opacity-75">{o.line}</p>
                      <ul className="mt-6 space-y-2 text-sm">
                        {o.points.map((p) => (
                          <li key={p} className="flex gap-3"><span className="text-tw-accent">●</span>{p}</li>
                        ))}
                      </ul>
                      <div className="mt-auto pt-8 font-object-bold">{o.price}</div>
                    </motion.div>
                  </Link>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2}>
              <p className="mt-8 text-tw-black/70">
                Got an app or AI idea? Those are scoped individually.{" "}
                <Link href="/contact" className="underline underline-offset-4 hover:text-tw-black">Start with a free chat</Link> and
                I&apos;ll help you work out the leanest first version.
              </p>
            </Reveal>
          </section>

          {/* ---------------- HOW IT WORKS ---------------- */}
          <section className="px-5 md:px-10 py-28 md:py-40 bg-tw-paper">
            <Eyebrow index="03">How it works</Eyebrow>
            <ol className="mt-12 grid md:grid-cols-3 gap-px bg-tw-black/15 border border-tw-black/15 rounded-[28px] overflow-hidden">
              {STEPS.map((s, i) => (
                <Reveal as="li" key={s.t} delay={i * 0.1} className="bg-tw-paper p-8 md:p-10">
                  <div className="font-object-thin text-7xl md:text-8xl tracking-[-0.06em]">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="mt-6 font-object-bold text-2xl md:text-3xl tracking-[-0.03em]">{s.t}</h3>
                  <p className="mt-3 text-base leading-relaxed text-tw-black/70">{s.d}</p>
                </Reveal>
              ))}
            </ol>
            <ul className="mt-12 flex flex-wrap gap-3">
              {PROMISES.map((p, i) => (
                <Reveal as="li" key={p} delay={i * 0.05} y={12}>
                  <span className="inline-flex items-center gap-2 rounded-full bg-tw-black text-tw-white px-5 py-3 text-sm font-object-bold">
                    <span className="text-tw-accent">✓</span> {p}
                  </span>
                </Reveal>
              ))}
            </ul>
          </section>

          {/* ---------------- FAQ ---------------- */}
          <section className="px-5 md:px-10 py-28 md:py-40">
            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <Eyebrow index="04">Questions</Eyebrow>
                <h2 className="mt-6 font-object-heavy text-5xl md:text-6xl tracking-[-0.04em] leading-[0.95]">The things people worry about.</h2>
              </div>
              <ul className="lg:col-span-8 border-t border-tw-black/15">
                {START_FAQS.map((f, i) => {
                  const isOpen = open === i;
                  return (
                    <li key={f.q} className="border-b border-tw-black/15">
                      <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} className="w-full flex items-start gap-6 py-6 text-left cursor-pointer">
                        <h3 className="flex-1 font-object-bold text-xl md:text-2xl tracking-[-0.02em]">{f.q}</h3>
                        <motion.span
                          className="w-9 h-9 shrink-0 rounded-full border border-tw-black/30 flex items-center justify-center text-lg"
                          animate={{ rotate: isOpen ? 45 : 0, backgroundColor: isOpen ? "#111111" : "rgba(17,17,17,0)", color: isOpen ? "#E0D3BD" : "#111111" }}
                        >
                          +
                        </motion.span>
                      </button>
                      <motion.div initial={false} animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }} transition={{ duration: 0.5, ease: EASE_OUT }} className="overflow-hidden">
                        <p className="pb-8 pr-14 text-lg leading-relaxed text-tw-black/75 max-w-3xl">{f.a}</p>
                      </motion.div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>

          {/* ---------------- CTA ---------------- */}
          <section className="bg-tw-black text-tw-white px-5 md:px-10 py-24 md:py-36 rounded-t-[48px]">
            <SplitHeadline as="h2" text="Thirty minutes. No cost. No pressure." className="font-object-heavy text-[11vw] md:text-[7vw] leading-[0.9] tracking-[-0.05em] max-w-[14ch]" />
            <div className="mt-12 flex flex-col md:flex-row md:items-center gap-8">
              <Magnetic strength={0.4}>
                <Link href="/contact" className="w-44 h-44 md:w-52 md:h-52 rounded-full bg-tw-accent text-tw-black font-object-bold text-lg flex items-center justify-center text-center leading-tight hover:bg-tw-white transition-colors duration-300">
                  Let&apos;s just<br />get started →
                </Link>
              </Magnetic>
              <p className="max-w-md text-tw-white/70 leading-relaxed">
                Tell me a little about your business or idea. I&apos;ll reply personally within one business
                day with honest thoughts and a next step, even if that next step isn&apos;t me.
              </p>
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
    </MotionConfig>
  );
}
