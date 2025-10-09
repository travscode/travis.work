"use client";

import Script from "next/script";
export default function StartPage() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-4">Start Page</h1>
      <p className="text-lg">Welcome to the start page!</p>

      <div
        className="unicorn-embed"
        data-us-project-src="aiorb.json"
        data-us-scale="1"
        data-us-dpi="1.5"
        data-us-lazyload="true"
        data-us-disablemobile="true"
        data-us-alttext="Welcome to Unicorn Studio"
        data-us-arialabel="This is a canvas scene"
        data-us-base-url="/"
      ></div>
      <Script
        id="unicorn_studio"
        src="unicornStudio.umd.js"
        onReady={() => {
          console.log("Unicorn Studio is ready");
          UnicornStudio.init({
            crossOrigin: "anonymous", // Add this configuration
            basePath: "/", // Add this configuration
          })
            .then((scenes: any) => {
              // Scenes are ready
              console.log("Scenes are ready ");
            })
            .catch((err: any) => {
              console.error(err);
            });
        }}
      />
    </main>
  );
}
