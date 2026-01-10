import { Heart } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

export function Invitation() {
  return (
    <section className="px-6 py-16">
      <ScrollReveal>
        <div className="mx-auto max-w-lg rounded-3xl bg-white p-10 shadow-card text-center">
          {/* 상단 장식 */}
          <div className="mb-8 flex items-center justify-center gap-3">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-wedding-pinkLine" />
            <Heart className="h-4 w-4 fill-wedding-pinkLine text-wedding-pinkLine" />
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-wedding-pinkLine" />
          </div>

          {/* 시 인용 */}
          <p className="font-sans text-[1.05rem] leading-[2] text-wedding-textSecondary">
            <span className="font-medium text-wedding-pink">두 사람</span>이
            꽃과 나무처럼 걸어와
            <br />
            서로의{" "}
            <span className="font-medium text-wedding-pink">모든 것</span>
            이 되기 위해
            <br />
            오랜 기다림 끝에 혼례식을 치르는 날
            <br />
            세상은 더욱{" "}
            <span className="font-medium text-wedding-pink">아름다워라</span>
            <br />
            <br />
            <span className="text-xs text-wedding-textMuted">
              이해인, 〈사랑의 사람들이여〉
            </span>
          </p>

          {/* 중간 장식 */}
          <div className="my-10 flex items-center justify-center">
            <div className="h-px w-16 bg-wedding-pinkLine/40" />
          </div>

          {/* 초대 메시지 */}
          <p className="font-sans text-[1.05rem] leading-[2] text-wedding-textSecondary">
            <span className="font-medium text-wedding-pink">
              소중한 분들을 초대합니다.
            </span>
            <br />
            <br />
            <span className="font-medium text-wedding-pink">사랑</span>이 잔잔히
            스며드는
            <br />
            아름다운 계절에,
            <br />
            <br />
            <span className="font-medium text-wedding-pink">두 사람</span>이
            만나
            <br />
            서로의 하루가 되어
            <br />
            평생을 <span className="font-medium text-wedding-pink">함께</span>
            하려 합니다.
            <br />
            <br />
            새로운 시작의 자리에 함께하시어
            <br />
            따뜻한 마음으로
            <br />
            <span className="font-medium text-wedding-pink">축복</span>해 주시면
            감사하겠습니다.
          </p>

          {/* 하단 장식 */}
          <div className="mt-10 flex items-center justify-center gap-2 text-wedding-pinkLine">
            <span className="h-1 w-1 rounded-full bg-wedding-pinkLine" />
            <Heart className="h-3 w-3 opacity-70" />
            <span className="h-1 w-1 rounded-full bg-wedding-pinkLine" />
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
