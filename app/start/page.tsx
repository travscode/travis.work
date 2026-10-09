import { Metadata } from "next";
import StartPage from "@/components/start/StartPage";
import { START_FAQS } from "@/data/start";
import { SITE_URL, BUSINESS_ID, breadcrumbJsonLd, JsonLd } from "@/lib/seo";

const title = "Affordable Web Design for Small Business & Startups | Perth WA";
const description =
  "Affordable websites, branding and SEO for Perth small businesses and indie startups. Award-winning work, fixed quotes, monthly payments and a free chat.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${SITE_URL}/start` },
  openGraph: { title, description, url: `${SITE_URL}/start`, siteName: "Travis Weerts", locale: "en_AU", type: "website" },
  twitter: { card: "summary_large_image", title, description },
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
