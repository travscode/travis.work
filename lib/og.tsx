import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

// Branded share cards (Open Graph / Twitter) rendered at build time.
// Every route gets its own: the real title, a kicker, and art where it fits.

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const root = process.cwd();
const font = (file: string) => fs.readFileSync(path.join(root, "app/fonts", file));
const heavy = font("PPObjectSans-Heavy.otf");
const regular = font("PPObjectSans-Regular.otf");

/** Local /public image as a data URI (jpg/png only; satori can't read webp). */
export function localImage(publicPath?: string) {
  if (!publicPath || !/\.(jpe?g|png)$/i.test(publicPath)) return undefined;
  const file = path.join(root, "public", publicPath);
  if (!fs.existsSync(file)) return undefined;
  const type = /\.png$/i.test(file) ? "image/png" : "image/jpeg";
  return `data:${type};base64,${fs.readFileSync(file).toString("base64")}`;
}

export function ogCard({
  kicker,
  title,
  subtitle,
  image,
  dark = false,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
  image?: string;
  dark?: boolean;
}) {
  const bg = dark ? "#111111" : "#E0D3BD";
  const fg = dark ? "#E0D3BD" : "#111111";
  const size = title.length > 70 ? 58 : title.length > 45 ? 68 : 80;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: bg, color: fg, padding: 64, fontFamily: "Object" }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between", paddingRight: image ? 48 : 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 22, letterSpacing: 3, textTransform: "uppercase" }}>
            <div style={{ width: 14, height: 14, borderRadius: 999, background: "#FFAE24" }} />
            <div style={{ display: "flex" }}>{kicker}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontFamily: "ObjectHeavy", fontSize: size, lineHeight: 0.98, letterSpacing: -2.5 }}>{title}</div>
            {subtitle && <div style={{ display: "flex", marginTop: 22, fontSize: 28, lineHeight: 1.3, opacity: 0.75 }}>{subtitle}</div>}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 24 }}>
            <div style={{ display: "flex", fontFamily: "ObjectHeavy", letterSpacing: -0.5 }}>TRAVIS WEERTS</div>
            <div style={{ display: "flex", opacity: 0.6 }}>travis.work</div>
          </div>
        </div>
        {image && (
          // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
          <img src={image} width={502} height={502} style={{ borderRadius: 28, objectFit: "cover", alignSelf: "center" }} />
        )}
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Object", data: regular, weight: 400, style: "normal" },
        { name: "ObjectHeavy", data: heavy, weight: 800, style: "normal" },
      ],
    },
  );
}
