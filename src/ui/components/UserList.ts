import { User } from '../../models/User';
import { el } from '../dom';
import { ListCard } from './ListCard';

export function UserList(
  users: User[],
  page: number,
  onPage: (p: number) => void,
  onDelete: (u: User) => void,
): HTMLElement {
  return ListCard('Список Користувачів', users, page, onPage, (u) => {
    const wrap = el('div', 'd-flex justify-content-between align-items-center w-100');
    wrap.append(el('span', '', u.toString()));
    const del = el('button', 'btn btn-sm btn-outline-danger', '✕');
    del.onclick = () => onDelete(u);
    wrap.append(del);
    return wrap;
  });
}
