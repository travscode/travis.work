import { getPost } from "@/lib/thoughts";
import { ogCard, localImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Article by Travis Weerts";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return ogCard({ kicker: "Thoughts", title: "Travis Weerts" });
  return ogCard({
    kicker: `Thoughts · ${post.readingMinutes} min read`,
    title: post.title,
    image: localImage(post.cover),
  });
}
