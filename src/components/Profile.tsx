import { Sparkles } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

export function Profile() {
  return (
    <section className="bg-wedding-bg px-6 py-16">
      <ScrollReveal delay={150}>
        <div className="mx-auto max-w-lg">
          <h2 className="mb-10 text-center font-serif text-[1.8rem] tracking-widest">
            신랑 신부 프로필
          </h2>

          {/* 프로필 */}
          <div className="grid grid-cols-2 gap-6">
            {/* 신랑 */}
            <div>
              <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                <img
                  src="/images/profile1.jpg"
                  alt="신랑"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              </div>

              <h3 className="mt-4 flex items-center gap-2 text-md font-serif text-wedding-textPrimary">
                <Sparkles className="h-4 w-4 text-wedding-pink" />
                신랑_용한
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-wedding-textSecondary">
                늘 같은 자리에서 같은 마음으로, 언제나 신부를 먼저 생각하며
              </p>

              <p className="mt-1 text-sm leading-relaxed text-wedding-textSecondary">
                기쁠 때나 어려울 때나 변함없이 곁을 지키겠습니다.
              </p>
            </div>

            {/* 신부 */}
            <div>
              <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                <img
                  src="/images/profile2.jpg"
                  alt="신부"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              </div>

              <h3 className="mt-4 flex items-center gap-2 text-md font-serif text-wedding-textPrimary">
                <Sparkles className="h-4 w-4 text-wedding-pink" />
                신부_예빈
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-wedding-textSecondary">
                사랑을 주고받는 기쁨을 알게 되었고 그와 함께하는 하루하루가
                이제는 저의 삶이 되었습니다.
              </p>

              <p className="mt-1 text-sm leading-relaxed text-wedding-textSecondary">
                사랑스러운 아내로서 곁을 지켜가려 합니다.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
