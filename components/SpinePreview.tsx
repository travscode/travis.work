"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

// Gap between the cursor and the card
const OFFSET = 28;
// Card height as a share of the viewport (width follows at 9:16)
const HEIGHT_VH = 0.5;

/** A slight tilt per project, so each spine swings the card a little differently. */
const tiltFor = (index: number) => [-5, 3, -2, 6, -4, 2, -6, 4, -3, 5][index % 10];

export interface SpinePreviewItem {
  index: number;
  src: string;
  label: string;
}

/**
 * Floating 9:16 preview that trails the cursor while hovering closed spines.
 * Purely visual: it never takes pointer events, so it can't steal a click.
 */
export default function SpinePreview({ item }: { item: SpinePreviewItem | null }) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  // Quick, light spring: follows closely but with a little give
  const x = useSpring(rawX, { stiffness: 420, damping: 38, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 420, damping: 38, mass: 0.6 });
  const visibleRef = useRef(false);

  useEffect(() => {
    const place = (cx: number, cy: number, jump: boolean) => {
      const h = window.innerHeight * HEIGHT_VH;
      const w = (h * 9) / 16;
      // Sit to the right of the cursor, flipping left near the edge
      const left = cx + OFFSET + w > window.innerWidth ? cx - OFFSET - w : cx + OFFSET;
      const top = Math.min(Math.max(cy - h / 2, 16), window.innerHeight - h - 16);
      rawX.set(left);
      rawY.set(top);
      if (jump) {
        x.jump(left);
        y.jump(top);
      }
    };
    const last = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const onMove = (e: PointerEvent) => {
      last.x = e.clientX;
      last.y = e.clientY;
      // While hidden, snap so the card opens where the cursor is, not where it was
      place(e.clientX, e.clientY, !visibleRef.current);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    place(last.x, last.y, true);
    return () => window.removeEventListener("pointermove", onMove);
  }, [rawX, rawY, x, y]);

  useEffect(() => {
    visibleRef.current = !!item;
  }, [item]);

  const tilt = item ? tiltFor(item.index) : 0;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden md:block"
      style={{ x, y }}
    >
      <AnimatePresence>
        {item && (
          <motion.div
            key="card"
            className="relative h-[50vh] aspect-[9/16] rounded-[0.8vw] overflow-hidden bg-tw-grey-dark border border-tw-grey-dark shadow-2xl"
            initial={{ opacity: 0, scale: 0.82, y: 40, rotate: tilt - 4 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: tilt }}
            exit={{ opacity: 0, scale: 0.88, y: 70, rotate: tilt + 3 }}
            transition={{
              default: { duration: 0.5, ease: EASE_OUT },
              rotate: { type: "spring", stiffness: 260, damping: 18 },
            }}
          >
            <AnimatePresence initial={false}>
              <motion.img
                key={item.index}
                src={item.src}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
              />
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
