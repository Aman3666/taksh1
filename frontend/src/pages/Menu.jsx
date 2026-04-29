import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MENU_CATEGORIES, MENU_ITEMS } from "../data/content";
import { PageTransition, Reveal, SplitWords } from "../components/Motion";
import { Sparkles } from "lucide-react";

function TiltCard({ item, idx }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 10, y: y * -10 });
  };

  return (
    <motion.article
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: idx * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-ink-800 border border-white/5 hover:border-gold/40 transition-all duration-500 will-change-transform"
      data-testid={`menu-item-${idx}`}
    >
      <div className="aspect-[5/4] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      {item.chef && (
        <div className="absolute top-4 left-4 glass border-gold/40 px-3 py-1.5 text-[0.62rem] tracking-[0.28em] text-gold uppercase flex items-center gap-1.5">
          <Sparkles size={12} /> Chef Pick
        </div>
      )}
      <div className="p-6 lg:p-7">
        <div className="flex items-start justify-between gap-6">
          <h3 className="font-serif text-2xl lg:text-3xl text-cream group-hover:text-gold transition-colors">
            {item.name}
          </h3>
          <span className="font-mono text-gold text-sm tracking-wide whitespace-nowrap mt-2">
            ₹ {item.price}
          </span>
        </div>
        <p className="mt-4 text-cream/55 text-sm leading-relaxed">{item.desc}</p>
      </div>
    </motion.article>
  );
}

export default function Menu() {
  const [active, setActive] = useState("all");

  const items = useMemo(() => {
    if (active === "all") return MENU_ITEMS;
    return MENU_ITEMS.filter((m) => m.category === active);
  }, [active]);

  return (
    <PageTransition>
      <section className="pt-40 pb-12 px-6 lg:px-10 max-w-7xl mx-auto" data-testid="menu-hero">
        <p className="eyebrow text-gold-muted">— The Menu</p>
        <h1 className="font-serif text-cream text-5xl sm:text-7xl lg:text-[8rem] leading-[0.95] mt-6">
          <SplitWords text="A craft" />
          <br />
          <span className="italic gold-text-gradient">
            <SplitWords text="of slow seasons." delay={0.12} />
          </span>
        </h1>
        <p className="mt-8 text-cream/65 max-w-xl">
          Our menu is rewritten with the seasons. Pure vegetarian. Hand-stone
          ground masalas. Heirloom grains and forgotten regional gems —
          plated with the patience they deserve.
        </p>
      </section>

      {/* Filter chips */}
      <section className="sticky top-20 z-30 glass py-5 border-y border-white/10" data-testid="menu-filters">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-wrap gap-3">
          {MENU_CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`px-5 py-2.5 text-[0.7rem] tracking-[0.28em] uppercase border transition-all ${
                active === c.id
                  ? "border-gold bg-gold text-ink"
                  : "border-white/10 text-cream/70 hover:border-gold/50 hover:text-gold"
              }`}
              data-testid={`menu-filter-${c.id}`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </section>

      <section className="px-6 lg:px-10 max-w-7xl mx-auto py-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            data-testid="menu-grid"
          >
            {items.map((it, i) => (
              <TiltCard key={`${active}-${it.name}`} item={it} idx={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {items.length === 0 && (
          <p className="text-center text-cream/50 py-20">No dishes in this category.</p>
        )}
      </section>

      <section className="px-6 lg:px-10 max-w-7xl mx-auto pb-24">
        <Reveal>
          <div className="glass border-gold/20 p-8 lg:p-12 text-center">
            <p className="eyebrow text-gold-muted">— A Note From The Kitchen</p>
            <p className="font-serif text-2xl lg:text-3xl text-cream mt-4 italic max-w-3xl mx-auto leading-snug">
              "We don't have a favourite dish. We have a favourite guest — the
              one who slows down enough to taste every layer."
            </p>
            <p className="eyebrow text-gold-muted mt-6">— Chef de Cuisine</p>
          </div>
        </Reveal>
      </section>
    </PageTransition>
  );
}
