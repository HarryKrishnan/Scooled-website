import {
  CalendarCheck, Users, TrendingUp, Wallet, MessageSquare, UserPlus,
  ClipboardCheck, AlertTriangle, ArrowUpRight, ArrowDownRight
} from "lucide-react";
import { payments, customers, leads, complaints } from "@/data/mockData";

const overviewCards = [
  { label: "Today's Bookings", value: "47", change: "+12%", up: true, icon: CalendarCheck, color: "text-primary" },
  { label: "Occupancy Rate", value: "78%", change: "+5%", up: true, icon: TrendingUp, color: "text-cyan" },
  { label: "Renewals Due", value: "8", change: "", up: true, icon: Users, color: "text-gold" },
  { label: "Revenue (MTD)", value: "₹3.2L", change: "+18%", up: true, icon: Wallet, color: "text-aqua" },
  { label: "Pending Complaints", value: complaints.filter(c => c.status === "Open").length.toString(), change: "", up: false, icon: MessageSquare, color: "text-destructive" },
  { label: "New Leads", value: leads.filter(l => l.status === "New").length.toString(), change: "+3", up: true, icon: UserPlus, color: "text-primary" },
  { label: "Attendance Today", value: "92%", change: "+2%", up: true, icon: ClipboardCheck, color: "text-cyan" },
  { label: "Failed Payments", value: payments.filter(p => p.status === "Failed").length.toString(), change: "", up: false, icon: AlertTriangle, color: "text-destructive" },
];

export default function AdminOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Overview</h1>
        <p className="text-sm text-muted-foreground mt-1">Today's snapshot — March 10, 2025</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewCards.map((c, i) => (
          <div key={i} className="admin-card">
            <div className="flex items-center justify-between mb-3">
              <c.icon size={20} className={c.color} />
              {c.change && (
                <span className={`text-xs font-medium flex items-center gap-0.5 ${c.up ? "text-primary" : "text-destructive"}`}>
                  {c.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {c.change}
                </span>
              )}
            </div>
            <p className="text-2xl font-bold text-foreground">{c.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Customers */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="admin-card">
          <h3 className="text-sm font-semibold text-foreground mb-4">Recent Customers</h3>
          <div className="space-y-3">
            {customers.slice(0, 5).map((c) => (
              <div key={c.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                    {c.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.membership}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  c.status === "Active" ? "bg-primary/10 text-primary" :
                  c.status === "Expired" ? "bg-destructive/10 text-destructive" :
                  "bg-gold/10 text-gold"
                }`}>{c.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-card">
          <h3 className="text-sm font-semibold text-foreground mb-4">Recent Leads</h3>
          <div className="space-y-3">
            {leads.map((l) => (
              <div key={l.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{l.name}</p>
                  <p className="text-xs text-muted-foreground">{l.interest} • {l.source}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  l.status === "New" ? "bg-primary/10 text-primary" :
                  l.status === "Contacted" ? "bg-cyan/10 text-cyan" :
                  l.status === "Qualified" ? "bg-aqua/10 text-aqua" :
                  "bg-muted text-muted-foreground"
                }`}>{l.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Payments */}
      <div className="admin-card overflow-x-auto">
        <h3 className="text-sm font-semibold text-foreground mb-4">Recent Payments</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {["Customer", "Type", "Method", "Amount", "Status"].map((h) => (
                <th key={h} className="text-left py-2 text-xs text-muted-foreground font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id} className="border-b border-border/50">
                <td className="py-2.5 font-medium text-foreground">{p.customer}</td>
                <td className="py-2.5 text-muted-foreground">{p.type}</td>
                <td className="py-2.5 text-muted-foreground">{p.method}</td>
                <td className="py-2.5 font-medium text-foreground">₹{p.amount.toLocaleString()}</td>
                <td className="py-2.5">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    p.status === "Completed" ? "bg-primary/10 text-primary" :
                    p.status === "Pending" ? "bg-gold/10 text-gold" :
                    "bg-destructive/10 text-destructive"
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
