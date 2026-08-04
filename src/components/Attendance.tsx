import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Check, Send, X } from "lucide-react";
import {
  createAttendanceResponse,
  type AttendanceSide,
} from "../lib/attendance";
import { ScrollReveal } from "./ScrollReveal";

const THEME = import.meta.env.VITE_APP_THEME || "classic";

type ChoiceButtonProps = {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
};

function ChoiceButton({ selected, onClick, children }: ChoiceButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className="attendance-choice min-h-11 flex-1 rounded-md px-3 py-2.5 text-sm font-medium"
    >
      {children}
    </button>
  );
}

export function Attendance() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="wedding-attendance bg-wedding-bg px-6 py-16">
      <ScrollReveal delay={150}>
        <div className="mx-auto max-w-lg text-center">
          <h2 className="mb-5 font-serif text-[1.8rem] tracking-widest text-wedding-textPrimary">
            참석 의사 전달
          </h2>
          <p className="mb-8 text-sm leading-relaxed text-wedding-textMuted">
            원활한 예식 준비를 위해
            <br />
            참석 여부와 식사 여부를 알려주세요.
          </p>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="attendance-open inline-flex min-h-12 w-full max-w-xs items-center justify-center gap-2 rounded-lg bg-wedding-pink px-5 py-3 text-sm font-medium text-white shadow-soft"
          >
            <Send className="h-4 w-4" />
            전달하기
          </button>
        </div>
      </ScrollReveal>

      {isOpen && <AttendanceDialog onClose={() => setIsOpen(false)} />}
    </section>
  );
}

function AttendanceDialog({ onClose }: { onClose: () => void }) {
  const [side, setSide] = useState<AttendanceSide>("groom");
  const [attending, setAttending] = useState(true);
  const [name, setName] = useState("");
  const [meal, setMeal] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("성함을 입력해 주세요.");
      return;
    }
    setIsSaving(true);
    setError("");

    try {
      await createAttendanceResponse({
        side,
        attending,
        name: trimmedName,
        meal,
      });
      setIsSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "참석 정보를 저장하지 못했습니다.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return createPortal(
    <div
      data-theme={THEME}
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/60 px-2 py-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby="attendance-title"
        onSubmit={handleSubmit}
        className="attendance-dialog my-auto w-full max-w-[370px] rounded-lg bg-white p-5 shadow-card"
      >
        <div className="mb-5 flex items-center justify-between">
          <h3
            id="attendance-title"
            className="text-lg font-semibold text-wedding-textPrimary"
          >
            참석 의사 전달
          </h3>
          <button
            type="button"
            aria-label="닫기"
            onClick={onClose}
            className="attendance-close flex h-9 w-9 items-center justify-center rounded-full text-wedding-textMuted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-wedding-pink text-white">
              <Check className="h-6 w-6" />
            </div>
            <p className="font-semibold text-wedding-textPrimary">
              참석 의사가 전달되었습니다.
            </p>
            <p className="mt-2 text-sm text-wedding-textMuted">
              소중한 답변 감사합니다.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="attendance-submit mt-7 min-h-11 w-full rounded-md px-4 py-3 text-sm font-medium"
            >
              확인
            </button>
          </div>
        ) : (
          <>
            <div className="attendance-form rounded-lg bg-wedding-pinkSoft/70 p-4">
              <fieldset className="mb-5">
                <legend className="mb-2 text-sm font-medium text-wedding-textPrimary">
                  어느 측 하객이신가요? <span className="text-red-500">*</span>
                </legend>
                <div className="flex gap-3">
                  <ChoiceButton
                    selected={side === "groom"}
                    onClick={() => setSide("groom")}
                  >
                    신랑
                  </ChoiceButton>
                  <ChoiceButton
                    selected={side === "bride"}
                    onClick={() => setSide("bride")}
                  >
                    신부
                  </ChoiceButton>
                </div>
              </fieldset>

              <fieldset className="mb-5">
                <legend className="mb-2 text-sm font-medium text-wedding-textPrimary">
                  참석하시나요? <span className="text-red-500">*</span>
                </legend>
                <div className="flex gap-3">
                  <ChoiceButton
                    selected={attending}
                    onClick={() => setAttending(true)}
                  >
                    참석
                  </ChoiceButton>
                  <ChoiceButton
                    selected={!attending}
                    onClick={() => setAttending(false)}
                  >
                    불참석
                  </ChoiceButton>
                </div>
              </fieldset>

              <label
                htmlFor="attendance-name"
                className="mb-2 block text-sm font-medium text-wedding-textPrimary"
              >
                성함 <span className="text-red-500">*</span>
              </label>
              <input
                id="attendance-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                maxLength={40}
                autoComplete="name"
                autoFocus
                className="mb-5 min-h-11 w-full rounded-md border border-wedding-pinkLine bg-white px-4 py-3 text-sm text-wedding-textPrimary outline-none focus:border-wedding-pink"
              />

              <fieldset className="mb-5">
                <legend className="mb-2 text-sm font-medium text-wedding-textPrimary">
                  식사 하시나요?
                </legend>
                <div className="flex gap-3">
                  <ChoiceButton selected={meal} onClick={() => setMeal(true)}>
                    O
                  </ChoiceButton>
                  <ChoiceButton selected={!meal} onClick={() => setMeal(false)}>
                    X
                  </ChoiceButton>
                </div>
              </fieldset>

            </div>

            {error && (
              <p role="alert" className="mt-3 text-center text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSaving || !name.trim()}
              className="attendance-submit mt-5 min-h-12 w-full rounded-md px-4 py-3 text-sm font-medium"
            >
              {isSaving ? "전달 중..." : "전달하기"}
            </button>
          </>
        )}
      </form>
    </div>,
    document.body,
  );
}
