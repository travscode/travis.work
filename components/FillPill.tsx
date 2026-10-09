import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Text that rolls on hover: the word slides up and out while an identical
 * copy rises from below. Clipped, so it never leaves its container.
 */
export function RollText({ children }: { children: ReactNode }) {
  return (
    <span className="roll relative inline-flex overflow-hidden align-middle">
      <span className="roll-a block">{children}</span>
      <span aria-hidden className="roll-b absolute inset-0 block">
        {children}
      </span>
    </span>
  );
}

/**
 * Pill whose background fills from left to right on hover, like a loading
 * bar, while the label rolls. `outline` draws the stroke; nav links don't.
 */
export default function FillPill({
  href,
  children,
  className,
  fill = "light",
  outline = true,
  external,
  onClick,
  onMouseEnter,
}: {
  href?: string | null;
  children: ReactNode;
  className?: string;
  /** light = cream fill + black text (dark backgrounds); dark = the reverse */
  fill?: "light" | "dark";
  outline?: boolean;
  external?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  onMouseEnter?: () => void;
}) {
  const classes = cn(
    "fill-pill group/pill relative inline-flex items-center rounded-full overflow-hidden isolate",
    outline && "border",
    fill === "light"
      ? "border-tw-white hover:text-tw-black"
      : "border-tw-black hover:text-tw-white",
    "transition-colors duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]",
    className,
  );
  const inner = (
    <>
      <span
        aria-hidden
        className={cn(
          "pill-fill absolute inset-0 -z-10",
          fill === "light" ? "bg-tw-white" : "bg-tw-black",
        )}
      />
      <RollText>{children}</RollText>
    </>
  );

  if (!href) return <span className={classes}>{inner}</span>;
  if (external)
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" onClick={onClick} onMouseEnter={onMouseEnter}>
        {inner}
      </a>
    );
  return (
    <Link href={href} className={classes} onClick={onClick} onMouseEnter={onMouseEnter}>
      {inner}
    </Link>
  );
}
