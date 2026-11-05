// Lets page code ask for a smooth scroll without knowing whether the
// smooth-scroll engine (Lenis, started by ScrollExperience) is running.
type Scroller = (target: HTMLElement) => void;

let scroller: Scroller | null = null;

export function setSmoothScroller(next: Scroller | null) {
  scroller = next;
}

export function getSmoothScroller() {
  return scroller;
}
