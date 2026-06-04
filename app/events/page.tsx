import type { Metadata } from "next";
import { EventCard } from "@/components/EventCard";
import { SectionHeader } from "@/components/SectionHeader";
import { events } from "@/lib/events";

export const metadata: Metadata = {
  title: "Events",
  description: "Browse upcoming DAGRUN training sessions, long runs, and track events."
};

export default function EventsPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Calendar"
        title="Upcoming DAGRUN events"
        description="Mobile-friendly event listings for weekly sessions, long runs, and race-prep workouts."
      />
      <div className="mt-10 grid gap-5">
        {events.map((event) => (
          <EventCard key={event.slug} event={event} />
        ))}
      </div>
    </section>
  );
}
