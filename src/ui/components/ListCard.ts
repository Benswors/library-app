import { paginate } from '../../utils/paginate';
import { el } from '../dom';

export function ListCard<T>(
  title: string,
  items: T[],
  page: number,
  onPage: (p: number) => void,
  row: (item: T) => HTMLElement,
  extra?: HTMLElement,
): HTMLElement {
  const card = el('div', 'card shadow-sm mb-3');
  const body = el('div', 'card-body');
  body.append(el('h4', 'card-title mb-3', title));
  if (extra) body.append(extra);
  const ul = el('ul', 'list-group list-group-flush');
  const p = paginate(items, page);
  p.items.forEach((i) => {
    const li = el(
      'li',
      'list-group-item d-flex justify-content-between align-items-center',
    );
    li.append(row(i));
    ul.append(li);
  });
  body.append(ul);
  if (p.pages > 1) {
    const nav = el('div', 'd-flex justify-content-center align-items-center gap-3 mt-3');
    const prev = el('button', 'btn btn-outline-secondary btn-sm', '‹');
    const next = el('button', 'btn btn-outline-secondary btn-sm', '›');
    prev.disabled = p.page === 1;
    next.disabled = p.page === p.pages;
    prev.onclick = () => onPage(p.page - 1);
    next.onclick = () => onPage(p.page + 1);
    nav.append(prev, el('span', 'small', `${p.page} / ${p.pages}`), next);
    body.append(nav);
  }
  card.append(body);
  return card;
}
