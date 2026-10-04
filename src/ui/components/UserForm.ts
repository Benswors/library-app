import { Validation } from '../../utils/validators';
import { buildForm } from './Form';

export function UserForm(onAdd: (name: string, email: string) => void): HTMLElement {
  return buildForm(
    'Додати Користувача',
    [
      { name: 'name', placeholder: 'Ім’я' },
      { name: 'email', placeholder: 'Email' },
    ],
    'Додати Користувача',
    (v) => {
      const errors = Validation.validateUser({ name: v.name, email: v.email });
      if (Object.keys(errors).length === 0) onAdd(v.name, v.email);
      return errors;
    },
  );
}
