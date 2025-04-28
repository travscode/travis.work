import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { objectBold, objectRegular, objectThin, objectHeavy } from "@/app/fonts";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Travis Weerts | Award-winning Perth based digital designer, developer, and creative consultant",
  description: "Helping startups ditch the dull and launch with style—think killer design, sharp dev, and brands that actually get noticed. Boring? Nope, not here.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${objectHeavy.variable} ${objectBold.variable} ${objectThin.variable} ${objectRegular.variable} antialiased bg-tw-black text-tw-white`}
      >
        {children}
      </body>
    </html>
  );
}
