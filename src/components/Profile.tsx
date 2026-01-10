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

              <h3 className="mt-4 text-md font-serif text-wedding-textPrimary">
                {"신랑_용한"}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-wedding-textSecondary">
                오늘도, 그리고 앞으로도 신부를 가장 먼저
                <br />
                생각하며 언제나 한결같은 마음으로
                <br />
                신부 곁을 지키겠습니다.
                <br />
                행복하게 잘 살겠습니다.
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

              <h3 className="mt-4 text-md font-serif text-wedding-textPrimary">
                {"신부_예빈"}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-wedding-textSecondary">
                사랑의 의미를 그를 통해 알게 되었고,
                <br />
                함께하는 행복을 배워왔습니다.
                <br />
                이제는 사랑스러운 아내로서,
                <br />
                한 사람의 곁을 평생 지켜가려 합니다.
                <br />
                행복하게 잘 살겠습니다.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
