/**
 * Tiny intro bus. The preloader owns the "ready" moment; the hero waits for it
 * so its masked reveal never plays underneath the curtain.
 */
let complete = false;
const listeners = new Set<() => void>();

export const intro = {
  isComplete: (): boolean => complete,
  complete(): void {
    if (complete) return;
    complete = true;
    listeners.forEach((listener) => listener());
    listeners.clear();
  },
  subscribe(listener: () => void): () => void {
    if (complete) {
      listener();
      return () => undefined;
    }
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};

export const INTRO_STORAGE_KEY = 'edge:preloaded';
