import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { events, getEventBySlug } from "@/lib/events";

type EventDetailPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return events.map((event) => ({
    slug: event.slug
  }));
}

export function generateMetadata({ params }: EventDetailPageProps): Metadata {
  const event = getEventBySlug(params.slug);

  if (!event) {
    return {
      title: "Event not found"
    };
  }

  return {
    title: event.title,
    description: event.summary,
    openGraph: {
      title: event.title,
      description: event.summary,
      type: "article"
    }
  };
}

export default function EventDetailPage({ params }: EventDetailPageProps) {
  const event = getEventBySlug(params.slug);

  if (!event) {
    notFound();
  }

  const startsAt = new Date(`${event.date}T${event.time}:00`);
  const formattedDate = new Intl.DateTimeFormat("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(startsAt);

  return (
    <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <Link href="/events" className="text-sm font-bold text-ink hover:text-signal">
        Back to events
      </Link>
      <div className="mt-8 rounded-lg bg-white p-6 shadow-soft sm:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">
          {event.level}
        </p>
        <h1 className="mt-3 text-4xl font-black text-ink sm:text-5xl">{event.title}</h1>
        <p className="mt-4 text-lg leading-8 text-asphalt">{event.description}</p>
        <dl className="mt-8 grid gap-4 rounded-lg bg-track p-5 text-sm text-asphalt sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="font-bold text-ink">Date</dt>
            <dd>{formattedDate}</dd>
          </div>
          <div>
            <dt className="font-bold text-ink">Time</dt>
            <dd>{event.time}</dd>
          </div>
          <div>
            <dt className="font-bold text-ink">Distance</dt>
            <dd>{event.distance}</dd>
          </div>
          <div>
            <dt className="font-bold text-ink">Capacity</dt>
            <dd>{event.capacity} runners</dd>
          </div>
        </dl>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button className="rounded-md bg-ink px-5 py-3 text-sm font-bold text-white transition hover:bg-signal">
            Register interest
          </button>
          <Link
            href="/memberships"
            className="rounded-md border border-ink/20 px-5 py-3 text-center text-sm font-bold text-ink transition hover:border-ink"
          >
            Membership options
          </Link>
        </div>
      </div>
    </section>
  );
}
