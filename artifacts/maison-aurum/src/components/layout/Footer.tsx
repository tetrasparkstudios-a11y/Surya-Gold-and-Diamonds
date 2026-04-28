import { motion } from "framer-motion";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import logoLockup from "@assets/IMG-20250307-WA0001_1777329876709.jpg";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-24 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8 mb-20">
          <div className="md:col-span-2 pr-8">
            <img src={logoLockup} alt="Surya Gold & Diamonds" className="w-48 mb-8 object-contain mix-blend-screen opacity-90 invert grayscale brightness-0 contrast-200" style={{ filter: "invert(1) brightness(0.9)" }} />
            <h2 className="font-serif text-3xl uppercase tracking-widest mb-6">Where Gold Becomes Legacy.</h2>
            <p className="text-background/60 max-w-sm leading-relaxed font-light">
              Generations of trust and master craftsmanship. Creating heirloom pieces meant to be worn, loved, and passed down across decades.
            </p>
            <div className="flex space-x-6 mt-8">
              <a href="#" className="text-background/60 hover:text-primary transition-colors"><FaInstagram size={20} /></a>
              <a href="#" className="text-background/60 hover:text-primary transition-colors"><FaFacebookF size={20} /></a>
              <a href="https://wa.me/917093335656" className="text-background/60 hover:text-primary transition-colors"><FaWhatsapp size={20} /></a>
            </div>
          </div>
          
          <div>
            <h3 className="font-serif text-lg tracking-widest uppercase mb-6 text-primary">Explore</h3>
            <ul className="space-y-4 text-sm tracking-wider text-background/60">
              <li><a href="/#collections" className="hover:text-primary transition-colors">Collections</a></li>
              <li><a href="/#atelier" className="hover:text-primary transition-colors">The Heritage</a></li>
              <li><a href="/#lookbook" className="hover:text-primary transition-colors">Lookbook</a></li>
              <li><a href="/contact" className="hover:text-primary transition-colors">Private Viewing</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif text-lg tracking-widest uppercase mb-6 text-primary">Contact</h3>
            <ul className="space-y-4 text-sm tracking-wider text-background/60 font-light">
              <li><span className="uppercase text-xs tracking-widest block text-background/40 mb-1">Address</span>
                Flat No. 103, My Adobe The Sirius,<br/>
                Suryodaya Colony, Bandlaguda,<br/>
                Ranga Reddy (D), Telangana, India
              </li>
              <li className="pt-2"><span className="uppercase text-xs tracking-widest block text-background/40 mb-1">Email</span>
                <a href="mailto:suryagold2024@gmail.com" className="hover:text-primary transition-colors">suryagold2024@gmail.com</a>
              </li>
              <li className="pt-2"><span className="uppercase text-xs tracking-widest block text-background/40 mb-1">Phone</span>
                <a href="tel:+917093335656" className="hover:text-primary transition-colors">+91 70933 35656</a><br/>
                <a href="tel:+919490032898" className="hover:text-primary transition-colors">+91 94900 32898</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row items-center justify-between text-xs tracking-widest text-background/40">
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
