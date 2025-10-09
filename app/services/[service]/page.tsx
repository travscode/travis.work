import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, servicesList } from "@/data/services";
import ServiceTemplate from "@/components/ServiceTemplate";

interface ServicePageProps {
  params: Promise<{ service: string }>;
}

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

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: `https://travis.work/services/${serviceSlug}`,
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `https://travis.work/services/${serviceSlug}`,
      siteName: "Travis Weerts",
      images: [
        {
          url: "https://travis.work/cover_image.jpg",
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
      locale: "en_AU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
      images: ["https://travis.work/cover_image.jpg"],
      creator: "@travisweerts",
    },
    keywords: [
      service.title,
      `${service.title} Perth`,
      `${service.title} Perth Hills`,
      "Travis Weerts",
      ...service.features,
    ],
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { service: serviceSlug } = await params;
  const service = getService(serviceSlug);

  if (!service) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.metaDescription,
    provider: {
      "@type": "Person",
      name: "Travis Weerts",
      url: "https://travis.work",
      sameAs: [
        "https://twitter.com/travisweerts",
        "https://linkedin.com/in/travisweerts",
      ],
    },
    areaServed: {
      "@type": "Place",
      name: "Perth Hills, Western Australia",
    },
    offers: {
      "@type": "Offer",
      price: service.pricing.starting,
      priceCurrency: "AUD",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceTemplate service={service} />
    </>
  );
}
