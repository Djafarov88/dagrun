import type { Metadata } from "next";
import Link from "next/link";
import { deleteRace } from "@/app/admin/actions";
import { AdminNav } from "@/components/admin/AdminNav";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin events"
};

export default async function AdminEventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { date: "desc" },
    include: {
      distances: { orderBy: { lengthKm: "asc" } },
      _count: { select: { registrations: true } }
    }
  });

  return (
    <>
      <AdminNav />
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-gold">Events</p>
            <h1 className="mt-3 text-4xl font-black text-chrome">Event management</h1>
          </div>
          <Link href="/admin/events/new" className="rounded-md bg-gold px-5 py-3 text-sm font-black text-night">
            Create event
          </Link>
        </div>
        <div className="mt-8 divide-y divide-white/10 overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] shadow-panel">
          {events.length === 0 ? (
            <div className="p-5 text-sm text-steel">No events yet.</div>
          ) : (
            events.map((event) => (
              <article key={event.id} className="grid gap-4 p-5 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="flex flex-wrap gap-2 text-xs font-black uppercase tracking-[0.12em]">
                    <span className="rounded-full bg-gold px-3 py-1 text-night">{event.registrationStatus}</span>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-steel">{event.status}</span>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-steel">{event.city}</span>
                  </div>
                  <h2 className="mt-3 text-2xl font-black text-chrome">{event.title}</h2>
                  <p className="mt-2 text-sm text-steel">{event.location}</p>
                  <p className="mt-2 text-sm text-steel">
                    {new Intl.DateTimeFormat("ru-RU", { dateStyle: "medium", timeStyle: "short" }).format(event.date)}
                  </p>
                  <p className="mt-3 text-sm text-steel">
                    {event.distances.length} distances / {event._count.registrations} registrations
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/events/${event.id}/edit`} className="rounded-md bg-chrome px-4 py-3 text-sm font-black text-night">
                    Edit
                  </Link>
                  <form action={deleteRace.bind(null, event.id)}>
                    <button className="rounded-md border border-flame/50 px-4 py-3 text-sm font-black text-flame">
                      Delete
                    </button>
                  </form>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </>
  );
}
