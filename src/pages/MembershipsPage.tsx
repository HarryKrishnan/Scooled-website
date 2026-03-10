import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { membershipPlans, faqs } from "@/data/mockData";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function MembershipsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const memberFaqs = faqs.filter((_, i) => i >= 3);

  return (
    <>
      <section className="pt-32 pb-16 bg-navy text-primary-foreground">
        <div className="container-custom text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl md:text-5xl font-bold mb-4">Membership Plans</motion.h1>
          <p className="text-lg text-primary-foreground/70">Flexible plans designed for every swimmer's needs.</p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {membershipPlans.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`card-premium relative ${plan.popular ? "ring-2 ring-primary" : ""}`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">Most Popular</span>
                )}
                <h3 className="font-display text-xl font-bold text-foreground">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.duration}</p>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-foreground">₹{plan.price.toLocaleString()}</span>
                </div>
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" /> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/login" className={`block text-center py-2.5 rounded-full text-sm font-semibold transition-all ${plan.popular ? "btn-primary w-full" : "border border-border text-foreground hover:bg-muted"}`}>
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-muted/50 text-center">
            <p className="text-sm text-muted-foreground">
              All plans auto-renew. You can cancel or modify your membership anytime from your customer portal. Refund policy applies for cancellations within 7 days.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/50">
        <div className="container-custom max-w-3xl">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-10">Membership FAQs</h2>
          <div className="space-y-3">
            {memberFaqs.map((faq, i) => (
              <div key={i} className="card-premium cursor-pointer" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-foreground text-sm">{faq.q}</h3>
                  <ChevronRight size={18} className={`text-muted-foreground transition-transform ${openFaq === i ? "rotate-90" : ""}`} />
                </div>
                {openFaq === i && <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
