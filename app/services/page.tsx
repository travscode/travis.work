import { Metadata } from "next";
import { getAllServices, priceLabel } from "@/data/services";
import ServicesIndex from "@/components/services/ServicesIndex";
import {
  SITE_URL,
  OG_IMAGE,
  BUSINESS_ID,
  breadcrumbJsonLd,
  JsonLd,
} from "@/lib/seo";

const title = "Web Design, App Development & AI Services Perth | Travis Weerts";
const description =
  "Web design, branding, app design and development, SEO, GEO and AI development in Perth. One award-winning designer-developer, end to end. Free 30-min chat.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/services`,
    siteName: "Travis Weerts",
    images: [OG_IMAGE],
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [OG_IMAGE],
  },
};

export default function ServicesPage() {
  const toSummary = (s: ReturnType<typeof getAllServices>[number]) => ({
      slug: s.slug,
      title: s.title,
      tag: s.tag,
      image: s.images.square,
      subheadline: s.hero.subheadline,
      price: priceLabel(s),
      timeline: s.pricing.timeline,
      features: s.features,
    });
  const all = getAllServices();
  const services = all.filter((s) => s.showInServices).map(toSummary);
  const platforms = all.filter((s) => !s.showInServices).map(toSummary);

  const jsonLd = {
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/services`,
        url: `${SITE_URL}/services`,
        name: title,
        description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": BUSINESS_ID },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: [...services, ...platforms].map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE_URL}/services/${s.slug}`,
            name: s.title,
          })),
        },
      },
      breadcrumbJsonLd([
        { name: "Home", url: SITE_URL },
        { name: "Services", url: `${SITE_URL}/services` },
      ]),
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <ServicesIndex services={services} platforms={platforms} />
    </>
  );
}
