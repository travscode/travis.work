import { getProject, getDetails } from "@/lib/work";
import { ogCard, localImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Project by Travis Weerts";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const found = getProject(slug);
  if (!found) return ogCard({ kicker: "Work", title: "Travis Weerts" });
  const { project } = found;
  const details = getDetails(project);
  return ogCard({
    kicker: [project.year, project.client].filter(Boolean).join(" · "),
    title: project.label,
    subtitle: details?.headline,
    image: localImage(project.imageUrl),
    dark: true,
  });
}
