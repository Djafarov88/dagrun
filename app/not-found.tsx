import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold">404</p>
      <h1 className="mt-4 text-4xl font-black text-chrome">Page not found</h1>
      <p className="mt-4 text-base leading-7 text-steel">
        The page you requested does not exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-md bg-gold px-5 py-3 text-sm font-bold text-night transition hover:bg-chrome"
      >
        Back home
      </Link>
    </section>
  );
}
