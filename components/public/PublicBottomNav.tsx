import Link from "next/link";

const items = [
  { href: "/", label: "Главная" },
  { href: "/events", label: "Забеги" },
  { href: "/memberships", label: "Абонементы" },
  { href: "/#trainers", label: "Тренеры" }
];

export function PublicBottomNav() {
  return (
    <nav className="fixed inset-x-3 bottom-3 z-50 rounded-lg border border-white/10 bg-night/90 p-2 shadow-panel backdrop-blur-xl md:hidden">
      <div className="grid grid-cols-4 gap-1">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-md px-2 py-3 text-center text-[11px] font-black uppercase tracking-[0.08em] text-steel transition hover:bg-white/10 hover:text-chrome"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
