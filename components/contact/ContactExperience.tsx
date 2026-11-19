"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, MotionConfig } from "motion/react";
import { sendGAEvent } from "@next/third-parties/google";
import Header from "@/components/Header";
import { EASE_OUT, SplitHeadline } from "@/components/services/motion";
import { cn } from "@/lib/utils";

interface ServiceOption {
  slug: string;
  tag: string;
}

const BUDGETS = ["Under $5k", "$5k – $15k", "$15k – $40k", "$40k+", "Not sure yet"];
const TIMELINES = ["ASAP", "Next month or two", "Later this year", "Just exploring"];

const STEPS = ["name", "help", "budget", "timeline", "details", "email"] as const;
type Step = (typeof STEPS)[number];

/** Live time in Perth, with a little status line depending on the hour. */
function usePerthTime() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(id);
  }, []);
  if (!now) return { time: "", status: "" };
  const time = new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Perth",
    hour: "numeric",
    minute: "2-digit",
  }).format(now);
  const hour = Number(
    new Intl.DateTimeFormat("en-AU", {
      timeZone: "Australia/Perth",
      hour: "numeric",
      hourCycle: "h23",
    }).format(now),
  );
  const day = new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Perth",
    weekday: "short",
  }).format(now);
  const weekend = day === "Sat" || day === "Sun";
  const status =
    hour < 6
      ? "Fast asleep. I'll read this first thing."
      : hour < 9
        ? "Coffee in hand, inbox open."
        : hour < 17
          ? weekend
            ? "Probably in the Hills — still checking messages."
            : "At the desk, making things."
          : hour < 22
            ? "Winding down, but I'll see this tonight."
            : "Late one. I'll reply in the morning.";
  return { time, status };
}

const SEO_PICKS: Record<string, string> = {
  "seo-audit": "I'd like to book the one-time SEO audit. My website is: ",
  "seo-local": "I'd like the Local SEO plan. My website is: ",
  "seo-growth": "I'd like the Growth SEO plan. My website is: ",
  "seo-authority": "I'd like the Authority SEO plan. My website is: ",
  "seo-citations": "I'm interested in the directory & citation pack. My website is: ",
  "seo-links": "I'm interested in monthly link building. My website is: ",
  "seo-authority-campaign": "I'm interested in an authority campaign to build my domain authority. My website is: ",
  "seo-disavow": "I'm interested in a backlink clean-up. My website is: ",
};

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://au.linkedin.com/in/travisweerts",
    icon: (
      <svg viewBox="0 0 40 40" className="w-full h-full" aria-hidden>
        <rect width="40" height="40" fill="#0A66C2" />
        <path
          fill="#fff"
          d="M10.5 15.5h4.2V29h-4.2zM12.6 9a2.4 2.4 0 1 1 0 4.8 2.4 2.4 0 0 1 0-4.8zM17.3 15.5h4v1.85h.06c.56-1.06 1.93-2.18 3.97-2.18 4.25 0 5.04 2.8 5.04 6.44V29h-4.2v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.53 1.72-2.53 3.49V29h-4.2z"
        />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/tr_____av",
    icon: (
      <svg viewBox="0 0 40 40" className="w-full h-full" aria-hidden>
        <defs>
          <radialGradient id="ig-grad" cx="0.28" cy="1.05" r="1.25">
            <stop offset="0" stopColor="#FFD776" />
            <stop offset="0.25" stopColor="#F9A13A" />
            <stop offset="0.5" stopColor="#E1306C" />
            <stop offset="0.75" stopColor="#C13584" />
            <stop offset="1" stopColor="#5B51D8" />
          </radialGradient>
        </defs>
        <rect width="40" height="40" fill="url(#ig-grad)" />
        <rect x="9.5" y="9.5" width="21" height="21" rx="6" fill="none" stroke="#fff" strokeWidth="2.4" />
        <circle cx="20" cy="20" r="5" fill="none" stroke="#fff" strokeWidth="2.4" />
        <circle cx="26.3" cy="13.7" r="1.5" fill="#fff" />
      </svg>
    ),
  },
];

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export default function ContactExperience({
  services,
}: {
  services: ServiceOption[];
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [name, setName] = useState("");
  const [help, setHelp] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [details, setDetails] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const { time, status: perthStatus } = usePerthTime();

  const step: Step = STEPS[stepIndex];
  const firstName = name.trim().split(" ")[0];

  // Arriving from a service page (/contact?service=seo) pre-selects it
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("service");
    const match = services.find((s) => s.slug === slug);
    if (match) setHelp([match.tag]);
    // Hosting plan buttons send ?plan=business-annual
    const plan = params.get("plan")?.match(/^([a-z]+)-(monthly|annual)$/);
    if (plan) {
      const name = plan[1][0].toUpperCase() + plan[1].slice(1);
      setDetails(`I'd like the ${name} hosting plan, billed ${plan[2]}.`);
    }
    // SEO plan, audit and add-on buttons send ?plan=seo-growth etc.
    const seo = SEO_PICKS[params.get("plan") ?? ""];
    if (seo) setDetails(seo);
  }, [services]);

  // Focus the input whenever a typing step appears
  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 450);
    return () => clearTimeout(t);
  }, [stepIndex]);

  const canContinue =
    (step === "name" && name.trim().length > 0) ||
    (step === "help" && help.length > 0) ||
    step === "budget" ||
    step === "timeline" ||
    step === "details" ||
    (step === "email" && isEmail(email));

  const go = (delta: number) => {
    setDirection(delta);
    setStepIndex((i) => Math.max(0, Math.min(STEPS.length - 1, i + delta)));
  };

  const pickAndAdvance = (setter: (v: string) => void, value: string) => {
    setter(value);
    setTimeout(() => go(1), 280);
  };

  const submit = async (e?: FormEvent) => {
    e?.preventDefault();
    if (!isEmail(email) || !name.trim()) return;
    setStatus("sending");
    const message = [
      `Interested in: ${help.join(", ") || "—"}`,
      `Budget: ${budget || "—"}`,
      `Timeline: ${timeline || "—"}`,
      "",
      details.trim() || "(No extra details)",
    ].join("\n");
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message,
          source: "Contact page",
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      sendGAEvent("event", "generate_lead", {
        source: "Contact page",
        services: help.join(", "),
        budget,
      });
    } catch {
      setStatus("error");
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter" || e.shiftKey) return;
    e.preventDefault();
    if (!canContinue) return;
    if (step === "email") submit();
    else go(1);
  };

  const questions: Record<Step, { kicker: string; title: string; hint?: string }> = {
    name: {
      kicker: "Let's start simple",
      title: "Hey, I'm Travis. What should I call you?",
    },
    help: {
      kicker: "The fun part",
      title: `Nice to meet you, ${firstName || "friend"}. What can I help with?`,
      hint: "Pick as many as you like.",
    },
    budget: {
      kicker: "Ballpark is fine",
      title: "Roughly what budget are you working with?",
      hint: "Helps me suggest the right approach. Skip if you're not sure.",
    },
    timeline: {
      kicker: "No pressure",
      title: "When would you love this to be real?",
    },
    details: {
      kicker: "In your own words",
      title: "Tell me a little about it.",
      hint: "The idea, the problem, the dream. Messy is welcome.",
    },
    email: {
      kicker: "Last one",
      title: `Where should I send my reply, ${firstName || "friend"}?`,
      hint: "I reply personally — usually within one business day.",
    },
  };

  const chip = (label: string, active: boolean, onClick: () => void, i: number) => (
    <motion.button
      type="button"
      key={label}
      onClick={onClick}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + i * 0.04, duration: 0.5, ease: EASE_OUT }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "rounded-full border px-5 py-3 md:px-6 md:py-3.5 text-base md:text-lg font-object-bold tracking-[-0.01em] transition-colors duration-300 cursor-pointer",
        active
          ? "bg-tw-black text-tw-white border-tw-black"
          : "border-tw-black/25 hover:border-tw-black hover:bg-tw-black/5",
      )}
      aria-pressed={active}
    >
      {active && <span className="mr-2 text-tw-accent">●</span>}
      {label}
    </motion.button>
  );

  const briefRows = [
    { label: "Name", value: name.trim() },
    { label: "Help with", value: help.join(", ") },
    { label: "Budget", value: budget },
    { label: "Timeline", value: timeline },
    { label: "Details", value: details.trim() },
    { label: "Reply to", value: email.trim() },
  ];
  const hasBrief = briefRows.some((row) => row.value);

  return (
    <MotionConfig reducedMotion="user">
      {/* Page-entry curtain (pure CSS so it plays immediately) */}
      <div aria-hidden className="curtain fixed inset-0 z-[200] bg-tw-black pointer-events-none" />

      <div className="grain min-h-screen bg-tw-white text-tw-black font-object-regular selection:bg-tw-black selection:text-tw-white">
        <Header variant="light" />

        <main className="px-5 md:px-10 pt-10 md:pt-32 pb-20 min-h-[100svh]">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            {/* ---------------- FORM ---------------- */}
            <section className="lg:col-span-8 flex flex-col min-h-[70vh]">
              <div className="flex items-center justify-between">
                <h1 className="font-mono text-xs uppercase tracking-[0.18em]">
                  Contact · Start a project
                </h1>
                {status !== "sent" && (
                  <span className="font-mono text-xs opacity-50">
                    {String(stepIndex + 1).padStart(2, "0")} /{" "}
                    {String(STEPS.length).padStart(2, "0")}
                  </span>
                )}
              </div>

              {/* progress */}
              <div className="mt-4 h-px bg-tw-black/15 relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-tw-black"
                  animate={{
                    width:
                      status === "sent"
                        ? "100%"
                        : `${((stepIndex + 1) / STEPS.length) * 100}%`,
                  }}
                  transition={{ duration: 0.8, ease: EASE_OUT }}
                />
              </div>

              <div className="relative flex-1 flex flex-col justify-center py-14 md:py-20">
                <AnimatePresence mode="wait" custom={direction}>
                  {status === "sent" ? (
                    <motion.div
                      key="sent"
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, ease: EASE_OUT }}
                    >
                      <div className="relative w-24 h-24">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <motion.span
                            key={i}
                            className={cn(
                              "absolute left-1/2 top-1/2 w-3 h-3 rounded-full",
                              i % 2 ? "bg-tw-accent" : "bg-tw-black",
                            )}
                            initial={{ x: "-50%", y: "-50%", scale: 0 }}
                            animate={{
                              x: `calc(-50% + ${Math.cos((i / 10) * Math.PI * 2) * 90}px)`,
                              y: `calc(-50% + ${Math.sin((i / 10) * Math.PI * 2) * 90}px)`,
                              scale: [0, 1, 0],
                            }}
                            transition={{ duration: 1.1, delay: 0.3, ease: EASE_OUT }}
                          />
                        ))}
                        <svg viewBox="0 0 96 96" className="w-24 h-24">
                          <motion.circle
                            cx="48" cy="48" r="44" fill="#111"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            style={{ transformOrigin: "48px 48px" }}
                            transition={{ type: "spring", stiffness: 260, damping: 18 }}
                          />
                          <motion.path
                            d="M30 49 L43 62 L67 36"
                            fill="none"
                            stroke="#FFAE24"
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: 0.35, duration: 0.6, ease: EASE_OUT }}
                          />
                        </svg>
                      </div>
                      <SplitHeadline
                        as="h2"
                        text={`Sent. Talk soon, ${firstName}.`}
                        className="mt-10 font-object-heavy text-[12vw] md:text-[6.5vw] leading-[0.92] tracking-[-0.05em]"
                        delay={0.2}
                      />
                      <p className="mt-8 text-xl max-w-xl leading-snug text-tw-black/75">
                        Your brief is in my inbox. I&apos;ll reply to{" "}
                        <b className="font-object-bold text-tw-black">{email}</b>{" "}
                        personally — usually within one business day.
                      </p>
                      <div className="mt-10 flex flex-wrap gap-3">
                        <Link
                          href="/"
                          className="rounded-full bg-tw-black text-tw-white px-6 py-3.5 font-object-bold hover:bg-tw-grey-dark transition-colors"
                        >
                          Browse the work →
                        </Link>
                        <Link
                          href="/services"
                          className="rounded-full border border-tw-black/25 px-6 py-3.5 font-object-bold hover:bg-tw-black hover:text-tw-white transition-colors"
                        >
                          Explore services
                        </Link>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key={step}
                      custom={direction}
                      onSubmit={submit}
                      onKeyDown={onKeyDown}
                      variants={{
                        enter: (d: number) => ({ opacity: 0, y: d > 0 ? 60 : -60, filter: "blur(10px)" }),
                        center: { opacity: 1, y: 0, filter: "blur(0px)" },
                        exit: (d: number) => ({ opacity: 0, y: d > 0 ? -60 : 60, filter: "blur(10px)" }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.55, ease: EASE_OUT }}
                    >
                      <div className="font-mono text-xs uppercase tracking-[0.18em] opacity-60">
                        {questions[step].kicker}
                      </div>
                      <h2 className="mt-5 font-object-heavy text-[10vw] md:text-[5vw] lg:text-[4.2vw] leading-[0.95] tracking-[-0.045em] max-w-[16ch]">
                        {questions[step].title}
                      </h2>
                      {questions[step].hint && (
                        <p className="mt-5 text-lg text-tw-black/60 max-w-xl">
                          {questions[step].hint}
                        </p>
                      )}

                      <div className="mt-10 md:mt-12">
                        {step === "name" && (
                          <input
                            ref={(el) => {
                              inputRef.current = el;
                            }}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                            autoComplete="name"
                            aria-label="Your name"
                            className="w-full bg-transparent border-b-2 border-tw-black/25 focus:border-tw-black outline-none py-4 text-3xl md:text-5xl font-object-bold tracking-[-0.03em] placeholder:text-tw-black/25 transition-colors"
                          />
                        )}

                        {step === "help" && (
                          <div className="flex flex-wrap gap-3">
                            {[...services.map((s) => s.tag), "Something else"].map((tag, i) =>
                              chip(
                                tag,
                                help.includes(tag),
                                () =>
                                  setHelp((h) =>
                                    h.includes(tag) ? h.filter((x) => x !== tag) : [...h, tag],
                                  ),
                                i,
                              ),
                            )}
                          </div>
                        )}

                        {step === "budget" && (
                          <div className="flex flex-wrap gap-3">
                            {BUDGETS.map((b, i) =>
                              chip(b, budget === b, () => pickAndAdvance(setBudget, b), i),
                            )}
                          </div>
                        )}

                        {step === "timeline" && (
                          <div className="flex flex-wrap gap-3">
                            {TIMELINES.map((t, i) =>
                              chip(t, timeline === t, () => pickAndAdvance(setTimeline, t), i),
                            )}
                          </div>
                        )}

                        {step === "details" && (
                          <textarea
                            ref={(el) => {
                              inputRef.current = el;
                            }}
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            rows={4}
                            placeholder="I've got this idea for…"
                            aria-label="Project details"
                            className="w-full bg-transparent border-b-2 border-tw-black/25 focus:border-tw-black outline-none py-4 text-2xl md:text-3xl font-object-bold tracking-[-0.02em] leading-snug placeholder:text-tw-black/25 resize-none transition-colors"
                          />
                        )}

                        {step === "email" && (
                          <input
                            ref={(el) => {
                              inputRef.current = el;
                            }}
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@company.com"
                            autoComplete="email"
                            aria-label="Your email"
                            className="w-full bg-transparent border-b-2 border-tw-black/25 focus:border-tw-black outline-none py-4 text-3xl md:text-5xl font-object-bold tracking-[-0.03em] placeholder:text-tw-black/25 transition-colors"
                          />
                        )}
                      </div>

                      {status === "error" && (
                        <p className="mt-6 text-red-700">
                          Something went wrong sending that. Please try again, or
                          message me on{" "}
                          <a
                            href="https://au.linkedin.com/in/travisweerts"
                            className="underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            LinkedIn
                          </a>
                          .
                        </p>
                      )}

                      <div className="mt-12 flex items-center gap-4">
                        {stepIndex > 0 && (
                          <button
                            type="button"
                            onClick={() => go(-1)}
                            className="w-14 h-14 rounded-full border border-tw-black/25 flex items-center justify-center hover:bg-tw-black hover:text-tw-white transition-colors cursor-pointer"
                            aria-label="Previous question"
                          >
                            ←
                          </button>
                        )}
                        {step === "email" ? (
                          <button
                            type="submit"
                            disabled={!canContinue || status === "sending"}
                            className="group rounded-full bg-tw-black text-tw-white pl-7 pr-3 py-3 font-object-bold inline-flex items-center gap-4 disabled:opacity-30 transition-opacity cursor-pointer disabled:cursor-not-allowed"
                          >
                            {status === "sending" ? "Sending…" : "Send my brief"}
                            <span className="w-10 h-10 rounded-full bg-tw-accent text-tw-black flex items-center justify-center transition-transform duration-500 group-hover:rotate-[-45deg]">
                              {status === "sending" ? (
                                <motion.span
                                  className="w-4 h-4 rounded-full border-2 border-tw-black border-t-transparent"
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                />
                              ) : (
                                "→"
                              )}
                            </span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => go(1)}
                            disabled={!canContinue}
                            className="group rounded-full bg-tw-black text-tw-white pl-7 pr-3 py-3 font-object-bold inline-flex items-center gap-4 disabled:opacity-30 transition-opacity cursor-pointer disabled:cursor-not-allowed"
                          >
                            {(step === "budget" && !budget) ||
                            (step === "timeline" && !timeline) ||
                            (step === "details" && !details.trim())
                              ? "Skip"
                              : "Continue"}
                            <span className="w-10 h-10 rounded-full bg-tw-accent text-tw-black flex items-center justify-center transition-transform duration-500 group-hover:translate-x-1">
                              →
                            </span>
                          </button>
                        )}
                        {(step === "name" || step === "email") && (
                          <span className="hidden md:inline text-xs text-tw-black/50">
                            or press <kbd className="font-mono">Enter ↵</kbd>
                          </span>
                        )}
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </section>

            {/* ---------------- SIDEBAR ---------------- */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-32 flex flex-col gap-4">
                {/* Human bit + DMs */}
                <motion.div
                  className="rounded-[28px] bg-tw-paper border border-tw-black/10 p-7"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.9, ease: EASE_OUT }}
                >
                  <div className="flex gap-5 items-center">
                    <div className="relative w-16 h-16 shrink-0 rounded-full overflow-hidden">
                      <Image
                        src="/assets/media/trav_avatar.jpg"
                        alt="Travis Weerts, designer and developer in Perth"
                        title="Travis Weerts"
                        fill
                        sizes="64px"
                        className="object-cover object-center"
                      />
                    </div>
                    <div className="text-sm leading-snug">
                      <div className="font-object-bold">
                        {time ? `It's ${time} in Perth` : "Perth, Western Australia"}
                      </div>
                      <div className="text-tw-black/60 mt-1">
                        {perthStatus || "Replies within one business day."}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-tw-black/10">
                    <div className="font-mono text-xs uppercase tracking-[0.18em] opacity-60">
                      Rather chat? DM me on
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {SOCIALS.map((s) => (
                        <a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => sendGAEvent("event", "social_click", { network: s.label, source: "Contact page" })}
                          className="group flex items-center gap-3 rounded-2xl bg-white border border-tw-black/10 p-3 pr-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:border-tw-black hover:-translate-y-0.5 transition-all duration-300"
                        >
                          <span className="w-10 h-10 shrink-0 rounded-xl overflow-hidden shadow-sm">
                            {s.icon}
                          </span>
                          <span className="font-object-bold text-sm leading-tight">
                            {s.label}
                            <span className="block font-object-regular text-xs text-tw-black/50 group-hover:text-tw-black transition-colors">
                              Message ↗
                            </span>
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Live brief: only once there's something in it */}
                <AnimatePresence>
                  {hasBrief && status !== "sent" && (
                    <motion.div
                      key="brief"
                      className="rounded-[28px] bg-tw-black text-tw-white p-7"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.6, ease: EASE_OUT }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs uppercase tracking-[0.18em] opacity-60">
                          Your brief
                        </span>
                        <span className="flex items-center gap-1.5 text-[10px] font-object-bold uppercase tracking-wider">
                          <motion.span
                            className="w-1.5 h-1.5 rounded-full bg-tw-accent"
                            animate={{ opacity: [1, 0.2, 1] }}
                            transition={{ duration: 1.4, repeat: Infinity }}
                          />
                          Drafting
                        </span>
                      </div>
                      <dl className="mt-6 space-y-4">
                        {briefRows
                          .filter((row) => row.value)
                          .map((row) => (
                            <motion.div
                              layout
                              key={row.label}
                              className="flex gap-4 text-sm"
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.35 }}
                            >
                              <dt className="w-20 shrink-0 opacity-50">{row.label}</dt>
                              <dd className="flex-1 min-w-0 font-object-bold break-words line-clamp-3">
                                {row.value}
                              </dd>
                            </motion.div>
                          ))}
                      </dl>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </MotionConfig>
  );
}
