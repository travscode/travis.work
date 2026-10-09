import { getIndustry } from "@/data/industries";
import { ogCard, localImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Websites by Travis Weerts";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = getIndustry(slug);
  if (!i) return ogCard({ kicker: "Industries", title: "Travis Weerts" });
  return ogCard({
    kicker: `${i.name} · Perth WA & Australia`,
    title: i.h1,
    image: localImage("/assets/media/services/web-design-perth-travis-weerts.jpg"),
  });
}
