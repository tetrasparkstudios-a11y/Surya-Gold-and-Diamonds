import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion, type Variants } from "framer-motion";
import { Product } from "@/lib/productStore";
import { X } from "lucide-react";
import logoMark from "@assets/Screenshot_2025-03-27-22-34-55-57_965bbf4d18d205f782c6b8409c57_1777329866046.jpg";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

// Snappy, clean transitions without heavy blur or aggressive vertical translation
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.02, delayChildren: 0.04 }
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
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        {/* 1. Background Overlay (z-index 100) — Soft background shadow, not pitch black */}
        <DialogPrimitive.Overlay 
          className="fixed inset-0 bg-black/55 backdrop-blur-[6px] transition-all duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          style={{ zIndex: 100 }}
        />

        {/* 2. Modal Container (z-index 110) — 100vw/100vh full-screen wrapper */}
        <DialogPrimitive.Content
          className="fixed inset-0 bg-background flex flex-col focus:outline-none"
          style={{ zIndex: 110, width: "100vw", height: "100vh" }}
        >
          <DialogPrimitive.Title className="sr-only">The Full Collection</DialogPrimitive.Title>

          {/* 3. Navigation / Header (z-index 130) — Locked above scroll context */}
          <div 
            className="shrink-0 border-b border-primary/10 bg-background/95 backdrop-blur-md relative"
            style={{ zIndex: 130 }}
          >
            <div className="container mx-auto px-5 md:px-8 py-5 md:py-6 flex items-center justify-between">
              
              {/* Brand mark */}
              <div className="flex items-center gap-3.5">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-[2px] bg-[#fafaf9] shadow-sm border border-black/5 overflow-hidden shrink-0">
                  <img
                    src={logoMark}
                    alt="Surya Gold & Diamonds"
                    className="w-7 h-7 object-contain"
                  />
                </span>
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
            className="flex-1 overflow-y-auto overflow-x-hidden relative"
            style={{ zIndex: 120 }}
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

            <div className="container mx-auto px-5 md:px-8 py-10 md:py-14 relative z-10">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate={open ? "visible" : "hidden"}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10"
              >
                {products.map((product) => (
                  <motion.button
                    key={product.id}
                    variants={fadeInUp}
                    onClick={() => {
                      onSelectProduct(product);
                      onOpenChange(false);
                    }}
                    className="group text-left flex flex-col hover:translate-y-[-2px] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none"
                  >
                    <div className="relative aspect-[4/5] mb-5 overflow-hidden bg-background shadow-[0_4px_20px_rgba(0,0,0,0.02)] group-hover:shadow-[0_20px_50px_rgba(212,163,42,0.04),0_10px_30px_rgba(0,0,0,0.03)] transition-shadow duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-[3.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                      />
                      
                      {/* Photographic grain overlay */}
                      <div className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay opacity-[0.008]"
                        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }}
                      />

                      {/* Soft Vignette */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_65%,rgba(0,0,0,0.08)_100%)] pointer-events-none z-10 opacity-60 group-hover:opacity-85 transition-opacity duration-1000" />

                      {/* Warm Candlelight highlight */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,163,42,0.025)_0%,transparent_55%)] mix-blend-color-dodge pointer-events-none z-10" />

                      {/* Permanent subtle bottom vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none z-10" />
                      {/* Hover vignette deepens */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-[900ms] ease-out pointer-events-none z-10" />
                      <div className="absolute inset-0 ring-1 ring-inset ring-foreground/5 group-hover:ring-primary/10 transition-all duration-700 pointer-events-none z-10" />

                      {/* Hover reveal overlay — slow, atmospheric view hint, no text overcrowding */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] z-20">
                        <span className="text-[9px] uppercase tracking-[0.32em] text-white bg-black/45 backdrop-blur-md px-6 py-2.5 rounded-none border border-white/10">View Piece</span>
                      </div>
                    </div>
                    
                    {/* Caption */}
                    <div className="min-h-[5rem]">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-1.5">{product.category}</p>
                      <h3 className="font-serif text-xl md:text-[1.35rem] text-foreground transition-colors duration-500 group-hover:text-primary leading-snug line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-[9px] uppercase tracking-widest text-foreground/30 mt-2">Available upon inquiry</p>
                    </div>
                  </motion.button>
                ))}
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
