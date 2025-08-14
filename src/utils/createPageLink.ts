// utils/createPageLink.ts

export function createPageLink(
  basePath: string,
  searchParams: Record<string, any>,
  page: number
) {
  const safeParams: Record<string, string> = {};

  Object.entries(searchParams).forEach(([key, value]) => {
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      safeParams[key] = String(value);
    }
  });

  safeParams.p = String(page); // обновляем номер страницы

  const newParams = new URLSearchParams(safeParams);

  return `${basePath}?${newParams.toString()}`;
}
