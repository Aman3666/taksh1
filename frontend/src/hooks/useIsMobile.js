import { useEffect, useState } from "react";

export default function useIsMobile(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches ||
      window.matchMedia("(pointer: coarse)").matches;
  });

  useEffect(() => {
    const m1 = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const m2 = window.matchMedia("(pointer: coarse)");
    const update = () => setIsMobile(m1.matches || m2.matches);
    m1.addEventListener("change", update);
    m2.addEventListener("change", update);
    return () => {
      m1.removeEventListener("change", update);
      m2.removeEventListener("change", update);
    };
  }, [breakpoint]);

  return isMobile;
}
