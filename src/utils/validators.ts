import { Errors } from '../types';

export namespace Validation {
  const REQUIRED = 'Це поле є обов’язковим';
  export const YEAR_REGEX = /^(1\d{3}|20\d{2})$/;
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  export const isRequired = (v: string | undefined | null): boolean =>
    !!v && v.trim().length > 0;
  export const isUserId = (v: string): boolean => /^\d+$/.test(v);
  export const isYear = (v: string, max = new Date().getFullYear()): boolean =>
    YEAR_REGEX.test(v) && Number(v) <= max;

  export function validateUserId(id: string): string | null {
    if (!isRequired(id)) return REQUIRED;
    return isUserId(id.trim()) ? null : 'ID має містити лише цифри';
  }

  export function validateBook(d: { title: string; author: string; year: string }): Errors {
    const e: Errors = {};
    if (!isRequired(d.title)) e.title = REQUIRED;
    if (!isRequired(d.author)) e.author = REQUIRED;
    if (!isRequired(d.year)) e.year = REQUIRED;
    else if (!isUserId(d.year.trim())) e.year = 'Рік має містити лише цифри';
    else if (!isYear(d.year.trim())) e.year = 'Введіть коректний рік (1000 – поточний)';
    return e;
  }

  export function validateUser(d: { name: string; email: string }): Errors {
    const e: Errors = {};
    if (!isRequired(d.name)) e.name = REQUIRED;
    if (!isRequired(d.email)) e.email = REQUIRED;
    else if (!EMAIL_REGEX.test(d.email.trim())) e.email = 'Некоректний email';
    return e;
  }
}
