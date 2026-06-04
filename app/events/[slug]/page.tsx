import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Countdown } from "@/components/Countdown";
import { getPublicEventBySlug, getPublicEvents } from "@/lib/public-events";

type EventDetailPageProps = {
  params: {
    slug: string;
  };
};

const statusLabels = {
  open: "регистрация открыта",
  soon: "скоро",
  closed: "завершён"
};

export async function generateMetadata({ params }: EventDetailPageProps): Promise<Metadata> {
  const event = await getPublicEventBySlug(params.slug);

  if (!event) {
    return {
      title: "Старт не найден"
    };
  }

  return {
    title: event.title,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
      type: "article"
    }
  };
}

export async function generateStaticParams() {
  const events = await getPublicEvents();

  return events.map((event) => ({
    slug: event.slug
  }));
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const event = await getPublicEventBySlug(params.slug);

  if (!event) {
    notFound();
  }

  const formattedDate = new Intl.DateTimeFormat("ru-RU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(event.date));

  const postLinks = [
    ...(event.resultsLinks ?? []).map((href) => ({ href, label: "Результаты" })),
    ...(event.photoLinks ?? []).map((href) => ({ href, label: "Фото" })),
    ...(event.videoLinks ?? []).map((href) => ({ href, label: "Видео" }))
  ];

  return (
    <>
      <section
        className="relative isolate min-h-[78svh] overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(90deg, rgb(5 6 10 / 0.96), rgb(5 6 10 / 0.58), rgb(5 6 10 / 0.18)), url(${event.coverImage})`
        }}
      >
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-night to-transparent" />
        <div className="relative mx-auto flex min-h-[78svh] max-w-6xl flex-col justify-end px-4 pb-12 pt-20 sm:px-6 lg:px-8">
          <Link href="/events" className="text-sm font-black uppercase tracking-[0.14em] text-gold">
            Все старты
          </Link>
          <div className="mt-8 max-w-4xl">
            <div className="flex flex-wrap gap-2 text-xs font-black uppercase tracking-[0.14em]">
              <span className="rounded-full bg-gold px-3 py-1 text-night">{statusLabels[event.registrationStatus]}</span>
              <span className="rounded-full border border-white/20 px-3 py-1 text-chrome">{event.city}</span>
            </div>
            <h1 className="mt-5 text-5xl font-black leading-none text-chrome sm:text-7xl">
              {event.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-steel">{event.description}</p>
            {event.registrationStatus !== "closed" ? (
              <div className="mt-8 max-w-xl">
                <Countdown targetDate={event.date} />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[0.72fr_0.28fr]">
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-panel sm:p-8">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-gold">Race info</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                ["Дата", formattedDate],
                ["Город", event.city],
                ["Локация", event.location ?? event.city]
              ].map(([label, value]) => (
                <div key={label} className="rounded-md bg-night/70 p-4">
                  <dt className="text-xs font-black uppercase tracking-[0.14em] text-steel">{label}</dt>
                  <dd className="mt-2 text-lg font-black text-chrome">{value}</dd>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h2 className="text-3xl font-black text-chrome">Дистанции</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {event.distances.map((distance) => (
                  <div key={distance} className="rounded-lg border border-white/10 bg-night p-5">
                    <div className="text-3xl font-black text-gold">{distance}</div>
                    <p className="mt-2 text-sm text-steel">Официальная дистанция DAGRUN</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="rounded-lg border border-gold/30 bg-gold p-6 text-night shadow-glow">
            <p className="text-sm font-black uppercase tracking-[0.16em]">Registration</p>
            <h2 className="mt-3 text-3xl font-black">Стартовый слот</h2>
            <p className="mt-3 text-sm font-bold leading-6 text-night/70">
              Выберите дистанцию, заполните данные участника и перейдите к оплате.
            </p>
            {event.registrationStatus === "open" ? (
              <Link href={`/events/${event.slug}/register`} className="mt-6 block w-full rounded-md bg-night px-5 py-4 text-center text-sm font-black uppercase tracking-[0.1em] text-chrome transition hover:bg-carbon">
                Зарегистрироваться
              </Link>
            ) : (
              <div className="mt-6 rounded-md bg-night/10 px-5 py-4 text-center text-sm font-black uppercase tracking-[0.1em]">
                {statusLabels[event.registrationStatus]}
              </div>
            )}
          </aside>
        </div>
      </section>

      <section className="bg-carbon py-12">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-gold">Route</p>
            <h2 className="mt-3 text-3xl font-black text-chrome">Маршрут</h2>
            <p className="mt-4 text-base leading-7 text-steel">{event.route}</p>
            <div className="mt-6 h-56 rounded-lg border border-white/10 bg-[linear-gradient(135deg,#0d1118,#1d2938_48%,#d7ff35_49%,#d7ff35_51%,#05060a_52%)]" />
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-gold">Schedule</p>
            <h2 className="mt-3 text-3xl font-black text-chrome">Расписание</h2>
            <div className="mt-5 space-y-3">
              {event.schedule.length > 0 ? (
                event.schedule.map((item) => (
                  <div key={`${item.time}-${item.title}`} className="flex gap-4 rounded-md bg-night/70 p-4">
                    <div className="w-16 shrink-0 text-lg font-black text-gold">{item.time}</div>
                    <div className="font-bold text-chrome">{item.title}</div>
                  </div>
                ))
              ) : (
                <p className="text-sm leading-6 text-steel">Расписание будет опубликовано ближе к старту.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {event.registrationStatus === "closed" && postLinks.length > 0 ? (
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-gold">Post-event</p>
          <h2 className="mt-3 text-3xl font-black text-chrome">Материалы после забега</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {postLinks.map((link) => (
              <Link key={`${link.label}-${link.href}`} href={link.href} className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-6 text-center text-sm font-black uppercase tracking-[0.12em] text-chrome hover:text-gold">
                {link.label}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-gold">Partners</p>
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {event.partners.length > 0 ? (
            event.partners.map((partner) => (
              <div key={partner} className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-8 text-center text-sm font-black uppercase tracking-[0.12em] text-chrome">
                {partner}
              </div>
            ))
          ) : (
            <div className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-8 text-sm font-black uppercase tracking-[0.12em] text-chrome">
              DAGRUN
            </div>
          )}
        </div>
      </section>
    </>
  );
}
