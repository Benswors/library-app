import { Errors } from '../../types';
import { el } from '../dom';

export interface Field { name: string; placeholder: string }

export function buildForm(
  title: string,
  fields: Field[],
  submitLabel: string,
  onSubmit: (values: Record<string, string>) => Errors,
): HTMLElement {
  const card = el('div', 'card shadow-sm mb-3');
  const body = el('div', 'card-body');
  body.append(el('h4', 'card-title mb-3', title));
  const inputs: Record<string, HTMLInputElement> = {};
  const msgs: Record<string, HTMLElement> = {};
  fields.forEach((f) => {
    const input = el('input', 'form-control mb-1');
    input.placeholder = f.placeholder;
    const msg = el('div', 'text-danger small mb-2');
    inputs[f.name] = input;
    msgs[f.name] = msg;
    body.append(input, msg);
  });
  const btn = el('button', 'btn btn-success', submitLabel);
  btn.onclick = () => {
    const values: Record<string, string> = {};
    fields.forEach((f) => (values[f.name] = inputs[f.name].value));
    const errors = onSubmit(values);
    fields.forEach((f) => {
      msgs[f.name].textContent = errors[f.name] ?? '';
      inputs[f.name].classList.toggle('is-invalid', !!errors[f.name]);
    });
    if (Object.keys(errors).length === 0) fields.forEach((f) => (inputs[f.name].value = ''));
  };
  body.append(btn);
  card.append(body);
  return card;
}
