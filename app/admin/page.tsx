import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin",
  description: "DAGRUN admin skeleton for race, membership, and registration operations."
};

const adminSections = [
  {
    title: "Events",
    description: "Create races, manage registration status, distances, schedules, and partners."
  },
  {
    title: "Members",
    description: "Search members, update club tiers, and track active membership status."
  },
  {
    title: "Operations",
    description: "Monitor race registrations, waitlists, and upcoming club activity."
  }
];

export default function AdminPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold">Admin</p>
          <h1 className="mt-3 text-4xl font-black text-chrome sm:text-5xl">
            Club operations
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-steel">
            Skeleton dashboard for future protected workflows backed by Prisma and PostgreSQL.
          </p>
        </div>
        <Link
          href="/events"
          className="rounded-md border border-white/20 bg-white/10 px-5 py-3 text-center text-sm font-bold text-chrome transition hover:bg-white/20"
        >
          Public events
        </Link>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {adminSections.map((section) => (
          <article key={section.title} className="rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-panel">
            <h2 className="text-xl font-black text-chrome">{section.title}</h2>
            <p className="mt-3 text-sm leading-6 text-steel">{section.description}</p>
            <button className="mt-6 rounded-md bg-gold px-4 py-3 text-sm font-bold text-night">
              Coming soon
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
