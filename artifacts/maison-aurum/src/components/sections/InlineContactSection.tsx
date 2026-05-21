import { motion, useScroll, useTransform, useSpring, type Variants } from "framer-motion";
import { useState, useRef, FormEvent } from "react";

const editorialReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] as const }
  }
};

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
    transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] as const }
  }
};

const staggerReveal: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.16 } }
};

const cinematicIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1] as const } }
};

export function InlineContactSection() {
  const [name, setName]       = useState("");
  const [city, setCity]       = useState("");
  const [phone, setPhone]     = useState("");
  const [email, setEmail]     = useState("");
  const [message, setMessage] = useState("");

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const ySmooth = useSpring(scrollYProgress, { stiffness: 45, damping: 25 });
  // Subtle 4% map translation inside clipping container
  const mapY = useTransform(ySmooth, [0, 1], ["-2%", "2%"]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const lines = [
      "Hello Surya Gold & Diamonds, I would like to request a private consultation.",
      "",
      `Name: ${name}`,
      `City: ${city}`,
      `Phone: ${phone}`,
    ];
    if (email.trim())   lines.push(`Email: ${email}`);
    if (message.trim()) lines.push("", `Message: ${message}`);
    window.open(
      `https://wa.me/917093335656?text=${encodeURIComponent(lines.join("\n"))}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <motion.section
      id="contact"
      ref={sectionRef}
      variants={cinematicIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="py-20 md:py-28 bg-[#0c0b0a] text-white relative z-10 overflow-hidden isolate"
    >
      {/* Background atmospheric elements — subtle warmth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,163,42,0.015),transparent_40%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[55vw] h-[45%] bg-[radial-gradient(ellipse_at_bottom_left,rgba(212,163,42,0.007),transparent_65%)] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/7 to-transparent" />

      <div className="container mx-auto px-5 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* LEFT — Invitation & Showroom Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerReveal}
            className="lg:col-span-5 lg:pt-6 flex flex-col justify-between"
          >
            <div>
              <motion.p variants={editorialReveal} className="text-primary text-[10.5px] uppercase tracking-[0.35em] mb-4 font-medium">Private Viewing</motion.p>
              <motion.h2
                variants={textClipReveal}
                className="font-serif text-4xl md:text-[3rem] lg:text-[3.4rem] mb-5 leading-[1.08] text-white/95 tracking-wide font-light"
              >
                Request a Private<br />Consultation
              </motion.h2>
              <motion.p
                variants={editorialReveal}
                className="text-white/60 font-light mb-8 text-[14.5px] md:text-[15.5px] leading-relaxed max-w-sm"
              >
                A visit to Surya Gold &amp; Diamonds is a tailored experience in quiet luxury. We invite you to our private Hyderabad salon to explore the collections, discuss bespoke designs, or select custom heirlooms in an intimate setting.
              </motion.p>
            </div>

            <div className="space-y-6 mt-2">
              <div>
                <span className="block w-10 h-px bg-primary/40 mb-5"></span>
                <p className="text-[9.5px] uppercase tracking-[0.28em] text-primary/70 mb-2 font-medium">Visit Us</p>
                <p className="font-light text-white/75 leading-relaxed text-sm">
                  Flat No. 103, My Adobe The Sirius,<br />
                  Suryodaya Colony, Bandlaguda,<br />
                  Ranga Reddy (D), Telangana, India
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-8 pt-2">
                <div>
                  <p className="text-[9.5px] uppercase tracking-[0.28em] text-primary/70 mb-2 font-medium">Direct Inquiry</p>
                  <div className="space-y-1 font-light text-white/75 text-sm">
                    <a href="tel:+917093335656" className="block hover:text-primary transition-colors duration-500">+91 70933 35656</a>
                    <a href="tel:+919490032898" className="block hover:text-primary transition-colors duration-500">+91 94900 32898</a>
                  </div>
                </div>
                <div>
                  <p className="text-[9.5px] uppercase tracking-[0.28em] text-primary/70 mb-2 font-medium">Hours</p>
                  <p className="font-light text-white/75 text-sm">By appointment,<br/>daily.</p>
                </div>
              </div>
            </div>

            {/* Prestige note */}
            <p className="mt-10 text-[9.5px] uppercase tracking-[0.28em] text-white/25 italic font-serif">
              Handcrafted in limited quantities. Every piece is made to be inherited.
            </p>
          </motion.div>

          {/* RIGHT — Map & Request Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 lg:col-start-7 flex flex-col gap-6"
          >
            {/* Map — luxury integrated & vignetted with 4% travel scroll parallax */}
            <div className="w-full h-36 md:h-44 relative overflow-hidden bg-[#0c0b0a] border border-white/5 isolate">
              {/* Map atmospheric overlay — smoky edges, vignette integration */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#0c0b0a]/50 via-transparent to-[#0c0b0a]/90 z-10 pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(12,11,10,0)_20%,rgba(12,11,10,0.92)_100%)] z-10 pointer-events-none" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.04] z-20 pointer-events-none" />
              
              <motion.div
                style={{ y: mapY }}
                className="absolute inset-x-0 w-full h-[112%] -top-[6%]"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15231.282583803024!2d78.3614945!3d17.3725455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9636a0000001%3A0x8e8055bf93348003!2sBandlaguda%20Jagir%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(85%) brightness(0.38) opacity(0.35)' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Showroom Location"
                />
              </motion.div>
            </div>
            {/* Map caption */}
            <div className="flex items-center gap-3 -mt-1">
              <div className="h-px flex-1 bg-white/5" />
              <p className="text-[8.5px] uppercase tracking-[0.35em] text-primary/40">Salon Location · Bandlaguda Jagir, Hyderabad</p>
              <div className="h-px flex-1 bg-white/5" />
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-gradient-to-br from-white/[0.015] to-white/[0.003] border border-white/[0.04] p-7 md:p-9 space-y-7 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-md relative overflow-hidden isolate"
            >
              {/* Internal subtle warm highlight wash */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[radial-gradient(circle_at_top_right,rgba(212,163,42,0.025),transparent_70%)] pointer-events-none z-0" />

              {/* Name */}
              <div className="relative z-10">
                <label htmlFor="ic-name" className="block text-[9.5px] uppercase tracking-[0.25em] text-primary/60 mb-2.5 font-medium">
                  Full Name
                </label>
                <input
                  id="ic-name" type="text" required
                  value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent border-b border-white/[0.08] focus:border-primary/40 outline-none py-1.5 text-white text-sm placeholder:text-white/10 transition-colors duration-700 font-light tracking-wide"
                />
              </div>

              {/* City + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10">
                <div>
                  <label htmlFor="ic-city" className="block text-[9.5px] uppercase tracking-[0.25em] text-primary/60 mb-2.5 font-medium">City</label>
                  <input
                    id="ic-city" type="text" required
                    value={city} onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-transparent border-b border-white/[0.08] focus:border-primary/40 outline-none py-1.5 text-white text-sm transition-colors duration-700 font-light tracking-wide"
                  />
                </div>
                <div>
                  <label htmlFor="ic-phone" className="block text-[9.5px] uppercase tracking-[0.25em] text-primary/60 mb-2.5 font-medium">Phone</label>
                  <input
                    id="ic-phone" type="tel" required
                    value={phone} onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-transparent border-b border-white/[0.08] focus:border-primary/40 outline-none py-1.5 text-white text-sm transition-colors duration-700 font-light tracking-wide"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="relative z-10">
                <label htmlFor="ic-email" className="block text-[9.5px] uppercase tracking-[0.25em] text-primary/60 mb-2.5 font-medium">
                  Email <span className="normal-case tracking-normal text-white/15">(optional)</span>
                </label>
                <input
                  id="ic-email" type="email"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-white/[0.08] focus:border-primary/40 outline-none py-1.5 text-white text-sm transition-colors duration-700 font-light tracking-wide"
                />
              </div>

              {/* Message */}
              <div className="relative z-10">
                <label htmlFor="ic-message" className="block text-[9.5px] uppercase tracking-[0.25em] text-primary/60 mb-2.5 font-medium">Message</label>
                <textarea
                  id="ic-message" rows={3}
                  value={message} onChange={(e) => setMessage(e.target.value)}
                  placeholder="Occasion, timeline, or collection of interest..."
                  className="w-full bg-transparent border-b border-white/[0.08] focus:border-primary/40 outline-none py-1.5 text-white text-sm placeholder:text-white/10 resize-none transition-colors duration-700 font-light tracking-wide"
                />
              </div>

              {/* Submit */}
              <div className="pt-3 relative z-10">
                <button
                  type="submit"
                  className="cta-shimmer w-full bg-primary text-primary-foreground py-3.5 uppercase tracking-[0.25em] text-[10.5px] hover:bg-white hover:text-black transition-colors duration-700 font-medium"
                >
                  Request Private Invitation
                </button>
                <p className="text-[8.5px] uppercase tracking-[0.22em] text-white/20 text-center mt-5 leading-normal">
                  A concierge will contact you via WhatsApp to coordinate details.
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
