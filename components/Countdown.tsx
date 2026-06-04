"use client";

import { useEffect, useMemo, useState } from "react";

type CountdownProps = {
  targetDate: string;
};

function getRemaining(targetDate: string) {
  const diff = Math.max(0, new Date(targetDate).getTime() - Date.now());

  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1_000) % 60)
  };
}

export function Countdown({ targetDate }: CountdownProps) {
  const [remaining, setRemaining] = useState(() => getRemaining(targetDate));
  const items = useMemo(
    () => [
      ["Дней", remaining.days],
      ["Часов", remaining.hours],
      ["Минут", remaining.minutes],
      ["Секунд", remaining.seconds]
    ],
    [remaining]
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemaining(getRemaining(targetDate));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-4 gap-2">
      {items.map(([label, value]) => (
        <div key={label} className="rounded-md border border-white/10 bg-night/70 px-2 py-3 text-center">
          <div className="text-2xl font-black text-gold sm:text-3xl">
            {String(value).padStart(2, "0")}
          </div>
          <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-steel">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
