import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Star, Phone } from "lucide-react";
import { IMAGES, MENU_ITEMS, STATS, BRAND } from "../data/content";
import { Reveal, SplitWords, ParallaxImage, PageTransition } from "../components/Motion";

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const featured = MENU_ITEMS.filter((m) => m.chef).slice(0, 4);
  const navigate = useNavigate();

  return (
    <PageTransition>
      {/* HERO */}
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
            transition={{ delay: 2.4, duration: 0.8 }}
            className="eyebrow text-gold-muted mb-6"
            data-testid="hero-eyebrow"
          >
            Pure Vegetarian · Sambhajinagar · Est. 2022
          </motion.div>

          <h1 className="font-serif text-cream text-5xl sm:text-7xl lg:text-[8.5rem] leading-[0.95] tracking-tight max-w-6xl">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              Crafting Luxury
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.75, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
              className="block italic font-light gold-text-gradient"
            >
              Vegetarian Experiences
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.4, duration: 1.0 }}
            className="mt-10 max-w-xl text-cream/70 text-base sm:text-lg leading-relaxed font-light"
          >
            A modern temple of pure-veg fine dining — slow craft, royal Indian
            heritage, and an unwavering devotion to flavour.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.6, duration: 0.8 }}
            className="mt-12 flex flex-col sm:flex-row items-center gap-5"
          >
            <Link to="/reservations" className="btn-luxury" data-testid="hero-reserve-cta">
              Reserve a Table <ArrowRight size={14} />
            </Link>
            <Link
              to="/menu"
              className="btn-luxury-outline"
              data-testid="hero-menu-cta"
            >
              Explore the Menu
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.8, duration: 0.8 }}
          className="absolute bottom-10 left-0 right-0 z-10 flex flex-col items-center gap-3"
        >
          <div className="h-12 w-px bg-gradient-to-b from-transparent to-gold animate-pulse" />
          <span className="eyebrow text-gold-muted">Scroll</span>
        </motion.div>
      </section>

      {/* PHILOSOPHY STRIP */}
      <section className="py-24 lg:py-32 px-6 lg:px-10 max-w-7xl mx-auto" data-testid="philosophy-section">
        <div className="grid lg:grid-cols-12 gap-16 items-end">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow text-gold-muted mb-6">— Our Philosophy</p>
            </Reveal>
            <h2 className="font-serif text-5xl lg:text-7xl text-cream leading-[1.05]">
              <SplitWords text="Pure veg." />
              <br />
              <span className="italic gold-text-gradient">
                <SplitWords text="Never compromised." delay={0.1} />
              </span>
            </h2>
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
              <Link
                to="/about"
                className="link-luxury mt-10 inline-flex items-center gap-2 eyebrow"
              >
                Read Our Story <ArrowRight size={14} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PARALLAX IMAGE BREAK */}
      <section className="relative h-[80vh] overflow-hidden">
        <ParallaxImage
          src={IMAGES.interior2}
          alt="Luxury restaurant interior"
          className="absolute inset-0"
          strength={120}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
        <div className="relative z-10 h-full flex items-end pb-24 px-6 lg:px-10 max-w-7xl mx-auto">
          <Reveal>
            <p className="eyebrow text-gold-muted">— The Room</p>
            <h3 className="font-serif text-cream text-4xl lg:text-6xl mt-4 max-w-3xl leading-[1.05]">
              Hand-poured terrazzo. Smoked oak. Hammered brass. Every surface
              is{" "}
              <span className="italic gold-text-gradient">a quiet ritual.</span>
            </h3>
          </Reveal>
        </div>
      </section>

      {/* SIGNATURE DISHES */}
      <section className="py-24 lg:py-32 px-6 lg:px-10 max-w-7xl mx-auto" data-testid="signatures-section">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <Reveal>
              <p className="eyebrow text-gold-muted mb-4">— Chef's Signatures</p>
              <h2 className="font-serif text-cream text-5xl lg:text-7xl">
                The unforgettable few.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <Link to="/menu" className="btn-luxury-outline" data-testid="signatures-view-menu">
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
              data-testid={`signature-card-${i}`}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={d.image}
                  alt={d.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="absolute top-4 left-4 glass px-3 py-1 text-[0.62rem] tracking-[0.28em] text-gold uppercase">
                Chef Pick
              </div>
              <div className="p-6">
                <h4 className="font-serif text-2xl text-cream group-hover:text-gold transition-colors">
                  {d.name}
                </h4>
                <p className="text-cream/55 text-sm mt-2 leading-relaxed line-clamp-2">
                  {d.desc}
                </p>
                <p className="text-gold mt-4 text-sm tracking-wider">₹ {d.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="py-24 lg:py-32 border-y border-white/10 liquid-bg" data-testid="stats-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-2 lg:grid-cols-4 gap-12">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div>
                <div className="font-serif text-6xl lg:text-7xl gold-text-gradient">
                  {s.value}
                </div>
                <div className="eyebrow mt-3 text-cream/60">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* RESERVATION CTA */}
      <section className="relative py-32 lg:py-44 overflow-hidden" data-testid="reserve-cta-section">
        <ParallaxImage
          src={IMAGES.table}
          alt="Set table"
          className="absolute inset-0"
          strength={100}
        />
        <div className="absolute inset-0 bg-ink/80" />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <Reveal>
            <p className="eyebrow text-gold-muted mb-6">— Reservations</p>
            <h2 className="font-serif text-cream text-5xl lg:text-7xl leading-[1.05]">
              The table is set.
              <br />
              <span className="italic gold-text-gradient">
                Yours awaits.
              </span>
            </h2>
            <p className="mt-8 text-cream/70 text-lg max-w-xl mx-auto">
              Reservations are recommended for weekends and private dining.
              Same-day confirmations are honoured wherever possible.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/reservations" className="btn-luxury" data-testid="cta-reserve-btn">
                Reserve Now <ArrowRight size={14} />
              </Link>
              <a
                href={`tel:${BRAND.phoneRaw}`}
                className="btn-luxury-outline"
                data-testid="cta-call-btn"
              >
                <Phone size={14} /> {BRAND.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIAL SHORT */}
      <section className="py-24 lg:py-32 px-6 lg:px-10 max-w-5xl mx-auto text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-1 text-gold mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} fill={i < 4 ? "#D4AF37" : "transparent"} stroke="#D4AF37" />
            ))}
          </div>
          <p className="font-serif text-3xl lg:text-5xl text-cream leading-tight italic">
            “Easily the most cinematic dining I've had this year. The saffron
            phirni alone is worth the journey.”
          </p>
          <p className="eyebrow text-gold-muted mt-8">
            Kabir Sinha — Travel Journalist
          </p>
          <Link
            to="/testimonials"
            className="mt-10 inline-flex eyebrow link-luxury"
            data-testid="home-testimonial-link"
          >
            Read more reviews
          </Link>
        </Reveal>
      </section>
    </PageTransition>
  );
}
