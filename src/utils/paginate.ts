export interface Page<T> {
  items: T[];
  page: number;
  pages: number;
}

export function paginate<T>(all: T[], page: number, size = 5): Page<T> {
  const pages = Math.max(1, Math.ceil(all.length / size));
  const p = Math.min(Math.max(1, page), pages);
  return { items: all.slice((p - 1) * size, p * size), page: p, pages };
}
