import { motion } from "framer-motion";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import logoLockup from "@assets/IMG-20250307-WA0001_1777329876709.jpg";

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#FCF9F2] to-[#F3EFE6] text-foreground/70 py-24 px-6 border-t border-border/30">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-20">
          <div className="md:col-span-5 pr-8">
            <img src={logoLockup} alt="Surya Gold & Diamonds" className="w-56 mb-8 object-contain mix-blend-multiply" />
            <h2 className="font-serif text-2xl text-foreground uppercase tracking-widest mb-6">Where Gold Becomes Legacy.</h2>
            <p className="max-w-sm leading-relaxed font-light">
              Generations of trust and master craftsmanship. Serving Hyderabad since 1985. Creating heirloom pieces meant to be worn, loved, and passed down across decades.
            </p>
          </div>
          
          <div className="md:col-span-3 md:col-start-7">
            <h3 className="font-serif text-sm tracking-[0.2em] uppercase mb-6 text-primary">Explore</h3>
            <ul className="space-y-4 text-sm tracking-wider font-light">
              <li><a href="#collections" className="hover:text-primary transition-colors">Collections</a></li>
              <li><a href="#atelier" className="hover:text-primary transition-colors">The Heritage</a></li>
              <li><a href="#lookbook" className="hover:text-primary transition-colors">Lookbook</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Private Viewing</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-3">
            <h3 className="font-serif text-sm tracking-[0.2em] uppercase mb-6 text-primary">Contact</h3>
            <ul className="space-y-5 text-sm tracking-wider font-light">
              <li><span className="uppercase text-[10px] tracking-[0.2em] block text-foreground/50 mb-1">Showroom</span>
                Flat No. 103, My Adobe The Sirius,<br/>
                Suryodaya Colony, Bandlaguda,<br/>
                Ranga Reddy (D), Telangana, India
              </li>
              <li><span className="uppercase text-[10px] tracking-[0.2em] block text-foreground/50 mb-1">Direct Lines</span>
                <a href="tel:+917093335656" className="hover:text-primary transition-colors">+91 70933 35656</a><br/>
                <a href="tel:+919490032898" className="hover:text-primary transition-colors">+91 94900 32898</a>
              </li>
              <li><span className="uppercase text-[10px] tracking-[0.2em] block text-foreground/50 mb-1">Correspondence</span>
                <a href="mailto:suryagold2024@gmail.com" className="hover:text-primary transition-colors">suryagold2024@gmail.com</a>
              </li>
            </ul>
            <div className="flex space-x-6 mt-8">
              <a href="#" className="text-foreground/50 hover:text-primary transition-colors"><FaInstagram size={18} /></a>
              <a href="#" className="text-foreground/50 hover:text-primary transition-colors"><FaFacebookF size={18} /></a>
              <a href="https://wa.me/917093335656" className="text-foreground/50 hover:text-primary transition-colors"><FaWhatsapp size={18} /></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary/20 pt-8 flex flex-col md:flex-row items-center justify-between text-[10px] tracking-[0.2em] uppercase text-foreground/50">
          <p>&copy; {new Date().getFullYear()} SURYA GOLD & DIAMONDS. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">PRIVACY</a>
            <a href="#" className="hover:text-primary transition-colors">TERMS</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
