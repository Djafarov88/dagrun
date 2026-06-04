import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteRace, updateRace } from "@/app/admin/actions";
import { AdminNav } from "@/components/admin/AdminNav";
import { DistanceForms } from "@/components/admin/DistanceForms";
import { RaceForm } from "@/components/admin/RaceForm";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type EditEventPageProps = {
  params: { id: string };
};

export const metadata: Metadata = {
  title: "Edit event"
};

export default async function EditEventPage({ params }: EditEventPageProps) {
  const event = await prisma.event.findUnique({
    where: { id: params.id },
    include: {
      distances: { orderBy: { lengthKm: "asc" } },
      _count: { select: { registrations: true } }
    }
  });

  if (!event) {
    notFound();
  }

  return (
    <>
      <AdminNav />
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Link href="/admin/events" className="text-sm font-black uppercase tracking-[0.14em] text-gold">
          Events
        </Link>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-black text-chrome">{event.title}</h1>
            <p className="mt-2 text-sm text-steel">{event._count.registrations} registrations</p>
          </div>
          <form action={deleteRace.bind(null, event.id)}>
            <button className="rounded-md border border-flame/50 px-5 py-3 text-sm font-black text-flame">
              Delete event
            </button>
          </form>
        </div>
        <div className="mt-8">
          <RaceForm race={event} action={updateRace.bind(null, event.id)} submitLabel="Save event" />
        </div>
        <DistanceForms raceId={event.id} distances={event.distances} />
      </section>
    </>
  );
}
