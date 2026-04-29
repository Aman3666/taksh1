import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BRAND } from "../data/content";

export default function LoadingScreen() {
  const [done, setDone] = useState(false);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 3000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (done) return;
    let val = 0;
    const id = setInterval(() => {
      val = Math.min(100, val + Math.random() * 12 + 5);
      setPercent(Math.floor(val));
      if (val >= 100) clearInterval(id);
    }, 110);
    return () => clearInterval(id);
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          data-testid="loading-screen"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -40,
            transition: { duration: 0.9, ease: [0.65, 0, 0.35, 1] },
          }}
          className="fixed inset-0 z-[9999] overflow-hidden bg-ink"
        >
          {/* Liquid gradient backdrop */}
          <div className="absolute inset-0 liquid-bg opacity-60" />

          {/* Center wipe line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
            className="absolute top-1/2 left-0 h-px w-full origin-left bg-gradient-to-r from-transparent via-gold to-transparent"
          />

          {/* Top eyebrow */}
          <div className="absolute top-10 left-0 right-0 flex justify-center">
            <motion.span
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="eyebrow text-gold-muted"
            >
              — Welcome —
            </motion.span>
          </div>

          {/* Center content */}
          <div className="relative z-10 h-full w-full flex flex-col items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.3, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <img
                src={BRAND.logo}
                alt="Taksh"
                className="brand-logo h-44 sm:h-56 lg:h-64 w-auto object-contain"
              />
              {/* Glow */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.6, 0.3] }}
                transition={{ delay: 0.6, duration: 1.6, ease: "easeInOut" }}
                className="absolute inset-0 -z-10 blur-3xl bg-gold/20 rounded-full"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="mt-8 eyebrow text-gold tracking-[0.5em]"
            >
              Pure · Crafted · Royal
            </motion.div>

            {/* Progress */}
            <div className="mt-12 w-64 sm:w-80">
              <div className="flex justify-between items-center text-[0.62rem] tracking-[0.3em] text-cream/40 uppercase mb-2">
                <span>Sambhajinagar</span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-gold tabular-nums"
                >
                  {String(percent).padStart(2, "0")}%
                </motion.span>
              </div>
              <div className="h-px w-full bg-white/10 relative overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute inset-y-0 left-0 bg-gold"
                />
              </div>
            </div>
          </div>

          {/* Bottom stamps */}
          <div className="absolute bottom-10 left-0 right-0 flex justify-between px-10 text-[0.6rem] tracking-[0.3em] text-cream/30 uppercase">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              Est. 2022
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              Vegetarian Fine Dining
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
