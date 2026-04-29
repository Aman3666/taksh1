import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Phone, Mail, MapPin, Instagram, ArrowRight, Check } from "lucide-react";
import { BRAND } from "../data/content";
import { PageTransition, Reveal, SplitWords } from "../components/Motion";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.message) {
      setError("Please share your name, email and a short message.");
      return;
    }
    setBusy(true);
    try {
      await axios.post(`${API}/contact`, {
        ...form,
        subject: form.subject || null,
      });
      setSent(true);
    } catch {
      setError("Could not send. Please call us.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <PageTransition>
      <section className="pt-40 pb-12 px-6 lg:px-10 max-w-7xl mx-auto" data-testid="contact-hero">
        <p className="eyebrow text-gold-muted">— Contact</p>
        <h1 className="font-serif text-cream text-5xl sm:text-7xl lg:text-[7rem] leading-[0.95] mt-6">
          <SplitWords text="We'd love" />
          <br />
          <span className="italic gold-text-gradient">
            <SplitWords text="to hear from you." delay={0.12} />
          </span>
        </h1>
      </section>

      <section className="grid lg:grid-cols-12 gap-12 px-6 lg:px-10 max-w-7xl mx-auto py-12">
        <div className="lg:col-span-5 space-y-8">
          <Reveal>
            <ContactBlock icon={<MapPin size={18} />} title="Visit">
              {BRAND.address}
            </ContactBlock>
            <ContactBlock icon={<Phone size={18} />} title="Call">
              <a href={`tel:${BRAND.phoneRaw}`} className="link-luxury">
                {BRAND.phone}
              </a>
            </ContactBlock>
            <ContactBlock icon={<Mail size={18} />} title="Write">
              <a href={`mailto:${BRAND.email}`} className="link-luxury">
                {BRAND.email}
              </a>
            </ContactBlock>
            <ContactBlock icon={<Instagram size={18} />} title="Follow">
              <a href={BRAND.instagram} target="_blank" rel="noreferrer" className="link-luxury" data-testid="contact-instagram-link">
                {BRAND.instagramHandle}
              </a>
            </ContactBlock>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          {!sent ? (
            <motion.form
              onSubmit={submit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="glass p-8 lg:p-10 space-y-6"
              data-testid="contact-form"
            >
              <h2 className="font-serif text-cream text-3xl">Send us a message</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} testid="contact-name" />
                <Field label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} testid="contact-email" />
              </div>
              <Field
                label="Subject"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder="Reservations, events, press..."
                testid="contact-subject"
              />
              <div>
                <label className="eyebrow text-gold-muted block mb-3">Message</label>
                <textarea
                  className="luxury-input min-h-[140px] resize-none"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  data-testid="contact-message"
                />
              </div>
              {error && <p className="text-red-400 text-sm" data-testid="contact-error">{error}</p>}
              <button type="submit" disabled={busy} className="btn-luxury w-full" data-testid="contact-submit">
                {busy ? "Sending..." : "Send Message"} <ArrowRight size={14} />
              </button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="glass border-gold/40 p-12 lg:p-16 text-center"
              data-testid="contact-success"
            >
              <div className="w-16 h-16 rounded-full border border-gold mx-auto flex items-center justify-center">
                <Check size={28} className="text-gold" />
              </div>
              <h2 className="font-serif text-cream text-4xl mt-6">Message received.</h2>
              <p className="text-cream/70 mt-4 max-w-md mx-auto">
                Thank you, {form.name.split(" ")[0]}. We typically respond within
                24 hours.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Map */}
      <section className="px-6 lg:px-10 max-w-7xl mx-auto pb-24" data-testid="contact-map-section">
        <div className="glass border-gold/20 overflow-hidden">
          <iframe
            title="Taksh Location"
            src="https://www.google.com/maps?q=Goldi+Cinemark+Complex+Railway+Station+Road+Chhatrapati+Sambhajinagar&output=embed"
            className="w-full h-[420px] grayscale-[40%] contrast-110"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </PageTransition>
  );
}

function Field({ label, value, onChange, type = "text", placeholder, testid }) {
  return (
    <div>
      <label className="eyebrow text-gold-muted block mb-3">{label}</label>
      <input
        className="luxury-input"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        data-testid={testid}
      />
    </div>
  );
}

function ContactBlock({ icon, title, children }) {
  return (
    <div className="border-b border-white/10 pb-6">
      <div className="flex items-center gap-3 text-gold">
        {icon}
        <span className="eyebrow">{title}</span>
      </div>
      <div className="mt-3 text-cream/85">{children}</div>
    </div>
  );
}
