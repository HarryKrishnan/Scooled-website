import { payments } from "@/data/mockData";
import { Search, Download, CreditCard, CheckCircle2, Clock, XCircle, ArrowUpRight } from "lucide-react";
import { useState } from "react";

type Payment = {
  id: string;
  customer: string;
  amount: number;
  type: string;
  method: string;
  status: string;
  date: string;
  time: string;
  invoice: string;
};

const methodIcons: Record<string, string> = {
  "UPI": "🔷",
  "Credit Card": "💳",
  "Debit Card": "💳",
  "Net Banking": "🏦",
  "Cash": "💵",
};

export default function AdminPayments() {
  const [search, setSearch] = useState("");
  const [paymentList] = useState<Payment[]>(payments);

  const filtered = paymentList.filter((p) => 
    p.customer.toLowerCase().includes(search.toLowerCase()) ||
    p.invoice.toLowerCase().includes(search.toLowerCase())
  );

  // Calculate stats
  const totalRevenue = paymentList
    .filter(p => p.status === "Completed")
    .reduce((sum, p) => sum + p.amount, 0);
  
  const completedCount = paymentList.filter(p => p.status === "Completed").length;
  const pendingCount = paymentList.filter(p => p.status === "Pending").length;
  const failedCount = paymentList.filter(p => p.status === "Failed").length;

  // Sort by date (most recent first)
  const sortedPayments = [...filtered].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Check if today
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    }
    // Check if yesterday
    if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }
    // Otherwise format as "Mar 10, 2025"
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Payments & Finance</h1>
          <p className="text-sm text-white/60 mt-1 font-medium">Transaction history and financial overview</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-2.5 text-white/60" />
            <input 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              placeholder="Search transactions..." 
              className="pl-10 pr-4 py-2 rounded-xl border border-white/10 bg-white/10 backdrop-blur-sm text-sm w-64 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-white placeholder:text-white/40" 
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-white border border-white/10 hover:bg-white/20 transition-colors text-sm font-bold shadow-sm">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-premium bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-white/60 uppercase tracking-wider">Total Revenue</p>
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <ArrowUpRight size={16} className="text-primary" />
            </div>
          </div>
          <p className="text-2xl font-bold text-primary">₹{totalRevenue.toLocaleString()}</p>
          <p className="text-xs text-white/40 mt-1 font-medium">From completed transactions</p>
        </div>

        <div className="card-premium hover:-translate-y-1 transition-transform">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-white/60 uppercase tracking-wider">Completed</p>
            <CheckCircle2 size={16} className="text-primary" />
          </div>
          <p className="text-2xl font-bold text-white">{completedCount}</p>
          <p className="text-xs text-white/40 mt-1 font-medium">Successful payments</p>
        </div>

        <div className="card-premium hover:-translate-y-1 transition-transform">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-white/60 uppercase tracking-wider">Pending</p>
            <Clock size={16} className="text-gold" />
          </div>
          <p className="text-2xl font-bold text-gold">{pendingCount}</p>
          <p className="text-xs text-white/40 mt-1 font-medium">Awaiting confirmation</p>
        </div>

        <div className="card-premium hover:-translate-y-1 transition-transform">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-white/60 uppercase tracking-wider">Failed</p>
            <XCircle size={16} className="text-destructive" />
          </div>
          <p className="text-2xl font-bold text-destructive">{failedCount}</p>
          <p className="text-xs text-white/40 mt-1 font-medium">Requires attention</p>
        </div>
      </div>

      {/* Transaction List - GPay Style */}
      <div className="card-premium">
        <div className="mb-4 pb-3 border-b border-white/10 flex items-center justify-between">
          <div>
            <h2 className="font-display text-lg font-bold text-white">Transaction History</h2>
            <p className="text-xs text-white/60 mt-0.5 font-medium">{filtered.length} transactions found</p>
          </div>
          <CreditCard size={20} className="text-primary" />
        </div>

        <div className="space-y-2">
          {sortedPayments.map((payment) => (
            <div 
              key={payment.id} 
              className="group p-4 rounded-xl hover:bg-white/10 transition-all border border-transparent hover:border-white/20 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                {/* Left: Customer Info */}
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                    {payment.customer.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-white text-sm">{payment.customer}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        payment.status === "Completed" ? "bg-primary/10 text-primary" :
                        payment.status === "Pending" ? "bg-gold/10 text-gold" :
                        "bg-destructive/10 text-destructive"
                      }`}>
                        {payment.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-xs text-white/60 font-medium">{payment.type}</span>
                      <span className="text-white/30">•</span>
                      <span className="text-xs text-white/60 flex items-center gap-1 font-medium">
                        <span>{methodIcons[payment.method]}</span>
                        {payment.method}
                      </span>
                      <span className="text-white/30">•</span>
                      <span className="text-xs text-white/40 font-medium">{payment.invoice}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Amount & DateTime */}
                <div className="text-right shrink-0 ml-4">
                  <p className={`text-lg font-bold ${
                    payment.status === "Completed" ? "text-primary" :
                    payment.status === "Pending" ? "text-gold" :
                    "text-destructive"
                  }`}>
                    {payment.status === "Failed" ? "-" : "+"}₹{payment.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-white/60 mt-0.5 font-medium">{formatDate(payment.date)}</p>
                  <p className="text-[10px] text-white/40 font-medium">{payment.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center">
              <Search className="w-8 h-8 text-white/40" />
            </div>
            <p className="text-white/60 text-sm font-medium">No transactions found</p>
            <p className="text-navy/40 text-xs mt-1">Try adjusting your search</p>
          </div>
        )}
      </div>
    </div>
  );
}
