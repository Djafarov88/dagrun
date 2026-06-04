import type { Metadata } from "next";
import { EventCard } from "@/components/EventCard";
import { SectionTitle } from "@/components/public/SectionTitle";
import { getPublicEvents } from "@/lib/public-events";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Забеги",
  description: "Календарь забегов DAGRUN в Дагестане."
};

export default async function EventsPage() {
  const events = await getPublicEvents();
  const openEvents = events.filter((event) => event.registrationStatus === "open");
  const otherEvents = events.filter((event) => event.registrationStatus !== "open");

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 bg-carbon">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgb(215_255_53_/_0.16),transparent_28rem)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Race calendar"
            title="Старты DAGRUN"
            description="Городские и горные забеги с понятным статусом регистрации, дистанциями и сильной мобильной навигацией."
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-3">
          {[...openEvents, ...otherEvents].map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
      </section>
    </>
  );
}
