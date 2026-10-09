import Link from "next/link";
import { getAllServices } from "@/data/services";

export default function SiteFooter() {
  const all = getAllServices();
  const services = all.filter((s) => s.showInServices);
  const platforms = all.filter((s) => !s.showInServices);
  const year = new Date().getFullYear();

  return (
    <footer className="bg-tw-black text-tw-white px-5 md:px-10 pt-20 pb-10 border-t border-tw-white/10">
      <div className="grid md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
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

        <nav aria-label="Services" className="md:col-span-3">
          <div className="font-mono text-xs uppercase tracking-[0.18em] opacity-50">Services</div>
          <ul className="mt-4 grid gap-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="hover:text-tw-accent transition-colors"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Platforms" className="md:col-span-2">
          <div className="font-mono text-xs uppercase tracking-[0.18em] opacity-50">Platforms</div>
          <ul className="mt-4 grid gap-y-2 text-sm">
            {platforms.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="hover:text-tw-accent transition-colors"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <div className="font-mono text-xs uppercase tracking-[0.18em] opacity-50">Elsewhere</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/work" className="hover:text-tw-accent transition-colors">
                Work
              </Link>
            </li>
            <li>
              <Link href="/start" className="hover:text-tw-accent transition-colors">
                Small business & startups
              </Link>
            </li>
            <li>
              <a
                href="https://medium.com/@travisaweerts"
                className="hover:text-tw-accent transition-colors"
              >
                Thoughts (Medium)
              </a>
            </li>
            <li>
              <a
                href="https://au.linkedin.com/in/travisweerts"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-tw-accent transition-colors"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/tr_____av"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-tw-accent transition-colors"
              >
                Instagram
              </a>
            </li>
            <li>
              <Link
                href="/privacy"
                className="hover:text-tw-accent transition-colors"
              >
                Privacy
              </Link>
            </li>
          </ul>
        </div>
      </div>

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
