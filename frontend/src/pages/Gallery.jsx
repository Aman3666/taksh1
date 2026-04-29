import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { GALLERY } from "../data/content";
import { PageTransition, Reveal, SplitWords } from "../components/Motion";

const TABS = ["All", "Food", "Interiors", "Events"];

export default function Gallery() {
  const [tab, setTab] = useState("All");
  const [open, setOpen] = useState(null);

  const items = useMemo(
    () => (tab === "All" ? GALLERY : GALLERY.filter((g) => g.category === tab)),
    [tab]
  );

  return (
    <PageTransition>
      <section className="pt-40 pb-12 px-6 lg:px-10 max-w-7xl mx-auto" data-testid="gallery-hero">
        <p className="eyebrow text-gold-muted">— Gallery</p>
        <h1 className="font-serif text-cream text-5xl sm:text-7xl lg:text-[8rem] leading-[0.95] mt-6">
          <SplitWords text="A house of" />
          <br />
          <span className="italic gold-text-gradient">
            <SplitWords text="quiet beauty." delay={0.12} />
          </span>
        </h1>
      </section>

      <section className="sticky top-20 z-30 glass py-5 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-wrap gap-3">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2.5 text-[0.7rem] tracking-[0.28em] uppercase border transition-all ${
                tab === t
                  ? "border-gold bg-gold text-ink"
                  : "border-white/10 text-cream/70 hover:border-gold/50 hover:text-gold"
              }`}
              data-testid={`gallery-tab-${t.toLowerCase()}`}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      <section className="px-4 lg:px-8 max-w-[1500px] mx-auto py-16">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 [&>*]:mb-4">
          {items.map((g, i) => (
            <motion.button
              key={`${g.src}-${i}`}
              onClick={() => setOpen(g)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: (i % 6) * 0.05 }}
              className="block w-full overflow-hidden break-inside-avoid border border-white/5 hover:border-gold/40 transition-all"
              data-testid={`gallery-item-${i}`}
            >
              <img
                src={g.src}
                alt={g.category}
                loading="lazy"
                className={`gallery-img w-full object-cover ${
                  g.h === "tall" ? "aspect-[3/4]" : "aspect-[4/3]"
                }`}
              />
            </motion.button>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink/95 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setOpen(null)}
            data-testid="gallery-lightbox"
          >
            <button
              className="absolute top-6 right-6 text-cream hover:text-gold p-3"
              onClick={() => setOpen(null)}
              aria-label="Close"
              data-testid="gallery-lightbox-close"
            >
              <X size={28} />
            </button>
            <motion.img
              key={open.src}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              src={open.src}
              alt=""
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
