import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function csvCell(value: unknown) {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();

  const registrations = await prisma.registration.findMany({
    where: q
      ? {
          OR: [
            { firstName: { contains: q, mode: "insensitive" } },
            { lastName: { contains: q, mode: "insensitive" } },
            { email: { contains: q, mode: "insensitive" } },
            { phone: { contains: q, mode: "insensitive" } },
            { event: { title: { contains: q, mode: "insensitive" } } }
          ]
        }
      : undefined,
    orderBy: { createdAt: "desc" },
    include: { event: true, distance: true }
  });

  const rows = [
    ["id", "firstName", "lastName", "email", "phone", "event", "distance", "status", "createdAt"],
    ...registrations.map((registration) => [
      registration.id,
      registration.firstName,
      registration.lastName,
      registration.email,
      registration.phone,
      registration.event.title,
      registration.distance.title,
      registration.status,
      registration.createdAt.toISOString()
    ])
  ];

  const csv = rows.map((row) => row.map(csvCell).join(",")).join("\n");

  return new Response(csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="dagrun-participants.csv"'
    }
  });
}
