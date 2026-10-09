import type { Metadata } from "next";
import Header from "@/components/Header";
import ProjectGallery from "@/components/ProjectGallery";
import { projects } from "@/data/projects";
import { SITE_URL, PERSON_ID, JsonLd } from "@/lib/seo";
import { projectHref } from "@/lib/slug";

export const metadata: Metadata = {
  alternates: {
    canonical: SITE_URL,
  },
};

const paddingTop = 100;
export default function Home() {
  const work = projects.filter((p) => !p.useH1);
  return (
    <>
      <JsonLd
        data={{
          "@type": "ProfilePage",
          "@id": `${SITE_URL}/#home`,
          url: SITE_URL,
          name: "Travis Weerts, freelance web designer and app developer in Perth WA",
          mainEntity: { "@id": PERSON_ID },
          hasPart: {
            "@type": "ItemList",
            name: "Selected work",
            itemListElement: work.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${SITE_URL}${projectHref(p)}`,
              name: p.label,
            })),
          },
        }}
      />
      <div className="min-h-screen flex flex-col bg-t-black font-object-regular">
        <Header title="Travis Weerts Design" />
        <main className="flex-grow">
          <ProjectGallery projects={projects} paddingTop={paddingTop} />

        </main>
      </div>
    </>
  );
}
