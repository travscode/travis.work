import { getLocation } from "@/data/locations";
import { ogCard, localImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Web design by Travis Weerts";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = getLocation(slug);
  if (!l) return ogCard({ kicker: "Areas", title: "Travis Weerts" });
  return ogCard({
    kicker: `${l.name} · ${l.suburbs.slice(0, 3).join(", ")}`,
    title: l.h1,
    image: localImage("/assets/media/services/seo-perth-travis-weerts.jpg"),
  });
}
