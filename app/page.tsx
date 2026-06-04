import Link from "next/link";
import { Countdown } from "@/components/Countdown";
import { EventCard } from "@/components/EventCard";
import { events, getFeaturedEvent } from "@/lib/events";
import { memberships } from "@/lib/memberships";

const stats = [
  { value: "5000+", label: "участников" },
  { value: "3", label: "тренировки в неделю" },
  { value: "10+", label: "событий в год" }
];

const trainers = [
  {
    name: "Магомед Алиев",
    role: "Главный тренер",
    image:
      "https://images.unsplash.com/photo-1517344884509-a0c97ec11bcc?auto=format&fit=crop&w=900&q=85"
  },
  {
    name: "Амина Гасанова",
    role: "Тренер по технике",
    image:
      "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=900&q=85"
  },
  {
    name: "Расул Омаров",
    role: "Трейл и выносливость",
    image:
      "https://images.unsplash.com/photo-1567013127542-490d757e6349?auto=format&fit=crop&w=900&q=85"
  }
];

const partners = ["Sport Energy", "Caspian Water", "Dagestan Tourism", "Pulse Media"];

export default function HomePage() {
  const featuredEvent = getFeaturedEvent();
  const featuredDate = new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(featuredEvent.date));

  return (
    <>
      <section
        className="relative isolate min-h-[calc(100svh-57px)] overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgb(5 6 10 / 0.92) 0%, rgb(5 6 10 / 0.62) 48%, rgb(5 6 10 / 0.3) 100%), url(https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?auto=format&fit=crop&w=2200&q=85)"
        }}
      >
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-night to-transparent" />
        <div className="mx-auto flex min-h-[calc(100svh-57px)] max-w-6xl flex-col justify-end px-4 pb-14 pt-24 sm:px-6 lg:px-8">
          <div className="animate-rise max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-gold">
              DAGRUN / Dagestan running community
            </p>
            <h1 className="mt-5 text-5xl font-black leading-[0.95] tracking-normal text-chrome sm:text-7xl lg:text-8xl">
              Крупнейшее беговое сообщество Дагестана
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-steel sm:text-xl">
              Тренировки, забеги и сильная спортивная культура для тех, кто бежит быстрее,
              дальше и осознаннее.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/memberships"
                className="rounded-md bg-gold px-6 py-4 text-center text-sm font-black uppercase tracking-[0.08em] text-night transition hover:bg-chrome"
              >
                Записаться на тренировку
              </Link>
              <Link
                href={`/events/${featuredEvent.slug}`}
                className="rounded-md border border-white/20 bg-white/10 px-6 py-4 text-center text-sm font-black uppercase tracking-[0.08em] text-chrome backdrop-blur transition hover:bg-white/20"
              >
                Зарегистрироваться на забег
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-night">
        <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-white/10 px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-6 lg:px-8">
          {stats.map((stat) => (
            <div key={stat.label} className="py-7 sm:px-6">
              <div className="text-5xl font-black text-gold">{stat.value}</div>
              <div className="mt-2 text-sm font-bold uppercase tracking-[0.16em] text-steel">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
          <div
            className="min-h-[30rem] rounded-lg bg-cover bg-center shadow-panel"
            style={{
              backgroundImage: `linear-gradient(180deg, rgb(5 6 10 / 0.05), rgb(5 6 10 / 0.82)), url(${featuredEvent.coverImage})`
            }}
          />
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-glow backdrop-blur sm:p-8">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-gold">
              Главный старт
            </p>
            <h2 className="mt-4 text-4xl font-black text-chrome sm:text-5xl">
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
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-steel">
                {featuredEvent.city} / {featuredDate}
              </p>
              <Link
                href={`/events/${featuredEvent.slug}`}
                className="rounded-md bg-gold px-6 py-4 text-center text-sm font-black text-night transition hover:bg-chrome"
              >
                Зарегистрироваться
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-carbon py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-gold">Calendar</p>
              <h2 className="mt-3 text-4xl font-black text-chrome">Календарь событий</h2>
            </div>
            <Link href="/events" className="text-sm font-black uppercase tracking-[0.12em] text-gold">
              Все старты
            </Link>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-3">
          {memberships.map((membership) => (
            <article key={membership.name} className="rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-panel">
              <h3 className="text-2xl font-black text-chrome">{membership.name}</h3>
              <p className="mt-3 text-4xl font-black text-gold">{membership.price}</p>
              <p className="mt-4 text-sm leading-6 text-steel">{membership.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-carbon py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-gold">Trainers</p>
          <h2 className="mt-3 text-4xl font-black text-chrome">Тренеры DAGRUN</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {trainers.map((trainer) => (
              <article key={trainer.name} className="overflow-hidden rounded-lg border border-white/10 bg-night shadow-panel">
                <div
                  className="h-72 bg-cover bg-center"
                  style={{ backgroundImage: `url(${trainer.image})` }}
                />
                <div className="p-5">
                  <h3 className="text-xl font-black text-chrome">{trainer.name}</h3>
                  <p className="mt-2 text-sm font-bold uppercase tracking-[0.14em] text-steel">
                    {trainer.role}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-gold">Partners</p>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {partners.map((partner) => (
            <div key={partner} className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-8 text-center text-sm font-black uppercase tracking-[0.12em] text-chrome">
              {partner}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
