import { ogCard, localImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Contact Travis Weerts";

export default function Image() {
  return ogCard({ kicker: "Contact · Perth WA", title: "Got something in your head? Let's make it real.", subtitle: "I reply personally within one business day.", dark: true, image: localImage("/assets/media/welcome4.jpg") });
}
