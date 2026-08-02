import { Navigation } from "lucide-react";
import type { ReactNode } from "react";
import { WEDDING } from "../data/wedding";
import { NaverMap } from "./NaverMap";
import { ScrollReveal } from "./ScrollReveal";

export function Location() {
  const { venue } = WEDDING;
  const { lat, lng } = venue.location;

  return (
    <section className="px-6 py-16">
      <ScrollReveal delay={150}>
        <div className="mx-auto max-w-lg">
          <h2 className="mb-10 text-center font-serif text-[1.8rem] tracking-widest">
            오시는 길
          </h2>

          {/* 🗺 네이버 지도 */}
          <NaverMap lat={lat} lng={lng} zoom={16} />

          {/* 장소 정보 */}
          <div className="mb-4 rounded-2xl bg-white p-6 shadow-card">
            <h3 className="mb-2 text-xl">{venue.name}</h3>
            <p className="mb-4 text-sm text-wedding-textMuted">
              {venue.address}
              <br />
              {venue.detail}
            </p>

            {/* 🚗 길찾기 버튼 */}
            <div className="flex flex-wrap gap-2">
              <NavButton
                label="네이버 지도"
                href={`https://map.naver.com/p/search/${encodeURIComponent(
                  `${venue.name} ${venue.address}`,
                )}`}
              />

              <NavButton
                label="카카오 지도"
                href={`https://map.kakao.com/link/search/${encodeURIComponent(
                  "라비에벨웨딩",
                )}`}
              />
            </div>
          </div>

          {/* 교통 안내 */}
          <div className="space-y-5 rounded-2xl bg-white p-6 shadow-card">
            <InfoRow title="지하철">
              <div className="space-y-1">
                {venue.transport.subway.lines.map((line) => (
                  <ChipRow
                    key={line.line}
                    chip={<LineChip label={line.line} color={line.color} />}
                  >
                    {line.description}
                  </ChipRow>
                ))}
              </div>
            </InfoRow>

            <InfoRow title="버스">
              <div className="space-y-1">
                {venue.transport.bus.lines.map((bus) => (
                  <ChipRow key={bus.type} chip={<LineChip label={bus.type} />}>
                    {bus.numbers.join(", ")}
                  </ChipRow>
                ))}
              </div>
            </InfoRow>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

/* ===============================
   공통 컴포넌트
=============================== */

interface InfoRowProps {
  title: string;
  children: ReactNode;
}

function InfoRow({ title, children }: InfoRowProps) {
  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <h4 className="mb-1 text-sm font-semibold">{title}</h4>
        {children}
      </div>
    </div>
  );
}

interface NavButtonProps {
  label: string;
  href: string;
}

function NavButton({ label, href }: NavButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-wedding-pinkLine px-4 py-2 text-xs text-wedding-pink hover:text-wedding-pink"
    >
      <Navigation className="h-4 w-4" />
      {label}
    </a>
  );
}

type LineChipColor =
  | "purple" // 5호선
  | "gold" // 9호선
  | "blue"
  | "green"
  | "default";

interface LineChipProps {
  label: string;
  color?: LineChipColor;
}

const LINE_CHIP_COLOR_MAP: Record<LineChipColor, string> = {
  purple: "bg-purple-100 text-purple-600",
  gold: "bg-yellow-100 text-yellow-700",
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  default: "bg-wedding-pinkSoft text-wedding-pink",
};

function LineChip({ label, color = "default" }: LineChipProps) {
  return (
    <span
      className={`inline-flex min-w-12 items-center place-content-center rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap ${LINE_CHIP_COLOR_MAP[color]}`}
    >
      {label}
    </span>
  );
}

interface ChipRowProps {
  chip: ReactNode;
  children: ReactNode;
}

function ChipRow({ chip, children }: ChipRowProps) {
  return (
    <div className="flex items-start gap-2">
      <div>{chip}</div>
      <div className="text-sm pt-0.5 text-wedding-textMuted leading-relaxed">
        {children}
      </div>
    </div>
  );
}

