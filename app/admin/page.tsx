import type { Metadata } from "next";
import Link from "next/link";
import { deleteRace } from "@/app/admin/actions";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
  description: "DAGRUN admin panel for race CRUD, distances, media links, results, and registration statistics."
};

export default async function AdminPage() {
  const [raceCount, distanceCount, registrationCount, openRaceCount, races, registrationsByRace] =
    await Promise.all([
      prisma.event.count(),
      prisma.distance.count(),
      prisma.registration.count(),
      prisma.event.count({ where: { registrationStatus: "OPEN" } }),
      prisma.event.findMany({
        orderBy: { date: "asc" },
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
    { label: "Races", value: raceCount },
    { label: "Open registration", value: openRaceCount },
    { label: "Distances", value: distanceCount },
    { label: "Registrations", value: registrationCount }
  ];

  const registrationMap = new Map(
    registrationsByRace.map((item) => [item.eventId, item._count.id])
  );

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-gold">Admin</p>
          <h1 className="mt-3 text-4xl font-black text-chrome sm:text-5xl">
            Race control center
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-steel">
            Manage races, distances, slot limits, prices, media links, result links, and registrations.
          </p>
        </div>
        <Link
          href="/admin/races/new"
          className="rounded-md bg-gold px-5 py-3 text-center text-sm font-black uppercase tracking-[0.1em] text-night transition hover:bg-chrome"
        >
          Create race
        </Link>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <article key={stat.label} className="rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-panel">
            <p className="text-sm font-black uppercase tracking-[0.14em] text-steel">{stat.label}</p>
            <p className="mt-3 text-4xl font-black text-gold">{stat.value}</p>
          </article>
        ))}
      </div>

      <div className="mt-10 overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] shadow-panel">
        <div className="border-b border-white/10 p-5">
          <h2 className="text-2xl font-black text-chrome">Races</h2>
        </div>
        <div className="divide-y divide-white/10">
          {races.length === 0 ? (
            <div className="p-5 text-sm text-steel">No races created yet.</div>
          ) : (
            races.map((race) => {
              const deleteAction = deleteRace.bind(null, race.id);
              const registered = registrationMap.get(race.id) ?? 0;
              const slots = race.distances.reduce((sum, distance) => sum + (distance.slotLimit ?? 0), 0);

              return (
                <article key={race.id} className="grid gap-4 p-5 lg:grid-cols-[1fr_auto] lg:items-center">
                  <div>
                    <div className="flex flex-wrap gap-2 text-xs font-black uppercase tracking-[0.12em]">
                      <span className="rounded-full bg-gold px-3 py-1 text-night">{race.registrationStatus}</span>
                      <span className="rounded-full border border-white/10 px-3 py-1 text-steel">{race.status}</span>
                      <span className="rounded-full border border-white/10 px-3 py-1 text-steel">{race.city}</span>
                    </div>
                    <h3 className="mt-3 text-2xl font-black text-chrome">{race.title}</h3>
                    <p className="mt-2 text-sm text-steel">
                      {new Intl.DateTimeFormat("ru-RU", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      }).format(race.date)}
                    </p>
                    <div className="mt-4 grid gap-3 text-sm text-steel sm:grid-cols-3">
                      <span>{race.distances.length} distances</span>
                      <span>{registered} registrations</span>
                      <span>{slots > 0 ? `${slots} total slots` : "No slot limit"}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
                    <Link
                      href={`/admin/races/${race.id}/edit`}
                      className="rounded-md bg-chrome px-4 py-3 text-center text-sm font-black text-night transition hover:bg-gold"
                    >
                      Edit
                    </Link>
                    <form action={deleteAction}>
                      <button className="w-full rounded-md border border-flame/50 px-4 py-3 text-sm font-black text-flame transition hover:bg-flame hover:text-white">
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
  );
}
