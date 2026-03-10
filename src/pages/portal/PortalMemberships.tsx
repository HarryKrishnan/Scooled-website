import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard, CheckCircle2, Calendar, ShieldCheck, Zap,
  ArrowUpRight, Crown, History, Gift, Loader2, AlertCircle, Check
} from "lucide-react";
import { userActiveMembership, membershipPlans } from "@/data/mockData";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function PortalMemberships() {
  const activePlan = userActiveMembership;

  // Redemption States
  const [promoCode, setPromoCode] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [promoStatus, setPromoStatus] = useState<"none" | "success" | "error">("none");
  const [promoMessage, setPromoMessage] = useState("");

  const handleRedeem = () => {
    if (!promoCode) return;
    setIsValidating(true);
    setPromoStatus("none");

    setTimeout(() => {
      setIsValidating(false);
      if (promoCode.toUpperCase() === "SWIMFREE") {
        setPromoStatus("success");
        setPromoMessage("Applied! 1 Week added to your current plan.");
      } else if (promoCode.toUpperCase() === "UPGRADE20") {
        setPromoStatus("success");
        setPromoMessage("Offer Active: 20% discount on next upgrade!");
      } else {
        setPromoStatus("error");
        setPromoMessage("Invalid or expired code.");
      }
    }, 1500);
  };

  // Mock Add-ons (Simulating redeemed campaign offers)
  const redeemedAddons = [
    { id: 1, name: "Summer Splash Bonus", type: "Discount", val: "20% Off Renewals", expiry: "Aug 2026", color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { id: 2, name: "Pro Coaching Pack", type: "Benefit", val: "+2 Free Sessions", expiry: "Apr 2026", color: "text-primary", bg: "bg-primary/10" },
  ];

  return (
    <div className="space-y-8">
      <div className="card-premium bg-white/95 border-white/40 shadow-xl shadow-navy/5 mb-8">
        <h1 className="font-display text-3xl font-bold text-primary tracking-tight">Memberships</h1>
        <p className="text-sm text-navy/70 font-bold mt-1">Manage your subscription and explore premium aquatic plans.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Active Membership Status */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-premium bg-gradient-to-br from-navy to-navy-light text-primary-foreground relative overflow-hidden group border-white/10"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
              <Crown size={120} />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <span className="px-3 py-1 bg-primary/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-cyan border border-primary/30">
                  {activePlan.status} Subscription
                </span>
              </div>

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div>
                  <h2 className="font-display text-3xl font-bold mb-1 text-white">{activePlan.name} Plan</h2>
                  <p className="text-white/70 text-sm">Valid until <span className="text-white font-bold">{activePlan.expiryDate}</span></p>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-[10px] uppercase tracking-wider text-white/40 mb-1">Billing cycle</p>
                  <p className="font-medium">{activePlan.duration}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-6 border-y border-primary-foreground/10">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-primary-foreground/40 mb-1">Pool Visits</p>
                  <p className="font-bold text-lg">{activePlan.usage.poolAccess} <span className="text-xs font-normal opacity-40">this month</span></p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-primary-foreground/40 mb-1">Guest Passes</p>
                  <p className="font-bold text-lg">{activePlan.usage.guestPassesUsed} / {activePlan.usage.guestPassesTotal}</p>
                </div>
                <div className="hidden sm:block">
                  <p className="text-[10px] uppercase tracking-wider text-primary-foreground/40 mb-1">Discount Active</p>
                  <p className="font-bold text-lg">10% Off <span className="text-xs font-normal opacity-40">coaching</span></p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button className="btn-primary text-xs py-2.5 px-6">Renew for Next Quarter</button>
                <button className="bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground text-xs py-2.5 px-6 rounded-full transition-colors">Manage Billing</button>
              </div>
            </div>
          </motion.div>

          {/* Active Add-ons Section */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
              <Gift size={18} className="text-primary" /> Active Add-ons
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {redeemedAddons.map((addon) => (
                <motion.div
                  key={addon.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="card-premium flex items-center justify-between group hover:border-primary/30 transition-all border-dashed border-2"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl ${addon.bg} ${addon.color} flex items-center justify-center`}>
                      <Zap size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black tracking-widest text-navy/40 mb-1">{addon.type}</p>
                      <h4 className="font-display font-bold text-navy leading-none">{addon.name}</h4>
                      <p className={`text-xs font-black mt-1 ${addon.color}`}>{addon.val}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] uppercase font-black tracking-widest text-navy/20 mb-1">Expires</p>
                    <p className="text-[10px] font-bold text-navy/60">{addon.expiry}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
              <Zap size={18} className="text-primary" /> Upgrade Options
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {membershipPlans.filter(p => p.price > activePlan.price).map((plan, i) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="card-premium hover:border-primary/50 transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-display font-bold text-foreground">{plan.name}</h4>
                    <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-primary transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="text-2xl font-bold text-foreground mb-4">₹{plan.price.toLocaleString()}</p>
                  <ul className="space-y-2 mb-6">
                    {plan.features.slice(0, 3).map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 size={12} className="text-primary" /> {f}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-2 bg-muted text-foreground text-[10px] font-bold uppercase tracking-widest rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors">Upgrade Now</button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card-premium">
            <h3 className="font-display text-base font-semibold text-foreground mb-4">Membership Perks</h3>
            <div className="space-y-4">
              {[
                { icon: ShieldCheck, title: "Priority Booking", desc: "Access slots 24h before non-members." },
                { icon: Calendar, title: "Free Cancellations", desc: "No fees for session cancellations." },
                { icon: History, title: "Visit History", desc: "Detailed logs of your monthly activity." },
              ].map((perk, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <perk.icon size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{perk.title}</p>
                    <p className="text-[10px] text-muted-foreground">{perk.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
