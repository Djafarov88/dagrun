import type { Metadata } from "next";
import Link from "next/link";
import { createAdminRegistration } from "@/app/admin/actions";
import { AdminNav } from "@/components/admin/AdminNav";
import { RegistrationForm } from "@/components/admin/RegistrationForm";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Create registration"
};

export default async function NewRegistrationPage() {
  const events = await prisma.event.findMany({
    orderBy: { date: "desc" },
    include: { distances: { orderBy: { lengthKm: "asc" } } }
  });

  return (
    <>
      <AdminNav />
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <Link href="/admin/participants" className="text-sm font-black uppercase tracking-[0.14em] text-gold">
          Participants
        </Link>
        <h1 className="mt-6 text-4xl font-black text-chrome">Create registration</h1>
        <div className="mt-8">
          <RegistrationForm action={createAdminRegistration} events={events} submitLabel="Create registration" />
        </div>
      </section>
    </>
  );
}
