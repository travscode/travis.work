"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { AnimatePresence, motion, MotionConfig, type Variants } from "motion/react";
import Logo from "@/components/Logo";
import { cn } from "@/lib/utils";
import Image from "next/image";
import FillPill from "@/components/FillPill";
import { serviceHref, splitServices } from "@/lib/serviceLinks";
import { projectHref, projectSlug } from "@/lib/slug";
import { BOOKING_URL, BOOKING_LABEL } from "@/data/site";

interface Project {
  label: string;
  slug?: string;
  year: string;
  imageUrl: string;
  videoUrl?: string;
  services?: string;
  date?: string;
  client?: string;
  agency?: string;
  agencyLink?: string;
  link?: string;
  notes?: string;
  other?: string;
  title?: string;
  tags?: string[];
  useH1?: boolean;
  linkLabel?: string;
}

interface ProjectGalleryProps {
  projects: Project[];
  paddingTop: number;
}

// Shared easing — a slow-out curve that feels like a CD case sliding off a shelf
const EASE_SLIDE = [0.76, 0, 0.24, 1] as const;
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const infoContainer: Variants = {
  closed: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
  open: { transition: { staggerChildren: 0.07, delayChildren: 0.35 } },
};

const infoItem: Variants = {
  closed: {
    opacity: 0,
    y: 18,
    filter: "blur(6px)",
    transition: { duration: 0.2 },
  },
  open: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

// Links inside a card shouldn't also trigger the card's own click
const stop = (e: React.MouseEvent) => e.stopPropagation();

const ServicePills = ({ services }: { services: string }) => (
  <h2 className="content flex flex-wrap gap-1.5 mt-1.5 max-w-[300px] whitespace-normal">
    {splitServices(services).map((name) => (
      <FillPill
        key={name}
        href={serviceHref(name)}
        onClick={stop}
        className="px-2.5 py-0.5 text-[11px] border-tw-white/40"
      >
        {name}
      </FillPill>
    ))}
  </h2>
);

const TagPills = ({ tags }: { tags: string[] }) => (
  <>
    {tags.map((tag) => (
      <h2 key={tag} className="tag inline-flex">
        <FillPill href={serviceHref(tag)} onClick={stop} className="p-1 px-3">
          {tag}
        </FillPill>
      </h2>
    ))}
  </>
);

const BookCta = () => (
  <FillPill
    href={BOOKING_URL}
    external={BOOKING_URL.startsWith("http")}
    onClick={stop}
    className="px-5 py-2.5 text-sm font-object-bold"
  >
    {BOOKING_LABEL} →
  </FillPill>
);

const MoreLink = ({ href }: { href: string }) => (
  <FillPill href={href} onClick={stop} className="px-5 py-2.5 text-sm font-object-bold">
    More about this project →
  </FillPill>
);

// The raw files in /public are huge (some PNGs are 5MB). Route them through
// Next's image optimiser so the browser gets a resized WebP/AVIF instead.
const optimized = (src: string, w = 1920) =>
  src.startsWith("/")
    ? `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=80`
    : src;

// Preload an image and resolve with its aspect ratio (w / h)
const loadAspect = (src: string) =>
  new Promise<number>((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve(img.naturalWidth / img.naturalHeight || 0.75);
    img.onerror = () => resolve(0.75);
    img.src = src;
  });

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Deep links: /?project=<slug> opens that card after the preloader.
// A query string (not a #hash) so the browser never jumps the page.
const PROJECT_PARAM = "project";

const linkedIndex = (projects: Project[]) => {
  const slug = new URLSearchParams(window.location.search).get(PROJECT_PARAM);
  if (!slug) return 0;
  const i = projects.findIndex((p) => projectSlug(p) === slug);
  return i > 0 ? i : 0;
};

// How many cards must be fully loaded before the preloader lifts. The rest
// keep loading in the background, in order, so the next cards are always ready.
const PRELOAD_COUNT = 6;
// Never hold the site hostage on a slow connection
const PRELOAD_MAX_MS = 6000;

const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  projects,
  paddingTop = 110,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const clickGuardRef = useRef({ active: false, last: 0 });
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  // Nothing is open on first paint — the intro opens the first card
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [ready, setReady] = useState(false);
  const readyRef = useRef(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [aspects, setAspects] = useState<Record<number, number>>({});
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});
  const [revealed, setRevealed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressTotal, setProgressTotal] = useState(PRELOAD_COUNT);

  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Intro: preloader holds until fonts + the first few images are in, then
  // fades out, the spines slide into the rack and the first card opens
  useEffect(() => {
    let cancelled = false;
    const desktop = window.innerWidth >= 768;
    const document_ = window.document;
    document_.documentElement.style.overflow = "hidden";

    const measure = (index: number) =>
      loadAspect(optimized(projects[index].imageUrl)).then((a) => {
        if (cancelled) return;
        setAspects((prev) => ({ ...prev, [index]: a }));
        setProgress((p) => p + 1);
      });

    const start = linkedIndex(projects);
    const criticalIdx = new Set(
      desktop
        ? [...Array(Math.min(PRELOAD_COUNT, projects.length)).keys(), start]
        : [],
    );
    const critical = [...criticalIdx].map((i) => measure(i));
    setProgressTotal(Math.max(1, critical.length));

    const assetsReady = Promise.race([
      Promise.all([document_.fonts?.ready, ...critical]),
      wait(PRELOAD_MAX_MS),
    ]);

    (async () => {
      await Promise.all([assetsReady, wait(700)]);
      if (cancelled) return;
      // Linked card: move the rack there while the preloader still covers it
      if (start > 0) jumpToIndex(start);
      setRevealed(true); // preloader fades, spines slide in
      document_.documentElement.style.overflow = "";
      await wait(750);
      if (cancelled) return;
      setActiveIndex(start); // first (or linked) card slides open
      if (start > 0 && !desktop) {
        document_
          .querySelector(`[data-project-index="${start}"]`)
          ?.scrollIntoView({ block: "start" });
      }
      await wait(900);
      if (!cancelled) setReady(true);
    })();

    // Then the rest, a couple at a time in order, so we don't flood the connection
    if (desktop) {
      (async () => {
        await assetsReady;
        let next = PRELOAD_COUNT;
        const worker = async () => {
          while (!cancelled && next < projects.length) {
          const i = next++;
          if (!criticalIdx.has(i)) await measure(i);
        }
        };
        await Promise.all([worker(), worker()]);
      })();
    }

    return () => {
      cancelled = true;
      document_.documentElement.style.overflow = "";
    };
    // jumpToIndex only reads refs, so the intro never needs to re-run for it
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects]);

  // Only the open card's video plays
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === activeIndex) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [activeIndex]);

  const scrollToIndex = (index: number) => {
    const st = scrollTriggerRef.current;
    if (!st) return;
    const progress = index / (projects.length - 1);
    const target = st.start + progress * (st.end - st.start);

    if (lenisRef.current) {
      clickGuardRef.current = { active: true, last: performance.now() };
      lenisRef.current.scrollTo(target, {
        duration: 1.1,
        easing: (t) => 1 - Math.pow(1 - t, 4),
      });
    } else {
      window.scrollTo({ top: target, behavior: "smooth" });
    }
  };

  // Instant scroll, used under the preloader for deep links
  const jumpToIndex = (index: number) => {
    const st = scrollTriggerRef.current;
    if (!st) return;
    const target = st.start + (index / (projects.length - 1)) * (st.end - st.start);
    if (lenisRef.current) lenisRef.current.scrollTo(target, { immediate: true, force: true });
    else window.scrollTo({ top: target });
    st.update();
  };

  // Keep the address bar pointing at the open card, without a reload or history spam
  useEffect(() => {
    if (!ready) return;
    const url = new URL(window.location.href);
    if (activeIndex <= 0) url.searchParams.delete(PROJECT_PARAM);
    else url.searchParams.set(PROJECT_PARAM, projectSlug(projects[activeIndex]));
    if (url.href !== window.location.href) {
      window.history.replaceState(window.history.state, "", url);
    }
  }, [activeIndex, ready, projects]);

  const handleProjectClick = (index: number) => {
    if (isMobile) {
      setActiveIndex(index === activeIndex ? -1 : index); // Toggle active state on mobile
      return;
    }
    scrollToIndex(index);
  };

  // Scroll stays locked until the intro has finished
  useEffect(() => {
    readyRef.current = ready;
    if (ready) lenisRef.current?.start();
  }, [ready]);

  // Set up pinning straight away, while the preloader still covers the page.
  // Pinning moves the rack into a wrapper element, and moving an element
  // restarts its CSS animations, so doing it after the intro made every
  // spine slide in twice and the first card blink.
  useEffect(() => {
    // Skip GSAP setup on mobile (checked directly too, since isMobile starts false)
    if (isMobile || window.innerWidth < 768) return;
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      autoRaf: true,
      // After a click, swallow the tail of any trackpad momentum. Those wheel
      // events otherwise cancel the click's scrollTo, so the card never opens.
      // A fresh gesture (after a short pause) is honoured as normal.
      virtualScroll: ({ event }) => {
        const guard = clickGuardRef.current;
        if (!guard.active || !event.type.includes("wheel")) return true;
        const now = performance.now();
        if (now - guard.last < 160) {
          guard.last = now;
          event.preventDefault();
          return false;
        }
        guard.active = false;
        return true;
      },
    });
    lenisRef.current = lenis;
    if (!readyRef.current) lenis.stop();

    lenis.on("scroll", ScrollTrigger.update);

    const container = containerRef.current;
    if (!container) return;

    const setX = gsap.quickSetter(container, "x", "px");

    const st = ScrollTrigger.create({
      trigger: ".pin-height",
      pin: container,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        if (!readyRef.current) return; // the intro opens the first card
        const closestIndex = Math.round(self.progress * (projects.length - 1));
        setActiveIndex(closestIndex);
      },
    });
    scrollTriggerRef.current = st;

    // Re-measure every frame: card widths animate as they open and close,
    // so the travel distance has to follow the live width of the rack
    const tick = () => {
      const max = Math.max(0, container.scrollWidth - window.innerWidth);
      setX(-st.progress * max);
    };
    gsap.ticker.add(tick);

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const current = Math.round(st.progress * (projects.length - 1));
      const next =
        e.key === "ArrowRight"
          ? Math.min(projects.length - 1, current + 1)
          : Math.max(0, current - 1);
      scrollToIndex(next);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      gsap.ticker.remove(tick);
      st.kill();
      scrollTriggerRef.current = null;
      lenis.destroy();
      lenisRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects.length, isMobile]);

  const mediaClass = cn(`
    media h-[calc(100%-2.6vw)] w-auto m-[1.3vw_1.3vw_0_4vw]
    object-cover rounded-[0.6vw] max-w-none inline
    border border-tw-grey-dark
  `);

  return (
    <MotionConfig reducedMotion="user">
      {/* Preloader: blacks out the page until the first cards are ready */}
      <AnimatePresence>
        {!revealed && (
          <motion.div
            key="preloader"
            className="fixed inset-0 z-[9999] bg-tw-black text-tw-white flex flex-col items-center justify-center gap-6"
            initial={false}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            aria-label="Loading"
            role="status"
          >
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
            >
              <Logo className="preloader-pulse" />
            </motion.div>
            <div className="h-px w-40 bg-tw-white/15 overflow-hidden">
              <motion.div
                className="h-full bg-tw-white origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: Math.min(1, progress / progressTotal) }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <section className="bg-tw-black">
        {!isMobile ? (
          <div className="pin-height h-[300vh] overflow-hidden">
            <div
              ref={containerRef}
              className="container whitespace-nowrap w-max h-screen flex md:flex-row flex-col relative"
            >
              {projects.map((project, index) => {
                const isActive = index === activeIndex;
                const aspect = aspects[index];
                const mediaVisible = isActive && (loaded[index] || !!aspect);

                return (
                  <div
                    key={index}
                    onClick={() => handleProjectClick(index)}
                    style={{
                      paddingTop: paddingTop * (115 / 150) + "px",
                      animationDelay: `${100 + Math.min(index, 24) * 30}ms`,
                    }}
                    className={cn(
                      `
                    project relative h-full min-w-[4vw] shrink-0 cursor-pointer
                    md:border-r border-tw-grey
                    transition-colors duration-300
                    hover:bg-tw-white hover:text-tw-black
                    flex flex-row
                  `,
                      revealed ? "spine-in" : "opacity-0",
                      isActive
                        ? "on bg-tw-black hover:bg-tw-black hover:text-tw-white text-tw-white"
                        : "text-tw-grey",
                    )}
                  >
                    <div
                      className={cn(
                        `
                      datas absolute bottom-0
                      font-object-regular font-medium text-[1.5vw] leading-[2.6vw]
                      -tracking-[0.03em] rotate-[-90deg] origin-[1vw_50%]
                      w-[calc(100vh-2.6vw-65px)] flex flex-row justify-between
                      md:transform-none md:left-auto m-[calc(1vw-2px)]
                      md:text-[1.2vw] 2xl:text-[1vw] transition-all duration-500 pr-3 pl-1.5
                    `,
                        isActive && "font-object-bold",
                      )}
                    >
                      <h4 className="label">{project.label}</h4>
                      <motion.p
                        className="year text-[1.25vw]"
                        initial={false}
                        animate={{
                          opacity: isActive ? 1 : 0,
                          x: isActive ? 0 : -12,
                        }}
                        transition={{
                          duration: 0.5,
                          delay: isActive ? 0.4 : 0,
                          ease: EASE_OUT,
                        }}
                      >
                        {project.year}
                      </motion.p>
                    </div>

                    {/* The sleeve: slides open to the card's natural width */}
                    <motion.div
                      className="flex flex-row h-full shrink-0 overflow-hidden"
                      initial={false}
                      animate={{ width: isActive ? "auto" : 0 }}
                      transition={{ duration: 0.8, ease: EASE_SLIDE }}
                    >
                      <motion.div
                        className="h-full flex flex-row shrink-0"
                        initial={false}
                        animate={{
                          opacity: mediaVisible ? 1 : 0,
                          scale: mediaVisible ? 1 : 1.04,
                          filter: mediaVisible ? "blur(0px)" : "blur(12px)",
                        }}
                        transition={{
                          duration: isActive ? 0.9 : 0.3,
                          delay: isActive ? 0.15 : 0,
                          ease: EASE_OUT,
                        }}
                        style={{ transformOrigin: "left center" }}
                      >
                        {project.videoUrl ? (
                          <video
                            ref={(el) => {
                              videoRefs.current[index] = el;
                            }}
                            className={mediaClass}
                            style={aspect ? { aspectRatio: aspect } : undefined}
                            src={aspect || isActive ? project.videoUrl : undefined}
                            aria-label={`${project.title || project.label} by Travis Weerts`}
                            title={project.label}
                            poster={aspect || isActive ? optimized(project.imageUrl) : undefined}
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            onLoadedMetadata={() =>
                              setLoaded((prev) => ({ ...prev, [index]: true }))
                            }
                          />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            className={mediaClass}
                            src={aspect || isActive ? optimized(project.imageUrl) : undefined}
                            alt={`${project.title || project.label} by Travis Weerts`}
                            title={project.label}
                            decoding="async"
                            fetchPriority={index === 0 ? "high" : "auto"}
                            onLoad={() =>
                              setLoaded((prev) => ({ ...prev, [index]: true }))
                            }
                          />
                        )}
                      </motion.div>

                      <motion.div
                        className="info text-xs h-[calc(100%-2.6vw)] m-[1.3vw_3.3vw_0_0] flex flex-col gap-4 w-[324px] shrink-0 overflow-hidden p-3"
                        variants={infoContainer}
                        initial="closed"
                        animate={isActive ? "open" : "closed"}
                      >
                        {project.useH1 ? (
                          <motion.h1
                            variants={infoItem}
                            className="info_block w-[300px] font-object-bold text-xl leading-tight whitespace-normal"
                          >
                            {project.title || project.label}
                          </motion.h1>
                        ) : (
                          <motion.h3
                            variants={infoItem}
                            className="info_block w-[300px] font-object-bold text-xl leading-tight whitespace-normal"
                          >
                            {project.title || project.label}
                          </motion.h3>
                        )}
                        {project.services && (
                          <motion.div
                            variants={infoItem}
                            className="info_block w-[300px]"
                          >
                            <div className="label">Services</div>
                            <ServicePills services={project.services} />
                          </motion.div>
                        )}

                        {project.date && (
                          <motion.div variants={infoItem} className="info_block">
                            <div className="label">Date</div>
                            <div className="content max-w-[300px] whitespace-normal">
                              {project.date}
                            </div>
                          </motion.div>
                        )}

                        {project.client && (
                          <motion.div variants={infoItem} className="info_block">
                            <div className="label">Client</div>
                            <div className="content whitespace-normal">
                              {project.client}
                            </div>
                          </motion.div>
                        )}

                        {project.agency && (
                          <motion.div variants={infoItem} className="info_block">
                            <div className="label">Agency</div>
                            <div className="content whitespace-normal">
                              {project.agencyLink ? (
                                <a
                                  href={project.agencyLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="underline hover:text-tw-accent"
                                >
                                  {project.agency}
                                </a>
                              ) : (
                                <>{project.agency}</>
                              )}
                            </div>
                          </motion.div>
                        )}

                        {project.link && (
                          <motion.div variants={infoItem} className="info_block">
                            <div className="label">
                              {project.linkLabel || "Link"}
                            </div>
                            <div className="content whitespace-normal underline hover:text-tw-accent">
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {project.link}
                              </a>
                            </div>
                          </motion.div>
                        )}

                        {project.notes && (
                          <motion.div
                            variants={infoItem}
                            className="info_block pt-4"
                          >
                            <div className="label">Notes</div>
                            <div
                              className="content w-[300px] max-w-[300px] word-wrap whitespace-normal"
                              dangerouslySetInnerHTML={{ __html: project.notes }}
                            ></div>
                          </motion.div>
                        )}

                        {project.other && (
                          <motion.div variants={infoItem} className="info_block">
                            <div
                              className="content w-[300px] max-w-[300px] word-wrap whitespace-normal"
                              dangerouslySetInnerHTML={{ __html: project.other }}
                            ></div>
                          </motion.div>
                        )}

                        {project.tags && (
                          <motion.div
                            variants={infoItem}
                            className="info_block whitespace-normal flex flex-wrap gap-2"
                          >
                            <TagPills tags={project.tags} />
                          </motion.div>
                        )}

                        {project.useH1 && (
                          <motion.div variants={infoItem} className="info_block pt-2">
                            <BookCta />
                          </motion.div>
                        )}

                        {!project.useH1 && (
                          <motion.div variants={infoItem} className="info_block pt-2">
                            <MoreLink href={projectHref(project)} />
                          </motion.div>
                        )}
                      </motion.div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          // Mobile view - vertical stacking
          <div className="py-4 px-4">
            <div className="flex flex-col space-y-6">
              {projects.map((project, index) => (
                <div
                  key={index}
                  data-project-index={index}
                  onClick={() => handleProjectClick(index)}
                  className={cn(
                    `
                  project relative cursor-pointer scroll-mt-20 border-b border-tw-grey-dark pb-15
                  transition-all duration-300
                  text-tw-white
                `,
                    project.useH1 ? "" : "pt-10",
                  )}
                >
                  <div className="flex flex-col space-y-4">
                    <motion.div
                      initial={{ opacity: 0, y: 30, scale: 0.98 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: "-10% 0px" }}
                      transition={{ duration: 0.9, ease: EASE_OUT }}
                    >
                      {project.videoUrl ? (
                        <video
                          className={cn(
                            "w-full object-cover rounded-2xl border border-tw-grey-dark mb-6",
                            project.useH1
                              ? "h-[50vh] object-center"
                              : "h-[80vh]",
                          )}
                          src={project.videoUrl}
                          aria-label={`${project.title || project.label} by Travis Weerts`}
                          title={project.label}
                          poster={project.imageUrl}
                          autoPlay
                          loop
                          muted
                          playsInline
                        />
                      ) : (
                        <Image
                          className={cn(
                            "w-full object-cover rounded-2xl border border-tw-grey-dark mb-6",
                            project.useH1
                              ? "h-[50vh] object-center"
                              : "h-[80vh]",
                          )}
                          src={project.imageUrl}
                          alt={`${project.title || project.label} by Travis Weerts`}
                          title={project.label}
                          width={300}
                          height={600}
                        />
                      )}
                    </motion.div>

                    <motion.div
                      className="info text-xs flex flex-col gap-2"
                      variants={infoContainer}
                      initial="closed"
                      whileInView="open"
                      viewport={{ once: true, margin: "-10% 0px" }}
                    >
                      {project.useH1 ? (
                        <motion.h1
                          variants={infoItem}
                          className="info_block w-[300px] font-object-bold text-xl leading-tight whitespace-normal"
                        >
                          {project.title || project.label}
                        </motion.h1>
                      ) : (
                        <motion.h3
                          variants={infoItem}
                          className="info_block w-[300px] font-object-bold text-xl whitespace-normal pb-2 leading-tight"
                        >
                          {project.title || project.label}
                        </motion.h3>
                      )}

                      {project.services && (
                        <motion.div variants={infoItem} className="info_block">
                          <div className="label">Services</div>
                          <ServicePills services={project.services} />
                        </motion.div>
                      )}

                      {project.date && (
                        <motion.div variants={infoItem} className="info_block">
                          <div className="label">Date</div>
                          <div className="content whitespace-normal">
                            {project.date}
                          </div>
                        </motion.div>
                      )}

                      {project.client && (
                        <motion.div variants={infoItem} className="info_block">
                          <div className="label">Client</div>
                          <div className="content whitespace-normal">
                            {project.client}
                          </div>
                        </motion.div>
                      )}

                      {project.agency && (
                        <motion.div variants={infoItem} className="info_block">
                          <div className="label">Agency</div>
                          <div className="content whitespace-normal">
                            {project.agencyLink ? (
                              <a
                                href={project.agencyLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline"
                              >
                                {project.agency}
                              </a>
                            ) : (
                              <>{project.agency}</>
                            )}
                          </div>
                        </motion.div>
                      )}

                      {project.link && (
                        <motion.div variants={infoItem} className="info_block">
                          <div className="label">
                            {project.linkLabel || "Link"}
                          </div>
                          <div className="content whitespace-normal underline hover:text-tw-accent">
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {project.link}
                            </a>
                          </div>
                        </motion.div>
                      )}

                      {project.notes && (
                        <motion.div
                          variants={infoItem}
                          className="info_block pt-4"
                        >
                          <div className="label">Notes</div>
                          <div
                            className="content whitespace-normal"
                            dangerouslySetInnerHTML={{ __html: project.notes }}
                          ></div>
                        </motion.div>
                      )}

                      {project.other && (
                        <motion.div
                          variants={infoItem}
                          className="info_block pt-4"
                        >
                          <div
                            className="content whitespace-normal"
                            dangerouslySetInnerHTML={{ __html: project.other }}
                          ></div>
                        </motion.div>
                      )}

                      {project.tags && (
                        <motion.div
                          variants={infoItem}
                          className="info_block pt-4 whitespace-normal flex flex-wrap gap-2"
                        >
                          <TagPills tags={project.tags} />
                        </motion.div>
                      )}

                      {project.useH1 && (
                        <motion.div variants={infoItem} className="info_block pt-4">
                          <BookCta />
                        </motion.div>
                      )}

                      {!project.useH1 && (
                        <motion.div variants={infoItem} className="info_block pt-4">
                          <MoreLink href={projectHref(project)} />
                        </motion.div>
                      )}
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </MotionConfig>
  );
};

export default ProjectGallery;
