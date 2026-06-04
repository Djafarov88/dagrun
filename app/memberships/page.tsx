import type { Metadata } from "next";
import { SectionHeader } from "@/components/SectionHeader";
import { memberships } from "@/lib/memberships";

export const metadata: Metadata = {
  title: "Memberships",
  description: "Compare DAGRUN membership tiers for community running and race preparation."
};

export default function MembershipsPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Memberships"
        title="Choose your training rhythm"
        description="Simple tiers for runners who want consistency, structure, or race-focused support."
      />
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {memberships.map((membership) => (
          <article key={membership.name} className="rounded-lg border border-ink/10 bg-white p-6 shadow-soft">
            <h2 className="text-2xl font-black text-ink">{membership.name}</h2>
            <p className="mt-3 text-4xl font-black text-signal">{membership.price}</p>
            <p className="mt-4 text-sm leading-6 text-asphalt">{membership.summary}</p>
            <ul className="mt-6 space-y-3 text-sm text-asphalt">
              {membership.features.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <span className="mt-2 size-2 shrink-0 rounded-full bg-pine" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button className="mt-8 w-full rounded-md bg-ink px-5 py-3 text-sm font-bold text-white transition hover:bg-signal">
              Start membership
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
