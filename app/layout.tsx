import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { clubContent, oldSiteNavigation } from "@/lib/dagrun-content";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
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
  description: clubContent.description,
  openGraph: {
    title: "DAGRUN | Беговое сообщество Дагестана",
    description: clubContent.intro,
    url: siteUrl,
    siteName: "DAGRUN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "DAGRUN | Беговое сообщество Дагестана",
    description: clubContent.intro
  },
  robots: {
    index: true,
    follow: true
  }
};

const navItems = [
  { href: "/#club", label: oldSiteNavigation[0] },
  { href: "/events", label: oldSiteNavigation[1] },
  { href: "/#trainers", label: oldSiteNavigation[2] },
  { href: "/#gallery", label: oldSiteNavigation[3] },
  { href: "/memberships", label: oldSiteNavigation[4] },
  { href: "/#partners", label: oldSiteNavigation[5] }
];

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={inter.variable}>
      <body className="font-sans antialiased">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-night/82 backdrop-blur-xl">
          <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center">
              <Image src="/assets/dagrun-logo.svg" alt="DAGRUN" width={120} height={32} priority />
            </Link>
            <div className="flex items-center gap-1 overflow-x-auto text-sm font-semibold text-steel">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="shrink-0 rounded-md px-3 py-2 transition hover:bg-white/10 hover:text-chrome"
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
            <div>
              <p>&copy; {new Date().getFullYear()} DAGRUN. Беговой клуб Дагестана.</p>
              <p className="mt-1">{clubContent.location}</p>
            </div>
            <Link href={clubContent.telegram} className="font-semibold text-chrome hover:text-gold">
              Telegram DAGRUN
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
