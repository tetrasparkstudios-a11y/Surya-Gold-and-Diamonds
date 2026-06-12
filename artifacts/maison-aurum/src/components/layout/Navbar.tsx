import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoMark from "@assets/surya-s-monogram.png";

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          useSolid
            ? "bg-background/88 backdrop-blur-2xl py-4 border-b border-primary/6 shadow-[0_1px_12px_rgba(0,0,0,0.015)]"
            : "bg-transparent py-6 border-b border-transparent"
        }`}
      >
        <div className="container relative mx-auto px-5 md:px-8 flex items-center justify-between">

          {/* Brand mark — transparent logo + text */}
          <Link href="/" className="group flex items-center gap-2">
            <img
              src={logoMark}
              alt="Surya Gold & Diamonds"
              className={`h-[44px] md:h-[54px] w-auto object-contain shrink-0 transition-all duration-500 ${
                useSolid ? "" : "drop-shadow-[0_1px_8px_rgba(0,0,0,0.3)]"
              }`}
            />
            <span
              className={`font-serif text-[13px] md:text-[15.5px] tracking-[0.15em] md:tracking-[0.18em] uppercase transition-all duration-500 font-normal 
                absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mt-0
                md:static md:translate-x-0 md:translate-y-0 md:mt-[2px]
                ${
                useSolid
                  ? "text-foreground/90"
                  : "text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]"
              } group-hover:text-primary whitespace-nowrap`}
            >
              SURYA GOLD <span className="text-primary">&amp;</span> DIAMONDS
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-14 lg:gap-16">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`nav-underline text-[11.5px] tracking-[0.18em] uppercase font-normal transition-colors duration-[600ms] hover:text-primary hover:opacity-100 ${
                  useSolid
                    ? "text-foreground/60 opacity-100"
                    : "text-white/80 opacity-90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.2)]"
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
                : "text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]"
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
            <div className="flex items-center justify-between px-6 py-5 border-b border-border/30">
              <span className="font-serif text-[13px] tracking-[0.16em] uppercase flex items-center gap-2 font-normal mt-[2px]">
                <img
                  src={logoMark}
                  alt=""
                  className="h-[38px] w-auto object-contain"
                />
                SURYA GOLD <span className="text-primary">&amp;</span> DIAMONDS
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-foreground/50 hover:text-primary transition-colors duration-500"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 flex flex-col justify-center px-10 gap-9">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 + 0.1, ease: [0.16, 1, 0.3, 1], duration: 0.6 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-[2rem] tracking-[0.12em] text-foreground/80 hover:text-primary transition-colors duration-500 font-light"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            {/* Footer info */}
            <div className="px-10 py-8 border-t border-border/30">
              <p className="text-[10px] uppercase tracking-[0.25em] text-foreground/35 mb-3 font-light">
                Established 1985 · Hyderabad
              </p>
              <a
                href="tel:+917093335656"
                className="text-sm font-light text-foreground/60 hover:text-primary transition-colors duration-500"
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
