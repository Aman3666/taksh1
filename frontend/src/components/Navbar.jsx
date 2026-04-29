import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "../data/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "glass" : "bg-transparent"
        }`}
        data-testid="main-navbar"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-2 lg:grid-cols-3 items-center h-20">
          <Link
            to="/"
            className="flex items-baseline group shrink-0"
            data-testid="navbar-logo-link"
          >
            <span className="font-serif text-2xl lg:text-3xl tracking-[0.18em] text-cream group-hover:text-gold transition-colors">
              TAKSH
            </span>
          </Link>

          <nav className="hidden lg:flex items-center justify-center gap-7">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `text-[0.72rem] uppercase tracking-[0.26em] transition-colors whitespace-nowrap ${
                    isActive
                      ? "text-gold"
                      : "text-cream/80 hover:text-gold"
                  }`
                }
                data-testid={`nav-link-${l.label.toLowerCase()}`}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3 justify-end">
            <Link
              to="/reservations"
              className="hidden sm:inline-flex btn-luxury"
              data-testid="navbar-reserve-cta"
            >
              Reserve
            </Link>
            <button
              className="lg:hidden text-cream p-2"
              onClick={() => setOpen((s) => !s)}
              data-testid="mobile-menu-toggle"
              aria-label="Open menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 z-40 glass pt-24 px-8 lg:hidden"
            data-testid="mobile-menu"
          >
            <nav className="flex flex-col gap-7 mt-6">
              {NAV_LINKS.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                >
                  <NavLink
                    to={l.to}
                    end={l.to === "/"}
                    className={({ isActive }) =>
                      `font-serif text-4xl tracking-tight ${
                        isActive ? "text-gold" : "text-cream"
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
              <Link
                to="/reservations"
                className="btn-luxury self-start mt-6"
                data-testid="mobile-reserve-cta"
              >
                Reserve a Table
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
