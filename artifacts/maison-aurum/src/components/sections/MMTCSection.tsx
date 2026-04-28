import { motion } from "framer-motion";

export function MMTCSection() {
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

  return (
    <section className="py-32 lg:py-40 bg-background relative z-10">
      <div className="w-[70%] mx-auto h-px bg-primary/20 mb-32"></div>
      
      <div className="container mx-auto px-6">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
        >
          <div className="order-2 lg:order-1">
            <motion.p variants={fadeInUp} className="text-primary text-xs uppercase tracking-widest mb-6">Partnership</motion.p>
            <motion.h2 variants={fadeInUp} className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-8 leading-[1.1]">
              Trusted Partnership with MMTC-PAMP
            </motion.h2>
            <motion.div variants={fadeInUp} className="space-y-6 text-foreground/70 font-light leading-relaxed text-lg">
              <p>
                We are proud partners of MMTC-PAMP, India's most trusted name in gold refining and purity. This collaboration reflects our commitment to authenticity, transparency, and global standards.
              </p>
            </motion.div>
          </div>

          <motion.div 
            variants={fadeInUp}
            className="order-1 lg:order-2 relative aspect-[4/3] w-full group overflow-hidden"
          >
            <img 
              src="/images/mmtc-bar.png" 
              alt="MMTC-PAMP Gold Bar" 
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-primary/10 group-hover:ring-primary/30 group-hover:shadow-[0_0_30px_rgba(212,163,42,0.15)] transition-all duration-700 pointer-events-none"></div>
          </motion.div>
        </motion.div>
      </div>

      <div className="w-[70%] mx-auto h-px bg-primary/20 mt-32"></div>
    </section>
  );
}
