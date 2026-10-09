import { Metadata } from "next";
import StartPage from "@/components/start/StartPage";
import { START_FAQS } from "@/data/start";
import { SITE_URL, OG_IMAGE, BUSINESS_ID, breadcrumbJsonLd, JsonLd } from "@/lib/seo";

const title = "Affordable Web Design for Small Business & Startups Perth | Travis Weerts";
const description =
  "Affordable websites, branding and SEO for Perth small businesses and indie startups. Award-winning work without the agency price tag. Fixed quotes, monthly payments, free 30-min chat.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${SITE_URL}/start` },
  openGraph: { title, description, url: `${SITE_URL}/start`, images: [OG_IMAGE], siteName: "Travis Weerts", locale: "en_AU", type: "website" },
  twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `${SITE_URL}/start`,
              url: `${SITE_URL}/start`,
              name: title,
              description,
              about: { "@id": BUSINESS_ID },
              isPartOf: { "@id": `${SITE_URL}/#website` },
            },
            {
              "@type": "FAQPage",
              mainEntity: START_FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
            },
            breadcrumbJsonLd([{ name: "Home", url: SITE_URL }, { name: "Start a project", url: `${SITE_URL}/start` }]),
          ],
        }}
      />
      <StartPage />
    </>
  );
}
