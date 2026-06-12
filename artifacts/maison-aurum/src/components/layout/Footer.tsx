import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { motion, type Variants } from "framer-motion";

const footerReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-20 md:py-32 relative overflow-hidden border-t border-primary/25">
      {/* Cinematic subtle warm light wash inside footer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,163,42,0.025),transparent_65%)] pointer-events-none" />

      <div className="container mx-auto px-5 md:px-8 relative z-10">

        {/* ─── Luxury Statement ─── */}
        <motion.div variants={footerReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="text-center mb-20 md:mb-28">
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="h-px w-20 bg-primary/30" />
            <span className="text-[9px] uppercase tracking-[0.4em] text-primary/60 font-light">Since 1985</span>
            <div className="h-px w-20 bg-primary/30" />
          </div>
          <h2 className="font-serif text-[clamp(2rem,4.5vw,3.8rem)] text-background/90 font-light leading-[1.15] tracking-wide">
            Crafted for Generations.
          </h2>
          <p className="font-serif italic text-background/30 text-base md:text-lg mt-5 tracking-wide">
            Heirlooms for the next century.
          </p>
        </motion.div>

        {/* ─── Thin separator ─── */}
        <div className="h-px w-full bg-background/8 mb-16 md:mb-20" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-14 md:gap-8 mb-20">

          {/* Brand column */}
          <div className="md:col-span-5 lg:col-span-4">
            {/* Logo and Brand Name */}
            <div className="flex flex-col items-start mb-10">
              <img
                src="/assets/surya-s-monogram-footer.png"
                alt="Surya Gold & Diamonds Logo"
                className="h-[60px] md:h-[75px] w-auto mb-6 object-contain"
              />
              <h3 className="font-serif text-[17px] md:text-[20px] tracking-[0.22em] text-primary/90 uppercase whitespace-nowrap">
                Surya Gold <span className="mx-0.5">And</span> Diamonds
              </h3>
            </div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-primary/70 mb-5 font-light">
              Established 1985 · Hyderabad
            </p>
            <p className="text-background/45 max-w-xs leading-[1.7] font-light text-sm">
              Generations of trust and master craftsmanship. Creating heirloom pieces meant to be worn, loved, and passed down across decades.
            </p>
            <div className="flex gap-6 mt-8">
              <a href="#" aria-label="Instagram" className="text-background/35 hover:text-primary hover:scale-110 hover:drop-shadow-[0_0_6px_rgba(197,162,77,0.3)] transition-all duration-500">
                <FaInstagram size={18} />
              </a>
              <a href="#" aria-label="Facebook" className="text-background/35 hover:text-primary hover:scale-110 hover:drop-shadow-[0_0_6px_rgba(197,162,77,0.3)] transition-all duration-500">
                <FaFacebookF size={18} />
              </a>
              <a
                href="https://wa.me/917093335656"
                aria-label="WhatsApp"
                className="text-background/35 hover:text-primary hover:scale-110 hover:drop-shadow-[0_0_6px_rgba(197,162,77,0.3)] transition-all duration-500"
              >
                <FaWhatsapp size={18} />
              </a>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-2" />

          {/* Explore links */}
          <div className="md:col-span-3 lg:col-span-3">
            <h3 className="font-serif text-[13px] tracking-[0.22em] uppercase mb-7 text-primary/80 font-light">Explore</h3>
            <ul className="space-y-4 text-[11px] tracking-[0.16em] uppercase text-background/45 font-light">
              {[
                { label: "Collections",    href: "/#collections" },
                { label: "The Heritage",   href: "/#atelier" },
                { label: "Lookbook",       href: "/#lookbook" },
                { label: "Private Viewing",href: "/#contact" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="luxury-link hover:text-primary transition-colors duration-600">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact details */}
          <div className="md:col-span-4 lg:col-span-3">
            <h3 className="font-serif text-[13px] tracking-[0.22em] uppercase mb-7 text-primary/80 font-light">Contact</h3>
            <ul className="space-y-6 text-sm font-light text-background/45">
              <li>
                <span className="uppercase text-[9px] tracking-[0.22em] block text-background/25 mb-2 font-light">Showroom</span>
                <span className="leading-[1.7]">
                  AYKON COMMERCIAL COMPLEX,<br />
                  Manikonda Main Road, Near Puppalaguda,<br />
                  Hyderabad, Telangana 500089, India
                </span>
              </li>
              <li>
                <span className="uppercase text-[9px] tracking-[0.22em] block text-background/25 mb-2 font-light">Email</span>
                <a href="mailto:suryagold2024@gmail.com" className="hover:text-primary transition-colors duration-600">
                  suryagold2024@gmail.com
                </a>
              </li>
              <li>
                <span className="uppercase text-[9px] tracking-[0.22em] block text-background/25 mb-2 font-light">Phone</span>
                <a href="tel:+917093335656" className="block hover:text-primary transition-colors duration-600">
                  +91 70933 35656
                </a>
                <a href="tel:+919490032898" className="block hover:text-primary transition-colors duration-600">
                  +91 94900 32898
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] tracking-[0.2em] text-background/25 font-light">
          <p>&copy; {new Date().getFullYear()} SURYA GOLD & DIAMONDS. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary transition-colors duration-600">PRIVACY</a>
            <a href="#" className="hover:text-primary transition-colors duration-600">TERMS</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
