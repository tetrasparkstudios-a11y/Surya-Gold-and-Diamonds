import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { motion, type Variants } from "framer-motion";
import { Product } from "@/lib/productStore";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 }
  }
};

/**
 * FullCollectionModal
 * Full-screen overlay listing every product in a generous editorial grid.
 * Replaces the "View Full Collection" link so the user never leaves the
 * scrolling experience.
 */
export function FullCollectionModal({ open, onOpenChange, products, onSelectProduct }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-none w-screen h-screen sm:rounded-none p-0 border-none bg-background overflow-hidden"
      >
        <DialogTitle className="sr-only">Full Collection</DialogTitle>

        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="shrink-0 border-b border-border/40 bg-background/95 backdrop-blur-sm">
            <div className="container mx-auto px-6 md:px-10 py-6 md:py-8 flex items-center justify-between">
              <div>
                <p className="text-primary text-[10px] md:text-xs uppercase tracking-widest mb-1.5">The House of Surya</p>
                <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl">The Full Collection</h2>
              </div>
              {/* The Dialog primitive renders its own close X in the top-right;
                  we leave space for it here. */}
              <div className="w-11 h-11" aria-hidden="true" />
            </div>
          </div>

          {/* Grid */}
          <div className="flex-1 overflow-y-auto">
            <div className="container mx-auto px-6 md:px-10 py-12 md:py-16">
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
                    className="group text-left flex flex-col"
                  >
                    <div className="relative aspect-[4/5] mb-5 overflow-hidden bg-secondary">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 ring-1 ring-inset ring-primary/0 group-hover:ring-primary/30 group-hover:shadow-[0_0_24px_rgba(212,163,42,0.12)] transition-all duration-700 pointer-events-none"></div>
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-700"></div>
                    </div>
                    <p className="text-[10px] uppercase tracking-widest text-primary mb-2">{product.category}</p>
                    <h3 className="font-serif text-xl md:text-2xl group-hover:text-primary transition-colors duration-500">
                      {product.name}
                    </h3>
                    <p className="text-[10px] uppercase tracking-widest text-foreground/40 mt-2">
                      Available upon request
                    </p>
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
