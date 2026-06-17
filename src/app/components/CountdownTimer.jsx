import { useState, useEffect } from "react";

/**
 * CountdownTimer — Live countdown to June 26, 2026, 09:00 AM IST
 * Standalone inline element that complements the date pill.
 */
export function CountdownTimer() {
  const TARGET_DATE = new Date("2026-06-29T09:00:00+05:30").getTime();

  const calculateTimeLeft = () => {
    const now = Date.now();
    const diff = TARGET_DATE - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, mins: 0, secs: 0 };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      mins: Math.floor((diff / (1000 * 60)) % 60),
      secs: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n) => String(n).padStart(2, "0");

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.mins },
    { label: "Secs", value: timeLeft.secs },
  ];

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Micro-copy label */}
      <div className="text-[12px] tracking-[0.2em] uppercase font-medium text-center text-white/60">
        STARTS IN
      </div>
      <div className="flex items-center justify-center gap-3">
      {units.map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-3">
          <div className="flex flex-col items-center">
            <div className="font-orbitron text-[18px] font-bold leading-none text-white tabular-nums min-w-[2ch] text-center">
              {pad(unit.value)}
            </div>
            <div className="text-[8px] tracking-[0.1em] mt-[4px] uppercase font-medium text-white/50">
              {unit.label}
            </div>
          </div>
          {i < units.length - 1 && (
            <span className="text-[14px] font-light leading-none mb-3 text-white/20">
              :
            </span>
          )}
        </div>
      ))}
      </div>
    </div>
  );
}
