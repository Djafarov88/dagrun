import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { saveParticipant } from "@/app/events/[slug]/register/actions";
import { RegistrationShell } from "@/components/registration/RegistrationShell";
import { prisma } from "@/lib/prisma";
import { activeRegistrationStatuses, formatMoney } from "@/lib/registration";

export const dynamic = "force-dynamic";

type ParticipantPageProps = {
  params: {
    slug: string;
  };
  searchParams: {
    distanceId?: string;
  };
};

export const metadata: Metadata = {
  title: "Participant information",
  description: "Enter participant information for DAGRUN race registration."
};

export default async function ParticipantPage({ params, searchParams }: ParticipantPageProps) {
  if (!searchParams.distanceId) {
    notFound();
  }

  const distance = await prisma.distance.findUnique({
    where: { id: searchParams.distanceId },
    include: {
      event: true,
      _count: {
        select: {
          registrations: {
            where: { status: { in: activeRegistrationStatuses } }
          }
        }
      }
    }
  });

  if (!distance || distance.event.slug !== params.slug) {
    notFound();
  }

  const taken = distance._count.registrations;
  const soldOut = distance.slotLimit !== null && taken >= distance.slotLimit;
  const action = saveParticipant.bind(null, params.slug, distance.id);

  return (
    <RegistrationShell
      slug={params.slug}
      step="Step 2 / 5"
      title="Participant information"
      description={`${distance.event.title} / ${distance.title} / ${formatMoney(distance.price)}`}
    >
      {soldOut ? (
        <div className="rounded-lg border border-flame/40 bg-flame/10 p-5 text-sm font-bold text-flame">
          This distance is sold out.
        </div>
      ) : (
        <form action={action} className="grid gap-5 rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-panel sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-xs font-black uppercase tracking-[0.14em] text-steel">First name</span>
              <input name="firstName" required className="rounded-md border border-white/10 bg-night px-4 py-3 text-sm text-chrome outline-none focus:border-gold" />
            </label>
            <label className="grid gap-2">
              <span className="text-xs font-black uppercase tracking-[0.14em] text-steel">Last name</span>
              <input name="lastName" required className="rounded-md border border-white/10 bg-night px-4 py-3 text-sm text-chrome outline-none focus:border-gold" />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-xs font-black uppercase tracking-[0.14em] text-steel">Email</span>
              <input name="email" type="email" required className="rounded-md border border-white/10 bg-night px-4 py-3 text-sm text-chrome outline-none focus:border-gold" />
            </label>
            <label className="grid gap-2">
              <span className="text-xs font-black uppercase tracking-[0.14em] text-steel">Phone</span>
              <input name="phone" required className="rounded-md border border-white/10 bg-night px-4 py-3 text-sm text-chrome outline-none focus:border-gold" />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-xs font-black uppercase tracking-[0.14em] text-steel">Birth date</span>
              <input name="birthDate" type="date" className="rounded-md border border-white/10 bg-night px-4 py-3 text-sm text-chrome outline-none focus:border-gold" />
            </label>
            <label className="grid gap-2">
              <span className="text-xs font-black uppercase tracking-[0.14em] text-steel">Emergency contact</span>
              <input name="emergencyContact" className="rounded-md border border-white/10 bg-night px-4 py-3 text-sm text-chrome outline-none focus:border-gold" />
            </label>
          </div>
          <button className="rounded-md bg-gold px-5 py-3 text-sm font-black uppercase tracking-[0.1em] text-night transition hover:bg-chrome">
            Continue to confirmation
          </button>
        </form>
      )}
    </RegistrationShell>
  );
}
