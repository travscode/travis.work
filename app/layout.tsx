import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { objectBold, objectRegular, objectThin, objectHeavy } from "@/app/fonts";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from 'next/script'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Travis Weerts | Award-winning designer, developer, and creative in Perth",
  description: "Helping startups ditch the dull and launch with style—think killer design, sharp dev, and brands that actually get noticed. Boring? Nope, not here.",
  authors: [{ name: "Travis Weerts", url: "https://travis.work" }],
  keywords: [
    "Travis Weerts",
    "design",
    "developer",
    "creative",
    "Perth",
    "startup",
    "app developer",
    "web developer",
    "web designer",
    "app designer",
    "UI/UX designer",
    "UI designer",
    "UX designer",
    "digital designer",
    "digital developer",
    "digital creative",
    "digital agency",
    "digital agency Perth",
    "digital agency in Perth",
    "digital agency Perth WA",
  ],
  themeColor: "#000000",
  colorScheme: "dark",
  openGraph: {
    title: "Travis Weerts | Award-winning designer, developer, and creative in Perth",
    description:
      "Helping startups ditch the dull and launch with style—think killer design, sharp dev, and brands that actually get noticed. Boring? Nope, not here.",
    images: ["https://travis.work/cover-image.jpg"],
    type: "website",
    url: "https://travis.work",
    siteName: "Travis Weerts",
    locale: "en_AU",
  },
  twitter: {
    title: "Travis Weerts | Award-winning designer, developer, and creative in Perth",
    description:
      "Helping startups ditch the dull and launch with style—think killer design, sharp dev, and brands that actually get noticed. Boring? Nope, not here.",
    images: ["https://travis.work/cover-image.jpg"],
    card: "summary_large_image",
    creator: "@travisweerts",
    site: "@travisweerts",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script
        id="schema-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Travis Weerts",
            url: "https://travis.work",
            image: "https://travis.work/cover-image.jpg",
            sameAs: [
              "https://linkedin.com/in/travisweerts",
              "https://github.com/travscode",
              "https://instagram.com/tr_____av"
            ],
            jobTitle: "Creative Developer & Designer",
            award: [
              "Top 5 AI Startup in Australia",
              "AWARD Awards",
              "Cannes Lions",
              "Spike Awards",
              "D&AD", "The One Show",
              "PADC Awards",
            ],
            worksFor: {
              "@type": "Organization",
              name: "IOOKI Labs"
            },
            nationality: "Australian",
            knowsAbout: [
              "UI/UX Design",
              "Web Development",
              "AI Integration",
              "Product Design",
              "AI Development",
              "Digital Marketing",
              "Digital Strategy",
              "Brand Design",
              "Branding",
              "Social Media Management",
              "Content Creation",
              "Digital Strategy",
              "Brand Development",
              "Brand Identity",
              "Brand Guidelines",
              "Brand Marketing",
              "Brand Consulting",
            ],
            description: "Travis Weerts is a multi-award-winning designer and developer creating digital experiences at the intersection of art, code, and AI.",
            email: "mailto:travisaweerts@gmail.com"
          })
        }}
      />
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${objectHeavy.variable} ${objectBold.variable} ${objectThin.variable} ${objectRegular.variable} antialiased bg-tw-black text-tw-white`}
      >
        {children}
      </body>
      <GoogleAnalytics gaId="G-ZQ5KPSBK2Q" />
    </html>
  );
}
