import {
  CalendarCheck, Users, TrendingUp, Wallet, MessageSquare, UserPlus,
  ClipboardCheck, AlertTriangle, ArrowUpRight, ArrowDownRight
} from "lucide-react";
import { payments, customers, leads, complaints } from "@/data/mockData";

const overviewCards = [
  { label: "Today's Bookings", value: "47", change: "+12%", up: true, icon: CalendarCheck, color: "text-cyan-400", borderColor: "border-orange-tile" },
  { label: "Occupancy Rate", value: "78%", change: "+5%", up: true, icon: TrendingUp, color: "text-teal-400", borderColor: "border-teal-tile" },
  { label: "Renewals Due", value: "8", change: "", up: true, icon: Users, color: "text-yellow-400", borderColor: "border-yellow-tile" },
  { label: "Revenue (MTD)", value: "₹3.2L", change: "+18%", up: true, icon: Wallet, color: "text-orange-400", borderColor: "border-orange-tile" },
  { label: "Pending Complaints", value: complaints.filter(c => c.status === "Open").length.toString(), change: "", up: false, icon: MessageSquare, color: "text-red-400", borderColor: "border-teal-tile" },
  { label: "New Leads", value: leads.filter(l => l.status === "New").length.toString(), change: "+3", up: true, icon: UserPlus, color: "text-cyan-400", borderColor: "border-yellow-tile" },
  { label: "Attendance Today", value: "92%", change: "+2%", up: true, icon: ClipboardCheck, color: "text-teal-400", borderColor: "border-orange-tile" },
  { label: "Failed Payments", value: payments.filter(p => p.status === "Failed").length.toString(), change: "", up: false, icon: AlertTriangle, color: "text-red-400", borderColor: "border-teal-tile" },
];

export default function AdminOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-4xl font-bold text-white">Overview</h1>
        <p className="text-sm text-white/60 mt-1">Today's snapshot — March 10, 2026</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewCards.map((c, i) => (
          <div key={i} className={`card-premium hover:${c.borderColor} hover:-translate-y-2 transition-all duration-500 cursor-pointer group`}>
            <div className="flex items-center justify-between mb-3">
              <c.icon size={20} className={c.color} />
              {c.change && (
                <span className={`text-xs font-medium flex items-center gap-0.5 ${c.up ? "text-green-400" : "text-red-400"}`}>
                  {c.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {c.change}
                </span>
              )}
            </div>
            <p className="text-2xl font-bold text-white">{c.value}</p>
            <p className="text-xs text-white/60 mt-1">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Customers */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card-premium hover:border-orange-tile hover:-translate-y-2 transition-all duration-500">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Customers</h3>
          <div className="space-y-3">
            {customers.slice(0, 5).map((c) => (
              <div key={c.id} className="flex items-center justify-between hover:bg-white/5 p-2 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-xs font-bold">
                    {c.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{c.name}</p>
                    <p className="text-xs text-white/60">{c.membership}</p>
                  </div>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                  c.status === "Active" ? "bg-green-500/20 text-green-400 border-green-500/30" :
                  c.status === "Expired" ? "bg-red-500/20 text-red-400 border-red-500/30" :
                  "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                }`}>{c.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card-premium hover:border-teal-tile hover:-translate-y-2 transition-all duration-500">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Leads</h3>
          <div className="space-y-3">
            {leads.map((l) => (
              <div key={l.id} className="flex items-center justify-between hover:bg-white/5 p-2 rounded-xl transition-colors">
                <div>
                  <p className="text-sm font-medium text-white">{l.name}</p>
                  <p className="text-xs text-white/60">{l.interest} • {l.source}</p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                  l.status === "New" ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" :
                  l.status === "Contacted" ? "bg-blue-500/20 text-blue-400 border-blue-500/30" :
                  l.status === "Qualified" ? "bg-green-500/20 text-green-400 border-green-500/30" :
                  "bg-gray-500/20 text-gray-400 border-gray-500/30"
                }`}>{l.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Payments */}
      <div className="card-premium overflow-x-auto hover:border-yellow-tile hover:-translate-y-2 transition-all duration-500">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Payments</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              {["Customer", "Type", "Method", "Amount", "Status"].map((h) => (
                <th key={h} className="text-left py-2 text-xs text-white/40 font-semibold uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-2.5 font-medium text-white">{p.customer}</td>
                <td className="py-2.5 text-white/70">{p.type}</td>
                <td className="py-2.5 text-white/70">{p.method}</td>
                <td className="py-2.5 font-medium text-white">₹{p.amount.toLocaleString()}</td>
                <td className="py-2.5">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                    p.status === "Completed" ? "bg-green-500/20 text-green-400 border-green-500/30" :
                    p.status === "Pending" ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" :
                    "bg-red-500/20 text-red-400 border-red-500/30"
                  }`}>{p.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
