import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RegistrationStatus } from "@prisma/client";
import { RegistrationShell } from "@/components/registration/RegistrationShell";
import { prisma } from "@/lib/prisma";
import { activeRegistrationStatuses, formatMoney } from "@/lib/registration";

export const dynamic = "force-dynamic";

type RegisterPageProps = {
  params: {
    slug: string;
  };
};

export const metadata: Metadata = {
  title: "Select distance",
  description: "Select a race distance for DAGRUN registration."
};

export default async function RegisterPage({ params }: RegisterPageProps) {
  const race = await prisma.event.findUnique({
    where: { slug: params.slug },
    include: {
      distances: {
        orderBy: { lengthKm: "asc" },
        include: {
          _count: {
            select: {
              registrations: {
                where: { status: { in: activeRegistrationStatuses } }
              }
            }
          }
        }
      }
    }
  });

  if (!race) {
    notFound();
  }

  const registrationOpen = race.registrationStatus === RegistrationStatus.OPEN;

  return (
    <RegistrationShell
      slug={race.slug}
      step="Step 1 / 5"
      title="Select distance"
      description={`Choose a distance for ${race.title}. Slot availability is checked again before confirmation.`}
    >
      {!registrationOpen ? (
        <div className="rounded-lg border border-flame/40 bg-flame/10 p-5 text-sm font-bold text-flame">
          Registration is not open for this race.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {race.distances.map((distance) => {
            const taken = distance._count.registrations;
            const soldOut = distance.slotLimit !== null && taken >= distance.slotLimit;
            const remaining =
              distance.slotLimit === null ? "Unlimited slots" : `${Math.max(0, distance.slotLimit - taken)} slots left`;

            return (
              <article key={distance.id} className="rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-panel">
                <h2 className="text-3xl font-black text-gold">{distance.title}</h2>
                <p className="mt-2 text-sm text-steel">{distance.lengthKm.toString()} km</p>
                <p className="mt-4 text-2xl font-black text-chrome">{formatMoney(distance.price)}</p>
                <p className="mt-3 text-sm font-bold text-steel">{remaining}</p>
                {soldOut ? (
                  <button disabled className="mt-6 w-full rounded-md border border-white/10 px-4 py-3 text-sm font-black text-steel">
                    Sold out
                  </button>
                ) : (
                  <Link
                    href={`/events/${race.slug}/register/participant?distanceId=${distance.id}`}
                    className="mt-6 block rounded-md bg-gold px-4 py-3 text-center text-sm font-black text-night transition hover:bg-chrome"
                  >
                    Select
                  </Link>
                )}
              </article>
            );
          })}
        </div>
      )}
    </RegistrationShell>
  );
}
