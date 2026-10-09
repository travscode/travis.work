import { Metadata } from "next";
import PaintLanding from "@/components/paint/PaintLanding";
import { SITE_URL, PERSON_ID, breadcrumbJsonLd, JsonLd } from "@/lib/seo";
import { faqs } from "@/data/paint";

const url = `${SITE_URL}/paint`;
const title = "Paint With Our Minds | AI Art Activation for Events";
const description =
  "Book a live AI painting for your event. Guests talk to it from their phones and it paints the crowd's mood in real time. Perth and Australia-wide.";
const image = `${SITE_URL}/assets/media/paint_with_your_mind_by_travis_weerts.jpg`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: "website", siteName: "Travis Weerts", locale: "en_AU", images: [image] },
  twitter: { card: "summary_large_image", title, description, images: [image] },
};

export default function PaintPage() {
  const jsonLd = {
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: "Paint With Our Minds",
        serviceType: "Interactive AI art activation",
        url,
        image,
        description,
        provider: { "@id": PERSON_ID },
        areaServed: [{ "@type": "City", name: "Perth" }, { "@type": "Country", name: "Australia" }],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      breadcrumbJsonLd([
        { name: "Home", url: SITE_URL },
        { name: "Paint With Our Minds", url },
      ]),
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PaintLanding />
    </>
  );
}
