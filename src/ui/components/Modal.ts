import { Modal as BsModal } from 'bootstrap';
import { el } from '../dom';

interface Btn<T> {
  label: string;
  cls: string;
  result: () => T;
}

function show<T>(
  title: string | null,
  body: HTMLElement,
  btns: Btn<T>[],
  dismiss: T,
): Promise<T> {
  return new Promise((resolve) => {
    const root = el('div', 'modal fade');
    root.tabIndex = -1;
    const content = el('div', 'modal-content');
    const dialog = el('div', 'modal-dialog modal-dialog-centered');
    if (title) {
      const h = el('div', 'modal-header');
      h.append(el('h5', 'modal-title', title));
      content.append(h);
    }
    const b = el('div', 'modal-body');
    b.append(body);
    const f = el('div', 'modal-footer');
    let value = dismiss;
    const modal = new BsModal(root);
    btns.forEach((x) => {
      const btn = el('button', `btn ${x.cls}`, x.label);
      btn.onclick = () => {
        value = x.result();
        modal.hide();
      };
      f.append(btn);
    });
    content.append(b, f);
    dialog.append(content);
    root.append(dialog);
    document.body.append(root);
    root.addEventListener('hidden.bs.modal', () => {
      root.remove();
      resolve(value);
    });
    modal.show();
  });
}

export const AppModal = {
  message(text: string, label = 'Зрозуміло!'): Promise<void> {
    return show<void>(
      null,
      el('p', 'mb-0', text),
      [{ label, cls: 'btn-primary', result: () => undefined }],
      undefined,
    );
  },
  prompt(title: string, placeholder = 'ID'): Promise<string | null> {
    const input = el('input', 'form-control form-control-lg');
    input.placeholder = placeholder;
    return show<string | null>(
      title,
      input,
      [
        { label: 'Скасувати', cls: 'btn-secondary', result: () => null },
        { label: 'Зберегти', cls: 'btn-primary', result: () => input.value },
      ],
      null,
    );
  },
};
