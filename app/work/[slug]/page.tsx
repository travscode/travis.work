import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectPage from "@/components/work/ProjectPage";
import { getWork, getProject, getDetails, plain } from "@/lib/work";
import { projectSlug } from "@/lib/slug";
import { SITE_URL, PERSON_ID, breadcrumbJsonLd, JsonLd } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getWork().map((p) => ({ slug: projectSlug(p) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const found = getProject(slug);
  if (!found) return { title: "Project not found" };
  const { project } = found;
  const details = getDetails(project);
  const description = (details?.intro || plain(project.notes || project.other)).slice(0, 158);
  const title = `${project.label}${project.client && !project.label.includes(project.client) ? ` for ${project.client}` : ""} | Travis Weerts`;
  const url = `${SITE_URL}/work/${slug}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, images: [`${SITE_URL}${project.imageUrl}`], type: "article", siteName: "Travis Weerts", locale: "en_AU" },
    twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}${project.imageUrl}`] },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const found = getProject(slug);
  if (!found) notFound();
  const { project, prev, next } = found;
  const details = getDetails(project);
  const url = `${SITE_URL}/work/${slug}`;
  const neighbour = (p: typeof prev) => ({ label: p.label, slug: projectSlug(p), imageUrl: p.imageUrl, services: p.services });

  const jsonLd = {
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#work`,
        name: project.label,
        url,
        image: `${SITE_URL}${project.imageUrl}`,
        description: details?.intro || plain(project.notes || project.other),
        creator: { "@id": PERSON_ID },
        dateCreated: project.year,
        ...(project.client ? { sourceOrganization: { "@type": "Organization", name: project.client } } : {}),
        keywords: project.services,
      },
      breadcrumbJsonLd([
        { name: "Home", url: SITE_URL },
        { name: "Work", url: `${SITE_URL}/work` },
        { name: project.label, url },
      ]),
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <ProjectPage
        project={{
          label: project.label,
          slug,
          year: project.year,
          date: project.date,
          client: project.client,
          agency: project.agency,
          agencyLink: project.agencyLink,
          link: project.link,
          linkLabel: project.linkLabel,
          services: project.services,
          imageUrl: project.imageUrl,
          videoUrl: project.videoUrl,
          notesHtml: project.notes || project.other,
        }}
        details={details}
        prev={neighbour(prev)}
        next={neighbour(next)}
      />
    </>
  );
}
