import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Check, ArrowRight, Phone } from "lucide-react";
import { IMAGES, BRAND } from "../data/content";
import { ParallaxImage, PageTransition, Reveal, SplitWords } from "../components/Motion";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const initial = {
  name: "",
  phone: "",
  email: "",
  date: "",
  time: "19:30",
  guests: 2,
  occasion: "",
  notes: "",
};

export default function Reservations() {
  const [form, setForm] = useState(initial);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.phone || !form.date || !form.time || !form.guests) {
      setError("Please fill in your name, phone, date, time and guests.");
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        guests: Number(form.guests),
        email: form.email || null,
        occasion: form.occasion || null,
        notes: form.notes || null,
      };
      await axios.post(`${API}/reservations`, payload);
      setSuccess(true);
    } catch (err) {
      setError(err?.response?.data?.detail?.[0]?.msg || "Something went wrong. Please call us.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <section className="pt-40 pb-10 px-6 lg:px-10 max-w-7xl mx-auto" data-testid="reservations-hero">
        <p className="eyebrow text-gold-muted">— Reservations</p>
        <h1 className="font-serif text-cream text-5xl sm:text-7xl lg:text-[7rem] leading-[0.95] mt-6">
          <SplitWords text="Your table," />
          <br />
          <span className="italic gold-text-gradient">
            <SplitWords text="set with intention." delay={0.12} />
          </span>
        </h1>
      </section>

      <section className="grid lg:grid-cols-2 gap-12 lg:gap-20 px-6 lg:px-10 max-w-7xl mx-auto pb-32">
        <div className="hidden lg:block sticky top-32 self-start">
          <ParallaxImage src={IMAGES.table} alt="Set table" className="aspect-[4/5]" strength={40} />
          <div className="glass mt-6 p-8">
            <p className="eyebrow text-gold-muted">Need anything?</p>
            <p className="text-cream/80 mt-3 leading-relaxed">
              Call us directly for same-day bookings, dietary requirements or
              private hall enquiries.
            </p>
            <a
              href={`tel:${BRAND.phoneRaw}`}
              className="mt-5 inline-flex items-center gap-2 text-gold link-luxury"
              data-testid="reserve-phone-link"
            >
              <Phone size={16} /> {BRAND.phone}
            </a>
          </div>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            {!success ? (
              <motion.form
                key="form"
                onSubmit={submit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6 }}
                className="glass p-8 lg:p-10 space-y-7"
                data-testid="reservation-form"
              >
                <Reveal>
                  <p className="eyebrow text-gold-muted">— Book a Table</p>
                  <h2 className="font-serif text-3xl lg:text-4xl text-cream mt-3">
                    A few details, and we'll have everything ready.
                  </h2>
                </Reveal>

                <div className="grid sm:grid-cols-2 gap-6">
                  <Field label="Name" value={form.name} onChange={update("name")} testid="res-name" />
                  <Field label="Phone" value={form.phone} onChange={update("phone")} testid="res-phone" />
                </div>

                <Field
                  label="Email (optional)"
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  testid="res-email"
                />

                <div className="grid sm:grid-cols-3 gap-6">
                  <Field
                    label="Date"
                    type="date"
                    value={form.date}
                    onChange={update("date")}
                    testid="res-date"
                  />
                  <Field
                    label="Time"
                    type="time"
                    value={form.time}
                    onChange={update("time")}
                    testid="res-time"
                  />
                  <Field
                    label="Guests"
                    type="number"
                    min="1"
                    max="30"
                    value={form.guests}
                    onChange={update("guests")}
                    testid="res-guests"
                  />
                </div>

                <Field
                  label="Occasion (optional)"
                  value={form.occasion}
                  onChange={update("occasion")}
                  placeholder="Birthday, Anniversary, Business..."
                  testid="res-occasion"
                />

                <div>
                  <label className="eyebrow text-gold-muted block mb-3">Notes</label>
                  <textarea
                    className="luxury-input min-h-[110px] resize-none"
                    value={form.notes}
                    onChange={update("notes")}
                    placeholder="Allergies, seating preference, surprises..."
                    data-testid="res-notes"
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-sm" data-testid="reservation-error">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-luxury w-full disabled:opacity-50"
                  data-testid="reservation-submit-btn"
                >
                  {submitting ? "Confirming..." : "Confirm Reservation"} <ArrowRight size={14} />
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="glass border-gold/40 p-12 lg:p-16 text-center"
                data-testid="reservation-success"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 rounded-full border border-gold mx-auto flex items-center justify-center"
                >
                  <Check size={32} className="text-gold" />
                </motion.div>
                <h2 className="font-serif text-cream text-4xl lg:text-5xl mt-8">
                  Reservation received.
                </h2>
                <p className="text-cream/70 mt-6 max-w-md mx-auto">
                  Thank you, {form.name.split(" ")[0]}. Our maître d' will call
                  you on <span className="text-gold">{form.phone}</span> shortly
                  to confirm your table for {form.guests} on {form.date} at {form.time}.
                </p>
                <button
                  className="btn-luxury-outline mt-10"
                  onClick={() => {
                    setForm(initial);
                    setSuccess(false);
                  }}
                  data-testid="reservation-new-btn"
                >
                  Make Another
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </PageTransition>
  );
}

function Field({ label, value, onChange, type = "text", placeholder, testid, ...rest }) {
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
        {...rest}
      />
    </div>
  );
}
