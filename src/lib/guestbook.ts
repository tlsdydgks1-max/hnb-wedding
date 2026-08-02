export type GuestbookMessage = {
  id: string;
  name: string;
  message: string;
  created_at: string;
};

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as
  | string
  | undefined;
const TABLE = "guestbook";

function headers() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Supabase 환경변수를 설정해 주세요.");
  }

  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    "Content-Type": "application/json",
  };
}

export async function fetchGuestbookMessages() {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/${TABLE}?select=id,name,message,created_at&order=created_at.desc&limit=50`,
    { headers: headers() },
  );

  if (!response.ok) {
    throw new Error("방명록을 불러오지 못했습니다.");
  }

  return (await response.json()) as GuestbookMessage[];
}

export async function createGuestbookMessage(name: string, message: string) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE}`, {
    method: "POST",
    headers: { ...headers(), Prefer: "return=representation" },
    body: JSON.stringify({ name, message }),
  });

  if (!response.ok) {
    throw new Error("방명록을 저장하지 못했습니다.");
  }

  const [created] = (await response.json()) as GuestbookMessage[];
  return created;
}
