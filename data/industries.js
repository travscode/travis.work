// Niche landing pages: /industries/[slug]. Same layout as location pages.
// `suburbs` here is reused as the ticker of what every site includes.

export const industries = [
  {
    slug: "websites-for-tradies",
    name: "Websites for Tradies",
    short: "tradies",
    group: "Industries",
    metaTitle: "Websites for Tradies | Perth WA & Australia-Wide",
    metaDescription:
      "Affordable websites for tradies in Perth WA and Australia: builders, electricians, plumbers and landscapers. Fast, mobile-first sites that make the phone ring.",
    h1: "Websites for tradies that make the phone ring.",
    intro:
      "You're on the tools all day, not writing website copy. I build fast, mobile-first websites for builders, electricians, plumbers, landscapers and cleaners that show what you do, where you work and why people should call you, then help you get found on Google.",
    context:
      "Most customers find a tradie on their phone, often in a hurry. They want to see your services, your work, your reviews and a big button to call. That's exactly what I design for, with local SEO and a properly set-up Google Business Profile so you show up when it counts.",
    suburbs: ["Tap-to-call buttons", "Service area pages", "Photo galleries of your jobs", "Google reviews", "Quote request forms", "Google Business Profile setup", "Fast mobile pages", "Local SEO"],
    work: ["Space Collective", "DUET", "Hunter Markets"],
    focus: ["web-design", "seo", "wordpress", "squarespace"],
    inPerson: false,
    cta: "Let's get your phone ringing.",
    faqs: [
      { q: "How much does a website for a tradie cost?", a: "Simple, effective tradie websites start from around $1,500 with a fixed quote. Monthly payment plans are available so you can get online without a big upfront cost." },
      { q: "Do I need a website if I already get work from word of mouth?", a: "Even referrals look you up before they call. A professional site with your work and reviews builds trust and helps new customers find you on Google." },
      { q: "Can you help me show up on Google Maps?", a: "Yes. I set up and optimise your Google Business Profile, service area and reviews strategy, and build pages for the areas you actually work in." },
      { q: "Will I be able to update it myself?", a: "Yes. I'll set it up so adding job photos or changing your services takes a couple of minutes, and I'm a phone call away if you get stuck." },
    ],
  },
  {
    slug: "websites-for-allied-health",
    name: "Websites for Psychologists & Allied Health",
    short: "allied health",
    group: "Industries",
    metaTitle: "Website Design for Psychologists & Allied Health | Australia",
    metaDescription:
      "Calm, trustworthy websites for psychologists, physios, dietitians and allied health practices across Australia. Online booking, clear services, local SEO.",
    h1: "Calm, trustworthy websites for psychologists and allied health.",
    intro:
      "When someone is looking for a psychologist, physio or dietitian, they're often anxious, in pain or unsure where to start. Your website should feel like a deep breath: clear, warm and easy to book from. That's what I design.",
    context:
      "I've spent years designing digital experiences for health, from UI/UX work on HBF's member-facing digital transformation to small independent practices. The same principles apply: make it easy to understand, easy to trust and easy to take the next step.",
    suburbs: ["Online booking integration", "Clear practitioner profiles", "Services and fees pages", "Accessible, calming design", "Telehealth information", "Mobile-first layout", "Local SEO", "Google Business Profile setup"],
    work: ["HBF / Digital Transformation", "DUET", "Space Collective"],
    focus: ["web-design", "seo", "ui-ux", "squarespace"],
    inPerson: false,
    cta: "Let's make booking feel easy.",
    faqs: [
      { q: "Can you integrate my booking system?", a: "Yes. I work with common practice booking and management systems and make sure booking is obvious and easy on every page." },
      { q: "How do you handle sensitive health content?", a: "Carefully. Clear, plain language, accessible design and no unnecessary tracking. I'll also help you keep claims and testimonials within professional advertising guidelines." },
      { q: "Can you help a new practice get found locally?", a: "Yes. Local SEO, a well-set-up Google Business Profile and clear service pages help new practices appear when people search nearby." },
    ],
  },
  {
    slug: "winery-website-design",
    name: "Winery Website & Label Design",
    short: "wineries",
    group: "Industries",
    metaTitle: "Winery Website Design & Wine Label Branding | Australia",
    metaDescription:
      "Winery website design, wine label branding and online wine shops for Australian wineries. Behind brands for Fervor, Skigh Wine's Coda range and Cirillo Estate.",
    h1: "Websites, labels and brands for wineries.",
    intro:
      "A great wine deserves a label people pick up and a website that makes them want to visit, join the club or order a case. I design both, so your brand feels the same on the shelf, at the cellar door and online.",
    context:
      "Wine is one of my favourite things to work on. I named and branded Fervor in Denmark, WA, redesigned the Coda range for Skigh Wine in Margaret River, and designed in-store displays for Cirillo Estate in the Barossa, custodians of some of the world's oldest Grenache vines.",
    suburbs: ["Wine label design", "Brand identity and naming", "Online wine shop", "Wine club sign-ups", "Cellar door bookings", "Age-gated checkout", "Packaging and point of sale", "Tourism SEO"],
    work: ["Fervor", "CODA", "Cirillo 1850 Estate"],
    focus: ["brand", "web-design", "shopify", "graphic-design"],
    inPerson: false,
    cta: "Let's make something worth pouring.",
    faqs: [
      { q: "Do you design wine labels as well as websites?", a: "Yes. Labels, packaging, in-store displays and the website, so everything feels like one brand." },
      { q: "Can you set up online wine sales?", a: "Yes. I build Shopify and WooCommerce wine shops with wine clubs, age gates and shipping rules, or integrate with wine-specific platforms you already use." },
      { q: "Do you work with wineries outside Perth?", a: "Yes. I've worked with wineries in the Great Southern, Margaret River and the Barossa, mostly remotely." },
    ],
  },
];

export const getIndustry = (slug) => industries.find((i) => i.slug === slug) || null;
