import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-24 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8 mb-20">
          <div className="md:col-span-2">
            <h2 className="font-serif text-3xl uppercase tracking-widest mb-6">Maison Aurum</h2>
            <p className="text-background/60 max-w-sm leading-relaxed font-light">
              Master goldsmiths and diamond purveyors. Creating heirloom pieces meant to be worn, loved, and passed down.
            </p>
          </div>
          
          <div>
            <h3 className="font-serif text-lg tracking-widest uppercase mb-6 text-primary">Explore</h3>
            <ul className="space-y-4 text-sm tracking-wider text-background/60">
              <li><a href="#collections" className="hover:text-primary transition-colors">Collections</a></li>
              <li><a href="#atelier" className="hover:text-primary transition-colors">The Atelier</a></li>
              <li><a href="#lookbook" className="hover:text-primary transition-colors">Lookbook</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Bespoke Commissions</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif text-lg tracking-widest uppercase mb-6 text-primary">Contact</h3>
            <ul className="space-y-4 text-sm tracking-wider text-background/60">
              <li>Via dei Condotti, 14</li>
              <li>00187 Rome, Italy</li>
              <li className="pt-4"><a href="mailto:atelier@maisonaurum.com" className="hover:text-primary transition-colors">atelier@maisonaurum.com</a></li>
              <li>+39 06 1234 5678</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row items-center justify-between text-xs tracking-widest text-background/40">
          <p>&copy; {new Date().getFullYear()} MAISON AURUM. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">PRIVACY</a>
            <a href="#" className="hover:text-primary transition-colors">TERMS</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
