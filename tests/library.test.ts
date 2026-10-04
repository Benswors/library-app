import { expect } from 'chai';
import { Book } from '../src/models/Book';
import { Library } from '../src/services/Library';

describe('Library<T>', () => {
  let lib: Library<Book>;
  beforeEach(() => {
    lib = new Library<Book>();
    lib.add(new Book('1', 'Clean Code', 'Robert Martin', 2008));
  });

  it('додає об’єкт', () => expect(lib.getAll()).to.have.length(1));
  it('не додає дублікат id', () => {
    expect(() => lib.add(new Book('1', 'X', 'Y', 2000))).to.throw();
  });
  it('видаляє об’єкт', () => {
    expect(lib.remove('1')).to.equal(true);
    expect(lib.getAll()).to.have.length(0);
  });
  it('повертає false при видаленні неіснуючого', () =>
    expect(lib.remove('9')).to.equal(false));
  it('шукає за предикатом', () => {
    expect(lib.find((b) => b.author.includes('Martin'))).to.have.length(1);
    expect(lib.find((b) => b.title === 'Nope')).to.have.length(0);
  });
  it('позичання змінює стан книги', () => {
    const b = lib.getById('1') as Book;
    b.borrow('42');
    expect(b.isBorrowed).to.equal(true);
    expect(() => b.borrow('43')).to.throw();
    b.giveBack();
    expect(b.isBorrowed).to.equal(false);
  });
});
