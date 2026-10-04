import { Book } from '../models/Book';
import { User } from '../models/User';
import { IBook } from '../models/interfaces/IBook';
import { IUser } from '../models/interfaces/IUser';
import { generateId } from '../utils/idGenerator';
import { Library } from './Library';
import { Storage } from './Storage';

export const MAX_BORROWED = 3;

export class LibraryService {
  readonly books = new Library<Book>();
  readonly users = new Library<User>();

  constructor(private readonly store = new Storage()) {
    this.books.setAll(this.store.load<IBook[]>('books', []).map(Book.fromJSON));
    this.users.setAll(this.store.load<IUser[]>('users', []).map(User.fromJSON));
  }

  private persist(): void {
    this.store.save('books', this.books.getAll().map((b) => b.toJSON()));
    this.store.save('users', this.users.getAll().map((u) => u.toJSON()));
  }

  addBook(title: string, author: string, year: number): void {
    this.books.add(new Book(generateId(), title.trim(), author.trim(), year));
    this.persist();
  }

  addUser(name: string, email: string): void {
    this.users.add(new User(generateId(), name.trim(), email.trim()));
    this.persist();
  }

  removeBook(id: string): void { this.books.remove(id); this.persist(); }

  removeUser(id: string): void {
    this.books.find((b) => b.borrowedBy === id).forEach((b) => b.giveBack());
    this.users.remove(id);
    this.persist();
  }

  search(query: string): Book[] {
    const q = query.trim().toLowerCase();
    return this.books.find(
      (b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q),
    );
  }

  borrow(bookId: string, userId: string): { book: Book; user: User } {
    const book = this.books.getById(bookId);
    const user = this.users.getById(userId);
    if (!book) throw new Error('Книгу не знайдено.');
    if (!user) throw new Error(`Користувача з ID ${userId} не знайдено.`);
    if (this.books.find((b) => b.borrowedBy === userId).length >= MAX_BORROWED) {
      throw new Error(`Користувач не може позичити більше ${MAX_BORROWED} книг.`);
    }
    book.borrow(userId);
    this.persist();
    return { book, user };
  }

  giveBack(bookId: string): Book {
    const book = this.books.getById(bookId);
    if (!book) throw new Error('Книгу не знайдено.');
    book.giveBack();
    this.persist();
    return book;
  }
}
