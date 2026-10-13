import { ogCard, localImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "About Travis Weerts, designer and developer in Perth WA";

export default function Image() {
  return ogCard({ kicker: "About · Perth WA", title: "Hi, I'm Travis. I design and build digital things.", subtitle: "Websites, apps, brands and AI products.", image: localImage("/assets/media/trav_bio.jpg") });
}
