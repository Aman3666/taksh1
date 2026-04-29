import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          data-testid="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.65, 0, 0.35, 1] } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-ink"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
            className="absolute top-1/2 left-0 h-px w-full origin-left bg-gold/40"
          />
          <motion.div
            initial={{ opacity: 0, y: 16, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "0.5em" }}
            transition={{ delay: 0.3, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-cream text-5xl sm:text-6xl tracking-[0.35em] uppercase"
          >
            Taksh
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="mt-5 eyebrow text-gold-muted"
          >
            Crafted Veg Experience
          </motion.div>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 220 }}
            transition={{ delay: 1.4, duration: 0.7, ease: "easeInOut" }}
            className="mt-10 h-px bg-gold"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
