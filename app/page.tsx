import Link from "next/link";
import { EventCard } from "@/components/EventCard";
import { events } from "@/lib/events";
import { memberships } from "@/lib/memberships";

export default function HomePage() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:items-center lg:px-8 lg:py-20">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">
            Running club
          </p>
          <h1 className="mt-4 text-5xl font-black tracking-normal text-ink sm:text-6xl">
            DAGRUN
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-asphalt">
            Structured group runs, race-focused training, and memberships for runners who want
            rhythm, accountability, and better miles.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/events"
              className="rounded-md bg-ink px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-signal"
            >
              Find a run
            </Link>
            <Link
              href="/memberships"
              className="rounded-md border border-ink/20 bg-white px-5 py-3 text-center text-sm font-bold text-ink transition hover:border-ink"
            >
              View memberships
            </Link>
          </div>
        </div>
        <div className="rounded-lg bg-ink p-5 text-white shadow-soft">
          <div className="aspect-[4/3] rounded-md bg-[linear-gradient(135deg,#f25f3a_0%,#f25f3a_38%,#e7ecef_38%,#e7ecef_62%,#1f4d3a_62%,#1f4d3a_100%)]" />
          <dl className="mt-5 grid grid-cols-3 gap-3 text-center">
            <div>
              <dt className="text-2xl font-black">3</dt>
              <dd className="text-xs uppercase tracking-[0.12em] text-white/70">Weekly runs</dd>
            </div>
            <div>
              <dt className="text-2xl font-black">12+</dt>
              <dd className="text-xs uppercase tracking-[0.12em] text-white/70">Pace groups</dd>
            </div>
            <div>
              <dt className="text-2xl font-black">48</dt>
              <dd className="text-xs uppercase tracking-[0.12em] text-white/70">Race plans</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">
                Next up
              </p>
              <h2 className="mt-2 text-3xl font-black text-ink">Upcoming events</h2>
            </div>
            <Link href="/events" className="text-sm font-bold text-ink hover:text-signal">
              See all events
            </Link>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {events.slice(0, 3).map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {memberships.map((membership) => (
            <div key={membership.name} className="rounded-lg border border-ink/10 bg-white p-5">
              <h3 className="text-xl font-black text-ink">{membership.name}</h3>
              <p className="mt-2 text-3xl font-black text-signal">{membership.price}</p>
              <p className="mt-3 text-sm leading-6 text-asphalt">{membership.summary}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
