import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion, type Variants } from "framer-motion";
import { Product } from "@/lib/productStore";
import { X } from "lucide-react";
import logoMark from "@assets/surya-s-monogram.png";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

// Snappy, clean transitions without heavy blur or aggressive vertical translation
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 }
  }
};

/**
 * FullCollectionModal
 * Clean rebuild bypassing customized dialog wrappers to enforce strict z-index stacking:
 *   - Background Overlay: z-index 100
 *   - Modal Container: z-index 110
 *   - Content Grid Area: z-index 120
 *   - Header/Close Button: z-index 130
 */
export function FullCollectionModal({ open, onOpenChange, products, onSelectProduct }: Props) {
  const featured = products[0];
  const gallery = products.slice(1);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        {/* 1. Background Overlay (z-index 100) — Soft background shadow fading in */}
        <DialogPrimitive.Overlay 
          className="fixed inset-0 bg-black/60 backdrop-blur-[8px] transition-all duration-[1000ms] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          style={{ zIndex: 100 }}
        />

        {/* 2. Modal Container (z-index 110) — 100vw/100vh full-screen wrapper sliding up */}
        <DialogPrimitive.Content
          className="fixed inset-0 bg-background flex flex-col focus:outline-none transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-bottom-12 data-[state=open]:slide-in-from-bottom-12"
          style={{ zIndex: 110, width: "100vw", height: "100vh" }}
        >
          <DialogPrimitive.Title className="sr-only">The House Collection</DialogPrimitive.Title>

          {/* 3. Navigation / Header (z-index 130) — Locked above scroll context */}
          <div 
            className="shrink-0 border-b border-primary/10 bg-background/95 backdrop-blur-md relative"
            style={{ zIndex: 130 }}
          >
            <div className="container mx-auto px-5 md:px-8 py-5 md:py-6 flex items-center justify-between">
              
              {/* Brand mark */}
              <div className="flex items-center gap-3.5">
                <img
                  src={logoMark}
                  alt="Surya Gold & Diamonds"
                  className="h-[38px] w-auto object-contain shrink-0"
                />
                <span className="font-serif text-[12px] md:text-sm tracking-[0.26em] uppercase text-foreground font-light">
                  SURYA GOLD <span className="text-primary">&amp;</span> DIAMONDS
                </span>
              </div>

              {/* Title / Gallery indication (Center) */}
              <div className="hidden lg:flex items-center gap-4">
                <span className="w-12 h-px bg-primary/20" />
                <p className="text-[10px] uppercase tracking-[0.35em] text-primary/85 font-serif italic">Private Gallery</p>
                <span className="w-12 h-px bg-primary/20" />
              </div>

              {/* Close Button (Right, z-index 130) */}
              <DialogPrimitive.Close className="group text-foreground/60 hover:text-primary transition-colors flex items-center gap-2.5 focus:outline-none">
                <span className="text-[9px] uppercase tracking-[0.3em] font-light">Close Gallery</span>
                <div className="w-8 h-8 rounded-full border border-border group-hover:border-primary/45 flex items-center justify-center transition-colors duration-500">
                  <X className="w-3.5 h-3.5 transition-transform duration-700 group-hover:rotate-90" />
                </div>
              </DialogPrimitive.Close>

            </div>
          </div>

          {/* 4. Content Grid Scroll Area (z-index 120) */}
          <div 
            data-lenis-prevent
            className="flex-1 overflow-y-auto overflow-x-hidden relative"
            style={{ zIndex: 120, overscrollBehavior: "contain", WebkitOverflowScrolling: "touch" }}
          >
            {/* Near-imperceptible photographic grain overlay (behind grid, z-0) */}
            <div className="pointer-events-none absolute inset-0 z-0 mix-blend-overlay opacity-[0.006]"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }}
            />

            {/* Very light Vignette */}
            <div className="pointer-events-none absolute inset-0 z-0 opacity-20"
              style={{ background: "radial-gradient(ellipse at center, transparent 70%, rgba(0,0,0,0.08) 100%)" }}
            />

            {/* Ambient warm gold wash — top-right, extremely subtle */}
            <div className="pointer-events-none absolute top-0 right-0 w-[50vw] h-[50vh] bg-[radial-gradient(ellipse_at_top_right,rgba(212,163,42,0.015),transparent_70%)] z-0" />

            <div className="container mx-auto px-5 md:px-8 py-16 md:py-24 relative z-10">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate={open ? "visible" : "hidden"}
              >
                {/* ── Editorial Introduction ── */}
                <motion.div variants={fadeInUp} className="mb-24 md:mb-32 text-center max-w-2xl mx-auto">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-primary/70 mb-5 font-medium">Private Exhibition</p>
                  <h2 className="font-serif text-4xl md:text-[3.2rem] text-foreground mb-8 font-light tracking-wide leading-[1.1]">The House Collection</h2>
                  <p className="text-foreground/55 font-light leading-[1.8] text-[14.5px]">
                    A curated exhibition of our most exceptional creations. Handcrafted in our Hyderabad atelier, each piece is a testament to generations of uncompromising artistry.
                  </p>
                </motion.div>

                {/* ── Featured Masterpiece Section ── */}
                {featured && (
                  <motion.div variants={fadeInUp} className="mb-24 md:mb-32">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                      <div className="lg:col-span-7">
                        <button
                          onClick={() => {
                            onSelectProduct(featured);
                            onOpenChange(false);
                          }}
                          className="group relative w-full aspect-[4/3] md:aspect-[3/2] overflow-hidden bg-background shadow-[0_4px_20px_rgba(0,0,0,0.02)] focus:outline-none flex"
                        >
                          <img
                            src={featured.image}
                            alt={featured.name}
                            loading="lazy"
                            className="w-full h-full object-cover image-luxury-grade transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                          />
                          {/* Grain overlay */}
                          <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.008]"
                            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }}
                          />
                          <div className="absolute inset-0 ring-1 ring-inset ring-foreground/5 group-hover:ring-primary/10 transition-all duration-[800ms] pointer-events-none" />
                          
                          {/* Hover reveal overlay */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] z-20">
                            <span className="text-[9px] uppercase tracking-[0.32em] text-white bg-black/45 backdrop-blur-md px-6 py-2.5 rounded-none border border-white/10">View Masterpiece</span>
                          </div>
                        </button>
                      </div>
                      <div className="lg:col-span-5 flex flex-col justify-center">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-primary mb-3">Featured Masterpiece</span>
                        <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-6 font-normal leading-[1.15]">{featured.name}</h3>
                        <div className="mb-6">
                          <p className="text-[10px] uppercase tracking-[0.25em] text-foreground/50">{featured.karat} <span className="mx-2 text-primary/30">|</span> {featured.clarity}</p>
                        </div>
                        <p className="text-foreground/60 leading-[1.8] font-light text-[14.5px] mb-8 max-w-md">{featured.description}</p>
                        <div className="w-12 h-px bg-primary/30 mb-8" />
                        <p className="text-[11px] uppercase tracking-[0.2em] text-foreground/45 leading-[1.6] max-w-sm">{featured.craftsmanship}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ── Collection Grid ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-14 gap-x-10">
                  {gallery.map((product) => (
                    <motion.button
                      key={product.id}
                      variants={fadeInUp}
                      onClick={() => {
                        onSelectProduct(product);
                        onOpenChange(false);
                      }}
                      className="group text-left flex flex-col focus:outline-none"
                    >
                      <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-background shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover image-luxury-grade transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                        />
                        
                        {/* Grain & Lighting Overlays */}
                        <div className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay opacity-[0.008]"
                          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }}
                        />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_65%,rgba(0,0,0,0.08)_100%)] pointer-events-none z-10 opacity-60 group-hover:opacity-85 transition-opacity duration-[800ms]" />
                        <div className="absolute inset-0 ring-1 ring-inset ring-foreground/5 group-hover:ring-primary/10 transition-all duration-[800ms] pointer-events-none z-10" />

                        {/* Hover reveal overlay */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] z-20">
                          <span className="text-[9px] uppercase tracking-[0.32em] text-white bg-black/45 backdrop-blur-md px-6 py-2.5 rounded-none border border-white/10">View Piece</span>
                        </div>
                      </div>
                      
                      {/* Caption with Metadata */}
                      <div className="min-h-[7rem] flex flex-col">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-2 transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[2px]">
                          {product.category}
                        </p>
                        <h3 className="font-serif text-xl md:text-[1.35rem] text-foreground transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[2px] group-hover:text-primary leading-snug line-clamp-2 mb-3">
                          {product.name}
                        </h3>
                        <p className="text-[9px] uppercase tracking-[0.2em] text-foreground/45 mb-2 transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[2px]">
                          {product.karat} <span className="mx-1.5 text-primary/30">|</span> {product.clarity}
                        </p>
                        <p className="text-[10px] uppercase tracking-[0.15em] text-foreground/35 leading-[1.6] transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[2px] line-clamp-2 mt-auto">
                          {product.craftsmanship}
                        </p>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* ── Luxury Closing Frame ── */}
                <motion.div variants={fadeInUp} className="mt-32 pt-20 border-t border-primary/20 text-center pb-8 md:pb-16">
                  <h4 className="font-serif text-[15px] tracking-[0.22em] uppercase text-foreground mb-4 font-light">Surya Gold <span className="text-primary">&amp;</span> Diamonds</h4>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-foreground/40 mb-10 font-medium">Crafted in Hyderabad since 1985</p>
                  <div className="w-16 h-px bg-primary/40 mx-auto mb-10" />
                  <p className="font-serif italic text-foreground/60 text-[1.1rem] tracking-wide">"Each piece begins in silence and becomes a legacy."</p>
                </motion.div>

              </motion.div>

              {products.length === 0 && (
                <div className="text-center py-32">
                  <p className="font-serif italic text-foreground/50">The collection is being prepared.</p>
                </div>
              )}
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
