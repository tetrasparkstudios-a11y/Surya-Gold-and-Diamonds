import { motion, useScroll, useTransform, useSpring, type Variants } from "framer-motion";
import { useRef } from "react";

const editorialReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] as const }
  }
};

const staggerReveal: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.16 } }
};

const cinematicIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] as const } }
};

export function MMTCSection() {
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const imgYSpring = useSpring(scrollYProgress, { stiffness: 44, damping: 24, mass: 1 });
  const imgY = useTransform(imgYSpring, [0, 1], ["-2%", "4%"]);

  return (
    <motion.section
      variants={cinematicIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="py-20 md:py-28 bg-background relative z-10 overflow-hidden isolate"
    >
      {/* Warm ambient gold tonal wash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,163,42,0.015),transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[40%] bg-[radial-gradient(ellipse_at_bottom_left,rgba(212,163,42,0.007),transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-5 md:px-8">
        <motion.div
          variants={staggerReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center"
        >
          {/* Text */}
          <div className="order-2 lg:order-1 lg:col-span-6 relative">
            {/* Watermark numeral behind text */}
            <span
              className="editorial-watermark absolute -top-10 -left-6 leading-none select-none pointer-events-none z-0"
              aria-hidden="true"
            >III</span>

            <div className="relative z-10 max-w-lg">
              <motion.p variants={editorialReveal} className="text-primary text-[10px] uppercase tracking-[0.28em] mb-5">
                Certified Partnership
              </motion.p>
              <motion.h2
                variants={editorialReveal}
                className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] text-foreground mb-7 leading-[1.18] tracking-wide"
              >
                Partnership with<br />
                MMTC-PAMP
              </motion.h2>
              <motion.p
                variants={editorialReveal}
                className="text-foreground/60 font-light leading-relaxed text-sm md:text-base mb-10"
              >
                We collaborate with MMTC-PAMP — India's foremost authority in gold refining. This partnership ensures that every gram of gold sourced meets the highest global benchmarks for purity and ethical supply.
              </motion.p>
              
              <motion.div variants={staggerReveal} className="space-y-4">
                {[
                  { label: "Gold Purity", value: "999.9 Fine Gold Guaranteed" },
                  { label: "Technology & Standards", value: "Swiss Quality, Indian Craft" },
                  { label: "Supply Chain", value: "Fully Certified & Audited" }
                ].map((spec, idx) => (
                  <motion.div
                    key={spec.label}
                    variants={editorialReveal}
                    className={`pt-4 flex justify-between items-center text-[11px] tracking-[0.16em] uppercase text-foreground/50 font-light ${
                      idx === 2 ? "border-y border-primary/5 pb-4" : "border-t border-primary/5"
                    }`}
                  >
                    <span>{spec.label}</span>
                    <span className="text-primary font-normal text-right">{spec.value}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Image with spring parallax */}
          <motion.div
            ref={imgRef}
            variants={editorialReveal}
            className="order-1 lg:order-2 lg:col-span-5 lg:col-start-8 relative aspect-[4/3] w-full group overflow-hidden"
          >
            <motion.img
              src="/images/mmtc-bar.png"
              alt="MMTC-PAMP Gold Bar"
              loading="lazy"
              decoding="async"
              style={{ y: imgY }}
              className="w-full h-full object-cover transition-transform duration-[2.8s] ease-out group-hover:scale-[1.04]"
            />
            {/* Warm tonal overlay on image */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(212,163,42,0.02),transparent_55%)] mix-blend-color-dodge pointer-events-none" />
            {/* Ring overlay */}
            <div className="absolute inset-0 ring-1 ring-inset ring-primary/8 group-hover:ring-primary/18 transition-all duration-1000 pointer-events-none" />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
