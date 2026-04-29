import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "../data/content";
import { PageTransition, Reveal, SplitWords } from "../components/Motion";

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const total = TESTIMONIALS.length;

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % total), 6500);
    return () => clearInterval(t);
  }, [total]);

  const next = () => setIdx((i) => (i + 1) % total);
  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const t = TESTIMONIALS[idx];

  return (
    <PageTransition>
      <section className="pt-40 pb-12 px-6 lg:px-10 max-w-7xl mx-auto" data-testid="testimonials-hero">
        <p className="eyebrow text-gold-muted">— Voices</p>
        <h1 className="font-serif text-cream text-5xl sm:text-7xl lg:text-[7.5rem] leading-[0.95] mt-6">
          <SplitWords text="Words from" />
          <br />
          <span className="italic gold-text-gradient">
            <SplitWords text="our table." delay={0.12} />
          </span>
        </h1>
      </section>

      <section className="px-6 lg:px-10 max-w-5xl mx-auto py-16">
        <div className="glass p-10 lg:p-16 relative min-h-[360px]" data-testid="testimonial-carousel">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-1 text-gold mb-8">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill={i < Math.round(t.rating) ? "#D4AF37" : "transparent"}
                    stroke="#D4AF37"
                  />
                ))}
              </div>
              <p className="font-serif text-cream text-2xl lg:text-4xl leading-snug italic">
                "{t.text}"
              </p>
              <footer className="mt-10">
                <p className="font-serif text-xl text-gold">{t.name}</p>
                <p className="eyebrow text-gold-muted mt-2">{t.role}</p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>

          <div className="absolute bottom-6 right-6 flex gap-2">
            <button
              onClick={prev}
              className="w-11 h-11 border border-white/15 hover:border-gold hover:text-gold text-cream/70 transition-all flex items-center justify-center"
              aria-label="Previous"
              data-testid="testimonials-prev"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="w-11 h-11 border border-white/15 hover:border-gold hover:text-gold text-cream/70 transition-all flex items-center justify-center"
              aria-label="Next"
              data-testid="testimonials-next"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="absolute bottom-9 left-10 flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <span
                key={i}
                className={`h-px transition-all ${
                  i === idx ? "w-10 bg-gold" : "w-5 bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>

        <Reveal>
          <div className="grid sm:grid-cols-3 gap-6 mt-16 text-center">
            <div>
              <div className="font-serif text-6xl gold-text-gradient">4.6</div>
              <div className="eyebrow text-cream/60 mt-2">Average Rating</div>
            </div>
            <div>
              <div className="font-serif text-6xl gold-text-gradient">2k+</div>
              <div className="eyebrow text-cream/60 mt-2">Reviews</div>
            </div>
            <div>
              <div className="font-serif text-6xl gold-text-gradient">96%</div>
              <div className="eyebrow text-cream/60 mt-2">Return Guests</div>
            </div>
          </div>
        </Reveal>
      </section>
    </PageTransition>
  );
}
