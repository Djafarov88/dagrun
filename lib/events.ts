export type Event = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  date: string;
  time: string;
  location: string;
  distance: string;
  level: "Open" | "Tempo" | "Long Run";
  capacity: number;
};

export const events: Event[] = [
  {
    slug: "river-tempo-session",
    title: "River Tempo Session",
    summary: "A controlled midweek tempo run with pace groups from 4:30 to 6:30/km.",
    description:
      "Meet at the riverside start point for drills, a progressive warmup, and a structured tempo block. Coaches will split runners into pace groups and finish with mobility work.",
    date: "2026-06-13",
    time: "08:00",
    location: "Central Riverside Loop",
    distance: "8 km",
    level: "Tempo",
    capacity: 40
  },
  {
    slug: "sunday-long-run",
    title: "Sunday Long Run",
    summary: "Easy aerobic distance with hydration stops and route support.",
    description:
      "A social long run designed for steady mileage. The route includes two regroup points, hydration support, and options to finish at 12 km or continue to 18 km.",
    date: "2026-06-21",
    time: "07:30",
    location: "North Park Gates",
    distance: "12-18 km",
    level: "Long Run",
    capacity: 60
  },
  {
    slug: "track-intro-night",
    title: "Track Intro Night",
    summary: "A beginner-friendly track workout focused on form, pacing, and confidence.",
    description:
      "Ideal for newer runners or anyone returning to interval training. The session covers track etiquette, running mechanics, and short repeat efforts with full recovery.",
    date: "2026-07-02",
    time: "19:00",
    location: "City Athletics Stadium",
    distance: "5 km",
    level: "Open",
    capacity: 32
  }
];

export function getEventBySlug(slug: string) {
  return events.find((event) => event.slug === slug);
}
