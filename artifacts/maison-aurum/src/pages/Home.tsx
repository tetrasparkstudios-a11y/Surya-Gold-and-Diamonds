import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useProducts, Product } from "@/lib/productStore";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { FaWhatsapp } from "react-icons/fa";
import { MMTCSection } from "@/components/sections/MMTCSection";
import { InlineContactSection } from "@/components/sections/InlineContactSection";
import { FullCollectionModal } from "@/components/sections/FullCollectionModal";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
};

function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on desktop
    if (window.matchMedia("(hover: none)").matches) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };
    
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed pointer-events-none z-0 w-[600px] h-[600px] rounded-full"
          style={{
            left: mousePosition.x - 300,
            top: mousePosition.y - 300,
            background: "radial-gradient(circle, rgba(212, 163, 42, 0.04) 0%, rgba(212, 163, 42, 0) 70%)",
            filter: "blur(40px)",
          }}
        />
      )}
    </AnimatePresence>
  );
}

// Smoothly scroll to the inline contact section. Used by every CTA so the user
// stays inside the same scrolling experience.
function scrollToContact() {
  const el = document.getElementById("contact");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const products = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [fullCollectionOpen, setFullCollectionOpen] = useState(false);

  // Hero Parallax
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden relative">
      <CursorGlow />
      <Navbar />

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/917093335656?text=Hello%20Surya%20Gold%20%26%20Diamonds%2C%20I%27d%20like%20to%20enquire%20about%20a%20piece."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#d4af37] text-primary-foreground p-3 md:p-3.5 rounded-full shadow-[0_4px_20px_rgba(212,163,42,0.2)] hover:scale-105 transition-transform duration-500 pulse-ring w-12 h-12 flex items-center justify-center"
        aria-label="Contact on WhatsApp"
      >
        <FaWhatsapp className="w-5 h-5 md:w-6 md:h-6" />
      </a>

      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="relative h-[90svh] md:h-screen w-full flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-16 overflow-hidden bg-foreground">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="/images/hero.png" 
            alt="Surya Gold & Diamonds Heritage" 
            className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/40 to-transparent"></div>
        </motion.div>
        
        <div className="relative z-10 max-w-4xl">
          <motion.p 
            initial={{ opacity: 0, tracking: "0em" }}
            animate={{ opacity: 1, tracking: "0.2em" }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            className="text-primary text-xs md:text-sm uppercase tracking-widest mb-6 font-light"
          >
            Since 1985 • Hyderabad
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-background font-medium tracking-wide leading-[1.1]"
          >
            Where Gold <br className="hidden md:block" /> Becomes Legacy.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
            className="mt-12"
          >
            <a href="#collections" className="inline-block border-b border-primary text-primary pb-1 uppercase tracking-widest text-xs hover:text-background hover:border-background transition-colors duration-700">
              Discover Collections
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. PHILOSOPHY / STORY (Editorial Asymmetry) */}
      <section id="atelier" className="py-32 md:py-40 bg-background relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-center">
            
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 lg:col-start-2 order-2 lg:order-1"
            >
              <p className="text-primary text-xs uppercase tracking-widest mb-8">Our Heritage</p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-10 leading-[1.2]">
                Quiet confidence, <br/><span className="italic text-foreground/70">generations of trust.</span>
              </h2>
              <div className="space-y-6 text-foreground/80 font-light leading-relaxed text-sm md:text-base">
                <p>
                  At Surya Gold & Diamonds, we believe true luxury whispers. Our family has served the finest households of Hyderabad for decades, operating on the ancient rhythms of master goldsmiths.
                </p>
                <p>
                  Every piece is a dialogue between raw, natural brilliance and human intentionality. From bridal trousseaus to everyday elegance, we don't just craft jewelry; we forge heirlooms.
                </p>
              </div>
              <div className="mt-12">
                <button
                  onClick={scrollToContact}
                  className="cta-shimmer inline-block bg-foreground text-background px-10 py-4 uppercase tracking-widest text-xs hover:bg-primary transition-colors duration-700"
                >
                  Book a Viewing
                </button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 relative aspect-[3/4] w-full order-1 lg:order-2 mt-0 lg:mt-24 group overflow-hidden"
            >
              <img src="/images/philosophy.png" alt="Master Craftsmanship" loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.04]" />
              <div className="absolute inset-0 ring-1 ring-inset ring-primary/10 group-hover:ring-primary/30 group-hover:shadow-[0_0_30px_rgba(212,163,42,0.15)] transition-all duration-700 pointer-events-none"></div>
              <div className="absolute -right-4 -bottom-4 md:-right-8 md:-bottom-8 w-2/3 aspect-square bg-secondary -z-10"></div>
              <p className="absolute -left-6 top-1/2 -rotate-90 origin-center text-[10px] tracking-[0.3em] uppercase text-foreground/50 hidden md:block">
                BIS Hallmark Certified
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      <MMTCSection />

      {/* 3. FEATURED PIECES */}
      <section id="collections" className="py-32 bg-secondary relative z-10">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6"
          >
            <div className="max-w-xl">
              <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-tight">Curated Masterpieces</h2>
              <p className="text-foreground/60 font-light leading-relaxed">An intimately selected presentation of our most sought-after works, embodying the pinnacle of Indian craftsmanship.</p>
            </div>
            <button
              onClick={() => setFullCollectionOpen(true)}
              className="border-b border-foreground text-foreground pb-1 uppercase tracking-widest text-xs hover:text-primary hover:border-primary transition-colors duration-500 shrink-0"
            >
              View Full Collection
            </button>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
          >
            {products.map((product) => (
              <motion.div 
                key={product.id}
                variants={fadeInUp}
                className="group cursor-pointer flex flex-col"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-background">
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-700 z-10"></div>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-primary/0 group-hover:ring-primary/20 group-hover:shadow-[0_0_20px_rgba(212,163,42,0.1)] transition-all duration-700 pointer-events-none z-10"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 flex justify-between items-end">
                    <span className="text-xs uppercase tracking-widest font-medium text-foreground">View</span>
                  </div>
                </div>
                <div className="mt-auto">
                  <p className="text-[10px] uppercase tracking-widest text-primary mb-2">{product.category}</p>
                  <h3 className="font-serif text-xl md:text-2xl mb-1 group-hover:text-primary transition-colors duration-500">{product.name}</h3>
                  <p className="text-[10px] uppercase tracking-widest text-primary font-medium mt-2">Available upon inquiry</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. TRUST PILLARS */}
      <section className="py-24 md:py-32 px-6 bg-background relative z-10 border-b border-border/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 text-center">
            {[
              { title: "BIS Hallmarked", desc: "Every piece of gold carries the official government hallmark of purity, ensuring absolute trust." },
              { title: "Certified Diamonds", desc: "Flawless solitaires and precious stones, rigorously certified by leading gemological institutes." },
              { title: "Lifetime Service", desc: "Our relationship begins, not ends, with your purchase. Complimentary cleaning and lifelong care." }
            ].map((pillar, i) => (
              <motion.div 
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
                className="space-y-5"
              >
                <div className="w-12 h-12 mx-auto border border-primary/30 flex items-center justify-center rounded-full text-primary mb-6">
                  <span className="font-serif text-xl italic">{i+1}</span>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl">{pillar.title}</h3>
                <p className="text-foreground/60 font-light text-sm max-w-xs mx-auto leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. EDITORIAL LOOKBOOK */}
      <section id="lookbook" className="py-32 md:py-48 bg-background relative z-10">
        <div className="w-[70%] mx-auto h-px bg-primary/20 absolute top-0 left-0 right-0"></div>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 relative aspect-[16/9] md:aspect-video w-full group overflow-hidden"
            >
              <img src="/images/lookbook-1.png" alt="Bridal Collection" loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.04]" />
              <div className="absolute inset-0 ring-1 ring-inset ring-primary/10 group-hover:ring-primary/30 group-hover:shadow-[0_0_30px_rgba(212,163,42,0.15)] transition-all duration-700 pointer-events-none"></div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-4 lg:col-start-9"
            >
              <h2 className="font-serif text-4xl md:text-5xl mb-6">The Bridal <br/><span className="italic text-primary">Trousseau</span></h2>
              <p className="text-foreground/60 font-light leading-relaxed mb-8">
                Weighty, intricate, and deeply rooted in tradition. Our bridal pieces are designed to be the centerpiece of the most important day of your life, capturing the essence of Indian grandeur with refined restraint.
              </p>
              <button
                onClick={scrollToContact}
                className="text-xs uppercase tracking-widest text-foreground hover:text-primary transition-colors flex items-center gap-4"
              >
                <span className="w-8 h-[1px] bg-foreground"></span> Explore Trousseau
              </button>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-4 lg:col-start-2 order-2 lg:order-1"
            >
              <h2 className="font-serif text-4xl md:text-5xl mb-6">Everyday <br/><span className="italic text-primary">Brilliance</span></h2>
              <p className="text-foreground/60 font-light leading-relaxed mb-8">
                For the moments between the milestones. Delicate diamond settings and minimalist gold forms that elevate the everyday into something extraordinary.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 lg:col-start-7 relative aspect-[4/5] w-full order-1 lg:order-2 group overflow-hidden"
            >
              <img src="/images/lookbook-2.png" alt="Everyday Collection" loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.04]" />
              <div className="absolute inset-0 ring-1 ring-inset ring-primary/10 group-hover:ring-primary/30 group-hover:shadow-[0_0_30px_rgba(212,163,42,0.15)] transition-all duration-700 pointer-events-none"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. INLINE CONTACT (no separate /contact page — keeps the user inside
          the same scrolling experience). */}
      <InlineContactSection />

      <Footer />

      {/* Product Detail Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        <DialogContent className="max-w-5xl p-0 border-none bg-background rounded-none overflow-hidden">
          {selectedProduct && (
            <div className="flex flex-col lg:flex-row h-[85vh] lg:h-[700px]">
              <div className="w-full lg:w-1/2 relative bg-secondary order-1 h-64 lg:h-full shrink-0">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full lg:w-1/2 p-8 lg:p-14 flex flex-col justify-center overflow-y-auto order-2 hide-scrollbar">
                <p className="text-primary text-[10px] md:text-xs uppercase tracking-widest mb-4">{selectedProduct.category}</p>
                <DialogTitle className="font-serif text-3xl lg:text-4xl mb-3">{selectedProduct.name}</DialogTitle>
                <p className="text-[11px] tracking-widest uppercase font-medium text-foreground/50 mb-8">
                  Price on request
                </p>
                
                <div className="space-y-8 flex-1">
                  <p className="text-sm font-light leading-relaxed text-foreground/80">
                    {selectedProduct.description}
                  </p>
                  
                  <div className="pt-8 border-t border-border/50">
                    <dl className="grid grid-cols-2 gap-y-6 text-sm">
                      <dt className="text-foreground/50 uppercase tracking-wider text-[10px] md:text-xs">Material</dt>
                      <dd className="font-medium text-right lg:text-left">{selectedProduct.karat}</dd>
                      
                      {selectedProduct.clarity && (
                        <>
                          <dt className="text-foreground/50 uppercase tracking-wider text-[10px] md:text-xs">Clarity</dt>
                          <dd className="font-medium text-right lg:text-left">{selectedProduct.clarity}</dd>
                        </>
                      )}
                    </dl>
                  </div>
                  
                  <div className="bg-secondary/50 p-6 mt-8">
                    <p className="text-[10px] uppercase tracking-widest text-primary mb-3">Atelier Notes</p>
                    <p className="text-sm font-serif italic text-foreground/80 leading-relaxed">{selectedProduct.craftsmanship}</p>
                  </div>
                </div>

                <div className="mt-10 pt-6 flex flex-col sm:flex-row gap-4">
                  <a 
                    href={`https://wa.me/917093335656?text=I'm%20interested%20in%20the%20${encodeURIComponent(selectedProduct.name)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-shimmer flex-1 bg-primary text-primary-foreground py-4 uppercase tracking-widest text-xs text-center hover:bg-primary/90 transition-colors duration-700"
                  >
                    Inquire via WhatsApp
                  </a>
                  <button 
                    onClick={() => {
                      setSelectedProduct(null);
                      // Wait for the modal close transition before scrolling
                      // so the smooth-scroll target is in its final position.
                      setTimeout(scrollToContact, 250);
                    }}
                    className="cta-shimmer flex-1 border border-primary text-primary py-4 uppercase tracking-widest text-xs hover:bg-primary/5 transition-colors duration-700"
                  >
                    Book a Private Viewing
                  </button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Full Collection Modal — opens from "View Full Collection" */}
      <FullCollectionModal
        open={fullCollectionOpen}
        onOpenChange={setFullCollectionOpen}
        products={products}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />
    </div>
  );
}
