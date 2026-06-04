import type { Metadata } from "next";
import Link from "next/link";
import { createRace } from "@/app/admin/actions";
import { RaceForm } from "@/components/admin/RaceForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Create race",
  description: "Create a DAGRUN race in the admin panel."
};

export default function NewRacePage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <Link href="/admin" className="text-sm font-black uppercase tracking-[0.14em] text-gold">
        Admin dashboard
      </Link>
      <div className="mt-8">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-gold">Create race</p>
        <h1 className="mt-3 text-4xl font-black text-chrome sm:text-5xl">New DAGRUN race</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-steel">
          Add the core race details, publication state, registration state, and media/result links.
        </p>
      </div>
      <div className="mt-8">
        <RaceForm action={createRace} submitLabel="Create race" />
      </div>
    </section>
  );
}
