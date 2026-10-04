import { Listener } from '../types';

export class NotificationService {
  private listeners: Listener[] = [];
  subscribe(l: Listener): void { this.listeners.push(l); }
  notify(message: string, buttonLabel = 'Зрозуміло!'): void {
    this.listeners.forEach((l) => l(message, buttonLabel));
  }
}
export const notifications = new NotificationService();
