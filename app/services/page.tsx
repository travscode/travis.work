import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import { getAllServices } from "@/data/services";

export const metadata: Metadata = {
  title: "Services | Travis Weerts Design",
  description:
    "Professional design and development services in Perth Hills. Web design, app development, SEO, branding, and more.",
  alternates: {
    canonical: "https://travis.work/services",
  },
};

export default function ServicesPage() {
  const services = getAllServices();

  return (
    <div className="min-h-screen bg-t-black text-t-white font-object-regular">
      <Header title="Services" />

      <section
        className="pt-10 pb-0 px-8 bg-cover"
        style={{
          backgroundImage: `url(/assets/media/static2.gif)`,
        }}
      >
        <div className="max-w-full mx-auto  pt-20">
          <div className="flex flex-col items-start justify-start py-10 text-tw-white">
            <h1 className="text-2xl md:text-5xl font-object-bold mb-8 text-left">
              <span className="font-crt text-9xl uppercase animate-pulse">
                1-800-Creative-Help
              </span>
            </h1>
            <p className="text-sm text-t-gray mb-16 text-left max-w-3xl bg-tw-black">
              I design geniune experiences that help brands stand out and
              connect with people — blending creativity with purposeful
              innovation. From the first sketch to the final launch, I offer
              end-to-end design and development creative services to bring your
              idea to life and set it up for success.
            </p>
          </div>
        </div>
      </section>
      <section className="pt-32 pb-20 px-8">
        <div className="max-w-full mx-auto">
          {services && (
            <div className="info_block py-8 whitespace-normal flex flex-wrap gap-2">
              {services.map((service, index) => (
                <h2
                  key={index}
                  className="tag rounded-full border p-1 px-3 inline border-tw-white"
                >
                  {service.tag}
                </h2>
              ))}
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Link
                key={index}
                href={`/services/${service.slug}`}
                className="group bg-t-gray-dark p-1 hover:bg-t-accent hover:text-t-black transition-all duration-300 pb-10"
              >
                <Image
                  src={`/assets/media/${service.images.square}`}
                  alt={service.title}
                  width={300}
                  height={300}
                  className="w-full aspect-square hover:opacity-80"
                />
                <h2 className="text-lg font-object-bold mt-2  group-hover:text-t-black">
                  {service.title}
                </h2>
                <p className="text-t-gray group-hover:text-t-black mb-6 leading-relaxed text-xs">
                  {service.hero.subheadline}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-object-bold group-hover:text-t-black">
                    From {service.pricing.starting}
                  </span>
                  <span className="text-xl group-hover:text-t-black">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
