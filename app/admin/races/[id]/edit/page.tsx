import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteRace, updateRace } from "@/app/admin/actions";
import { DistanceForms } from "@/components/admin/DistanceForms";
import { RaceForm } from "@/components/admin/RaceForm";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type EditRacePageProps = {
  params: {
    id: string;
  };
};

export const metadata: Metadata = {
  title: "Edit race",
  description: "Edit a DAGRUN race, distances, prices, slots, media links, and results."
};

export default async function EditRacePage({ params }: EditRacePageProps) {
  const race = await prisma.event.findUnique({
    where: { id: params.id },
    include: {
      distances: { orderBy: { lengthKm: "asc" } },
      _count: { select: { registrations: true } }
    }
  });

  if (!race) {
    notFound();
  }

  const updateAction = updateRace.bind(null, race.id);
  const deleteAction = deleteRace.bind(null, race.id);

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <Link href="/admin" className="text-sm font-black uppercase tracking-[0.14em] text-gold">
        Admin dashboard
      </Link>
      <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-gold">Edit race</p>
          <h1 className="mt-3 text-4xl font-black text-chrome sm:text-5xl">{race.title}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-steel">
            {race._count.registrations} registrations. Update race details, media links, results, distances, prices, and slot limits.
          </p>
        </div>
        <form action={deleteAction}>
          <button className="rounded-md border border-flame/50 px-5 py-3 text-sm font-black uppercase tracking-[0.1em] text-flame transition hover:bg-flame hover:text-white">
            Delete race
          </button>
        </form>
      </div>

      <div className="mt-8">
        <RaceForm race={race} action={updateAction} submitLabel="Save race" />
      </div>

      <DistanceForms raceId={race.id} distances={race.distances} />
    </section>
  );
}
