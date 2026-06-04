import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RegistrationShell } from "@/components/registration/RegistrationShell";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type SuccessPageProps = {
  params: {
    slug: string;
  };
  searchParams: {
    registrationId?: string;
  };
};

export const metadata: Metadata = {
  title: "Registration complete",
  description: "Successful DAGRUN race registration."
};

export default async function SuccessPage({ params, searchParams }: SuccessPageProps) {
  if (!searchParams.registrationId) {
    notFound();
  }

  const registration = await prisma.registration.findUnique({
    where: { id: searchParams.registrationId },
    include: { event: true, distance: true }
  });

  if (!registration || registration.event.slug !== params.slug) {
    notFound();
  }

  return (
    <RegistrationShell
      slug={params.slug}
      step="Step 5 / 5"
      title="Registration complete"
      description="Your DAGRUN race registration has been saved successfully."
    >
      <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-panel">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-gold">Registration ID</p>
        <p className="mt-2 break-all text-xl font-black text-chrome">{registration.id}</p>
        <p className="mt-5 text-sm leading-6 text-steel">
          {registration.firstName} {registration.lastName} is registered for {registration.event.title}, distance {registration.distance.title}.
        </p>
        <Link
          href={`/events/${params.slug}`}
          className="mt-6 inline-flex rounded-md bg-gold px-5 py-3 text-sm font-black uppercase tracking-[0.1em] text-night transition hover:bg-chrome"
        >
          Back to race
        </Link>
      </div>
    </RegistrationShell>
  );
}
