import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  objectBold,
  objectRegular,
  objectThin,
  objectHeavy,
  crtFont,
} from "@/app/fonts";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { getAllServices } from "@/data/services";
import {
  SITE_URL,
  OG_IMAGE,
  PERSON_ID,
  BUSINESS_ID,
  WEBSITE_ID,
  SAME_AS,
} from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const descr =
  "Award-winning web designer, app developer and AI creative in Perth. I help businesses ditch the dull and stand out with bold branding, sharp design and clean development — work for Google, the UN and Wendy's, featured by Apple.";

const siteTitle = "Freelance Web Designer & App Developer Perth WA | Travis Weerts";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: siteTitle,
  description: descr,
  applicationName: "Travis Weerts",
  authors: [{ name: "Travis Weerts", url: SITE_URL }],
  creator: "Travis Weerts",
  publisher: "Travis Weerts",
  formatDetection: { telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: siteTitle,
    description: descr,
    images: [{ url: OG_IMAGE, alt: "Travis Weerts — designer & developer, Perth" }],
    type: "website",
    url: SITE_URL,
    siteName: "Travis Weerts",
    locale: "en_AU",
  },
  twitter: {
    title: siteTitle,
    description: descr,
    images: [OG_IMAGE],
    card: "summary_large_image",
    creator: "@travisweerts",
    site: "@travisweerts",
  },
};

export const viewport: Viewport = {
  themeColor: "#111111",
  colorScheme: "dark light",
};

const services = getAllServices();

// One connected graph: the website, the person, and the business they run.
const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: "Travis Weerts",
      inLanguage: "en-AU",
      publisher: { "@id": PERSON_ID },
    },
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Travis Weerts",
      url: SITE_URL,
      image: OG_IMAGE,
      jobTitle: "Creative Developer & Designer",
      description:
        "Travis Weerts is a multi-award-winning designer and developer in Perth, Western Australia, creating digital experiences at the intersection of design, code and AI.",
      sameAs: SAME_AS,
      nationality: "Australian",
      homeLocation: {
        "@type": "Place",
        name: "Perth, Western Australia",
      },
      worksFor: [{ "@id": BUSINESS_ID }, { "@type": "Organization", name: "IOOKI Labs" }],
      award: [
        "Featured by Apple",
        "Top 5 AI Startup in Australia",
        "Cannes Lions",
        "D&AD",
        "The One Show",
        "Spike Awards",
        "AWARD Awards",
        "PADC Awards",
      ],
      knowsAbout: [
        "Web Design",
        "Web Development",
        "App Design",
        "App Development",
        "UI/UX Design",
        "Brand Identity",
        "Graphic Design",
        "Search Engine Optimisation",
        "Generative Engine Optimisation",
        "Artificial Intelligence",
        "AI Development",
        "Creative Direction",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": BUSINESS_ID,
      name: "Travis Weerts Creative",
      url: SITE_URL,
      image: OG_IMAGE,
      logo: `${SITE_URL}/android-chrome-512x512.png`,
      description: descr,
      founder: { "@id": PERSON_ID },
      priceRange: "$$",
      sameAs: SAME_AS,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Perth",
        addressRegion: "WA",
        addressCountry: "AU",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -31.9523,
        longitude: 115.8613,
      },
      areaServed: [
        { "@type": "City", name: "Perth" },
        { "@type": "AdministrativeArea", name: "Perth Hills" },
        { "@type": "AdministrativeArea", name: "Western Australia" },
        { "@type": "Country", name: "Australia" },
      ],
      knowsAbout: services.map((s) => s.tag),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Design, development & AI services",
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.title,
            url: `${SITE_URL}/services/${s.slug}`,
          },
        })),
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${objectHeavy.variable} ${crtFont.variable} ${objectBold.variable} ${objectThin.variable} ${objectRegular.variable} antialiased bg-tw-black text-tw-white`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        {children}
      </body>
      <GoogleAnalytics gaId="G-ZQ5KPSBK2Q" />
    </html>
  );
}
