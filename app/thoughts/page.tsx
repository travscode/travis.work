import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import SiteFooter from "@/components/services/SiteFooter";
import { getPosts } from "@/lib/thoughts";
import { SITE_URL, breadcrumbJsonLd, JsonLd } from "@/lib/seo";

const title = "Thoughts | Web Design, SEO & AI Articles by Travis Weerts";
const description =
  "Articles from Perth designer and developer Travis Weerts on web design, SEO, AI search, app development, creative technology and running a small business online.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${SITE_URL}/thoughts` },
  openGraph: { title, description, url: `${SITE_URL}/thoughts`, siteName: "Travis Weerts", locale: "en_AU", type: "website" },
};

const fmt = (d: string) =>
  d ? new Date(d + "T00:00:00").toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" }) : "";

export default function ThoughtsPage() {
  const posts = getPosts();
  const [lead, ...rest] = posts;
  return (
    <>
      <JsonLd
        data={{
          "@graph": [
            {
              "@type": "Blog",
              "@id": `${SITE_URL}/thoughts`,
              url: `${SITE_URL}/thoughts`,
              name: "Thoughts by Travis Weerts",
              description,
              blogPost: posts.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `${SITE_URL}/thoughts/${p.slug}`, datePublished: p.date })),
            },
            breadcrumbJsonLd([{ name: "Home", url: SITE_URL }, { name: "Thoughts", url: `${SITE_URL}/thoughts` }]),
          ],
        }}
      />
      <div className="grain min-h-screen bg-tw-white text-tw-black font-object-regular">
        <Header />
        <main className="px-5 md:px-10 pt-10 md:pt-36 pb-28">
          <nav aria-label="Breadcrumb" className="text-xs text-tw-black/60">
            <Link href="/" className="hover:text-tw-black">Home</Link> / <span className="text-tw-black">Thoughts</span>
          </nav>
          <h1 className="rise mt-8 font-object-heavy text-[13vw] md:text-[8vw] leading-[0.88] tracking-[-0.05em]">Thoughts.</h1>
          <p className="rise mt-6 text-xl md:text-2xl leading-snug max-w-2xl text-tw-black/75" style={{ animationDelay: "0.2s" }}>
            Notes on design, code, AI and getting found online. Practical guides for small businesses,
            plus the odd experiment that got out of hand.
          </p>

          {lead && (
            <Link href={`/thoughts/${lead.slug}`} className="group mt-16 grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 aspect-[16/10] rounded-[28px] overflow-hidden bg-tw-black">
                {lead.cover && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={lead.cover} alt="" className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
                )}
              </div>
              <div className="lg:col-span-5">
                <div className="font-mono text-xs uppercase tracking-[0.18em] opacity-60">Latest · {fmt(lead.date)}</div>
                <h2 className="mt-4 font-object-heavy text-4xl md:text-6xl leading-[0.95] tracking-[-0.045em] group-hover:underline underline-offset-8 decoration-4">{lead.title}</h2>
                <p className="mt-4 text-lg leading-snug text-tw-black/70">{lead.description}</p>
              </div>
            </Link>
          )}

          <ul className="mt-20 border-t border-tw-black">
            {rest.map((p) => (
              <li key={p.slug}>
                <Link href={`/thoughts/${p.slug}`} className="group relative grid grid-cols-12 gap-4 items-center py-7 border-b border-tw-black/20 overflow-hidden">
                  <span className="absolute inset-0 bg-tw-black origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                  <span className="relative col-span-12 md:col-span-2 font-mono text-xs opacity-60 group-hover:text-tw-white transition-colors">{fmt(p.date)}</span>
                  <h2 className="relative col-span-12 md:col-span-7 font-object-bold text-2xl md:text-3xl tracking-[-0.03em] leading-tight group-hover:text-tw-white transition-colors">{p.title}</h2>
                  <span className="relative hidden md:block md:col-span-2 text-sm text-tw-black/55 group-hover:text-tw-white/70 transition-colors">{p.readingMinutes} min read</span>
                  <span className="relative hidden md:flex md:col-span-1 justify-end group-hover:text-tw-white transition-colors">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
