// Service pages content. Each entry renders /services/[slug].
// Copy is written for people first, search engines second — keep the primary
// keyword in metaTitle, h1 and the first paragraph, then just talk like a human.
//
// visual: which abstract animation the hero uses
//   "browser" | "search" | "answer" | "phone" | "grid" | "neural" | "compose" | "flow"
// relatedWork: project labels from data/projects.js
// related: other service slugs to cross-link

export const services = {
  "web-design": {
    title: "Web Design Perth",
    slug: "web-design",
    tag: "Web Design",
    showInServices: true,
    visual: "browser",
    metaTitle: "Web Design Perth WA | Freelance, Affordable & Award-Winning",
    metaDescription:
      "Custom web design in Perth by an award-winning designer and developer. Fast, beautiful, SEO-ready websites that turn visitors into enquiries. Free 30-min chat.",
    h1: "Web design in Perth that actually brings in work.",
    kicker: "Websites · Perth & Perth Hills",
    images: { square: "services/web-design-perth-travis-weerts.jpg" },
    hero: {
      headline: "Web design in Perth that actually brings in work.",
      subheadline:
        "Beautiful, fast websites that turn curious visitors into real enquiries.",
      description:
        "I design and build custom websites for Perth businesses, startups and global brands — the same hands that have shipped work for Google, the United Nations and Wendy's. No templates, no hand-offs to a junior, no 40-page proposals.",
      cta: "Start your website",
    },
    story:
      "Most websites fail quietly. They look fine, they cost a lot, and nobody calls. I start the other way around — with the one thing you need a visitor to do — and design everything to make that feel obvious. Then I build it properly, so it loads fast, ranks well and doesn't fall over when you want to change a headline.",
    benefits: [
      {
        title: "Designed to convert",
        description:
          "Every section has a job. Clear messaging, honest proof and calls-to-action placed where people are actually ready to act.",
      },
      {
        title: "Fast on every device",
        description:
          "Mobile-first, image-optimised and built on modern frameworks, so pages load in a blink and Google rewards you for it.",
      },
      {
        title: "SEO from day one",
        description:
          "Clean semantic structure, schema markup, metadata and site speed baked in — not bolted on after launch.",
      },
      {
        title: "Yours to run",
        description:
          "A CMS you'll actually enjoy using, a walkthrough on launch day, and a direct line to me when you need a hand.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Discover",
        description:
          "A relaxed chat about your business, your customers and what a win looks like. I'll do the homework on your competitors.",
      },
      {
        step: 2,
        title: "Design",
        description:
          "Structure and wireframes first, then full visual design. You see real pages, not mood boards, and we iterate together.",
      },
      {
        step: 3,
        title: "Build",
        description:
          "Hand-built in Next.js or WordPress, tested across devices, tuned for speed, accessibility and search.",
      },
      {
        step: 4,
        title: "Launch & grow",
        description:
          "Go-live, analytics, Search Console and a training session. Then optional ongoing care, SEO and improvements.",
      },
    ],
    features: [
      "Custom design",
      "Responsive build",
      "CMS integration",
      "On-page SEO",
      "Schema markup",
      "Speed optimisation",
      "Analytics & Search Console",
      "Copywriting support",
      "Hosting setup",
      "Launch training",
    ],
    pricing: { starting: "$1,500", timeline: "2–4 weeks" },
    faqs: [
      {
        q: "How much does a website cost in Perth?",
        a: "It depends on what you need — a few focused pages is a very different job to a custom web app. Smaller sites start from around $1,500. After a free chat I'll give you a fixed quote, and you can spread the cost over monthly payments if that's easier.",
      },
      {
        q: "How long does it take to build a website?",
        a: "A typical brochure website takes 2–4 weeks from kickoff to launch. Bigger sites with custom functionality usually take 6–10 weeks. The biggest variable is usually content, so I'll help you plan that early.",
      },
      {
        q: "Do you only work with businesses in the Perth Hills?",
        a: "Not at all. I'm based in Perth and work with businesses all over Perth and WA, plus clients across Australia and overseas. Happy to meet in person if you're local.",
      },
      {
        q: "Will my website be optimised for Google?",
        a: "Yes. Every site ships with technical SEO foundations — fast load times, semantic HTML, metadata, schema markup, an XML sitemap and Google Search Console set up. Ongoing SEO campaigns are available separately.",
      },
      {
        q: "Can I update the website myself?",
        a: "Absolutely. I build on a CMS that suits you — usually WordPress or a headless CMS — and walk you through it on launch day so you can edit pages, add posts and swap images without calling anyone.",
      },
    ],
    relatedWork: ["Wendy's Hamburgers", "DUET", "The Raveonettes"],
    related: ["ui-ux", "seo", "wordpress", "brand"],
  },

  brand: {
    title: "Branding Perth",
    slug: "brand",
    tag: "Brand + Design",
    showInServices: true,
    visual: "grid",
    metaTitle: "Branding Agency Perth WA | Logo & Brand Identity Design",
    metaDescription:
      "Brand identity and logo design in Perth from an award-winning designer. Strategy, naming, visual identity and packaging that make people remember you.",
    h1: "Branding in Perth for people who refuse to blend in.",
    kicker: "Brand identity · Logo · Packaging",
    images: { square: "services/branding-perth-travis-weerts.jpg" },
    hero: {
      headline: "Branding in Perth for people who refuse to blend in.",
      subheadline:
        "Distinctive identities that people notice, remember and come back to.",
      description:
        "I craft brand identities for wineries, venues, startups and founders — from naming and strategy through to logos, packaging and the little details people talk about. Work that's been recognised at Cannes, D&AD and The One Show.",
      cta: "Build your brand",
    },
    story:
      "A brand isn't your logo. It's the feeling someone gets the third time they see you. My job is to find the true, slightly unexpected thing about you, and give it a shape — a name, a mark, a colour, a voice — that's impossible to mistake for anyone else.",
    benefits: [
      {
        title: "Memorable identity",
        description:
          "A distinctive mark and visual system customers recognise instantly, on a shelf, a screen or a shirt.",
      },
      {
        title: "Clear positioning",
        description:
          "Strategy that defines who you're for, why you matter and how you sound — so every decision gets easier.",
      },
      {
        title: "Consistent everywhere",
        description:
          "Guidelines and templates that keep your website, socials, packaging and print feeling like one brand.",
      },
      {
        title: "Built to last",
        description:
          "Timeless, flexible systems that grow with you rather than needing a costly rebrand in two years.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Discovery",
        description:
          "Workshops and research into your business, values, audience and competitors. We find what makes you different.",
      },
      {
        step: 2,
        title: "Strategy",
        description:
          "Positioning, personality, messaging and — if you need it — naming. The foundations everything is built on.",
      },
      {
        step: 3,
        title: "Identity",
        description:
          "Logo, typography, colour, imagery and graphic language, explored widely then refined into one confident direction.",
      },
      {
        step: 4,
        title: "Roll-out",
        description:
          "Brand guidelines, templates, packaging, signage and digital assets, delivered ready to use.",
      },
    ],
    features: [
      "Brand strategy",
      "Logo design",
      "Visual identity",
      "Product naming",
      "Packaging design",
      "Brand guidelines",
      "Tone of voice",
      "Marketing collateral",
      "Signage & in-store",
      "Social templates",
    ],
    pricing: { starting: "$1,200", timeline: "3–5 weeks" },
    faqs: [
      {
        q: "How much does branding cost in Perth?",
        a: "Logo and identity projects start from around $1,200, and grow with scope — naming, guidelines, packaging and so on. You'll get a fixed quote after a free chat, with the option to pay monthly.",
      },
      {
        q: "What's the difference between a logo and a brand identity?",
        a: "A logo is one mark. A brand identity is the whole system — logo, colours, typography, imagery, tone of voice and rules for using them — so everything you put out feels consistent and recognisable.",
      },
      {
        q: "Do you design wine labels and packaging?",
        a: "Yes, packaging is one of my favourite things to work on. I've designed labels and packaging for wineries and producers including Cirillo Estate, Fervor, CODA and Lume.",
      },
      {
        q: "Can you help name my business or product?",
        a: "Yes. Naming is offered as part of brand strategy — including shortlists, linguistic checks and initial availability searches for domains and trademarks.",
      },
    ],
    relatedWork: ["Cirillo 1850 Estate", "Fervor", "BOOBOOK Bottles & Bar"],
    related: ["graphic-design", "web-design", "ui-ux"],
  },

  seo: {
    title: "SEO Perth",
    slug: "seo",
    tag: "SEO",
    showInServices: true,
    visual: "search",
    metaTitle: "SEO Perth WA | Local SEO Services That Get You Found on Google",
    metaDescription:
      "SEO services in Perth and the Perth Hills. Technical SEO, local SEO, content and Google Business Profile optimisation that turns searches into phone calls.",
    h1: "SEO in Perth that turns searches into phone calls.",
    kicker: "Search engine optimisation · Local SEO",
    images: { square: "services/seo-perth-travis-weerts.jpg" },
    hero: {
      headline: "SEO in Perth that turns searches into phone calls.",
      subheadline:
        "Get found by the people already searching for exactly what you do.",
      description:
        "Honest, technical, measurable SEO for Perth businesses. I fix what's holding your site back, build pages that deserve to rank, and get your Google Business Profile working as hard as you do.",
      cta: "Get a free SEO check",
    },
    story:
      "Somewhere in Perth, right now, someone is typing exactly what you sell into Google. SEO is just making sure they find you — not a competitor with a worse product and a better website. No smoke, no secret sauce: solid foundations, genuinely useful content and patience.",
    benefits: [
      {
        title: "Be found locally",
        description:
          "Local SEO and Google Business Profile optimisation so you show up in the map pack for searches across Perth.",
      },
      {
        title: "Qualified traffic",
        description:
          "Target the searches that lead to enquiries, not vanity keywords that look good in a report.",
      },
      {
        title: "Technical fixes",
        description:
          "Site speed, Core Web Vitals, crawlability, schema and indexing issues sorted by someone who actually writes code.",
      },
      {
        title: "Clear reporting",
        description:
          "Plain-English monthly updates on rankings, traffic and leads. You'll always know what I did and why.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Audit",
        description:
          "A deep technical and content audit of your site, your competitors and the keywords that matter to your bottom line.",
      },
      {
        step: 2,
        title: "Strategy",
        description:
          "A prioritised roadmap — quick wins first, then the content and authority that compound over time.",
      },
      {
        step: 3,
        title: "Implement",
        description:
          "Technical fixes, on-page optimisation, new landing pages, schema, internal linking and local citations.",
      },
      {
        step: 4,
        title: "Measure & refine",
        description:
          "Track rankings, traffic and conversions monthly, and double down on what's working.",
      },
    ],
    features: [
      "Technical SEO audit",
      "Keyword research",
      "Local SEO",
      "Google Business Profile",
      "On-page optimisation",
      "Content strategy",
      "Schema markup",
      "Core Web Vitals",
      "Link building",
      "Monthly reporting",
    ],
    pricing: { starting: "$500/month", timeline: "Ongoing · cancel anytime after 3 months" },
    faqs: [
      {
        q: "How much does SEO cost in Perth?",
        a: "SEO starts from $500 per month for local businesses, scaling with how competitive your industry is and how much content is needed. One-off audits and fixes are quoted separately.",
      },
      {
        q: "How long does SEO take to work?",
        a: "Technical fixes can show results within weeks, but meaningful ranking and traffic growth usually takes 3–6 months. SEO compounds — the work you do now keeps paying off for years.",
      },
      {
        q: "What is local SEO?",
        a: "Local SEO helps you appear for searches with local intent, like “web designer near me” or “plumber Kalamunda”. It focuses on your Google Business Profile, reviews, local citations and location-specific pages.",
      },
      {
        q: "Do you guarantee first page rankings?",
        a: "No honest SEO can guarantee rankings — Google controls that. What I do guarantee is transparent, best-practice work, clear reporting and a strategy focused on leads, not just positions.",
      },
      {
        q: "Do I also need GEO (AI search optimisation)?",
        a: "Increasingly, yes. People now ask ChatGPT, Gemini and Google's AI Overviews for recommendations. Good SEO is the foundation, and GEO builds on it so AI tools understand and cite your business too.",
      },
    ],
    relatedWork: ["Olympics / Brisbane 2032", "HBF / Digital Transformation"],
    related: ["geo", "web-design", "wordpress"],
  },

  geo: {
    title: "GEO — AI Search Optimisation Perth",
    slug: "geo",
    tag: "GEO / AI Search",
    showInServices: true,
    visual: "answer",
    metaTitle:
      "GEO Perth WA | Generative Engine Optimisation for ChatGPT & AI Search",
    metaDescription:
      "Get recommended by ChatGPT, Gemini, Perplexity and Google AI Overviews. Generative Engine Optimisation (GEO) for Perth businesses from a designer who builds with AI.",
    h1: "Get recommended by ChatGPT, not just found on Google.",
    kicker: "Generative Engine Optimisation · AI search",
    images: { square: "services/geo-ai-search-perth-travis-weerts.jpg" },
    hero: {
      headline: "Get recommended by ChatGPT, not just found on Google.",
      subheadline:
        "Generative Engine Optimisation for the way people search now.",
      description:
        "More and more customers skip the search results and just ask an AI. GEO makes sure ChatGPT, Gemini, Perplexity and Google's AI Overviews understand what you do, trust you, and name you in the answer.",
      cta: "Check your AI visibility",
    },
    story:
      "Ask an AI “who's the best ___ in Perth?” and it'll give you three names. That's the new front page — and it's tiny. I've been building with AI models since before it was cool, so I know what they read, what they trust and why they pick one business over another. GEO is how you become one of those three names.",
    benefits: [
      {
        title: "Show up in AI answers",
        description:
          "Structure your site and content so large language models can read, understand and confidently cite you.",
      },
      {
        title: "Become the trusted source",
        description:
          "Build the entity signals, mentions and authoritative content that AI tools use to decide who to recommend.",
      },
      {
        title: "Future-proof your SEO",
        description:
          "GEO and SEO reinforce each other — the same work lifts your Google rankings and your AI visibility.",
      },
      {
        title: "Measure what AI says",
        description:
          "Regular prompt testing across ChatGPT, Gemini, Perplexity and Claude to track how you're being described.",
      },
    ],
    process: [
      {
        step: 1,
        title: "AI visibility audit",
        description:
          "I test dozens of real customer prompts across the major AI tools to see if, and how, you're mentioned today.",
      },
      {
        step: 2,
        title: "Entity & content plan",
        description:
          "Define the facts, topics and questions AI needs to associate with you, and find the gaps competitors fill.",
      },
      {
        step: 3,
        title: "Implement",
        description:
          "Structured data, FAQ and answer-ready content, llms.txt, profile consistency and authority-building mentions.",
      },
      {
        step: 4,
        title: "Track & iterate",
        description:
          "Monthly prompt tracking and reporting so you can see your share of AI answers grow over time.",
      },
    ],
    features: [
      "AI visibility audit",
      "Prompt tracking",
      "Entity optimisation",
      "Structured data",
      "Answer-ready content",
      "FAQ strategy",
      "llms.txt setup",
      "Brand mention building",
      "Google AI Overviews",
      "Monthly reporting",
    ],
    pricing: { starting: "$500/month", timeline: "Ongoing · audit in 1 week" },
    faqs: [
      {
        q: "What is GEO (Generative Engine Optimisation)?",
        a: "GEO is the practice of optimising your website and online presence so AI tools like ChatGPT, Gemini, Perplexity and Google's AI Overviews understand your business and recommend it in their answers.",
      },
      {
        q: "How is GEO different from SEO?",
        a: "SEO helps you rank in a list of links. GEO helps you get named inside an AI-written answer. They overlap heavily — GEO puts extra weight on clear facts, structured data, answer-style content and being mentioned by sources AI trusts.",
      },
      {
        q: "Can you guarantee ChatGPT will recommend my business?",
        a: "No one can guarantee what an AI model says. What I can do is measurably improve how clearly and how often AI tools describe and cite your business, and report on it every month.",
      },
      {
        q: "Do I need GEO if I'm a local Perth business?",
        a: "Yes — local recommendations are one of the most common things people ask AI. If a competitor is the business ChatGPT names for your suburb and service, that's leads you never see.",
      },
    ],
    relatedWork: ["Melbourne Airport Activation", "IOOKI Labs"],
    related: ["seo", "ai-development", "web-design"],
  },

  "app-design": {
    title: "App Design Perth",
    slug: "app-design",
    tag: "App Design",
    showInServices: true,
    visual: "phone",
    metaTitle: "App Design Perth WA | iOS & Android UI/UX Design",
    metaDescription:
      "Mobile app design in Perth by a designer featured by Apple. Research-led iOS and Android UI/UX, prototypes and design systems people love to use.",
    h1: "App design in Perth, from a designer featured by Apple.",
    kicker: "iOS · Android · Product design",
    images: { square: "services/app-design-perth-travis-weerts.jpg" },
    hero: {
      headline: "App design in Perth, from a designer featured by Apple.",
      subheadline:
        "Mobile apps that feel obvious, delightful and worth opening twice.",
      description:
        "I design iOS and Android apps for startups and brands — from the first napkin sketch to App Store-ready screens. My work has been featured by Apple and one recent app hit #5 in Shopping on the Australian App Store.",
      cta: "Design your app",
    },
    story:
      "Great apps feel like they read your mind. That doesn't happen by accident — it comes from watching real people get confused, then quietly removing everything that confused them. I design apps that respect people's time, look beautiful doing it, and are actually buildable.",
    benefits: [
      {
        title: "People-first design",
        description:
          "Research, journeys and usability testing so the app solves real problems the way people expect.",
      },
      {
        title: "Native feel",
        description:
          "Designs that follow iOS and Android conventions where it matters and break them only when it delights.",
      },
      {
        title: "Clickable prototypes",
        description:
          "Test the whole experience on your phone before a single line of production code is written.",
      },
      {
        title: "Dev-ready systems",
        description:
          "A tidy Figma design system and specs that make development faster, cheaper and more consistent.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Research",
        description:
          "Understand your users, competitors and goals. Define the core jobs your app has to nail.",
      },
      {
        step: 2,
        title: "Flows & wireframes",
        description:
          "Map the journeys and lay out every screen in low fidelity, so we get the bones right fast.",
      },
      {
        step: 3,
        title: "Visual design",
        description:
          "Bring it to life with typography, colour, motion and a reusable component system.",
      },
      {
        step: 4,
        title: "Prototype & test",
        description:
          "Interactive prototypes tested with real people, refined, and handed over ready to build.",
      },
    ],
    features: [
      "User research",
      "User journeys",
      "Wireframes",
      "iOS & Android UI",
      "Interactive prototypes",
      "Design systems",
      "Motion design",
      "Usability testing",
      "App Store assets",
      "Developer handover",
    ],
    pricing: { starting: null, timeline: "Scoped after a free consult" },
    faqs: [
      {
        q: "How much does app design cost?",
        a: "Every app is different, so I don't publish a one-size price. We start with a free consult to understand what's involved, then I'll send a fixed quote — and you can pay it off monthly rather than all up front.",
      },
      {
        q: "Can you also build the app?",
        a: "Yes. I design and develop, so you can take the design straight into build with the same person — no lost-in-translation hand-off. See my app development service.",
      },
      {
        q: "Do you design for both iOS and Android?",
        a: "Yes. I design to each platform's guidelines where it matters, while keeping a single consistent brand and component system across both.",
      },
      {
        q: "What do I get at the end of an app design project?",
        a: "Final screens, an interactive prototype, a Figma design system with components and styles, and everything a developer needs to build it accurately.",
      },
    ],
    relatedWork: ["Hunter Markets", "Smilebooth", "Mystic"],
    related: ["app-development", "ui-ux", "brand"],
  },

  "app-development": {
    title: "App Development Perth",
    slug: "app-development",
    tag: "App Development",
    showInServices: true,
    visual: "flow",
    metaTitle: "App Development Perth WA | iOS & Android App Developer",
    metaDescription:
      "iOS and Android app development in Perth. Cross-platform apps built fast and properly, from MVP to App Store launch, by a designer-developer featured by Apple.",
    h1: "App development in Perth, from idea to App Store.",
    kicker: "iOS · Android · React Native",
    images: { square: "services/app-development-perth-travis-weerts.jpg" },
    hero: {
      headline: "App development in Perth, from idea to App Store.",
      subheadline: "Cross-platform apps built fast, built properly, built to grow.",
      description:
        "I build iOS and Android apps for founders and brands — marketplaces, AI-powered tools, activations and everything in between. One recent indie launch, Hunter Markets, reached #5 in Shopping on the Australian App Store.",
      cta: "Build your app",
    },
    story:
      "You don't need a 20-person agency to launch a great app. You need someone who can design it, build it, and tell you honestly what to leave out of version one. I work in small, fast loops so you're holding a real app on your phone in weeks, not quarters.",
    benefits: [
      {
        title: "One codebase, two stores",
        description:
          "Cross-platform development for iOS and Android that saves time and budget without feeling generic.",
      },
      {
        title: "MVP in weeks",
        description:
          "Lean scoping and fast iteration get your idea in front of real users quickly, then improve from data.",
      },
      {
        title: "Built to scale",
        description:
          "Solid architecture, cloud backends, payments, auth and analytics set up right from the start.",
      },
      {
        title: "Launch handled",
        description:
          "App Store and Google Play submission, review wrangling and post-launch support all taken care of.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Plan",
        description:
          "Scope the MVP, choose the right stack and map the architecture so there are no surprises later.",
      },
      {
        step: 2,
        title: "Build",
        description:
          "Weekly builds on your phone via TestFlight, so you see progress and steer as we go.",
      },
      {
        step: 3,
        title: "Test",
        description:
          "Device testing, performance tuning and QA to make sure it's fast, stable and secure.",
      },
      {
        step: 4,
        title: "Launch & support",
        description:
          "Store submission, launch, monitoring and an ongoing roadmap for updates and new features.",
      },
    ],
    features: [
      "iOS development",
      "Android development",
      "React Native / Expo",
      "Backend & APIs",
      "Payments & subscriptions",
      "Authentication",
      "Push notifications",
      "AI integrations",
      "App Store submission",
      "Ongoing support",
    ],
    pricing: { starting: null, timeline: "Scoped after a free consult" },
    faqs: [
      {
        q: "How much does it cost to build an app in Perth?",
        a: "Honestly, it depends on the app — a focused MVP and a full marketplace are very different builds. We start with a free consult, I scope it properly and send a fixed quote, and you can spread payments monthly. I'll also tell you what to leave out of version one to keep it lean.",
      },
      {
        q: "How long does it take to build an app?",
        a: "A lean MVP can be on the App Store in 6–12 weeks. More complex apps take 3–6 months. Weekly test builds mean you're never waiting in the dark.",
      },
      {
        q: "Native or cross-platform?",
        a: "For most startups and businesses, cross-platform (React Native) is the smart choice — one codebase, both stores, near-native performance. I'll recommend native only when your app genuinely needs it.",
      },
      {
        q: "Do you sign an NDA?",
        a: "Of course. Happy to sign an NDA before we discuss your idea in detail.",
      },
    ],
    relatedWork: ["Hunter Markets", "OZZ FM", "Melbourne Airport Activation"],
    related: ["app-design", "ai-development", "ui-ux"],
  },

  "ai-development": {
    title: "AI Development Perth",
    slug: "ai-development",
    tag: "AI Development",
    showInServices: true,
    visual: "neural",
    metaTitle: "AI Development Perth WA | Custom AI Apps, Agents & Automation",
    metaDescription:
      "Custom AI development in Perth. AI agents, chatbots, automation and generative AI experiences from a Top 5 Australian AI startup founder. Practical AI that ships.",
    h1: "AI development in Perth that's useful, not just clever.",
    kicker: "AI agents · Automation · Generative AI",
    images: { square: "services/ai-development-perth-travis-weerts.jpg" },
    hero: {
      headline: "AI development in Perth that's useful, not just clever.",
      subheadline:
        "Practical AI products, agents and automations that save time and wow people.",
      description:
        "I've been building with AI for years — from a Top 5 Australian AI startup to conversational AI at Melbourne Airport and generative photobooths at the Australian Open. I help businesses find where AI genuinely helps, then build it.",
      cta: "Explore AI for your business",
    },
    story:
      "Everyone's being told they need AI. Most people actually need one boring, painful task to disappear — or one moment that makes customers say “how did it know that?” I'll help you find which, skip the hype, and build something that works in the real world, not just in a demo.",
    benefits: [
      {
        title: "Automate the boring",
        description:
          "AI agents and workflows that handle repetitive admin, triage, data entry and reporting.",
      },
      {
        title: "Smarter customer experiences",
        description:
          "Chat and voice assistants trained on your business, available 24/7, sounding like you.",
      },
      {
        title: "Generative experiences",
        description:
          "Memorable AI-powered activations, art and content tools that get people talking.",
      },
      {
        title: "Grounded & safe",
        description:
          "Thoughtful prompt design, evaluation and guardrails so outputs are accurate and on-brand.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Opportunity mapping",
        description:
          "Find the use cases with the biggest payoff and lowest risk. Sometimes the answer is “don't use AI here”.",
      },
      {
        step: 2,
        title: "Prototype",
        description:
          "A working proof-of-concept in days, using your real data, so you can feel the value before investing.",
      },
      {
        step: 3,
        title: "Build",
        description:
          "Production-ready integration with your systems, plus evaluation, monitoring and guardrails.",
      },
      {
        step: 4,
        title: "Launch & improve",
        description:
          "Roll out, train your team, measure results and keep improving as models get better.",
      },
    ],
    features: [
      "AI strategy",
      "AI agents",
      "Chatbots & voice AI",
      "Workflow automation",
      "LLM integration",
      "RAG / knowledge bases",
      "Computer vision",
      "Generative AI experiences",
      "Prompt engineering",
      "Evaluation & guardrails",
    ],
    pricing: { starting: null, timeline: "Scoped after a free consult" },
    faqs: [
      {
        q: "What kind of AI can you build for my business?",
        a: "Common projects include customer service chatbots trained on your content, internal AI agents that automate admin and reporting, AI features inside apps and websites, and generative AI experiences for marketing and events.",
      },
      {
        q: "How much does AI development cost?",
        a: "It depends on the problem. Often the best start is a small proof-of-concept, so you can see the value before investing more. After a free consult I'll send a fixed quote, with monthly payment options available.",
      },
      {
        q: "Is my data safe?",
        a: "Yes. I use enterprise-grade APIs that don't train on your data, follow least-privilege access, and can deploy within your own cloud environment when required.",
      },
      {
        q: "Which AI models do you work with?",
        a: "I work across the leading models — Claude, GPT, Gemini and open-source options — and choose based on accuracy, cost, speed and privacy requirements for your project.",
      },
    ],
    relatedWork: [
      "Melbourne Airport Activation",
      "Wilson / Australian Open AI Photobooth",
      "Paint with your mind",
    ],
    related: ["app-development", "geo", "ui-ux"],
  },

  "ui-ux": {
    title: "UI/UX Design Perth",
    slug: "ui-ux",
    tag: "UI/UX Design",
    showInServices: true,
    visual: "compose",
    metaTitle: "UI/UX Design Perth WA | User Experience & Interface Designer",
    metaDescription:
      "UI/UX design in Perth for websites, apps and digital products. Research, wireframes, prototypes and interfaces for brands like HBF, the UN and Wendy's.",
    h1: "UI/UX design in Perth that makes complicated feel simple.",
    kicker: "User experience · Interface design",
    images: { square: "services/ui-ux-design-perth-travis-weerts.jpg" },
    hero: {
      headline: "UI/UX design in Perth that makes complicated feel simple.",
      subheadline:
        "Interfaces people understand instantly and enjoy coming back to.",
      description:
        "I've spent nearly two decades designing digital experiences for HBF, the United Nations, Wendy's, VML and dozens of startups. Good UX is invisible — people just get where they're going and feel good about it.",
      cta: "Improve your experience",
    },
    story:
      "Every confusing button costs you something — a sale, a sign-up, a little bit of trust. UX is the craft of noticing those moments and smoothing them out. UI is making the result feel considered and beautiful. I do both, so nothing gets lost between the thinking and the pixels.",
    benefits: [
      {
        title: "Higher conversions",
        description:
          "Clearer journeys and fewer obstacles turn more visitors into customers and more users into regulars.",
      },
      {
        title: "Cheaper to build",
        description:
          "Testing ideas in prototypes catches expensive mistakes before development starts.",
      },
      {
        title: "Accessible to everyone",
        description:
          "Inclusive, WCAG-minded design that works for more people and protects your brand.",
      },
      {
        title: "Consistent at scale",
        description:
          "Design systems that keep products coherent as teams and features grow.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Research",
        description:
          "Interviews, analytics and heuristic reviews to understand what people need and where they struggle.",
      },
      {
        step: 2,
        title: "Architecture",
        description:
          "Information architecture, user flows and wireframes that make the structure obvious.",
      },
      {
        step: 3,
        title: "Interface",
        description:
          "High-fidelity UI, interaction design and motion that bring clarity and personality.",
      },
      {
        step: 4,
        title: "Test & refine",
        description:
          "Prototype testing with real users, then iterate until the experience feels effortless.",
      },
    ],
    features: [
      "UX audits",
      "User research",
      "Information architecture",
      "User flows",
      "Wireframes",
      "UI design",
      "Interactive prototypes",
      "Design systems",
      "Accessibility review",
      "Usability testing",
    ],
    pricing: { starting: "$1,000", timeline: "2–6 weeks" },
    faqs: [
      {
        q: "What's the difference between UI and UX design?",
        a: "UX (user experience) is how something works — the structure, flows and ease of use. UI (user interface) is how it looks and feels — layout, typography, colour and interaction. Great products need both.",
      },
      {
        q: "Can you audit my existing website or app?",
        a: "Yes. A UX audit reviews your product against usability best practice and your analytics, then delivers a prioritised list of improvements you can act on straight away.",
      },
      {
        q: "Do you work with in-house development teams?",
        a: "All the time. I deliver Figma files, design systems and specs your developers can build from, and stay involved during build to answer questions.",
      },
      {
        q: "What tools do you use?",
        a: "Primarily Figma for design and prototyping, plus code prototypes when interactions need to be felt to be judged.",
      },
    ],
    relatedWork: [
      "HBF / Digital Transformation",
      "United Nations / Don't Choose Extinction",
      "Space Collective",
    ],
    related: ["web-design", "app-design", "brand"],
  },

  "graphic-design": {
    title: "Graphic Design Perth",
    slug: "graphic-design",
    tag: "Graphic Design",
    showInServices: true,
    visual: "grid",
    metaTitle: "Graphic Design Perth Hills | Print, Poster & Marketing Design",
    metaDescription:
      "Graphic design in Perth and the Perth Hills. Posters, print, packaging, social and marketing design that's bold, beautiful and on-brand. Fast turnaround.",
    h1: "Graphic design in Perth with a bit of nerve.",
    kicker: "Print · Posters · Marketing design",
    images: { square: "services/graphic-design-perth-travis-weerts.jpg" },
    hero: {
      headline: "Graphic design in Perth with a bit of nerve.",
      subheadline:
        "Posters, print, packaging and campaigns that stop people mid-scroll.",
      description:
        "From festival posters to product launches, I design graphics that look great, say one thing clearly and feel unmistakably yours. Clients include Darlington Arts Festival, Incubus' Make Yourself Foundation and local businesses across Perth.",
      cta: "Start a design project",
    },
    story:
      "Good graphic design does one job: it gets noticed, then gets understood. I like work with a bit of personality — confident type, unexpected colour, a clear idea — but always in service of your message and your brand, not my portfolio.",
    benefits: [
      {
        title: "Stands out",
        description:
          "Bold, considered design that earns attention on walls, shelves and feeds.",
      },
      {
        title: "Says it clearly",
        description:
          "Hierarchy and copy that communicate in seconds, not paragraphs.",
      },
      {
        title: "On brand",
        description:
          "Everything consistent with your identity, so each piece builds recognition.",
      },
      {
        title: "Print-ready",
        description:
          "Files prepared properly for print and digital, with printer liaison if you need it.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Brief",
        description:
          "Understand the goal, the audience, the format and the deadline.",
      },
      {
        step: 2,
        title: "Concepts",
        description:
          "A few distinct creative directions to react to — no endless rounds of tiny tweaks.",
      },
      {
        step: 3,
        title: "Refine",
        description:
          "Develop the chosen direction into polished, final artwork.",
      },
      {
        step: 4,
        title: "Deliver",
        description:
          "Print-ready and digital files in every size you need, plus printer coordination.",
      },
    ],
    features: [
      "Poster design",
      "Print design",
      "Packaging",
      "Social media graphics",
      "Event branding",
      "Brochures & flyers",
      "Signage",
      "Illustration",
      "Presentation design",
      "Print management",
    ],
    pricing: { starting: "$300", timeline: "1–2 weeks" },
    faqs: [
      {
        q: "How much does graphic design cost in Perth?",
        a: "Single pieces like a poster or flyer start from around $300. Campaigns and multi-piece projects are quoted on scope — and I'm happy to work to a budget.",
      },
      {
        q: "Can you organise printing?",
        a: "Yes. I work with trusted Perth printers and can manage the whole process, from paper stock to delivery.",
      },
      {
        q: "Do you offer ongoing design support?",
        a: "Yes — monthly design retainers are available for businesses that need regular social, marketing and print work.",
      },
    ],
    relatedWork: [
      "Darlington Arts Festival",
      "Incubus / Make yourself Foundation",
      "CODA",
    ],
    related: ["brand", "web-design", "ui-ux"],
  },

  wordpress: {
    title: "WordPress Developer Perth",
    slug: "wordpress",
    tag: "WordPress",
    showInServices: true,
    visual: "browser",
    metaTitle: "WordPress Developer Perth WA | Custom WordPress Websites",
    metaDescription:
      "Custom WordPress development in Perth. Fast, secure, easy-to-edit WordPress and WooCommerce websites built from scratch — no bloated themes.",
    h1: "WordPress development in Perth, minus the bloat.",
    kicker: "Custom themes · WooCommerce · Care plans",
    images: { square: "services/wordpress-developer-perth-travis-weerts.jpg" },
    hero: {
      headline: "WordPress development in Perth, minus the bloat.",
      subheadline:
        "Custom WordPress sites that are fast, secure and a joy to edit.",
      description:
        "I build custom WordPress and WooCommerce websites from scratch — no page-builder soup, no 40 plugins, no mystery. Just a fast, secure site you can update yourself in minutes.",
      cta: "Start your WordPress site",
    },
    story:
      "WordPress gets a bad rap because most WordPress sites are built badly — a heavy theme, a pile of plugins and a prayer. Built properly, it's brilliant: flexible, affordable and easy for your team to run. That's the version I build.",
    benefits: [
      {
        title: "Easy to edit",
        description:
          "Custom blocks designed around your content, so updating pages is simple and nothing breaks.",
      },
      {
        title: "Fast & lean",
        description:
          "Hand-coded themes without bloat, so pages load quickly and score well on Core Web Vitals.",
      },
      {
        title: "Secure",
        description:
          "Hardened setup, minimal plugins, automatic backups and updates to keep you safe.",
      },
      {
        title: "Room to grow",
        description:
          "WooCommerce, memberships, bookings and integrations whenever you're ready.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Requirements",
        description:
          "Understand your content, features, integrations and who'll be editing the site.",
      },
      {
        step: 2,
        title: "Design & build",
        description:
          "Custom design, then a hand-built theme with tailored editing blocks.",
      },
      {
        step: 3,
        title: "Migrate",
        description:
          "Move your existing content, redirects and SEO value across without losing rankings.",
      },
      {
        step: 4,
        title: "Train & launch",
        description:
          "Launch, a training session for your team and optional ongoing care plans.",
      },
    ],
    features: [
      "Custom themes",
      "Gutenberg blocks",
      "WooCommerce",
      "Site migration",
      "SEO redirects",
      "Speed optimisation",
      "Security hardening",
      "Backups",
      "Care plans",
      "Team training",
    ],
    pricing: { starting: "$1,500", timeline: "2–4 weeks" },
    faqs: [
      {
        q: "How much does a WordPress website cost?",
        a: "Custom WordPress websites start from around $1,500 for a small site. Larger sites and WooCommerce stores are quoted on scope after a free chat, with monthly payment options.",
      },
      {
        q: "Can you fix or speed up my existing WordPress site?",
        a: "Yes. I offer WordPress performance and security tune-ups, plugin clean-ups and theme fixes for existing sites.",
      },
      {
        q: "Will I lose my Google rankings if we rebuild?",
        a: "Not if it's done properly. I map and redirect every important URL, carry over metadata and monitor Search Console after launch to protect your rankings.",
      },
      {
        q: "Do you offer WordPress maintenance?",
        a: "Yes — care plans include updates, backups, uptime monitoring, security and a bank of time for small changes each month.",
      },
    ],
    relatedWork: ["The Raveonettes", "DUET", "Space Collective"],
    related: ["web-design", "woocommerce", "shopify", "seo"],
  },

  // ---------------------------------------------------------------------
  // Platform pages: real pages for search, listed on /services and in the
  // footer, but kept out of the header dropdown (showInServices: false).
  // ---------------------------------------------------------------------

  shopify: {
    title: "Shopify Developer Perth",
    slug: "shopify",
    tag: "Shopify",
    group: "platform",
    showInServices: false,
    art: "structure",
    metaTitle: "Shopify Developer Perth WA | Custom Shopify Stores & Themes",
    metaDescription:
      "Shopify developer in Perth building custom stores, themes and apps that sell. Store setup, theme design, migrations and speed fixes from an award-winning designer.",
    h1: "Shopify development in Perth for stores that actually sell.",
    kicker: "Shopify · Online stores · Themes",
    images: { square: "services/web-design-perth-travis-weerts.jpg" },
    hero: {
      headline: "Shopify development in Perth for stores that actually sell.",
      subheadline: "Custom Shopify stores that look like your brand, not a template.",
      description:
        "I design and build Shopify stores for Perth brands and makers, from first launch to full custom themes. Clean product pages, a checkout that converts, and a store you can run yourself.",
      cta: "Start your store",
    },
    story:
      "Most Shopify stores look the same because they start from the same theme and stop there. Yours should feel like walking into your shop. I design around your products and your customers, then build it properly so it's fast, easy to manage and ready to grow.",
    benefits: [
      { title: "Built to convert", description: "Product pages, collections and checkout flows designed around how people actually buy." },
      { title: "Unmistakably yours", description: "Custom theme design so your store feels like your brand, not everyone else's." },
      { title: "Fast and findable", description: "Lean code, optimised images and solid SEO foundations so customers can find you and stay." },
      { title: "Easy to run", description: "Set up so you can add products, run sales and edit pages without calling anyone." },
    ],
    process: [
      { step: 1, title: "Plan", description: "Products, customers, shipping, payments and the apps you actually need." },
      { step: 2, title: "Design", description: "Store layout and custom theme design, shaped around your products." },
      { step: 3, title: "Build", description: "Theme development, product import, integrations and testing across devices." },
      { step: 4, title: "Launch", description: "Go live, analytics, training and ongoing support as you grow." },
    ],
    features: ["Store setup", "Custom theme design", "Theme development", "Product import", "Payments & shipping", "App integrations", "Store migration", "Speed optimisation", "Shopify SEO", "Training"],
    pricing: { starting: "$1,500", timeline: "2–5 weeks" },
    faqs: [
      { q: "How much does a Shopify store cost in Perth?", a: "Store setups start from around $1,500, and custom theme builds are quoted on scope after a free chat. Monthly payment options are available." },
      { q: "Can you move my store to Shopify from another platform?", a: "Yes. I migrate products, customers, orders and SEO redirects from WooCommerce, Squarespace, Wix and others, so you keep your rankings." },
      { q: "Can you customise my existing Shopify theme?", a: "Absolutely. I can refine an existing theme, fix speed issues or build custom sections without starting from scratch." },
      { q: "Do you build custom Shopify apps?", a: "For specific needs, yes. Often an existing app does the job, so I'll recommend the simplest option first." },
    ],
    relatedWork: ["Hunter Markets", "BOOBOOK Bottles & Bar", "Cirillo 1850 Estate"],
    related: ["web-design", "woocommerce", "seo", "brand"],
  },

  woocommerce: {
    title: "WooCommerce Developer Perth",
    slug: "woocommerce",
    tag: "WooCommerce",
    group: "platform",
    showInServices: false,
    art: "layers",
    metaTitle: "WooCommerce Developer Perth WA | WordPress E-commerce",
    metaDescription:
      "WooCommerce developer in Perth. Custom WordPress online stores, payment and shipping setup, speed fixes and migrations. Own your store, keep your flexibility.",
    h1: "WooCommerce development in Perth, on a store you fully own.",
    kicker: "WooCommerce · WordPress e-commerce",
    images: { square: "services/wordpress-developer-perth-travis-weerts.jpg" },
    hero: {
      headline: "WooCommerce development in Perth, on a store you fully own.",
      subheadline: "Flexible WordPress stores without monthly platform lock-in.",
      description:
        "I build and fix WooCommerce stores for Perth businesses that want the freedom of WordPress with a proper online shop. Fast, secure, and easy to manage.",
      cta: "Start your store",
    },
    story:
      "WooCommerce is brilliant when it's built well and painful when it isn't. Too many plugins, a slow theme and a fragile checkout cost you sales every day. I build lean, custom stores that load fast and keep working when you need them most.",
    benefits: [
      { title: "You own it", description: "Your store, your data, your hosting. No platform deciding what you can do." },
      { title: "Fast checkout", description: "A streamlined checkout and lean code so fewer customers drop off." },
      { title: "Content and commerce together", description: "Blog, pages and products in one place, great for SEO." },
      { title: "Secure and maintained", description: "Hardened setup, backups and care plans so you can sleep at night." },
    ],
    process: [
      { step: 1, title: "Audit or plan", description: "Review your current store or map out a new one." },
      { step: 2, title: "Design", description: "Custom store design around your products and brand." },
      { step: 3, title: "Build", description: "Custom theme, payments, shipping, integrations and testing." },
      { step: 4, title: "Launch & care", description: "Go live with monitoring, backups and ongoing support." },
    ],
    features: ["Custom WooCommerce themes", "Payments & shipping", "Subscriptions", "Speed optimisation", "Plugin clean-up", "Security hardening", "Store migration", "SEO setup", "Care plans", "Training"],
    pricing: { starting: "$1,500", timeline: "2–5 weeks" },
    faqs: [
      { q: "Should I choose WooCommerce or Shopify?", a: "Shopify is simpler to run; WooCommerce gives you more control and no platform fees. After a quick chat about your products and plans, I'll recommend the right fit honestly." },
      { q: "Can you speed up my slow WooCommerce store?", a: "Yes. Most slow stores suffer from heavy themes and too many plugins. I clean up, optimise and often rebuild key templates for a big speed boost." },
      { q: "How much does a WooCommerce store cost?", a: "Stores start from around $1,500 depending on products and features. You'll get a fixed quote after a free chat, with monthly payment options." },
    ],
    relatedWork: ["The Raveonettes", "Space Collective"],
    related: ["wordpress", "shopify", "web-design", "seo"],
  },

  squarespace: {
    title: "Squarespace Designer Perth",
    slug: "squarespace",
    tag: "Squarespace",
    group: "platform",
    showInServices: false,
    art: "system",
    metaTitle: "Squarespace Designer Perth WA | Custom Squarespace Websites",
    metaDescription:
      "Squarespace designer in Perth. Custom Squarespace websites, redesigns and SEO for small businesses, creatives and studios that want something better than the template.",
    h1: "Squarespace design in Perth that doesn't look like a template.",
    kicker: "Squarespace · Small business websites",
    images: { square: "services/ui-ux-design-perth-travis-weerts.jpg" },
    hero: {
      headline: "Squarespace design in Perth that doesn't look like a template.",
      subheadline: "Easy to run, beautiful to look at, built to be found.",
      description:
        "Squarespace is a great choice for small businesses and creatives who want a site they can manage themselves. I make it look and work like it was custom built.",
      cta: "Start your site",
    },
    story:
      "Squarespace makes it easy to get online and hard to stand out. I take the parts that make it great, the easy editing and solid hosting, and add the design, structure and SEO that turn a nice-looking site into one that brings in work.",
    benefits: [
      { title: "Looks custom", description: "Thoughtful layouts, typography and custom code where it counts." },
      { title: "You stay in control", description: "Edit text, images and products yourself in minutes." },
      { title: "SEO set up properly", description: "Titles, structure, speed and Google Business Profile, done right." },
      { title: "Quick to launch", description: "Squarespace's foundations mean you can be live faster." },
    ],
    process: [
      { step: 1, title: "Chat", description: "Your business, your audience and what you want the site to do." },
      { step: 2, title: "Design", description: "Page structure and visual design tailored to your brand." },
      { step: 3, title: "Build", description: "Built in Squarespace with custom styling and SEO setup." },
      { step: 4, title: "Handover", description: "Training so you can confidently run it yourself." },
    ],
    features: ["Custom Squarespace design", "Template customisation", "Custom CSS", "Squarespace Commerce", "Booking integrations", "SEO setup", "Google Business Profile", "Migrations", "Training", "Ongoing support"],
    pricing: { starting: "$800", timeline: "1–3 weeks" },
    faqs: [
      { q: "How much does a Squarespace website cost?", a: "Squarespace sites start from around $800 for a small site. Larger sites and stores are quoted after a free chat." },
      { q: "Can you improve my existing Squarespace site?", a: "Yes. Redesigns, SEO fixes and refreshes are a great way to get more from the site you already have." },
      { q: "Is Squarespace good for SEO?", a: "Yes, when it's set up properly. Structure, content and page speed matter far more than the platform." },
    ],
    relatedWork: ["Darlington Arts Festival", "Space Collective"],
    related: ["web-design", "wix", "seo", "brand"],
  },

  webflow: {
    title: "Webflow Developer Perth",
    slug: "webflow",
    tag: "Webflow",
    group: "platform",
    showInServices: false,
    art: "rule30",
    metaTitle: "Webflow Developer Perth WA | Custom Webflow Websites",
    metaDescription:
      "Webflow designer and developer in Perth. Custom Webflow websites with rich interactions, a CMS your team will love and SEO built in. From an award-winning designer.",
    h1: "Webflow development in Perth for sites that move.",
    kicker: "Webflow · Interactions · CMS",
    images: { square: "services/app-development-perth-travis-weerts.jpg" },
    hero: {
      headline: "Webflow development in Perth for sites that move.",
      subheadline: "Custom design, rich interactions and a CMS your team will actually use.",
      description:
        "Webflow gives you custom-coded quality with no-code editing. I design and build Webflow sites for startups and brands that want to look sharp and move fast.",
      cta: "Start your Webflow site",
    },
    story:
      "Webflow sits in a sweet spot: the design freedom of custom code with an editor your marketing team won't fear. I use it to build sites with real craft in the details, smooth interactions, clean structure and pages that rank.",
    benefits: [
      { title: "Pixel-perfect design", description: "No template constraints. Your design, built exactly." },
      { title: "Rich interactions", description: "Scroll and hover animations that make the brand feel alive." },
      { title: "Marketing-friendly CMS", description: "Your team can publish pages and posts without a developer." },
      { title: "Clean, fast output", description: "Semantic structure and fast hosting for strong SEO." },
    ],
    process: [
      { step: 1, title: "Discover", description: "Goals, content and how your team will use the site." },
      { step: 2, title: "Design", description: "Full visual design and interaction concepts." },
      { step: 3, title: "Build", description: "Webflow build with CMS collections, interactions and SEO." },
      { step: 4, title: "Launch", description: "Go live, training and ongoing improvements." },
    ],
    features: ["Custom Webflow design", "Webflow development", "Interactions & animation", "CMS setup", "Webflow e-commerce", "Migrations to Webflow", "SEO setup", "Integrations", "Training", "Ongoing support"],
    pricing: { starting: "$1,500", timeline: "2–5 weeks" },
    faqs: [
      { q: "How much does a Webflow website cost?", a: "Webflow sites start from around $1,500. Larger sites with CMS and custom interactions are quoted after a free chat, with monthly payment options." },
      { q: "Can you move my site to Webflow?", a: "Yes. I migrate content and set up redirects from WordPress, Squarespace, Wix and others so you keep your search rankings." },
      { q: "Is Webflow good for SEO?", a: "Very. It produces clean code, fast pages and gives full control over metadata and structure." },
    ],
    relatedWork: ["Olympics / Brisbane 2032", "VML / Foundation Day"],
    related: ["web-design", "framer", "ui-ux", "seo"],
  },

  wix: {
    title: "Wix Designer Perth",
    slug: "wix",
    tag: "Wix",
    group: "platform",
    showInServices: false,
    art: "touch",
    metaTitle: "Wix Designer Perth WA | Wix Website Design & SEO",
    metaDescription:
      "Wix website designer in Perth. Custom Wix sites, redesigns and Wix SEO for small businesses. Or a smooth move off Wix when you've outgrown it.",
    h1: "Wix website design in Perth, done properly.",
    kicker: "Wix · Small business websites",
    images: { square: "services/app-design-perth-travis-weerts.jpg" },
    hero: {
      headline: "Wix website design in Perth, done properly.",
      subheadline: "Make the most of Wix, or move on when you've outgrown it.",
      description:
        "Lots of Perth businesses start on Wix. I help them make it look professional and get found, and when the time comes, migrate to something bigger without losing rankings.",
      cta: "Improve your Wix site",
    },
    story:
      "There's nothing wrong with Wix. There's a lot wrong with most Wix sites. With good structure, sharp design and proper SEO, it can work hard for a small business. And if you've outgrown it, I'll be honest about that too.",
    benefits: [
      { title: "Professional design", description: "A clean, considered look that builds trust at first glance." },
      { title: "Wix SEO", description: "Proper titles, structure, speed and local SEO so customers find you." },
      { title: "Easy editing", description: "Keep the simplicity of Wix with a site that's easy to update." },
      { title: "A way forward", description: "A smooth migration plan if you're ready to move platforms." },
    ],
    process: [
      { step: 1, title: "Review", description: "What's working, what isn't and where you want to go." },
      { step: 2, title: "Design", description: "A fresh structure and design for your Wix site." },
      { step: 3, title: "Build", description: "Built and optimised in Wix with SEO set up properly." },
      { step: 4, title: "Handover", description: "Training and support so you can run it yourself." },
    ],
    features: ["Wix website design", "Wix redesigns", "Wix SEO", "Wix Stores", "Booking setup", "Local SEO", "Migration off Wix", "Speed tidy-up", "Training", "Ongoing support"],
    pricing: { starting: "$800", timeline: "1–3 weeks" },
    faqs: [
      { q: "Can you make my Wix website look more professional?", a: "Yes. A redesign with better structure, typography and imagery makes a huge difference to trust and enquiries." },
      { q: "Should I move off Wix?", a: "Not always. If Wix does what you need, a redesign and SEO fix may be enough. If you need more flexibility, I'll plan a migration that protects your rankings." },
      { q: "How much does Wix website design cost?", a: "Wix projects start from around $800. You'll get a fixed quote after a free chat." },
    ],
    relatedWork: ["Darlington Arts Festival"],
    related: ["squarespace", "web-design", "seo"],
  },

  framer: {
    title: "Framer Developer Perth",
    slug: "framer",
    tag: "Framer",
    group: "platform",
    showInServices: false,
    art: "field",
    metaTitle: "Framer Developer Perth WA | Framer Websites for Startups",
    metaDescription:
      "Framer designer and developer in Perth. Beautiful, animated Framer websites and landing pages for startups and product launches, live in days not months.",
    h1: "Framer websites in Perth for startups that need to launch yesterday.",
    kicker: "Framer · Landing pages · Startups",
    images: { square: "services/ai-development-perth-travis-weerts.jpg" },
    hero: {
      headline: "Framer websites in Perth for startups that need to launch yesterday.",
      subheadline: "Beautiful, animated sites and landing pages, live in days.",
      description:
        "Framer is perfect for startups and product launches: design-led, animated and fast to ship. I design and build Framer sites that look like a funded company from day one.",
      cta: "Launch your site",
    },
    story:
      "When you're launching something new, speed matters as much as polish. Framer lets me design and ship a beautiful, animated site in days, then hand it over so your team can keep iterating without waiting on a developer.",
    benefits: [
      { title: "Launch fast", description: "From idea to live site in days, not months." },
      { title: "Motion built in", description: "Smooth animations and interactions that make a strong first impression." },
      { title: "Easy to iterate", description: "Your team can tweak copy and pages as the product evolves." },
      { title: "SEO ready", description: "Clean structure, metadata and fast hosting from the start." },
    ],
    process: [
      { step: 1, title: "Brief", description: "The product, the audience and the one thing the site must do." },
      { step: 2, title: "Design", description: "Design directly in Framer, with motion from the start." },
      { step: 3, title: "Build", description: "Responsive build, CMS, forms and SEO." },
      { step: 4, title: "Ship", description: "Launch, analytics and a quick handover." },
    ],
    features: ["Framer design", "Framer development", "Landing pages", "Animation & interactions", "CMS setup", "Waitlist & forms", "SEO setup", "Analytics", "Migrations", "Training"],
    pricing: { starting: "$1,200", timeline: "1–3 weeks" },
    faqs: [
      { q: "How much does a Framer website cost?", a: "Framer landing pages start from around $1,200. Full sites are quoted after a free chat." },
      { q: "Framer or Webflow?", a: "Framer is faster for design-led startup sites and landing pages; Webflow suits larger, CMS-heavy sites. I'll recommend the right one for your project." },
      { q: "Can my team edit a Framer site?", a: "Yes. Framer's editor is very approachable, and I'll set things up so your team can update content safely." },
    ],
    relatedWork: ["IOOKI Labs", "Xingo", "Looksee"],
    related: ["webflow", "web-design", "ui-ux", "brand"],
  },
};

// "From $X" when a starting price is published, otherwise a quote prompt
export const priceLabel = (service) =>
  service.pricing.starting ? `From ${service.pricing.starting}` : "Custom quote";

export const servicesList = Object.keys(services);

export const getService = (slug) => {
  return services[slug] || null;
};

export const getAllServices = () => {
  return Object.values(services);
};
