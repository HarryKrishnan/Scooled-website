import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { payments } from "@/data/mockData";
import { 
  Download, CreditCard, Smartphone, Globe, 
  Plus, Check, ChevronRight, Wallet, History, Info
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

  const paymentMethods = [
    { id: "upi", name: "UPI (PhonePe, Google Pay)", icon: Smartphone, color: "text-purple-500", bg: "bg-purple-500/10" },
    { id: "card", name: "Credit / Debit Card", icon: CreditCard, color: "text-blue-500", bg: "bg-blue-500/10" },
    { id: "netbanking", name: "Net Banking", icon: Globe, color: "text-orange-500", bg: "bg-orange-500/10" },
    { id: "wallet", name: "Scooled Wallet", icon: Wallet, color: "text-primary", bg: "bg-primary/10" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Payments & Invoices</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your billing history and make secure payments.</p>
        </div>
        <button 
          onClick={() => setShowPaymentModal(true)}
          className="btn-primary flex items-center gap-2 px-6 py-2.5 shadow-lg shadow-primary/20"
        >
          <Plus size={18} /> Make a Payment
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-premium group">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Total Paid</p>
          <div className="flex items-end justify-between">
            <p className="text-2xl font-bold text-foreground">₹18,998</p>
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
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Upcoming Billing</p>
          <p className="text-2xl font-bold text-foreground">Apr 15</p>
        </div>
        <div className="card-premium">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Invoices</p>
          <p className="text-2xl font-bold text-foreground">06</p>
        </div>
      </div>

      <div className="card-premium">
        <div className="flex items-center gap-2 mb-6">
          <History size={18} className="text-primary" />
          <h3 className="font-display font-semibold text-foreground">Transaction History</h3>
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

      {/* Payment Modal Mockup */}
      <AnimatePresence>
        {showPaymentModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
              onClick={() => setShowPaymentModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-border bg-muted/30">
                <h3 className="font-display font-bold text-xl text-foreground">Choose Payment Method</h3>
                <p className="text-xs text-muted-foreground mt-1">Transaction ID: TXN_SAMPLE_123</p>
              </div>
              
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span className="text-muted-foreground">Amount Due:</span>
                  <span className="font-bold text-foreground text-lg">₹3,500</span>
                </div>
                
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`w-full p-4 rounded-xl border-2 flex items-center justify-between transition-all ${
                      selectedMethod === method.id 
                      ? "border-primary bg-primary/5 shadow-md scale-[1.02]" 
                      : "border-border hover:border-primary/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${method.bg} ${method.color} flex items-center justify-center`}>
                        <method.icon size={20} />
                      </div>
                      <span className="font-medium text-foreground text-sm">{method.name}</span>
                    </div>
                    {selectedMethod === method.id && <Check size={18} className="text-primary" />}
                    {selectedMethod !== method.id && <ChevronRight size={18} className="text-muted-foreground" />}
                  </button>
                ))}
              </div>
              
              <div className="p-6 bg-muted/30 flex gap-3">
                <button 
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-border font-medium text-foreground hover:bg-card transition-colors"
                >
                  Cancel
                </button>
                <button 
                  disabled={!selectedMethod}
                  onClick={() => {
                    alert("Simulating secure payment gateway redirection...");
                    setShowPaymentModal(false);
                  }}
                  className="flex-2 py-2.5 px-8 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-primary/20"
                >
                  Pay ₹3,500
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
