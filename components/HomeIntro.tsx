import Link from "next/link";

// Plain-text summary under the gallery. Gives search engines and AI answer
// engines a clear, quotable statement of who Travis is, what he does and where.
const LINKS = [
  { href: "/services/web-design", label: "Web designer Perth" },
  { href: "/services/web-development", label: "Web developer Perth" },
  { href: "/services/app-development", label: "App developer Perth" },
  { href: "/services/freelance-app-developer", label: "Freelance app developer Perth" },
  { href: "/services/ios-app-development", label: "iOS app developer Perth" },
  { href: "/services/android-app-development", label: "Android app developer Perth" },
  { href: "/services/react-native", label: "React Native developer Perth" },
  { href: "/services/ui-ux", label: "UI/UX designer Perth" },
  { href: "/services/graphic-design", label: "Graphic designer Perth" },
  { href: "/services/brand", label: "Branding Perth" },
];

export default function HomeIntro() {
  return (
    <section
      aria-labelledby="home-intro-heading"
      className="bg-tw-black text-tw-white px-5 md:px-10 py-20 md:py-28 border-t border-tw-white/10"
    >
      <div className="grid md:grid-cols-12 gap-10">
        <div className="md:col-span-7">
          <div className="font-mono text-xs uppercase tracking-[0.18em] opacity-50">
            Perth WA · Available for freelance projects
          </div>
          <h2
            id="home-intro-heading"
            className="mt-5 text-3xl md:text-5xl leading-tight font-object-bold"
          >
            Freelance web designer and app developer in Perth
          </h2>
          <p className="mt-6 text-base md:text-lg leading-relaxed text-tw-white/75 max-w-2xl">
            Travis Weerts is a freelance web designer, web developer and iOS and
            Android app developer in Perth, Western Australia. He designs and
            builds websites, mobile apps, brands and AI products for businesses
            across Perth, from the CBD and Fremantle to Joondalup, Rockingham
            and the Perth Hills, and works remotely with clients Australia wide.
          </p>
          <p className="mt-4 text-base md:text-lg leading-relaxed text-tw-white/75 max-w-2xl">
            His app Mystic was featured by Apple worldwide, and the Hunter
            Markets app he designed and built for iOS and Android reached #5 in
            Shopping on the Australian App Store. Past clients and collaborators
            include Google, the United Nations and Wendy&apos;s, with work
            recognised at Cannes Lions, D&amp;AD and The One Show.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 text-sm">
            <Link href="/contact" className="underline hover:text-tw-accent">
              Start a project
            </Link>
            <Link href="/about" className="underline hover:text-tw-accent">
              About Travis
            </Link>
            <Link href="/work" className="underline hover:text-tw-accent">
              See the work
            </Link>
          </div>
        </div>
        <nav aria-label="Services in Perth" className="md:col-span-4 md:col-start-9">
          <div className="font-mono text-xs uppercase tracking-[0.18em] opacity-50">
            Services
          </div>
          <ul className="mt-5 space-y-2 text-sm">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-tw-white/75 hover:text-tw-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
