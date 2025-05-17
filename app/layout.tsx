import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  objectBold,
  objectRegular,
  objectThin,
  objectHeavy,
} from "@/app/fonts";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const descr =
  "Award-winning web designer in the Perth Hills. Tired of that dream being stuck in your head? You've come to the right place. I help businesses ditch the dull and stand out with bold branding, sharp design, and clean development. From strategy to pixels—this is where standout starts.";

export const metadata: Metadata = {
  title: "Web Design Perth Hills | Award-Winning Creative Developer",
  description: descr,
  authors: [{ name: "Travis Weerts", url: "https://travis.work" }],
  alternates: {
    canonical: "https://travis.work",
  },
  keywords: [
    "Travis Weerts",
    "design",
    "web design perth",
    "web developer perth",
    "web designer perth hills",
    "web developer perth hills",
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
    title: "Web Design Perth Hills | Award-Winning Creative Developer",
    description: descr,
    images: ["https://travis.work/cover-image.jpg"],
    type: "website",
    url: "https://travis.work",
    siteName: "Travis Weerts",
    locale: "en_AU",
  },
  twitter: {
    title: "Web Design Perth Hills | Award-Winning Creative Developer",
    description: descr,
    images: ["https://travis.work/cover-image.jpg"],
    card: "summary_large_image",
    creator: "@travisweerts",
    site: "@travisweerts",
  },
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
              "https://instagram.com/tr_____av",
            ],
            jobTitle: "Creative Developer & Designer",
            award: [
              "Top 5 AI Startup in Australia",
              "AWARD Awards",
              "Cannes Lions",
              "Spike Awards",
              "D&AD",
              "The One Show",
              "PADC Awards",
            ],
            worksFor: {
              "@type": "Organization",
              name: "IOOKI Labs",
            },
            nationality: "Australian",
            knowsAbout: [
              "Artificial Intelligence",
              "App Development",
              "UX Design",
              "AI Services",
              "UX Research",
              "UI Design",
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
            description:
              "Travis Weerts is a multi-award-winning designer and developer creating digital experiences at the intersection of art, code, and AI.",
            email: "mailto:travisaweerts@gmail.com",
          }),
        }}
      />

      <Script
        id="schema-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Travis Weerts Creative",
            url: "https://travis.work",
            image: "https://travis.work/cover-image.jpg",
            sameAs: [
              "https://linkedin.com/in/travisweerts",
              "https://github.com/travscode",
              "https://x.com/travisweerts",
              "https://instagram.com/tr_____av",
            ],
            jobTitle: "Creative Developer & Designer",
            award: [
              "Top 5 AI Startup in Australia",
              "AWARD Awards",
              "Cannes Lions",
              "Spike Awards",
              "D&AD",
              "The One Show",
              "PADC Awards",
            ],

            knowsAbout: [
              "Artificial Intelligence",
              "App Development",
              "UX Design",
              "AI Services",
              "UX Research",
              "UI Design",
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
            description:
              "Travis Weerts is a multi-award-winning designer and developer creating digital experiences at the intersection of art, code, and AI.",
            address: {
              "@type": "PostalAddress",
              streetAddress: "",
              addressLocality: "Gooseberry Hill",
              addressRegion: "WA",
              postalCode: "6076",
              addressCountry: "AU",
            },
          }),
        }}
      />

      <Script
        id="schema-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWorkSeries",
            name: "Digital Creative",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "5",
              bestRating: "5",
              ratingCount: "0",
            },
          }),
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
