import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import logoLockup from "@assets/IMG-20250307-WA0001_1777329876709.jpg";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 md:py-24 relative overflow-hidden">
      {/* Cinematic subtle warm light wash inside footer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,163,42,0.02),transparent_65%)] pointer-events-none" />

      <div className="container mx-auto px-5 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">

          {/* Brand column */}
          <div className="md:col-span-5 lg:col-span-4">
            {/* Logo — forced white via CSS filter so it never shows blue tones */}
            <img
              src={logoLockup}
              alt="Surya Gold & Diamonds"
              className="h-14 w-auto mb-7 object-contain"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <p className="text-[10px] uppercase tracking-widest text-primary mb-4 font-serif">
              Established 1985 · Hyderabad
            </p>
            <p className="text-background/55 max-w-xs leading-relaxed font-light text-sm">
              Generations of trust and master craftsmanship. Creating heirloom pieces meant to be worn, loved, and passed down across decades.
            </p>
            <div className="flex gap-5 mt-7">
              <a href="#" aria-label="Instagram" className="text-background/45 hover:text-primary transition-colors duration-400">
                <FaInstagram size={18} />
              </a>
              <a href="#" aria-label="Facebook" className="text-background/45 hover:text-primary transition-colors duration-400">
                <FaFacebookF size={18} />
              </a>
              <a
                href="https://wa.me/917093335656"
                aria-label="WhatsApp"
                className="text-background/45 hover:text-primary transition-colors duration-400"
              >
                <FaWhatsapp size={18} />
              </a>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-2" />

          {/* Explore links */}
          <div className="md:col-span-3 lg:col-span-3">
            <h3 className="font-serif text-sm tracking-[0.2em] uppercase mb-6 text-primary">Explore</h3>
            <ul className="space-y-3.5 text-xs tracking-[0.14em] uppercase text-background/55">
              {[
                { label: "Collections",    href: "/#collections" },
                { label: "The Heritage",   href: "/#atelier" },
                { label: "Lookbook",       href: "/#lookbook" },
                { label: "Private Viewing",href: "/#contact" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="hover:text-primary transition-colors duration-400">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact details */}
          <div className="md:col-span-4 lg:col-span-3">
            <h3 className="font-serif text-sm tracking-[0.2em] uppercase mb-6 text-primary">Contact</h3>
            <ul className="space-y-5 text-sm font-light text-background/55">
              <li>
                <span className="uppercase text-[9px] tracking-widest block text-background/35 mb-1.5 font-serif">Showroom</span>
                <span className="leading-relaxed">
                  Flat No. 103, My Adobe The Sirius,<br />
                  Suryodaya Colony, Bandlaguda,<br />
                  Ranga Reddy (D), Telangana, India
                </span>
              </li>
              <li>
                <span className="uppercase text-[9px] tracking-widest block text-background/35 mb-1.5 font-serif">Email</span>
                <a href="mailto:suryagold2024@gmail.com" className="hover:text-primary transition-colors duration-400">
                  suryagold2024@gmail.com
                </a>
              </li>
              <li>
                <span className="uppercase text-[9px] tracking-widest block text-background/35 mb-1.5 font-serif">Phone</span>
                <a href="tel:+917093335656" className="block hover:text-primary transition-colors duration-400">
                  +91 70933 35656
                </a>
                <a href="tel:+919490032898" className="block hover:text-primary transition-colors duration-400">
                  +91 94900 32898
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-background/15 pt-7 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] tracking-widest text-background/35">
          <p>&copy; {new Date().getFullYear()} SURYA GOLD & DIAMONDS. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6 font-serif">
            <a href="#" className="hover:text-primary transition-colors duration-400">PRIVACY</a>
            <a href="#" className="hover:text-primary transition-colors duration-400">TERMS</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
