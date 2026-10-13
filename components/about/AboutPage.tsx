"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, MotionConfig } from "motion/react";
import Header from "@/components/Header";
import SiteFooter from "@/components/services/SiteFooter";
import HeroArt from "@/components/services/HeroArt";
import { SplitHeadline, Reveal, Marquee, Magnetic, Eyebrow, EASE_OUT } from "@/components/services/motion";
import { CLIENTS, STATS } from "@/components/services/ServicePage";
import { ABOUT_FAQS } from "@/data/about";

const ROLES = [
  {
    where: "VML & Wunderman Thompson",
    what: "Digital design and development for global brands, including the Brisbane 2032 Olympic website, the Wendy's Australia launch and HBF's digital transformation.",
    href: "/work/olympics-brisbane-2032",
  },
  {
    where: "IOOKI Labs",
    what: "Creative developer and designer at a creative technology lab building voice AI, computer vision and agentic products. A UN/ITU AI for Good finalist.",
    href: "/work/iooki-labs",
  },
  {
    where: "Independent",
    what: "Websites, brands and apps for Perth businesses and founders, from wineries and bars to apps like Hunter Markets. I'm also one of the co-founders of LookSee, an AI interior visualiser.",
    href: "/work",
  },
];

const DOES = [
  { t: "Web design", href: "/services/web-design" },
  { t: "Web development", href: "/services/web-development" },
  { t: "App design", href: "/services/app-design" },
  { t: "App development", href: "/services/app-development" },
  { t: "Branding", href: "/services/brand" },
  { t: "UI/UX design", href: "/services/ui-ux" },
  { t: "SEO", href: "/services/seo" },
  { t: "AI search (GEO)", href: "/services/geo" },
  { t: "AI development", href: "/services/ai-development" },
];

export default function AboutPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <MotionConfig reducedMotion="user">
      <div className="grain min-h-screen bg-tw-white text-tw-black font-object-regular selection:bg-tw-black selection:text-tw-white">
        <Header />

        <main>
          {/* ---------------- HERO ---------------- */}
          <section className="relative isolate overflow-hidden md:min-h-[90svh] px-5 md:px-10 pt-10 md:pt-40 pb-20 flex flex-col">
            <div className="absolute inset-0 -z-10 rise" style={{ animationDelay: "0.3s" }}>
              <HeroArt
                art="field"
                className="w-full h-full mix-blend-multiply opacity-50 md:opacity-100 [mask-image:linear-gradient(to_top,black_30%,transparent_95%)] md:[mask-image:linear-gradient(to_right,transparent_10%,rgba(0,0,0,0.35)_42%,black_68%)]"
              />
            </div>
            <div className="rise inline-flex self-start items-center gap-2.5 rounded-full border border-tw-black/20 px-4 py-2 text-xs font-object-bold uppercase tracking-wider" style={{ animationDelay: "0.1s" }}>
              About · Perth WA
            </div>
            <SplitHeadline
              as="h1"
              text="Hi, I'm Travis. I design and build digital things."
              className="mt-8 font-object-heavy text-[13vw] md:text-[8vw] lg:text-[6.6vw] leading-[0.9] tracking-[-0.05em] max-w-[13ch]"
              delay={0.15}
              onLoad
            />
            <div className="rise mt-10 max-w-xl" style={{ animationDelay: "0.8s" }}>
              <p className="text-xl md:text-2xl leading-snug">
                Travis Weerts, a designer, developer and creative consultant in Perth, Western Australia.
                travis.work is my one-person design and development studio for websites, apps, brands
                and AI products.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Magnetic>
                  <Link href="/contact" className="group rounded-full bg-tw-black text-tw-white pl-7 pr-3 py-3 font-object-bold inline-flex items-center gap-4">
                    Say hello
                    <span className="w-10 h-10 rounded-full bg-tw-accent text-tw-black flex items-center justify-center transition-transform duration-500 group-hover:rotate-[-45deg]">→</span>
                  </Link>
                </Magnetic>
                <Link href="/work" className="rounded-full border border-tw-black/25 px-6 py-4 text-sm font-object-bold hover:bg-tw-black hover:text-tw-white transition-colors duration-300">
                  See the work
                </Link>
              </div>
            </div>
          </section>

          <section className="bg-tw-black text-tw-white py-6 -rotate-1 scale-[1.02]" aria-label="Clients and recognition">
            <Marquee items={CLIENTS} className="font-object-bold text-2xl md:text-4xl tracking-[-0.03em]" />
          </section>

          {/* ---------------- STORY ---------------- */}
          <section className="px-5 md:px-10 py-28 md:py-40">
            <div className="grid lg:grid-cols-12 gap-10 items-start">
              <Reveal className="lg:col-span-4">
                <div className="relative w-56 md:w-72 aspect-[3/4] rounded-[24px] overflow-hidden rotate-[-3deg] shadow-xl">
                  <Image src="/assets/media/trav_bio.jpg" alt="Travis Weerts, designer and developer in Perth" fill sizes="288px" className="object-cover" priority />
                </div>
              </Reveal>
              <div className="lg:col-span-8">
                <Eyebrow index="01">The short version</Eyebrow>
                <Reveal>
                  <h2 className="mt-8 font-object-bold text-3xl md:text-5xl leading-[1.1] tracking-[-0.03em]">
                    For more than 20 years I&apos;ve been designing and building apps, websites and
                    brands, for startups, bands, local venues and the occasional global name.
                  </h2>
                </Reveal>
                <Reveal delay={0.1}>
                  <div className="mt-8 space-y-6 text-lg leading-relaxed text-tw-black/70 max-w-2xl">
                    <p>
                      Along the way I&apos;ve worked on projects for Google, the United Nations, the
                      Australian Open and the Brisbane 2032 Olympics. Some of the work has been featured
                      by Apple and recognised at Cannes Lions, D&amp;AD, Spike, The One Show and AWARD.
                    </p>
                    <p>
                      I&apos;ve worked with teams like VML and Wunderman Thompson, helping brands such as
                      Wendy&apos;s, KitKat, HBF and Heinz turn ideas into things people can actually use.
                      These days I split my time between IOOKI Labs and independent work with Perth
                      businesses and founders.
                    </p>
                    <p>
                      I&apos;m most comfortable in the early, messy stages where things aren&apos;t fully
                      defined yet. If you&apos;ve got something in your head that&apos;s been hard to turn
                      into something real, that&apos;s usually where I&apos;m most useful.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* ---------------- STATS ---------------- */}
          <section className="px-5 md:px-10 pb-28 md:pb-40">
            <ul className="grid md:grid-cols-4 gap-px bg-tw-black/15 border border-tw-black/15 rounded-[28px] overflow-hidden">
              {STATS.map((s, i) => (
                <Reveal as="li" key={s.label} delay={i * 0.08} className="bg-tw-white p-8">
                  <div className="font-object-heavy text-5xl md:text-6xl tracking-[-0.05em]">{s.value}</div>
                  <p className="mt-3 text-sm leading-snug text-tw-black/65">{s.label}</p>
                </Reveal>
              ))}
            </ul>
          </section>

          {/* ---------------- WHERE ---------------- */}
          <section className="px-5 md:px-10 py-28 md:py-40 bg-tw-paper">
            <Eyebrow index="02">Where I&apos;ve been</Eyebrow>
            <h2 className="mt-6 font-object-heavy text-5xl md:text-7xl tracking-[-0.04em] leading-[0.95] max-w-4xl">
              Big agencies, an AI lab and a lot of local work.
            </h2>
            <ol className="mt-14 border-t border-tw-black/20">
              {ROLES.map((r, i) => (
                <Reveal as="li" key={r.where} delay={i * 0.08} className="border-b border-tw-black/20">
                  <Link href={r.href} className="group grid md:grid-cols-12 gap-4 py-8 md:py-10 items-baseline">
                    <span className="md:col-span-1 font-mono text-sm opacity-50">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="md:col-span-4 font-object-heavy text-3xl md:text-4xl tracking-[-0.04em] transition-transform duration-500 group-hover:translate-x-2">{r.where}</h3>
                    <p className="md:col-span-6 text-base leading-relaxed text-tw-black/70">{r.what}</p>
                    <span className="hidden md:flex md:col-span-1 justify-end">
                      <span className="w-10 h-10 rounded-full border border-tw-black/30 flex items-center justify-center transition-all duration-500 group-hover:bg-tw-black group-hover:text-tw-white group-hover:rotate-[-45deg]">→</span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ol>
          </section>

          {/* ---------------- WHAT I DO ---------------- */}
          <section className="px-5 md:px-10 py-28 md:py-40">
            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5">
                <Eyebrow index="03">What I do</Eyebrow>
                <h2 className="mt-6 font-object-heavy text-5xl md:text-6xl tracking-[-0.04em] leading-[0.95]">
                  One person, idea to launch.
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-tw-black/70 max-w-md">
                  Because I design and build, nothing gets lost in a hand-off. I&apos;m a Perth Hills local
                  and on the committee of the Darlington Arts Festival, so I care about local work as
                  much as the big stuff.
                </p>
              </div>
              <ul className="lg:col-span-7 flex flex-wrap content-start gap-3">
                {DOES.map((d, i) => (
                  <Reveal as="li" key={d.t} delay={i * 0.04} y={12}>
                    <Link href={d.href} className="inline-flex items-center gap-2 rounded-full border border-tw-black/25 px-5 py-3 font-object-bold hover:bg-tw-black hover:text-tw-white transition-colors duration-300">
                      {d.t} <span aria-hidden>→</span>
                    </Link>
                  </Reveal>
                ))}
              </ul>
            </div>
          </section>

          {/* ---------------- FAQ ---------------- */}
          <section className="px-5 md:px-10 pb-28 md:pb-40">
            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <Eyebrow index="04">Quick answers</Eyebrow>
                <h2 className="mt-6 font-object-heavy text-5xl md:text-6xl tracking-[-0.04em] leading-[0.95]">The usual questions.</h2>
              </div>
              <ul className="lg:col-span-8 border-t border-tw-black/15">
                {ABOUT_FAQS.map((f, i) => {
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
            <SplitHeadline as="h2" text="Got something you want to make real?" className="font-object-heavy text-[11vw] md:text-[7vw] leading-[0.9] tracking-[-0.05em] max-w-[14ch]" />
            <div className="mt-12 flex flex-col md:flex-row md:items-center gap-8">
              <Magnetic strength={0.4}>
                <Link href="/contact" className="w-44 h-44 md:w-52 md:h-52 rounded-full bg-tw-accent text-tw-black font-object-bold text-lg flex items-center justify-center text-center leading-tight hover:bg-tw-white transition-colors duration-300">
                  Let&apos;s talk →
                </Link>
              </Magnetic>
              <p className="max-w-md text-tw-white/70 leading-relaxed">
                Tell me a little about your business or idea. I&apos;ll reply personally within one business
                day with honest thoughts and a next step.
              </p>
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
    </MotionConfig>
  );
}
