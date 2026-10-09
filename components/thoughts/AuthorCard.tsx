import Image from "next/image";
import Link from "next/link";

/** "Who wrote this" box at the end of every article. Good for readers and for E-E-A-T. */
export default function AuthorCard() {
  return (
    <aside className="mt-20 rounded-[28px] bg-tw-black text-tw-white p-8 md:p-10 flex flex-col md:flex-row gap-8 md:items-center">
      <div className="relative w-24 h-24 shrink-0 rounded-full overflow-hidden">
        <Image src="/assets/media/trav_bio.jpg" alt="Travis Weerts" fill sizes="96px" className="object-cover object-top" />
      </div>
      <div className="flex-1">
        <div className="font-mono text-xs uppercase tracking-[0.18em] opacity-50">Written by</div>
        <div className="mt-2 font-object-heavy text-3xl tracking-[-0.04em]">Travis Weerts</div>
        <p className="mt-3 text-sm leading-relaxed text-tw-white/70 max-w-xl">
          Award-winning designer, developer and creative consultant in Perth. Work featured by Apple,
          for clients from the UN and the Olympics to local wineries and first-time founders.
        </p>
      </div>
      <Link
        href="/contact"
        className="self-start md:self-center rounded-full bg-tw-accent text-tw-black px-6 py-3.5 font-object-bold hover:bg-tw-white transition-colors"
      >
        Start a project →
      </Link>
    </aside>
  );
}
