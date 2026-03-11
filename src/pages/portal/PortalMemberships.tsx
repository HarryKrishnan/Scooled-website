import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard, CheckCircle2, Calendar, ShieldCheck, Zap,
  ArrowUpRight, Crown, History, Gift, Loader2, AlertCircle, Check, ChevronRight, ChevronLeft
} from "lucide-react";
import { userActiveMembership, membershipPlans } from "@/data/mockData";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";

// Campaign Images from Dashboard
import summerSplashImg from "@/assets/summer_splash_offer_bg_1773151662663.png";
import proCoachingImg from "@/assets/pro_coaching_bundle_bg_1773151684239.png";

export default function PortalMemberships() {
  const activePlan = userActiveMembership;
  const addonScrollRef = useRef<HTMLDivElement>(null);
  const upgradeScrollRef = useRef<HTMLDivElement>(null);

  // Redemption States
  const [promoCode, setPromoCode] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [promoStatus, setPromoStatus] = useState<"none" | "success" | "error">("none");
  const [promoMessage, setPromoMessage] = useState("");

  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: "left" | "right") => {
    if (ref.current) {
      const { scrollLeft, clientWidth } = ref.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      ref.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

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

  // Mock Add-ons with Campaign Images
  const redeemedAddons = [
    { 
      id: 1, 
      name: "Summer Splash Bonus", 
      type: "Discount", 
      val: "20% Off Renewals", 
      expiry: "Aug 2026", 
      color: "text-emerald-500", 
      bg: "bg-emerald-500/10",
      image: summerSplashImg,
      desc: "An exclusive summer benefit providing significant discounts on all annual plan renewals."
    },
    { 
      id: 2, 
      name: "Pro Coaching Pack", 
      type: "Benefit", 
      val: "+2 Free Sessions", 
      expiry: "Apr 2026", 
      color: "text-primary", 
      bg: "bg-primary/10",
      image: proCoachingImg,
      desc: "Master your strokes with two additional expert coaching sessions included in your plan."
    },
    { 
      id: 3, 
      name: "Early Bird Access", 
      type: "Priority", 
      val: "Daily 5AM Entry", 
      expiry: "Dec 2025", 
      color: "text-gold", 
      bg: "bg-gold/10",
      image: summerSplashImg,
      desc: "Get exclusive early morning access to the Olympic pool before standard hours."
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="card-premium border-blue-tile bg-black/95 mb-8">
        <h1 className="font-display text-3xl font-bold text-white tracking-tight">Memberships</h1>
        <p className="text-sm text-white/70 font-bold mt-1">Manage your subscription and explore premium aquatic plans.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-12">
          {/* Active Membership Status */}
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
                  <p className="font-medium text-white">{activePlan.duration}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-6 border-y border-primary-foreground/10">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-primary-foreground/40 mb-1">Pool Visits</p>
                  <p className="font-bold text-lg text-white">{activePlan.usage.poolAccess} <span className="text-xs font-normal opacity-40">this month</span></p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-primary-foreground/40 mb-1">Guest Passes</p>
                  <p className="font-bold text-lg text-white">{activePlan.usage.guestPassesUsed} / {activePlan.usage.guestPassesTotal}</p>
                </div>
                <div className="hidden sm:block">
                  <p className="text-[10px] uppercase tracking-wider text-primary-foreground/40 mb-1">Discount Active</p>
                  <p className="font-bold text-lg text-white">10% Off <span className="text-xs font-normal opacity-40">coaching</span></p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button className="btn-primary text-xs py-2.5 px-6">Renew for Next Quarter</button>
                <button className="bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground text-xs py-2.5 px-6 rounded-full transition-colors">Manage Billing</button>
              </div>
            </div>
          </motion.div>

          {/* Active Add-ons Section */}
          <div className="card-premium space-y-8 bg-black/95 border-white/5 shadow-2xl shadow-black/40">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-2xl font-bold text-white flex items-center gap-4">
                  <Gift size={24} className="text-primary" /> Active Add-ons
                </h3>
                <p className="text-xs text-white/40 font-bold mt-1 ml-10">Exclusive rewards active on your account.</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => scroll(addonScrollRef, "left")} className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/20 hover:text-primary hover:border-primary/40 transition-all">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={() => scroll(addonScrollRef, "right")} className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/20 hover:text-primary hover:border-primary/40 transition-all">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
            
            <div 
              ref={addonScrollRef}
              className="flex gap-8 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4 -mx-2 px-2"
            >
              {redeemedAddons.map((addon) => (
                <motion.div
                  key={addon.id}
                  whileHover={{ y: -5 }}
                  className="min-w-[320px] md:min-w-[400px] snap-center rounded-[2.5rem] bg-white/5 border border-white/10 shadow-2xl shadow-black/20 overflow-hidden group"
                >
                  <div className="relative h-48">
                    <img src={addon.image} alt="" className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <div className="absolute bottom-6 left-8">
                      <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] bg-primary/20 text-primary border border-primary/30 backdrop-blur-md`}>
                        {addon.type}
                      </span>
                      <h4 className="text-2xl font-black text-white mt-3 tracking-tight">{addon.name}</h4>
                    </div>
                  </div>
                  <div className="p-8 space-y-4">
                    <p className="text-sm text-white/50 font-medium leading-relaxed">
                      {addon.desc}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <span className="text-lg font-black text-primary tracking-tighter">{addon.val}</span>
                      <div className="flex items-center gap-2">
                         <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-glow shadow-primary/40" />
                         <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Expires {addon.expiry}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Upgrade Plans */}
          <div className="space-y-8">
            <h3 className="font-display text-2xl font-bold text-white px-2">Upgrade Opportunities</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {membershipPlans.filter(p => p.id !== activePlan.id).map((plan) => (
                <motion.div
                  key={plan.id}
                  whileHover={{ y: -8 }}
                  className="card-premium bg-black/95 border-white/5 hover:border-primary/40 transition-all group"
                >
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h4 className="font-display font-black text-2xl text-white tracking-tight italic">{plan.name}</h4>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mt-2 flex items-center gap-2">
                        <Zap size={12} /> Premium Tier
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-white/5 text-white/40 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-xl shadow-black/40">
                       <ArrowUpRight size={24} />
                    </div>
                  </div>
                  <div className="mb-8 p-6 bg-white/5 rounded-3xl border border-white/5">
                    <span className="text-4xl font-black text-white tracking-tighter italic">₹{plan.price.toLocaleString()}</span>
                    <span className="text-xs font-black text-white/20 uppercase tracking-widest ml-3">/ month</span>
                  </div>
                  <ul className="space-y-4 mb-10">
                    {plan.features.slice(0, 3).map((f, j) => (
                      <li key={j} className="flex items-center gap-4 text-sm font-bold text-white/60">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                          <Check size={12} className="text-primary" />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-5 rounded-2xl bg-gradient-to-r from-primary to-aqua text-white text-[11px] font-black uppercase tracking-[0.25em] shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                    Upgrade Now
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card-premium border-white/5 bg-black/95 shadow-2xl shadow-black/40">
            <h3 className="font-display text-lg font-bold text-white mb-8 uppercase tracking-tight">Membership Perks</h3>
            <div className="space-y-8">
              {[
                { icon: ShieldCheck, title: "Priority Booking", desc: "Access slots 24h before non-members.", color: "text-emerald-500" },
                { icon: Calendar, title: "Free Cancellations", desc: "No fees for session cancellations.", color: "text-primary" },
                { icon: History, title: "Visit History", desc: "Detailed logs of your monthly activity.", color: "text-gold" },
              ].map((perk, i) => (
                <div key={i} className="flex gap-5 group">
                  <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-primary transition-all shadow-lg shadow-black/40 border border-white/10`}>
                    <perk.icon size={20} className={`${perk.color} group-hover:text-white transition-all`} />
                  </div>
                  <div>
                    <p className="text-sm font-black text-white tracking-tight">{perk.title}</p>
                    <p className="text-[11px] font-bold text-white/30 mt-1 leading-relaxed">{perk.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-premium border-gold-tile bg-black/95 shadow-2xl shadow-gold/5">
            <div className="flex items-center gap-3 text-gold mb-6">
              <Gift size={22} className="shadow-white" />
              <h4 className="text-sm font-black uppercase tracking-[0.2em]">Global Promo</h4>
            </div>
            <p className="text-xs text-white/40 font-bold mb-8 italic leading-relaxed">Have a gift card code? Redeem it now to extend your premium plan instantly.</p>
            <div className="space-y-4">
              <div className="relative">
                <input 
                  type="text" 
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="PROMOCODE"
                  className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-xs uppercase tracking-widest focus:border-gold outline-none transition-all placeholder:text-white/10"
                />
                {isValidating && <Loader2 size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-gold animate-spin" />}
              </div>
              
              <AnimatePresence>
                {promoStatus !== "none" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest p-3 rounded-xl border ${
                      promoStatus === "success" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-destructive/10 text-destructive border-destructive/20"
                    }`}
                  >
                    {promoStatus === "success" ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                    {promoMessage}
                  </motion.div>
                )}
              </AnimatePresence>

              <button 
                onClick={handleRedeem}
                disabled={isValidating || !promoCode}
                className="w-full py-5 rounded-2xl bg-gold text-white text-[11px] font-black uppercase tracking-[0.25em] hover:bg-gold-light hover:shadow-glow hover:shadow-gold/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-xl shadow-gold/10"
              >
                Redeem Gift
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
