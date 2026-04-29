import { Link } from "react-router-dom";
import { Instagram, Phone, MapPin, Mail } from "lucide-react";
import { BRAND, NAV_LINKS } from "../data/content";

export default function Footer() {
  return (
    <footer
      className="relative border-t border-white/10 bg-ink-900 mt-32"
      data-testid="site-footer"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <img
              src={BRAND.logo}
              alt="Taksh — Crafted Veg Experience"
              className="brand-logo h-28 lg:h-32 w-auto object-contain -ml-3"
            />
            <p className="mt-6 text-cream/70 max-w-md leading-relaxed">
              A pure vegetarian fine dining destination — where heritage Indian
              flavours are reframed through patience, craft and an
              uncompromising sense of luxury.
            </p>
            <div className="mt-8 space-y-3 text-sm text-cream/70">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-gold mt-1" />
                <span>{BRAND.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-gold" />
                <a href={`tel:${BRAND.phoneRaw}`} className="link-luxury">
                  {BRAND.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-gold" />
                <a href={`mailto:${BRAND.email}`} className="link-luxury">
                  {BRAND.email}
                </a>
              </div>
            </div>
          </div>

          <div>
            <p className="eyebrow text-gold-muted">Explore</p>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.slice(0, 6).map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="link-luxury text-sm"
                    data-testid={`footer-link-${l.label.toLowerCase()}`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-gold-muted">Hours</p>
            <ul className="mt-5 space-y-3 text-sm text-cream/70">
              {BRAND.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span>{h.day}</span>
                  <span className="text-cream">{h.time}</span>
                </li>
              ))}
            </ul>
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-sm link-luxury"
              data-testid="footer-instagram-link"
            >
              <Instagram size={16} />
              Follow on Instagram
            </a>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3 items-center justify-between text-xs text-cream/40">
          <span>
            © {new Date().getFullYear()} Taksh — Crafted Veg Experience. All
            rights reserved.
          </span>
          <span className="eyebrow">Sambhajinagar · India</span>
        </div>
      </div>
    </footer>
  );
}
