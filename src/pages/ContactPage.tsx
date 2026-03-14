import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import heroImg from "@/assets/hero-pool.jpg";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <>
      <section className="relative pt-32 pb-20 bg-navy text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={heroImg} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="font-display text-4xl md:text-5xl font-bold mb-4"
          >
            Contact Us
          </motion.h1>
          <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto">
            Have questions? We're here to help you start your sports and fitness journey.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <SectionHeading badge="Get in Touch" title="We'd Love to Hear from You" center={false} />
                <p className="text-muted-foreground leading-relaxed">
                  Whether you're interested in competitive coaching, kids' programs, or just have a general inquiry, our team is ready to assist you.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: Mail, title: "Email Us", details: "hello@scooled.com", sub: "Support available 24/7" },
                  { icon: Phone, title: "Call Us", details: "+91 98765 43210", sub: "Mon-Sat, 9am - 6pm" },
                  { icon: MapPin, title: "Visit Us", details: "123 Aquatic Lane, Downtown", sub: "Bangalore, Karnataka 560001" },
                  { icon: Clock, title: "Training Hours", details: "5:30 AM - 9:00 PM", sub: "Everyday including holidays" },
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 items-start"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="text-primary" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{item.title}</h4>
                      <p className="text-sm text-foreground/80">{item.details}</p>
                      <p className="text-[10px] text-muted-foreground uppercase font-semibold">{item.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card-premium p-8 lg:p-10 border-primary/20 shadow-xl shadow-primary/5 min-h-[400px] flex flex-col justify-center"
            >
              {!isSubmitted ? (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Full Name</label>
                      <input type="text" required placeholder="John Doe" className="w-full bg-muted/30 border border-border px-4 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Email Address</label>
                      <input type="email" required placeholder="john@example.com" className="w-full bg-muted/30 border border-border px-4 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary text-sm" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Subject</label>
                    <input type="text" required placeholder="Inquiry about Coaching" className="w-full bg-muted/30 border border-border px-4 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Message</label>
                    <textarea rows={4} required placeholder="Tell us more about your needs..." className="w-full bg-muted/30 border border-border px-4 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary text-sm resize-none"></textarea>
                  </div>
                  <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2 py-3 mt-4">
                    <Send size={18} /> Send Message
                  </button>
                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="text-primary" size={32} />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-4">Message Sent!</h3>
                  <p className="text-muted-foreground mb-8">
                    Thank you for contacting us. Our team will reach out to you shortly.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-sm font-bold text-primary hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
