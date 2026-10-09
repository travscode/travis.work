import { Metadata } from "next";
import { getAllServices } from "@/data/services";
import ContactExperience from "@/components/contact/ContactExperience";
import { SITE_URL, BUSINESS_ID, breadcrumbJsonLd, JsonLd } from "@/lib/seo";

const title = "Contact Travis Weerts | Web Designer & Developer Perth";
const description =
  "Start a project with Travis Weerts, award-winning web designer and app developer in Perth WA. Tell me your idea and I'll reply personally within a day.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/contact`,
    siteName: "Travis Weerts",
    locale: "en_AU",
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function ContactPage() {
  const services = getAllServices()
    .filter((s) => s.showInServices)
    .map((s) => ({ slug: s.slug, tag: s.tag }));

  const jsonLd = {
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${SITE_URL}/contact`,
        url: `${SITE_URL}/contact`,
        name: title,
        description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": BUSINESS_ID },
      },
      breadcrumbJsonLd([
        { name: "Home", url: SITE_URL },
        { name: "Contact", url: `${SITE_URL}/contact` },
      ]),
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <ContactExperience services={services} />
    </>
  );
}
