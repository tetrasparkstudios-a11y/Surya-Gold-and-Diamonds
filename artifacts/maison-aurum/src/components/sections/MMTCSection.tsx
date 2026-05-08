import { motion, type Variants } from "framer-motion";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
  }
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.14 } }
};

export function MMTCSection() {
  return (
    <section className="py-20 md:py-24 bg-background relative z-10">
      {/* Top divider */}
      <div className="w-20 h-px bg-primary/30 mx-auto mb-16 md:mb-20"></div>

      <div className="container mx-auto px-5 md:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Text */}
          <div className="order-2 lg:order-1">
            <motion.p variants={fadeInUp} className="text-primary text-[10px] uppercase tracking-widest mb-5">
              Certified Partnership
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-[1.15]"
            >
              Trusted Partnership<br />
              with MMTC-PAMP
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-foreground/65 font-light leading-relaxed text-base md:text-lg mb-8 max-w-md"
            >
              We are proud partners of MMTC-PAMP — India's most trusted name in gold refining and purity. This collaboration reflects our commitment to authenticity, transparency, and global standards.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col gap-3">
              {[
                "999.9 fine gold purity, every time",
                "Swiss technology, Indian heritage",
                "Fully government-certified supply chain",
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <span className="mt-[7px] w-4 h-px shrink-0 bg-primary/60"></span>
                  <p className="text-sm font-light text-foreground/70 tracking-wide">{point}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            variants={fadeInUp}
            className="order-1 lg:order-2 relative aspect-[4/3] w-full group overflow-hidden"
          >
            <img
              src="/images/mmtc-bar.png"
              alt="MMTC-PAMP Gold Bar"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-[1.8s] ease-out group-hover:scale-[1.04]"
            />
            {/* Gold ring overlay */}
            <div className="absolute inset-0 ring-1 ring-inset ring-primary/10 group-hover:ring-primary/30 transition-all duration-700 pointer-events-none"></div>
            {/* Corner accent */}
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-primary/30 pointer-events-none"></div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom divider */}
      <div className="w-20 h-px bg-primary/30 mx-auto mt-16 md:mt-20"></div>
    </section>
  );
}
