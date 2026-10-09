import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import SiteFooter from "@/components/services/SiteFooter";
import AuthorCard from "@/components/thoughts/AuthorCard";
import { getPost, getPosts } from "@/lib/thoughts";
import { getService } from "@/data/services";
import { SITE_URL, OG_IMAGE, PERSON_ID, breadcrumbJsonLd, JsonLd } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not found" };
  const url = `${SITE_URL}/thoughts/${slug}`;
  const image = absolute(post.cover) || OG_IMAGE;
  return {
    title: { absolute: `${post.title} | Travis Weerts` },
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
      authors: ["Travis Weerts"],
      images: [image],
      siteName: "Travis Weerts",
      locale: "en_AU",
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description, images: [image] },
  };
}

// Covers can be local paths ("/assets/...") or full URLs (Medium CDN)
const absolute = (src?: string) => (src ? (src.startsWith("/") ? `${SITE_URL}${src}` : src) : undefined);

const fmt = (d: string) =>
  d ? new Date(d + "T00:00:00").toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" }) : "";

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const url = `${SITE_URL}/thoughts/${slug}`;
  const more = getPosts().filter((p) => p.slug !== slug).slice(0, 3);
  const services = post.services.map((s) => getService(s)).filter(Boolean) as NonNullable<ReturnType<typeof getService>>[];

  const jsonLd = {
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.date,
        url,
        mainEntityOfPage: url,
        image: absolute(post.cover) || OG_IMAGE,
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
        keywords: post.tags.join(", "),
        inLanguage: "en-AU",
      },
      ...(post.faqs.length
        ? [{ "@type": "FAQPage", mainEntity: post.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }]
        : []),
      breadcrumbJsonLd([
        { name: "Home", url: SITE_URL },
        { name: "Thoughts", url: `${SITE_URL}/thoughts` },
        { name: post.title, url },
      ]),
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="grain min-h-screen bg-tw-white text-tw-black font-object-regular selection:bg-tw-black selection:text-tw-white">
        <Header />
        <main className="px-5 md:px-10 pt-10 md:pt-36 pb-24">
          <article className="max-w-3xl mx-auto">
            <nav aria-label="Breadcrumb" className="text-xs text-tw-black/60">
              <Link href="/" className="hover:text-tw-black">Home</Link> /{" "}
              <Link href="/thoughts" className="hover:text-tw-black">Thoughts</Link>
            </nav>
            <div className="rise mt-10 font-mono text-xs uppercase tracking-[0.18em] opacity-60" style={{ animationDelay: "0.05s" }}>
              <time dateTime={post.date}>{fmt(post.date)}</time> · {post.readingMinutes} min read
            </div>
            <h1 className="rise mt-5 font-object-heavy text-5xl md:text-7xl leading-[0.95] tracking-[-0.045em]" style={{ animationDelay: "0.12s" }}>
              {post.title}
            </h1>
            {post.description && (
              <p className="rise mt-6 text-xl md:text-2xl leading-snug text-tw-black/75" style={{ animationDelay: "0.25s" }}>
                {post.description}
              </p>
            )}
          </article>

          {post.cover && (
            <div className="rise mt-12 max-w-5xl mx-auto" style={{ animationDelay: "0.35s" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.cover} alt="" className="w-full rounded-[28px] max-h-[70vh] object-cover" />
            </div>
          )}

          <div className="max-w-3xl mx-auto">
            <div className="prose-tw mt-14">
              <div dangerouslySetInnerHTML={{ __html: post.html }} />
            </div>

            {post.faqs.length > 0 && (
              <section className="mt-16">
                <h2 className="font-object-heavy text-3xl md:text-4xl tracking-[-0.035em]">Quick answers</h2>
                <dl className="mt-6 border-t border-tw-black/15">
                  {post.faqs.map((f) => (
                    <div key={f.q} className="py-6 border-b border-tw-black/15">
                      <dt className="font-object-bold text-xl tracking-[-0.02em]">{f.q}</dt>
                      <dd className="mt-3 text-lg leading-relaxed text-tw-black/75">{f.a}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            {services.length > 0 && (
              <section className="mt-16">
                <div className="font-mono text-xs uppercase tracking-[0.18em] opacity-50">Related services</div>
                <div className="mt-4 flex flex-wrap gap-3">
                  {services.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} className="rounded-full border border-tw-black px-5 py-2.5 text-sm font-object-bold hover:bg-tw-black hover:text-tw-white transition-colors">
                      {s.title} →
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {post.tags.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <span key={t} className="rounded-full bg-tw-black/5 px-3 py-1 text-xs">#{t}</span>
                ))}
              </div>
            )}

            <AuthorCard />
          </div>

          {more.length > 0 && (
            <section className="mt-24 max-w-6xl mx-auto">
              <div className="font-mono text-xs uppercase tracking-[0.18em] opacity-50">Keep reading</div>
              <ul className="mt-6 grid md:grid-cols-3 gap-5">
                {more.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/thoughts/${p.slug}`} className="group block">
                      <div className="aspect-[16/10] rounded-[20px] overflow-hidden bg-tw-black">
                        {p.cover && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={p.cover} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        )}
                      </div>
                      <h3 className="mt-4 font-object-bold text-xl leading-tight tracking-[-0.02em] group-hover:underline underline-offset-4">{p.title}</h3>
                      <p className="mt-1 text-xs text-tw-black/55">{fmt(p.date)} · {p.readingMinutes} min</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
