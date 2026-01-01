import { useEffect, useState } from "react";

export interface Countdown {
  d: number;
  h: number;
  m: number;
  s: number;
}

export function useCountdown(targetDate: Date): Countdown {
  const [left, setLeft] = useState<Countdown>({
    d: 0,
    h: 0,
    m: 0,
    s: 0,
  });

  useEffect(() => {
    const tick = () => {
      const diff = targetDate.getTime() - Date.now();

      if (diff <= 0) {
        setLeft({ d: 0, h: 0, m: 0, s: 0 });
        return;
      }

      setLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };

    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return left;
}
