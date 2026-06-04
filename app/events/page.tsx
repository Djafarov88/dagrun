import type { Metadata } from "next";
import { EventCard } from "@/components/EventCard";
import { SectionHeader } from "@/components/SectionHeader";
import { events } from "@/lib/events";

export const metadata: Metadata = {
  title: "Старты",
  description: "Календарь забегов DAGRUN в Махачкале, Дербенте, Гунибе и других городах Дагестана."
};

export default function EventsPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Race calendar"
        title="Старты DAGRUN"
        description="Премиальные городские и горные забеги Дагестана: дистанции, расписание, маршруты и регистрация."
      />
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.slug} event={event} />
        ))}
      </div>
    </section>
  );
}
