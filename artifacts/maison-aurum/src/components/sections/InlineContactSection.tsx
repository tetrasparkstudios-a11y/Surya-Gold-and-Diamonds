import { motion, useScroll, useTransform, useSpring, type Variants } from "framer-motion";
import { useState, useRef, FormEvent } from "react";
import { useToast } from "@/hooks/use-toast";

const editorialReveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }
  }
};

const textClipReveal: Variants = {
  hidden: {
    clipPath: "inset(100% 0 0 0)",
    y: 30,
    opacity: 0
  },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    y: 0,
    opacity: 1,
    transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] as const }
  }
};

const staggerReveal: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.14 } }
};

const cinematicIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const } }
};

export function InlineContactSection() {
  const [name, setName]       = useState("");
  const [city, setCity]       = useState("");
  const [phone, setPhone]     = useState("");
  const [email, setEmail]     = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const ySmooth = useSpring(scrollYProgress, { stiffness: 45, damping: 25 });
  const mapY = useTransform(ySmooth, [0, 1], ["-2%", "2%"]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !city) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const htmlContent = `
        <h2>New Consultation Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>City:</strong> ${city}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email || 'Not provided'}</p>
        <p><strong>Message:</strong><br/> ${message || 'No message'}</p>
      `;

      const response = await fetch('/api/resend/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer re_5onJZx9e_CH6gXx2VDyqyBBDvTrhkWGqe'
        },
        body: JSON.stringify({
          from: 'Surya Gold <onboarding@resend.dev>',
          to: ['suryagold2024@gmail.com'],
          subject: 'New Consultation Request - Surya Gold & Diamonds',
          html: htmlContent
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `API Error: ${response.status}`);
      }

      toast({
        title: "Request Sent",
        description: "Thank you. We will contact you shortly to confirm your consultation.",
      });

      // Clear form
      setName("");
      setCity("");
      setPhone("");
      setEmail("");
      setMessage("");

    } catch (error: any) {
      toast({
        title: "Error Sending Request",
        description: error.message || "There was a problem sending your request. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <motion.section
      id="contact"
      ref={sectionRef}
      variants={cinematicIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="py-20 md:py-28 bg-[#FAF7F2] relative z-10 overflow-hidden isolate"
    >
      {/* Background atmospheric elements — subtle warmth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,163,42,0.025),transparent_40%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[55vw] h-[45%] bg-[radial-gradient(ellipse_at_bottom_left,rgba(212,163,42,0.012),transparent_65%)] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />

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
              <motion.p variants={editorialReveal} className="text-primary text-[10px] uppercase tracking-[0.35em] mb-4 font-medium">Private Viewing</motion.p>
              <motion.h2
                variants={textClipReveal}
                className="font-serif text-5xl md:text-[3.4rem] lg:text-[4.2rem] mb-8 leading-[1.08] text-[#1a1916]/95 tracking-wide font-normal"
              >
                Request a Private<br />Consultation
              </motion.h2>
              <motion.p
                variants={editorialReveal}
                className="text-[#1a1916]/55 font-light mb-8 text-[14.5px] md:text-[15.5px] leading-[1.7] max-w-sm"
              >
                A visit to Surya Gold &amp; Diamonds is a tailored experience in quiet luxury. We invite you to our private Hyderabad salon to explore the collections, discuss bespoke designs, or select custom heirlooms in an intimate setting.
              </motion.p>
            </div>

            <div className="space-y-6 mt-2">
              <div>
                <span className="block w-10 h-px bg-primary/40 mb-5"></span>
                <p className="text-[9.5px] uppercase tracking-[0.28em] text-primary/70 mb-2 font-medium">Visit Us</p>
                <p className="font-light text-[#1a1916]/60 leading-[1.7] text-sm">
                  AYKON COMMERCIAL COMPLEX,<br />
                  Manikonda Main Road, Near Puppalaguda,<br />
                  Hyderabad, Telangana 500089, India
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-8 pt-2">
                <div>
                  <p className="text-[9.5px] uppercase tracking-[0.28em] text-primary/70 mb-2 font-medium">Direct Inquiry</p>
                  <div className="space-y-1 font-light text-[#1a1916]/60 text-sm">
                    <a href="tel:+917093335656" className="block hover:text-primary transition-colors duration-600">+91 70933 35656</a>
                    <a href="tel:+919490032898" className="block hover:text-primary transition-colors duration-600">+91 94900 32898</a>
                  </div>
                </div>
                <div>
                  <p className="text-[9.5px] uppercase tracking-[0.28em] text-primary/70 mb-2 font-medium">Hours</p>
                  <p className="font-light text-[#1a1916]/60 text-sm">By appointment,<br/>daily.</p>
                </div>
              </div>
            </div>

            {/* Prestige note */}
            <p className="mt-10 text-[9.5px] uppercase tracking-[0.28em] text-[#1a1916]/25 italic font-serif">
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
            {/* Map — luxury integrated */}
            <div className="w-full h-40 md:h-48 relative overflow-hidden bg-[#eae5dd] border border-[#1a1916]/5 isolate">
              <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/50 via-transparent to-[#FAF7F2]/80 z-10 pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,247,242,0)_20%,rgba(250,247,242,0.85)_100%)] z-10 pointer-events-none" />
              <div className="absolute inset-0 ring-1 ring-inset ring-[#1a1916]/[0.04] z-20 pointer-events-none" />
              
              <motion.div
                style={{ y: mapY }}
                className="absolute inset-x-0 w-full h-[112%] -top-[6%]"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.828238127435!2d78.36782237589578!3d17.35096570324838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb95005abc1197%3A0x1a6a52490fe52d3e!2sAYKON%20COMMERCIAL%20COMPLEX!5e0!3m2!1sen!2sin!4v1718090000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(100%) contrast(85%) brightness(1.05) opacity(0.4)' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Showroom Location"
                />
              </motion.div>
            </div>
            {/* Map caption */}
            <div className="flex items-center gap-3 -mt-1">
              <div className="h-px flex-1 bg-[#1a1916]/5" />
              <p className="text-[8.5px] uppercase tracking-[0.35em] text-primary/50">Salon Location · Bandlaguda Jagir, Hyderabad</p>
              <div className="h-px flex-1 bg-[#1a1916]/5" />
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-white/60 backdrop-blur-sm border border-[#1a1916]/[0.06] p-7 md:p-9 space-y-7 shadow-[0_12px_48px_rgba(0,0,0,0.03)] relative overflow-hidden isolate"
            >
              {/* Internal subtle warm highlight wash */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[radial-gradient(circle_at_top_right,rgba(212,163,42,0.03),transparent_70%)] pointer-events-none z-0" />

              {/* Name */}
              <div className="relative z-10">
                <label htmlFor="ic-name" className="block text-[10px] uppercase tracking-[0.25em] text-primary/70 mb-3 font-medium">
                  Full Name
                </label>
                <input
                  id="ic-name" type="text" required
                  value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent border-b border-[#1a1916]/10 focus:border-primary/50 hover:border-[#1a1916]/20 focus:bg-primary/[0.02] outline-none py-2 text-[#1a1916] text-sm placeholder:text-[#1a1916]/20 transition-colors duration-600 font-light tracking-wide"
                />
              </div>

              {/* City + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10">
                <div>
                  <label htmlFor="ic-city" className="block text-[10px] uppercase tracking-[0.25em] text-primary/70 mb-3 font-medium">City</label>
                  <input
                    id="ic-city" type="text" required
                    value={city} onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-transparent border-b border-[#1a1916]/10 focus:border-primary/50 hover:border-[#1a1916]/20 focus:bg-primary/[0.02] outline-none py-2 text-[#1a1916] text-sm transition-colors duration-600 font-light tracking-wide"
                  />
                </div>
                <div>
                  <label htmlFor="ic-phone" className="block text-[10px] uppercase tracking-[0.25em] text-primary/70 mb-3 font-medium">Phone</label>
                  <input
                    id="ic-phone" type="tel" required
                    value={phone} onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-transparent border-b border-[#1a1916]/10 focus:border-primary/50 hover:border-[#1a1916]/20 focus:bg-primary/[0.02] outline-none py-2 text-[#1a1916] text-sm transition-colors duration-600 font-light tracking-wide"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="relative z-10">
                <label htmlFor="ic-email" className="block text-[10px] uppercase tracking-[0.25em] text-primary/70 mb-3 font-medium">
                  Email <span className="normal-case tracking-normal text-[#1a1916]/25">(optional)</span>
                </label>
                <input
                  id="ic-email" type="email"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-[#1a1916]/10 focus:border-primary/50 hover:border-[#1a1916]/20 focus:bg-primary/[0.02] outline-none py-2 text-[#1a1916] text-sm transition-colors duration-600 font-light tracking-wide"
                />
              </div>

              {/* Message */}
              <div className="relative z-10">
                <label htmlFor="ic-message" className="block text-[10px] uppercase tracking-[0.25em] text-primary/70 mb-3 font-medium">Message</label>
                <textarea
                  id="ic-message" rows={3}
                  value={message} onChange={(e) => setMessage(e.target.value)}
                  placeholder="Occasion, timeline, or collection of interest..."
                  className="w-full bg-transparent border-b border-[#1a1916]/10 focus:border-primary/50 hover:border-[#1a1916]/20 focus:bg-primary/[0.02] outline-none py-2 text-[#1a1916] text-sm placeholder:text-[#1a1916]/18 resize-none transition-colors duration-600 font-light tracking-wide"
                />
              </div>

              {/* Submit */}
              <div className="pt-3 relative z-10">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cta-shimmer btn-luxury w-full bg-primary text-primary-foreground py-3.5 uppercase tracking-[0.25em] text-[10.5px] disabled:opacity-50 font-medium"
                >
                  {isSubmitting ? "Sending Request..." : "Request Private Invitation"}
                </button>
                <p className="text-[8.5px] uppercase tracking-[0.22em] text-[#1a1916]/22 text-center mt-5 leading-normal">
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
