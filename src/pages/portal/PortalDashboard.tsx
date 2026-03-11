import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  CalendarCheck, CreditCard, GraduationCap, Bell, ArrowRight,
  MapPin, Star, MessageSquare, Clock, Gift, Zap, X, ShieldCheck,
  Smartphone, Wallet, ArrowLeft, Check
} from "lucide-react";
import { notifications, userActiveMembership, userEnrollments } from "@/data/mockData";
import summerSplashImg from "@/assets/summer_splash_offer_bg_1773151662663.png";
import proCoachingImg from "@/assets/pro_coaching_bundle_bg_1773151684239.png";
import aquaFitnessImg from "@/assets/aqua_fitness_masterclass_bg_1773152099078.png";
import familyWeekendImg from "@/assets/family_weekend_special_bg_1773152117111.png";
import { useProgressStore } from "@/store/progressStore";

const campaigns = [
  {
    id: 1,
    title: "Summer Splash Offer",
    desc: "Get 20% off on Annual Memberships this week!",
    image: summerSplashImg,
    badge: "Limited Time",
    basePrice: 5000,
  },
  {
    id: 2,
    title: "Pro Coaching Bundle",
    desc: "Buy 10 sessions, get 2 free for advanced swimmers.",
    image: proCoachingImg,
    badge: "Popular",
    basePrice: 3500,
  },
  {
    id: 3,
    title: "Aqua Fitness Masterclass",
    desc: "Join our expert-led aqua aerobics for a full-body workout.",
    image: aquaFitnessImg,
    badge: "New",
    basePrice: 1200,
  },
  {
    id: 4,
    title: "Family Weekend Special",
    desc: "Kids swim for free every Saturday & Sunday morning.",
    image: familyWeekendImg,
    badge: "Weekend Only",
    basePrice: 800,
  }
];

const upcomingBooking = {
  date: "Today, March 10",
  time: "6:30 AM – 7:30 AM",
  centre: "Downtown",
  type: "Open Swim",
};

const portalUser = "Aarav Patel";

const quickActions = [
  { label: "Book a Slot", path: "/portal/book", icon: CalendarCheck, color: "bg-primary/10 text-primary" },
  { label: "My Bookings", path: "/portal/bookings", icon: Clock, color: "bg-cyan/10 text-cyan" },
  { label: "View Programs", path: "/portal/programs", icon: GraduationCap, color: "bg-aqua/10 text-aqua" },
  { label: "Make Payment", path: "/portal/payments", icon: CreditCard, color: "bg-gold/10 text-gold" },
];

export default function PortalDashboard() {
  const [selectedCamp, setSelectedCamp] = useState<typeof campaigns[0] | null>(null);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [manualCode, setManualCode] = useState("");
  const [redeemStatus, setRedeemStatus] = useState<"none" | "success" | "error">("none");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [modalStep, setModalStep] = useState<"details" | "payment" | "success">("details");
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const resetModal = () => {
    setSelectedCamp(null);
    setIsRedeeming(false);
    setManualCode("");
    setRedeemStatus("none");
    setDiscountAmount(0);
    setModalStep("details");
    setSelectedMethod(null);
  };

  const calculateDiscount = (code: string) => {
    const upperCode = code.toUpperCase();
    if (upperCode === "SAVE10") return 100;
    if (upperCode === "SPLASH20") return 500;
    if (upperCode === "SWIMFREE") return 300;
    return 0;
  };

  const currentPrice = selectedCamp ? selectedCamp.basePrice : 0;
  const finalPrice = Math.max(0, currentPrice - discountAmount);

  const handleRedeem = (code?: string) => {
    const finalCode = code || manualCode;
    if (!finalCode && !selectedCamp) return;

    setIsRedeeming(true);
    setRedeemStatus("none");

    setTimeout(() => {
      setIsRedeeming(false);
      const discount = calculateDiscount(finalCode);
      if (discount > 0 || selectedCamp) {
        setDiscountAmount(discount);
        setRedeemStatus("success");
        if (code) {
          alert(`Success! Mid-plan benefit applied. You saved ₹${discount}! 🏊‍♂️`);
          setManualCode("");
        }
      } else {
        setRedeemStatus("error");
        alert("Invalid code for your current plan tier.");
      }
    }, 1500);
  };

  // get record via hook at top level
    const record = useProgressStore((s) => s.records.find((r) => r.trainee === portalUser));


  return (
    <div className="space-y-10">
      <div className="card-premium border-blue-tile flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="font-display text-4xl font-bold text-white tracking-tight">
            Welcome back, Aarav! 👋
          </h1>
          <p className="text-white/70 font-semibold text-lg italic">You have 2 sessions scheduled for this week.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center">
            <span className="text-[10px] uppercase font-black tracking-widest text-primary mb-1">Status</span>
            <span className="text-sm font-bold text-white">Member</span>
          </div>
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col items-center">
            <span className="text-[10px] uppercase font-black tracking-widest text-amber-500 mb-1">Points</span>
            <span className="text-sm font-bold text-amber-500">1,250</span>
          </div>
        </div>
      </div>


      {/* Membership & Coach Feedback */}
      {record && (
        <div className="card-premium">
          <h3 className="text-sm font-semibold text-foreground mb-4">Coach Feedback</h3>
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Level: {record.level}</p>
            <p className="text-xs text-muted-foreground">\"{record.note}\"</p>
            <p className="text-[10px] text-muted-foreground">Last updated: {record.lastUpdated}</p>
          </div>
        </div>
      )}
      <div className="card-premium">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <CreditCard size={16} className="text-primary" /> Membership
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Plan</span><span className="font-medium text-foreground">{userActiveMembership.name}</span></div>
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Status</span><span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{userActiveMembership.status}</span></div>
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Expires</span><span className="font-medium text-foreground">{userActiveMembership.expiryDate}</span></div>
        </div>
        <Link to="/portal/memberships" className="text-xs text-primary font-medium mt-4 block">Manage Membership</Link>
      </div>


      {/* Campaigns & Offers Section - Floating Marquee Style */}
      <div className="relative overflow-hidden -mx-4 px-4 py-4">
        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{
              x: [0, -1000]
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {[...campaigns, ...campaigns, ...campaigns].map((camp, i) => (
              <div
                key={`${camp.id}-${i}`}
                onClick={() => setSelectedCamp(camp)}
                className="relative h-[240px] w-[500px] shrink-0 rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-2xl shadow-black/10 border border-white/20 inline-block align-top"
              >
                <div className="absolute inset-0 z-0">
                  <img
                    src={camp.image}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent transition-opacity group-hover:opacity-80" />
                </div>


                <div className="relative z-10 h-full p-8 flex flex-col justify-end whitespace-normal">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-4 py-1.5 bg-primary rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-primary/30">
                      {camp.badge}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                      <ArrowRight size={20} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-display font-bold text-white leading-tight">
                      {camp.title}
                    </h3>
                    <p className="text-white/80 text-sm font-medium max-w-[90%] leading-relaxed">
                      {camp.desc}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-white font-bold text-xs transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span>View Details & Redeem</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Campaign Details Modal */}
      <AnimatePresence>
        {selectedCamp && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isRedeeming && setSelectedCamp(null)}
              className="absolute inset-0 bg-navy/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0a0a0a] rounded-[3rem] overflow-hidden shadow-2xl border border-white/20"
            >
              <div className="grid md:grid-cols-2">
                <div className="relative h-64 md:h-auto overflow-hidden">
                  <img
                    src={selectedCamp.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-lg rounded-full text-[10px] font-black uppercase tracking-widest text-white border border-white/30 mb-2 inline-block">
                      Limited Offer
                    </span>
                    <h2 className="text-3xl font-display font-bold text-white leading-tight">
                      {selectedCamp.title}
                    </h2>
                  </div>
                </div>

                <div className="p-10 flex flex-col justify-between bg-black/40 backdrop-blur-3xl min-h-[500px]">
                  <button
                    onClick={resetModal}
                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 text-white/40 transition-colors z-20"
                  >
                    <X size={20} />
                  </button>

                  <AnimatePresence mode="wait">
                    {modalStep === "details" && (
                      <motion.div
                        key="details"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <div className="space-y-3">
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">About this offer</h4>
                          <p className="text-white text-base font-semibold leading-relaxed">
                            {selectedCamp.desc} Buy this exclusive aquatic add-on and boost your swimming experience today!
                          </p>
                        </div>

                        <div className="space-y-4">
                          <div className="p-5 rounded-[2rem] bg-white/5 border border-white/10 space-y-4">
                            <div className="flex justify-between items-center">
                              <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Pricing Details</p>
                              {discountAmount > 0 && (
                                <span className="px-2 py-0.5 bg-emerald-500 text-white text-[8px] font-black uppercase tracking-widest rounded-full animate-pulse">
                                  Discount Applied
                                </span>
                              )}
                            </div>

                            <div className="flex items-end justify-between">
                              <div className="space-y-1">
                                {discountAmount > 0 && (
                                  <p className="text-sm font-bold text-white/30 line-through leading-none">₹{selectedCamp.basePrice}</p>
                                )}
                                <p className="text-3xl font-black text-primary leading-none">₹{finalPrice}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-1">Promo Code</p>
                                <input
                                  type="text"
                                  placeholder="Enter..."
                                  value={manualCode}
                                  onChange={(e) => {
                                    setManualCode(e.target.value);
                                    const d = calculateDiscount(e.target.value);
                                    setDiscountAmount(d);
                                  }}
                                  className="w-24 px-3 py-1.5 rounded-xl bg-black border border-white/10 text-white font-bold text-[10px] uppercase focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => setModalStep("payment")}
                          className="btn-primary w-full py-5 text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 flex items-center justify-center gap-3 hover:scale-[1.02] transition-all"
                        >
                          Redeem & Continue to Payment
                          <ArrowRight size={16} />
                        </button>
                      </motion.div>
                    )}

                    {modalStep === "payment" && (
                      <motion.div
                        key="payment"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <div className="flex items-center gap-3">
                          <button onClick={() => setModalStep("details")} className="p-2 -ml-2 rounded-full hover:bg-navy/5 text-navy/40">
                            <ArrowLeft size={20} />
                          </button>
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Select Payment Method</h4>
                        </div>

                        <div className="space-y-3">
                          {[
                            { id: 'upi', name: 'UPI / Google Pay', icon: Smartphone },
                            { id: 'card', name: 'Credit / Debit Card', icon: CreditCard },
                            { id: 'wallet', name: 'Scooled Wallet', icon: Wallet },
                          ].map(method => (
                            <button
                              key={method.id}
                              onClick={() => setSelectedMethod(method.id)}
                              className={`w-full p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${selectedMethod === method.id
                                ? "border-primary bg-primary/5 shadow-lg shadow-primary/5 scale-[1.02]"
                                : "border-navy/5 hover:border-primary/20"
                                }`}
                            >
                              <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center`}>
                                  <method.icon size={20} />
                                </div>
                                <span className="font-bold text-white text-sm">{method.name}</span>
                              </div>
                              {selectedMethod === method.id && <Check className="text-primary" size={20} />}
                            </button>
                          ))}
                        </div>

                        <button
                          onClick={() => {
                            setIsRedeeming(true);
                            setTimeout(() => {
                              setIsRedeeming(false);
                              setModalStep("success");
                            }, 2000);
                          }}
                          disabled={!selectedMethod || isRedeeming}
                          className="btn-primary w-full py-5 text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 flex items-center justify-center gap-3 hover:scale-[1.02] transition-all disabled:opacity-50"
                        >
                          {isRedeeming ? "Processing..." : `Pay ₹${finalPrice} Now`}
                          {!isRedeeming && <Gift size={16} />}
                        </button>
                      </motion.div>
                    )}

                    {modalStep === "success" && (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center gap-6 text-center h-full pt-10"
                      >
                        <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center animate-bounce">
                          <Check size={40} strokeWidth={3} />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-2xl font-display font-bold text-white uppercase tracking-tight">Payment Successful!</h3>
                          <p className="text-sm font-bold text-white/60">
                            The <span className="text-primary">{selectedCamp.title}</span> has been added to your membership benefits.
                          </p>
                        </div>
                        <button
                          onClick={resetModal}
                          className="px-8 py-3 bg-navy text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-navy/80 transition-all"
                        >
                          Back to Dashboard
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {modalStep !== "success" && (
                    <p className="text-center text-[9px] text-navy/30 font-bold mt-4 uppercase tracking-widest leading-relaxed">
                      Terms & conditions apply. This will be added as an active sub-offer.
                    </p>
                  )}
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card-premium border-green-tile relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all" />
          <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-6 flex items-center gap-2">
            <CalendarCheck size={16} /> Booking
          </h3>
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-primary">{upcomingBooking.date}</span>
              <span className="text-sm font-bold text-aqua">{upcomingBooking.time}</span>
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
              <div className="p-2 rounded-lg bg-primary/10">
                <MapPin size={16} className="text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-primary">{upcomingBooking.centre} Centre</span>
                <span className="text-[10px] text-aqua uppercase font-black">{upcomingBooking.type}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card-premium border-gold-tile relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-all" />
          <h3 className="text-sm font-black uppercase tracking-widest text-amber-500/60 mb-6 flex items-center gap-2">
            <CreditCard size={16} /> Subscription
          </h3>
          <div className="space-y-5">
            <div>
              <p className="text-2xl font-bold text-amber-500 leading-none mb-1">{userActiveMembership.name} Plan</p>
              <p className="text-xs text-white/60 font-bold">Auto-renews on {userActiveMembership.expiryDate}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-500/30">
                {userActiveMembership.status}
              </span>
            </div>
            <Link to="/portal/memberships" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:text-aqua transition-colors pt-2">
              Upgrade Plan <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 card-premium border-red-tile">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl font-bold text-white flex items-center gap-2">
              <GraduationCap size={24} className="text-primary" /> Training Performance
            </h2>
            <Link to="/portal/programs" className="text-xs font-bold text-primary hover:underline">Full Analytics</Link>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {userEnrollments.map((prog) => (
              <div key={prog.programId} className="space-y-3">
                <div className="flex justify-between items-end">
                  <p className="text-sm font-bold text-white">{prog.title}</p>
                  <div className="flex items-center gap-1">
                    <Star size={10} className="fill-amber-500 text-amber-500" />
                    <p className="text-xs font-black text-white">{prog.progress}%</p>
                  </div>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${prog.progress}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-primary to-aqua relative"
                  >
                    <div className="absolute top-0 right-0 w-8 h-full bg-white/20 blur-sm" />
                  </motion.div>
                </div>
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/30">
                  <span>{prog.sessionsCompleted} Sessions</span>
                  <span>{prog.sessionsTotal - prog.sessionsCompleted} Left</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="card-premium border-white/20 hover:border-primary/40 transition-colors">
            <h3 className="text-sm font-bold text-white mb-4">Need Help?</h3>
            <p className="text-xs text-white/60 leading-relaxed mb-6">Our support team is available from 9 AM to 6 PM every day.</p>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-white transition-all border border-white/10">
                Chat Support <MessageSquare size={14} />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-white transition-all border border-white/10">
                Call Manager <Clock size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
