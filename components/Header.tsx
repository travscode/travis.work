"use client";

import Link from "next/link";
import Image from "next/image";
import { FC, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Logo from "./Logo";
import FillPill from "./FillPill";
import { cn } from "@/lib/utils";
import { services, priceLabel } from "@/data/services";

interface HeaderProps {
  title?: string;
  paddingBottom?: number;
  /** "dark" for the homepage, "light" for the khaki service pages */
  variant?: "dark" | "light";
}

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const Header: FC<HeaderProps> = ({ variant = "dark" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const servicesForMenu = Object.values(services).filter(
    (service) => service.showInServices,
  );
  const preview = servicesForMenu[hovered] ?? servicesForMenu[0];
  // The header is dark on every page; `variant` is kept so callers needn't change
  const isLight = false && variant === "light";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const openMenu = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsMenuOpen(false), 160);
  };

  // Over khaki the pill fills black; over the dark header it fills cream
  const pillFill = isLight && !isMenuOpen ? "dark" : "light";
  const navPill = "text-xs md:text-sm leading-none px-3.5 py-2";

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE_OUT }}
        className={cn(
          "sticky top-0 md:fixed z-[99] w-full backdrop-blur py-4 px-4 pr-4 border-b transition-colors duration-500",
          isLight && !isMenuOpen
            ? "bg-tw-white/80 text-tw-black border-tw-black/10"
            : "bg-tw-black/95 supports-[backdrop-filter]:bg-tw-black/80 text-tw-white border-tw-grey-dark shadow-2xl",
        )}
      >
        <nav className="mx-auto flex flex-row justify-between items-center">
          <Link
            href="/"
            aria-label="Travis Weerts — home"
            className="text-xl font-bold uppercase md:pr-30 md:w-[300px]"
            onMouseEnter={closeMenu}
          >
            <Logo />
          </Link>

          <div className="flex gap-2 md:gap-3 flex-row items-center md:flex-grow justify-end md:justify-center font-object-bold">
            <FillPill
              href="/"
              outline={false}
              fill={pillFill}
              onMouseEnter={closeMenu}
              className={cn(navPill, "hidden md:inline-flex")}
            >
              WORK
            </FillPill>

            <div
              className="relative"
              onMouseEnter={openMenu}
              onMouseLeave={closeMenu}
              onFocus={openMenu}
            >
              <FillPill
                href="/services"
                outline={false}
                fill={pillFill}
                className={cn(navPill, "max-md:px-2")}
              >
                <span className="inline-flex items-center gap-1.5">
                  SERVICES
                  <motion.span
                    className="hidden md:inline-block"
                    animate={{ rotate: isMenuOpen ? 45 : 0 }}
                    transition={{ duration: 0.4, ease: EASE_OUT }}
                  >
                    +
                  </motion.span>
                </span>
              </FillPill>
            </div>

            <FillPill
              href="/thoughts"
              outline={false}
              fill={pillFill}
              onMouseEnter={closeMenu}
              className={cn(navPill, "hidden md:inline-flex")}
            >
              THOUGHTS
            </FillPill>

            {/* Desktop: same treatment as the other links. Mobile: solid pill. */}
            <FillPill
              href="/contact"
              outline={false}
              fill={pillFill}
              onMouseEnter={closeMenu}
              className={cn(navPill, "hidden md:inline-flex")}
            >
              CONTACT
            </FillPill>
            <Link
              href="/contact"
              className={cn(
                "md:hidden text-xs rounded-full p-3 px-4 leading-[10px]",
                isLight && !isMenuOpen
                  ? "bg-tw-black text-tw-white"
                  : "bg-tw-white text-tw-black",
              )}
            >
              CONTACT
            </Link>
          </div>
          <div className="hidden md:block font-object-thin text-3xl leading-[24px] tracking-[-2px] md:w-[300px] text-right">
            20 — 26
          </div>
        </nav>
      </motion.header>

      {/* Services menu. Always rendered (just hidden) so every page links to every service for crawlers. */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="scrim"
            className="fixed inset-0 z-[97] bg-tw-black/40 backdrop-blur-sm hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onMouseEnter={closeMenu}
          />
        )}
      </AnimatePresence>

      <motion.nav
        id="services-menu"
        aria-label="Services"
        className="fixed left-0 right-0 top-0 z-[98] hidden md:block bg-tw-black text-tw-white overflow-hidden border-b border-tw-grey-dark shadow-2xl"
        initial={false}
        animate={
          isMenuOpen
            ? { clipPath: "inset(0% 0% 0% 0%)", pointerEvents: "auto" }
            : { clipPath: "inset(0% 0% 100% 0%)", pointerEvents: "none" }
        }
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        onMouseEnter={openMenu}
        onMouseLeave={closeMenu}
      >
        <div className="pt-[100px] pb-10 px-8 grid grid-cols-12 gap-8 max-w-[1800px] mx-auto">
          <div className="col-span-7 lg:col-span-8">
            <div className="flex items-baseline justify-between border-b border-tw-white/15 pb-3 mb-2">
              <span className="font-mono text-sm uppercase tracking-wide">
                Services
              </span>
              <Link
                href="/services"
                className="text-xs font-object-bold uppercase tracking-wider hover:text-tw-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                All services →
              </Link>
            </div>
            <ul className="grid grid-cols-2 gap-x-8">
              {servicesForMenu.map((service, index) => (
                <motion.li
                  key={service.slug}
                  initial={false}
                  animate={
                    isMenuOpen
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 16 }
                  }
                  transition={{
                    duration: 0.5,
                    delay: isMenuOpen ? 0.2 + index * 0.035 : 0,
                    ease: EASE_OUT,
                  }}
                >
                  <Link
                    href={`/services/${service.slug}`}
                    onMouseEnter={() => setHovered(index)}
                    onFocus={() => setHovered(index)}
                    onClick={() => setIsMenuOpen(false)}
                    className="group flex items-baseline gap-4 py-3 border-b border-tw-white/10"
                  >
                    <span className="font-mono text-xs text-tw-grey w-6">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-object-bold text-2xl xl:text-3xl tracking-[-0.03em] transition-all duration-500 group-hover:translate-x-2 group-hover:text-tw-accent">
                      {service.tag}
                    </span>
                    <span className="ml-auto text-xs text-tw-grey opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                      {priceLabel(service)}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="col-span-5 lg:col-span-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-tw-white/5">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={preview.slug}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE_OUT }}
                >
                  <Image
                    src={`/assets/media/${preview.images.square}`}
                    alt={`${preview.title} by Travis Weerts`}
                    fill
                    sizes="(min-width: 1024px) 33vw, 40vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={preview.slug}
                className="mt-4 text-sm leading-snug max-w-sm text-tw-white/70"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
              >
                {preview.hero.subheadline}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </motion.nav>

    </>
  );
};

export default Header;
