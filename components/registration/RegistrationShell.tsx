import Link from "next/link";

type RegistrationShellProps = {
  slug: string;
  step: string;
  title: string;
  description: string;
  children: React.ReactNode;
};

const steps = ["Дистанция", "Участник", "Подтверждение", "Оплата", "Готово"];

export function RegistrationShell({
  slug,
  step,
  title,
  description,
  children
}: RegistrationShellProps) {
  const currentStep = Number(step.match(/\d+/)?.[0] ?? 1);

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgb(215_255_53_/_0.14),transparent_26rem)]" />
      <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <Link href={`/events/${slug}`} className="text-sm font-black uppercase tracking-[0.14em] text-gold">
          Назад к забегу
        </Link>
        <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-panel sm:p-6">
          <div className="grid grid-cols-5 gap-2">
            {steps.map((item, index) => {
              const active = index + 1 <= currentStep;
              return (
                <div key={item} className="min-w-0">
                  <div className={`h-1 rounded-full ${active ? "bg-gold" : "bg-white/10"}`} />
                  <p className={`mt-2 truncate text-[10px] font-black uppercase tracking-[0.08em] ${active ? "text-chrome" : "text-steel"}`}>
                    {item}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-gold">{step}</p>
          <h1 className="mt-3 text-4xl font-black leading-tight text-chrome sm:text-6xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-steel">{description}</p>
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
