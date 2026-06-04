type SectionTitleProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionTitle({ eyebrow, title, description }: SectionTitleProps) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">{eyebrow}</p>
      <h2 className="mt-3 text-4xl font-black leading-tight text-chrome sm:text-5xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-steel">{description}</p> : null}
    </div>
  );
}
