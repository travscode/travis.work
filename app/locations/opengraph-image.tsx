import { ogCard, localImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Areas Travis Weerts works in";

export default function Image() {
  return ogCard({ kicker: "Perth · WA · Australia", title: "Based in Perth. Working everywhere.", image: localImage("/assets/media/services/seo-perth-travis-weerts.jpg") });
}
