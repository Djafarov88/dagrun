import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { confirmRegistration } from "@/app/events/[slug]/register/actions";
import { RegistrationShell } from "@/components/registration/RegistrationShell";
import { prisma } from "@/lib/prisma";
import { formatMoney } from "@/lib/registration";

export const dynamic = "force-dynamic";

type ConfirmPageProps = {
  params: {
    slug: string;
  };
  searchParams: {
    registrationId?: string;
  };
};

export const metadata: Metadata = {
  title: "Confirm registration",
  description: "Confirm DAGRUN race registration details."
};

export default async function ConfirmPage({ params, searchParams }: ConfirmPageProps) {
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

  const action = confirmRegistration.bind(null, params.slug, registration.id);

  return (
    <RegistrationShell
      slug={params.slug}
      step="Step 3 / 5"
      title="Confirm registration"
      description="Review the participant and distance details before moving to payment."
    >
      <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-panel sm:p-6">
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-black uppercase tracking-[0.14em] text-steel">Race</dt>
            <dd className="mt-1 font-black text-chrome">{registration.event.title}</dd>
          </div>
          <div>
            <dt className="text-xs font-black uppercase tracking-[0.14em] text-steel">Distance</dt>
            <dd className="mt-1 font-black text-chrome">{registration.distance.title}</dd>
          </div>
          <div>
            <dt className="text-xs font-black uppercase tracking-[0.14em] text-steel">Participant</dt>
            <dd className="mt-1 font-black text-chrome">
              {registration.firstName} {registration.lastName}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-black uppercase tracking-[0.14em] text-steel">Email</dt>
            <dd className="mt-1 font-black text-chrome">{registration.email}</dd>
          </div>
          <div>
            <dt className="text-xs font-black uppercase tracking-[0.14em] text-steel">Phone</dt>
            <dd className="mt-1 font-black text-chrome">{registration.phone}</dd>
          </div>
          <div>
            <dt className="text-xs font-black uppercase tracking-[0.14em] text-steel">Price</dt>
            <dd className="mt-1 font-black text-gold">{formatMoney(registration.distance.price)}</dd>
          </div>
        </dl>
        <form action={action} className="mt-6">
          <button className="w-full rounded-md bg-gold px-5 py-3 text-sm font-black uppercase tracking-[0.1em] text-night transition hover:bg-chrome sm:w-auto">
            Confirm registration
          </button>
        </form>
      </div>
    </RegistrationShell>
  );
}
