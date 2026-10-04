let counter = 0;
export function generateId(): string {
  counter = (counter + 1) % 1000;
  return `${Date.now()}${counter}`;
}
