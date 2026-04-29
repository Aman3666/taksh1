import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    // Hard skip on touch / coarse pointer devices.
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(max-width: 1023px)").matches) return;

    const onMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf.current = requestAnimationFrame(animate);
    };

    const onOver = (e) => {
      const target = e.target;
      if (
        target.closest(
          "a, button, [role='button'], input, textarea, select, .interactive"
        )
      ) {
        ringRef.current?.classList.add("is-hover");
      }
    };
    const onOut = () => ringRef.current?.classList.remove("is-hover");

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring hidden lg:block" data-testid="cursor-ring" />
      <div ref={dotRef} className="cursor-dot hidden lg:block" data-testid="cursor-dot" />
    </>
  );
}
