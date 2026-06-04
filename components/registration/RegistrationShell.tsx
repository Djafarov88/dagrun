import Link from "next/link";

type RegistrationShellProps = {
  slug: string;
  step: string;
  title: string;
  description: string;
  children: React.ReactNode;
};

export function RegistrationShell({
  slug,
  step,
  title,
  description,
  children
}: RegistrationShellProps) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <Link href={`/events/${slug}`} className="text-sm font-black uppercase tracking-[0.14em] text-gold">
        Back to race
      </Link>
      <div className="mt-8">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-gold">{step}</p>
        <h1 className="mt-3 text-4xl font-black text-chrome sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-steel">{description}</p>
      </div>
      <div className="mt-8">{children}</div>
    </section>
  );
}
