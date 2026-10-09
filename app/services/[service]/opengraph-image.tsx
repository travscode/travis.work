import { getService } from "@/data/services";
import { ogCard, localImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Service by Travis Weerts, Perth WA";

export default async function Image({ params }: { params: Promise<{ service: string }> }) {
  const { service: slug } = await params;
  const s = getService(slug);
  if (!s) return ogCard({ kicker: "Services", title: "Travis Weerts" });
  return ogCard({
    kicker: `${s.tag} · Perth WA`,
    title: s.h1,
    image: localImage(`/assets/media/${s.images.square}`),
  });
}
