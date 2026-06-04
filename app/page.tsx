import Link from "next/link";
import { Countdown } from "@/components/Countdown";
import { EventCard } from "@/components/EventCard";
import { SectionTitle } from "@/components/public/SectionTitle";
import { clubContent, partners, stats, trainers } from "@/lib/dagrun-content";
import { getFeaturedPublicEvent, getPublicEvents } from "@/lib/public-events";
import { memberships } from "@/lib/memberships";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [featuredEvent, publicEvents] = await Promise.all([
    getFeaturedPublicEvent(),
    getPublicEvents()
  ]);

  const featuredDate = new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(featuredEvent.date));

  return (
    <>
      <section
        id="club"
        className="relative isolate min-h-[calc(100svh-57px)] overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgb(5 6 10 / 0.94) 0%, rgb(5 6 10 / 0.7) 46%, rgb(5 6 10 / 0.22) 100%), url(https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?auto=format&fit=crop&w=2200&q=85)"
        }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgb(215_255_53_/_0.12),transparent_32%,rgb(0_183_255_/_0.1))]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-night to-transparent" />
        <div className="relative mx-auto flex min-h-[calc(100svh-57px)] max-w-6xl flex-col justify-end px-4 pb-14 pt-24 sm:px-6 lg:px-8">
          <div className="animate-rise max-w-5xl">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-gold sm:text-sm">
              {clubContent.eyebrow}
            </p>
            <h1 className="mt-5 max-w-5xl text-5xl font-black leading-[0.9] text-chrome sm:text-7xl lg:text-8xl">
              {clubContent.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-steel sm:text-xl">
              {clubContent.intro}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/memberships"
                className="rounded-md bg-gold px-6 py-4 text-center text-sm font-black uppercase tracking-[0.1em] text-night transition hover:bg-chrome"
              >
                Записаться на тренировку
              </Link>
              <Link
                href={`/events/${featuredEvent.slug}/register`}
                className="rounded-md border border-white/20 bg-white/10 px-6 py-4 text-center text-sm font-black uppercase tracking-[0.1em] text-chrome backdrop-blur transition hover:bg-white/20"
              >
                Зарегистрироваться на забег
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-night">
        <div className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-white/10 px-4 sm:px-6 lg:px-8">
          {stats.map((stat) => (
            <div key={stat.label} className="py-6 text-center sm:px-6 sm:text-left">
              <div className="text-4xl font-black text-gold sm:text-6xl">{stat.value}</div>
              <div className="mt-2 text-[10px] font-black uppercase tracking-[0.14em] text-steel sm:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div
            className="min-h-[28rem] rounded-lg bg-cover bg-center shadow-panel"
            style={{
              backgroundImage: `linear-gradient(180deg, rgb(5 6 10 / 0.02), rgb(5 6 10 / 0.9)), url(${featuredEvent.coverImage})`
            }}
          />
          <div className="rounded-lg border border-gold/20 bg-white/[0.05] p-6 shadow-glow backdrop-blur sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">Featured race</p>
            <h2 className="mt-4 text-4xl font-black leading-tight text-chrome sm:text-6xl">
              {featuredEvent.title}
            </h2>
            <p className="mt-4 text-base leading-7 text-steel">{featuredEvent.description}</p>
            <div className="mt-6">
              <Countdown targetDate={featuredEvent.date} />
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {featuredEvent.distances.map((distance) => (
                <span key={distance} className="rounded-md bg-white/10 px-4 py-3 text-sm font-black text-chrome">
                  {distance}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-black uppercase tracking-[0.14em] text-steel">
                {featuredEvent.city} / {featuredDate}
              </p>
              <Link
                href={`/events/${featuredEvent.slug}`}
                className="rounded-md bg-gold px-6 py-4 text-center text-sm font-black text-night transition hover:bg-chrome"
              >
                Подробнее
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-carbon py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="О клубе"
            title="DAGRUN объединяет бегунов Дагестана"
            description={clubContent.description}
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[clubContent.schedule, clubContent.location, clubContent.atmosphere].map((item) => (
              <div key={item} className="rounded-lg border border-white/10 bg-night/70 p-5 text-sm leading-6 text-steel">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionTitle eyebrow="Календарь" title="Ближайшие старты" />
          <Link href="/events" className="text-sm font-black uppercase tracking-[0.12em] text-gold">
            Все забеги
          </Link>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {publicEvents.slice(0, 3).map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
      </section>

      <section className="bg-carbon py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Абонементы" title="Тренировки DAGRUN" />
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {memberships.slice(0, 6).map((membership) => (
              <article key={membership.name} className="rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-panel">
                <h3 className="text-2xl font-black text-chrome">{membership.name}</h3>
                <p className="mt-3 text-4xl font-black text-gold">{membership.price}</p>
                <p className="mt-4 text-sm leading-6 text-steel">{membership.summary}</p>
                <Link href="/memberships" className="mt-6 inline-flex rounded-md bg-chrome px-4 py-3 text-sm font-black text-night">
                  Выбрать
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="trainers" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Тренеры" title="Тренерский состав" />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {trainers.map((trainer) => (
            <article key={trainer.name} className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] shadow-panel">
              <div className="h-72 bg-cover bg-center" style={{ backgroundImage: `url(${trainer.image})` }} />
              <div className="p-5">
                <h3 className="text-xl font-black text-chrome">{trainer.name}</h3>
                <p className="mt-2 text-sm font-bold uppercase tracking-[0.14em] text-gold">{trainer.role}</p>
                <p className="mt-4 text-sm leading-6 text-steel">{trainer.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="partners" className="border-y border-white/10 bg-carbon py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Партнёры" title="Партнёрская экосистема клуба" />
          <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-4">
            {partners.map((partner) => (
              <Link
                key={partner.name}
                href={partner.url}
                className="rounded-lg border border-white/10 bg-night/70 px-4 py-8 text-center text-sm font-black uppercase tracking-[0.12em] text-chrome transition hover:border-gold/40 hover:text-gold"
              >
                {partner.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
