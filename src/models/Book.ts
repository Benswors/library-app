import { IBook } from './interfaces/IBook';

export class Book implements IBook {
  constructor(
    private readonly _id: string,
    private _title: string,
    private _author: string,
    private _year: number,
    private _borrowedBy: string | null = null,
  ) {}

  get id(): string { return this._id; }
  get title(): string { return this._title; }
  set title(v: string) { this._title = v; }
  get author(): string { return this._author; }
  set author(v: string) { this._author = v; }
  get year(): number { return this._year; }
  get borrowedBy(): string | null { return this._borrowedBy; }
  get isBorrowed(): boolean { return this._borrowedBy !== null; }

  borrow(userId: string): void {
    if (this.isBorrowed) throw new Error('Книгу вже позичено.');
    this._borrowedBy = userId;
  }

  giveBack(): void { this._borrowedBy = null; }

  toString(): string { return `${this._title} by ${this._author} (${this._year})`; }

  toJSON(): IBook {
    return { id: this._id, title: this._title, author: this._author, year: this._year, borrowedBy: this._borrowedBy };
  }

  static fromJSON(d: IBook): Book {
    return new Book(d.id, d.title, d.author, d.year, d.borrowedBy);
  }
}
