import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import SiteFooter from "@/components/services/SiteFooter";
import { locations } from "@/data/locations";
import { SITE_URL, OG_IMAGE, breadcrumbJsonLd, JsonLd } from "@/lib/seo";

const title = "Areas I Work In | Perth, WA & Australia-Wide Web Design | Travis Weerts";
const description =
  "Freelance web design, app development, branding and SEO across Perth's suburbs, regional WA and Australia: Melbourne, Sydney, Brisbane, the Gold Coast and Adelaide.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${SITE_URL}/locations` },
  openGraph: { title, description, url: `${SITE_URL}/locations`, images: [OG_IMAGE], siteName: "Travis Weerts", locale: "en_AU", type: "website" },
};

export default function LocationsPage() {
  const groups = ["Perth", "Western Australia", "Australia"];
  return (
    <>
      <JsonLd
        data={{
          "@graph": [
            {
              "@type": "CollectionPage",
              "@id": `${SITE_URL}/locations`,
              url: `${SITE_URL}/locations`,
              name: title,
              mainEntity: { "@type": "ItemList", itemListElement: locations.map((l, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE_URL}/locations/${l.slug}`, name: l.name })) },
            },
            breadcrumbJsonLd([{ name: "Home", url: SITE_URL }, { name: "Areas", url: `${SITE_URL}/locations` }]),
          ],
        }}
      />
      <div className="grain min-h-screen bg-tw-white text-tw-black font-object-regular">
        <Header />
        <main className="px-5 md:px-10 pt-10 md:pt-36 pb-28">
          <nav aria-label="Breadcrumb" className="text-xs text-tw-black/60">
            <Link href="/" className="hover:text-tw-black">Home</Link> / <span className="text-tw-black">Areas</span>
          </nav>
          <h1 className="rise mt-8 font-object-heavy text-[12vw] md:text-[7vw] leading-[0.9] tracking-[-0.05em] max-w-[14ch]">
            Based in Perth. Working everywhere.
          </h1>
          <p className="rise mt-6 text-xl md:text-2xl leading-snug max-w-2xl text-tw-black/75" style={{ animationDelay: "0.2s" }}>
            I meet clients in person across Perth and work remotely with businesses in regional WA and
            right around Australia. Same craft, same direct line to me, wherever you are.
          </p>
          {groups.map((g) => (
            <section key={g} className="mt-20">
              <h2 className="font-mono text-xs uppercase tracking-[0.18em] opacity-50">{g}</h2>
              <ul className="mt-6 border-t border-tw-black">
                {locations.filter((l) => l.group === g).map((l) => (
                  <li key={l.slug}>
                    <Link href={`/locations/${l.slug}`} className="group relative grid grid-cols-12 gap-4 items-center py-6 md:py-8 border-b border-tw-black/20 overflow-hidden">
                      <span className="absolute inset-0 bg-tw-black origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                      <span className="relative col-span-12 md:col-span-5 font-object-heavy text-3xl md:text-5xl tracking-[-0.04em] group-hover:text-tw-white transition-colors">{l.name}</span>
                      <span className="relative col-span-11 md:col-span-6 text-sm text-tw-black/60 group-hover:text-tw-white/70 transition-colors">{l.suburbs.slice(0, 7).join(", ")}…</span>
                      <span className="relative col-span-1 flex justify-end group-hover:text-tw-white transition-colors">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
