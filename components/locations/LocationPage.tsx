"use client";

import Link from "next/link";
import Image from "next/image";
import { MotionConfig } from "motion/react";
import Header from "@/components/Header";
import SiteFooter from "@/components/services/SiteFooter";
import HeroArt from "@/components/services/HeroArt";
import { SplitHeadline, Reveal, Eyebrow, Magnetic, Marquee } from "@/components/services/motion";

export interface LocationView {
  slug: string;
  name: string;
  short: string;
  group: string;
  h1: string;
  intro: string;
  context: string;
  suburbs: string[];
  inPerson: boolean;
  faqs: { q: string; a: string }[];
  cta?: string;
}

interface Card {
  href: string;
  title: string;
  line?: string;
  price?: string;
  image: string;
}

export default function LocationPage({
  location,
  services,
  work,
  nearby,
  kind = "location",
}: {
  location: LocationView;
  services: Card[];
  work: Card[];
  nearby: { slug: string; name: string }[];
  /** "industry" reuses this layout for niche pages, e.g. websites for tradies */
  kind?: "location" | "industry";
}) {
  const isIndustry = kind === "industry";
  const base = isIndustry ? "/industries" : "/locations";
  const steps = [
    { t: "A free chat", d: location.inPerson ? `Coffee in ${location.short} or a quick call, whichever suits you.` : "A relaxed video or phone call to talk through what you need." },
    { t: "A fixed quote", d: "A clear plan and price, with monthly payments available." },
    { t: "Build it together", d: "Weekly progress, direct contact with me, and a site you can run yourself." },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <div className="grain min-h-screen bg-tw-white text-tw-black font-object-regular selection:bg-tw-black selection:text-tw-white">
        <Header />
        <main>
          {/* ---------------- HERO ---------------- */}
          <section className="relative isolate overflow-hidden md:min-h-[92svh] px-5 md:px-10 pt-8 md:pt-36 pb-16 flex flex-col">
            <div className="absolute inset-0 -z-10 rise" style={{ animationDelay: "0.3s" }}>
              <HeroArt
                art="signal"
                className="w-full h-full mix-blend-multiply opacity-50 md:opacity-100 [mask-image:linear-gradient(to_top,black_30%,transparent_95%)] md:[mask-image:linear-gradient(to_right,transparent_10%,rgba(0,0,0,0.35)_40%,black_65%)]"
              />
            </div>
            <nav aria-label="Breadcrumb" className="text-xs">
              <ol className="flex items-center gap-2 text-tw-black/60">
                <li><Link href="/" className="hover:text-tw-black">Home</Link></li>
                <li aria-hidden>/</li>
                <li><Link href={base} className="hover:text-tw-black">{isIndustry ? "Industries" : "Areas"}</Link></li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="text-tw-black">{location.name}</li>
              </ol>
            </nav>
            <div className="mt-10 lg:mt-auto lg:mb-auto max-w-4xl">
              <div className="rise inline-flex items-center gap-2.5 rounded-full border border-tw-black/20 px-4 py-2 text-xs font-object-bold uppercase tracking-wider" style={{ animationDelay: "0.1s" }}>
                <span className="relative flex w-2 h-2">
                  <span className="absolute inset-0 rounded-full bg-tw-accent animate-ping" />
                  <span className="relative w-2 h-2 rounded-full bg-tw-accent" />
                </span>
                {isIndustry ? `For ${location.short}` : location.inPerson ? `Local to ${location.short}` : `Working with ${location.short}`}
              </div>
              <SplitHeadline
                text={location.h1}
                className="mt-8 font-object-heavy text-[12vw] md:text-[7vw] lg:text-[5.4vw] leading-[0.92] tracking-[-0.045em]"
                delay={0.2}
                onLoad
              />
              <div className="rise" style={{ animationDelay: "0.7s" }}>
                <p className="mt-8 text-lg md:text-xl leading-snug max-w-2xl">{location.intro}</p>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Magnetic>
                    <Link href="/contact" className="group rounded-full bg-tw-black text-tw-white pl-7 pr-3 py-3 font-object-bold inline-flex items-center gap-4">
                      Book a free chat
                      <span className="w-10 h-10 rounded-full bg-tw-accent text-tw-black flex items-center justify-center transition-transform duration-500 group-hover:rotate-[-45deg]">→</span>
                    </Link>
                  </Magnetic>
                  <Link href="/start" className="rounded-full border border-tw-black/25 px-6 py-4 text-sm font-object-bold hover:bg-tw-black hover:text-tw-white transition-colors duration-300">
                    Small business? Start here
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* ---------------- SUBURBS ---------------- */}
          <section aria-label={isIndustry ? `What ${location.short} need` : `Suburbs covered in ${location.name}`} className="bg-tw-black text-tw-white py-6 -rotate-1 scale-[1.02]">
            <Marquee items={location.suburbs} className="font-object-bold text-2xl md:text-4xl tracking-[-0.03em]" speed={45} />
          </section>

          {/* ---------------- CONTEXT ---------------- */}
          <section className="px-5 md:px-10 py-24 md:py-36">
            <div className="grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-3">
                <Eyebrow index="01">Why me</Eyebrow>
              </div>
              <div className="lg:col-span-9">
                <Reveal>
                  <p className="font-object-bold text-3xl md:text-5xl leading-[1.1] tracking-[-0.03em]">{location.context}</p>
                </Reveal>
                <Reveal delay={0.1}>
                  <div className="mt-12">
                    <h2 className="font-mono text-xs uppercase tracking-[0.18em] opacity-50">{isIndustry ? "What every site includes" : `Areas I cover around ${location.short}`}</h2>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {location.suburbs.map((s) => (
                        <li key={s} className="rounded-full border border-tw-black/20 px-4 py-2 text-sm">{s}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* ---------------- SERVICES ---------------- */}
          <section className="px-5 md:px-10 pb-24 md:pb-36">
            <Eyebrow index="02">{isIndustry ? `Services for ${location.short}` : `What I can do for ${location.short} businesses`}</Eyebrow>
            <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {services.map((s, i) => (
                <Reveal as="li" key={s.href} delay={i * 0.08}>
                  <Link href={s.href} className="group block h-full rounded-[24px] bg-tw-paper border border-tw-black/10 overflow-hidden">
                    <div className="relative aspect-square overflow-hidden">
                      <Image src={s.image} alt="" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
                    </div>
                    <div className="p-6">
                      <h3 className="font-object-heavy text-2xl tracking-[-0.035em]">{s.title}</h3>
                      <p className="mt-2 text-sm leading-snug text-tw-black/65">{s.line}</p>
                      <div className="mt-4 flex items-center justify-between text-sm font-object-bold">
                        <span>{s.price}</span>
                        <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </section>

          {/* ---------------- WORK ---------------- */}
          {work.length > 0 && (
            <section className="px-5 md:px-10 py-24 md:py-36 bg-tw-paper">
              <Eyebrow index="03">Relevant work</Eyebrow>
              <h2 className="mt-6 font-object-heavy text-5xl md:text-6xl tracking-[-0.04em] leading-[0.95] max-w-3xl">Close to home, and further afield.</h2>
              <ul className="mt-12 grid md:grid-cols-3 gap-5">
                {work.map((w, i) => (
                  <Reveal as="li" key={w.href} delay={i * 0.1}>
                    <Link href={w.href} className="group block">
                      <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-tw-black/10">
                        <Image src={w.image} alt={`${w.title} by Travis Weerts`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
                      </div>
                      <h3 className="mt-4 font-object-bold text-xl tracking-[-0.02em]">{w.title}</h3>
                      {w.line && <p className="mt-1 text-sm text-tw-black/60">{w.line}</p>}
                    </Link>
                  </Reveal>
                ))}
              </ul>
            </section>
          )}

          {/* ---------------- HOW ---------------- */}
          <section className="px-5 md:px-10 py-24 md:py-36">
            <Eyebrow index="04">How we&apos;d work together</Eyebrow>
            <ol className="mt-12 grid md:grid-cols-3 gap-px bg-tw-black/15 border border-tw-black/15 rounded-[28px] overflow-hidden">
              {steps.map((s, i) => (
                <Reveal as="li" key={s.t} delay={i * 0.1} className="bg-tw-white p-8 md:p-10">
                  <div className="font-object-thin text-7xl tracking-[-0.06em]">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="mt-6 font-object-bold text-2xl tracking-[-0.03em]">{s.t}</h3>
                  <p className="mt-3 text-base leading-relaxed text-tw-black/70">{s.d}</p>
                </Reveal>
              ))}
            </ol>
          </section>

          {/* ---------------- FAQ ---------------- */}
          <section className="px-5 md:px-10 pb-24 md:pb-36">
            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <Eyebrow index="05">Questions</Eyebrow>
                <h2 className="mt-6 font-object-heavy text-4xl md:text-5xl tracking-[-0.04em] leading-[0.95]">
                  {isIndustry ? `Websites for ${location.short}` : `Working with a designer in ${location.short}`}
                </h2>
              </div>
              <dl className="lg:col-span-8 border-t border-tw-black/15">
                {location.faqs.map((f) => (
                  <div key={f.q} className="py-7 border-b border-tw-black/15">
                    <dt className="font-object-bold text-xl md:text-2xl tracking-[-0.02em]">{f.q}</dt>
                    <dd className="mt-3 text-lg leading-relaxed text-tw-black/75 max-w-3xl">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          {/* ---------------- NEARBY ---------------- */}
          {nearby.length > 0 && (
            <section className="px-5 md:px-10 pb-24">
              <div className="font-mono text-xs uppercase tracking-[0.18em] opacity-50">{isIndustry ? "Other industries" : "Other areas I work in"}</div>
              <ul className="mt-5 flex flex-wrap gap-3">
                {nearby.map((n) => (
                  <li key={n.slug}>
                    <Link href={`${base}/${n.slug}`} className="inline-block rounded-full border border-tw-black px-5 py-2.5 text-sm font-object-bold hover:bg-tw-black hover:text-tw-white transition-colors">
                      {n.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* ---------------- CTA ---------------- */}
          <section className="bg-tw-black text-tw-white px-5 md:px-10 py-24 md:py-36 rounded-t-[48px]">
            <SplitHeadline as="h2" text={location.cta || `Let's make something great in ${location.short}.`} className="font-object-heavy text-[11vw] md:text-[7vw] leading-[0.9] tracking-[-0.05em] max-w-[14ch]" />
            <div className="mt-12 flex flex-col md:flex-row md:items-center gap-8">
              <Magnetic strength={0.4}>
                <Link href="/contact" className="w-44 h-44 md:w-52 md:h-52 rounded-full bg-tw-accent text-tw-black font-object-bold text-lg flex items-center justify-center text-center leading-tight hover:bg-tw-white transition-colors duration-300">
                  Start a<br />project →
                </Link>
              </Magnetic>
              <p className="max-w-md text-tw-white/70 leading-relaxed">
                Free 30-minute chat, fixed quote, monthly payments available. I reply to every message personally within one business day.
              </p>
            </div>
          </section>
        </main>
        <SiteFooter />
      </div>
    </MotionConfig>
  );
}
