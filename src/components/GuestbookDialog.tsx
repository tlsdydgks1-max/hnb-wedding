import { useEffect, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { Send, X } from "lucide-react";
import { createGuestbookMessage } from "../lib/guestbook";
import { useGuestbookStore } from "../store/guestbook";

export function GuestbookDialog() {
  const { isDialogOpen, closeDialog, addMessage } = useGuestbookStore();
  const [isSaving, setIsSaving] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (!isDialogOpen) return;

    setFormError("");
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isDialogOpen]);

  if (!isDialogOpen) return null;

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
      addMessage(created);
      setName("");
      setMessage("");
      closeDialog();
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "방명록을 저장하지 못했습니다.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/45 px-6 py-8"
      onClick={closeDialog}
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
            onClick={closeDialog}
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
    </div>,
    document.body,
  );
}
