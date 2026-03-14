import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Download, CreditCard, Smartphone, Globe, 
  Plus, Check, ChevronRight, Wallet, History, Info,
  Zap, ArrowUpRight, Gift, Loader2, AlertCircle, X, ArrowLeft
} from "lucide-react";
import { allSportMemberships, allSportPrograms } from "@/data/mockData";

// Futsal Specific Mock Data
const futsalPayments = [
  { id: "fp1", invoice: "INV-FUT-001", date: "Mar 01, 2026", type: "Annual Membership", method: "UPI", amount: 15999, status: "Completed" },
  { id: "fp2", invoice: "INV-FUT-002", date: "Feb 20, 2026", type: "Tournament Fee", method: "Credit Card", amount: 2500, status: "Completed" },
  { id: "fp3", invoice: "INV-FUT-003", date: "Feb 15, 2026", type: "Kit Purchase", method: "UPI", amount: 1800, status: "Completed" },
  { id: "fp4", invoice: "INV-FUT-004", date: "Feb 10, 2026", type: "Training Session", method: "Net Banking", amount: 1200, status: "Completed" },
  { id: "fp5", invoice: "INV-FUT-005", date: "Jan 15, 2026", type: "Court Booking", method: "UPI", amount: 2000, status: "Completed" },
];

const methodIcon: Record<string, typeof CreditCard> = {
  "Credit Card": CreditCard,
  "UPI": Smartphone,
  "Net Banking": Globe,
};

export default function PortalPayments() {
  const sportName = "Futsal";
  const memberships = allSportMemberships[sportName];
  const mockActive = memberships[1];

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [paymentStep, setPaymentStep] = useState<"type" | "upgrade" | "method" | "summary">("type");
  const [paymentType, setPaymentType] = useState<"standard" | "upgrade" | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<typeof memberships[0] | null>(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponStatus, setCouponStatus] = useState<"none" | "validating" | "success" | "invalid">("none");
  const [discount, setDiscount] = useState(0);

  const paymentMethods = [
    { id: "upi", name: "UPI (PhonePe, Google Pay)", icon: Smartphone, color: "text-purple-500", bg: "bg-purple-500/10" },
    { id: "card", name: "Credit / Debit Card", icon: CreditCard, color: "text-blue-500", bg: "bg-blue-500/10" },
    { id: "netbanking", name: "Net Banking", icon: Globe, color: "text-orange-500", bg: "bg-orange-500/10" },
    { id: "wallet", name: "Scooled Wallet", icon: Wallet, color: "text-orange-500", bg: "bg-orange-500/10" },
  ];

  const handleVerifyCoupon = () => {
    if (!couponCode) return;
    setCouponStatus("validating");
    setTimeout(() => {
      if (couponCode.toUpperCase() === "FUTSAL20") {
        setCouponStatus("success");
        setDiscount(500);
      } else {
        setCouponStatus("invalid");
        setDiscount(0);
      }
    }, 1000);
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

  const baseAmount = paymentType === "upgrade" && selectedPlan ? selectedPlan.price : 2000;
  const totalAmount = baseAmount - discount;

  return (
    <div className="space-y-6">
      <div className="card-premium border-orange-tile bg-black/95 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight">Payments & Invoices</h1>
          <p className="text-sm text-white/70 font-bold mt-1">Manage your Futsal billing history and secure payments.</p>
        </div>
        <button 
          onClick={() => setShowPaymentModal(true)}
          className="btn-primary flex items-center gap-2 px-8 py-2.5 shadow-lg shadow-orange-500/20 shrink-0 bg-orange-500 hover:bg-orange-600"
        >
          <Plus size={18} /> Make Payment
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-premium border-green-tile bg-black/95 group">
          <p className="text-[10px] uppercase tracking-widest font-black text-white/30 mb-1">Total Paid</p>
          <div className="flex items-end justify-between">
            <p className="text-2xl font-bold text-white">₹29,499</p>
            <div className="p-1.5 rounded-lg bg-green-500/10 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity">
              <Check size={14} />
            </div>
          </div>
        </div>
        <div className="card-premium border-gold-tile bg-black/95 group">
          <p className="text-[10px] uppercase tracking-widest font-black text-white/30 mb-1">Unpaid Fees</p>
          <div className="flex items-end justify-between">
            <p className="text-2xl font-bold text-orange-500">₹2,000</p>
            <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">
              <Info size={14} />
            </div>
          </div>
        </div>
        <div className="card-premium border-white/5 bg-black/95">
          <p className="text-[10px] uppercase tracking-widest font-black text-white/30 mb-1">Next Bill</p>
          <p className="text-2xl font-bold text-white">Mar 01, '27</p>
        </div>
        <div className="card-premium border-white/5 bg-black/95">
          <p className="text-[10px] uppercase tracking-widest font-black text-white/30 mb-1">Invoices</p>
          <p className="text-2xl font-bold text-white">05</p>
        </div>
      </div>

      <div className="card-premium border-white/5 bg-black/95">
        <div className="flex items-center gap-2 mb-8">
          <History size={18} className="text-orange-500" />
          <h3 className="font-display font-bold text-white uppercase tracking-tight">Match & Training Payments</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {["Invoice", "Date", "Category", "Method", "Amount", "Status", ""].map((h) => (
                  <th key={h} className="text-left py-4 text-[10px] uppercase tracking-widest text-white/30 font-black">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {futsalPayments.map((p, i) => {
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
                        <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-orange-500/20 group-hover:text-orange-500 transition-all">
                          <Icon size={14} />
                        </div>
                        {p.method}
                      </span>
                    </td>
                    <td className="py-5 font-black text-white">₹{p.amount.toLocaleString()}</td>
                    <td className="py-5">
                      <span className="text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full font-black inline-flex items-center gap-2 bg-green-500/10 text-green-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-glow shadow-current" />
                        {p.status}
                      </span>
                    </td>
                    <td className="py-5 text-right">
                      <button className="p-2.5 rounded-xl hover:bg-orange-500/10 hover:text-orange-500 text-white/20 transition-all">
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

      {/* Payment Modal */}
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
              <div className="p-8 pb-4 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-4">
                  {paymentStep !== "type" && (
                    <button onClick={() => setPaymentStep("type")} className="p-3 rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-all">
                      <ArrowLeft size={18} />
                    </button>
                  )}
                  <h3 className="font-display font-bold text-xl text-white">
                    {paymentStep === "type" ? "Fast Payment" : paymentStep === "upgrade" ? "Futsal Upgrade" : "Complete Match Pay"}
                  </h3>
                </div>
                <button onClick={resetModal} className="p-3 rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-all">
                  <X size={18} />
                </button>
              </div>

              <div className="p-8 max-h-[70vh] overflow-y-auto">
                {paymentStep === "type" && (
                  <div className="space-y-4">
                    <button onClick={() => { setPaymentType("standard"); setPaymentStep("method"); }} className="card-premium border-white/5 bg-white/5 hover:border-orange-500 transition-all group w-full text-left">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-5">
                          <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all">
                            <CreditCard size={28} />
                          </div>
                          <div>
                            <p className="font-bold text-lg text-white">Court/Training Fee</p>
                            <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mt-1">Pending arena fees</p>
                          </div>
                        </div>
                        <ChevronRight size={20} className="text-white/20 group-hover:text-orange-500" />
                      </div>
                    </button>
                    <button onClick={() => { setPaymentType("upgrade"); setPaymentStep("upgrade"); }} className="card-premium border-gold-tile bg-orange-500/5 hover:border-orange-500 transition-all group w-full text-left">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-5">
                          <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all">
                            <Zap size={28} />
                          </div>
                          <div>
                            <p className="font-bold text-lg text-white">Upgrade Futsal Plan</p>
                            <p className="text-[10px] text-orange-500 font-black uppercase tracking-widest mt-1">Elite match access</p>
                          </div>
                        </div>
                        <ArrowUpRight size={20} className="text-orange-500/20 group-hover:text-orange-500" />
                      </div>
                    </button>
                  </div>
                )}

                {paymentStep === "upgrade" && (
                  <div className="space-y-4">
                    {memberships.filter(p => p.price > mockActive.price).map(plan => (
                      <button key={plan.id} onClick={() => { setSelectedPlan(plan); setPaymentStep("method"); }} className={`w-full p-6 text-left rounded-[2rem] border-2 transition-all group ${selectedPlan?.id === plan.id ? "border-orange-500 bg-orange-500/10" : "border-white/5 bg-white/5 hover:border-orange-500/30"}`}>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className={`font-bold ${selectedPlan?.id === plan.id ? "text-orange-500" : "text-white"}`}>{plan.name}</p>
                            <p className="text-2xl font-black text-white mt-1">₹{plan.price.toLocaleString()}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {(paymentStep === "method" || paymentStep === "summary") && (
                  <div className="space-y-8">
                    <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 flex justify-between items-center">
                      <span className="text-xs font-black uppercase tracking-widest text-white/40">Amount Due</span>
                      <span className="text-3xl font-black text-white">₹{totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex gap-2">
                       <input type="text" placeholder="FUTSAL20" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} className="flex-1 px-5 py-4 rounded-2xl bg-black/40 border border-white/10 text-white font-bold text-sm focus:border-orange-500 outline-none transition-all" />
                       <button onClick={handleVerifyCoupon} className="px-6 rounded-2xl bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all">Verify</button>
                    </div>
                    {couponStatus === "success" && <p className="text-[10px] font-black uppercase text-green-500 px-2 mt-2">Saved ₹{discount}!</p>}
                    <div className="space-y-4">
                      {paymentMethods.map(m => (
                        <button key={m.id} onClick={() => setSelectedMethod(m.id)} className={`w-full p-5 rounded-[2rem] border-2 flex items-center justify-between transition-all ${selectedMethod === m.id ? "border-orange-500 bg-orange-500/10" : "border-white/5 bg-white/5"}`}>
                          <div className="flex items-center gap-5">
                            <div className={`w-12 h-12 rounded-2xl ${m.bg} ${m.color} flex items-center justify-center`}><m.icon size={22} /></div>
                            <span className="font-bold text-white">{m.name}</span>
                          </div>
                          {selectedMethod === m.id && <Check size={18} className="text-orange-500" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-8 pt-4 border-t border-white/5 bg-black/40">
                <button 
                  disabled={!selectedMethod}
                  onClick={() => resetModal()}
                  className="w-full py-5 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-orange-500/20 hover:scale-[1.02] transition-all disabled:opacity-20"
                >
                  Pay ₹{totalAmount.toLocaleString()} Now
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
