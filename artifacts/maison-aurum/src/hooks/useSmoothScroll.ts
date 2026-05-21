import { useEffect } from "react";
import Lenis from "lenis";

/**
 * useSmoothScroll — Lenis-based Butter-Smooth Inertial Scroll
 *
 * Architecture:
 *   • Easing: Custom exponential decay for expensive, slow-inertia pacing.
 *   • Syncs automatically with framer-motion's useScroll hook via native window wheel redirection.
 *   • Disables on mobile/touch screens or reduced-motion options to maintain performance.
 */
export function useSmoothScroll() {
  useEffect(() => {
    // Skip on touch-only or prefers-reduced-motion
    if (window.matchMedia("(hover: none)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // slow, buttery luxury deceleration curve
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.02,
      touchMultiplier: 1.5,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Coordinate hash scroll animations (e.g. wouter / nav clicks)
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor && anchor.hash && anchor.origin === window.location.origin) {
        const targetId = decodeURIComponent(anchor.hash);
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          lenis.scrollTo(targetEl as HTMLElement, { offset: 0, duration: 1.6 });
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);

    // Global scroll helper so components can request smooth scrolls
    (window as any).lenisScrollTo = (target: string | HTMLElement, options?: any) => {
      lenis.scrollTo(target, options);
    };

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.removeEventListener("click", handleAnchorClick);
      delete (window as any).lenisScrollTo;
    };
  }, []);
}
