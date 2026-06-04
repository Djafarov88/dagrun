type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-signal">{eyebrow}</p>
      <h1 className="mt-3 text-4xl font-black tracking-normal text-ink sm:text-5xl">
        {title}
      </h1>
      <p className="mt-4 text-base leading-7 text-asphalt sm:text-lg">{description}</p>
    </div>
  );
}
