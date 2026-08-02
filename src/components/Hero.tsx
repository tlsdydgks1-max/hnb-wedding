import { useEffect, useState } from "react";
import { WEDDING } from "../data/wedding";

export function Hero() {
  const { couple, date, venue, hero } = WEDDING;
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    if (!showIntro) return;

    const preventScroll = (event: Event) => event.preventDefault();
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousOverflow = document.body.style.overflow;
    const previousPosition = document.body.style.position;
    const previousWidth = document.body.style.width;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.addEventListener("touchmove", preventScroll, { passive: false });
    document.addEventListener("wheel", preventScroll, { passive: false });

    const timer = window.setTimeout(() => {
      setShowIntro(false);
    }, 5200);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("touchmove", preventScroll);
      document.removeEventListener("wheel", preventScroll);
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousOverflow;
      document.body.style.position = previousPosition;
      document.body.style.width = previousWidth;
    };
  }, [showIntro]);

  return (
    <section className="w-full bg-white">
      {showIntro && (
        <div className="intro-overlay fixed inset-0 z-50 overflow-hidden bg-black">
          <img
            src={hero.image}
            alt="Wedding"
            className="intro-zoom absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/35" />

          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 pb-20 text-center text-white">
            <p className="type-line type-line-names mb-5 whitespace-nowrap text-xl font-medium tracking-wide">
              신용한 <span className="text-[#ef4444]">♥</span> 유예빈
            </p>
            <h1 className="type-line type-line-title whitespace-nowrap text-[clamp(1.8rem,8vw,2.8rem)] font-normal leading-tight">
              Our Wedding Day!
            </h1>
          </div>

          <p className="absolute inset-x-0 bottom-8 z-10 px-6 text-center text-xl tracking-wider text-white">
            {date.full}
          </p>
        </div>
      )}

      <div className="mx-auto w-full max-w-[520px]">
        <div className="relative overflow-hidden">
          <img
            src={hero.image}
            alt="Wedding"
            className="aspect-[3/4] w-full object-cover"
          />

          <div className="mx-auto w-full max-w-[420px] px-6 pb-14 pt-10 text-center text-wedding-textPrimary">
            <div className="mb-6 flex items-center justify-center gap-6 text-xl font-medium tracking-wide">
              <span>{couple.groom.name}</span>

              <div className="flex flex-col items-center justify-center gap-1">
                <span className="text-sm tracking-widest">{date.month}</span>
                <span className="border-t border-wedding-pinkLine text-sm tracking-widest">
                  {date.day}
                </span>
              </div>

              <span>{couple.bride.name}</span>
            </div>

            <div className="space-y-2 tracking-widest text-wedding-textSecondary">
              <p className="text-xs">{date.full}</p>
              <p>{venue.full}</p>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-4 border border-[#EADFD6]" />
        </div>
      </div>
    </section>
  );
}
