export function getMonthCalendar(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth(); // 0-based

  const firstDay = new Date(year, month, 1).getDay(); // 0 (Sun)
  const lastDate = new Date(year, month + 1, 0).getDate();

  const days: (number | null)[] = [];

  // 앞쪽 빈칸
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // 날짜 채우기
  for (let d = 1; d <= lastDate; d++) {
    days.push(d);
  }

  return days;
}
