import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { objectBold, objectRegular, objectThin, objectHeavy } from "@/app/fonts";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import Head from 'next/head'

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

<Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Travis Weerts",
              url: "https://travis.work",
              image: "https://travis.work/cover-image.jpg", // replace with actual image URL
              sameAs: [
                "https://linkedin.com/in/travisweerts",
                "https://github.com/travscode" // optional
              ],
              jobTitle: "Creative Developer & Designer",
              worksFor: {
                "@type": "Organization",
                name: "IOOKI Labs"
              },
              alumniOf: {
                "@type": "EducationalOrganization",
                name: "Your university or training org here"
              },
              knowsAbout: [
                "UI/UX Design",
                "Web Development",
                "AI Integration",
                "Product Design"
              ],
              description: "Travis Weerts is a multi-award-winning designer and developer creating digital experiences at the intersection of art, code, and AI.",
              email: "mailto:travisaweerts@gmail.com"
            }),
          }}
        />
      </Head>


      <body
        className={`${geistSans.variable} ${geistMono.variable} ${objectHeavy.variable} ${objectBold.variable} ${objectThin.variable} ${objectRegular.variable} antialiased bg-tw-black text-tw-white`}
      >
        {children}
      </body>
      <GoogleAnalytics gaId="G-ZQ5KPSBK2Q" />
    </html>
  );
}
