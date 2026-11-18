import Link from "next/link";
import { getAllServices } from "@/data/services";
import { industries } from "@/data/industries";
import { locations } from "@/data/locations";
import FooterSitemap from "@/components/services/FooterSitemap";

export default function SiteFooter() {
  const all = getAllServices();
  const services = all.filter((s) => s.showInServices);
  const design = all.filter((s) => s.group === "design");
  const platforms = all.filter(
    (s) => !s.showInServices && s.group !== "design" && s.group !== "offer",
  );
  const year = new Date().getFullYear();

  return (
    <footer className="bg-tw-black text-tw-white px-5 md:px-10 pt-20 pb-10 border-t border-tw-white/10">
      <FooterSitemap
        pageCount={design.length + platforms.length + industries.length + locations.length}
        before={
          <>
            <div className="md:col-span-3">
              <div className="font-mono text-xs uppercase tracking-[0.18em] opacity-50">
                Travis Weerts
              </div>
              <p className="mt-4 text-sm leading-relaxed text-tw-white/70 max-w-xs">
                Award-winning digital designer, developer and creative consultant
                based in Perth, Western Australia. Working
                with businesses across Perth, Australia and worldwide.
              </p>
              <address className="mt-6 not-italic text-sm text-tw-white/70 leading-relaxed">
                Perth WA
                <br />
                Australia
              </address>
            </div>
            <LinkColumn label="Services" className="md:col-span-3" links={services.map((s) => ({ href: `/services/${s.slug}`, label: s.title }))} />
          </>
        }
        after={
          <nav aria-label="Elsewhere" className="md:col-span-3">
            <div className="font-mono text-xs uppercase tracking-[0.18em] opacity-50">Elsewhere</div>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                { href: "/about", label: "About" },
                { href: "/work", label: "Work" },
                { href: "/start", label: "Small business & startups" },
                { href: "/thoughts", label: "Thoughts" },
                { href: "/locations", label: "Areas I work in" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-tw-accent transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href="https://au.linkedin.com/in/travisweerts" target="_blank" rel="noopener noreferrer" className="hover:text-tw-accent transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://instagram.com/tr_____av" target="_blank" rel="noopener noreferrer" className="hover:text-tw-accent transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-tw-accent transition-colors">
                  Privacy
                </Link>
              </li>
            </ul>
          </nav>
        }
        columns={[
          <LinkColumn key="design" label="Graphic design" links={design.map((s) => ({ href: `/services/${s.slug}`, label: s.title }))} />,
          <LinkColumn key="platforms" label="Platforms & tech" links={platforms.map((s) => ({ href: `/services/${s.slug}`, label: s.title }))} />,
          <LinkColumn key="industries" label="Industries" links={industries.map((i) => ({ href: `/industries/${i.slug}`, label: i.name }))} />,
          <LinkColumn key="areas" label="Areas" links={locations.map((l) => ({ href: `/locations/${l.slug}`, label: l.name }))} />,
        ]}
      />

      <div className="mt-20 font-object-heavy text-[17vw] leading-[0.8] tracking-[-0.06em] text-[#1d1c1b] select-none" aria-hidden>
        travis.work
      </div>
      <div className="mt-6 flex flex-col md:flex-row justify-between gap-2 text-xs text-tw-white/50">
        <span>© {year} Travis Weerts. All rights reserved.</span>
        <span>Designed & built in the Perth Hills.</span>
      </div>
    </footer>
  );
}

function LinkColumn({
  label,
  links,
  className = "",
}: {
  label: string;
  links: { href: string; label: string }[];
  className?: string;
}) {
  return (
    <nav aria-label={label} className={className}>
      <div className="font-mono text-xs uppercase tracking-[0.18em] opacity-50">{label}</div>
      <ul className="mt-4 grid gap-y-2 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="hover:text-tw-accent transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
