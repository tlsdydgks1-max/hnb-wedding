import { WEDDING } from "../data/wedding";
import { Calendar, Clock, Utensils, Info } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

export const WEDDING_INFO_ICON_MAP = {
  Calendar,
  Clock,
  Utensils,
  Info,
} as const;

export function WeddingInfo() {
  return (
    <section className="bg-wedding-bg px-6 py-16">
      <ScrollReveal delay={150}>
        <div className="mx-auto max-w-lg">
          <h2 className="mb-10 text-center font-serif text-[1.8rem] tracking-widest text-wedding-textPrimary">
            예식 안내
          </h2>

          <div className="space-y-3">
            {WEDDING.ceremony.info.map((item) => {
              const Icon = WEDDING_INFO_ICON_MAP[item.icon];

              return (
                <div
                  key={item.key}
                  className="flex gap-4 rounded-2xl bg-white p-5 shadow-soft"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-wedding-pinkSoft">
                    <Icon className="h-5 w-5 text-wedding-pink" />
                  </div>

                  <div>
                    <h3 className="mb-1 text-sm font-semibold text-wedding-textPrimary">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-wedding-textMuted">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
