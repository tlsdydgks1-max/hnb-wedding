import { Heart } from "lucide-react";
import { useCountdown } from "../hook/useCountdown";
import { WEDDING } from "../data/wedding";
import { getMonthCalendar } from "../utils/calendar";

const WEEK = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export function WeddingCalendar() {
  const { couple, date } = WEDDING;
  const left = useCountdown(date.at);
  const calendarDays = getMonthCalendar(WEDDING.date.at);
  const weddingDay = Number(WEDDING.date.day);

  return (
    <section className="bg-wedding-bg px-6 py-16">
      <div className="mx-auto max-w-lg space-y-10">
        {/* 제목 */}
        <h2 className="text-center font-serif text-[1.8rem] tracking-widest">
          Wedding Day
        </h2>

        {/* 📅 달력 */}
        <div className="rounded-3xl bg-white p-6 shadow-card">
          <div className="mb-4 text-center text-lg font-semibold">
            {WEDDING.date.month}월
          </div>

          {/* 요일 */}
          <div className="mb-2 grid grid-cols-7 text-center text-xs text-wedding-textMuted">
            {WEEK.map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {/* 날짜 */}
          <div className="grid grid-cols-7 gap-y-2 text-center">
            {calendarDays.map((d, i) => (
              <div key={i} className="h-10 flex items-center justify-center">
                {d && (
                  <div className="relative flex h-10 w-10 items-center justify-center">
                    {/* 💗 하트 아이콘 (배경 레이어) */}
                    {d === weddingDay && (
                      <Heart
                        className="
                          absolute inset-0 top-0.5 m-auto
                          h-10 w-10
                          text-wedding-pink
                          opacity-30
                        "
                        fill="currentColor"
                      />
                    )}

                    {/* 🔢 날짜 (상단 레이어) */}
                    <span
                      className={`relative z-10 text-sm font-semibold
                          ${
                            d === weddingDay
                              ? "text-wedding-pink"
                              : "text-wedding-textSecondary"
                          }
                        `}
                    >
                      {d}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-white p-8 text-center shadow-card">
          <p className="mb-6 flex items-center justify-center gap-1 text-wedding-textSecondary">
            {couple.groom.name2}
            <Heart className="h-4 w-4 text-wedding-pink" fill="currentColor" />
            {couple.bride.name2}의 결혼식이
          </p>

          <div className="mb-4 flex justify-center gap-3">
            {[
              { label: "일", v: left.d },
              { label: "시간", v: left.h },
              { label: "분", v: left.m },
              { label: "초", v: left.s },
            ].map((t) => (
              <div key={t.label} className="flex flex-col items-center">
                <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-2xl border border-wedding-pinkLine bg-wedding-pinkSoft text-xl font-semibold text-wedding-pink">
                  {t.v}
                </div>
                <span className="text-xs text-wedding-textMuted">
                  {t.label}
                </span>
              </div>
            ))}
          </div>

          <p className="text-wedding-textSecondary">남았습니다</p>
        </div>
      </div>
    </section>
  );
}
