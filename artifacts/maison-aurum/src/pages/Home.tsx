import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion, useScroll, useTransform, AnimatePresence, type Variants } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useProducts, Product } from "@/lib/productStore";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { FaWhatsapp } from "react-icons/fa";
import { MMTCSection } from "@/components/sections/MMTCSection";
import { InlineContactSection } from "@/components/sections/InlineContactSection";
import { FullCollectionModal } from "@/components/sections/FullCollectionModal";

/* ─── Shared animation variants ─── */
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
  }
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.11 } }
};

/* ─── Cursor glow (desktop only) ─── */
function CursorGlow() {
  const [pos, setPos]         = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const onMove = (e: MouseEvent) => { setPos({ x: e.clientX, y: e.clientY }); setVisible(true); };
    const onLeave = () => setVisible(false);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseleave", onLeave); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed pointer-events-none z-0 w-[480px] h-[480px] rounded-full"
          style={{
            left: pos.x - 240,
            top:  pos.y - 240,
            background: "radial-gradient(circle, rgba(212,163,42,0.045) 0%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />
      )}
    </AnimatePresence>
  );
}

/* ─── Smooth scroll to contact ─── */
function scrollToContact() {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ─── Trust pillars data ─── */
const PILLARS = [
  { title: "BIS Hallmarked",    desc: "Every piece of gold carries the official government hallmark of purity, ensuring absolute trust." },
  { title: "Certified Diamonds",desc: "Solitaires and precious stones rigorously certified by leading gemological institutes." },
  { title: "Lifetime Service",  desc: "Our relationship begins—not ends—with your piece. Complimentary care, lifelong." },
];

/* ════════════════════════════════════════════════════════════ */
export default function Home() {
  const products = useProducts();
  const [selectedProduct, setSelectedProduct]     = useState<Product | null>(null);
  const [fullCollectionOpen, setFullCollectionOpen] = useState(false);

  /* Hero parallax */
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY       = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden relative">
      <CursorGlow />
      <Navbar />

      {/* ── Floating WhatsApp ── */}
      <a
        href="https://wa.me/917093335656?text=Hello%20Surya%20Gold%20%26%20Diamonds%2C%20I%27d%20like%20to%20enquire%20about%20a%20piece."
        target="_blank" rel="noopener noreferrer"
        aria-label="Contact on WhatsApp"
        className="fixed bottom-5 right-5 z-50 w-11 h-11 rounded-full flex items-center justify-center
                   bg-[#c8a227] text-white shadow-[0_4px_18px_rgba(200,162,39,0.28)]
                   hover:scale-[1.06] transition-transform duration-500 pulse-ring"
      >
        <FaWhatsapp className="w-5 h-5" />
      </a>

      {/* ══════════════════════════════════════
          1. HERO — cinematic, full-bleed
         ══════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative h-[92svh] md:h-screen w-full flex flex-col justify-end pb-20 md:pb-28 px-5 md:px-12 overflow-hidden bg-foreground"
      >
        {/* Parallax image layer */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          {/* slow cinematic zoom via CSS keyframe */}
          <img
            src="/images/hero.png"
            alt="Surya Gold & Diamonds"
            className="hero-zoom w-full h-full object-cover opacity-55 mix-blend-luminosity"
          />
          {/* Depth gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/35 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/20 to-transparent" />
        </motion.div>

        {/* Hero copy */}
        <div className="relative z-10 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-primary text-[10px] md:text-xs uppercase tracking-[0.3em] mb-5 font-light"
          >
            Established 1985 &ensp;·&ensp; Hyderabad
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 44 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[clamp(2.4rem,7vw,5.5rem)] text-background font-medium leading-[1.08] tracking-wide [text-shadow:0_2px_32px_rgba(0,0,0,0.4)]"
          >
            Where Gold<br className="hidden sm:block" /> Becomes Legacy.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.25, ease: "easeOut" }}
            className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            <a
              href="#collections"
              className="nav-underline inline-block text-primary text-[10px] uppercase tracking-[0.3em] hover:text-background transition-colors duration-700"
            >
              Discover Collections
            </a>
            <span className="hidden sm:block w-12 h-px bg-primary/40" />
            <span className="hidden sm:block text-background/40 text-[10px] uppercase tracking-widest font-light">
              By Appointment Only
            </span>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 right-8 md:right-12 flex flex-col items-center gap-2 hidden md:flex"
        >
          <span className="text-[9px] uppercase tracking-[0.25em] text-background/40 -rotate-90 origin-center mb-6">Scroll</span>
          <div className="w-px h-10 bg-background/20" />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          2. ATELIER / PHILOSOPHY
         ══════════════════════════════════════ */}
      <section id="atelier" className="py-20 md:py-28 bg-background relative z-10">
        <div className="container mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center">

            {/* Text col */}
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 lg:col-start-2 order-2 lg:order-1"
            >
              <p className="text-primary text-[10px] uppercase tracking-widest mb-6">Our Heritage</p>
              <h2 className="font-serif text-[clamp(1.9rem,4vw,3.4rem)] text-foreground mb-8 leading-[1.18]">
                Quiet confidence,<br />
                <span className="italic text-foreground/65">generations of trust.</span>
              </h2>
              <div className="space-y-5 text-foreground/70 font-light leading-relaxed text-sm md:text-base">
                <p>
                  At Surya Gold &amp; Diamonds, we believe true luxury whispers. Our family has served the finest households of Hyderabad for decades, operating on the ancient rhythms of master goldsmiths.
                </p>
                <p>
                  Every piece is a dialogue between raw, natural brilliance and human intentionality. From bridal trousseaus to everyday elegance, we don't just craft jewellery — we forge heirlooms.
                </p>
              </div>
              <p className="mt-7 text-[10px] uppercase tracking-widest text-foreground/35 italic font-serif">
                Handcrafted in limited quantities · Since 1985
              </p>
              <div className="mt-9">
                <button
                  onClick={scrollToContact}
                  className="cta-shimmer inline-block bg-foreground text-background px-9 py-3.5 uppercase tracking-[0.22em] text-[11px] hover:bg-primary transition-colors duration-700"
                >
                  Book a Viewing
                </button>
              </div>
            </motion.div>

            {/* Image col */}
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative aspect-[3/4] w-full order-1 lg:order-2 lg:mt-16 group overflow-hidden"
            >
              <img
                src="/images/philosophy.png"
                alt="Master Craftsmanship"
                loading="lazy" decoding="async"
                className="w-full h-full object-cover transition-transform duration-[1.8s] ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-primary/10 group-hover:ring-primary/30 transition-all duration-700 pointer-events-none" />
              {/* Accent block */}
              <div className="absolute -right-3 -bottom-3 md:-right-6 md:-bottom-6 w-1/2 aspect-square bg-secondary -z-10" />
              <p className="absolute -left-5 top-1/2 -translate-y-1/2 -rotate-90 text-[9px] tracking-[0.3em] uppercase text-foreground/40 hidden md:block">
                BIS Hallmark Certified
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          3. MMTC-PAMP PARTNERSHIP
         ══════════════════════════════════════ */}
      <MMTCSection />

      {/* ══════════════════════════════════════
          4. COLLECTIONS — editorial grid
         ══════════════════════════════════════ */}
      <section id="collections" className="py-20 md:py-28 bg-secondary relative z-10">
        <div className="container mx-auto px-5 md:px-8">

          {/* Section header */}
          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="flex flex-col md:flex-row justify-between items-end mb-14 md:mb-16 gap-6"
          >
            <div className="max-w-lg">
              <p className="text-primary text-[10px] uppercase tracking-widest mb-4">The Collection</p>
              <h2 className="font-serif text-[clamp(1.9rem,4vw,3.2rem)] leading-tight">Curated Masterpieces</h2>
              <p className="text-foreground/55 font-light text-sm mt-4 leading-relaxed">
                An intimately selected presentation of our most sought-after works, embodying the pinnacle of Indian craftsmanship.
              </p>
            </div>
            <button
              onClick={() => setFullCollectionOpen(true)}
              className="nav-underline border-b border-foreground/50 text-foreground/70 pb-0.5 uppercase tracking-[0.22em] text-[10px] hover:text-primary hover:border-primary transition-all duration-500 shrink-0"
            >
              View Full Collection
            </button>
          </motion.div>

          {/* Editorial asymmetric grid:
              Desktop: col 1 is wide (span-2, landscape) | cols 2–3 are portrait
              Mobile: single column */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7"
          >
            {products.map((product, idx) => {
              const isFeature = idx === 0;
              return (
                <motion.div
                  key={product.id}
                  variants={fadeInUp}
                  onClick={() => setSelectedProduct(product)}
                  className={`group cursor-pointer flex flex-col ${isFeature ? "md:col-span-2" : ""}`}
                >
                  {/* Image container — feature gets wider/shorter ratio */}
                  <div className={`relative overflow-hidden bg-background mb-4 ${
                    isFeature ? "aspect-[3/2] md:aspect-[16/11]" : "aspect-[4/5]"
                  }`}>
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/4 transition-colors duration-700 z-10" />
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy" decoding="async"
                      className="w-full h-full object-cover transition-transform duration-[1.8s] ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-primary/0 group-hover:ring-primary/20 transition-all duration-700 pointer-events-none z-10" />
                    {/* Hover label */}
                    <div className="absolute bottom-0 left-0 right-0 px-5 py-4 bg-gradient-to-t from-background/75 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                      <span className="text-[10px] uppercase tracking-widest text-foreground/80">View Piece</span>
                    </div>
                  </div>

                  {/* Caption */}
                  <p className="text-[10px] uppercase tracking-widest text-primary mb-1.5">{product.category}</p>
                  <h3 className="font-serif text-xl md:text-2xl group-hover:text-primary transition-colors duration-500">
                    {product.name}
                  </h3>
                  <p className="text-[9px] uppercase tracking-widest text-foreground/40 mt-2">Available upon inquiry</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          5. TRUST PILLARS
         ══════════════════════════════════════ */}
      <section className="py-20 md:py-24 px-5 md:px-8 bg-background relative z-10">
        <div className="w-16 h-px bg-primary/25 mx-auto mb-16"></div>
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10 text-center">
            {PILLARS.map((pillar, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeInUp}
                className="space-y-4"
              >
                <div className="w-10 h-10 mx-auto border border-primary/30 flex items-center justify-center rounded-full text-primary mb-5">
                  <span className="font-serif text-lg italic">{i + 1}</span>
                </div>
                <h3 className="font-serif text-2xl">{pillar.title}</h3>
                <p className="text-foreground/55 font-light text-sm max-w-[22ch] mx-auto leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="w-16 h-px bg-primary/25 mx-auto mt-16"></div>
      </section>

      {/* ══════════════════════════════════════
          6. LOOKBOOK — editorial double-spread
         ══════════════════════════════════════ */}
      <section id="lookbook" className="py-20 md:py-28 bg-background relative z-10">
        <div className="container mx-auto px-5 md:px-8">

          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mb-14 md:mb-16"
          >
            <p className="text-primary text-[10px] uppercase tracking-widest mb-3">Editorial</p>
            <h2 className="font-serif text-[clamp(1.9rem,4vw,3.4rem)]">The Lookbook</h2>
            <p className="text-foreground/50 font-light text-sm mt-3 max-w-sm">A glimpse into timeless elegance.</p>
          </motion.div>

          {/* Spread 1: wide image left + text right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 items-center mb-16 md:mb-20">
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 relative aspect-[16/10] w-full group overflow-hidden"
            >
              <img
                src="/images/lookbook-1.png"
                alt="Bridal Collection"
                loading="lazy" decoding="async"
                className="w-full h-full object-cover transition-transform duration-[1.8s] ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-700 pointer-events-none" />
              <div className="absolute inset-0 ring-1 ring-inset ring-primary/10 group-hover:ring-primary/25 transition-all duration-700 pointer-events-none" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 lg:col-start-9"
            >
              <p className="text-primary text-[10px] uppercase tracking-widest mb-4">Bridal</p>
              <h2 className="font-serif text-3xl md:text-4xl mb-5 leading-tight">
                The Bridal<br /><span className="italic text-primary">Trousseau</span>
              </h2>
              <p className="text-foreground/60 font-light leading-relaxed mb-7 text-sm md:text-base">
                Weighty, intricate, and deeply rooted in tradition. Our bridal pieces are designed to be the centrepiece of the most important day of your life.
              </p>
              <button
                onClick={scrollToContact}
                className="nav-underline text-[10px] uppercase tracking-widest text-foreground hover:text-primary transition-colors flex items-center gap-4"
              >
                <span className="w-7 h-px bg-foreground shrink-0"></span>
                Enquire about bridal
              </button>
            </motion.div>
          </div>

          {/* Spread 2: text left + tall image right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 lg:col-start-2 order-2 lg:order-1"
            >
              <p className="text-primary text-[10px] uppercase tracking-widest mb-4">Everyday</p>
              <h2 className="font-serif text-3xl md:text-4xl mb-5 leading-tight">
                Everyday<br /><span className="italic text-primary">Brilliance</span>
              </h2>
              <p className="text-foreground/60 font-light leading-relaxed mb-7 text-sm md:text-base">
                For the moments between the milestones. Delicate diamond settings and minimalist gold forms that elevate the everyday.
              </p>
              <button
                onClick={scrollToContact}
                className="nav-underline text-[10px] uppercase tracking-widest text-foreground hover:text-primary transition-colors flex items-center gap-4"
              >
                <span className="w-7 h-px bg-foreground shrink-0"></span>
                Explore everyday pieces
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 lg:col-start-7 relative aspect-[4/5] w-full order-1 lg:order-2 group overflow-hidden"
            >
              <img
                src="/images/lookbook-2.png"
                alt="Everyday Collection"
                loading="lazy" decoding="async"
                className="w-full h-full object-cover transition-transform duration-[1.8s] ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-700 pointer-events-none" />
              <div className="absolute inset-0 ring-1 ring-inset ring-primary/10 group-hover:ring-primary/25 transition-all duration-700 pointer-events-none" />
            </motion.div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════
          7. CONTACT (inline — no separate page)
         ══════════════════════════════════════ */}
      <InlineContactSection />

      <Footer />

      {/* ── Product detail modal ── */}
      <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        <DialogContent className="max-w-5xl p-0 border-none bg-background rounded-none overflow-hidden">
          {selectedProduct && (
            <div className="flex flex-col lg:flex-row h-[88vh] lg:h-[700px]">
              {/* Image panel */}
              <div className="w-full lg:w-1/2 relative bg-secondary order-1 h-56 md:h-72 lg:h-full shrink-0">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details panel */}
              <div className="w-full lg:w-1/2 p-7 lg:p-12 flex flex-col justify-center overflow-y-auto order-2 hide-scrollbar">
                <p className="text-primary text-[10px] uppercase tracking-widest mb-3">
                  {selectedProduct.category}
                </p>
                <DialogTitle className="font-serif text-3xl lg:text-4xl mb-2">
                  {selectedProduct.name}
                </DialogTitle>
                <p className="text-[10px] tracking-widest uppercase text-foreground/40 mb-7">
                  Available upon request
                </p>

                <div className="space-y-7 flex-1">
                  <p className="text-sm font-light leading-relaxed text-foreground/75">
                    {selectedProduct.description}
                  </p>

                  <div className="pt-6 border-t border-border/40">
                    <dl className="grid grid-cols-2 gap-y-5 text-sm">
                      <dt className="text-foreground/45 uppercase tracking-wider text-[10px]">Material</dt>
                      <dd className="font-medium text-right lg:text-left">{selectedProduct.karat}</dd>
                      {selectedProduct.clarity && (
                        <>
                          <dt className="text-foreground/45 uppercase tracking-wider text-[10px]">Clarity</dt>
                          <dd className="font-medium text-right lg:text-left">{selectedProduct.clarity}</dd>
                        </>
                      )}
                    </dl>
                  </div>

                  <div className="bg-secondary/50 p-5">
                    <p className="text-[10px] uppercase tracking-widest text-primary mb-3">Atelier Notes</p>
                    <p className="text-sm font-serif italic text-foreground/75 leading-relaxed">
                      {selectedProduct.craftsmanship}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-border/30 flex flex-col sm:flex-row gap-3">
                  <a
                    href={`https://wa.me/917093335656?text=I'm%20interested%20in%20the%20${encodeURIComponent(selectedProduct.name)}.`}
                    target="_blank" rel="noopener noreferrer"
                    className="cta-shimmer flex-1 bg-primary text-primary-foreground py-3.5 uppercase tracking-[0.22em] text-[11px] text-center hover:bg-primary/90 transition-colors duration-700"
                  >
                    Inquire via WhatsApp
                  </a>
                  <button
                    onClick={() => {
                      setSelectedProduct(null);
                      setTimeout(scrollToContact, 250);
                    }}
                    className="cta-shimmer flex-1 border border-primary text-primary py-3.5 uppercase tracking-[0.22em] text-[11px] hover:bg-primary/5 transition-colors duration-700"
                  >
                    Book a Private Viewing
                  </button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ── Full collection overlay ── */}
      <FullCollectionModal
        open={fullCollectionOpen}
        onOpenChange={setFullCollectionOpen}
        products={products}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />
    </div>
  );
}
