import { MessageCircle, ChevronDown } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const messages = [
  {
    name: "김미나",
    text: "축하해! 너무 행복한 가정 꾸리길 바랄게 ❤️",
    date: "2026.05.20",
  },
  {
    name: "이준호",
    text: "결혼 진심으로 축하한다!",
    date: "2026.05.18",
  },
  {
    name: "박서연",
    text: "두 분 행복하세요 💕",
    date: "2026.05.15",
  },
  {
    name: "최동욱",
    text: "앞날에 행복만 가득하길!",
    date: "2026.05.12",
  },
];

export function Guestbook() {
  return (
    <section className="bg-wedding-bg px-6 py-16">
      <ScrollReveal delay={150}>
        <div className="mx-auto max-w-lg">
          <h2 className="mb-10 text-center font-serif text-[1.8rem] tracking-widest">
            방명록
          </h2>

          <div className="space-y-3">
            {messages.map((m, i) => (
              <div key={i} className="rounded-2xl bg-white p-5 shadow-soft">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-wedding-pinkSoft">
                      <MessageCircle className="h-4 w-4 text-wedding-pink" />
                    </div>
                    <span className="text-sm font-semibold">{m.name}</span>
                  </div>
                  <span className="text-xs text-wedding-textMuted">
                    {m.date}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-wedding-textSecondary">
                  {m.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 rounded-full bg-white border border-wedding-pinkLine py-3 text-sm text-wedding-pink hover:border-wedding-pinkLine">
              더보기 <ChevronDown className="h-4 w-4" />
            </button>
            <button className="rounded-full bg-wedding-pink py-3 text-sm font-medium text-white shadow">
              방명록 작성하기
            </button>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
