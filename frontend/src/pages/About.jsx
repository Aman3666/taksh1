import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TIMELINE, IMAGES } from "../data/content";
import { Reveal, ParallaxImage, PageTransition, SplitWords } from "../components/Motion";

export default function About() {
  return (
    <PageTransition>
      <section className="pt-40 pb-16 px-6 lg:px-10 max-w-7xl mx-auto" data-testid="about-hero">
        <p className="eyebrow text-gold-muted">— Our Story</p>
        <h1 className="font-serif text-cream text-5xl sm:text-7xl lg:text-[8rem] leading-[0.95] mt-6">
          <SplitWords text="A heritage of" />
          <br />
          <span className="italic gold-text-gradient">
            <SplitWords text="patience & craft." delay={0.12} />
          </span>
        </h1>
      </section>

      <section className="grid lg:grid-cols-2 gap-12 lg:gap-24 px-6 lg:px-10 max-w-7xl mx-auto py-16">
        <ParallaxImage src={IMAGES.chef} alt="Chef" className="aspect-[4/5]" strength={60} />
        <div className="flex flex-col justify-center">
          <Reveal>
            <p className="eyebrow text-gold-muted mb-4">— Philosophy</p>
            <h2 className="font-serif text-cream text-4xl lg:text-5xl leading-tight">
              We do one thing — vegetarian — and we do it{" "}
              <span className="italic gold-text-gradient">obsessively well.</span>
            </h2>
            <p className="mt-8 text-cream/70 leading-relaxed">
              Taksh was born from three generations of pure-veg heritage and a
              quiet refusal to accept that fine dining must come with meat. We
              source heirloom rice, wild morels, hand-stone ground masalas and
              ghee aged for sixty days. Every dish is plated, paced and
              presented like a chapter in a longer story.
            </p>
            <ul className="mt-8 space-y-3 text-cream/80">
              {[
                "Pure vegetarian. Ever. Always.",
                "No ajinomoto. No artificial colour.",
                "Slow craft, royal Indian roots.",
                "Sourced from twelve regions of India.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-2 h-px w-6 bg-gold inline-block" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-24 lg:py-32 px-6 lg:px-10 max-w-7xl mx-auto" data-testid="timeline-section">
        <Reveal>
          <p className="eyebrow text-gold-muted">— A Timeline</p>
          <h2 className="font-serif text-cream text-5xl lg:text-6xl mt-4 max-w-3xl">
            Twelve years to your first bite.
          </h2>
        </Reveal>

        <div className="mt-20 relative">
          <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-white/10" />
          <ul className="space-y-20">
            {TIMELINE.map((t, i) => (
              <motion.li
                key={t.year}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className={`relative grid lg:grid-cols-2 gap-8 lg:gap-16 pl-16 lg:pl-0 ${
                  i % 2 === 0 ? "" : "lg:[&>*:first-child]:order-2"
                }`}
                data-testid={`timeline-item-${i}`}
              >
                <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 top-2 w-3 h-3 rounded-full bg-gold shadow-[0_0_20px_rgba(212,175,55,0.6)]" />
                <div className={i % 2 === 0 ? "lg:text-right lg:pr-12" : "lg:pl-12"}>
                  <div className="font-serif text-7xl lg:text-8xl gold-text-gradient">
                    {t.year}
                  </div>
                </div>
                <div className={i % 2 === 0 ? "lg:pl-12" : "lg:text-right lg:pr-12"}>
                  <h3 className="font-serif text-3xl text-cream">{t.title}</h3>
                  <p className="mt-4 text-cream/65 leading-relaxed max-w-md inline-block">
                    {t.text}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-10 max-w-7xl mx-auto pb-24">
        <div className="glass border-gold/30 p-12 lg:p-20 text-center">
          <Reveal>
            <h3 className="font-serif text-cream text-4xl lg:text-5xl">
              Walk through our doors.
            </h3>
            <p className="mt-6 text-cream/70 max-w-xl mx-auto">
              The story is best told in person — over a 36-hour dal and a glass
              of smoked tulsi spritz.
            </p>
            <Link to="/reservations" className="mt-10 inline-flex btn-luxury" data-testid="about-reserve-cta">
              Reserve a Table
            </Link>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
