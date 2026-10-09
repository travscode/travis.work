import { ogCard, localImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Thoughts by Travis Weerts";

export default function Image() {
  return ogCard({ kicker: "Thoughts", title: "Notes on design, code, AI and getting found online.", image: localImage("/assets/media/services/ai-development-perth-travis-weerts.jpg") });
}
