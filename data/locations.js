// Location pages: /locations/[slug]
// Keep these genuinely useful (real local work, the suburbs covered, honest
// notes on how we'd work together). Avoid cloning pages per suburb: list
// suburbs inside the area page instead.
//
// work: project labels from data/projects.js that are local proof
// focus: service slugs to feature first for this area

export const locations = [
  // ------------------------------------------------------------------ Perth
  {
    slug: "perth-cbd-west-perth",
    name: "Perth CBD & West Perth",
    short: "Perth CBD",
    group: "Perth",
    metaTitle: "Web Designer Perth CBD & West Perth | Websites & Branding",
    metaDescription:
      "Freelance web designer and developer for businesses in the Perth CBD, West Perth, Northbridge and Leederville. Websites, branding, apps and SEO, with fixed quotes.",
    h1: "Web design and development for the Perth CBD and West Perth.",
    intro:
      "From hospitality on Hay Street to professional services in West Perth, city businesses compete for attention on every corner and every screen. I help them stand out with websites, brands and apps that are fast, sharp and easy to run.",
    context:
      "City businesses tend to need two things at once: a brand that holds its own next to big names, and a website that turns lunchtime searches into bookings and enquiries. I'm happy to meet in the city for a coffee, or keep things on a call if that suits your week better.",
    suburbs: ["Perth", "West Perth", "East Perth", "Northbridge", "Highgate", "Mount Lawley", "Leederville", "North Perth", "Mount Hawthorn"],
    work: ["BOOBOOK Bottles & Bar", "Space Collective", "HBF / Digital Transformation"],
    focus: ["web-design", "brand", "seo", "ui-ux"],
    inPerson: true,
    faqs: [
      { q: "Can we meet in person in the city?", a: "Yes. I regularly meet clients in the Perth CBD, West Perth and Northbridge. Most of the work happens remotely after that, so you're not losing hours to meetings." },
      { q: "Do you work with hospitality businesses?", a: "Yes. BOOBOOK, the wine bar and bottle shop in Perth's oldest liquor store on Hay Street, is one of my favourite recent projects." },
    ],
  },
  {
    slug: "western-suburbs",
    name: "Perth's Western Suburbs",
    short: "Western Suburbs",
    group: "Perth",
    metaTitle: "Web Designer Western Suburbs Perth | Subiaco, Claremont",
    metaDescription:
      "Web design, branding and SEO for businesses in Subiaco, Claremont, Nedlands, Cottesloe and Perth's western suburbs. Award-winning work, local and personal.",
    h1: "Web design for Subiaco, Claremont, Nedlands and the western suburbs.",
    intro:
      "Boutiques, clinics, real estate and lifestyle brands in the western suburbs live and die on first impressions. I design websites and brands that feel premium, load fast and make it easy for local customers to choose you.",
    context:
      "I led the UI/UX design for DUET Property Group in Nedlands, a tech-enabled agency covering the western suburbs, so I know how much a considered digital experience matters to customers in this part of Perth.",
    suburbs: ["Subiaco", "Claremont", "Nedlands", "Cottesloe", "Mosman Park", "Peppermint Grove", "Dalkeith", "Swanbourne", "Floreat", "Wembley", "Shenton Park", "City Beach"],
    work: ["DUET", "Space Collective"],
    focus: ["web-design", "brand", "ui-ux", "seo"],
    inPerson: true,
    faqs: [
      { q: "Do you design websites for real estate and property businesses?", a: "Yes. I led the UI/UX for DUET Property Group in Nedlands, designing a property experience that feels warm, personal and easy to explore." },
      { q: "Can you help a local clinic or studio get found on Google?", a: "Yes. Local SEO and a well-set-up Google Business Profile are often the fastest wins for western suburbs businesses competing in a small area." },
    ],
  },
  {
    slug: "perth-hills",
    name: "The Perth Hills",
    short: "Perth Hills",
    group: "Perth",
    metaTitle: "Web Designer Perth Hills | Kalamunda, Mundaring & Darlington",
    metaDescription:
      "Local web designer for the Perth Hills: Kalamunda, Mundaring, Darlington, Lesmurdie, Glen Forrest and Roleystone. Websites, branding, print and SEO for Hills businesses.",
    h1: "Web design for businesses in the Perth Hills.",
    intro:
      "Wineries, cafes, makers, tradies and community groups make the Hills what it is. I'm a local, and I help Hills businesses look as good online as they do in person, with websites, brands, print and SEO that bring people up the hill.",
    context:
      "I'm on the committee of the Darlington Arts Festival and design its print materials, so I've seen first-hand how a strong brand and clear information can draw thousands of visitors to the Hills for a weekend. The same thinking works for your business.",
    suburbs: ["Kalamunda", "Lesmurdie", "Mundaring", "Darlington", "Glen Forrest", "Greenmount", "Helena Valley", "Bickley", "Walliston", "Parkerville", "Sawyers Valley", "Roleystone", "Kelmscott", "Gidgegannup"],
    work: ["Darlington Arts Festival", "Fervor", "CODA"],
    focus: ["web-design", "brand", "graphic-design", "seo"],
    inPerson: true,
    faqs: [
      { q: "Are you actually based in the Hills?", a: "Yes. I'm a Perth Hills local, so I'm happy to meet at a cafe up here and I understand the mix of tourism, hospitality and small business that keeps the Hills going." },
      { q: "Can you help with print as well as a website?", a: "Yes. I design the Darlington Arts Festival's print materials and regularly do posters, signage and packaging alongside websites, so everything matches." },
    ],
  },
  {
    slug: "fremantle",
    name: "Fremantle",
    short: "Fremantle",
    group: "Perth",
    metaTitle: "Web Designer Fremantle | Websites & Branding for Freo Businesses",
    metaDescription:
      "Web design, branding and SEO for Fremantle businesses, from cafes and breweries to creative studios. Freelance, award-winning and easy to work with.",
    h1: "Web design and branding for Fremantle businesses.",
    intro:
      "Freo has character, and its businesses should too. Cafes, breweries, galleries, studios and makers deserve websites and brands that feel as individual as the port city itself, not another off-the-shelf template.",
    context:
      "Independent, creative businesses are where I do some of my favourite work. I'll help you build a brand people remember and a website that turns weekend wanderers and local regulars into bookings, orders and enquiries.",
    suburbs: ["Fremantle", "North Fremantle", "East Fremantle", "South Fremantle", "Beaconsfield", "White Gum Valley", "Hilton", "Bicton", "Palmyra", "Hamilton Hill", "Coogee", "Spearwood"],
    work: ["BOOBOOK Bottles & Bar", "Lume", "Fervor"],
    focus: ["brand", "web-design", "shopify", "seo"],
    inPerson: true,
    faqs: [
      { q: "Do you work with hospitality and creative businesses?", a: "Yes. I've branded wine labels, a bar in a historic bottle shop and a dim sum restaurant concept, and that independent spirit is a great fit for Fremantle." },
      { q: "Can you set up online ordering or a shop?", a: "Yes. I build Shopify and WooCommerce stores and can add bookings or ordering to an existing site." },
    ],
  },
  {
    slug: "northern-suburbs",
    name: "Perth's Northern Suburbs",
    short: "Northern Suburbs",
    group: "Perth",
    metaTitle: "Web Designer Joondalup & Northern Suburbs Perth WA",
    metaDescription:
      "Web design, SEO and branding for businesses in Joondalup, Wanneroo, Scarborough, Hillarys, Osborne Park and Perth's northern suburbs. Fixed quotes, monthly payments.",
    h1: "Web design for Joondalup, Scarborough and the northern suburbs.",
    intro:
      "The northern suburbs are home to thousands of growing businesses: trades, health, retail, hospitality and services. I help them get found on Google and turn that traffic into calls, with fast websites and practical local SEO.",
    context:
      "In fast-growing areas, the businesses that show up first in local search win the work. That's why every site I build comes with solid SEO foundations, and why I offer ongoing local SEO for businesses ready to grow.",
    suburbs: ["Joondalup", "Wanneroo", "Hillarys", "Scarborough", "Karrinyup", "Duncraig", "Osborne Park", "Innaloo", "Stirling", "Sorrento", "Currambine", "Clarkson", "Butler", "Alkimos"],
    work: ["Wendy's Hamburgers", "Hunter Markets"],
    focus: ["web-design", "seo", "wordpress", "geo"],
    inPerson: true,
    faqs: [
      { q: "Do you build websites for tradies and service businesses?", a: "Yes. Clear services, strong reviews, fast mobile pages and a tap-to-call button do most of the heavy lifting, and I set all of that up properly." },
      { q: "How quickly can local SEO help a northern suburbs business?", a: "Fixing your Google Business Profile and the technical basics can show results within weeks. Bigger ranking gains usually build over three to six months." },
    ],
  },
  {
    slug: "southern-suburbs",
    name: "Perth's Southern Suburbs",
    short: "Southern Suburbs",
    group: "Perth",
    metaTitle: "Web Designer Southern Suburbs Perth | Victoria Park & Applecross",
    metaDescription:
      "Websites, branding and SEO for businesses in Victoria Park, South Perth, Applecross, Canning Vale, Murdoch and Perth's southern suburbs.",
    h1: "Web design for Victoria Park, South Perth and the southern suburbs.",
    intro:
      "From cafe strips in Victoria Park to professional services in Applecross and industry in Canning Vale, the southern suburbs are a busy, varied market. I build websites and brands that help local businesses stand out and get chosen.",
    context:
      "My long-running Paint With Your Mind project began as an AI art experience for Murdoch University, so innovation and a bit of creative ambition are very welcome here too.",
    suburbs: ["Victoria Park", "East Victoria Park", "South Perth", "Como", "Applecross", "Mount Pleasant", "Booragoon", "Murdoch", "Bateman", "Willetton", "Canning Vale", "Cannington", "Thornlie", "Armadale"],
    work: ["Paint with your mind", "DUET"],
    focus: ["web-design", "seo", "ai-development", "brand"],
    inPerson: true,
    faqs: [
      { q: "Do you work with professional services firms?", a: "Yes. Accountants, clinics, consultants and property businesses benefit from clear, trustworthy websites and local SEO, and that's bread-and-butter work for me." },
      { q: "Can you add AI features to my website?", a: "Yes. From a chatbot trained on your services to booking automation, I'll recommend what's genuinely useful, not just what's trendy." },
    ],
  },
  {
    slug: "midland-swan-valley",
    name: "Midland & the Swan Valley",
    short: "Midland & Swan Valley",
    group: "Perth",
    metaTitle: "Web Designer Midland & Swan Valley | Wineries & Local Business",
    metaDescription:
      "Web design and branding for Midland, Guildford, Ellenbrook and Swan Valley businesses, including wineries, breweries and tourism. Award-winning, local and affordable.",
    h1: "Web design for Midland, Guildford and the Swan Valley.",
    intro:
      "Swan Valley wineries, breweries and producers, Guildford's heritage businesses and Midland's growing commercial hub all need to make a great first impression online. I help them do it with beautiful, practical websites and brands.",
    context:
      "Wine and hospitality branding is a real strength of mine: I've named and branded Fervor, redesigned Skigh Wine's Coda range and designed in-store displays for Cirillo Estate, home to some of the world's oldest vines.",
    suburbs: ["Midland", "Guildford", "Bassendean", "Swan View", "Stratton", "Ellenbrook", "Caversham", "Henley Brook", "Baskerville", "Herne Hill", "Upper Swan", "Bullsbrook"],
    work: ["Fervor", "CODA", "Cirillo 1850 Estate"],
    focus: ["brand", "web-design", "shopify", "seo"],
    inPerson: true,
    faqs: [
      { q: "Do you design websites for wineries and cellar doors?", a: "Yes. I've worked with several wine brands on naming, labels, packaging and digital, and I can set up online wine sales and cellar door bookings." },
      { q: "Can you help a tourism business get more bookings?", a: "Yes. A fast mobile site, clear booking flow and strong local SEO make a big difference to how many visitors turn into bookings." },
    ],
  },
  {
    slug: "rockingham-mandurah",
    name: "Rockingham & Mandurah",
    short: "Rockingham & Mandurah",
    group: "Perth",
    metaTitle: "Web Designer Rockingham & Mandurah | Websites, SEO & Branding",
    metaDescription:
      "Affordable web design, SEO and branding for businesses in Rockingham, Baldivis, Kwinana and Mandurah. Fixed quotes, monthly payment plans and a free first chat.",
    h1: "Web design for Rockingham, Baldivis and Mandurah.",
    intro:
      "Coastal towns south of Perth are full of owner-run businesses doing great work and getting overlooked online. I help them fix that with affordable websites, local SEO and brands that look the part.",
    context:
      "Most of the work happens remotely, so distance isn't a problem. We'll start with a free call, I'll send a fixed quote, and you can spread the cost over monthly payments if that's easier.",
    suburbs: ["Rockingham", "Baldivis", "Kwinana", "Safety Bay", "Warnbro", "Port Kennedy", "Secret Harbour", "Mandurah", "Halls Head", "Falcon", "Dawesville", "Pinjarra"],
    work: ["Hunter Markets", "Space Collective"],
    focus: ["web-design", "seo", "squarespace", "brand"],
    inPerson: false,
    faqs: [
      { q: "Is it a problem that I'm not in Perth itself?", a: "Not at all. I work with businesses all over WA and Australia. We'll talk on the phone or video, and I'm happy to come down for a proper kickoff if it helps." },
      { q: "What's the most affordable way to get online?", a: "A lean, well-built website on a platform like Squarespace or WordPress, plus a properly set-up Google Business Profile, is a great starting point. See the small business page for more." },
    ],
  },

  // ------------------------------------------------------------ Regional WA
  {
    slug: "margaret-river-south-west",
    name: "Margaret River & the South West",
    short: "Margaret River",
    group: "Western Australia",
    metaTitle: "Web Designer Margaret River & South West WA",
    metaDescription:
      "Websites and branding for Margaret River, Dunsborough, Busselton and South West WA businesses: wineries, breweries, tourism and hospitality.",
    h1: "Web design and branding for Margaret River and the South West.",
    intro:
      "Wineries, breweries, chefs, makers and tourism operators make the South West one of the most competitive places in Australia to win a visitor's attention. I help them do it with brands and websites that feel as good as the experience itself.",
    context:
      "I led the redesign of the Coda range for Skigh Wine, the Margaret River label with a cellar door at Yallingup Siding, so I understand how much the label, the website and the cellar door experience need to work together.",
    suburbs: ["Margaret River", "Yallingup", "Dunsborough", "Busselton", "Cowaramup", "Prevelly", "Augusta", "Bunbury", "Capel", "Witchcliffe"],
    work: ["CODA", "Cirillo 1850 Estate", "Fervor"],
    focus: ["brand", "web-design", "shopify", "graphic-design"],
    inPerson: false,
    faqs: [
      { q: "Do you design wine labels and packaging?", a: "Yes. Wine branding is one of my specialties: naming, identity, labels, packaging and in-store displays, plus the website and online shop." },
      { q: "Can you build an online wine shop?", a: "Yes. I build Shopify and WooCommerce stores, including wine clubs and age-gated checkouts." },
    ],
  },
  {
    slug: "great-southern-albany",
    name: "Albany, Denmark & the Great Southern",
    short: "Great Southern",
    group: "Western Australia",
    metaTitle: "Web Designer Albany & Denmark WA | Great Southern",
    metaDescription:
      "Web design, branding and packaging for businesses in Albany, Denmark, Mount Barker and the Great Southern. Award-winning, remote-friendly and personal.",
    h1: "Web design and branding for Albany, Denmark and the Great Southern.",
    intro:
      "The Great Southern is full of producers, growers and tourism operators with incredible stories to tell. I help them tell those stories with brands, packaging and websites that reach well beyond the region.",
    context:
      "I named and branded Fervor, the father-and-son wine label based in Denmark, WA, from the name through to identity and packaging, so I know the region's spirit and what makes its producers different.",
    suburbs: ["Albany", "Denmark", "Mount Barker", "Walpole", "Porongurup", "Frankland River", "Kendenup"],
    work: ["Fervor", "CODA"],
    focus: ["brand", "web-design", "shopify", "seo"],
    inPerson: false,
    faqs: [
      { q: "Can you work with us remotely from Perth?", a: "Yes. Fervor is based in Denmark, WA, and we worked together smoothly by phone, video and email." },
      { q: "Do you help with naming a new brand?", a: "Yes. I created the name Fervor as part of the brand strategy, including shortlists and availability checks." },
    ],
  },

  // ------------------------------------------------------------- Australia
  {
    slug: "melbourne",
    name: "Melbourne",
    short: "Melbourne",
    group: "Australia",
    metaTitle: "Freelance Web & App Developer for Melbourne Businesses",
    metaDescription:
      "Freelance web designer and app developer working with Melbourne businesses and startups. Behind work for Hunter Markets, Melbourne Airport and the Australian Open.",
    h1: "Web and app development for Melbourne businesses and startups.",
    intro:
      "Some of my most fun recent work has been for Melbourne: the Hunter Markets app, a talking Christmas koala at Melbourne Airport, and an AI photobooth for Wilson at the Australian Open. I work with Melbourne businesses and founders remotely, without the agency overheads.",
    context:
      "Melbourne is a brilliant place for ambitious, design-led businesses and startups. Working with a freelancer in Perth means senior design and development at a fraction of the price of a Melbourne agency, with everything handled over video and Slack.",
    suburbs: ["Melbourne CBD", "Fitzroy", "Collingwood", "Richmond", "South Yarra", "St Kilda", "Brunswick", "Mentone", "Cremorne", "Southbank"],
    work: ["Hunter Markets", "Melbourne Airport Activation", "Wilson / Australian Open AI Photobooth"],
    focus: ["app-development", "web-design", "ai-development", "ui-ux"],
    inPerson: false,
    faqs: [
      { q: "Can a Perth freelancer work with a Melbourne business?", a: "Absolutely. Hunter Markets is based in Melbourne and we designed and launched their app together remotely. Time zones are rarely an issue." },
      { q: "Do you build apps for startups?", a: "Yes. I design and build iOS and Android apps, from lean MVPs to full marketplaces like Hunter Markets." },
    ],
  },
  {
    slug: "sydney",
    name: "Sydney",
    short: "Sydney",
    group: "Australia",
    metaTitle: "Freelance Web & App Developer for Sydney Startups",
    metaDescription:
      "Remote freelance web designer, app and AI developer for Sydney startups and businesses. Senior, award-winning work without Sydney agency rates.",
    h1: "Web, app and AI development for Sydney startups and businesses.",
    intro:
      "Sydney startups and businesses get senior design and development from me without paying Sydney agency rates. I work remotely across websites, apps and AI products, with a process built around quick calls and fast iterations.",
    context:
      "I've designed for global brands through agencies like VML and Wunderman Thompson and built AI products at IOOKI, which has an office in Sydney. If you want agency-level craft with one direct point of contact, that's exactly how I work.",
    suburbs: ["Sydney CBD", "Surry Hills", "Newtown", "Bondi", "Manly", "Parramatta", "Chippendale", "Pyrmont", "North Sydney", "Alexandria"],
    work: ["IOOKI Labs", "Xingo", "United Nations / Don't Choose Extinction"],
    focus: ["web-design", "app-development", "ai-development", "webflow"],
    inPerson: false,
    faqs: [
      { q: "How do you work with clients interstate?", a: "Video calls, a shared project board and weekly progress updates. Most clients never need to meet in person, but I'm happy to travel for a kickoff." },
      { q: "Do you work with funded startups?", a: "Yes, and with pre-funding founders too. I help shape the product, pitch and MVP so you're building the right thing first." },
    ],
  },
  {
    slug: "brisbane",
    name: "Brisbane",
    short: "Brisbane",
    group: "Australia",
    metaTitle: "Freelance Web Developer for Brisbane Businesses",
    metaDescription:
      "Freelance web designer and developer working with Brisbane businesses. Helped build the Brisbane 2032 website with VML. Websites, apps and branding, remote-friendly.",
    h1: "Web design and development for Brisbane businesses.",
    intro:
      "As part of the VML team, I helped build the website for the Brisbane 2032 Olympic and Paralympic Games. Now I bring that same standard to Brisbane businesses of every size, remotely and without the agency layers.",
    context:
      "Brisbane's growing fast in the lead-up to 2032, and so is the competition online. I help businesses get ready with fast, accessible, well-built websites and the SEO to back them up.",
    suburbs: ["Brisbane CBD", "Fortitude Valley", "South Brisbane", "West End", "New Farm", "Paddington", "Newstead", "Milton", "Toowong", "Woolloongabba"],
    work: ["Olympics / Brisbane 2032", "HBF / Digital Transformation"],
    focus: ["web-design", "seo", "app-development", "ui-ux"],
    inPerson: false,
    faqs: [
      { q: "Did you really work on the Brisbane 2032 website?", a: "Yes. I helped build the Brisbane 2032 site as part of the VML team, working in Next.js to the standards of a global Olympic platform." },
      { q: "Can you work with a small Brisbane business?", a: "Of course. The same care goes into a five-page website as an Olympic one. See the small business page for where most people start." },
    ],
  },
  {
    slug: "gold-coast",
    name: "The Gold Coast",
    short: "Gold Coast",
    group: "Australia",
    metaTitle: "Freelance Web Designer for Gold Coast Businesses",
    metaDescription:
      "Remote freelance web designer for Gold Coast hospitality, tourism and lifestyle brands. Built the Wendy's Australia launch website. Websites, branding and SEO.",
    h1: "Web design for Gold Coast hospitality, tourism and lifestyle brands.",
    intro:
      "When Wendy's returned to Australia, its first restaurant opened in Surfers Paradise, and I built the Australian launch website while at VML. I help Gold Coast hospitality, tourism and lifestyle businesses make the same kind of entrance.",
    context:
      "On the Coast, a lot of your customers are visitors searching on their phones. Fast mobile pages, clear calls to action and strong local SEO are what turn those searches into bookings and walk-ins.",
    suburbs: ["Surfers Paradise", "Broadbeach", "Burleigh Heads", "Southport", "Coolangatta", "Palm Beach", "Miami", "Robina", "Main Beach", "Mermaid Beach"],
    work: ["Wendy's Hamburgers", "Smilebooth"],
    focus: ["web-design", "brand", "seo", "shopify"],
    inPerson: false,
    faqs: [
      { q: "Do you work with hospitality brands?", a: "Yes. From the Wendy's Australia launch site to bars, wineries and restaurant concepts, hospitality is a big part of my work." },
      { q: "Can you help us show up for tourists searching nearby?", a: "Yes. Local SEO, a strong Google Business Profile and fast mobile pages are exactly what help visitors find and choose you." },
    ],
  },
  {
    slug: "adelaide",
    name: "Adelaide & the Barossa",
    short: "Adelaide",
    group: "Australia",
    metaTitle: "Freelance Web Designer for Adelaide & the Barossa",
    metaDescription:
      "Remote freelance web designer and brand designer for Adelaide, Barossa and South Australian businesses, including wineries. Websites, branding and packaging.",
    h1: "Web design and branding for Adelaide and the Barossa.",
    intro:
      "South Australia's wine country has some extraordinary stories. I designed an in-store display for Cirillo Estate in the Barossa, custodians of some of the world's oldest Grenache vines, and I work with Adelaide and SA businesses on websites, brands and packaging.",
    context:
      "Whether you're a winery, a producer or a city business, I'll work with you remotely to build a brand and website that do your story justice, with a fixed quote and a direct line to me.",
    suburbs: ["Adelaide CBD", "North Adelaide", "Norwood", "Glenelg", "Unley", "Prospect", "Barossa Valley", "Tanunda", "Nuriootpa", "McLaren Vale"],
    work: ["Cirillo 1850 Estate", "Fervor", "CODA"],
    focus: ["brand", "web-design", "graphic-design", "shopify"],
    inPerson: false,
    faqs: [
      { q: "Do you work with South Australian wineries?", a: "Yes. I designed in-store display material for Cirillo Estate in the Barossa, and wine branding is one of my favourite kinds of project." },
      { q: "Can you handle packaging and print as well?", a: "Yes. Labels, packaging, point-of-sale and print are all part of what I do, alongside websites and digital." },
    ],
  },
];

export const getLocation = (slug) => locations.find((l) => l.slug === slug) || null;
