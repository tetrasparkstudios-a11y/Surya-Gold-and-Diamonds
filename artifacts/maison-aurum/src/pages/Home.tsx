import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { products } from "@/data/products";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { FaWhatsapp } from "react-icons/fa";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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
          className="fixed pointer-events-none z-0 w-[800px] h-[800px] rounded-full"
          style={{
            left: mousePosition.x - 400,
            top: mousePosition.y - 400,
            background: "radial-gradient(circle, rgba(212, 163, 42, 0.15) 0%, rgba(212, 163, 42, 0) 60%)",
            filter: "blur(60px)",
          }}
        />
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

  // Hero Parallax
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden relative">
      <CursorGlow />
      <Navbar />

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 group">
        <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
        <a 
          href="https://wa.me/917093335656?text=Hello%20Surya%20Gold%20%26%20Diamonds%2C%20I%27d%20like%20to%20enquire%20about%20a%20piece."
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center w-[52px] h-[52px] bg-primary/90 text-white rounded-full shadow-[0_12px_30px_-10px_hsla(var(--primary),0.45)] hover:scale-105 hover:opacity-100 transition-all duration-400 ease-out pulse-ring"
          aria-label="Contact on WhatsApp"
        >
          <FaWhatsapp className="w-6 h-6" />
        </a>
        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden md:block">
          <div className="bg-[#FCF9F2] text-foreground font-serif text-xs px-3 py-1.5 rounded-full shadow-md whitespace-nowrap border border-primary/10">
            Chat with us
          </div>
        </div>
      </div>

      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="relative h-[90svh] md:h-screen w-full flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-16 overflow-hidden bg-foreground">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0 hero-bg-scale"
        >
          <img 
            src="/images/hero.png" 
            alt="Surya Gold & Diamonds Heritage" 
            className="w-full h-full object-cover mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,0,0,0.65)] via-[rgba(0,0,0,0.35)] to-[rgba(0,0,0,0.15)]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.8)] via-transparent to-transparent"></div>
        </motion.div>
        
        <div className="relative z-10 max-w-5xl">
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-primary text-[10px] md:text-xs uppercase tracking-[0.25em] mb-6 font-light"
          >
            Since 1985 • Hyderabad
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-5xl md:text-[clamp(4rem,8vw,8rem)] text-[#FCF9F2] font-medium tracking-[-0.02em] leading-[1.05]"
          >
            Where Gold <br className="hidden md:block" /> Becomes Legacy.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#FCF9F2]/80 font-light mt-6 max-w-lg text-lg leading-relaxed hidden md:block"
          >
            Master craftsmanship and generational trust, offering the finest heirloom jewelry and bespoke creations.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10"
          >
            <a href="#collections" className="inline-block border-b border-primary/50 text-[#FCF9F2] pb-1 uppercase tracking-[0.2em] text-xs hover:text-primary hover:border-primary transition-colors duration-500">
              Discover Collections
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. PHILOSOPHY / STORY */}
      <section id="atelier" className="py-20 md:py-40 bg-background relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-center">
            
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 lg:col-start-2 order-2 lg:order-1"
            >
              <p className="text-primary text-[10px] uppercase tracking-[0.25em] mb-8">Our Heritage</p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-10 leading-[1.1] tracking-[-0.01em]">
                Quiet confidence, <br/><span className="italic text-foreground/70">generations of trust.</span>
              </h2>
              <div className="space-y-6 text-foreground/75 font-light leading-relaxed text-sm md:text-base">
                <p>
                  At Surya Gold & Diamonds, we believe true luxury whispers. Our family has served the finest households of Hyderabad for decades, operating on the ancient rhythms of master goldsmiths. Designed to be passed through generations.
                </p>
                <p>
                  Every piece is a dialogue between raw, natural brilliance and human intentionality. From bridal trousseaus to everyday elegance, we don't just craft jewelry; we forge heirlooms.
                </p>
              </div>
              <div className="mt-14">
                <a href="#contact" className="cta-shimmer inline-block bg-foreground text-background px-10 py-4 uppercase tracking-[0.2em] text-xs hover:bg-primary transition-colors duration-700">
                  Book a Viewing
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="lg:col-span-5 relative aspect-[3/4] w-full order-1 lg:order-2 mt-0 lg:mt-32"
            >
              <img src="/images/philosophy.png" alt="Master Craftsmanship" loading="lazy" className="w-full h-full object-cover" />
              <div className="absolute -right-4 -bottom-4 md:-right-8 md:-bottom-8 w-2/3 aspect-square bg-secondary -z-10"></div>
              <p className="absolute -left-8 top-1/2 -rotate-90 origin-center text-[10px] tracking-[0.3em] uppercase text-foreground/40 hidden md:block">
                BIS Hallmark Certified
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. FEATURED PIECES */}
      <section id="collections" className="py-24 md:py-40 bg-secondary relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8"
          >
            <div className="max-w-2xl">
              <h2 className="font-serif text-4xl md:text-6xl mb-6 leading-[1.05] tracking-[-0.01em]">Curated Masterpieces</h2>
              <p className="text-foreground/60 font-light leading-relaxed text-lg">An intimately selected presentation of our most sought-after works, embodying the pinnacle of Indian craftsmanship.</p>
            </div>
            <a href="#lookbook" className="border-b border-foreground/30 text-foreground pb-1 uppercase tracking-[0.2em] text-xs hover:text-primary hover:border-primary transition-colors duration-500 shrink-0">
              View Full Collection
            </a>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-x-10 md:gap-y-16"
          >
            {products.map((product, i) => (
              <motion.div 
                key={product.id}
                variants={fadeInUp}
                className={`group cursor-pointer flex flex-col ${i === 1 ? 'lg:col-span-2 lg:row-span-2' : ''} ${i === 2 ? 'lg:mt-16' : ''}`}
                onClick={() => setSelectedProduct(product)}
              >
                <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-background shadow-sm group-hover:shadow-[0_20px_60px_-20px_hsla(var(--primary),0.35)] group-hover:-translate-y-1.5 transition-all duration-800 ease-out border border-transparent group-hover:border-primary/40">
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-700 z-10 pointer-events-none"></div>
                  <div className="w-full h-full overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-[1s] ease-out group-hover:scale-[1.06]"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-background/90 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 flex justify-between items-end">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-foreground">View Details</span>
                  </div>
                </div>
                <div className="mt-auto px-1">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-primary">{product.category}</p>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-foreground/40">{i % 2 === 0 ? "One of twelve" : "Made to order"}</p>
                  </div>
                  <h3 className="font-serif text-2xl mb-1 text-foreground group-hover:text-primary transition-colors duration-500">{product.name}</h3>
                  <p className="text-sm text-foreground/60 font-light mt-1">{formatPrice(product.price)}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. TRUST PILLARS (Editorial) */}
      <section className="py-24 md:py-32 px-6 bg-background relative z-10 border-b border-border/40">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {[
              { title: "BIS Hallmarked", desc: "Every piece of gold carries the official government hallmark of purity, ensuring absolute trust." },
              { title: "Certified Diamonds", desc: "Flawless solitaires and precious stones, rigorously certified by leading gemological institutes." },
              { title: "Lifetime Service", desc: "Our relationship begins, not ends, with your purchase. Complimentary cleaning and lifelong care." }
            ].map((pillar, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: i * 0.15 }}
                className="space-y-6 flex flex-col"
              >
                <div className="h-[1px] w-10 bg-primary/60 mb-2"></div>
                <h3 className="font-serif text-2xl md:text-3xl text-foreground">{pillar.title}</h3>
                <p className="text-foreground/75 font-light text-sm leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. EDITORIAL LOOKBOOK */}
      <section id="lookbook" className="py-24 md:py-40 bg-background relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
          >
            {/* Break items down for masonry */}
            <div className="break-inside-avoid relative group overflow-hidden cursor-pointer">
              <img src="/images/lookbook-1.png" loading="lazy" alt="Bridal Collection" className="w-full h-auto transition-transform duration-1000 ease-out group-hover:scale-[1.04]" />
              <div className="absolute inset-0 bg-[rgba(20,15,5,0.25)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
                <span className="text-[#FCF9F2] font-serif text-lg tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 translate-y-4 group-hover:translate-y-0">The Bridal Trousseau</span>
              </div>
            </div>
            
            <div className="break-inside-avoid relative group overflow-hidden cursor-pointer bg-secondary p-12 flex flex-col justify-center items-center text-center">
              <p className="text-primary text-[10px] uppercase tracking-[0.2em] mb-4">The Collection</p>
              <h2 className="font-serif text-3xl mb-4 leading-tight">Everyday <br/><span className="italic text-foreground/70">Brilliance</span></h2>
              <p className="text-foreground/60 font-light text-sm max-w-xs">For the moments between the milestones. Delicate settings that elevate the everyday.</p>
            </div>

            <div className="break-inside-avoid relative group overflow-hidden cursor-pointer">
              <img src="/images/lookbook-2.png" loading="lazy" alt="Everyday Collection" className="w-full h-auto transition-transform duration-1000 ease-out group-hover:scale-[1.04]" />
              <div className="absolute inset-0 bg-[rgba(20,15,5,0.25)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
                <span className="text-[#FCF9F2] font-serif text-lg tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 translate-y-4 group-hover:translate-y-0">Everyday Elegance</span>
              </div>
            </div>
            
             <div className="break-inside-avoid relative group overflow-hidden cursor-pointer">
              <img src="/images/collections/bridal.png" loading="lazy" alt="Bridal Details" className="w-full h-auto transition-transform duration-1000 ease-out group-hover:scale-[1.04]" />
              <div className="absolute inset-0 bg-[rgba(20,15,5,0.25)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
                <span className="text-[#FCF9F2] font-serif text-lg tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 translate-y-4 group-hover:translate-y-0">Heritage Details</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. CONTACT / APPOINTMENT */}
      <section id="contact" className="py-24 md:py-40 px-6 bg-gradient-to-br from-[hsl(var(--foreground))] to-[#0a0908] text-[#FCF9F2] relative z-10">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-xl"
            >
              <p className="text-primary text-[10px] uppercase tracking-[0.25em] mb-8">Private Viewing</p>
              <h2 className="font-serif text-4xl md:text-6xl mb-10 leading-[1.05] tracking-[-0.01em]">Request an Appointment</h2>
              <p className="text-[#FCF9F2]/70 font-light mb-16 text-lg leading-relaxed">
                We welcome you to our Hyderabad showroom for a private consultation. Experience the weight, warmth, and brilliance of our pieces in person.
              </p>
              
              <form className="space-y-8 mb-16">
                <div className="relative group">
                  <label className="absolute -top-3 left-0 text-[9px] uppercase tracking-[0.2em] text-[#FCF9F2]/50">Name</label>
                  <input type="text" placeholder="Your full name" className="w-full h-14 bg-transparent border-b border-[#FCF9F2]/30 text-[#FCF9F2] placeholder:text-[#FCF9F2]/40 focus:outline-none focus:border-primary transition-colors duration-500 font-light" />
                </div>
                <div className="relative group">
                  <label className="absolute -top-3 left-0 text-[9px] uppercase tracking-[0.2em] text-[#FCF9F2]/50">Phone / WhatsApp</label>
                  <input type="tel" placeholder="Your contact number" className="w-full h-14 bg-transparent border-b border-[#FCF9F2]/30 text-[#FCF9F2] placeholder:text-[#FCF9F2]/40 focus:outline-none focus:border-primary transition-colors duration-500 font-light" />
                </div>
                <div className="relative group">
                  <label className="absolute -top-3 left-0 text-[9px] uppercase tracking-[0.2em] text-[#FCF9F2]/50">Inquiry</label>
                  <input type="text" placeholder="What are you looking for?" className="w-full h-14 bg-transparent border-b border-[#FCF9F2]/30 text-[#FCF9F2] placeholder:text-[#FCF9F2]/40 focus:outline-none focus:border-primary transition-colors duration-500 font-light" />
                </div>
                <div className="pt-6">
                  <button type="button" className="cta-shimmer inline-flex items-center text-sm uppercase tracking-[0.2em] text-[#FCF9F2] group pb-2 relative">
                    Submit Request &rarr;
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-300 ease-out group-hover:w-full"></span>
                  </button>
                </div>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.0, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col space-y-12"
            >
              <div className="w-full h-[350px] lg:h-[450px] p-1 border border-primary/20 bg-foreground/50">
                <div className="w-full h-full grayscale-[30%] contrast-[1.05] opacity-90 hover:opacity-100 transition-opacity duration-700">
                  <iframe 
                    src="https://www.google.com/maps?q=Bandlaguda+Ranga+Reddy+Telangana&output=embed" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full object-cover"
                  ></iframe>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] text-primary mb-3">Showroom</h4>
                  <p className="font-serif font-light text-[#FCF9F2]/80 leading-relaxed text-lg">
                    Flat No. 103, My Adobe<br/>
                    The Sirius, Suryodaya Colony,<br/>
                    Bandlaguda, Ranga Reddy (D)
                  </p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] text-primary mb-3">Direct Lines</h4>
                  <p className="font-serif font-light text-[#FCF9F2]/80 space-y-1 text-lg">
                    <a href="tel:+917093335656" className="block hover:text-primary transition-colors">+91 70933 35656</a>
                    <a href="tel:+919490032898" className="block hover:text-primary transition-colors">+91 94900 32898</a>
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />

      {/* Product Detail Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        <DialogContent className="max-w-5xl w-full p-0 border-none bg-background rounded-none overflow-hidden outline-none">
          {selectedProduct && (
            <div className="flex flex-col lg:flex-row h-[85vh] lg:h-[750px]">
              <div className="w-full lg:w-1/2 relative bg-secondary order-1 h-72 lg:h-full shrink-0 overflow-hidden">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-start overflow-y-auto order-2 hide-scrollbar">
                <p className="text-primary text-[10px] uppercase tracking-[0.25em] mb-4">{selectedProduct.category}</p>
                <DialogTitle className="font-serif text-3xl lg:text-4xl mb-4 font-normal tracking-[-0.01em]">{selectedProduct.name}</DialogTitle>
                <p className="text-xl font-serif text-foreground/70 mb-10">
                  {formatPrice(selectedProduct.price)}
                </p>
                
                <div className="space-y-10 flex-1">
                  <p className="text-sm font-light leading-relaxed text-foreground/80">
                    {selectedProduct.description}
                  </p>
                  
                  <div className="pt-8 border-t border-primary/20">
                    <div className="grid grid-cols-2 gap-y-6 text-sm">
                      <div className="border-b border-primary/10 pb-4">
                        <span className="block text-foreground/40 uppercase tracking-[0.2em] text-[9px] mb-2">Material</span>
                        <span className="font-serif text-base text-foreground">{selectedProduct.karat}</span>
                      </div>
                      
                      {selectedProduct.clarity && (
                        <div className="border-b border-primary/10 pb-4 pl-6 border-l border-primary/10">
                          <span className="block text-foreground/40 uppercase tracking-[0.2em] text-[9px] mb-2">Clarity</span>
                          <span className="font-serif text-base text-foreground">{selectedProduct.clarity}</span>
                        </div>
                      )}
                      
                      {selectedProduct.carat && (
                        <div className="border-b border-primary/10 pb-4">
                          <span className="block text-foreground/40 uppercase tracking-[0.2em] text-[9px] mb-2">Carat Weight</span>
                          <span className="font-serif text-base text-foreground">{selectedProduct.carat}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-primary mb-2">Atelier Notes</p>
                    <p className="text-sm font-serif italic text-foreground/70 leading-relaxed">{selectedProduct.craftsmanship}</p>
                  </div>
                </div>

                <div className="mt-12 pt-8 flex flex-col sm:flex-row items-center gap-8 border-t border-primary/10">
                  <a 
                    href={`https://wa.me/917093335656?text=${encodeURIComponent(`Hello Surya Gold & Diamonds, I'd like to enquire about the ${selectedProduct.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex text-sm uppercase tracking-[0.2em] text-foreground group pb-1 relative"
                  >
                    Inquire via WhatsApp &rarr;
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-300 ease-out group-hover:w-full"></span>
                  </a>
                  <button 
                    onClick={() => {
                      setSelectedProduct(null);
                      setTimeout(() => {
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="inline-flex text-sm uppercase tracking-[0.2em] text-foreground group pb-1 relative"
                  >
                    Book a Private Viewing &rarr;
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-300 ease-out group-hover:w-full"></span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
