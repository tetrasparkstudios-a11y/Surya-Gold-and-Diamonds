import { motion, type Variants } from "framer-motion";
import { useState, FormEvent } from "react";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } }
};

export function InlineContactSection() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const lines = [
      `Hello Surya Gold & Diamonds, I would like to request a private consultation.`,
      ``,
      `Name: ${name}`,
      `City: ${city}`,
      `Phone: ${phone}`,
    ];
    if (email.trim()) lines.push(`Email: ${email}`);
    if (message.trim()) {
      lines.push(``);
      lines.push(`Message: ${message}`);
    }
    const url = `https://wa.me/917093335656?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="py-32 md:py-40 px-6 bg-background relative z-10">
      {/* Thin gold divider */}
      <div className="container mx-auto mb-24">
        <div className="w-24 h-px bg-primary/40 mx-auto"></div>
      </div>

      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* LEFT — heading + contact info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="max-w-xl lg:pt-6"
          >
            <p className="text-primary text-xs uppercase tracking-widest mb-6">Private Viewing</p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8 leading-[1.1]">
              Request a Private<br/>Consultation
            </h2>
            <p className="text-foreground/60 font-light mb-12 text-base md:text-lg leading-relaxed">
              We welcome you to our Hyderabad showroom for a private consultation. Experience the weight, warmth, and brilliance of our pieces in person.
            </p>

            <div className="space-y-8">
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-foreground/40 mb-3">Visit Us</h4>
                <p className="font-light text-foreground/80 leading-relaxed text-sm md:text-base">
                  Flat No. 103, My Adobe The Sirius,<br/>
                  Suryodaya Colony, Bandlaguda,<br/>
                  Ranga Reddy (D), Telangana, India
                </p>
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-foreground/40 mb-3">Direct Inquiry</h4>
                <div className="font-light text-foreground/80 space-y-1 text-sm md:text-base">
                  <a href="tel:+917093335656" className="block hover:text-primary transition-colors">+91 70933 35656</a>
                  <a href="tel:+919490032898" className="block hover:text-primary transition-colors">+91 94900 32898</a>
                  <a href="mailto:suryagold2024@gmail.com" className="block hover:text-primary transition-colors mt-2">suryagold2024@gmail.com</a>
                </div>
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-foreground/40 mb-3">Hours</h4>
                <p className="font-light text-foreground/80 leading-relaxed text-sm md:text-base">
                  By appointment, daily.
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — form card */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-secondary/40 border border-border/60 rounded-sm p-8 md:p-12 space-y-7 shadow-[0_2px_30px_rgba(0,0,0,0.04)]"
          >
            <div>
              <label htmlFor="ic-name" className="block text-[10px] uppercase tracking-widest text-foreground/50 mb-2">
                Full Name
              </label>
              <input
                id="ic-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent border-b border-border/70 focus:border-primary outline-none py-2 text-foreground placeholder:text-foreground/30 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
              <div>
                <label htmlFor="ic-city" className="block text-[10px] uppercase tracking-widest text-foreground/50 mb-2">
                  City
                </label>
                <input
                  id="ic-city"
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-transparent border-b border-border/70 focus:border-primary outline-none py-2 text-foreground transition-colors"
                />
              </div>
              <div>
                <label htmlFor="ic-phone" className="block text-[10px] uppercase tracking-widest text-foreground/50 mb-2">
                  Phone
                </label>
                <input
                  id="ic-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-transparent border-b border-border/70 focus:border-primary outline-none py-2 text-foreground transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="ic-email" className="block text-[10px] uppercase tracking-widest text-foreground/50 mb-2">
                Email <span className="text-foreground/30 normal-case tracking-normal">(optional)</span>
              </label>
              <input
                id="ic-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-border/70 focus:border-primary outline-none py-2 text-foreground transition-colors"
              />
            </div>

            <div>
              <label htmlFor="ic-message" className="block text-[10px] uppercase tracking-widest text-foreground/50 mb-2">
                Message
              </label>
              <textarea
                id="ic-message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us a little about the occasion or piece you have in mind."
                className="w-full bg-transparent border border-border/70 focus:border-primary outline-none p-3 text-foreground placeholder:text-foreground/30 resize-none transition-colors text-sm"
              />
            </div>

            <button
              type="submit"
              className="cta-shimmer w-full bg-foreground text-background py-4 uppercase tracking-widest text-xs hover:bg-primary transition-colors duration-700"
            >
              Send via WhatsApp
            </button>

            <p className="text-[10px] uppercase tracking-widest text-foreground/40 text-center pt-2">
              We respond personally within one business day.
            </p>
          </motion.form>

        </div>
      </div>
    </section>
  );
}
