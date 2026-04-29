import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import { ArrowRight, Star, Phone, Sparkles, MapPin, Mail, Instagram, ChevronLeft, ChevronRight } from "lucide-react";
import {
  IMAGES,
  MENU_ITEMS,
  MENU_CATEGORIES,
  STATS,
  BRAND,
  TIMELINE,
  EVENTS,
  TESTIMONIALS,
  BLOG_POSTS,
} from "../data/content";
import { Reveal, ParallaxImage, PageTransition } from "../components/Motion";

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <Philosophy />
      <ParallaxBreak />
      <SignaturesSection />
      <StatsBar />
      <MenuPreview />
      <AmbienceSection />
      <TimelinePreview />
      <GalleryPreview />
      <EventsPreview />
      <TestimonialCarousel />
      <ReserveCTA />
      <BlogPreview />
      <ContactStrip />
    </PageTransition>
  );
}

/* ============= HERO ============= */
function Hero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);

  return (
    <section
      ref={heroRef}
      className="relative h-[100svh] w-full overflow-hidden"
      data-testid="hero-section"
    >
      <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
        <img
          src={IMAGES.hero}
          alt="Liquid gold and emerald background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/40 to-ink" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_50%,transparent_0%,rgba(5,5,5,0.6)_100%)]" />
      </motion.div>

      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 0.8 }}
          className="eyebrow text-gold-muted mb-6"
        >
          Pure Vegetarian · Sambhajinagar · Est. 2022
        </motion.div>

        <h1 className="font-serif text-cream text-5xl sm:text-7xl lg:text-[8.5rem] leading-[0.95] tracking-tight max-w-6xl">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.4, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            Crafting Luxury
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.65, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="block italic font-light gold-text-gradient"
          >
            Vegetarian Experiences
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.0, duration: 0.9 }}
          className="mt-10 max-w-xl text-cream/70 text-base sm:text-lg leading-relaxed font-light"
        >
          A modern temple of pure-veg fine dining — slow craft, royal Indian
          heritage, and an unwavering devotion to flavour.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.2, duration: 0.8 }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-5"
        >
          <Link to="/reservations" className="btn-luxury" data-testid="hero-reserve-cta">
            Reserve a Table <ArrowRight size={14} />
          </Link>
          <Link to="/menu" className="btn-luxury-outline" data-testid="hero-menu-cta">
            Explore the Menu
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.5, duration: 0.8 }}
        className="absolute bottom-10 left-0 right-0 z-10 flex flex-col items-center gap-3"
      >
        <div className="h-12 w-px bg-gradient-to-b from-transparent to-gold animate-pulse" />
        <span className="eyebrow text-gold-muted">Scroll</span>
      </motion.div>
    </section>
  );
}

/* ============= PHILOSOPHY ============= */
function Philosophy() {
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-10 max-w-7xl mx-auto" data-testid="philosophy-section">
      <div className="grid lg:grid-cols-12 gap-16 items-end">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow text-gold-muted mb-6">— Our Philosophy</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-serif text-5xl lg:text-7xl text-cream leading-[1.05]">
              Pure veg.
              <br />
              <span className="italic gold-text-gradient">Never compromised.</span>
            </h2>
          </Reveal>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal delay={0.15}>
            <p className="text-cream/75 text-lg leading-relaxed">
              Taksh is built on a simple, uncompromising belief — that pure
              vegetarian cuisine deserves the same theatre, slowness and
              imagination as the world's most celebrated tables. No
              ajinomoto. No artificial colour. No shortcuts.
            </p>
            <p className="text-cream/55 text-base leading-relaxed mt-6">
              Heirloom rice from Karnataka, wild Himalayan morels, hand-stone
              ground masalas, ghee aged sixty days — we sourced for two
              years before we ever opened our doors.
            </p>
            <Link to="/about" className="link-luxury mt-10 inline-flex items-center gap-2 eyebrow">
              Read Our Story <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============= PARALLAX BREAK ============= */
function ParallaxBreak() {
  return (
    <section className="relative h-[80vh] overflow-hidden">
      <ParallaxImage src={IMAGES.interior2} alt="Luxury restaurant interior" className="absolute inset-0" strength={120} />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
      <div className="relative z-10 h-full flex items-end pb-24 px-6 lg:px-10 max-w-7xl mx-auto">
        <Reveal>
          <p className="eyebrow text-gold-muted">— The Room</p>
          <h3 className="font-serif text-cream text-4xl lg:text-6xl mt-4 max-w-3xl leading-[1.05]">
            Hand-poured terrazzo. Smoked oak. Hammered brass. Every surface
            is <span className="italic gold-text-gradient">a quiet ritual.</span>
          </h3>
        </Reveal>
      </div>
    </section>
  );
}

/* ============= SIGNATURES ============= */
function SignaturesSection() {
  const featured = MENU_ITEMS.filter((m) => m.chef).slice(0, 4);
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-10 max-w-7xl mx-auto" data-testid="signatures-section">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
        <div>
          <Reveal>
            <p className="eyebrow text-gold-muted mb-4">— Chef's Signatures</p>
            <h2 className="font-serif text-cream text-5xl lg:text-7xl">The unforgettable few.</h2>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <Link to="/menu" className="btn-luxury-outline">
            View Full Menu <ArrowRight size={14} />
          </Link>
        </Reveal>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featured.map((d, i) => (
          <motion.div
            key={d.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8 }}
            className="group relative bg-ink-800 border border-white/5 hover:border-gold/30 transition-colors"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img src={d.image} alt={d.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
            </div>
            <div className="absolute top-4 left-4 glass px-3 py-1 text-[0.62rem] tracking-[0.28em] text-gold uppercase">
              Chef Pick
            </div>
            <div className="p-6">
              <h4 className="font-serif text-2xl text-cream group-hover:text-gold transition-colors">
                {d.name}
              </h4>
              <p className="text-cream/55 text-sm mt-2 leading-relaxed line-clamp-2">{d.desc}</p>
              <p className="text-gold mt-4 text-sm tracking-wider">₹ {d.price}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ============= STATS ============= */
function StatsBar() {
  return (
    <section className="py-24 lg:py-32 border-y border-white/10 liquid-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-2 lg:grid-cols-4 gap-12">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1}>
            <div>
              <div className="font-serif text-6xl lg:text-7xl gold-text-gradient">{s.value}</div>
              <div className="eyebrow mt-3 text-cream/60">{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============= MENU PREVIEW (categories) ============= */
function MenuPreview() {
  const previewByCat = useMemo(() => {
    const map = {};
    for (const c of MENU_CATEGORIES.filter((x) => x.id !== "all")) {
      map[c.id] = MENU_ITEMS.find((m) => m.category === c.id);
    }
    return map;
  }, []);
  const cats = MENU_CATEGORIES.filter((c) => c.id !== "all");

  return (
    <section className="py-24 lg:py-32 px-6 lg:px-10 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
        <div>
          <Reveal>
            <p className="eyebrow text-gold-muted mb-4">— A Glimpse Of The Menu</p>
            <h2 className="font-serif text-cream text-5xl lg:text-7xl">Five chapters,<br /><span className="italic gold-text-gradient">one journey.</span></h2>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <Link to="/menu" className="btn-luxury">Read The Full Menu <ArrowRight size={14} /></Link>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {cats.map((c, i) => {
          const item = previewByCat[c.id];
          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.08 }}
              className="group relative overflow-hidden border border-white/5 hover:border-gold/40 transition-all"
            >
              <Link to="/menu" className="block">
                <div className="aspect-[3/4] overflow-hidden">
                  <img src={item?.image} alt={c.label} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" loading="lazy" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <p className="eyebrow text-gold-muted">0{i + 1}</p>
                  <h3 className="font-serif text-3xl text-cream mt-2 group-hover:text-gold transition-colors">
                    {c.label}
                  </h3>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* ============= AMBIENCE ============= */
function AmbienceSection() {
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-10 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow text-gold-muted">— The Ambience</p>
            <h2 className="font-serif text-cream text-5xl lg:text-6xl mt-4 leading-[1.05]">
              A room <br />that <span className="italic gold-text-gradient">slows you down.</span>
            </h2>
            <p className="mt-6 text-cream/65 leading-relaxed">
              Eighty-four covers. A heritage hall for a hundred-and-twenty.
              Brass accents, smoked oak, and acoustics tuned so a whisper at
              your table never travels.
            </p>
            <Link to="/experience" className="link-luxury eyebrow mt-8 inline-flex items-center gap-2">
              Explore The Space <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>
        <div className="lg:col-span-7 grid grid-cols-2 gap-3">
          <ParallaxImage src={IMAGES.interior1} alt="Interior" className="aspect-[3/4]" strength={40} />
          <div className="grid grid-rows-2 gap-3">
            <ParallaxImage src={IMAGES.ambience2} alt="Bar" className="aspect-[4/3]" strength={30} />
            <ParallaxImage src={IMAGES.party} alt="Hall" className="aspect-[4/3]" strength={30} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============= TIMELINE PREVIEW ============= */
function TimelinePreview() {
  const items = TIMELINE.slice(0, 4);
  return (
    <section className="py-24 lg:py-32 border-y border-white/10 bg-ink-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <Reveal>
              <p className="eyebrow text-gold-muted mb-4">— Our Journey</p>
              <h2 className="font-serif text-cream text-5xl lg:text-6xl">
                Twelve years <br /><span className="italic gold-text-gradient">to your first bite.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <Link to="/about" className="btn-luxury-outline">Read The Full Story <ArrowRight size={14} /></Link>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((t, i) => (
            <motion.div
              key={t.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: i * 0.1 }}
              className="border border-white/10 hover:border-gold/40 p-7 bg-ink-800 transition-colors"
            >
              <div className="font-serif text-5xl gold-text-gradient">{t.year}</div>
              <h3 className="mt-5 font-serif text-2xl text-cream">{t.title}</h3>
              <p className="mt-3 text-cream/55 text-sm leading-relaxed">{t.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============= GALLERY PREVIEW ============= */
function GalleryPreview() {
  const tiles = [
    IMAGES.paneerTikka,
    IMAGES.interior1,
    IMAGES.dessertKheer,
    IMAGES.paneerCurry,
    IMAGES.party,
    IMAGES.ambience2,
  ];
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-10 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div>
          <Reveal>
            <p className="eyebrow text-gold-muted mb-4">— Gallery</p>
            <h2 className="font-serif text-cream text-5xl lg:text-7xl">
              Frames <br /><span className="italic gold-text-gradient">from the room.</span>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <Link to="/gallery" className="btn-luxury-outline">Open The Gallery <ArrowRight size={14} /></Link>
        </Reveal>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {tiles.map((src, i) => (
          <motion.div
            key={src + i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.06 }}
            className={`overflow-hidden border border-white/5 ${
              i === 0 || i === 3 ? "lg:row-span-2 aspect-[3/5]" : "aspect-[4/3]"
            }`}
          >
            <img src={src} alt="" className="gallery-img w-full h-full object-cover" loading="lazy" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ============= EVENTS PREVIEW ============= */
function EventsPreview() {
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-10 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div>
          <Reveal>
            <p className="eyebrow text-gold-muted mb-4">— Private Dining & Events</p>
            <h2 className="font-serif text-cream text-5xl lg:text-7xl">
              Celebrations <br /><span className="italic gold-text-gradient">worth remembering.</span>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <Link to="/events" className="btn-luxury-outline">All Packages <ArrowRight size={14} /></Link>
        </Reveal>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        {EVENTS.slice(0, 4).map((e, i) => (
          <motion.div
            key={e.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: i * 0.08 }}
            className="group relative overflow-hidden border border-white/5 hover:border-gold/40 transition-all"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img src={e.image} alt={e.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
            </div>
            <div className="absolute inset-0 p-7 flex flex-col justify-end">
              <p className="eyebrow text-gold">{e.starts}</p>
              <h3 className="font-serif text-3xl text-cream mt-2 group-hover:text-gold transition-colors">
                {e.title}
              </h3>
              <p className="mt-2 text-cream/65 text-sm max-w-md">{e.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ============= TESTIMONIAL CAROUSEL ============= */
function TestimonialCarousel() {
  const [idx, setIdx] = useState(0);
  const total = TESTIMONIALS.length;

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % total), 7500);
    return () => clearInterval(t);
  }, [total]);

  const t = TESTIMONIALS[idx];
  return (
    <section className="py-24 lg:py-32 border-y border-white/10 bg-ink-900">
      <div className="max-w-5xl mx-auto px-6 lg:px-10 text-center">
        <Reveal>
          <p className="eyebrow text-gold-muted mb-6">— Voices From Our Table</p>
        </Reveal>
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-center gap-1 text-gold mb-8">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < Math.round(t.rating) ? "#D4AF37" : "transparent"}
                  stroke="#D4AF37"
                />
              ))}
            </div>
            <p className="font-serif text-cream text-2xl lg:text-4xl leading-snug italic">
              "{t.text}"
            </p>
            <p className="mt-8 font-serif text-xl text-gold">{t.name}</p>
            <p className="eyebrow text-gold-muted mt-2">{t.role}</p>
          </motion.blockquote>
        </AnimatePresence>

        <div className="mt-12 flex items-center justify-center gap-4">
          <button
            onClick={() => setIdx((i) => (i - 1 + total) % total)}
            className="w-11 h-11 border border-white/15 hover:border-gold hover:text-gold text-cream/70 transition-all flex items-center justify-center"
            data-testid="home-testimonials-prev"
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`h-px transition-all ${i === idx ? "w-10 bg-gold" : "w-5 bg-white/20"}`}
              />
            ))}
          </div>
          <button
            onClick={() => setIdx((i) => (i + 1) % total)}
            className="w-11 h-11 border border-white/15 hover:border-gold hover:text-gold text-cream/70 transition-all flex items-center justify-center"
            data-testid="home-testimonials-next"
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>
        </div>
        <Link to="/testimonials" className="mt-10 inline-flex eyebrow link-luxury">
          Read All Reviews
        </Link>
      </div>
    </section>
  );
}

/* ============= RESERVATION CTA ============= */
function ReserveCTA() {
  return (
    <section className="relative py-32 lg:py-44 overflow-hidden" data-testid="reserve-cta-section">
      <ParallaxImage src={IMAGES.table} alt="Set table" className="absolute inset-0" strength={100} />
      <div className="absolute inset-0 bg-ink/80" />
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        <Reveal>
          <p className="eyebrow text-gold-muted mb-6">— Reservations</p>
          <h2 className="font-serif text-cream text-5xl lg:text-7xl leading-[1.05]">
            The table is set.<br /><span className="italic gold-text-gradient">Yours awaits.</span>
          </h2>
          <p className="mt-8 text-cream/70 text-lg max-w-xl mx-auto">
            Reservations are recommended for weekends and private dining.
            Same-day confirmations are honoured wherever possible.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/reservations" className="btn-luxury">
              Reserve Now <ArrowRight size={14} />
            </Link>
            <a href={`tel:${BRAND.phoneRaw}`} className="btn-luxury-outline">
              <Phone size={14} /> {BRAND.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============= BLOG PREVIEW ============= */
function BlogPreview() {
  const posts = BLOG_POSTS.slice(0, 3);
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-10 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div>
          <Reveal>
            <p className="eyebrow text-gold-muted mb-4">— The Journal</p>
            <h2 className="font-serif text-cream text-5xl lg:text-7xl">
              Culinary <br /><span className="italic gold-text-gradient">stories.</span>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <Link to="/blog" className="btn-luxury-outline">Read The Journal <ArrowRight size={14} /></Link>
        </Reveal>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((p, i) => (
          <motion.article
            key={p.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: i * 0.08 }}
            className="group bg-ink-800 border border-white/5 hover:border-gold/40 transition-all"
          >
            <div className="aspect-[5/4] overflow-hidden">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" loading="lazy" />
            </div>
            <div className="p-6">
              <p className="eyebrow text-gold-muted">{p.category} · {p.date}</p>
              <h3 className="font-serif text-2xl text-cream mt-3 group-hover:text-gold transition-colors">{p.title}</h3>
              <p className="mt-3 text-cream/55 text-sm leading-relaxed line-clamp-2">{p.excerpt}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

/* ============= CONTACT STRIP ============= */
function ContactStrip() {
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-10 max-w-7xl mx-auto">
      <Reveal>
        <div className="glass border-gold/20 p-10 lg:p-16 grid lg:grid-cols-3 gap-10 lg:gap-16">
          <div className="lg:col-span-1">
            <p className="eyebrow text-gold-muted">— Visit Us</p>
            <h3 className="font-serif text-cream text-3xl lg:text-4xl mt-4 leading-tight">
              We'd love to <span className="italic gold-text-gradient">host you.</span>
            </h3>
          </div>
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-8">
            <Block icon={<MapPin size={16} />} title="Address">
              {BRAND.address}
            </Block>
            <Block icon={<Phone size={16} />} title="Reservations">
              <a href={`tel:${BRAND.phoneRaw}`} className="link-luxury">
                {BRAND.phone}
              </a>
            </Block>
            <Block icon={<Mail size={16} />} title="Write">
              <a href={`mailto:${BRAND.email}`} className="link-luxury">
                {BRAND.email}
              </a>
            </Block>
            <Block icon={<Instagram size={16} />} title="Follow">
              <a href={BRAND.instagram} target="_blank" rel="noreferrer" className="link-luxury">
                {BRAND.instagramHandle}
              </a>
            </Block>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Block({ icon, title, children }) {
  return (
    <div className="border-l border-gold/30 pl-5">
      <div className="flex items-center gap-2 text-gold">
        {icon}
        <span className="eyebrow">{title}</span>
      </div>
      <div className="mt-3 text-cream/85">{children}</div>
    </div>
  );
}
