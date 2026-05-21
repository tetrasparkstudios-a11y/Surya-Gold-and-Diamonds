import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion, useScroll, useTransform, useSpring, AnimatePresence, type Variants } from "framer-motion";
import { useRef, useState } from "react";
import { useProducts, Product } from "@/lib/productStore";
import { FaWhatsapp } from "react-icons/fa";
import { MMTCSection } from "@/components/sections/MMTCSection";
import { InlineContactSection } from "@/components/sections/InlineContactSection";
import { FullCollectionModal } from "@/components/sections/FullCollectionModal";
import { X } from "lucide-react";

/* ─── Shared animation variants ─── */

// Standard fade-up — slow, deliberate
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] }
  }
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.14 } }
};

// Editorial reveal — opacity + gentle lift, slower cinematic pacing
const editorialReveal: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] }
  }
};

// Cinematic Clip-Path Text Reveal for headings/main titles
const textClipReveal: Variants = {
  hidden: {
    clipPath: "inset(100% 0 0 0)",
    y: 35,
    opacity: 0
  },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    y: 0,
    opacity: 1,
    transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] }
  }
};

// Custom slow reveals for the Hero Section
const heroTitleReveal: Variants = {
  hidden: {
    clipPath: "inset(100% 0 0 0)",
    y: 40,
    opacity: 0
  },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    y: 0,
    opacity: 1,
    transition: { duration: 2.2, ease: [0.16, 1, 0.3, 1], delay: 0.6 }
  }
};

const heroSubtitleReveal: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }
  }
};

const heroCtaReveal: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 1.1 }
  }
};

const staggerReveal: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.16 } }
};

// Section-level cinematic entrance — very slow, immersive
const cinematicSection: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] }
  }
};

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

interface ProductCardProps {
  product: Product;
  isFeature: boolean;
  onClick: () => void;
}

const imgHoverVariants = {
  rest: { scale: 1.12 },
  hover: { scale: 1.18 }
};

function ProductCard({ product, isFeature, onClick }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  const ySmooth = useSpring(scrollYProgress, { stiffness: 45, damping: 25 });
  // Map parallax travel: stronger premium parallax (10-14%). Total travel: 12% (from -6% to 6%)
  const yImage = useTransform(ySmooth, [0, 1], ["-6%", "6%"]);

  return (
    <motion.div
      ref={cardRef}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] }
        },
        hover: {
          y: -6,
          scale: 1.008,
          transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
        }
      }}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-60px" }}
      onClick={onClick}
      className={`group cursor-pointer flex flex-col overflow-hidden isolate ${isFeature ? "md:col-span-2" : ""}`}
      style={{ willChange: "transform" }}
    >
      {/* Image container */}
      <div className={`relative overflow-hidden bg-background mb-5
        shadow-[0_4px_20px_rgba(0,0,0,0.02)]
        group-hover:shadow-[0_40px_80px_rgba(212,163,42,0.06),0_12px_24px_rgba(0,0,0,0.05)]
        transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isFeature ? "aspect-[3/2] md:aspect-[16/11]" : "aspect-[4/5]"
      }`}>
        <motion.img
          src={product.image}
          alt={product.name}
          loading="lazy" decoding="async"
          style={{ y: yImage }}
          variants={imgHoverVariants}
          initial="rest"
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-x-0 -top-[10%] w-full h-[120%] object-cover"
        />

        {/* Near-imperceptible photographic grain overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay opacity-[0.012]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }}
        />

        {/* Candlelight warm highlight — corner catch-light */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(212,163,42,0.02)_0%,transparent_50%)] mix-blend-color-dodge pointer-events-none z-10 transition-opacity duration-[1200ms] opacity-60 group-hover:opacity-100" />

        {/* Soft radial vignette — deepens on hover */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(0,0,0,0.12)_100%)] pointer-events-none z-10 opacity-60 group-hover:opacity-90 transition-opacity duration-[1200ms]" />

        {/* Bottom depth gradient — permanent */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-transparent pointer-events-none z-10" />
        {/* Hover depth shadow lift */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/42 via-black/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-[1000ms] ease-out pointer-events-none z-10" />
        <div className="absolute inset-0 ring-1 ring-inset ring-foreground/4 group-hover:ring-primary/12 transition-all duration-[1200ms] pointer-events-none z-10" />

        {/* Hover reveal — slow, cinematic view hint */}
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] z-20">
          <span className="text-[9px] uppercase tracking-[0.32em] text-white bg-black/40 backdrop-blur-md px-6 py-2.5 rounded-none border border-white/8 translate-y-2 group-hover:translate-y-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]">View Piece</span>
        </div>
      </div>

      {/* Caption — fixed height to keep grid rhythm */}
      <div className="min-h-[5rem] relative z-20">
        <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-1.5 transition-transform duration-700 ease-out group-hover:-translate-y-1">{product.category}</p>
        <h3 className="font-serif text-xl md:text-[1.35rem] text-foreground transition-all duration-700 ease-out group-hover:-translate-y-0.5 group-hover:text-primary leading-snug line-clamp-2">
          {product.name}
        </h3>
        <p className="text-[9px] uppercase tracking-widest text-foreground/30 mt-2">Available upon inquiry</p>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const products = useProducts();
  const [selectedProduct, setSelectedProduct]     = useState<Product | null>(null);
  const [fullCollectionOpen, setFullCollectionOpen] = useState(false);

  /* Hero parallax — spring-smoothed for cinematic feel (subtle 5% travel) */
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroProgressSmooth = useSpring(heroProgress, { stiffness: 38, damping: 22, mass: 1 });
  const heroY       = useTransform(heroProgressSmooth, [0, 1], ["-2.5%", "2.5%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.75], [1, 0]);

  /* Atelier parallax — spring-smoothed (subtle 6% travel) */
  const atelierImgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: atelierProgress } = useScroll({ target: atelierImgRef, offset: ["start end", "end start"] });
  const atelierProgressSmooth = useSpring(atelierProgress, { stiffness: 42, damping: 24, mass: 1 });
  const atelierY = useTransform(atelierProgressSmooth, [0, 1], ["-3%", "3%"]);

  /* Campaign spread 1 parallax (Bridal Collection: subtle 7% travel) */
  const spread1Ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: spread1Progress } = useScroll({ target: spread1Ref, offset: ["start end", "end start"] });
  const spread1ProgressSmooth = useSpring(spread1Progress, { stiffness: 42, damping: 22, mass: 1 });
  const spread1Y = useTransform(spread1ProgressSmooth, [0, 1], ["-3.5%", "3.5%"]);

  /* Campaign spread 2 parallax (Campaign everyday: 14% travel) */
  const spread2ImgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: spread2Progress } = useScroll({ target: spread2ImgRef, offset: ["start end", "end start"] });
  const spread2ProgressSmooth = useSpring(spread2Progress, { stiffness: 44, damping: 24, mass: 1 });
  const spread2Y = useTransform(spread2ProgressSmooth, [0, 1], ["-7%", "7%"]);

  /* Campaign spread 3 parallax — craftsmanship (Campaign atelier: 13% travel) */
  const spread3Ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: spread3Progress } = useScroll({ target: spread3Ref, offset: ["start end", "end start"] });
  const spread3SmoothProgress = useSpring(spread3Progress, { stiffness: 38, damping: 20, mass: 1 });
  const spread3ImageY = useTransform(spread3SmoothProgress, [0, 1], ["-6.5%", "6.5%"]);
  const spread3TextY  = useTransform(spread3SmoothProgress, [0, 1], ["3%", "-3%"]);
  const spread3RightY = useTransform(spread3SmoothProgress, [0, 1], ["4%", "-4%"]);

  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden relative">
      {/* ── Global cinematic film grain + edge vignette ── */}
      <div className="pointer-events-none fixed inset-0 z-[99999] mix-blend-overlay opacity-[0.032]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }}
      />
      <div className="pointer-events-none fixed inset-0 z-[99998]"
        style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.22) 100%)" }}
      />
      <Navbar />

      {/* ── Floating WhatsApp ── */}
      <a
        href="https://wa.me/917093335656?text=Hello%20Surya%20Gold%20%26%20Diamonds%2C%20I%27d%20like%20to%20enquire%20about%20a%20piece."
        target="_blank" rel="noopener noreferrer"
        aria-label="Contact on WhatsApp"
        className="fixed bottom-6 right-6 md:right-8 z-50 w-11 h-11 rounded-full flex items-center justify-center
                   bg-background/80 backdrop-blur-md text-primary border border-primary/25 shadow-[0_4px_24px_rgba(212,163,42,0.12)]
                   hover:border-primary/60 hover:shadow-[0_4px_32px_rgba(212,163,42,0.22)] hover:scale-[1.05]
                   transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] pulse-ring"
      >
        <FaWhatsapp className="w-5 h-5 animate-pulse" style={{ animationDuration: '4s' }} />
      </a>

      {/* ══════════════════════════════════════
          1. HERO — cinematic, full-bleed
         ══════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative h-[92svh] md:h-screen w-full flex flex-col justify-end pb-20 md:pb-28 overflow-hidden bg-foreground isolate"
      >
        {/* Parallax image layer — spring-smoothed */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-x-0 -top-[3%] h-[106%] z-0 bg-black"
        >
          {/* Cinematic zoom then breathing scale — alive hero */}
          <img
            src="/images/hero.png"
            alt="Surya Gold & Diamonds"
            className="hero-zoom-breathe w-full h-full object-cover opacity-92"
          />

          {/* Top-down dark overlay for navbar blending */}
          <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-10" />

          {/* Cinematic gradients — layered depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/18 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-transparent opacity-80" />

          {/* Ambient warm gold glow — bottom-left breathing */}
          <div className="absolute bottom-0 left-0 w-[70vw] h-[55vh] bg-[radial-gradient(ellipse_at_bottom_left,rgba(212,163,42,0.022),transparent_65%)] pointer-events-none ambient-glow-pulse" />

          {/* Top-right gentle warm catch-light */}
          <div className="absolute top-0 right-0 w-[45vw] h-[40vh] bg-[radial-gradient(ellipse_at_top_right,rgba(212,163,42,0.012),transparent_70%)] pointer-events-none" />

          {/* Invisible cinematic dust — 4 particles, near-zero opacity, slow float */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(4)].map((_, i) => {
              const sizes   = [1.2, 0.8, 1.5, 1];
              const lefts   = [15, 35, 55, 75];
              const tops    = [70, 40, 80, 55];
              const delays  = [0, 3, 1.5, 4.5];
              const durs    = [22, 28, 32, 24];
              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    width:  sizes[i] + 'px',
                    height: sizes[i] + 'px',
                    left:   lefts[i] + '%',
                    top:    tops[i]  + '%',
                    borderRadius: '50%',
                    background: 'rgba(212,163,42,0.22)',
                    opacity: 0,
                    animation: `cinematic-dust ${durs[i]}s ${delays[i]}s linear infinite`,
                  }}
                />
              );
            })}
          </div>
        </motion.div>

        {/* Hero copy */}
        <div className="relative z-10 w-full container mx-auto px-5 md:px-8">
          <div className="max-w-3xl">
            <motion.p
              variants={heroSubtitleReveal}
              initial="hidden"
              animate="visible"
              className="text-primary text-[10px] md:text-[11px] tracking-[0.28em] uppercase mb-6 font-light"
            >
              Established 1985 &ensp;·&ensp; Hyderabad
            </motion.p>

            <motion.h1
              variants={heroTitleReveal}
              initial="hidden"
              animate="visible"
              className="font-serif text-[clamp(2.4rem,6.5vw,4.75rem)] text-white font-light leading-[1.16] tracking-wide [text-shadow:0_2px_18px_rgba(0,0,0,0.25)]"
            >
              Where Gold<br className="hidden sm:block" /> Becomes Legacy.
            </motion.h1>

            <motion.div
              variants={heroCtaReveal}
              initial="hidden"
              animate="visible"
              className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-7"
            >
              <a
                href="#collections"
                className="nav-underline inline-block text-primary text-[10px] uppercase tracking-[0.28em] hover:opacity-75 transition-opacity duration-700"
              >
                Discover Collections
              </a>
              <span className="hidden sm:block w-12 h-px bg-primary/20" />
              <span className="hidden sm:block text-white/40 text-[10px] uppercase tracking-[0.22em] font-light">
                By Appointment Only
              </span>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 1.4 }}
          className="absolute bottom-8 right-5 md:right-8 hidden md:flex flex-col items-center gap-2"
        >
          <span className="text-[9px] uppercase tracking-[0.25em] text-white/28 -rotate-90 origin-center mb-6">Scroll</span>
          <div className="w-px h-10 bg-white/8" />
        </motion.div>
      </section>

      {/* ── Cinematic section bridge: hero → heritage — atmospheric fade ── */}
      <div className="relative z-10">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/3.5 to-transparent" />
        <div className="h-7 bg-gradient-to-b from-background/0 to-background pointer-events-none" />
      </div>

      {/* ══════════════════════════════════════
          2. ATELIER / PHILOSOPHY
         ══════════════════════════════════════ */}
      <motion.section
        id="atelier"
        variants={cinematicSection}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        className="py-16 md:py-24 bg-background relative z-10 cinematic-section"
      >
        <div className="container mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center">

            {/* Text col */}
            <motion.div
              variants={staggerReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="lg:col-span-5 lg:col-start-2 order-2 lg:order-1"
            >
              <motion.p variants={editorialReveal} className="text-primary text-[10px] uppercase tracking-widest mb-6">Our Heritage</motion.p>
              <motion.h2 variants={textClipReveal} className="font-serif text-[clamp(1.9rem,4vw,3.4rem)] text-foreground mb-8 leading-[1.18] tracking-wide">
                Quiet confidence,<br />
                <span className="italic text-foreground/65">generations of trust.</span>
              </motion.h2>
              <motion.div variants={editorialReveal} className="space-y-5 text-foreground/70 font-light leading-relaxed text-sm md:text-base">
                <p>
                  At Surya Gold &amp; Diamonds, we believe true luxury whispers. Our family has served the finest households of Hyderabad for decades, operating on the ancient rhythms of master goldsmiths.
                </p>
                <p>
                  Every piece is a dialogue between raw, natural brilliance and human intentionality. From bridal trousseaus to everyday elegance, we don't just craft jewellery — we forge heirlooms.
                </p>
              </motion.div>
              <motion.p variants={editorialReveal} className="mt-7 text-[10px] uppercase tracking-widest text-foreground/35 italic font-serif">
                Handcrafted in limited quantities · Since 1985
              </motion.p>
              <motion.div variants={editorialReveal} className="mt-9">
                <button
                  onClick={scrollToContact}
                  className="cta-shimmer inline-block bg-foreground text-background px-9 py-3.5 uppercase tracking-[0.22em] text-[11px] hover:bg-primary transition-colors duration-700"
                >
                  Book a Viewing
                </button>
              </motion.div>
            </motion.div>

            {/* Image col — spring parallax */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 lg:col-start-8 relative aspect-[3/4] w-full order-1 lg:order-2 overflow-hidden isolate"
              ref={atelierImgRef}
            >
              <motion.img
                src="/images/philosophy.png"
                alt="Master Craftsmanship"
                loading="lazy" decoding="async"
                style={{ y: atelierY }}
                className="absolute inset-x-0 -top-[4%] w-full h-[108%] object-cover transition-transform duration-[3.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                whileHover={{ scale: 1.05 }}
              />
              {/* Warm gold catch-light — top-left editorial */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_15%,rgba(212,163,42,0.055),transparent_52%)] mix-blend-color-dodge pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity duration-[1500ms]" />
              {/* Soft bottom vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 ring-1 ring-inset ring-primary/8 group-hover:ring-primary/18 transition-all duration-[1200ms] pointer-events-none" />
              <p className="absolute -left-5 top-1/2 -translate-y-1/2 -rotate-90 text-[9px] tracking-[0.3em] uppercase text-foreground/40 hidden md:block">
                BIS Hallmark Certified
              </p>
            </motion.div>

          </div>
        </div>
      </motion.section>

      {/* ── Atmospheric bridge: heritage → MMTC ── */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/10 to-transparent" />

      {/* ══════════════════════════════════════
          3. MMTC-PAMP PARTNERSHIP
         ══════════════════════════════════════ */}
      <MMTCSection />

      {/* ── Atmospheric bridge: MMTC → collections ── */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/15 to-transparent" />

      {/* ══════════════════════════════════════
          4. COLLECTIONS — editorial grid
         ══════════════════════════════════════ */}
      <motion.section
        id="collections"
        variants={cinematicSection}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="py-16 md:py-24 bg-secondary relative z-10 cinematic-section"
      >
        <div className="container mx-auto px-5 md:px-8">

          {/* Section header */}
          <motion.div
            variants={staggerReveal}
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-12 gap-6"
          >
            <div className="max-w-lg">
              <motion.p variants={editorialReveal} className="text-primary text-[10px] uppercase tracking-widest mb-4">The Collection</motion.p>
              <motion.h2 variants={textClipReveal} className="font-serif text-[clamp(1.9rem,4vw,3.2rem)] leading-tight tracking-wide">Curated Masterpieces</motion.h2>
              <motion.p variants={editorialReveal} className="text-foreground/55 font-light text-sm mt-4 leading-relaxed">
                An intimately selected presentation of our most sought-after works, embodying the pinnacle of Indian craftsmanship.
              </motion.p>
            </div>
            <motion.button
              variants={editorialReveal}
              onClick={() => setFullCollectionOpen(true)}
              className="nav-underline border-b border-foreground/50 text-foreground/70 pb-0.5 uppercase tracking-[0.22em] text-[10px] hover:text-primary hover:border-primary transition-all duration-500 shrink-0"
            >
              View Full Collection
            </motion.button>
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
            {products.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                isFeature={idx === 0}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── Cinematic bridge: collections → trust pillars ── */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/3 to-transparent" />

      {/* ══════════════════════════════════════
          5. TRUST PILLARS (Maison Commitments)
         ══════════════════════════════════════ */}
      <motion.section
        variants={cinematicSection}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="py-24 md:py-32 bg-background relative z-10 cinematic-section isolate overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(212,163,42,0.015),transparent_50%)] pointer-events-none" />

        <div className="container mx-auto px-5 md:px-8">
          {/* Section Heading */}
          <motion.div
            variants={staggerReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-16 md:mb-20 text-center"
          >
            <div className="flex items-center justify-center gap-5 mb-5">
              <div className="h-px w-8 bg-primary/45 shrink-0" />
              <motion.p variants={editorialReveal} className="text-primary text-[10px] uppercase tracking-[0.38em] font-medium">Maison Pillars</motion.p>
              <div className="h-px w-8 bg-primary/45 shrink-0" />
            </div>
            <motion.h2 variants={textClipReveal} className="font-serif text-[clamp(2rem,4vw,3.2rem)] leading-tight tracking-wide font-light">
              Guarantees of the Maison
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-foreground/[0.04] bg-foreground/[0.001]"
          >
            {PILLARS.map((pillar, i) => (
              <motion.div
                key={i}
                variants={editorialReveal}
                className="p-8 md:p-12 space-y-6 group border-b md:border-b-0 md:border-r border-foreground/[0.04] last:border-b-0 last:border-r-0 hover:bg-foreground/[0.005] transition-all duration-[1000ms] ease-out relative overflow-hidden"
              >
                {/* Micro accent corner light */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-[radial-gradient(circle_at_top_right,rgba(212,163,42,0.018),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                
                {/* Index number & dot */}
                <div className="flex justify-between items-start">
                  <div className="font-serif text-5xl md:text-6xl text-foreground/[0.07] group-hover:text-primary/18 transition-all duration-[1000ms] ease-out font-extralight select-none">
                    0{i + 1}
                  </div>
                  <span className="w-1.5 h-1.5 rounded-none bg-primary/40 group-hover:bg-primary transition-colors duration-[1000ms]" />
                </div>

                <div className="space-y-3">
                  <h3 className="font-serif text-lg md:text-xl tracking-wider text-foreground/90 uppercase font-light group-hover:text-primary transition-colors duration-[1000ms]">
                    {pillar.title}
                  </h3>
                  <div className="w-6 h-px bg-primary/20 group-hover:w-12 transition-all duration-[1000ms] ease-out" />
                  <p className="text-foreground/50 group-hover:text-foreground/70 transition-all duration-[1000ms] ease-out font-light text-[13.5px] leading-relaxed max-w-[27ch]">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── Section bridge: pillars → lookbook ── */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/4 to-transparent" />

      {/* ══════════════════════════════════════
          6. LOOKBOOK — editorial campaign spread
         ══════════════════════════════════════ */}
      <section id="lookbook" className="pt-20 md:pt-28 pb-0 bg-background relative z-10">
        <div className="container mx-auto px-5 md:px-8">
          {/* Section header — editorial, left-aligned */}
          <motion.div
            variants={staggerReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-16 md:mb-24"
          >
            <div className="flex items-center gap-5 mb-7">
              <div className="h-px w-10 bg-primary/40 shrink-0" />
              <motion.p variants={editorialReveal} className="text-primary text-[10px] uppercase tracking-[0.4em]">Editorial</motion.p>
            </div>
            <motion.h2 variants={textClipReveal} className="font-serif text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.12] max-w-xl tracking-wide font-light">
              The Campaign
            </motion.h2>
          </motion.div>
        </div>

        {/* Spread 1: Full-bleed cinematic image — spring parallax */}
        <div ref={spread1Ref} className="w-full relative h-[75vh] md:h-[92vh] overflow-hidden mb-16 md:mb-24 isolate">
          <motion.div
            style={{ y: spread1Y }}
            className="absolute inset-x-0 -top-[4%] h-[108%]"
          >
            <motion.img
              src="/images/lookbook-1.png"
              alt="Bridal Collection"
              loading="lazy" decoding="async"
              initial={{ scale: 1.08 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 4.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full object-cover"
            />
            {/* Cinematic depth gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/18 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
            {/* Warm ambient glow — emotional warmth */}
            <div className="absolute bottom-0 left-0 w-[60vw] h-[50%] bg-[radial-gradient(ellipse_at_bottom_left,rgba(212,163,42,0.018),transparent_65%)] pointer-events-none" />
          </motion.div>

          <div className="absolute inset-0 z-10">
            <div className="container mx-auto px-5 md:px-8 h-full flex flex-col justify-end pb-16 md:pb-24">
              <motion.div
                variants={staggerReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="max-w-2xl"
              >
                <motion.p
                  variants={editorialReveal}
                  className="text-primary text-[10px] uppercase tracking-[0.4em] mb-5"
                >
                  Bridal Collection
                </motion.p>
                <motion.h3
                  variants={editorialReveal}
                  className="font-serif text-4xl md:text-5xl lg:text-[4.25rem] text-white leading-[1.12] mb-8 tracking-wide font-light"
                >
                  The Bridal Trousseau
                </motion.h3>
                <motion.p
                  variants={editorialReveal}
                  className="text-white/55 font-light leading-relaxed max-w-xs text-sm"
                >
                  Weighty, intricate, and deeply rooted in tradition.
                </motion.p>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-5 md:px-8">
          {/* Spread 2: Editorial asymmetric — portrait bleeds left, text floats right with heavy offset */}
          <div className="relative mb-28 md:mb-44">
            {/* Oversized watermark */}
            <span className="editorial-watermark select-none pointer-events-none absolute -top-10 left-0 z-0" aria-hidden="true">02</span>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-0 items-start relative z-10">
              {/* Image — portrait, bleeds from left, parallax */}
              <motion.div
                ref={spread2ImgRef}
                initial={{ opacity: 0, x: -32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
                className="md:col-span-6 relative overflow-hidden group aspect-[3/4] md:h-[88vh] isolate"
              >
                <motion.img
                  src="/images/lookbook-2.png"
                  alt="Everyday Collection"
                  loading="lazy" decoding="async"
                  style={{ y: spread2Y }}
                  className="absolute inset-x-0 -top-[8%] w-full h-[116%] object-cover transition-transform duration-[2.4s] ease-out group-hover:scale-[1.02]"
                />
              </motion.div>

              {/* Text — heavily offset top for editorial tension */}
              <motion.div
                variants={staggerReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="md:col-span-5 md:col-start-8 md:pt-[30vh] pt-10 pl-0 md:pl-10 relative"
              >
                <div className="absolute left-0 top-[30vh] bottom-0 w-px bg-primary/10 hidden md:block" />
                <motion.p variants={editorialReveal} className="text-primary text-[10px] uppercase tracking-[0.35em] mb-6">Everyday</motion.p>
                <motion.h3 variants={textClipReveal} className="font-serif text-[clamp(1.8rem,4vw,3rem)] leading-[1.12] mb-8 tracking-wide font-light">
                  Everyday Brilliance
                </motion.h3>
                <motion.p variants={editorialReveal} className="text-foreground/60 font-light leading-[1.85] mb-10 text-sm md:text-[15px] max-w-[30ch]">
                  For the moments between the milestones. Delicate diamond settings and minimalist gold forms that elevate the everyday.
                </motion.p>
                <motion.p variants={editorialReveal} className="font-serif italic text-base text-foreground/35 mb-10 max-w-[24ch] leading-snug border-l border-primary/20 pl-5">
                  &ldquo;Quiet gold for a quiet life.&rdquo;
                </motion.p>
                <motion.button
                  variants={editorialReveal}
                  onClick={scrollToContact}
                  className="nav-underline text-[10px] uppercase tracking-widest text-foreground hover:text-primary transition-colors duration-500 flex items-center gap-4"
                >
                  <span className="w-8 h-px bg-primary/40 shrink-0" />
                  Explore everyday pieces
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Spread 3: Cinematic full-bleed craftsmanship — immersive editorial */}
      <section ref={spread3Ref} className="relative w-full h-[70vh] md:h-[88vh] overflow-hidden bg-[#080808] z-10 isolate">
        {/* Full-bleed image with deep overlay */}
        <motion.div
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="absolute inset-x-0 w-full h-[120%] -top-[10%]"
          style={{ y: spread3ImageY }}
        >
          <img
            src="/images/atelier.png"
            alt="The Atelier — Craftsmanship"
            loading="lazy" decoding="async"
            className="w-full h-full object-cover object-[35%_55%] scale-[1.05]"
          />
          
          {/* 1. Subtle local film grain layer */}
          <div 
            className="pointer-events-none absolute inset-0 z-10 mix-blend-overlay opacity-[0.015]"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }}
          />

          {/* 2. Soft vignette for border depth */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(10,10,10,0.55)_100%)] pointer-events-none z-10" />

          {/* 3. Warm candlelight glow & gold highlight recovery (mix-blend-color-dodge, pulsing slowly) */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_55%,rgba(212,163,42,0.02)_0%,transparent_50%)] mix-blend-color-dodge pointer-events-none z-10 animate-pulse" style={{ animationDuration: '8s' }} />

          {/* 4. Atmospheric left-to-right shadow gradient (softer, text readability focus) */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent pointer-events-none z-10" />

          {/* 5. Subtle top/bottom shadow depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/15 pointer-events-none z-10" />

          {/* 6. Subtle floating dust particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            {[...Array(3)].map((_, i) => {
              const sizes   = [1, 0.8, 1.2];
              const lefts   = [22, 45, 65];
              const tops    = [80, 50, 70];
              const delays  = [0, 2, 4];
              const durs    = [26, 32, 22];
              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    width:  sizes[i] + 'px',
                    height: sizes[i] + 'px',
                    left:   lefts[i] + '%',
                    top:    tops[i]  + '%',
                    borderRadius: '50%',
                    background: 'rgba(223, 201, 140, 0.18)',
                    opacity: 0,
                    animation: `cinematic-dust ${durs[i]}s ${delays[i]}s linear infinite`,
                  }}
                />
              );
            })}
          </div>
        </motion.div>

        {/* Content container — aligns perfectly with global grid */}
        <div className="container mx-auto px-5 md:px-8 h-full relative z-20">
          <div className="h-full flex flex-col justify-end pb-12 md:pb-20 relative">
            <motion.div 
              style={{ y: spread3TextY }}
              variants={staggerReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-lg"
            >
              <motion.div
                variants={editorialReveal}
                className="flex items-center gap-4 mb-4"
              >
                <div className="w-8 h-px bg-primary/30" />
                <p className="text-primary text-[10px] uppercase tracking-[0.4em] font-light">The Atelier</p>
              </motion.div>

              <motion.h3
                variants={textClipReveal}
                className="font-serif font-light text-3xl md:text-4xl lg:text-[2.6rem] text-white/90 leading-[1.25] mb-5 tracking-wide"
              >
                Each piece carries
                <span className="block font-serif italic font-light text-[#d4c39c]/80 tracking-tight mt-1 text-[clamp(1.4rem,2.8vw,1.9rem)]">
                  the weight of history.
                </span>
              </motion.h3>

              <motion.p
                variants={editorialReveal}
                className="text-white/55 font-light text-sm md:text-[15px] leading-[1.8] max-w-sm mb-8"
              >
                Handcrafted in Hyderabad since 1985. Every design begins in silence — shaped by the hands of master goldsmiths who have spent lifetimes in devotion to their craft.
              </motion.p>

              <motion.div
                variants={editorialReveal}
                className="flex items-center gap-5 text-white/30"
              >
                <span className="text-[9px] uppercase tracking-[0.3em] font-light">Established 1985</span>
                <span className="w-px h-3.5 bg-white/10" />
                <span className="text-[9px] uppercase tracking-[0.3em] font-light">Hyderabad</span>
                <span className="w-px h-3.5 bg-white/10" />
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#d4c39c]/70 font-light">BIS Hallmarked</span>
              </motion.div>
            </motion.div>

            {/* Right side — editorial counter, vertical text & spatial balance */}
            <motion.div
              style={{ y: spread3RightY }}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-end gap-5 z-20"
            >
              {/* Large subtle watermark number */}
              <span className="font-serif italic text-[clamp(5rem,9vw,8.5rem)] text-[#d4c39c]/[0.025] leading-none select-none tracking-tighter">
                03
              </span>
              
              {/* Thin elegant vertical division */}
              <div className="w-px h-20 bg-gradient-to-b from-white/20 via-white/5 to-transparent mr-10" />
              
              {/* Editorial details block */}
              <div className="flex flex-col items-end gap-1.5 mr-4 text-right">
                <p className="text-[9px] uppercase tracking-[0.35em] text-white/45 font-light">
                  Craftsmanship
                </p>
                <p className="text-[8px] uppercase tracking-[0.3em] text-[#d4c39c]/35 font-light">
                  Surya Atelier
                </p>
              </div>

              {/* Additional vertical balanced metadata */}
              <div className="hidden lg:block text-[8px] uppercase tracking-[0.4em] text-white/15 select-none font-light mr-4 mt-4 [writing-mode:vertical-lr] rotate-180">
                SURYA GOLD &amp; DIAMONDS &ensp;·&ensp; EST. 1985
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Cinematic bridge: campaign → consultation — atmospheric dark gradient blend ── */}
      <div className="relative z-10">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/2.5 to-transparent" />
        <div className="h-10 bg-gradient-to-b from-background to-[#0c0b0a] pointer-events-none" />
      </div>

      {/* ══════════════════════════════════════
          7. CONTACT (inline — no separate page)
         ══════════════════════════════════════ */}
      <InlineContactSection />

      <Footer />

      {/* ── Product detail modal (Cinematic Full Screen) ── */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 backdrop-blur-md p-4 md:p-8 lg:p-12"
            onClick={(e) => { if (e.target === e.currentTarget) setSelectedProduct(null); }}
            data-in-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.99, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.99, y: 15 }}
              transition={{ duration: 0.9, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-7xl h-full max-h-[900px] bg-background flex flex-col lg:flex-row relative shadow-2xl overflow-hidden"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 z-30 group flex items-center gap-2 text-foreground/50 hover:text-primary transition-colors focus:outline-none"
              >
                <span className="text-[9px] uppercase tracking-[0.25em] font-light">Close</span>
                <div className="w-8 h-8 rounded-full border border-border group-hover:border-primary/45 flex items-center justify-center transition-colors duration-500">
                  <X className="w-3.5 h-3.5 transition-transform duration-700 group-hover:rotate-90" />
                </div>
              </button>

              {/* Image panel */}
              <div className="w-full lg:w-1/2 relative bg-secondary order-1 h-64 md:h-80 lg:h-full shrink-0 overflow-hidden group">
                <motion.img
                  initial={{ scale: 1.05, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover transition-transform duration-[4s] ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>

              {/* Details panel with warm premium gradient and ambient glow */}
              <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col overflow-y-auto order-2 hide-scrollbar bg-gradient-to-br from-background via-background/99 to-secondary/10 relative shadow-[inset_1px_0_0_rgba(212,163,42,0.03)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(212,163,42,0.025)_0%,transparent_60%)] pointer-events-none" />
                
                <div className="max-w-[400px] my-auto mx-auto lg:mx-0 relative z-10">
                  {/* Category */}
                  <motion.p 
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                    className="text-primary text-[9px] uppercase tracking-[0.35em] mb-6"
                  >
                    {selectedProduct.category}
                  </motion.p>
                  
                  {/* Title */}
                  <motion.h2 
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                    className="font-serif text-2xl lg:text-[2.2rem] tracking-wide mb-6 text-foreground leading-[1.25] font-light"
                  >
                    {selectedProduct.name}
                  </motion.h2>
                  
                  {/* Availability */}
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[9px] tracking-[0.3em] uppercase text-foreground/35 mb-12"
                  >
                    Available upon request
                  </motion.p>

                  {/* Body description */}
                  <motion.p 
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                    className="text-sm font-light leading-[1.75] text-foreground/65 tracking-wide mb-12"
                  >
                    {selectedProduct.description}
                  </motion.p>

                  {/* Specs section */}
                  <motion.div 
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                    className="pt-8 border-t border-primary/5 space-y-4 mb-12"
                  >
                    <div className="flex items-center justify-between lg:justify-start lg:gap-16 py-2">
                      <span className="text-foreground/45 uppercase tracking-[0.25em] text-[9px] font-light w-24">Material</span>
                      <span className="text-[13px] font-light text-foreground/80 tracking-wide">{selectedProduct.karat}</span>
                    </div>
                    {selectedProduct.clarity && (
                      <div className="flex items-center justify-between lg:justify-start lg:gap-16 py-2 border-t border-primary/5">
                        <span className="text-foreground/45 uppercase tracking-[0.25em] text-[9px] font-light w-24">Clarity</span>
                        <span className="text-[13px] font-light text-foreground/80 tracking-wide">{selectedProduct.clarity}</span>
                      </div>
                    )}
                  </motion.div>

                  {/* Atelier notes */}
                  <motion.div 
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                    className="pt-8 border-t border-primary/5 mb-12"
                  >
                    <p className="text-[9px] uppercase tracking-[0.28em] text-primary/75 mb-3.5 font-light">Atelier Notes</p>
                    <p className="text-sm font-serif italic text-foreground/55 leading-[1.75]">
                      {selectedProduct.craftsmanship}
                    </p>
                  </motion.div>

                  {/* Inquire/Book CTAs */}
                  <motion.div 
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                    className="pt-8 border-t border-primary/5 flex flex-col sm:flex-row gap-4"
                  >
                    <a
                      href={`https://wa.me/917093335656?text=I'm%20interested%20in%20the%20${encodeURIComponent(selectedProduct.name)}.`}
                      target="_blank" rel="noopener noreferrer"
                      className="cta-shimmer flex-1 bg-foreground text-background py-4 uppercase tracking-[0.22em] text-[11px] text-center hover:bg-primary hover:text-white transition-colors duration-700"
                    >
                      Inquire via WhatsApp
                    </a>
                    <button
                      onClick={() => {
                        setSelectedProduct(null);
                        setTimeout(scrollToContact, 400);
                      }}
                      className="cta-shimmer flex-1 border border-border text-foreground py-4 uppercase tracking-[0.22em] text-[11px] hover:border-primary hover:text-primary transition-colors duration-700"
                    >
                      Book a Viewing
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
