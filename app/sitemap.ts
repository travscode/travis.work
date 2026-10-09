import type { MetadataRoute } from "next";
import { getAllServices } from "@/data/services";
import { SITE_URL } from "@/lib/seo";
import { getWork } from "@/lib/work";
import { projectSlug } from "@/lib/slug";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const services = getAllServices();

  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${SITE_URL}/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...services.map((s) => ({
      url: `${SITE_URL}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: [`${SITE_URL}/assets/media/${s.images.square}`],
    })),
    { url: `${SITE_URL}/work`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...getWork().map((p) => ({
      url: `${SITE_URL}/work/${projectSlug(p)}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
      images: [`${SITE_URL}${p.imageUrl}`],
    })),
    { url: `${SITE_URL}/start`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
