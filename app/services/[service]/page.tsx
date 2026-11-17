import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, servicesList, priceLabel, SEO_AUDIT } from "@/data/services";
import { projects } from "@/data/projects";
import { projectHref } from "@/lib/slug";
import ServicePage from "@/components/services/ServicePage";
import {
  SITE_URL,
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
      locale: "en_AU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
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
        offers: service.hosting
          ? service.hosting.plans.flatMap(
              (plan: { name: string; monthly: number; annual: number }) =>
                (["monthly", "annual"] as const).map((billing) => ({
                  "@type": "Offer",
                  name: `${plan.name} (${billing})`,
                  url,
                  price: plan[billing],
                  priceCurrency: "AUD",
                  priceSpecification: {
                    "@type": "UnitPriceSpecification",
                    price: plan[billing],
                    priceCurrency: "AUD",
                    valueAddedTaxIncluded: true,
                    unitCode: billing === "annual" ? "ANN" : "MON",
                  },
                  availability: "https://schema.org/InStock",
                })),
            )
          : service.seoPlans
          ? [
              ...service.seoPlans.plans.map(
                (plan: { name: string; monthly: number }) => ({
                  "@type": "Offer",
                  name: `${plan.name} SEO plan`,
                  url,
                  price: plan.monthly,
                  priceCurrency: "AUD",
                  priceSpecification: {
                    "@type": "UnitPriceSpecification",
                    price: plan.monthly,
                    priceCurrency: "AUD",
                    valueAddedTaxIncluded: true,
                    unitCode: "MON",
                  },
                  availability: "https://schema.org/InStock",
                }),
              ),
              {
                "@type": "Offer",
                name: "One-time SEO audit",
                url: `${SITE_URL}${SEO_AUDIT.href}`,
                price: SEO_AUDIT.price,
                priceCurrency: "AUD",
                availability: "https://schema.org/InStock",
              },
            ]
          : service.pricing.fixed && price
          ? {
              "@type": "Offer",
              url,
              price,
              priceCurrency: "AUD",
              priceSpecification: {
                "@type": "PriceSpecification",
                price,
                priceCurrency: "AUD",
                valueAddedTaxIncluded: true,
              },
              availability: "https://schema.org/InStock",
            }
          : {
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
