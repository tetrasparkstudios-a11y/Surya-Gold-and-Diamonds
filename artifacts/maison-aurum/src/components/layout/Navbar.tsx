import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoMark from "@assets/Screenshot_2025-03-27-22-34-55-57_965bbf4d18d205f782c6b8409c57_1777329866046.jpg";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const isHome = location === "/" || location === "";
  const useSolid = isScrolled || !isHome;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Collections", href: "/#collections" },
    { name: "Atelier",     href: "/#atelier" },
    { name: "Lookbook",    href: "/#lookbook" },
    { name: "Contact",     href: "/#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          useSolid
            ? "bg-background/92 backdrop-blur-md py-3 shadow-[0_1px_0_rgba(0,0,0,0.06)]"
            : "bg-transparent py-7"
        }`}
      >
        <div className="container mx-auto px-5 md:px-8 flex items-center justify-between">

          {/* Brand mark */}
          <Link href="/" className="group flex items-center gap-3.5">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-background/95 shadow-sm ring-1 ring-primary/20 overflow-hidden shrink-0">
              <img
                src={logoMark}
                alt="Surya Gold & Diamonds"
                className="w-8 h-8 object-contain"
              />
            </span>
            <span
              className={`font-serif text-sm md:text-base lg:text-[17px] tracking-[0.22em] uppercase hidden sm:block transition-colors duration-500 ${
                useSolid
                  ? "text-foreground"
                  : "text-background drop-shadow-[0_1px_10px_rgba(0,0,0,0.5)]"
              } group-hover:text-primary`}
            >
              SURYA GOLD <span className="text-primary">&amp;</span> DIAMONDS
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-9 lg:gap-11">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`nav-underline text-[11px] tracking-[0.22em] uppercase transition-all duration-400 hover:text-primary hover:tracking-[0.26em] ${
                  useSolid
                    ? "text-foreground/75"
                    : "text-background/90 drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)]"
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden p-2 -mr-1 transition-colors ${
              useSolid
                ? "text-foreground"
                : "text-background drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)]"
            }`}
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* ── Mobile full-screen drawer ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] bg-background flex flex-col"
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-border/40">
              <span className="font-serif text-base tracking-[0.25em] uppercase flex items-center gap-3">
                <img
                  src={logoMark}
                  alt=""
                  className="w-8 h-8 object-contain mix-blend-multiply"
                />
                SURYA
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-foreground/60 hover:text-foreground transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 flex flex-col justify-center px-10 gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 + 0.1, ease: [0.16, 1, 0.3, 1], duration: 0.6 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-4xl tracking-[0.1em] text-foreground hover:text-primary transition-colors duration-400"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            {/* Footer info */}
            <div className="px-10 py-8 border-t border-border/40">
              <p className="text-[10px] uppercase tracking-widest text-foreground/40 mb-3">
                Established 1985 · Hyderabad
              </p>
              <a
                href="tel:+917093335656"
                className="text-sm font-light text-foreground/70 hover:text-primary transition-colors"
              >
                +91 70933 35656
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
