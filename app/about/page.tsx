import { Metadata } from "next";
import AboutPage from "@/components/about/AboutPage";
import { ABOUT_FAQS } from "@/data/about";
import { SITE_URL, PERSON_ID, breadcrumbJsonLd, JsonLd } from "@/lib/seo";

const title = "About Travis Weerts | Perth Design & Development Studio";
const description =
  "Travis Weerts is an award-winning designer, developer and creative consultant in Perth WA. travis.work is his studio for websites, apps, brands and AI products.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: { title, description, url: `${SITE_URL}/about`, siteName: "Travis Weerts", locale: "en_AU", type: "profile" },
  twitter: { card: "summary_large_image", title, description },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          "@graph": [
            {
              "@type": "AboutPage",
              "@id": `${SITE_URL}/about`,
              url: `${SITE_URL}/about`,
              name: title,
              description,
              mainEntity: { "@id": PERSON_ID },
              isPartOf: { "@id": `${SITE_URL}/#website` },
            },
            {
              "@type": "FAQPage",
              mainEntity: ABOUT_FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
            },
            breadcrumbJsonLd([{ name: "Home", url: SITE_URL }, { name: "About", url: `${SITE_URL}/about` }]),
          ],
        }}
      />
      <AboutPage />
    </>
  );
}
