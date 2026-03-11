import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { payments, membershipPlans, userActiveMembership } from "@/data/mockData";
import { 
  Download, CreditCard, Smartphone, Globe, 
  Plus, Check, ChevronRight, Wallet, History, Info,
  Zap, ArrowUpRight, Gift, Loader2, AlertCircle, X, ArrowLeft
} from "lucide-react";

const methodIcon: Record<string, typeof CreditCard> = {
  "Credit Card": CreditCard,
  "Debit Card": CreditCard,
  "UPI": Smartphone,
  "Net Banking": Globe,
};

export default function PortalPayments() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  
  // New States for enhanced payment flow
  const [paymentStep, setPaymentStep] = useState<"type" | "upgrade" | "method" | "summary">("type");
  const [paymentType, setPaymentType] = useState<"standard" | "upgrade" | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<typeof membershipPlans[0] | null>(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponStatus, setCouponStatus] = useState<"none" | "validating" | "success" | "invalid">("none");
  const [discount, setDiscount] = useState(0);

  const paymentMethods = [
    { id: "upi", name: "UPI (PhonePe, Google Pay)", icon: Smartphone, color: "text-purple-500", bg: "bg-purple-500/10" },
    { id: "card", name: "Credit / Debit Card", icon: CreditCard, color: "text-blue-500", bg: "bg-blue-500/10" },
    { id: "netbanking", name: "Net Banking", icon: Globe, color: "text-orange-500", bg: "bg-orange-500/10" },
    { id: "wallet", name: "Scooled Wallet", icon: Wallet, color: "text-primary", bg: "bg-primary/10" },
  ];

  const handleVerifyCoupon = () => {
    if (!couponCode) return;
    setCouponStatus("validating");
    setTimeout(() => {
      // Demo logic: Success for 'SPLASH20' on upgrade, or 'SAVE10' anywhere
      if (couponCode.toUpperCase() === "SPLASH20" && paymentType === "upgrade") {
        setCouponStatus("success");
        setDiscount(500);
      } else if (couponCode.toUpperCase() === "SAVE10") {
        setCouponStatus("success");
        setDiscount(200);
      } else {
        setCouponStatus("invalid");
        setDiscount(0);
      }
    }, 1500);
  };

  const resetModal = () => {
    setShowPaymentModal(false);
    setPaymentStep("type");
    setPaymentType(null);
    setSelectedPlan(null);
    setSelectedMethod(null);
    setCouponCode("");
    setCouponStatus("none");
    setDiscount(0);
  };

  const baseAmount = paymentType === "upgrade" && selectedPlan ? selectedPlan.price : 3500;
  const totalAmount = baseAmount - discount;

  return (
    <div className="space-y-6">
      <div className="card-premium border-blue-tile bg-black/95 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight">Payments & Invoices</h1>
          <p className="text-sm text-white/70 font-bold mt-1">Manage your billing history and make secure payments.</p>
        </div>
        <button 
          onClick={() => setShowPaymentModal(true)}
          className="btn-primary flex items-center gap-2 px-8 py-2.5 shadow-lg shadow-primary/20 shrink-0"
        >
          <Plus size={18} /> Make a Payment
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-premium border-green-tile bg-black/95 group">
          <p className="text-[10px] uppercase tracking-widest font-black text-white/30 mb-1">Total Paid</p>
          <div className="flex items-end justify-between">
            <p className="text-2xl font-bold text-white">₹18,998</p>
            <div className="p-1.5 rounded-lg bg-green-500/10 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity">
              <Check size={14} />
            </div>
          </div>
        </div>
        <div className="card-premium border-gold-tile bg-black/95 group">
          <p className="text-[10px] uppercase tracking-widest font-black text-white/30 mb-1">Pending Fees</p>
          <div className="flex items-end justify-between">
            <p className="text-2xl font-bold text-amber-500">₹3,500</p>
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity">
              <Info size={14} />
            </div>
          </div>
        </div>
        <div className="card-premium border-white/5 bg-black/95">
          <p className="text-[10px] uppercase tracking-widest font-black text-white/30 mb-1">Upcoming Billing</p>
          <p className="text-2xl font-bold text-white">Apr 15</p>
        </div>
        <div className="card-premium border-white/5 bg-black/95">
          <p className="text-[10px] uppercase tracking-widest font-black text-white/30 mb-1">Invoices</p>
          <p className="text-2xl font-bold text-white">06</p>
        </div>
      </div>

      <div className="card-premium border-white/5 bg-black/95">
        <div className="flex items-center gap-2 mb-8">
          <History size={18} className="text-primary" />
          <h3 className="font-display font-bold text-white uppercase tracking-tight">Transaction History</h3>
        </div>
        
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {["Invoice", "Date", "Type", "Method", "Amount", "Status", ""].map((h) => (
                  <th key={h} className="text-left py-4 text-[10px] uppercase tracking-widest text-white/30 font-black">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {payments.map((p, i) => {
                const Icon = methodIcon[p.method] || CreditCard;
                return (
                  <motion.tr 
                    key={p.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="py-5 font-bold text-white">{p.invoice}</td>
                    <td className="py-5 text-white/50 font-medium">{p.date}</td>
                    <td className="py-5 font-bold text-white/80">{p.type}</td>
                    <td className="py-5">
                      <span className="flex items-center gap-3 text-white/60 font-bold">
                        <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-all">
                          <Icon size={14} />
                        </div>
                        {p.method}
                      </span>
                    </td>
                    <td className="py-5 font-black text-white">₹{p.amount.toLocaleString()}</td>
                    <td className="py-5">
                      <span className={`text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full font-black inline-flex items-center gap-2 ${
                        p.status === "Completed" ? "bg-green-500/10 text-green-500" :
                        p.status === "Pending" ? "bg-amber-500/10 text-amber-500" :
                        "bg-destructive/10 text-destructive"
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          p.status === "Completed" ? "bg-green-500" :
                          p.status === "Pending" ? "bg-amber-500" :
                          "bg-destructive"
                        } shadow-glow shadow-current`} />
                        {p.status}
                      </span>
                    </td>
                    <td className="py-5 text-right">
                      <button className="p-2.5 rounded-xl hover:bg-primary/10 hover:text-primary text-white/20 transition-all" title="Download Invoice">
                        <Download size={18} />
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enhanced Multi-Step Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
              onClick={resetModal}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-lg bg-black/95 rounded-[3rem] overflow-hidden shadow-2xl border border-white/10"
            >
              {/* Modal Header */}
              <div className="p-8 pb-4 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-4">
                  {paymentStep !== "type" && (
                    <button 
                      onClick={() => setPaymentStep(paymentStep === "method" ? (paymentType === "upgrade" ? "upgrade" : "type") : "type")}
                      className="p-3 rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-all"
                    >
                      <ArrowLeft size={18} />
                    </button>
                  )}
                  <div>
                    <h3 className="font-display font-bold text-xl text-white">
                      {paymentStep === "type" && "Select Payment Type"}
                      {paymentStep === "upgrade" && "Choose Upgrade Plan"}
                      {paymentStep === "method" && "Payment Method"}
                      {paymentStep === "summary" && "Confirm & Pay"}
                    </h3>
                  </div>
                </div>
                <button 
                  onClick={resetModal}
                  className="p-3 rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Scrollable Content */}
              <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                
                {/* STEP 1: Type Selection */}
                {paymentStep === "type" && (
                  <div className="space-y-4">
                    <button 
                      onClick={() => { setPaymentType("standard"); setPaymentStep("method"); }}
                      className="card-premium border-white/5 bg-white/5 hover:border-primary/50 transition-all group w-full text-left"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-5">
                          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-xl shadow-black/40">
                            <CreditCard size={28} />
                          </div>
                          <div>
                            <p className="font-bold text-lg text-white">Standard Payment</p>
                            <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mt-1">Pending fees & Top-ups</p>
                          </div>
                        </div>
                        <ChevronRight size={20} className="text-white/20 group-hover:text-primary transition-colors" />
                      </div>
                    </button>

                    <button 
                      onClick={() => { setPaymentType("upgrade"); setPaymentStep("upgrade"); }}
                      className="card-premium border-gold-tile bg-gold/5 hover:border-gold transition-all group w-full text-left"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-5">
                          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all shadow-xl shadow-black/40">
                            <Zap size={28} />
                          </div>
                          <div>
                            <p className="font-bold text-lg text-white">Upgrade Membership</p>
                            <p className="text-[10px] text-gold font-black uppercase tracking-widest mt-1">Boost your training benefits</p>
                          </div>
                        </div>
                        <ArrowUpRight size={20} className="text-gold/20 group-hover:text-gold transition-colors" />
                      </div>
                    </button>
                  </div>
                )}

                {/* STEP 2: Upgrade Logic */}
                {paymentStep === "upgrade" && (
                  <div className="space-y-4">
                    <p className="text-xs font-black uppercase tracking-widest text-white/30 mb-4 px-2">Elite Upgrade Tiers</p>
                    {membershipPlans.filter(p => p.price > userActiveMembership.price).map(plan => (
                      <button 
                        key={plan.id}
                        onClick={() => { setSelectedPlan(plan); setPaymentStep("method"); }}
                        className={`w-full p-6 text-left rounded-[2rem] border-2 transition-all group ${
                          selectedPlan?.id === plan.id ? "border-primary bg-primary/10 shadow-glow shadow-primary/10" : "border-white/5 bg-white/5 hover:border-primary/30"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className={`font-bold transition-colors ${selectedPlan?.id === plan.id ? "text-primary" : "text-white"}`}>{plan.name}</p>
                            <p className="text-2xl font-black text-white mt-1">₹{plan.price.toLocaleString()}</p>
                          </div>
                          <div className={`p-3 rounded-2xl transition-all ${selectedPlan?.id === plan.id ? "bg-primary text-white scale-110 shadow-lg" : "bg-white/5 text-white/40 group-hover:text-primary"}`}>
                            <Plus size={20} />
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* STEP 3 & Summary: Method & Offer Redemption */}
                {paymentStep === "method" && (
                  <div className="space-y-8">
                    {/* Amount Tile */}
                    <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 flex justify-between items-center shadow-2xl shadow-black/40">
                      <span className="text-xs font-black uppercase tracking-widest text-white/40">Due Amount</span>
                      <span className="text-3xl font-black text-white tracking-tighter">₹{totalAmount.toLocaleString()}</span>
                    </div>

                    {/* Offer Redemption Tile */}
                    <div className="p-6 rounded-[2.5rem] border-2 border-dashed border-primary/30 bg-primary/5 space-y-5">
                      <div className="flex items-center gap-3 text-primary">
                        <Gift size={20} />
                        <span className="text-xs font-black uppercase tracking-[0.2em]">Capability Center</span>
                      </div>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <input 
                            type="text" 
                            placeholder="PROMO CODE" 
                            value={couponCode}
                            onChange={(e) => { setCouponCode(e.target.value); setCouponStatus("none"); }}
                            className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 text-white font-bold text-sm focus:border-primary transition-all uppercase tracking-widest"
                          />
                          {couponStatus === "validating" && <Loader2 className="absolute right-4 top-4 animate-spin text-primary" size={18} />}
                          {couponStatus === "success" && <Check className="absolute right-4 top-4 text-emerald-400" size={18} />}
                          {couponStatus === "invalid" && <AlertCircle className="absolute right-4 top-4 text-destructive" size={18} />}
                        </div>
                        <button 
                          onClick={handleVerifyCoupon}
                          disabled={!couponCode || couponStatus === "validating"}
                          className="px-6 rounded-2xl bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary/90 transition-all disabled:opacity-50"
                        >
                          Verify
                        </button>
                      </div>
                      {couponStatus === "success" && (
                        <p className="text-[10px] font-black uppercase text-emerald-400 flex items-center gap-2 animate-in fade-in slide-in-from-top-1 tracking-widest px-2">
                          <Check size={14} strokeWidth={4} /> Code Applied! Save ₹{discount}
                        </p>
                      )}
                      {couponStatus === "invalid" && (
                        <p className="text-[10px] font-black uppercase text-destructive flex items-center gap-2 animate-in shake tracking-widest px-2">
                          <AlertCircle size={14} strokeWidth={4} /> Invalid or Expired
                        </p>
                      )}
                    </div>

                    {/* Method List */}
                    <div className="space-y-4">
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/30 px-2">Select Channel</p>
                      {paymentMethods.map((method) => (
                        <button
                          key={method.id}
                          onClick={() => setSelectedMethod(method.id)}
                          className={`w-full p-5 rounded-[2rem] border-2 flex items-center justify-between transition-all duration-300 ${
                            selectedMethod === method.id 
                            ? "border-primary bg-primary/10 shadow-glow shadow-primary/10 translate-x-1" 
                            : "border-white/5 bg-white/5 hover:border-white/10"
                          }`}
                        >
                          <div className="flex items-center gap-5">
                            <div className={`w-12 h-12 rounded-2xl ${method.bg} ${method.color} flex items-center justify-center shadow-lg`}>
                              <method.icon size={22} />
                            </div>
                            <span className="font-bold text-white text-base">{method.name}</span>
                          </div>
                          {selectedMethod === method.id && (
                            <motion.div 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white shadow-glow shadow-primary/40"
                            >
                              <Check size={14} strokeWidth={4} />
                            </motion.div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Modal Actions */}
              <div className="p-8 pt-4 border-t border-white/5 flex gap-4 bg-black/40">
                <button 
                  onClick={resetModal}
                  className="flex-1 py-5 rounded-2xl border border-white/10 font-black uppercase tracking-[0.2em] text-white/30 text-[10px] hover:bg-white/5 hover:text-white transition-all"
                >
                  Cancel
                </button>
                <button 
                  disabled={!selectedMethod || (paymentStep === "upgrade" && !selectedPlan)}
                  onClick={() => {
                    alert(`Simulating secure payment for ₹${totalAmount}...`);
                    resetModal();
                  }}
                  className="flex-[2.5] py-5 rounded-2xl bg-gradient-to-r from-primary to-aqua text-white text-[10px] font-black uppercase tracking-[0.25em] shadow-2xl shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-20 disabled:grayscale disabled:scale-100"
                >
                  Pay Now • ₹{totalAmount.toLocaleString()}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
