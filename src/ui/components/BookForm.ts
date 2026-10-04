import { Validation } from '../../utils/validators';
import { buildForm } from './Form';

export function BookForm(onAdd: (title: string, author: string, year: number) => void): HTMLElement {
  return buildForm(
    'Додати Книгу',
    [
      { name: 'title', placeholder: 'Назва книги' },
      { name: 'author', placeholder: 'Автор' },
      { name: 'year', placeholder: 'Рік видання' },
    ],
    'Додати Книгу',
    (v) => {
      const errors = Validation.validateBook({ title: v.title, author: v.author, year: v.year });
      if (Object.keys(errors).length === 0) onAdd(v.title, v.author, Number(v.year));
      return errors;
    },
  );
}
