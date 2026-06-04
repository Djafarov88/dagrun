export type RegistrationStatus = "open" | "soon" | "closed";

export type Event = {
  slug: string;
  title: string;
  description: string;
  date: string;
  city: string;
  coverImage: string;
  registrationStatus: RegistrationStatus;
  distances: string[];
  route: string;
  schedule: Array<{
    time: string;
    title: string;
  }>;
  partners: string[];
  featured?: boolean;
};

export const events: Event[] = [
  {
    slug: "dagestan-half-marathon-2026",
    title: "DAGRUN Half Marathon",
    description:
      "Главный городской старт сезона: быстрый маршрут, вид на Каспий, сильная атмосфера и участники со всего Дагестана.",
    date: "2026-07-19T07:00:00+03:00",
    city: "Махачкала",
    coverImage:
      "https://images.unsplash.com/photo-1502904550040-7534597429ae?auto=format&fit=crop&w=1800&q=85",
    registrationStatus: "open",
    distances: ["21.1 км", "10 км", "5 км"],
    route:
      "Старт у набережной, скоростной участок вдоль моря, разворот на центральном проспекте и финишная арка DAGRUN.",
    schedule: [
      { time: "06:00", title: "Открытие стартового городка" },
      { time: "07:00", title: "Старт 21.1 км" },
      { time: "07:30", title: "Старт 10 км" },
      { time: "08:00", title: "Старт 5 км" },
      { time: "10:30", title: "Награждение" }
    ],
    partners: ["Dagestan Tourism", "Sport Energy", "Caspian Water"],
    featured: true
  },
  {
    slug: "gunib-mountain-run",
    title: "Gunib Mountain Run",
    description:
      "Горный трейл с набором высоты, панорамными видами и техническими участками для опытных бегунов.",
    date: "2026-08-16T08:00:00+03:00",
    city: "Гуниб",
    coverImage:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1800&q=85",
    registrationStatus: "soon",
    distances: ["15 км", "7 км"],
    route:
      "Маршрут проходит по грунтовым дорогам, каменистым тропам и обзорным точкам Гунибского района.",
    schedule: [
      { time: "07:00", title: "Выдача номеров" },
      { time: "08:00", title: "Старт 15 км" },
      { time: "08:30", title: "Старт 7 км" },
      { time: "11:00", title: "Финишный бранч" }
    ],
    partners: ["Mountain Club", "Dag Trail", "Local Guides"]
  },
  {
    slug: "derbent-night-5k",
    title: "Derbent Night 5K",
    description:
      "Вечерний старт в историческом Дербенте: музыка, световая трасса и быстрые пять километров.",
    date: "2026-09-05T20:00:00+03:00",
    city: "Дербент",
    coverImage:
      "https://images.unsplash.com/photo-1486218119243-13883505764c?auto=format&fit=crop&w=1800&q=85",
    registrationStatus: "open",
    distances: ["5 км", "1 км kids"],
    route:
      "Кольцевая трасса по центральным улицам Дербента с финишем в зоне фестиваля.",
    schedule: [
      { time: "18:30", title: "Открытие фестивальной зоны" },
      { time: "19:30", title: "Детский старт" },
      { time: "20:00", title: "Старт 5 км" },
      { time: "21:00", title: "After-run program" }
    ],
    partners: ["Derbent City", "Night Run Lab", "Pulse Media"]
  }
];

export function getEventBySlug(slug: string) {
  return events.find((event) => event.slug === slug);
}

export function getFeaturedEvent() {
  return events.find((event) => event.featured) ?? events[0];
}
