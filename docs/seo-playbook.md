# travis.work SEO playbook

Copy-paste templates for the off-site work that moves rankings most. Work top to bottom; most items take 5 to 15 minutes.

---

## 1. Get credit links from past clients (biggest win)

A link from a real local business to your site is the strongest signal you can earn. Ask each client to add a small footer credit linking to their project page.

| Client | Their site | Link it to |
|---|---|---|
| Fervor Wines | fervorwines.com.au | https://travis.work/work/fervor |
| BOOBOOK Bottles & Bar | boobookbottlesandbar.com.au | https://travis.work/work/boobook-bottles-and-bar |
| Space Collective | spacecollective.com.au | https://travis.work/work/space-collective |
| Darlington Arts Festival | darlingtonartsfestival.com | https://travis.work/work/darlington-arts-festival |
| DUET Property Group | duetproperty.com.au | https://travis.work/work/duet |
| Skigh Wine (Coda) | skighwine.com.au | https://travis.work/work/coda |
| Cirillo Estate | cirilloestatewines.com.au | https://travis.work/work/cirillo-1850-estate |
| Hunter Markets | (app + site) | https://travis.work/work/hunter-markets |
| IOOKI / Xingo | iooki.io, xingo.ai | https://travis.work/work/iooki-labs |

**Email template**

> Subject: Quick favour?
>
> Hey [Name],
>
> Hope things are going well! I've just put together a page about the work we did together: [project page link]
>
> Would you be open to adding a small "Website/brand by Travis Weerts" credit in your site footer, linking to that page? It genuinely helps me get found by other businesses, and I'm happy to add it for you if that's easier.
>
> Thanks heaps,
> Travis

Footer snippet to send if they ask:

```html
<a href="https://travis.work/work/[project-slug]">Brand & website by Travis Weerts</a>
```

---

## 2. Google Business Profile

Set up at business.google.com. Use **service area** mode (no street address shown).

- **Business name:** Travis Weerts (don't add keywords to the name; Google suspends profiles for it)
- **Primary category:** Website designer
- **Secondary categories:** Graphic designer, Software company, Marketing consultant, Internet marketing service
- **Service area:** Perth WA, Perth Hills, Fremantle, Joondalup, Mandurah, Rockingham, Margaret River (Google allows up to 20)
- **Website:** https://travis.work/start (the small business page converts best for local searchers)

**Description (750 character limit):**

> Award-winning freelance web designer, app developer and creative consultant in Perth WA. I help small businesses, startups and established brands get found and look great online: custom websites, Shopify and WordPress builds, branding, app design and development, SEO and AI search optimisation. My work has been featured by Apple and includes projects for the UN, the Brisbane 2032 Olympics, Wendy's and local wineries, bars and studios. You work directly with me from first chat to launch, with fixed quotes and monthly payment plans available. Based in Perth and working with businesses across WA and Australia.

**Services to add:** Web design, Website development, Shopify development, WordPress development, Logo and brand design, App design, App development, SEO, AI search optimisation (GEO), Graphic design.

**Photos:** your bio photo, 5 to 10 project images, and a couple of the service prints.

---

## 3. Ask for reviews

Aim for 5 this month, then 1 to 2 a month. Get your review link from Google Business Profile ("Ask for reviews").

**Message template (email or text):**

> Hey [Name], I'm trying to grow my small business and Google reviews make a huge difference. If you were happy with the [project], would you mind leaving a quick review? It takes about a minute: [review link]
>
> Even a sentence or two about what we worked on helps. Thank you!

Tip: reviews that mention the service and place ("website design", "Perth", "branding") help most. Don't script them, just mention what you'd love them to talk about.

---

## 4. Directory and profile listings

Use **exactly** the same name, website and description everywhere.

- **Name:** Travis Weerts
- **Website:** https://travis.work
- **Location:** Perth, WA, Australia
- **Short description (160 chars):** Award-winning freelance web designer and app developer in Perth WA. Websites, branding, apps, SEO and AI search for small businesses and startups.

| Where | Notes |
|---|---|
| Bing Places | bingplaces.com, import from Google Business Profile |
| Apple Business Connect | businessconnect.apple.com, shows in Apple Maps and Siri |
| Clutch | clutch.co, ask 2 or 3 clients for reviews here too |
| DesignRush | designrush.com |
| Hotfrog | hotfrog.com.au |
| True Local | truelocal.com.au |
| LinkedIn | add travis.work to your profile and a Services section |
| GitHub | add travis.work to your profile |
| Instagram | link in bio to https://travis.work/start |
| Behance / Dribbble | portfolio pieces linking to /work pages |

---

## 5. Make travis.work the original for your Medium posts

For each post on Medium: **Write a story > ... > Import a story**, paste the travis.work URL (e.g. https://travis.work/thoughts/spotify-said-no). Medium creates a copy that credits your site as the original, then delete the old duplicate. Do the most-read posts first.

---

## 6. LinkedIn posts (one per article)

Post the short version and put the link in the first comment.

**How much does a website cost in Perth?**
> "How much does a website cost?" is the question I get asked most, usually a bit nervously.
>
> So here's a straight answer from someone who builds them in Perth: DIY builders are cheap but cost your time. A freelancer typically starts around $1,500 to $5,000 for a small business site. Bigger custom builds and stores go up from there.
>
> The bit nobody mentions: budget about $30 a month to run it, and make sure you own your domain and accounts.
>
> Full breakdown in the comments.

**How to get your business recommended by ChatGPT**
> More and more people skip Google and just ask ChatGPT: "Who's a good [your trade] in Perth?"
>
> It gives two or three names. If you're not one of them, you never get considered.
>
> The good news: in Australia, hardly anyone is working on this yet. Clear service pages, honest FAQ answers, consistent profiles and real reviews go a long way.
>
> I wrote a practical guide for small businesses. Link in the comments.

**Freelancer or agency?**
> I've worked inside big agencies on projects for the UN, the Olympics and Wendy's. I've also worked solo for local wineries and first-time founders.
>
> Both can be great. Agencies shine on big, multi-team projects. Freelancers shine when you want direct contact, speed and no paying for layers you don't need.
>
> Five questions to ask either before you sign. Link in the comments.

---

## 7. Monthly routine (30 minutes)

1. **Search Console > Performance > Queries.** Find searches where you rank in positions 8 to 20. Improve that page (better title, an extra section, an FAQ) or write a new article targeting it.
2. **Publish one article** in `content/thoughts/` (frontmatter values in double quotes). Ideas waiting: SEO cost in Perth, Squarespace vs Framer, website timelines by platform, building a website with AI.
3. **Run `pnpm indexnow`** after deploying new pages.
4. **Ask for one or two reviews.**
5. **Test AI search:** ask ChatGPT, Gemini and Perplexity "best freelance web designer in Perth" and "who can help my business show up in ChatGPT in Perth". Note whether you appear.
