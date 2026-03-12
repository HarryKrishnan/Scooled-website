import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { allSportMemberships, faqs, sportTabs } from "@/data/mockData";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function MembershipsPage() {
  const [activeSport, setActiveSport] = useState("Swimming");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const memberFaqs = faqs.filter((_, i) => i >= 3);

  const plansForSport = allSportMemberships[activeSport] || [];

  return (
    <>
      <section className="pt-32 pb-16 bg-navy text-primary-foreground">
        <div className="container-custom text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl md:text-5xl font-bold mb-4">Membership Plans</motion.h1>
          <p className="text-lg text-primary-foreground/70">Flexible plans designed for your fitness and performance journey.</p>
        </div>
      </section>

      <section className="section-padding bg-background border-b border-border/5">
        <div className="container-custom">
          {/* Sport Selection Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {sportTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveSport(tab.key)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-display text-sm font-bold transition-all ${
                  activeSport === tab.key
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                <span>{tab.emoji}</span>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {plansForSport.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`card-premium relative overflow-hidden group ${plan.popular ? "ring-2 ring-primary border-primary/20" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-wider py-1 px-10 rotate-45 translate-x-[25px] translate-y-[10px] shadow-lg">
                      Best Value
                    </div>
                  </div>
                )}
                <h3 className="font-display text-xl font-bold text-foreground">{plan.name}</h3>
                <p className="text-xs text-muted-foreground mb-4 uppercase tracking-widest font-semibold">{plan.duration}</p>
                <div className="mb-6 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-foreground">₹{plan.price.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground">/ {plan.duration.toLowerCase()}</span>
                </div>
                <ul className="space-y-3 mb-8 min-h-[160px]">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-foreground/80">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 size={12} className="text-primary" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link 
                  to="/login" 
                  className={`block text-center py-3 rounded-xl text-sm font-bold transition-all ${
                    plan.popular 
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:scale-[1.02] hover:shadow-xl active:scale-95" 
                      : "bg-muted text-foreground hover:bg-muted/80 active:scale-95"
                  }`}
                >
                  Become a Member
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
