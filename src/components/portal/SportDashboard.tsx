import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  CalendarCheck, CreditCard, GraduationCap, ArrowRight,
  MapPin, Star, MessageSquare, Clock, Gift, Zap, X, ArrowLeft, Check,
  Smartphone, Wallet
} from "lucide-react";

interface SportDashboardProps {
  sportName: string;
  accentColor: string; // e.g. "text-primary"
  accentBg: string; // e.g. "bg-primary/10"
  accentBorder: string; // e.g. "border-primary/20"
  accentBadge: string; // e.g. "bg-primary"
  tileColor?: string; // e.g. "blue-tile"
  welcomeName: string;
  welcomeSubtitle?: string;
  statsPoint: number;
  campaigns: any[];
  upcomingBooking: {
    date: string;
    time: string;
    centre: string;
    type: string;
  };
  quickActions: any[];
  enrollments: any[];
  membership: {
    name: string;
    status: string;
    expiryDate: string;
  };
}

export default function SportDashboard({
  sportName,
  accentColor,
  accentBg,
  accentBorder,
  accentBadge,
  tileColor = "blue-tile",
  welcomeName,
  welcomeSubtitle,
  statsPoint,
  campaigns,
  upcomingBooking,
  quickActions,
  enrollments,
  membership
}: SportDashboardProps) {
  const [selectedCamp, setSelectedCamp] = useState<any | null>(null);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [manualCode, setManualCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [modalStep, setModalStep] = useState<"details" | "payment" | "success">("details");
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const resetModal = () => {
    setSelectedCamp(null);
    setIsRedeeming(false);
    setManualCode("");
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

  return (
    <div className="space-y-10">
      <div className={`card-premium border-${tileColor} flex flex-col md:flex-row md:items-center justify-between gap-6`}>
        <div className="flex flex-col gap-1">
          <h1 className="font-display text-4xl font-bold text-white tracking-tight">
            Welcome back, {welcomeName}! 👋
          </h1>
          <p className="text-white/70 font-semibold text-lg italic">
            {welcomeSubtitle || `You have 2 ${sportName.toLowerCase()} sessions scheduled for this week.`}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center">
            <span className={`text-[10px] uppercase font-black tracking-widest ${accentColor} mb-1`}>Status</span>
            <span className="text-sm font-bold text-white">Member</span>
          </div>
          <div className={`p-4 rounded-2xl ${accentBg} border ${accentBorder} flex flex-col items-center`}>
            <span className={`text-[10px] uppercase font-black tracking-widest ${accentColor} mb-1`}>Points</span>
            <span className={`text-sm font-bold ${accentColor}`}>{statsPoint.toLocaleString()}</span>
          </div>
        </div>
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
                    <span className={`px-4 py-1.5 ${accentBadge} rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg`}>
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
                          <h4 className={`text-[10px] font-black uppercase tracking-widest ${accentColor}`}>About this offer</h4>
                          <p className="text-white text-base font-semibold leading-relaxed">
                            {selectedCamp.desc} Buy this exclusive {sportName.toLowerCase()} add-on and boost your experience today!
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
                                <p className={`text-3xl font-black ${accentColor} leading-none`}>₹{finalPrice}</p>
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
                          style={{ background: sportName === "Futsal" ? "linear-gradient(135deg, #ea580c, #f97316)" : "" }}
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
                          <h4 className={`text-[10px] font-black uppercase tracking-widest ${accentColor}`}>Select Payment Method</h4>
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
                                ? `${accentBorder.replace('/20', '/40')} ${accentBg.replace('/10', '/5')} shadow-lg`
                                : `border-navy/5 hover:${accentBorder}`
                                }`}
                            >
                              <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-xl ${accentBg} ${accentColor} flex items-center justify-center`}>
                                  <method.icon size={20} />
                                </div>
                                <span className="font-bold text-white text-sm">{method.name}</span>
                              </div>
                              {selectedMethod === method.id && <Check className={`${accentColor}`} size={20} />}
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
                          style={{ background: sportName === "Futsal" ? "linear-gradient(135deg, #ea580c, #f97316)" : "" }}
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
                            The <span className={`${accentColor}`}>{selectedCamp.title}</span> has been added to your membership benefits.
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
        <div className={`card-premium border-${tileColor === 'blue-tile' ? 'green-tile' : tileColor} relative overflow-hidden group`}>
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all" />
          <h3 className={`text-sm font-black uppercase tracking-widest ${accentColor} mb-6 flex items-center gap-2`}>
            <CalendarCheck size={16} /> Booking
          </h3>
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className={`text-2xl font-bold ${accentColor}`}>{upcomingBooking.date}</span>
              <span className="text-sm font-bold text-white/60">{upcomingBooking.time}</span>
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
              <div className={`p-2 rounded-lg ${accentBg}`}>
                <MapPin size={16} className={`${accentColor}`} />
              </div>
              <div className="flex flex-col">
                <span className={`text-xs font-bold ${accentColor}`}>{upcomingBooking.centre} Centre</span>
                <span className="text-[10px] text-white/40 uppercase font-black">{upcomingBooking.type}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={`card-premium border-${tileColor === 'blue-tile' ? 'gold-tile' : tileColor} relative overflow-hidden group`}>
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-all" />
          <h3 className="text-sm font-black uppercase tracking-widest text-amber-500/60 mb-6 flex items-center gap-2">
            <CreditCard size={16} /> Subscription
          </h3>
          <div className="space-y-5">
            <div>
              <p className="text-2xl font-bold text-amber-500 leading-none mb-1">{membership.name} Plan</p>
              <p className="text-xs text-white/60 font-bold">Auto-renews on {membership.expiryDate}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-500/30">
                {membership.status}
              </span>
            </div>
            <Link to="/portal/memberships" className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest ${accentColor} hover:text-white transition-colors pt-2`}>
              Upgrade Plan <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action, i) => (
          <Link
            key={i}
            to={action.path}
            className={`card-premium border-${tileColor === 'blue-tile' ? 'cyan-tile' : tileColor} flex flex-col items-center justify-center p-6 gap-3 group hover:-translate-y-1 transition-transform`}
          >
            <div className={`p-4 rounded-2xl ${action.color} group-hover:scale-110 group-hover:-rotate-3 transition-all shadow-lg shadow-black/20`}>
              <action.icon size={28} />
            </div>
            <span className="text-white font-bold text-sm text-center">{action.label}</span>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <div className={`lg:col-span-3 card-premium border-${tileColor === 'blue-tile' ? 'red-tile' : tileColor}`}>
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl font-bold text-white flex items-center gap-2">
              <GraduationCap size={24} className={`${accentColor}`} /> Training Performance
            </h2>
            <Link to="/portal/programs" className={`text-xs font-bold ${accentColor} hover:underline`}>Full Analytics</Link>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {enrollments.map((prog) => (
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
                    className={`h-full bg-gradient-to-r ${accentBadge} to-emerald-400 relative`}
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
          <div className={`card-premium border-white/20 hover:border-${accentColor.replace('text-', '')}/40 transition-colors`}>
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
