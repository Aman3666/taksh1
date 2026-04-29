import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { EVENTS } from "../data/content";
import { PageTransition, Reveal, SplitWords } from "../components/Motion";

export default function Events() {
  return (
    <PageTransition>
      <section className="pt-40 pb-12 px-6 lg:px-10 max-w-7xl mx-auto" data-testid="events-hero">
        <p className="eyebrow text-gold-muted">— Events & Private Dining</p>
        <h1 className="font-serif text-cream text-5xl sm:text-7xl lg:text-[7.5rem] leading-[0.95] mt-6">
          <SplitWords text="Celebrations" />
          <br />
          <span className="italic gold-text-gradient">
            <SplitWords text="worth remembering." delay={0.12} />
          </span>
        </h1>
        <p className="mt-8 text-cream/65 max-w-2xl">
          Our private hall accommodates up to 120 guests with custom menus,
          floral curation, AV systems and a dedicated maître d'. Every event
          is led by a single point of contact — from invitations to plated
          dessert.
        </p>
      </section>

      <section className="px-6 lg:px-10 max-w-7xl mx-auto py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {EVENTS.map((e, i) => (
            <motion.div
              key={e.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden border border-white/5 hover:border-gold/40 transition-all"
              data-testid={`event-card-${i}`}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={e.image}
                  alt={e.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <div className="absolute top-4 right-4 glass border-gold/30 px-3 py-1.5 text-[0.62rem] tracking-[0.28em] text-gold uppercase">
                  Starts {e.starts}
                </div>
              </div>
              <div className="p-8 bg-ink-800">
                <h3 className="font-serif text-3xl text-cream group-hover:text-gold transition-colors">
                  {e.title}
                </h3>
                <p className="mt-4 text-cream/65 leading-relaxed">{e.desc}</p>
                <Link
                  to="/contact"
                  className="mt-6 inline-flex items-center gap-2 eyebrow link-luxury"
                  data-testid={`event-card-cta-${i}`}
                >
                  Plan Your Event <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 lg:px-10 max-w-5xl mx-auto pb-24 text-center">
        <Reveal>
          <p className="eyebrow text-gold-muted">— Bespoke Curation</p>
          <h2 className="font-serif text-cream text-4xl lg:text-5xl mt-4">
            Tell us your story. <br />
            <span className="italic gold-text-gradient">
              We'll plate the rest.
            </span>
          </h2>
          <Link to="/contact" className="btn-luxury mt-10 inline-flex" data-testid="events-contact-cta">
            Contact Our Events Team <ArrowRight size={14} />
          </Link>
        </Reveal>
      </section>
    </PageTransition>
  );
}
