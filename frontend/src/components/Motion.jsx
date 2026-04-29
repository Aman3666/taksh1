import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import useIsMobile from "../hooks/useIsMobile";

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Reveal({ children, delay = 0, className = "", as = "div" }) {
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Comp>
  );
}

export function SplitWords({ text, className = "", delay = 0 }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-baseline mr-[0.25em]">
          <motion.span
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.85, delay: delay + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block"
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function ParallaxImage({ src, alt = "", className = "", strength = 80 }) {
  const isMobile = useIsMobile();
  if (isMobile) {
    // Plain image on mobile — skip useScroll() to save a scroll listener and 60fps recalcs.
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
      </div>
    );
  }
  return <ParallaxImageDesktop src={src} alt={alt} className={className} strength={strength} />;
}

function ParallaxImageDesktop({ src, alt, className, strength }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="w-full h-[120%] object-cover -translate-y-[10%]"
        loading="lazy"
      />
    </div>
  );
}

export function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
