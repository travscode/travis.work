import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

// Articles live in /content/thoughts/<slug>.md. Frontmatter:
//   title, description, date (YYYY-MM-DD), tags [], cover (image URL),
//   medium (original Medium URL, optional), services [service slugs, optional],
//   faqs [{ q, a }] (optional, rendered + added as FAQ structured data)

const DIR = path.join(process.cwd(), "content", "thoughts");

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  cover?: string;
  medium?: string;
  services: string[];
  readingMinutes: number;
}

export interface Post extends PostMeta {
  html: string;
  faqs: { q: string; a: string }[];
}

function parse(file: string) {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  try {
    return matter(raw);
  } catch (e) {
    console.warn(`[thoughts] Bad frontmatter in ${file}: ${(e as Error).message.split("\n")[0]}`);
    return null;
  }
}

function meta(file: string, data: Record<string, unknown>, content: string): PostMeta {
  const words = content.split(/\s+/).filter(Boolean).length;
  return {
    slug: file.replace(/\.md$/, ""),
    title: String(data.title || file),
    description: String(data.description || ""),
    date: String(data.date || ""),
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    cover: data.cover ? String(data.cover) : undefined,
    medium: data.medium ? String(data.medium) : undefined,
    services: Array.isArray(data.services) ? (data.services as string[]) : [],
    readingMinutes: Math.max(1, Math.round(words / 220)),
  };
}

export function getPosts(): PostMeta[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const m = parse(f);
      return m ? meta(f, m.data, m.content) : null;
    })
    .filter((p): p is PostMeta => !!p)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

// YouTube links on their own line become players; other embeds stay links.
function embed(html: string) {
  return html.replace(
    /<p><a href="https?:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([\w-]{6,})[^"]*">[^<]*<\/a><\/p>/g,
    (_m, id) =>
      `<div class="embed"><iframe src="https://www.youtube-nocookie.com/embed/${id}" title="YouTube video" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`,
  );
}

export function getPost(slug: string): Post | null {
  const file = `${slug}.md`;
  if (!fs.existsSync(path.join(DIR, file))) return null;
  const m = parse(file);
  if (!m) return null;
  const info = meta(file, m.data, m.content);
  let body = m.content.trim();
  // Medium posts repeat the cover as the first image; the page already shows it
  if (info.cover && body.startsWith(`![`) && body.split("\n")[0].includes(info.cover)) {
    body = body.split("\n").slice(1).join("\n");
  }
  const html = embed(marked.parse(body, { async: false }) as string)
    .replace(/<img /g, '<img loading="lazy" ');
  return {
    ...info,
    html,
    faqs: Array.isArray(m.data.faqs) ? m.data.faqs : [],
  };
}
