import { WEDDING } from "../data/wedding";

export function Hero() {
  const { couple, date, venue, hero } = WEDDING;

  return (
    <section className="w-full ">
      {/* 사진 영역 */}
      <div className="relative mx-auto w-full max-w-[520px]">
        <div className="relative overflow-hidden ">
          <img
            src={hero.image}
            alt="Wedding"
            className="w-full object-cover aspect-[3/4]"
          />

          {/* 정보 영역 */}
          <div className="mx-auto w-full max-w-[420px] px-6 pt-10 pb-14 text-center text-wedding-textPrimary">
            {/* 이름 + 날짜 */}
            <div className="flex items-center justify-center gap-6 mb-6 text-xl font-medium tracking-wide">
              <span>{couple.groom.name}</span>

              {/* 날짜 강조 */}
              <div className="flex flex-col items-center justify-center gap-1">
                <span className="text-sm tracking-widest">{date.month}</span>
                <span className="border-t border-wedding-pinkLine text-sm tracking-widest">
                  {date.day}
                </span>
              </div>

              <span>{couple.bride.name}</span>
            </div>

            {/* 상세 정보 */}
            <div className="space-y-2 tracking-widest text-wedding-textSecondary">
              <p className="text-xs">{date.full}</p>
              <p className="">{venue.full}</p>
            </div>
          </div>

          {/* 프레임 느낌용 내부 라인 */}
          <div className="pointer-events-none absolute inset-4 border border-[#EADFD6]" />
        </div>
      </div>
    </section>
  );
}
