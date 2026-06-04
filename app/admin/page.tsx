import type { Metadata } from "next";
import Link from "next/link";
import { deleteRace } from "@/app/admin/actions";
import { AdminNav } from "@/components/admin/AdminNav";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
  description: "DAGRUN production admin dashboard."
};

export default async function AdminPage() {
  const [
    totalEvents,
    totalRegistrations,
    paidRegistrations,
    pendingRegistrations,
    upcomingEvents,
    registrationsByRace
  ] = await Promise.all([
    prisma.event.count(),
    prisma.registration.count(),
    prisma.registration.count({ where: { status: "PAID" } }),
    prisma.registration.count({ where: { status: "PAYMENT_PENDING" } }),
    prisma.event.findMany({
      where: { date: { gte: new Date() } },
      orderBy: { date: "asc" },
      take: 5,
      include: {
        distances: { orderBy: { lengthKm: "asc" } },
        _count: { select: { registrations: true } }
      }
    }),
    prisma.registration.groupBy({
      by: ["eventId"],
      _count: { id: true }
    })
  ]);

  const stats = [
    { label: "Total events", value: totalEvents },
    { label: "Total registrations", value: totalRegistrations },
    { label: "Paid registrations", value: paidRegistrations },
    { label: "Payment pending", value: pendingRegistrations },
    { label: "Upcoming events", value: upcomingEvents.length },
    { label: "Revenue", value: "Placeholder" }
  ];

  const registrationMap = new Map(
    registrationsByRace.map((item) => [item.eventId, item._count.id])
  );

  return (
    <>
      <AdminNav />
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-gold">Admin</p>
            <h1 className="mt-3 text-4xl font-black text-chrome sm:text-5xl">
              DAGRUN control center
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-steel">
              Manage events, participants, memberships, homepage content, trainers, and partners.
            </p>
          </div>
          <Link
            href="/admin/events/new"
            className="rounded-md bg-gold px-5 py-3 text-center text-sm font-black uppercase tracking-[0.1em] text-night transition hover:bg-chrome"
          >
            Create event
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <article key={stat.label} className="rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-panel">
              <p className="text-sm font-black uppercase tracking-[0.14em] text-steel">{stat.label}</p>
              <p className="mt-3 text-4xl font-black text-gold">{stat.value}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] shadow-panel">
          <div className="border-b border-white/10 p-5">
            <h2 className="text-2xl font-black text-chrome">Upcoming events</h2>
          </div>
          <div className="divide-y divide-white/10">
            {upcomingEvents.length === 0 ? (
              <div className="p-5 text-sm text-steel">No upcoming events.</div>
            ) : (
              upcomingEvents.map((event) => {
                const deleteAction = deleteRace.bind(null, event.id);
                const registered = registrationMap.get(event.id) ?? 0;

                return (
                  <article key={event.id} className="grid gap-4 p-5 lg:grid-cols-[1fr_auto] lg:items-center">
                    <div>
                      <div className="flex flex-wrap gap-2 text-xs font-black uppercase tracking-[0.12em]">
                        <span className="rounded-full bg-gold px-3 py-1 text-night">{event.registrationStatus}</span>
                        <span className="rounded-full border border-white/10 px-3 py-1 text-steel">{event.city}</span>
                      </div>
                      <h3 className="mt-3 text-2xl font-black text-chrome">{event.title}</h3>
                      <p className="mt-2 text-sm text-steel">{event.location}</p>
                      <p className="mt-2 text-sm text-steel">
                        {new Intl.DateTimeFormat("ru-RU", { dateStyle: "medium", timeStyle: "short" }).format(event.date)}
                      </p>
                      <p className="mt-3 text-sm text-steel">
                        {event.distances.length} distances / {registered} registrations
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
                      <Link href={`/admin/events/${event.id}/edit`} className="rounded-md bg-chrome px-4 py-3 text-center text-sm font-black text-night">
                        Edit
                      </Link>
                      <form action={deleteAction}>
                        <button className="w-full rounded-md border border-flame/50 px-4 py-3 text-sm font-black text-flame">
                          Delete
                        </button>
                      </form>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </div>
      </section>
    </>
  );
}
