import type Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export {};
