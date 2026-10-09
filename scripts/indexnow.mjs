// Tells Bing (and other IndexNow engines like Yandex, Seznam, Naver) about every
// URL in the live sitemap so they recrawl quickly. Run after a deploy:
//   pnpm indexnow
// The key file lives at public/9d3c3b281943622ba9a57c3a17cd6b7b.txt and must stay deployed.

const SITE = process.env.SITE_URL || "https://travis.work";
const KEY = "9d3c3b281943622ba9a57c3a17cd6b7b";

const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
if (!urls.length) throw new Error("No URLs found in sitemap");

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(SITE).host,
    key: KEY,
    keyLocation: `${SITE}/${KEY}.txt`,
    urlList: urls,
  }),
});
console.log(`IndexNow: submitted ${urls.length} URLs, status ${res.status} ${res.statusText}`);
if (res.status >= 400) process.exitCode = 1;
