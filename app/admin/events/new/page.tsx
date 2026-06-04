import type { Metadata } from "next";
import Link from "next/link";
import { createRace } from "@/app/admin/actions";
import { AdminNav } from "@/components/admin/AdminNav";
import { RaceForm } from "@/components/admin/RaceForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Create event"
};

export default function NewEventPage() {
  return (
    <>
      <AdminNav />
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <Link href="/admin/events" className="text-sm font-black uppercase tracking-[0.14em] text-gold">
          Events
        </Link>
        <h1 className="mt-6 text-4xl font-black text-chrome">Create event</h1>
        <div className="mt-8">
          <RaceForm action={createRace} submitLabel="Create event" />
        </div>
      </section>
    </>
  );
}
