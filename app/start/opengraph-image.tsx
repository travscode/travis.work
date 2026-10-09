import { ogCard, localImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Affordable web design for small businesses and startups";

export default function Image() {
  return ogCard({ kicker: "Small business & startups · Perth WA", title: "Small business? Big idea? Let's just get started.", subtitle: "Fixed quotes. Monthly payments. Free 30-minute chat.", image: localImage("/assets/media/services/branding-perth-travis-weerts.jpg") });
}
