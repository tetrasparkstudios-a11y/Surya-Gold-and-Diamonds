import { useEffect, useRef, useCallback } from "react";

/**
 * LuxuryCursor — Dual-ring cinematic cursor
 *
 * Architecture:
 *   • Inner dot  (4px)  — lerp 0.22  → snappy tracking
 *   • Outer ring (30px) — lerp 0.14  → trailing elegance
 *   • Magnetic nudge    — pulls toward center of hovered element
 *   • mix-blend-mode: exclusion on inner dot for elegant inversion
 *   • Auto-disables on touch/stylus devices & prefers-reduced-motion
 */
export function LuxuryCursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    mouseX: -200, mouseY: -200,
    dotX:   -200, dotY:   -200,
    ringX:  -200, ringY:  -200,
    hovering: false,
    hoverType: null as "clickable" | "image" | null,
    inModal: false,
    magnetTarget: null as Element | null,
    raf: 0,
    visible: false,
  });

  // Memoise so we can add/remove the same fn reference
  const onMouseMove = useCallback((e: MouseEvent) => {
    const s = stateRef.current;
    s.mouseX = e.clientX;
    s.mouseY = e.clientY;

    if (!s.visible) {
      s.dotX  = e.clientX;
      s.dotY  = e.clientY;
      s.ringX = e.clientX;
      s.ringY = e.clientY;
      s.visible = true;
      dotRef.current && (dotRef.current.style.opacity  = "1");
      ringRef.current && (ringRef.current.style.opacity = "1");
    }

    // Hover detection — on every move, no polling lag
    const path = e.composedPath() as Element[];
    let isClickable = false;
    let isImage = false;
    let magTarget: Element | null = null;
    let inModal = false;

    for (const el of path) {
      if (!(el instanceof Element)) continue;
      
      // Auto-detect modals / dialogs to make cursor unobtrusive
      if (
        el.getAttribute("data-in-modal") === "true" ||
        el.classList.contains("in-modal") ||
        el.getAttribute("role") === "dialog" ||
        el.id === "modal-root" ||
        el.classList.contains("bg-background/80") // backdrop check
      ) {
        inModal = true;
      }
      
      const tag = el.tagName?.toLowerCase();
      if (
        tag === "a" || tag === "button" ||
        el.getAttribute("role") === "button" ||
        el.classList.contains("cursor-pointer") ||
        el.getAttribute("data-cursor") === "hover"
      ) {
        isClickable = true;
        magTarget = el;
      } else if (
        tag === "img" ||
        el.classList.contains("group") ||
        el.getAttribute("data-cursor") === "image"
      ) {
        isImage = true;
      }
    }

    s.hovering     = isClickable || isImage;
    s.hoverType    = isClickable ? "clickable" : (isImage ? "image" : null);
    s.magnetTarget = magTarget;
    s.inModal      = inModal;
  }, []);

  const onMouseLeave = useCallback(() => {
    const s = stateRef.current;
    s.visible = false;
    dotRef.current  && (dotRef.current.style.opacity  = "0");
    ringRef.current && (ringRef.current.style.opacity = "0");
  }, []);

  const onMouseEnter = useCallback(() => {
    const s = stateRef.current;
    s.visible = true;
    dotRef.current  && (dotRef.current.style.opacity  = "1");
    ringRef.current && (ringRef.current.style.opacity = "1");
  }, []);

  useEffect(() => {
    // Skip on touch / no-hover devices
    if (window.matchMedia("(hover: none)").matches) return;
    // Skip if user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const s = stateRef.current;

    const render = () => {
      let { mouseX, mouseY, dotX, dotY, ringX, ringY } = s;

      // Magnetic offset — gently nudge toward centre of hovered element
      let targetX = mouseX;
      let targetY = mouseY;
      if (s.hoverType === "clickable" && s.magnetTarget) {
        const rect = s.magnetTarget.getBoundingClientRect();
        const cx   = rect.left + rect.width  / 2;
        const cy   = rect.top  + rect.height / 2;
        const dx   = cx - mouseX;
        const dy   = cy - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        // Only pull if within 55px of element centre — subtle, not dominant
        if (dist < 55) {
          const strength = (1 - dist / 55) * 0.14;
          targetX = mouseX + dx * strength;
          targetY = mouseY + dy * strength;
        }
      }

      // Inner dot — fluid but still responsive (0.22 tracking)
      dotX  += (targetX - dotX)  * 0.22;
      dotY  += (targetY - dotY)  * 0.22;

      // Outer ring — luxurious trailing elegance (0.08 tracking for premium lag)
      ringX += (targetX - ringX) * 0.08;
      ringY += (targetY - ringY) * 0.08;

      s.dotX  = dotX;  s.dotY  = dotY;
      s.ringX = ringX; s.ringY = ringY;

      const hoverType = s.hoverType;
      const inModal  = s.inModal;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
        dotRef.current.classList.toggle("dot--hover-clickable", hoverType === "clickable");
        dotRef.current.classList.toggle("dot--hover-image", hoverType === "image");
        dotRef.current.classList.toggle("cursor--in-modal", inModal);
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
        ringRef.current.classList.toggle("ring--hover-clickable", hoverType === "clickable");
        ringRef.current.classList.toggle("ring--hover-image", hoverType === "image");
        ringRef.current.classList.toggle("cursor--in-modal", inModal);
      }
      s.raf = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove",  onMouseMove,  { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    s.raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove",  onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(s.raf);
    };
  }, [onMouseMove, onMouseLeave, onMouseEnter]);

  return (
    <>
      {/* Inner dot — follows fast, mix-blend exclusion */}
      <div ref={dotRef}  className="lux-cursor-dot"  aria-hidden="true" />
      {/* Outer ring — trails elegantly */}
      <div ref={ringRef} className="lux-cursor-ring" aria-hidden="true" />
    </>
  );
}
