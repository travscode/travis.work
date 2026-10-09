// Maps the free-text service names used on projects ("UI/UX", "iOS",
// "Brand Identity"…) to the matching service page, so every mention links.

const RULES: [RegExp, string][] = [
  [/wordpress/i, "/services/wordpress"],
  [/\bgeo\b|ai search|generative engine/i, "/services/geo"],
  [/\bseo\b/i, "/services/seo"],
  [/app design/i, "/services/app-design"],
  [/app dev|\bios\b|android|react native/i, "/services/app-development"],
  [/\bai\b|gen ai|conversational|voice model|prompt|computer vision|machine learning|sentiment/i, "/services/ai-development"],
  [/ui\s*\/?\s*ux|\bux\b|\bui\b|digital experience|product design|innovation|webgl|chat/i, "/services/ui-ux"],
  [/web ?design|web ?dev|nextjs|website/i, "/services/web-design"],
  [/brand|identity|packag|naming|creative direction|concept|ideation/i, "/services/brand"],
  [/graphic|print|illustration|poster|digital art|in-store/i, "/services/graphic-design"],
  [/^design$|^development$|consult/i, "/services"],
];

export function serviceHref(name: string): string | null {
  const n = name.trim();
  if (!n) return null;
  for (const [re, href] of RULES) if (re.test(n)) return href;
  return null;
}

/** "App Development, UI/UX, iOS" → ["App Development", "UI/UX", "iOS"] */
export function splitServices(services?: string): string[] {
  return (services || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}
