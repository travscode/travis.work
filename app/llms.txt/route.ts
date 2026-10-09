import { getAllServices } from "@/data/services";
import { SITE_URL } from "@/lib/seo";

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

## Pages

- [Portfolio / selected work](${SITE_URL}/)
- [All services](${SITE_URL}/services)
- [Writing on Medium](https://medium.com/@travisaweerts)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
