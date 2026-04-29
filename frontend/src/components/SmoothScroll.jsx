import { useEffect } from "react";
import Lenis from "lenis";
import useIsMobile from "../hooks/useIsMobile";

export default function SmoothScroll({ children }) {
  const isMobile = useIsMobile();

  useEffect(() => {
    // Skip Lenis on mobile / touch — native momentum scrolling is faster.
    if (isMobile) return;
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, [isMobile]);

  return children;
}
