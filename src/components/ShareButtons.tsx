import { useState } from "react";
import { Share2, Link, Check } from "lucide-react";

declare global {
  interface Window {
    Kakao: any;
  }
}

export function ShareButtons() {
  const [copied, setCopied] = useState(false);

  /* ===============================
     카카오톡 공유 (요청한 방식)
  =============================== */
  function kakaoShare() {
    if (!window.Kakao) {
      alert("카카오 SDK가 로드되지 않았습니다.");
      return;
    }

    // 혹시 초기화 안 된 경우 대비
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init("YOUR_KAKAO_JAVASCRIPT_APP_KEY");
    }

    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "신용한 ❤️ 유예빈 결혼합니다.",
        description: "2027.03.22\n오후 1시 30분\n더 베뉴지 서울",
        imageUrl: "https://hnb-wedding.vercel.app/images/img1.jpg",
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: "모바일 청첩장 보기",
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
      installTalk: true,
    });
  }

  /* ===============================
     링크 복사 (실사용 안정판)
  =============================== */
  async function copyLink() {
    // 최신 브라우저
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(window.location.href);
    } else {
      // fallback
      const textarea = document.createElement("textarea");
      textarea.value = window.location.href;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="px-6 py-6">
      <div className="mx-auto max-w-lg">
        <div className="grid grid-cols-2 gap-3">
          {/* 카카오톡 공유 */}
          <button
            type="button"
            onClick={kakaoShare}
            className="
              flex items-center justify-center gap-2
              rounded-full bg-[#FEE500]
              py-3 text-[13px] font-medium text-[#3C1E1E]
            "
          >
            <Share2 className="h-4 w-4" />
            카카오톡 공유하기
          </button>

          {/* 링크 복사 */}
          <button
            type="button"
            onClick={copyLink}
            className={`
              flex items-center justify-center gap-2
              rounded-full border
              py-3 text-[13px] font-medium
              transition border-wedding-pink hover:border-wedding-pinkLine
              ${
                copied
                  ? "bg-wedding-pink/90 text-white"
                  : "bg-white text-wedding-pink hover:bg-wedding-pink/5"
              }
            `}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                링크 복사됨
              </>
            ) : (
              <>
                <Link className="h-4 w-4" />
                링크주소 복사하기
              </>
            )}
          </button>
        </div>

        <p className="mt-10 text-center text-[11px] text-wedding-textMuted/70">
          ♥ H&amp;B © 2026
        </p>
      </div>
    </section>
  );
}
