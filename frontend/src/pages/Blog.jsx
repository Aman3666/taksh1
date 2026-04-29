import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "../data/content";
import { PageTransition, Reveal, SplitWords } from "../components/Motion";

export default function Blog() {
  const [feature, ...rest] = BLOG_POSTS;
  return (
    <PageTransition>
      <section className="pt-40 pb-12 px-6 lg:px-10 max-w-7xl mx-auto" data-testid="blog-hero">
        <p className="eyebrow text-gold-muted">— Journal</p>
        <h1 className="font-serif text-cream text-5xl sm:text-7xl lg:text-[8rem] leading-[0.95] mt-6">
          <SplitWords text="Culinary" />
          <br />
          <span className="italic gold-text-gradient">
            <SplitWords text="stories." delay={0.12} />
          </span>
        </h1>
      </section>

      <section className="px-6 lg:px-10 max-w-7xl mx-auto py-12">
        <Reveal>
          <article className="grid lg:grid-cols-2 gap-10 items-center group">
            <div className="aspect-[5/4] overflow-hidden border border-white/5">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
            <div>
              <p className="eyebrow text-gold-muted">
                {feature.category} · {feature.date}
              </p>
              <h2 className="font-serif text-cream text-4xl lg:text-6xl mt-5 leading-tight">
                {feature.title}
              </h2>
              <p className="mt-6 text-cream/70 leading-relaxed text-lg">
                {feature.excerpt}
              </p>
              <button
                className="mt-8 inline-flex items-center gap-2 link-luxury eyebrow"
                data-testid="blog-feature-read"
              >
                Read Story <ArrowRight size={14} />
              </button>
            </div>
          </article>
        </Reveal>
      </section>

      <section className="px-6 lg:px-10 max-w-7xl mx-auto py-16">
        <div className="gold-line mb-16" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((p, i) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.85, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-ink-800 border border-white/5 hover:border-gold/40 transition-all"
              data-testid={`blog-card-${i}`}
            >
              <div className="aspect-[5/4] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="p-7">
                <p className="eyebrow text-gold-muted">
                  {p.category} · {p.date}
                </p>
                <h3 className="font-serif text-2xl text-cream mt-4 group-hover:text-gold transition-colors">
                  {p.title}
                </h3>
                <p className="mt-3 text-cream/60 text-sm leading-relaxed line-clamp-3">
                  {p.excerpt}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 eyebrow text-gold">
                  Read <ArrowRight size={14} />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
