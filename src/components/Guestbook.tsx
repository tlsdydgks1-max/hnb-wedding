import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, MessageCircle, PenLine } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { fetchGuestbookMessages } from "../lib/guestbook";
import { useGuestbookStore } from "../store/guestbook";

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
  const { messages, openDialog, setMessages } = useGuestbookStore();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchGuestbookMessages()
      .then(setMessages)
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : "방명록 오류가 발생했습니다."),
      )
      .finally(() => setIsLoading(false));
  }, [setMessages]);

  const pageCount = Math.max(1, Math.ceil(messages.length / PAGE_SIZE));
  const pageItems = useMemo(() => getPageItems(page, pageCount), [page, pageCount]);
  const visibleMessages = useMemo(
    () => messages.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [messages, page],
  );

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
                setPage(1);
                openDialog();
              }}
              className="inline-flex items-center gap-2 rounded-full border border-wedding-pinkLine bg-white px-5 py-2.5 text-sm text-wedding-pink shadow-soft"
            >
              <PenLine className="h-4 w-4" />
              방명록 작성하기
            </button>
          </div>

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
