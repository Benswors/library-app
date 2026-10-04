import { Book } from '../../models/Book';
import { el } from '../dom';
import { ListCard } from './ListCard';

export interface BookHandlers {
  onBorrow: (b: Book) => void;
  onReturn: (b: Book) => void;
  onDelete: (b: Book) => void;
  onSearch: (q: string) => void;
  onPage: (p: number) => void;
}

export function BookList(
  books: Book[],
  page: number,
  query: string,
  h: BookHandlers,
): HTMLElement {
  const search = el('input', 'form-control mb-3');
  search.id = 'search';
  search.placeholder = 'Пошук за автором або назвою';
  search.value = query;
  search.oninput = () => h.onSearch(search.value);
  return ListCard(
    'Список Книг',
    books,
    page,
    h.onPage,
    (b) => {
      const wrap = el('div', 'd-flex justify-content-between align-items-center w-100');
      wrap.append(el('span', '', b.toString()));
      const actions = el('div', 'd-flex gap-2');
      const main = el(
        'button',
        `btn btn-sm ${b.isBorrowed ? 'btn-warning' : 'btn-primary'}`,
      );
      main.textContent = b.isBorrowed ? 'Повернути' : 'Позичити';
      main.onclick = () => (b.isBorrowed ? h.onReturn(b) : h.onBorrow(b));
      const del = el('button', 'btn btn-sm btn-outline-danger', '✕');
      del.onclick = () => h.onDelete(b);
      actions.append(main, del);
      wrap.append(actions);
      return wrap;
    },
    search,
  );
}
