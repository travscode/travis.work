import type { MetadataRoute } from "next";
import { getAllServices } from "@/data/services";
import { SITE_URL } from "@/lib/seo";
import { getWork } from "@/lib/work";
import { getPosts } from "@/lib/thoughts";
import { locations } from "@/data/locations";
import { industries } from "@/data/industries";
import { projectSlug } from "@/lib/slug";
import { lastModified } from "@/lib/lastmod";

// lastModified comes from git history of each page's source files (see
// lib/lastmod.ts), so a URL only reports a change when its content changed.
export default function sitemap(): MetadataRoute.Sitemap {
  const services = getAllServices();
  const servicesLm = lastModified("data/services.js", "data/designServices.js", "components/services/ServicePage.tsx", "app/services/[service]/page.tsx");
  const locationsLm = lastModified("data/locations.js", "components/locations", "app/locations/[slug]/page.tsx");
  const industriesLm = lastModified("data/industries.js", "app/industries/[slug]/page.tsx");

  return [
    {
      url: SITE_URL,
      lastModified: lastModified("app/page.tsx", "components/ProjectGallery.tsx", "components/HomeIntro.tsx", "data/projects.js"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: lastModified("data/services.js", "data/designServices.js", "components/services/ServicesIndex.tsx", "app/services/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...services.map((s) => ({
      url: `${SITE_URL}/services/${s.slug}`,
      lastModified: servicesLm,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: [`${SITE_URL}/assets/media/${s.images.square}`],
    })),
    {
      url: `${SITE_URL}/work`,
      lastModified: lastModified("data/projects.js", "app/work/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...getWork().map((p) => ({
      url: `${SITE_URL}/work/${projectSlug(p)}`,
      lastModified: p.details
        ? lastModified(`content/${p.details}`, "app/work/[slug]/page.tsx")
        : lastModified("data/projects.js", "app/work/[slug]/page.tsx"),
      changeFrequency: "yearly" as const,
      priority: 0.6,
      images: [`${SITE_URL}${p.imageUrl}`],
    })),
    {
      url: `${SITE_URL}/thoughts`,
      lastModified: lastModified("content/thoughts", "app/thoughts/page.tsx"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...getPosts().map((p) => ({
      url: `${SITE_URL}/thoughts/${p.slug}`,
      lastModified: lastModified(`content/thoughts/${p.slug}.md`) ?? (p.date ? new Date(p.date) : undefined),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    { url: `${SITE_URL}/locations`, lastModified: locationsLm, changeFrequency: "monthly", priority: 0.7 },
    ...locations.map((l) => ({
      url: `${SITE_URL}/locations/${l.slug}`,
      lastModified: locationsLm,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...industries.map((i) => ({
      url: `${SITE_URL}/industries/${i.slug}`,
      lastModified: industriesLm,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${SITE_URL}/paint`, lastModified: lastModified("app/paint", "components/paint", "data/paint.ts"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/start`, lastModified: lastModified("app/start", "components/start", "data/start.ts"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: lastModified("app/about", "components/about", "data/about.ts"), changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: lastModified("app/contact", "components/contact"), changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/privacy`, lastModified: lastModified("app/privacy"), changeFrequency: "yearly", priority: 0.2 },
  ];
}
