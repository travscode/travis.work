"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { motion, MotionConfig, type Variants } from "motion/react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import FillPill from "@/components/FillPill";
import { serviceHref, splitServices } from "@/lib/serviceLinks";
import { projectHref } from "@/lib/slug";
import { BOOKING_URL, BOOKING_LABEL } from "@/data/site";

interface Project {
  label: string;
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

// Preload an image and resolve with its aspect ratio (w / h)
const loadAspect = (src: string) =>
  new Promise<number>((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve(img.naturalWidth / img.naturalHeight || 0.75);
    img.onerror = () => resolve(0.75);
    img.src = src;
  });

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
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [aspects, setAspects] = useState<Record<number, number>>({});
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});

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

  // Intro: spines slide into the rack, the first image loads, then the first card opens
  useEffect(() => {
    let cancelled = false;
    const minDelay = new Promise((r) => setTimeout(r, 1100));
    const firstImage = Promise.race([
      loadAspect(projects[0].imageUrl).then((a) => {
        if (!cancelled) setAspects((prev) => ({ ...prev, 0: a }));
      }),
      new Promise((r) => setTimeout(r, 2500)),
    ]);

    Promise.all([minDelay, firstImage]).then(() => {
      if (cancelled) return;
      setActiveIndex(0);
      setTimeout(() => !cancelled && setReady(true), 900);
    });

    // Measure the rest in the background so every card knows its width before it opens
    projects.forEach((project, index) => {
      if (index === 0) return;
      loadAspect(project.imageUrl).then((a) => {
        if (!cancelled) setAspects((prev) => ({ ...prev, [index]: a }));
      });
    });

    return () => {
      cancelled = true;
    };
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

  const handleProjectClick = (index: number) => {
    if (isMobile) {
      setActiveIndex(index === activeIndex ? -1 : index); // Toggle active state on mobile
      return;
    }
    scrollToIndex(index);
  };

  useEffect(() => {
    if (isMobile || !ready) return; // Skip GSAP setup on mobile / until the intro is done
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
  }, [projects.length, isMobile, ready]);

  const mediaClass = cn(`
    media h-[calc(100%-2.6vw)] w-auto m-[1.3vw_1.3vw_0_4vw]
    object-cover rounded-[0.6vw] max-w-none inline
    border border-tw-grey-dark
  `);

  return (
    <MotionConfig reducedMotion="user">
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
                    spine-in project relative h-full min-w-[4vw] shrink-0 cursor-pointer
                    md:border-r border-tw-grey
                    transition-colors duration-300
                    hover:bg-tw-white hover:text-tw-black
                    flex flex-row
                  `,
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
                            src={project.videoUrl}
                            poster={project.imageUrl}
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
                            src={project.imageUrl}
                            alt={project.title || project.label}
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
                  onClick={() => handleProjectClick(index)}
                  className={cn(
                    `
                  project relative cursor-pointer border-b border-tw-grey-dark pb-15
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
                          alt={project.title || project.label}
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
