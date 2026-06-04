import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin",
  description: "DAGRUN admin skeleton for event, membership, and registration operations."
};

const adminSections = [
  {
    title: "Events",
    description: "Create events, manage capacity, publish sessions, and review registrations."
  },
  {
    title: "Members",
    description: "Search members, update tiers, and track active membership status."
  },
  {
    title: "Operations",
    description: "Monitor registrations, waitlists, and upcoming club activity."
  }
];

export default function AdminPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">Admin</p>
          <h1 className="mt-3 text-4xl font-black text-ink sm:text-5xl">
            Club operations
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-asphalt">
            Skeleton dashboard for future protected workflows backed by Prisma and PostgreSQL.
          </p>
        </div>
        <Link
          href="/events"
          className="rounded-md border border-ink/20 bg-white px-5 py-3 text-center text-sm font-bold text-ink transition hover:border-ink"
        >
          Public events
        </Link>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {adminSections.map((section) => (
          <article key={section.title} className="rounded-lg border border-ink/10 bg-white p-6 shadow-soft">
            <h2 className="text-xl font-black text-ink">{section.title}</h2>
            <p className="mt-3 text-sm leading-6 text-asphalt">{section.description}</p>
            <button className="mt-6 rounded-md bg-track px-4 py-3 text-sm font-bold text-ink">
              Coming soon
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
