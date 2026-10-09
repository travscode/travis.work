import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { projects } from "@/data/projects";
import { projectSlug } from "@/lib/slug";

export type Project = (typeof projects)[number] & {
  slug?: string;
  details?: string;
};

export interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  source?: string;
}

export interface ProjectDetails {
  headline?: string;
  intro?: string;
  stats: Stat[];
  quote?: { text: string; by?: string; source?: string };
  highlights: string[];
  html: string;
}

/** Every real project (the intro card on the homepage isn't one). */
export function getWork(): Project[] {
  return (projects as Project[]).filter((p) => !p.useH1);
}

export function getProject(slug: string) {
  const work = getWork();
  const index = work.findIndex((p) => projectSlug(p) === slug);
  if (index === -1) return null;
  return {
    project: work[index],
    prev: work[(index - 1 + work.length) % work.length],
    next: work[(index + 1) % work.length],
  };
}

/**
 * `details` is optional. It can be a path to a markdown file in /content
 * (e.g. "work/hunter-markets.md") or a markdown string written inline.
 * Frontmatter may define: headline, intro, stats, quote, highlights.
 */
export function getDetails(project: Project): ProjectDetails | null {
  if (!project.details) return null;
  let raw = project.details;
  if (raw.trim().endsWith(".md")) {
    const file = path.join(process.cwd(), "content", raw.trim());
    if (!fs.existsSync(file)) return null;
    raw = fs.readFileSync(file, "utf8");
  }
  // A typo in the frontmatter shouldn't take the whole build down: fall back
  // to rendering the body without the extras and warn in the build log.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let data: Record<string, any> = {};
  let content = raw;
  try {
    ({ data, content } = matter(raw));
  } catch (e) {
    console.warn(
      `[work] Couldn't read the frontmatter for "${project.label}" (${project.details}). ` +
        `Tip: wrap values containing ": " in quotes. ${(e as Error).message.split("\n")[0]}`,
    );
    content = raw.replace(/^---\n[\s\S]*?\n---\n?/, "");
  }
  return {
    headline: data.headline,
    intro: data.intro,
    stats: Array.isArray(data.stats) ? data.stats : [],
    quote: data.quote,
    highlights: Array.isArray(data.highlights) ? data.highlights : [],
    html: marked.parse(content, { async: false }) as string,
  };
}

/** Notes on the homepage are HTML snippets; this gives plain text for meta tags. */
export const plain = (html?: string) =>
  (html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
