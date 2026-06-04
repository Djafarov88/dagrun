import type { Metadata } from "next";
import Link from "next/link";
import { SectionTitle } from "@/components/public/SectionTitle";
import { clubContent } from "@/lib/dagrun-content";
import { memberships } from "@/lib/memberships";

export const metadata: Metadata = {
  title: "Абонементы",
  description: "Абонементы и цены DAGRUN."
};

export default function MembershipsPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 bg-carbon">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgb(215_255_53_/_0.16),transparent_28rem)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Абонементы"
            title="Тренируйся в системе DAGRUN"
            description="Групповые тренировки, подготовка к стартам и индивидуальные цели в крупнейшем беговом сообществе Дагестана."
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {memberships.map((membership, index) => (
            <article
              key={membership.name}
              className={`rounded-lg border p-6 shadow-panel ${
                index === 2
                  ? "border-gold/40 bg-gold text-night"
                  : "border-white/10 bg-white/[0.04] text-chrome"
              }`}
            >
              <p className={`text-xs font-black uppercase tracking-[0.18em] ${index === 2 ? "text-night/60" : "text-gold"}`}>
                DAGRUN
              </p>
              <h2 className="mt-3 text-2xl font-black">{membership.name}</h2>
              <p className="mt-4 text-4xl font-black">{membership.price}</p>
              <p className={`mt-4 text-sm leading-6 ${index === 2 ? "text-night/70" : "text-steel"}`}>
                {membership.summary}
              </p>
              <ul className={`mt-6 space-y-3 text-sm ${index === 2 ? "text-night/75" : "text-steel"}`}>
                {membership.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <span className={`mt-2 size-2 shrink-0 rounded-full ${index === 2 ? "bg-night" : "bg-gold"}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={clubContent.telegram}
                className={`mt-8 inline-flex w-full justify-center rounded-md px-5 py-3 text-sm font-black uppercase tracking-[0.1em] ${
                  index === 2 ? "bg-night text-chrome" : "bg-gold text-night"
                }`}
              >
                Записаться
              </Link>
            </article>
          ))}
        </div>
        <div className="mt-10 rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-panel">
          <h2 className="text-2xl font-black text-chrome">Старт тренировок</h2>
          <p className="mt-3 text-sm leading-6 text-steel">{clubContent.schedule}</p>
          <p className="mt-2 text-sm leading-6 text-steel">{clubContent.location}</p>
        </div>
      </section>
    </>
  );
}
