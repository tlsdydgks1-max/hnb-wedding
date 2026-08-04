export type AttendanceSide = "groom" | "bride";

export type AttendanceResponse = {
  side: AttendanceSide;
  attending: boolean;
  name: string;
  meal: boolean;
};

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as
  | string
  | undefined;
const TABLE = "attendance";

export async function createAttendanceResponse(data: AttendanceResponse) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Supabase 환경변수를 설정해 주세요.");
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE}`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("참석 정보를 저장하지 못했습니다. 잠시 후 다시 시도해 주세요.");
  }
}
