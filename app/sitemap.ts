import type { MetadataRoute } from "next";
import { getAllServices } from "@/data/services";
import { SITE_URL } from "@/lib/seo";
import { getWork } from "@/lib/work";
import { getPosts } from "@/lib/thoughts";
import { locations } from "@/data/locations";
import { industries } from "@/data/industries";
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
    { url: `${SITE_URL}/thoughts`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...getPosts().map((p) => ({
      url: `${SITE_URL}/thoughts/${p.slug}`,
      lastModified: p.date ? new Date(p.date) : now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    { url: `${SITE_URL}/locations`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ...locations.map((l) => ({
      url: `${SITE_URL}/locations/${l.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...industries.map((i) => ({
      url: `${SITE_URL}/industries/${i.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${SITE_URL}/paint`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
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
