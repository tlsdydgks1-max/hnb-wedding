import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, X, Heart } from "lucide-react";
import { WEDDING } from "../data/wedding";

export function Gallery() {
  const [expanded, setExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  /* 💗 썸네일 이미지 로딩 상태 */
  const loadedRef = useRef<Set<number>>(new Set());
  const [, forceUpdate] = useState(0); // 최초 로딩 시 렌더 트리거용

  const images = WEDDING.gallery;
  const visibleCount = 4;
  const visibleImages = expanded ? images : images.slice(0, visibleCount);

  const close = () => setActiveIndex(null);

  const prev = () => {
    setActiveIndex((i) =>
      i === null ? null : (i - 1 + images.length) % images.length
    );
  };

  const next = () => {
    setActiveIndex((i) => (i === null ? null : (i + 1) % images.length));
  };

  /* ===============================
     📱 모바일 스와이프 (라이트박스)
  =============================== */
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const SWIPE_THRESHOLD = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartX.current;
    const deltaY = touch.clientY - touchStartY.current;

    if (Math.abs(deltaY) > Math.abs(deltaX)) return;

    if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
      if (deltaX > 0) prev();
      else next();
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  /* ===============================
     🔒 라이트박스 열릴 때 스크롤 차단
  =============================== */
  useEffect(() => {
    document.body.style.overflow = activeIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeIndex]);

  /* ===============================
     💗 썸네일 로딩 완료 처리
  =============================== */
  const onThumbLoad = (index: number) => {
    if (!loadedRef.current.has(index)) {
      loadedRef.current.add(index);
      forceUpdate((v) => v + 1); // 최초 1회만 리렌더
    }
  };

  return (
    <>
      {/* ===============================
          📷 Gallery
      =============================== */}
      <section className="px-6 py-16">
        <h2 className="mb-10 text-center font-serif text-[1.8rem] tracking-widest text-wedding-textPrimary">
          Gallery
        </h2>

        <div className="mx-auto max-w-lg">
          <div className="grid grid-cols-2 gap-3">
            {visibleImages.map((src, i) => (
              <button
                key={src}
                onClick={() => setActiveIndex(i)}
                className="aspect-square overflow-hidden rounded-2xl shadow-soft"
              >
                <div className="relative h-full w-full bg-wedding-pinkSoft/40">
                  {/* 💗 하트 로딩 (opacity로만 제어) */}
                  <div
                    className={`
                      absolute inset-0 z-10 flex items-center justify-center
                      transition-opacity duration-300
                      ${loadedRef.current.has(i) ? "opacity-0" : "opacity-100"}
                    `}
                  >
                    <Heart
                      className="h-7 w-7 text-wedding-pink animate-heartbeat"
                      fill="currentColor"
                    />
                  </div>

                  {/* 이미지 */}
                  <img
                    src={src}
                    alt={`gallery-${i + 1}`}
                    className={`
                      relative z-20
                      h-full w-full object-cover transform-gpu
                      ${
                        loadedRef.current.has(i)
                          ? "opacity-100"
                          : "opacity-0 transition-opacity duration-300"
                      }
                    `}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    onLoad={() => onThumbLoad(i)}
                    onError={() => onThumbLoad(i)}
                  />
                </div>
              </button>
            ))}
          </div>

          {!expanded && images.length > visibleCount && (
            <button
              onClick={() => setExpanded(true)}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-wedding-pinkLine py-3 text-sm text-wedding-pink hover:border-wedding-pinkLine"
            >
              사진 더보기 <ChevronDown className="h-4 w-4" />
            </button>
          )}
        </div>
      </section>

      {/* ===============================
          🔍 Lightbox
      =============================== */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={close}
        >
          {/* 닫기 */}
          <button
            className="absolute top-4 right-4 text-white/80"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
          >
            <X className="h-6 w-6" />
          </button>

          {/* 이전 */}
          <button
            className="absolute left-3 text-white/80"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          {/* 스와이프 이미지 */}
          <img
            src={images[activeIndex]}
            alt="preview"
            className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain select-none touch-none"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            draggable={false}
          />

          {/* 다음 */}
          <button
            className="absolute right-3 text-white/80"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>
      )}
    </>
  );
}
