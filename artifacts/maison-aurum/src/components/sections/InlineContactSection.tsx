import { motion, type Variants } from "framer-motion";
import { useState, FormEvent } from "react";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const }
  }
};

export function InlineContactSection() {
  const [name, setName]       = useState("");
  const [city, setCity]       = useState("");
  const [phone, setPhone]     = useState("");
  const [email, setEmail]     = useState("");
  const [message, setMessage] = useState("");

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
    <section id="contact" className="py-20 md:py-24 bg-background relative z-10">
      {/* Thin gold rule */}
      <div className="w-20 h-px bg-primary/30 mx-auto mb-16 md:mb-20"></div>

      <div className="container mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-start">

          {/* LEFT — info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="lg:pt-4"
          >
            <p className="text-primary text-[10px] uppercase tracking-widest mb-5">Private Viewing</p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-[3.25rem] mb-6 leading-[1.12]">
              Request a Private<br />Consultation
            </h2>
            <p className="text-foreground/60 font-light mb-10 text-base leading-relaxed max-w-sm">
              We welcome you to our Hyderabad showroom for a private consultation. Experience the weight, warmth, and brilliance of our pieces in person.
            </p>

            <div className="space-y-7">
              <div>
                <span className="gold-rule"></span>
                <p className="text-[10px] uppercase tracking-widest text-foreground/40 mb-2.5">Visit Us</p>
                <p className="font-light text-foreground/75 leading-relaxed text-sm">
                  Flat No. 103, My Adobe The Sirius,<br />
                  Suryodaya Colony, Bandlaguda,<br />
                  Ranga Reddy (D), Telangana, India
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-foreground/40 mb-2.5">Direct Inquiry</p>
                <div className="space-y-1 font-light text-foreground/75 text-sm">
                  <a href="tel:+917093335656"         className="block hover:text-primary transition-colors">+91 70933 35656</a>
                  <a href="tel:+919490032898"         className="block hover:text-primary transition-colors">+91 94900 32898</a>
                  <a href="mailto:suryagold2024@gmail.com" className="block hover:text-primary transition-colors mt-2">suryagold2024@gmail.com</a>
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-foreground/40 mb-2.5">Hours</p>
                <p className="font-light text-foreground/75 text-sm">By appointment, daily.</p>
              </div>
            </div>

            {/* Prestige note */}
            <p className="mt-12 text-[10px] uppercase tracking-widest text-foreground/30 italic font-serif">
              Handcrafted in limited quantities. Every piece is made to be inherited.
            </p>
          </motion.div>

          {/* RIGHT — form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="bg-secondary/35 border border-border/50 p-8 md:p-11 space-y-6 shadow-[0_2px_40px_rgba(0,0,0,0.04)]"
          >
            {/* Name */}
            <div>
              <label htmlFor="ic-name" className="block text-[10px] uppercase tracking-widest text-foreground/45 mb-2">
                Full Name
              </label>
              <input
                id="ic-name" type="text" required
                value={name} onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent border-b border-border/60 focus:border-primary outline-none py-2.5 text-foreground text-sm placeholder:text-foreground/25 transition-colors duration-400"
              />
            </div>

            {/* City + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="ic-city" className="block text-[10px] uppercase tracking-widest text-foreground/45 mb-2">City</label>
                <input
                  id="ic-city" type="text" required
                  value={city} onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-transparent border-b border-border/60 focus:border-primary outline-none py-2.5 text-foreground text-sm transition-colors duration-400"
                />
              </div>
              <div>
                <label htmlFor="ic-phone" className="block text-[10px] uppercase tracking-widest text-foreground/45 mb-2">Phone</label>
                <input
                  id="ic-phone" type="tel" required
                  value={phone} onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-transparent border-b border-border/60 focus:border-primary outline-none py-2.5 text-foreground text-sm transition-colors duration-400"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="ic-email" className="block text-[10px] uppercase tracking-widest text-foreground/45 mb-2">
                Email <span className="normal-case tracking-normal text-foreground/30">(optional)</span>
              </label>
              <input
                id="ic-email" type="email"
                value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-border/60 focus:border-primary outline-none py-2.5 text-foreground text-sm transition-colors duration-400"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="ic-message" className="block text-[10px] uppercase tracking-widest text-foreground/45 mb-2">Message</label>
              <textarea
                id="ic-message" rows={4}
                value={message} onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about the occasion or the piece you have in mind."
                className="w-full bg-transparent border border-border/50 focus:border-primary outline-none p-3 text-foreground text-sm placeholder:text-foreground/25 resize-none transition-colors duration-400"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="cta-shimmer w-full bg-foreground text-background py-4 uppercase tracking-[0.22em] text-[11px] hover:bg-primary transition-colors duration-700"
            >
              Send via WhatsApp
            </button>

            <p className="text-[9px] uppercase tracking-widest text-foreground/35 text-center">
              We respond personally within one business day.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
