export function getYear(date: string) {
  if (!date) return null;
  return date.slice(0, 4);
}
