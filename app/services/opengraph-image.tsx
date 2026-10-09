import { ogCard, localImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Design, development and AI services in Perth WA";

export default function Image() {
  return ogCard({ kicker: "Services · Perth WA", title: "Design, development & AI services.", subtitle: "Websites, apps, branding, SEO and GEO, end to end.", image: localImage("/assets/media/services/web-design-perth-travis-weerts.jpg") });
}
