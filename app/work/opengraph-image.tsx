import { ogCard, localImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Selected work by Travis Weerts";

export default function Image() {
  return ogCard({ kicker: "Work", title: "Big brands, brave startups and everything in between.", image: localImage("/assets/media/huntermarkets.jpg"), dark: true });
}
