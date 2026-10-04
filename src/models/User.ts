import { IUser } from './interfaces/IUser';

export class User implements IUser {
  constructor(
    private readonly _id: string,
    private _name: string,
    private _email: string,
  ) {}

  get id(): string { return this._id; }
  get name(): string { return this._name; }
  set name(v: string) { this._name = v; }
  get email(): string { return this._email; }
  set email(v: string) { this._email = v; }

  toString(): string { return `${this._id} ${this._name} (${this._email})`; }
  toJSON(): IUser { return { id: this._id, name: this._name, email: this._email }; }
  static fromJSON(d: IUser): User { return new User(d.id, d.name, d.email); }
}
