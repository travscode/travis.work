// Shared by server and client code (no fs imports here).

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/** A project's URL slug: its own `slug` if set, otherwise from its label. */
export const projectSlug = (p: { label: string; slug?: string }) =>
  p.slug || slugify(p.label);

export const projectHref = (p: { label: string; slug?: string }) =>
  `/work/${projectSlug(p)}`;
