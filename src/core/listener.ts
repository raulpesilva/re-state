export class Listener<T extends unknown> {
  private listeners = new Set<(prev: T | undefined, next: T) => void>();

  get size(): number {
    return this.listeners.size;
  }

  subscribe(listener: (prev: T | undefined, next: T) => void) {
    this.listeners.add(listener);
    return () => this.listeners.has(listener) && this.listeners.delete(listener);
  }

  notify(prev: T | undefined, next: T) {
    this.listeners.forEach((listener) => listener(prev, next));
  }
}
