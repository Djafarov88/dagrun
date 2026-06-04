import Link from "next/link";
import type { Event } from "@/lib/events";

type EventCardProps = {
  event: Event;
};

export function EventCard({ event }: EventCardProps) {
  const date = new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(`${event.date}T${event.time}:00`));

  return (
    <article className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-pine">
            {event.level}
          </p>
          <h2 className="mt-2 text-2xl font-black text-ink">{event.title}</h2>
          <p className="mt-3 text-sm leading-6 text-asphalt">{event.summary}</p>
        </div>
        <div className="shrink-0 rounded-md bg-track px-4 py-3 text-sm font-bold text-ink">
          {date}
        </div>
      </div>
      <dl className="mt-5 grid grid-cols-2 gap-3 text-sm text-asphalt sm:grid-cols-4">
        <div>
          <dt className="font-bold text-ink">Time</dt>
          <dd>{event.time}</dd>
        </div>
        <div>
          <dt className="font-bold text-ink">Distance</dt>
          <dd>{event.distance}</dd>
        </div>
        <div className="col-span-2">
          <dt className="font-bold text-ink">Location</dt>
          <dd>{event.location}</dd>
        </div>
      </dl>
      <Link
        href={`/events/${event.slug}`}
        className="mt-6 inline-flex rounded-md bg-ink px-4 py-3 text-sm font-bold text-white transition hover:bg-signal"
      >
        View details
      </Link>
    </article>
  );
}
