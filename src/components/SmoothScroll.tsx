"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    });

    // Synchronize Lenis scroll with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis updates using GSAP's ticker for 100% synchronized animation
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    lenisRef.current = lenis;
    window.__lenis = lenis;

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
      delete window.__lenis;
    };
  }, []);

  // Ensure hash navigation (e.g. /#events) scrolls smoothly into view
  // Works when navigating back from /events/[slug] or when landing on /#events directly
  useEffect(() => {
    const scrollToHash = () => {
      if (typeof window === "undefined") return;
      const hash = window.location.hash;
      if (!hash) return;

      const performScroll = () => {
        const target = document.querySelector(hash);
        if (target && lenisRef.current) {
          lenisRef.current.scrollTo(target as HTMLElement, { offset: -20, duration: 1 });
        }
      };

      // Slight timeout allows target DOM elements to be fully mounted
      const timer1 = setTimeout(performScroll, 120);
      const timer2 = setTimeout(performScroll, 350);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    };

    const cleanup = scrollToHash();
    window.addEventListener("hashchange", scrollToHash);

    return () => {
      cleanup?.();
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, [pathname]);

  return null;
}
