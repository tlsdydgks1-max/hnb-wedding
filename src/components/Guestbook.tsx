import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  PenLine,
  Send,
  X,
} from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import {
  createGuestbookMessage,
  fetchGuestbookMessages,
  type GuestbookMessage,
} from "../lib/guestbook";

const PAGE_SIZE = 5;

function formatDate(value: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(value));
}

function getPageItems(page: number, pageCount: number) {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  const pages = new Set([1, pageCount, page - 1, page, page + 1]);
  return Array.from(pages)
    .filter((item) => item >= 1 && item <= pageCount)
    .sort((a, b) => a - b)
    .flatMap((item, index, items) =>
      index > 0 && item - items[index - 1] > 1 ? (["...", item] as const) : [item],
    );
}

export function Guestbook() {
  const [messages, setMessages] = useState<GuestbookMessage[]>([]);
  const [page, setPage] = useState(1);
  const [isWriting, setIsWriting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    fetchGuestbookMessages()
      .then(setMessages)
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : "방명록 오류가 발생했습니다."),
      )
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!isWriting) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isWriting]);

  const pageCount = Math.max(1, Math.ceil(messages.length / PAGE_SIZE));
  const pageItems = useMemo(() => getPageItems(page, pageCount), [page, pageCount]);
  const visibleMessages = useMemo(
    () => messages.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [messages, page],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedMessage = message.trim();
    if (!trimmedName || !trimmedMessage) {
      setFormError("이름과 메시지를 모두 입력해 주세요.");
      return;
    }

    setIsSaving(true);
    setFormError("");

    try {
      const created = await createGuestbookMessage(trimmedName, trimmedMessage);
      setMessages((current) => [created, ...current]);
      setName("");
      setMessage("");
      setIsWriting(false);
      setPage(1);
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "방명록을 저장하지 못했습니다.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="bg-wedding-bg px-6 py-16">
      <ScrollReveal delay={150}>
        <div className="mx-auto max-w-lg">
          <h2 className="mb-4 text-center font-serif text-[1.8rem] tracking-widest">
            방명록
          </h2>

          <div className="mb-6 flex justify-end">
            <button
              type="button"
              onClick={() => {
                setFormError("");
                setIsWriting(true);
              }}
              className="inline-flex items-center gap-2 rounded-full border border-wedding-pinkLine bg-white px-5 py-2.5 text-sm text-wedding-pink shadow-soft"
            >
              <PenLine className="h-4 w-4" />
              방명록 작성하기
            </button>
          </div>

          {isWriting && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/45 px-6 py-8"
              onClick={() => setIsWriting(false)}
            >
            <form
              onSubmit={handleSubmit}
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-card"
            >
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-base font-semibold text-wedding-textPrimary">
                  방명록 작성
                </h3>
                <button
                  type="button"
                  aria-label="닫기"
                  onClick={() => setIsWriting(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-wedding-pinkSoft text-wedding-pink"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <label className="mb-2 block text-xs font-semibold text-wedding-textSecondary">
                이름
              </label>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                maxLength={20}
                className="mb-4 w-full rounded-xl border border-wedding-pinkLine bg-white px-4 py-3 text-sm text-wedding-textPrimary outline-none focus:border-wedding-pink"
                placeholder="이름을 입력해 주세요"
              />

              <label className="mb-2 block text-xs font-semibold text-wedding-textSecondary">
                메시지
              </label>
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                maxLength={300}
                rows={4}
                className="w-full resize-none rounded-xl border border-wedding-pinkLine bg-white px-4 py-3 text-sm text-wedding-textPrimary outline-none focus:border-wedding-pink"
                placeholder="축하 메시지를 남겨 주세요"
              />

              {formError && (
                <p className="mt-4 rounded-xl bg-wedding-pinkSoft px-4 py-3 text-center text-sm text-wedding-textSecondary">
                  {formError}
                </p>
              )}

              <button
                type="submit"
                disabled={isSaving}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-wedding-pink py-3 text-sm font-medium text-white shadow disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send className="h-4 w-4" />
                {isSaving ? "저장 중..." : "남기기"}
              </button>
            </form>
            </div>
          )}

          {error && (
            <p className="mb-4 rounded-xl bg-white px-4 py-3 text-center text-sm text-wedding-textSecondary shadow-soft">
              {error}
            </p>
          )}

          <div className="space-y-3">
            {isLoading && (
              <p className="rounded-2xl bg-white p-5 text-center text-sm text-wedding-textMuted shadow-soft">
                방명록을 불러오는 중입니다.
              </p>
            )}

            {!isLoading && visibleMessages.length === 0 && (
              <p className="rounded-2xl bg-white p-5 text-center text-sm text-wedding-textMuted shadow-soft">
                첫 축하 메시지를 남겨 주세요.
              </p>
            )}

            {visibleMessages.map((m) => (
              <div key={m.id} className="rounded-2xl bg-white p-5 shadow-soft">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-wedding-pinkSoft">
                      <MessageCircle className="h-4 w-4 text-wedding-pink" />
                    </div>
                    <span className="text-sm font-semibold">{m.name}</span>
                  </div>
                  <span className="text-xs text-wedding-textMuted">
                    {formatDate(m.created_at)}
                  </span>
                </div>
                <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-wedding-textSecondary">
                  {m.message}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-2">
            <button
              type="button"
              aria-label="이전 페이지"
              disabled={page <= 1}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-wedding-pinkLine bg-white text-wedding-pink disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {pageItems.map((item, index) =>
              item === "..." ? (
                <span
                  key={`ellipsis-${index}`}
                  className="flex h-8 w-6 items-center justify-center text-sm text-wedding-textMuted"
                >
                  ...
                </span>
              ) : (
                <button
                  key={item}
                  type="button"
                  onClick={() => setPage(item)}
                  className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm ${
                    page === item
                      ? "border-wedding-pink bg-wedding-pink text-white"
                      : "border-wedding-pinkLine bg-white text-wedding-pink"
                  }`}
                >
                  {item}
                </button>
              ),
            )}

            <button
              type="button"
              aria-label="다음 페이지"
              disabled={page >= pageCount}
              onClick={() =>
                setPage((current) => Math.min(pageCount, current + 1))
              }
              className="flex h-8 w-8 items-center justify-center rounded-full border border-wedding-pinkLine bg-white text-wedding-pink disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

        </div>
      </ScrollReveal>
    </section>
  );
}

