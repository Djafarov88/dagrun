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
    default: "DAGRUN | Running Club",
    template: "%s | DAGRUN"
  },
  description:
    "DAGRUN is a mobile-first running club website for events, memberships, and club administration.",
  openGraph: {
    title: "DAGRUN | Running Club",
    description:
      "Join DAGRUN for structured runs, race preparation, and a focused running community.",
    url: siteUrl,
    siteName: "DAGRUN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "DAGRUN | Running Club",
    description:
      "Structured running events, memberships, and club operations for DAGRUN."
  },
  robots: {
    index: true,
    follow: true
  }
};

const navItems = [
  { href: "/events", label: "Events" },
  { href: "/memberships", label: "Memberships" },
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
        <header className="sticky top-0 z-40 border-b border-ink/10 bg-track/90 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <Link href="/" className="text-lg font-black tracking-normal text-ink">
              DAGRUN
            </Link>
            <div className="flex items-center gap-1 text-sm font-semibold text-asphalt">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-2 transition hover:bg-ink hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="border-t border-ink/10 bg-white">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-asphalt sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <p>&copy; {new Date().getFullYear()} DAGRUN. Built for the long run.</p>
            <Link href="/events" className="font-semibold text-ink hover:text-signal">
              View upcoming events
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
