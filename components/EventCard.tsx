import Link from "next/link";
import type { Event } from "@/lib/events";

const statusLabels = {
  open: "Регистрация открыта",
  soon: "Скоро",
  closed: "Закрыто"
};

type EventCardProps = {
  event: Event;
};

export function EventCard({ event }: EventCardProps) {
  const date = new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(event.date));

  return (
    <article className="group overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] shadow-panel backdrop-blur">
      <div
        className="min-h-56 bg-cover bg-center transition duration-700 group-hover:scale-[1.03]"
        style={{ backgroundImage: `linear-gradient(180deg, transparent, rgb(5 6 10 / 0.78)), url(${event.coverImage})` }}
      />
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.14em]">
          <span className="rounded-full bg-gold px-3 py-1 text-night">
            {statusLabels[event.registrationStatus]}
          </span>
          <span className="text-steel">{event.city}</span>
        </div>
        <h2 className="mt-4 text-2xl font-black text-chrome">{event.title}</h2>
        <p className="mt-3 text-sm leading-6 text-steel">{event.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {event.distances.map((distance) => (
            <span key={distance} className="rounded-md border border-white/10 px-3 py-2 text-sm font-bold text-chrome">
              {distance}
            </span>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="text-sm font-bold text-chrome">{date}</p>
          <Link
            href={`/events/${event.slug}`}
            className="rounded-md bg-chrome px-4 py-3 text-sm font-black text-night transition hover:bg-gold"
          >
            Подробнее
          </Link>
        </div>
      </div>
    </article>
  );
}
