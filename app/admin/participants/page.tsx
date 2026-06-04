import type { Metadata } from "next";
import Link from "next/link";
import { AdminNav } from "@/components/admin/AdminNav";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type ParticipantsPageProps = {
  searchParams: { q?: string };
};

export const metadata: Metadata = {
  title: "Admin participants"
};

export default async function ParticipantsPage({ searchParams }: ParticipantsPageProps) {
  const q = searchParams.q?.trim();
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
    take: 200,
    include: { event: true, distance: true }
  });

  const exportHref = q ? `/admin/participants/export?q=${encodeURIComponent(q)}` : "/admin/participants/export";

  return (
    <>
      <AdminNav />
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-gold">Participants</p>
            <h1 className="mt-3 text-4xl font-black text-chrome">Registration list</h1>
          </div>
          <Link href={exportHref} className="rounded-md bg-gold px-5 py-3 text-sm font-black text-night">
            Export CSV
          </Link>
        </div>

        <form className="mt-8 flex flex-col gap-3 sm:flex-row">
          <input
            name="q"
            defaultValue={q}
            placeholder="Search name, email, phone, event"
            className="min-w-0 flex-1 rounded-md border border-white/10 bg-night px-4 py-3 text-sm text-chrome outline-none focus:border-gold"
          />
          <button className="rounded-md bg-chrome px-5 py-3 text-sm font-black text-night">Search</button>
        </form>

        <div className="mt-8 overflow-x-auto rounded-lg border border-white/10 bg-white/[0.04] shadow-panel">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="border-b border-white/10 text-xs uppercase tracking-[0.12em] text-steel">
              <tr>
                <th className="p-4">Participant</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Event</th>
                <th className="p-4">Distance</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {registrations.map((registration) => (
                <tr key={registration.id}>
                  <td className="p-4 font-bold text-chrome">
                    {registration.firstName} {registration.lastName}
                  </td>
                  <td className="p-4 text-steel">
                    {registration.email}
                    <br />
                    {registration.phone}
                  </td>
                  <td className="p-4 text-steel">{registration.event.title}</td>
                  <td className="p-4 text-steel">{registration.distance.title}</td>
                  <td className="p-4 font-bold text-gold">{registration.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
