"use client";

import Link from "next/link";

type RegistrationErrorProps = {
  error: Error;
  reset: () => void;
};

export default function RegistrationError({ error, reset }: RegistrationErrorProps) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-lg border border-flame/40 bg-flame/10 p-6 shadow-panel">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-flame">Registration error</p>
        <h1 className="mt-3 text-3xl font-black text-chrome">We could not complete this step</h1>
        <p className="mt-4 text-sm leading-6 text-steel">{error.message}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={reset}
            className="rounded-md bg-gold px-5 py-3 text-sm font-black uppercase tracking-[0.1em] text-night"
          >
            Try again
          </button>
          <Link
            href="/events"
            className="rounded-md border border-white/20 px-5 py-3 text-center text-sm font-black uppercase tracking-[0.1em] text-chrome"
          >
            Back to events
          </Link>
        </div>
      </div>
    </section>
  );
}
