import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <section className="pt-32 pb-16 bg-navy text-primary-foreground">
        <div className="container-custom text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl md:text-5xl font-bold mb-4">Contact Us</motion.h1>
          <p className="text-lg text-primary-foreground/70">We'd love to hear from you. Reach out anytime.</p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">Get in Touch</h2>
              <div className="space-y-6 mb-10">
                {[
                  { icon: MapPin, label: "Address", value: "12 Marine Drive, Mumbai 400001" },
                  { icon: Phone, label: "Phone", value: "+91 98765 43210" },
                  { icon: Mail, label: "Email", value: "hello@scooledaquatics.com" },
                  { icon: Clock, label: "Hours", value: "Mon–Sat: 5:30 AM – 9:00 PM" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-premium">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Send size={24} className="text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-sm text-muted-foreground">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Name</label>
                      <input required className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm" placeholder="Your name" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Phone</label>
                      <input className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm" placeholder="+91 00000 00000" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                    <input required type="email" className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm" placeholder="you@email.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Message</label>
                    <textarea required rows={4} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm resize-none" placeholder="How can we help?" />
                  </div>
                  <button type="submit" className="btn-primary w-full text-center">Send Message</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
