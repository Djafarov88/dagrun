import { prisma } from "@/lib/prisma";
import { events as fallbackEvents, type Event } from "@/lib/events";

function mapRegistrationStatus(status: string): Event["registrationStatus"] {
  if (status === "OPEN") {
    return "open";
  }

  if (status === "CLOSED") {
    return "closed";
  }

  return "soon";
}

export async function getPublicEvents() {
  if (!process.env.DATABASE_URL) {
    return fallbackEvents;
  }

  try {
    const dbEvents = await prisma.event.findMany({
      orderBy: { date: "asc" },
      include: {
        distances: { orderBy: { lengthKm: "asc" } }
      }
    });

    if (dbEvents.length === 0) {
      return fallbackEvents;
    }

    return dbEvents.map<Event>((event) => ({
      slug: event.slug,
      title: event.title,
      description: event.description,
      date: event.date.toISOString(),
      city: event.city,
      location: event.location,
      coverImage: event.coverImage,
      registrationStatus: mapRegistrationStatus(event.registrationStatus),
      distances: event.distances.map((distance) => distance.title),
      route: event.location || event.city,
      schedule: [],
      partners: [],
      photoLinks: event.photoLinks,
      videoLinks: event.videoLinks,
      resultsLinks: event.resultsLinks
    }));
  } catch {
    return fallbackEvents;
  }
}

export async function getPublicEventBySlug(slug: string) {
  const events = await getPublicEvents();

  return events.find((event) => event.slug === slug);
}

export async function getFeaturedPublicEvent() {
  const events = await getPublicEvents();
  const now = Date.now();

  return (
    events.find((event) => new Date(event.date).getTime() >= now && event.registrationStatus === "open") ??
    events.find((event) => new Date(event.date).getTime() >= now) ??
    events[0]
  );
}
