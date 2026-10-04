export class Library<T extends { id: string }> {
  private items: T[] = [];

  add(item: T): void {
    if (this.getById(item.id)) throw new Error(`Об’єкт з id ${item.id} вже існує.`);
    this.items.push(item);
  }

  remove(id: string): boolean {
    const before = this.items.length;
    this.items = this.items.filter((i) => i.id !== id);
    return this.items.length < before;
  }

  getById(id: string): T | undefined {
    return this.items.find((i) => i.id === id);
  }

  find(predicate: (item: T) => boolean): T[] {
    return this.items.filter(predicate);
  }

  getAll(): T[] { return [...this.items]; }
  setAll(items: T[]): void { this.items = [...items]; }
}
