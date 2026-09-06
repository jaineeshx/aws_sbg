import type Lenis from "lenis";

// Utility helper for smooth scrolling via Lenis when available, falling back to native smooth scroll.

export interface ScrollToOptions {
  offset?: number;
  duration?: number;
  easing?: (t: number) => number;
  immediate?: boolean;
  lock?: boolean;
}

export function lenisScrollTo(
  target: string | HTMLElement,
  options?: ScrollToOptions
) {
  if (typeof window === "undefined") return;

  const lenis = window.__lenis;

  let el: HTMLElement | null = null;
  if (typeof target === "string") {
    const id = target.replace(/^#/, "");
    el = document.getElementById(id);
  } else {
    el = target;
  }

  if (!el && typeof target === "string") {
    try {
      el = document.querySelector(target);
    } catch {
      // ignore
    }
  }

  if (lenis) {
    if (el) {
      lenis.scrollTo(el, {
        offset: options?.offset ?? -24,
        duration: options?.duration ?? 1.2,
        ...options,
      });
    } else if (typeof target === "string" && target.startsWith("#")) {
      lenis.scrollTo(target, {
        offset: options?.offset ?? -24,
        duration: options?.duration ?? 1.2,
        ...options,
      });
    }
  } else if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
