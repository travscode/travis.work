import { getAllServices } from "@/data/services";
import { SITE_URL } from "@/lib/seo";
import { getPosts } from "@/lib/thoughts";
import { locations } from "@/data/locations";
import { industries } from "@/data/industries";

// llms.txt — a plain-language summary for AI assistants and answer engines.
export const dynamic = "force-static";

export function GET() {
  const services = getAllServices();

  const body = `# Travis Weerts

> Award-winning digital designer, developer and creative consultant based in Perth, Western Australia. Designs and builds websites, apps, brands and AI products for businesses in Perth, across Australia and worldwide.

- Work featured by Apple; recognised at Cannes Lions, D&AD, The One Show, Spike Awards and AWARD Awards.
- Clients and collaborators include Google, the United Nations, Wendy's, the Australian Open, HBF, VML and Wunderman Thompson.
- Creative Developer & Designer at IOOKI Labs (named a Top 5 AI startup in Australia).
- Works directly with clients end to end — strategy, design, development and launch.
- Contact: ${SITE_URL} (contact form), LinkedIn: https://au.linkedin.com/in/travisweerts

## Services

${services
  .map(
    (s) =>
      `- [${s.title}](${SITE_URL}/services/${s.slug}): ${s.metaDescription} ${s.pricing.starting ? `From ${s.pricing.starting} AUD` : "Custom quote after a free consult"}; ${s.pricing.timeline}. Monthly payment plans available.`,
  )
  .join("\n")}

## Guides and articles

${getPosts()
  .map((p) => `- [${p.title}](${SITE_URL}/thoughts/${p.slug}): ${p.description}`)
  .join("\n")}

## Areas served

${locations.map((l) => `- [${l.name}](${SITE_URL}/locations/${l.slug}): ${l.suburbs.join(", ")}`).join("\n")}

## Industries

${industries.map((i) => `- [${i.name}](${SITE_URL}/industries/${i.slug}): ${i.metaDescription}`).join("\n")}

## Pages

- [Portfolio / selected work](${SITE_URL}/)
- [All services](${SITE_URL}/services)
- [Thoughts (articles)](${SITE_URL}/thoughts)
- [Small business & startups](${SITE_URL}/start)
- [Contact](${SITE_URL}/contact)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
