import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dagrun.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DAGRUN | Беговое сообщество Дагестана",
    template: "%s | DAGRUN"
  },
  description:
    "DAGRUN - крупнейшее беговое сообщество Дагестана: тренировки, забеги, старты и премиальная спортивная культура.",
  openGraph: {
    title: "DAGRUN | Беговое сообщество Дагестана",
    description:
      "Крупнейшее беговое сообщество Дагестана: тренировки, забеги и события для бегунов всех уровней.",
    url: siteUrl,
    siteName: "DAGRUN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "DAGRUN | Беговое сообщество Дагестана",
    description:
      "Тренировки, забеги и беговая культура Дагестана."
  },
  robots: {
    index: true,
    follow: true
  }
};

const navItems = [
  { href: "/events", label: "Старты" },
  { href: "/memberships", label: "Клуб" },
  { href: "/admin", label: "Admin" }
];

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-night/82 backdrop-blur-xl">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <Link href="/" className="text-lg font-black tracking-normal text-chrome">
              DAGRUN
            </Link>
            <div className="flex items-center gap-1 text-sm font-semibold text-steel">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-2 transition hover:bg-white/10 hover:text-chrome"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="border-t border-white/10 bg-night">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-steel sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <p>&copy; {new Date().getFullYear()} DAGRUN. Dagestan running community.</p>
            <Link href="/events" className="font-semibold text-chrome hover:text-gold">
              Календарь забегов
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
