"use client";

import { FC, useState } from "react";
import Header from "./Header";
import ContactModal from "./ContactModal";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Service {
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  images: {
    header: string;
    bg: string;
    feature: string;
    trust: string;
    square: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    description: string;
    cta: string;
  };
  benefits: Array<{
    title: string;
    description: string;
  }>;
  process: Array<{
    step: number;
    title: string;
    description: string;
  }>;
  features: string[];
  pricing: {
    starting: string;
    timeline: string;
  };
}

interface ServiceTemplateProps {
  service: Service;
}

const ServiceTemplate: FC<ServiceTemplateProps> = ({ service }) => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const clientLogos = [
    { name: "United Nations", logo: "/assets/logos/un.svg" },
    { name: "Google", logo: "/assets/logos/google.svg" },
    { name: "Apple", logo: "/assets/logos/apple.svg" },
    { name: "VML", logo: "/assets/logos/vml.svg" },
    { name: "Wunderman Thompson", logo: "/assets/logos/wt.svg" },
  ];

  const testimonials = [
    {
      quote:
        "Travis delivered exceptional work that exceeded our expectations. His attention to detail and creative approach made all the difference.",
      author: "Sarah Johnson",
      company: "Tech Startup Perth",
      role: "CEO",
    },
    {
      quote:
        "Working with Travis was a game-changer for our business. The results speak for themselves - our conversion rate increased by 40%.",
      author: "Michael Chen",
      company: "E-commerce Solutions",
      role: "Marketing Director",
    },
    {
      quote:
        "Professional, creative, and results-driven. Travis understands both design and business objectives perfectly.",
      author: "Emma Wilson",
      company: "Local Business Perth",
      role: "Founder",
    },
  ];

  return (
    <div className="min-h-screen bg-t-black text-t-white font-object-regular">
      <Header title={service.title} />

      {/* Hero Section with Header Image */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={`/assets/media/${service.images.header}`}
            alt={service.hero.headline}
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-t-black/50 via-t-black/70 to-t-black"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-object-heavy mb-6 leading-tight">
            {service.hero.headline}
          </h1>
          <p className="text-xl md:text-2xl text-t-gray mb-8 max-w-3xl mx-auto">
            {service.hero.subheadline}
          </p>
          <p className="text-lg text-t-gray mb-12 max-w-2xl mx-auto leading-relaxed">
            {service.hero.description}
          </p>
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="bg-t-accent text-t-black px-8 py-4 text-lg font-object-bold hover:bg-t-white transition-colors duration-300 inline-flex items-center gap-2"
          >
            {service.hero.cta}
            <span className="text-xl">→</span>
          </button>
        </div>
      </section>

      {/* Trust Indicators with Trust Image */}
      <section className="relative py-16 px-4 border-t border-t-gray-dark overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={`/assets/media/${service.images.trust}`}
            alt="Trusted by industry leaders"
            fill
            className="object-cover opacity-10"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <p className="text-center text-t-gray mb-12 font-object-bold uppercase tracking-wider">
            Trusted by Industry Leaders
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-60">
            {clientLogos.map((client, index) => (
              <div key={index} className="text-center">
                <div className="h-12 flex items-center justify-center">
                  <span className="text-t-gray font-object-bold text-sm">
                    {client.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-object-heavy mb-16 text-center">
            Why Choose This Service?
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {service.benefits.map((benefit, index) => (
              <div key={index} className="">
                <h3 className="text-2xl font-object-bold mb-4 text-t-accent">
                  {benefit.title}
                </h3>
                <p className="text-t-gray leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Showcase Section with Feature Image */}
      <section className="relative py-20 px-4 bg-t-gray-dark overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={`/assets/media/${service.images.feature}`}
            alt="Service features showcase"
            fill
            className="object-cover opacity-15"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-object-heavy mb-8">
                What's Included
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-t-accent rounded-full flex-shrink-0"></div>
                    <span className="text-t-gray">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square relative rounded-lg overflow-hidden">
                <Image
                  src={`/assets/media/${service.images.square}`}
                  alt={`${service.title} showcase`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-object-heavy mb-16 text-center">
            My Process
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-t-accent text-t-black rounded-full flex items-center justify-center text-2xl font-object-bold mx-auto mb-6">
                  {step.step}
                </div>
                <h3 className="text-xl font-object-bold mb-4">{step.title}</h3>
                <p className="text-t-gray leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-t-gray-dark">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-object-heavy mb-16 text-center">
            Client Success Stories
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-t-black p-8 border border-t-gray-dark"
              >
                <p className="text-t-gray mb-6 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-object-bold text-t-white">
                    {testimonial.author}
                  </p>
                  <p className="text-t-gray text-sm">{testimonial.role}</p>
                  <p className="text-t-gray text-sm">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing & CTA Section with Background Image */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={`/assets/media/${service.images.bg}`}
            alt="Get started background"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-t-black via-t-black/80 to-t-black/60"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-object-heavy mb-8">
            Ready to Get Started?
          </h2>
          <div className="bg-t-gray-dark/80 backdrop-blur-sm p-8 mb-12 inline-block border border-t-gray-dark">
            <p className="text-t-gray mb-2">Starting from</p>
            <p className="text-4xl font-object-bold text-t-accent mb-2">
              {service.pricing.starting}
            </p>
            <p className="text-t-gray">{service.pricing.timeline}</p>
          </div>
          <p className="text-xl text-t-gray mb-12 max-w-2xl mx-auto">
            Let's discuss your project and create something amazing together.
            Get in touch for a free consultation.
          </p>
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="bg-t-accent text-t-black px-12 py-4 text-xl font-object-bold hover:bg-t-white transition-colors duration-300 inline-flex items-center gap-3"
          >
            Start Your Project
            <span className="text-2xl">→</span>
          </button>
        </div>
      </section>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
};

export default ServiceTemplate;
