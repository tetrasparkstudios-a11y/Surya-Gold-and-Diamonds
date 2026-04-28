import { useState } from "react";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    phone: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello Surya Gold & Diamonds, I would like to request a private consultation.
    
Name: ${formData.name}
City: ${formData.city}
Phone: ${formData.phone}
Email: ${formData.email || 'N/A'}
Message: ${formData.message}`;
    
    toast.success("Opening WhatsApp with your inquiry...");
    
    window.open(`https://wa.me/917093335656?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden relative">
      <Navbar />

      <section className="pt-40 pb-24 md:pt-48 md:pb-32 px-6 bg-background relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-xl"
            >
              <p className="text-primary text-xs uppercase tracking-widest mb-6">Private Viewing</p>
              <h1 className="font-serif text-4xl md:text-6xl mb-8 leading-[1.1] text-foreground">Request a Private Consultation</h1>
              <p className="text-foreground/70 font-light mb-12 text-lg leading-relaxed">
                We welcome you to our Hyderabad showroom for a private consultation. Experience the weight, warmth, and brilliance of our pieces in person.
              </p>
              
              <div className="space-y-8 mb-12">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-foreground/50 mb-2">Visit Us</h4>
                  <p className="font-serif text-lg text-foreground/90 leading-relaxed">
                    Flat No. 103, My Adobe The Sirius,<br/>
                    Suryodaya Colony, Bandlaguda,<br/>
                    Ranga Reddy (D), Telangana, India
                  </p>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-foreground/50 mb-2">Direct Inquiry</h4>
                  <p className="font-light text-foreground/90 space-y-1">
                    <a href="tel:+917093335656" className="block hover:text-primary transition-colors">+91 70933 35656</a>
                    <a href="tel:+919490032898" className="block hover:text-primary transition-colors">+91 94900 32898</a>
                    <a href="mailto:suryagold2024@gmail.com" className="block hover:text-primary transition-colors mt-2">suryagold2024@gmail.com</a>
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="bg-secondary/30 rounded-3xl border border-primary/20 p-8 md:p-12 shadow-sm"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs uppercase tracking-widest text-foreground/70">Full Name</label>
                  <input required type="text" id="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-background border border-border/60 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="city" className="text-xs uppercase tracking-widest text-foreground/70">City</label>
                    <input required type="text" id="city" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="w-full bg-background border border-border/60 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-xs uppercase tracking-widest text-foreground/70">Phone</label>
                    <input required type="tel" id="phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-background border border-border/60 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs uppercase tracking-widest text-foreground/70">Email (Optional)</label>
                  <input type="email" id="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-background border border-border/60 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs uppercase tracking-widest text-foreground/70">Message</label>
                  <textarea rows={4} id="message" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-background border border-border/60 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all" />
                </div>

                <button type="submit" className="w-full bg-primary text-primary-foreground py-4 uppercase tracking-widest text-xs font-medium hover:bg-primary/90 transition-colors cta-shimmer">
                  Submit Inquiry
                </button>
              </form>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
