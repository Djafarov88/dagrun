import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteAdminRegistration, updateAdminRegistration } from "@/app/admin/actions";
import { AdminNav } from "@/components/admin/AdminNav";
import { RegistrationForm } from "@/components/admin/RegistrationForm";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type EditRegistrationPageProps = {
  params: { id: string };
};

export const metadata: Metadata = {
  title: "Edit registration"
};

export default async function EditRegistrationPage({ params }: EditRegistrationPageProps) {
  const [registration, events] = await Promise.all([
    prisma.registration.findUnique({
      where: { id: params.id },
      include: { event: true, distance: true }
    }),
    prisma.event.findMany({
      orderBy: { date: "desc" },
      include: { distances: { orderBy: { lengthKm: "asc" } } }
    })
  ]);

  if (!registration) {
    notFound();
  }

  return (
    <>
      <AdminNav />
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <Link href="/admin/participants" className="text-sm font-black uppercase tracking-[0.14em] text-gold">
          Participants
        </Link>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-black text-chrome">
              {registration.firstName} {registration.lastName}
            </h1>
            <p className="mt-2 text-sm text-steel">{registration.event.title}</p>
          </div>
          <form action={deleteAdminRegistration.bind(null, registration.id)}>
            <button className="rounded-md border border-flame/50 px-5 py-3 text-sm font-black text-flame">
              Delete registration
            </button>
          </form>
        </div>
        <div className="mt-8">
          <RegistrationForm
            action={updateAdminRegistration.bind(null, registration.id)}
            events={events}
            registration={registration}
            submitLabel="Save registration"
          />
        </div>
      </section>
    </>
  );
}
