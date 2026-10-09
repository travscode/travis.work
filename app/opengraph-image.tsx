import { ogCard, localImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Travis Weerts, freelance web designer and app developer in Perth WA";

export default function Image() {
  return ogCard({
    kicker: "Perth WA · Australia-wide",
    title: "Freelance web designer & app developer.",
    subtitle: "Award-winning websites, apps, brands and AI. Featured by Apple.",
    image: localImage("/assets/media/welcome4.jpg"),
    dark: true,
  });
}
