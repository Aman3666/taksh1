import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IMAGES, STATS } from "../data/content";
import { Reveal, ParallaxImage, PageTransition, SplitWords } from "../components/Motion";

export default function Experience() {
  return (
    <PageTransition>
      <section className="pt-40 pb-16 px-6 lg:px-10 max-w-7xl mx-auto" data-testid="experience-hero">
        <p className="eyebrow text-gold-muted">— Ambience</p>
        <h1 className="font-serif text-cream text-5xl sm:text-7xl lg:text-[8rem] leading-[0.95] mt-6">
          <SplitWords text="A room that" />
          <br />
          <span className="italic gold-text-gradient">
            <SplitWords text="slows you down." delay={0.12} />
          </span>
        </h1>
      </section>

      {/* Editorial split */}
      <section className="grid lg:grid-cols-12 gap-10 px-6 lg:px-10 max-w-7xl mx-auto py-16">
        <div className="lg:col-span-7">
          <ParallaxImage src={IMAGES.interior1} alt="Main dining hall" className="aspect-[4/3]" strength={60} />
        </div>
        <div className="lg:col-span-5 flex flex-col justify-center">
          <Reveal>
            <p className="eyebrow text-gold-muted mb-3">01 — The Main Hall</p>
            <h2 className="font-serif text-4xl lg:text-5xl text-cream">
              Eighty four covers. Soft cream walls. A chandelier that took six
              months to commission.
            </h2>
            <p className="text-cream/65 mt-6 leading-relaxed">
              Hand-poured terrazzo flooring meets smoked oak booths and brass
              detailing. Our acoustic engineers tuned the room so a whisper at
              your table never travels to the next.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="grid lg:grid-cols-12 gap-10 px-6 lg:px-10 max-w-7xl mx-auto py-16">
        <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1">
          <Reveal>
            <p className="eyebrow text-gold-muted mb-3">02 — The Private Hall</p>
            <h2 className="font-serif text-4xl lg:text-5xl text-cream">
              Up to <span className="gold-text-gradient">120 guests</span>, lit
              by candlelight and crystal.
            </h2>
            <p className="text-cream/65 mt-6 leading-relaxed">
              Our heritage hall is designed for milestones — engagements,
              birthdays, anniversaries, board dinners. Custom AV, dedicated
              maître d', cake stations and a stage for live acoustic acts.
            </p>
            <Link to="/events" className="mt-8 link-luxury eyebrow inline-flex" data-testid="experience-events-link">
              Plan Your Event →
            </Link>
          </Reveal>
        </div>
        <div className="lg:col-span-7 order-1 lg:order-2">
          <ParallaxImage src={IMAGES.party} alt="Party hall" className="aspect-[4/3]" strength={60} />
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 lg:py-28 border-y border-white/10 liquid-bg" data-testid="experience-stats">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-2 lg:grid-cols-4 gap-12">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div>
                <div className="font-serif text-6xl lg:text-7xl gold-text-gradient">{s.value}</div>
                <div className="eyebrow mt-3 text-cream/60">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Bento ambience grid */}
      <section className="px-6 lg:px-10 max-w-7xl mx-auto py-24">
        <Reveal>
          <p className="eyebrow text-gold-muted">— Moments</p>
          <h2 className="font-serif text-cream text-5xl lg:text-6xl mt-4">
            Some rooms remember you.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-12">
          <motion.img
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            src={IMAGES.ambience1}
            alt=""
            className="lg:row-span-2 lg:col-span-2 w-full h-full aspect-[4/3] lg:aspect-auto object-cover"
          />
          <motion.img
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            src={IMAGES.ambience2}
            alt=""
            className="w-full aspect-[4/3] object-cover"
          />
          <motion.img
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            src={IMAGES.ambience3}
            alt=""
            className="w-full aspect-[4/3] object-cover"
          />
        </div>
      </section>
    </PageTransition>
  );
}
