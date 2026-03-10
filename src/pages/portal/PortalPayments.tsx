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
      <div className="card-premium bg-white/95 border-white/40 shadow-xl shadow-navy/5 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-primary tracking-tight">Payments & Invoices</h1>
          <p className="text-sm text-navy/70 font-bold mt-1">Manage your billing history and make secure payments.</p>
        </div>
        <button 
          onClick={() => setShowPaymentModal(true)}
          className="btn-primary flex items-center gap-2 px-8 py-2.5 shadow-lg shadow-primary/20 shrink-0"
        >
          <Plus size={18} /> Make a Payment
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-premium group">
          <p className="text-[10px] uppercase tracking-wider text-navy/40 mb-1">Total Paid</p>
          <div className="flex items-end justify-between">
            <p className="text-2xl font-bold text-navy">₹18,998</p>
            <div className="p-1.5 rounded-lg bg-green-500/10 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity">
              <Check size={14} />
            </div>
          </div>
        </div>
        <div className="card-premium group">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Pending Fees</p>
          <div className="flex items-end justify-between">
            <p className="text-2xl font-bold text-gold">₹3,500</p>
            <div className="p-1.5 rounded-lg bg-gold/10 text-gold opacity-0 group-hover:opacity-100 transition-opacity">
              <Info size={14} />
            </div>
          </div>
        </div>
        <div className="card-premium">
          <p className="text-[10px] uppercase tracking-wider text-navy/40 mb-1">Upcoming Billing</p>
          <p className="text-2xl font-bold text-navy">Apr 15</p>
        </div>
        <div className="card-premium">
          <p className="text-[10px] uppercase tracking-wider text-navy/40 mb-1">Invoices</p>
          <p className="text-2xl font-bold text-navy">06</p>
        </div>
      </div>

      <div className="card-premium">
        <div className="flex items-center gap-2 mb-6">
          <History size={18} className="text-primary" />
          <h3 className="font-display font-semibold text-navy">Transaction History</h3>
        </div>
        
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Invoice", "Date", "Type", "Method", "Amount", "Status", ""].map((h) => (
                  <th key={h} className="text-left py-4 text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{h}</th>
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
                    className="border-b border-border/50 hover:bg-muted/30 transition-colors group"
                  >
                    <td className="py-4 font-medium text-foreground">{p.invoice}</td>
                    <td className="py-4 text-muted-foreground">{p.date}</td>
                    <td className="py-4 font-medium text-foreground">{p.type}</td>
                    <td className="py-4">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-6 h-6 rounded bg-muted flex items-center justify-center">
                          <Icon size={12} />
                        </div>
                        {p.method}
                      </span>
                    </td>
                    <td className="py-4 font-bold text-foreground">₹{p.amount.toLocaleString()}</td>
                    <td className="py-4">
                      <span className={`text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold inline-flex items-center gap-1.5 ${
                        p.status === "Completed" ? "bg-green-500/10 text-green-500" :
                        p.status === "Pending" ? "bg-gold/10 text-gold" :
                        "bg-destructive/10 text-destructive"
                      }`}>
                        <div className={`w-1 h-1 rounded-full ${
                          p.status === "Completed" ? "bg-green-500" :
                          p.status === "Pending" ? "bg-gold" :
                          "bg-destructive"
                        }`} />
                        {p.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <button className="p-2 rounded-lg hover:bg-primary/10 hover:text-primary text-muted-foreground transition-all" title="Download Invoice">
                        <Download size={16} />
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
              className="absolute inset-0 bg-navy/80 backdrop-blur-md"
              onClick={resetModal}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-lg bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-white/20"
            >
              {/* Modal Header */}
              <div className="p-8 pb-4 flex items-center justify-between border-b border-navy/5">
                <div className="flex items-center gap-4">
                  {paymentStep !== "type" && (
                    <button 
                      onClick={() => setPaymentStep(paymentStep === "method" ? (paymentType === "upgrade" ? "upgrade" : "type") : "type")}
                      className="p-2 rounded-full hover:bg-navy/5 text-navy/40 transition-colors"
                    >
                      <ArrowLeft size={20} />
                    </button>
                  )}
                  <div>
                    <h3 className="font-display font-bold text-xl text-navy">
                      {paymentStep === "type" && "Select Payment Type"}
                      {paymentStep === "upgrade" && "Choose Upgrade Plan"}
                      {paymentStep === "method" && "Payment Method"}
                      {paymentStep === "summary" && "Confirm & Pay"}
                    </h3>
                  </div>
                </div>
                <button 
                  onClick={resetModal}
                  className="p-2 rounded-full hover:bg-navy/5 text-navy/40 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Scrollable Content */}
              <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                
                {/* STEP 1: Type Selection */}
                {paymentStep === "type" && (
                  <div className="space-y-4">
                    <button 
                      onClick={() => { setPaymentType("standard"); setPaymentStep("method"); }}
                      className="w-full p-6 text-left rounded-3xl border-2 border-navy/5 hover:border-primary/40 hover:bg-primary/5 transition-all group"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-navy/5 flex items-center justify-center text-navy group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                            <CreditCard size={24} />
                          </div>
                          <div>
                            <p className="font-bold text-navy">Standard Payment</p>
                            <p className="text-xs text-navy/40 font-bold uppercase">Pending fees & Top-ups</p>
                          </div>
                        </div>
                        <ChevronRight size={20} className="text-navy/20 group-hover:text-primary" />
                      </div>
                    </button>

                    <button 
                      onClick={() => { setPaymentType("upgrade"); setPaymentStep("upgrade"); }}
                      className="w-full p-6 text-left rounded-3xl border-2 border-gold/20 bg-gold/5 hover:border-gold hover:bg-gold/10 transition-all group"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-colors">
                            <Zap size={24} />
                          </div>
                          <div>
                            <p className="font-bold text-navy">Upgrade Membership</p>
                            <p className="text-xs text-gold font-bold uppercase">Change your existing plan</p>
                          </div>
                        </div>
                        <ArrowUpRight size={20} className="text-gold/40 group-hover:text-gold" />
                      </div>
                    </button>
                  </div>
                )}

                {/* STEP 2: Upgrade Logic */}
                {paymentStep === "upgrade" && (
                  <div className="space-y-4">
                    <p className="text-xs font-black uppercase tracking-widest text-navy/40 mb-2">Available Higher Tiers</p>
                    {membershipPlans.filter(p => p.price > userActiveMembership.price).map(plan => (
                      <button 
                        key={plan.id}
                        onClick={() => { setSelectedPlan(plan); setPaymentStep("method"); }}
                        className={`w-full p-5 text-left rounded-3xl border-2 transition-all ${
                          selectedPlan?.id === plan.id ? "border-primary bg-primary/5" : "border-navy/5 hover:border-primary/20"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-bold text-navy">{plan.name}</p>
                            <p className="text-xl font-black text-primary">₹{plan.price.toLocaleString()}</p>
                          </div>
                          <div className="p-2 rounded-xl bg-primary/10 text-primary">
                            <Plus size={18} />
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
                    <div className="p-6 rounded-3xl bg-navy/5 border border-navy/5 flex justify-between items-center">
                      <span className="text-sm font-bold text-navy/60">Total Amount</span>
                      <span className="text-2xl font-black text-navy">₹{totalAmount.toLocaleString()}</span>
                    </div>

                    {/* Offer Redemption Tile */}
                    <div className="p-6 rounded-3xl border-2 border-dashed border-primary/20 bg-primary/5 space-y-4">
                      <div className="flex items-center gap-2 text-primary">
                        <Gift size={18} />
                        <span className="text-xs font-black uppercase tracking-widest text-primary">Redeem Offer</span>
                      </div>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <input 
                            type="text" 
                            placeholder="Enter Code (e.g. SPLASH20)" 
                            value={couponCode}
                            onChange={(e) => { setCouponCode(e.target.value); setCouponStatus("none"); }}
                            className="w-full px-4 py-3 rounded-xl bg-white border border-navy/10 text-navy font-bold text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none uppercase"
                          />
                          {couponStatus === "validating" && <Loader2 className="absolute right-3 top-3 animate-spin text-primary" size={18} />}
                          {couponStatus === "success" && <Check className="absolute right-3 top-3 text-emerald-500" size={18} />}
                          {couponStatus === "invalid" && <AlertCircle className="absolute right-3 top-3 text-destructive" size={18} />}
                        </div>
                        <button 
                          onClick={handleVerifyCoupon}
                          disabled={!couponCode || couponStatus === "validating"}
                          className="px-6 rounded-xl bg-primary text-white text-xs font-black uppercase tracking-widest hover:bg-primary/90 transition-all disabled:opacity-50"
                        >
                          Verify
                        </button>
                      </div>
                      {couponStatus === "success" && (
                        <p className="text-[10px] font-bold text-emerald-600 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                          <Check size={12} /> Capability verified! You saved ₹{discount}.
                        </p>
                      )}
                      {couponStatus === "invalid" && (
                        <p className="text-[10px] font-bold text-destructive flex items-center gap-1 animate-in shake">
                          <AlertCircle size={12} /> Not capable or invalid code for this tier.
                        </p>
                      )}
                    </div>

                    {/* Method List */}
                    <div className="space-y-3">
                      <p className="text-[10px] font-black uppercase tracking-widest text-navy/40">Select Method</p>
                      {paymentMethods.map((method) => (
                        <button
                          key={method.id}
                          onClick={() => setSelectedMethod(method.id)}
                          className={`w-full p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${
                            selectedMethod === method.id 
                            ? "border-primary bg-primary/5 shadow-lg shadow-primary/5 scale-[1.02]" 
                            : "border-navy/5 hover:border-primary/20"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl ${method.bg} ${method.color} flex items-center justify-center`}>
                              <method.icon size={20} />
                            </div>
                            <span className="font-bold text-navy text-sm">{method.name}</span>
                          </div>
                          {selectedMethod === method.id && <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white"><Check size={12} strokeWidth={4} /></div>}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Modal Actions */}
              <div className="p-8 pt-4 border-t border-navy/5 flex gap-4">
                <button 
                  onClick={resetModal}
                  className="flex-1 py-4 px-6 rounded-2xl border border-navy/10 font-black uppercase tracking-widest text-navy/40 text-[10px] hover:bg-navy/5 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  disabled={!selectedMethod || (paymentStep === "upgrade" && !selectedPlan)}
                  onClick={() => {
                    alert(`Simulating secure payment for ₹${totalAmount}...`);
                    resetModal();
                  }}
                  className="flex-[2] py-4 px-8 rounded-2xl bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100"
                >
                  Secure Payment • ₹{totalAmount.toLocaleString()}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
