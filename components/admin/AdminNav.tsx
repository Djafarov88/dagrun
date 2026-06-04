import Link from "next/link";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/participants", label: "Participants" },
  { href: "/admin/memberships", label: "Memberships" },
  { href: "/admin/content", label: "Content" }
];

export function AdminNav() {
  return (
    <nav className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 pt-6 sm:px-6 lg:px-8">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="shrink-0 rounded-md border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-black text-chrome transition hover:bg-gold hover:text-night"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
