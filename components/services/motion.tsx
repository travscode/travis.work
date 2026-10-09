"use client";

import { Fragment, ReactNode, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_SLIDE = [0.76, 0, 0.24, 1] as const;

/** Headline whose words rise out of a mask, one after another. */
export function SplitHeadline({
  text,
  as = "h1",
  className,
  delay = 0,
  stagger = 0.06,
  onLoad = false,
}: {
  text: string;
  as?: "h1" | "h2" | "p";
  className?: string;
  delay?: number;
  stagger?: number;
  /** Animate with CSS on first paint (no JS needed) — use above the fold */
  onLoad?: boolean;
}) {
  const words = text.split(" ");

  if (onLoad) {
    const Plain = as;
    return (
      <Plain className={className}>
        {words.map((word, i) => (
          <Fragment key={i}>
            <span className="inline-block overflow-hidden align-bottom pt-[0.05em] -mt-[0.05em] pb-[0.22em] -mb-[0.22em] px-[0.08em] -mx-[0.08em]">
              <span
                className="inline-block word-rise"
                style={{ animationDelay: `${delay + i * stagger}s` }}
              >
                {word}
              </span>
            </span>
            {i < words.length - 1 && " "}
          </Fragment>
        ))}
      </Plain>
    );
  }

  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="inline-block overflow-hidden align-bottom pt-[0.05em] -mt-[0.05em] pb-[0.22em] -mb-[0.22em] px-[0.08em] -mx-[0.08em]">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "105%", rotate: 4 },
                show: {
                  y: "0%",
                  rotate: 0,
                  transition: { duration: 1, ease: EASE_OUT },
                },
              }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </Tag>
  );
}

/** Fade + lift into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "section" | "p";
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE_OUT }}
    >
      {children}
    </Tag>
  );
}

function ScrollWord({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {word}{" "}
    </motion.span>
  );
}

/** Paragraph that "reads itself" — each word lights up as you scroll past. */
export function ScrollText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <ScrollWord
          key={i}
          word={word}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
        />
      ))}
    </p>
  );
}

/** Endless horizontal ticker. */
export function Marquee({
  items,
  className,
  speed = 40,
}: {
  items: string[];
  className?: string;
  speed?: number;
}) {
  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="px-8 whitespace-nowrap">{item}</span>
          <span aria-hidden className="text-tw-accent">
            ✳
          </span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={cn("overflow-hidden flex", className)}>
      <div
        className="flex marquee-track"
        style={{ animationDuration: `${speed}s` }}
      >
        {row}
        <div aria-hidden className="flex">
          {row}
        </div>
      </div>
    </div>
  );
}

/** Button that leans toward the cursor. */
export function Magnetic({
  children,
  className,
  strength = 0.35,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** Text running around a circle, slowly rotating. */
export function RotatingBadge({
  text,
  className,
  children,
}: {
  text: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={cn("relative aspect-square", className)}>
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute inset-0 w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        aria-hidden
      >
        <defs>
          <path
            id="badge-circle"
            d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"
          />
        </defs>
        <text
          className="fill-current uppercase"
          style={{ fontFamily: "var(--font-object-bold)" }}
          fontSize="15"
        >
          <textPath href="#badge-circle" textLength="486">
            {text}
          </textPath>
        </text>
      </motion.svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

/** Section eyebrow, e.g. "02 — What you get" */
export function Eyebrow({
  index,
  children,
  className,
}: {
  index: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 font-mono uppercase text-xs tracking-[0.18em]",
        className,
      )}
    >
      <span className="opacity-50">{index}</span>
      <span className="h-px w-10 bg-current opacity-30" />
      <span>{children}</span>
    </div>
  );
}
