import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, servicesList, priceLabel } from "@/data/services";
import { projects } from "@/data/projects";
import { projectHref } from "@/lib/slug";
import ServicePage from "@/components/services/ServicePage";
import {
  SITE_URL,
  OG_IMAGE,
  PERSON_ID,
  BUSINESS_ID,
  breadcrumbJsonLd,
  JsonLd,
} from "@/lib/seo";

interface ServicePageProps {
  params: Promise<{ service: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return servicesList.map((service) => ({
    service: service,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { service: serviceSlug } = await params;
  const service = getService(serviceSlug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  const url = `${SITE_URL}/services/${serviceSlug}`;

  return {
    title: { absolute: service.metaTitle },
    description: service.metaDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url,
      siteName: "Travis Weerts",
      images: [
        {
          url: `${SITE_URL}/assets/media/${service.images.square}`,
          alt: `${service.title} by Travis Weerts`,
        },
        { url: OG_IMAGE, alt: "Travis Weerts" },
      ],
      locale: "en_AU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
      images: [`${SITE_URL}/assets/media/${service.images.square}`],
      creator: "@travisweerts",
    },
  };
}

export default async function Page({ params }: ServicePageProps) {
  const { service: serviceSlug } = await params;
  const service = getService(serviceSlug);

  if (!service) {
    notFound();
  }

  const url = `${SITE_URL}/services/${serviceSlug}`;

  const work = (service.relatedWork || [])
    .map((label: string) => projects.find((p) => p.label === label))
    .filter(Boolean)
    .map((p: (typeof projects)[number]) => ({
      label: p.label,
      href: projectHref(p),
      imageUrl: p.imageUrl,
      services: p.services,
      client: p.client,
      year: p.year,
    }));

  const related = (service.related || [])
    .map((slug: string) => getService(slug))
    .filter(Boolean)
    .map((s: NonNullable<ReturnType<typeof getService>>) => ({
      slug: s.slug,
      tag: s.tag,
      subheadline: s.hero.subheadline,
      price: priceLabel(s),
    }));

  const price = service.pricing.starting
    ? parseInt(service.pricing.starting.replace(/[^0-9]/g, ""), 10)
    : null;

  const jsonLd = {
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: service.title,
        serviceType: service.tag,
        description: service.metaDescription,
        url,
        image: `${SITE_URL}/assets/media/${service.images.square}`,
        provider: { "@id": BUSINESS_ID },
        brand: { "@id": PERSON_ID },
        areaServed: [
          { "@type": "City", name: "Perth" },
          { "@type": "AdministrativeArea", name: "Western Australia" },
          { "@type": "Country", name: "Australia" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${service.tag} services`,
          itemListElement: service.features.map((f: string) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: f },
          })),
        },
        offers: {
          "@type": "Offer",
          url,
          priceCurrency: "AUD",
          ...(price
            ? {
                priceSpecification: {
                  "@type": "PriceSpecification",
                  minPrice: price,
                  priceCurrency: "AUD",
                },
              }
            : {}),
          availability: "https://schema.org/InStock",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: service.faqs.map((f: { q: string; a: string }) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: service.metaTitle,
        description: service.metaDescription,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${url}#service` },
        inLanguage: "en-AU",
      },
      breadcrumbJsonLd([
        { name: "Home", url: SITE_URL },
        { name: "Services", url: `${SITE_URL}/services` },
        { name: service.tag, url },
      ]),
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <ServicePage service={service} work={work} related={related} />
    </>
  );
}
