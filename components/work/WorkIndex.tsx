"use client";

import Link from "next/link";
import Image from "next/image";
import { MotionConfig } from "motion/react";
import Header from "@/components/Header";
import SiteFooter from "@/components/services/SiteFooter";
import { SplitHeadline, Reveal } from "@/components/services/motion";

interface WorkCard {
  slug: string;
  label: string;
  year: string;
  client?: string;
  services?: string;
  imageUrl: string;
  headline?: string;
}

export default function WorkIndex({ work }: { work: WorkCard[] }) {
  return (
    <MotionConfig reducedMotion="user">
      <div className="grain min-h-screen bg-tw-white text-tw-black font-object-regular">
        <Header />
        <main className="px-5 md:px-10 pt-10 md:pt-36 pb-28">
          <nav aria-label="Breadcrumb" className="text-xs text-tw-black/60">
            <Link href="/" className="hover:text-tw-black">Home</Link> / <span className="text-tw-black">Work</span>
          </nav>
          <SplitHeadline
            text="Big brands, brave startups and everything in between."
            className="mt-8 font-object-heavy text-[12vw] md:text-[7vw] leading-[0.9] tracking-[-0.05em] max-w-[16ch]"
            delay={0.15}
            onLoad
          />
          <ul className="mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-14">
            {work.map((w, i) => (
              <Reveal as="li" key={w.slug} delay={(i % 3) * 0.08}>
                <Link href={`/work/${w.slug}`} className="group block">
                  <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-tw-black/10">
                    <Image
                      src={w.imageUrl}
                      alt={`${w.label} by Travis Weerts`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 rounded-full bg-tw-white/90 backdrop-blur px-3 py-1 text-[11px] font-object-bold">
                      {w.year}
                    </span>
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-object-bold text-xl tracking-[-0.02em]">{w.label}</h2>
                      <p className="mt-1 text-sm text-tw-black/60 line-clamp-2">{w.headline || w.services}</p>
                    </div>
                    <span className="w-10 h-10 shrink-0 rounded-full border border-tw-black/25 flex items-center justify-center transition-all duration-500 group-hover:bg-tw-black group-hover:text-tw-white group-hover:rotate-[-45deg]">
                      →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </main>
        <SiteFooter />
      </div>
    </MotionConfig>
  );
}
