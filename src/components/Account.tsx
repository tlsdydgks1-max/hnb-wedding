import { useState, type ReactNode } from "react";
import { Copy, Check, ChevronDown } from "lucide-react";
import { WEDDING } from "../data/wedding";

/* ===============================
   Clipboard Util (실사용 안정판)
=============================== */
async function copyToClipboard(text: string) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  textarea.style.top = "-9999px";

  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

/* ===============================
   Main Section
=============================== */
export function Account() {
  const accounts = WEDDING.accounts;

  return (
    <section className="bg-wedding-bg px-6 py-16">
      <div className="mx-auto max-w-lg">
        <h2 className="mb-4 text-center font-serif text-[1.8rem] tracking-widest">
          마음을 전하실 곳
        </h2>

        <p className="mb-10 text-center text-sm leading-relaxed text-wedding-textMuted">
          참석이 어려우신 분들을 위해
          <br />
          계좌번호를 기재하였습니다.
          <br />
          너그러운 마음으로 양해 부탁드립니다.
        </p>

        <div className="space-y-3">
          {accounts.map((group) => (
            <AccountDropdown key={group.side} title={group.title}>
              <div className="space-y-3">
                {group.rows.map((row) => (
                  <AccountRow
                    key={`${row.label}-${row.bank}-${row.number}`}
                    label={row.label}
                    bank={row.bank}
                    number={row.number}
                  />
                ))}
              </div>
            </AccountDropdown>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===============================
   Dropdown
=============================== */
function AccountDropdown({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl bg-white shadow-card">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-5 py-4 text-sm font-semibold"
      >
        {title}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && <div className="border-t px-5 py-4">{children}</div>}
    </div>
  );
}

/* ===============================
   Account Row
=============================== */
type AccountInfo = {
  label: string;
  bank: string;
  number: string;
};

function AccountRow({ label, bank, number }: AccountInfo) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await copyToClipboard(number);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("복사에 실패했습니다. 길게 눌러 복사해주세요.");
    }
  };

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="text-sm text-wedding-textMuted">
        {label} · {bank} {number}
      </div>

      <button
        type="button"
        onClick={copy}
        className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs transition hover:border-wedding-pinkLine
          ${
            copied
              ? "border-wedding-pink bg-wedding-pink text-white"
              : "border-wedding-pinkLine bg-wedding-pinkSoft text-wedding-pink"
          }
        `}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied ? "복사됨" : "복사"}
      </button>
    </div>
  );
}
