import { Metadata } from "next";
import WorkIndex from "@/components/work/WorkIndex";
import { getWork, getDetails } from "@/lib/work";
import { projectSlug } from "@/lib/slug";
import { SITE_URL, OG_IMAGE, breadcrumbJsonLd, JsonLd } from "@/lib/seo";

const title = "Work | Websites, Apps, Brands & AI by Travis Weerts, Perth";
const description =
  "Selected projects by Perth designer and developer Travis Weerts: apps featured by Apple, websites for the UN, Olympics and Wendy's, and brands for local wineries, bars and startups.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${SITE_URL}/work` },
  openGraph: { title, description, url: `${SITE_URL}/work`, images: [OG_IMAGE], siteName: "Travis Weerts", locale: "en_AU", type: "website" },
};

export default function WorkPage() {
  const work = getWork().map((p) => ({
    slug: projectSlug(p),
    label: p.label,
    year: p.year,
    client: p.client,
    services: p.services,
    imageUrl: p.imageUrl,
    headline: getDetails(p)?.headline,
  }));
  return (
    <>
      <JsonLd
        data={{
          "@graph": [
            {
              "@type": "CollectionPage",
              "@id": `${SITE_URL}/work`,
              url: `${SITE_URL}/work`,
              name: title,
              mainEntity: {
                "@type": "ItemList",
                itemListElement: work.map((w, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE_URL}/work/${w.slug}`, name: w.label })),
              },
            },
            breadcrumbJsonLd([{ name: "Home", url: SITE_URL }, { name: "Work", url: `${SITE_URL}/work` }]),
          ],
        }}
      />
      <WorkIndex work={work} />
    </>
  );
}
