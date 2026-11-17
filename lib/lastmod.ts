import "server-only";
import { execFileSync } from "node:child_process";

// Real "last modified" dates for the sitemap, taken from the last git commit
// that touched each page's source files. Stamping every URL with the build time
// teaches Google to ignore lastmod, so when git history isn't available (or is
// a shallow clone, where dates would be wrong) we return undefined and the
// sitemap simply leaves lastmod out.

let usable: boolean | undefined;
const cache = new Map<string, Date | undefined>();

function gitUsable(): boolean {
  if (usable !== undefined) return usable;
  try {
    const shallow = execFileSync("git", ["rev-parse", "--is-shallow-repository"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    usable = shallow === "false";
  } catch {
    usable = false;
  }
  return usable;
}

/** Date of the newest commit touching any of the given files or folders. */
export function lastModified(...paths: string[]): Date | undefined {
  if (!gitUsable()) return undefined;
  const key = paths.join("|");
  if (cache.has(key)) return cache.get(key);
  let date: Date | undefined;
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...paths], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    date = out ? new Date(out) : undefined;
  } catch {
    date = undefined;
  }
  cache.set(key, date);
  return date;
}
