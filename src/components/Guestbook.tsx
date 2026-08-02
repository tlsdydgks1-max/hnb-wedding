import { useEffect, useMemo, useState, type FormEvent } from "react";
import { ChevronDown, MessageCircle, Send } from "lucide-react";
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

export function Guestbook() {
  const [messages, setMessages] = useState<GuestbookMessage[]>([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isWriting, setIsWriting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchGuestbookMessages()
      .then(setMessages)
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : "방명록 오류가 발생했습니다."),
      )
      .finally(() => setIsLoading(false));
  }, []);

  const visibleMessages = useMemo(
    () => messages.slice(0, visibleCount),
    [messages, visibleCount],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedMessage = message.trim();
    if (!trimmedName || !trimmedMessage) {
      setError("이름과 메시지를 모두 입력해 주세요.");
      return;
    }

    setIsSaving(true);
    setError("");

    try {
      const created = await createGuestbookMessage(trimmedName, trimmedMessage);
      setMessages((current) => [created, ...current]);
      setName("");
      setMessage("");
      setIsWriting(false);
      setVisibleCount((current) => Math.max(current, PAGE_SIZE));
    } catch (err) {
      setError(
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
          <h2 className="mb-10 text-center font-serif text-[1.8rem] tracking-widest">
            방명록
          </h2>

          {isWriting && (
            <form
              onSubmit={handleSubmit}
              className="mb-6 rounded-2xl bg-white p-5 shadow-soft"
            >
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

              <button
                type="submit"
                disabled={isSaving}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-wedding-pink py-3 text-sm font-medium text-white shadow disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send className="h-4 w-4" />
                {isSaving ? "저장 중..." : "남기기"}
              </button>
            </form>
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
                <p className="text-sm leading-relaxed text-wedding-textSecondary">
                  {m.message}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              disabled={visibleCount >= messages.length}
              onClick={() => setVisibleCount((current) => current + PAGE_SIZE)}
              className="flex items-center justify-center gap-2 rounded-full border border-wedding-pinkLine bg-white py-3 text-sm text-wedding-pink hover:border-wedding-pinkLine disabled:cursor-not-allowed disabled:opacity-40"
            >
              더보기
              <ChevronDown className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setIsWriting((current) => !current)}
              className="rounded-full bg-wedding-pink py-3 text-sm font-medium text-white shadow"
            >
              {isWriting ? "닫기" : "방명록 작성하기"}
            </button>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
