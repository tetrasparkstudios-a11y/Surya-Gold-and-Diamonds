import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoMark from "@assets/Screenshot_2025-03-27-22-34-55-57_965bbf4d18d205f782c6b8409c57_1777329866046.jpg";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  // The transparent-over-hero look only applies on the home page (which has the
  // dark cinematic hero). On any other route, render the navbar in its solid
  // light state so contrast is preserved.
  const isHome = location === "/" || location === "";
  const useSolid = isScrolled || !isHome;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Collections", href: "/#collections" },
    { name: "Atelier", href: "/#atelier" },
    { name: "Lookbook", href: "/#lookbook" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          useSolid
            ? "bg-background/90 backdrop-blur-md py-4 shadow-sm"
            : "bg-transparent py-8"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="group flex items-center space-x-4">
            <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-background/95 shadow-sm ring-1 ring-primary/20 overflow-hidden">
              <img src={logoMark} alt="Surya Gold & Diamonds" className="w-9 h-9 object-contain" />
            </span>
            <span
              className={`font-serif text-base md:text-lg lg:text-xl tracking-[0.25em] uppercase hidden sm:block transition-colors duration-500 ${
                useSolid ? "text-foreground" : "text-background drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)]"
              } group-hover:text-primary`}
            >
              SURYA GOLD <span className="text-primary">&amp;</span> DIAMONDS
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-10 lg:space-x-12">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-xs lg:text-sm tracking-[0.25em] uppercase transition-colors duration-300 hover:text-primary ${
                  useSolid ? "text-foreground/80" : "text-background/90 drop-shadow-[0_1px_6px_rgba(0,0,0,0.45)]"
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className={`md:hidden p-2 transition-colors ${
              useSolid ? "text-foreground" : "text-background drop-shadow-[0_1px_6px_rgba(0,0,0,0.45)]"
            }`}
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background flex flex-col"
          >
            <div className="flex items-center justify-between p-6 py-8 border-b border-border/50">
              <span className="font-serif text-xl tracking-widest uppercase flex items-center space-x-3">
                <img src={logoMark} alt="Surya Gold & Diamonds" className="w-8 h-8 object-contain mix-blend-multiply" />
                <span>SURYA</span>
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-foreground/80 hover:text-foreground"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center space-y-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-3xl tracking-widest uppercase text-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
