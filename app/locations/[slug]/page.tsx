import { Metadata } from "next";
import { notFound } from "next/navigation";
import LocationPage from "@/components/locations/LocationPage";
import { locations, getLocation } from "@/data/locations";
import { getService, priceLabel } from "@/data/services";
import { projects } from "@/data/projects";
import { projectHref } from "@/lib/slug";
import { SITE_URL, BUSINESS_ID, breadcrumbJsonLd, JsonLd } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const l = getLocation(slug);
  if (!l) return { title: "Not found" };
  const url = `${SITE_URL}/locations/${slug}`;
  return {
    title: { absolute: l.metaTitle },
    description: l.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: l.metaTitle, description: l.metaDescription, url, siteName: "Travis Weerts", locale: "en_AU", type: "website" },
    twitter: { card: "summary_large_image", title: l.metaTitle, description: l.metaDescription },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const l = getLocation(slug);
  if (!l) notFound();
  const url = `${SITE_URL}/locations/${slug}`;

  const services = l.focus
    .map((s) => getService(s))
    .filter(Boolean)
    .map((s) => ({
      href: `/services/${s.slug}`,
      title: s.tag,
      line: s.hero.subheadline,
      price: priceLabel(s),
      image: `/assets/media/${s.images.square}`,
    }));

  const work = l.work
    .map((label) => projects.find((p) => p.label === label))
    .filter((p): p is (typeof projects)[number] => !!p)
    .map((p) => ({ href: projectHref(p), title: p.label, line: p.services, image: p.imageUrl }));

  const nearby = locations
    .filter((o) => o.slug !== l.slug)
    .sort((a, b) => Number(b.group === l.group) - Number(a.group === l.group))
    .slice(0, 8)
    .map((o) => ({ slug: o.slug, name: o.name }));

  const jsonLd = {
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: `Web design and development in ${l.name}`,
        serviceType: "Web design, development, branding and SEO",
        url,
        provider: { "@id": BUSINESS_ID },
        areaServed: [
          { "@type": "Place", name: l.name },
          ...l.suburbs.map((s) => ({ "@type": "Place", name: s })),
        ],
        description: l.metaDescription,
      },
      { "@type": "FAQPage", mainEntity: l.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
      breadcrumbJsonLd([
        { name: "Home", url: SITE_URL },
        { name: "Areas", url: `${SITE_URL}/locations` },
        { name: l.name, url },
      ]),
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <LocationPage
        location={{ slug: l.slug, name: l.name, short: l.short, group: l.group, h1: l.h1, intro: l.intro, context: l.context, suburbs: l.suburbs, inPerson: l.inPerson, faqs: l.faqs }}
        services={services}
        work={work}
        nearby={nearby}
      />
    </>
  );
}
