// Shared SEO constants + JSON-LD builders. Entity @ids let every page point
// at the same Person / business node so search engines (and AI) connect them.

export const SITE_URL = "https://travis.work";
export const OG_IMAGE = `${SITE_URL}/cover_image.jpg`;
export const PERSON_ID = `${SITE_URL}/#person`;
export const BUSINESS_ID = `${SITE_URL}/#business`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const SAME_AS = [
  "https://au.linkedin.com/in/travisweerts",
  "https://github.com/travscode",
  "https://instagram.com/tr_____av",
  "https://x.com/travisweerts",
  "https://medium.com/@travisaweerts",
];

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", ...data }),
      }}
    />
  );
}
