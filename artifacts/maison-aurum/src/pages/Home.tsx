import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { products } from "@/data/products";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

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

  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-foreground">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="/images/hero.png" 
            alt="Maison Aurum Hero" 
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-foreground/20 to-background"></div>
        </motion.div>
        
        <div className="relative z-10 text-center px-6 mt-20">
          <motion.p 
            initial={{ opacity: 0, tracking: "0em" }}
            animate={{ opacity: 1, tracking: "0.2em" }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="text-primary text-sm uppercase tracking-widest mb-6 font-light"
          >
            The Art of Forever
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-background font-medium tracking-wide"
          >
            MAISON AURUM
          </motion.h1>
        </div>
      </section>

      {/* 2. PHILOSOPHY / STORY */}
      <section id="atelier" className="py-32 px-6 md:py-48 bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="max-w-xl"
            >
              <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-8 leading-tight">
                Quiet luxury, <br/><span className="italic text-foreground/70">crafted in shadow.</span>
              </h2>
              <div className="space-y-6 text-foreground/80 font-light leading-relaxed">
                <p>
                  At Maison Aurum, we believe the most profound objects whisper, they do not shout. Our atelier in Rome operates on the ancient rhythms of master goldsmiths, dedicating hundreds of hours to a single curve of metal.
                </p>
                <p>
                  Every piece is a dialogue between raw, natural brilliance and human intentionality. We don't just set diamonds; we frame light.
                </p>
              </div>
              <div className="mt-12">
                <a href="#contact" className="inline-block border-b border-primary text-primary pb-1 uppercase tracking-widest text-xs hover:text-foreground hover:border-foreground transition-colors duration-500">
                  Discover Our Heritage
                </a>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className="relative aspect-[4/5] w-full"
            >
              <img src="/images/philosophy.png" alt="Goldsmith at work" className="w-full h-full object-cover" />
              <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(253,251,247,0.2)] pointer-events-none"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PIECES (Interactive Showcase) */}
      <section id="collections" className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-2xl mx-auto mb-20"
          >
            <h2 className="font-serif text-4xl mb-4">Curated Masterpieces</h2>
            <p className="text-foreground/60 font-light">An intimately selected presentation of our most sought-after works.</p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {products.map((product) => (
              <motion.div 
                key={product.id}
                variants={fadeInUp}
                className="group cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="relative aspect-square mb-6 overflow-hidden bg-background">
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500 z-10"></div>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
                <div className="text-center">
                  <p className="text-xs uppercase tracking-widest text-primary mb-2">{product.category}</p>
                  <h3 className="font-serif text-xl mb-1 group-hover:text-primary transition-colors duration-300">{product.name}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. TRUST PILLARS */}
      <section className="py-32 px-6 border-y border-border">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            {[
              { title: "Ethical Sourcing", desc: "Every diamond is conflict-free, traced from origin to our atelier." },
              { title: "Master Craftsmanship", desc: "Forged by artisans with decades of inherited knowledge." },
              { title: "Lifetime Service", desc: "Our commitment to your piece extends far beyond the day it leaves our salon." }
            ].map((pillar, i) => (
              <motion.div 
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="space-y-4"
              >
                <h3 className="font-serif text-2xl">{pillar.title}</h3>
                <p className="text-foreground/60 font-light text-sm max-w-xs mx-auto">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. LOOKBOOK */}
      <section id="lookbook" className="py-32 bg-background overflow-hidden">
        <div className="container mx-auto px-6 mb-16 text-center">
          <h2 className="font-serif text-4xl">The Lookbook</h2>
        </div>
        
        <div className="flex w-full gap-4 px-4 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
          {[1, 2, 3].map((num) => (
            <motion.div 
              key={num}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: num * 0.1 }}
              className="relative min-w-[80vw] md:min-w-[40vw] lg:min-w-[30vw] aspect-[3/4] snap-center flex-shrink-0"
            >
              <img 
                src={`/images/lookbook-${num}.png`} 
                alt={`Lookbook ${num}`} 
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. CONTACT / APPOINTMENT */}
      <section id="contact" className="py-32 px-6 bg-foreground text-background">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="text-primary text-sm uppercase tracking-widest mb-6">Private Viewing</p>
            <h2 className="font-serif text-4xl md:text-6xl mb-8">Request an Appointment</h2>
            <p className="text-background/60 font-light max-w-xl mx-auto mb-12">
              We welcome you to our Rome atelier for a private consultation. Experience the weight, warmth, and brilliance of our pieces in person.
            </p>
            
            <form className="max-w-md mx-auto space-y-6 text-left" onSubmit={(e) => e.preventDefault()}>
              <div>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full bg-transparent border-b border-background/30 pb-3 text-background focus:outline-none focus:border-primary transition-colors font-light placeholder:text-background/40"
                />
              </div>
              <div>
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full bg-transparent border-b border-background/30 pb-3 text-background focus:outline-none focus:border-primary transition-colors font-light placeholder:text-background/40"
                />
              </div>
              <div>
                <select className="w-full bg-transparent border-b border-background/30 pb-3 text-background focus:outline-none focus:border-primary transition-colors font-light appearance-none rounded-none cursor-pointer">
                  <option value="" className="bg-foreground text-background/40">Nature of Inquiry</option>
                  <option value="bridal" className="bg-foreground">Bridal Collection</option>
                  <option value="custom" className="bg-foreground">Custom Commission</option>
                  <option value="general" className="bg-foreground">General Viewing</option>
                </select>
              </div>
              <div className="pt-8 text-center">
                <button className="bg-background text-foreground px-12 py-4 uppercase tracking-widest text-xs font-medium hover:bg-primary hover:text-background transition-colors duration-500 w-full md:w-auto">
                  Submit Request
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Product Detail Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        <DialogContent className="max-w-4xl p-0 border-none bg-background rounded-none overflow-hidden">
          {selectedProduct && (
            <div className="flex flex-col md:flex-row h-[80vh] md:h-[600px]">
              <div className="w-full md:w-1/2 relative bg-secondary">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 p-10 flex flex-col justify-center overflow-y-auto">
                <p className="text-primary text-xs uppercase tracking-widest mb-4">{selectedProduct.category}</p>
                <DialogTitle className="font-serif text-3xl mb-2">{selectedProduct.name}</DialogTitle>
                <p className="text-xl font-serif text-foreground/80 mb-6">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(selectedProduct.price)}
                </p>
                
                <div className="space-y-6 flex-1">
                  <p className="text-sm font-light leading-relaxed text-foreground/80">
                    {selectedProduct.description}
                  </p>
                  
                  <div className="pt-6 border-t border-border">
                    <dl className="grid grid-cols-2 gap-y-4 text-sm">
                      <dt className="text-foreground/50 uppercase tracking-wider text-xs">Material</dt>
                      <dd className="font-medium text-right md:text-left">{selectedProduct.karat}</dd>
                      
                      {selectedProduct.clarity && (
                        <>
                          <dt className="text-foreground/50 uppercase tracking-wider text-xs">Clarity</dt>
                          <dd className="font-medium text-right md:text-left">{selectedProduct.clarity}</dd>
                        </>
                      )}
                      
                      {selectedProduct.carat && (
                        <>
                          <dt className="text-foreground/50 uppercase tracking-wider text-xs">Carat Weight</dt>
                          <dd className="font-medium text-right md:text-left">{selectedProduct.carat}</dd>
                        </>
                      )}
                    </dl>
                  </div>
                  
                  <div className="bg-secondary p-4 mt-6">
                    <p className="text-xs uppercase tracking-widest text-primary mb-2">Atelier Notes</p>
                    <p className="text-sm font-serif italic text-foreground/80">{selectedProduct.craftsmanship}</p>
                  </div>
                </div>

                <div className="mt-8 pt-6">
                  <button 
                    onClick={() => {
                      setSelectedProduct(null);
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full border border-foreground text-foreground py-4 uppercase tracking-widest text-xs hover:bg-foreground hover:text-background transition-colors duration-300"
                  >
                    Inquire About Piece
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
