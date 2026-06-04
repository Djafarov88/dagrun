import type { Metadata } from "next";
import { SectionHeader } from "@/components/SectionHeader";
import { memberships } from "@/lib/memberships";

export const metadata: Metadata = {
  title: "Клуб",
  description: "Тренировочные форматы и клубные пакеты DAGRUN для бегунов Дагестана."
};

export default function MembershipsPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Membership"
        title="Тренируйся с DAGRUN"
        description="Выберите формат подготовки: от регулярных групповых тренировок до персонального сопровождения к стартам."
      />
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {memberships.map((membership) => (
          <article key={membership.name} className="rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-panel">
            <h2 className="text-2xl font-black text-chrome">{membership.name}</h2>
            <p className="mt-3 text-4xl font-black text-gold">{membership.price}</p>
            <p className="mt-4 text-sm leading-6 text-steel">{membership.summary}</p>
            <ul className="mt-6 space-y-3 text-sm text-steel">
              {membership.features.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <span className="mt-2 size-2 shrink-0 rounded-full bg-gold" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button className="mt-8 w-full rounded-md bg-gold px-5 py-3 text-sm font-black text-night transition hover:bg-chrome">
              Записаться
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
