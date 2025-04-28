import localFont from "next/font/local";

export const objectBold = localFont({
  variable: "--font-object-bold",
  src: [
    { path: "./PPObjectSans-Bold.otf", weight: "500 700", style: "normal" },
  ],
});

export const objectHeavy = localFont({
  variable: "--font-object-heavy",
  src: [
    { path: "./PPObjectSans-Heavy.otf", weight: "800 900", style: "normal" },
  ],
});

export const objectRegular = localFont({
  variable: "--font-object-regular",
  src: [
    { path: "./PPObjectSans-Regular.otf", weight: "400", style: "normal" },
  ],
});

export const objectThin = localFont({
  variable: "--font-object-thin",
  src: [
    { path: "./PPObjectSans-Thin.otf", weight: "100 300", style: "normal" },
  ],
});

export const strange = localFont({
  variable: "--font-strange",
  src: [
    {
      path: "./bandeins_strange_var.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
});
