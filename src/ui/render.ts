import { LibraryService } from '../services/LibraryService';
import { notifications } from '../services/NotificationService';
import { Validation } from '../utils/validators';
import { BookForm } from './components/BookForm';
import { BookList } from './components/BookList';
import { AppModal } from './components/Modal';
import { UserForm } from './components/UserForm';
import { UserList } from './components/UserList';
import { el } from './dom';

export function mount(root: HTMLElement, svc: LibraryService): void {
  const state = { query: '', bookPage: 1, userPage: 1 };
  const lists = el('div');

  notifications.subscribe((msg, label) => void AppModal.message(msg, label));

  const draw = (): void => {
    lists.replaceChildren(
      BookList(svc.search(state.query), state.bookPage, state.query, {
        onSearch: (q) => {
          state.query = q;
          state.bookPage = 1;
          draw();
          const i = root.querySelector<HTMLInputElement>('#search');
          i?.focus();
          i?.setSelectionRange(q.length, q.length);
        },
        onPage: (p) => { state.bookPage = p; draw(); },
        onDelete: (b) => { svc.removeBook(b.id); draw(); },
        onReturn: (b) => {
          svc.giveBack(b.id);
          draw();
          notifications.notify(`${b.toString()} has been returned.`, 'Закрити');
        },
        onBorrow: async (b) => {
          const id = await AppModal.prompt('Введіть ID користувача для позичення книги:');
          if (id === null) return;
          const err = Validation.validateUserId(id);
          if (err) return notifications.notify(err);
          try {
            const { user } = svc.borrow(b.id, id.trim());
            draw();
            notifications.notify(`${b.toString()} has been borrowed by ${user.toString()}.`);
          } catch (e) {
            notifications.notify((e as Error).message);
          }
        },
      }),
      UserList(svc.users.getAll(), state.userPage, (p) => { state.userPage = p; draw(); }, (u) => {
        svc.removeUser(u.id);
        draw();
      }),
    );
  };

  const wrap = el('div', 'container py-4 bg-light');
  wrap.style.maxWidth = '960px';
  wrap.append(
    el('h2', 'text-center mb-4', 'Система Управління Бібліотекою'),
    BookForm((t, a, y) => { svc.addBook(t, a, y); draw(); }),
    UserForm((n, e) => { svc.addUser(n, e); draw(); }),
    lists,
  );
  root.append(wrap);
  draw();
}
