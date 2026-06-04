import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { completePayment } from "@/app/events/[slug]/register/actions";
import { RegistrationShell } from "@/components/registration/RegistrationShell";
import { prisma } from "@/lib/prisma";
import { formatMoney } from "@/lib/registration";

export const dynamic = "force-dynamic";

type PaymentPageProps = {
  params: {
    slug: string;
    registrationId: string;
  };
};

export const metadata: Metadata = {
  title: "Payment",
  description: "Payment placeholder for DAGRUN race registration."
};

export default async function PaymentPage({ params }: PaymentPageProps) {
  const registration = await prisma.registration.findUnique({
    where: { id: params.registrationId },
    include: { event: true, distance: true }
  });

  if (!registration || registration.event.slug !== params.slug) {
    notFound();
  }

  const action = completePayment.bind(null, params.slug, registration.id);

  return (
    <RegistrationShell
      slug={params.slug}
      step="Step 4 / 5"
      title="Payment placeholder"
      description="This placeholder simulates a payment provider handoff. The registration is stored and awaiting payment completion."
    >
      <div className="rounded-lg border border-gold/30 bg-gold p-6 text-night shadow-glow">
        <p className="text-sm font-black uppercase tracking-[0.16em]">Amount due</p>
        <p className="mt-3 text-5xl font-black">{formatMoney(registration.distance.price)}</p>
        <p className="mt-4 text-sm font-bold leading-6 text-night/70">
          {registration.event.title} / {registration.distance.title} / {registration.firstName} {registration.lastName}
        </p>
        <form action={action} className="mt-6">
          <button className="rounded-md bg-night px-5 py-3 text-sm font-black uppercase tracking-[0.1em] text-chrome transition hover:bg-carbon">
            Mark payment complete
          </button>
        </form>
      </div>
    </RegistrationShell>
  );
}
