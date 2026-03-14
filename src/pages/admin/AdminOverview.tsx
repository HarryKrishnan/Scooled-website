import {
  Users, Wallet, RefreshCw, MessageSquare,
  ArrowUpRight, AlertCircle, Clock, CheckCircle2, User
} from "lucide-react";
import { Link } from "react-router-dom";
import { payments, customers, complaints, customerMembershipSubscriptions, getDaysUntilExpiry } from "@/data/mockData";

// ── KPI helpers ────────────────────────────────────────────────────────────
const activeMembers = customers.filter((c) => c.status === "Active").length;

const monthlyRevenue = payments
  .filter((p) => p.status === "Completed")
  .reduce((sum, p) => sum + p.amount, 0);

const renewalsDue = customerMembershipSubscriptions.filter((s) => {
  const days = getDaysUntilExpiry(s.expiryDate);
  return days >= 0 && days <= 30;
}).length;

const pendingComplaints = complaints.filter((c) => c.status === "Open").length;

const kpiTiles = [
  {
    label: "Active Members",
    value: activeMembers.toString(),
    sub: "+2 this week",
    up: true,
    icon: Users,
    color: "text-cyan-400",
    borderColor: "border-cyan-500/30",
  },
  {
    label: "Monthly Revenue",
    value: `₹${(monthlyRevenue / 1000).toFixed(1)}K`,
    sub: "Completed payments",
    up: true,
    icon: Wallet,
    color: "text-amber-400",
    borderColor: "border-amber-500/30",
  },
  {
    label: "Renewals Due",
    value: renewalsDue.toString(),
    sub: "Within 30 days",
    up: false,
    icon: RefreshCw,
    color: "text-yellow-400",
    borderColor: "border-yellow-500/30",
  },
  {
    label: "Pending Complaints",
    value: pendingComplaints.toString(),
    sub: "Open tickets",
    up: false,
    icon: MessageSquare,
    color: "text-red-400",
    borderColor: "border-red-500/30",
  },
];

// ── Complaint status config ─────────────────────────────────────────────────
const statusCfg: Record<string, { icon: typeof Clock; color: string }> = {
  Open: { icon: AlertCircle, color: "text-red-400 bg-red-500/20" },
  "In Progress": { icon: Clock, color: "text-yellow-400 bg-yellow-500/20" },
  Resolved: { icon: CheckCircle2, color: "text-green-400 bg-green-500/20" },
};

export default function AdminOverview() {
  // Recent payments — 5 most recent
  const recentPayments = [...payments]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="font-display text-4xl font-bold text-white">Overview</h1>
        <p className="text-sm text-white/60 mt-1">Today's snapshot — March 14, 2026</p>
      </div>

      {/* ── Zone A: 4 KPI Tiles ─────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiTiles.map((tile, i) => {
          const Icon = tile.icon;
          return (
            <div
              key={i}
              className={`card-premium border hover:${tile.borderColor} hover:-translate-y-2 transition-all duration-500 cursor-pointer group`}
            >
              <div className="flex items-center justify-between mb-3">
                <Icon size={20} className={tile.color} />
                {tile.up ? (
                  <ArrowUpRight size={14} className="text-green-400" />
                ) : (
                  <span className="text-[10px] font-bold text-red-400">!</span>
                )}
              </div>
              <p className="text-2xl font-bold text-white">{tile.value}</p>
              <p className="text-xs text-white/60 mt-1">{tile.label}</p>
              <p className="text-[10px] text-white/40 mt-0.5">{tile.sub}</p>
            </div>
          );
        })}
      </div>

      {/* ── Zone B: Two-column body ──────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* LEFT — Complaints Panel (2 / 5 columns) */}
        <div className="lg:col-span-2 card-premium hover:border-orange-tile hover:-translate-y-1 transition-all duration-500 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Complaints</h3>
            <Link
              to="/admin/complaints"
              className="text-xs font-bold text-amber-500 hover:text-amber-400 transition-colors"
            >
              View All →
            </Link>
          </div>

          {/* Status summary pills */}
          <div className="flex gap-2 mb-4 flex-wrap">
            {(["Open", "In Progress", "Resolved"] as const).map((s) => {
              const cfg = statusCfg[s];
              const Icon = cfg.icon;
              const count = complaints.filter((c) => c.status === s).length;
              return (
                <div
                  key={s}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.color}`}
                >
                  <Icon size={11} />
                  {count} {s}
                </div>
              );
            })}
          </div>

          {/* Complaint list */}
          <div className="space-y-3 flex-1">
            {complaints.map((c) => {
              const cfg = statusCfg[c.status];
              const Icon = cfg.icon;
              return (
                <div
                  key={c.id}
                  className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{c.subject}</p>
                      <p className="text-xs text-white/50 mt-0.5 flex items-center gap-1">
                        <User size={10} /> {c.customer} · {c.category}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <span
                        className={`flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-medium ${cfg.color}`}
                      >
                        <Icon size={9} />
                        {c.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                        c.priority === "High"
                          ? "bg-red-500/20 text-red-400"
                          : c.priority === "Medium"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-white/10 text-white/50"
                      }`}
                    >
                      {c.priority}
                    </span>
                    <span className="text-[10px] text-white/40">{c.date}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT — Recent Payments (3 / 5 columns) */}
        <div className="lg:col-span-3 card-premium hover:border-yellow-tile hover:-translate-y-1 transition-all duration-500 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Recent Payments</h3>
            <Link
              to="/admin/payments"
              className="text-xs font-bold text-amber-500 hover:text-amber-400 transition-colors"
            >
              View All →
            </Link>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  {["Customer", "Type", "Method", "Amount", "Status"].map((h) => (
                    <th
                      key={h}
                      className="text-left py-2 text-xs text-white/40 font-semibold uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentPayments.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-3 font-medium text-white">{p.customer}</td>
                    <td className="py-3 text-white/70">{p.type}</td>
                    <td className="py-3 text-white/70">{p.method}</td>
                    <td className="py-3 font-medium text-white">₹{p.amount.toLocaleString()}</td>
                    <td className="py-3">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                          p.status === "Completed"
                            ? "bg-green-500/20 text-green-400 border-green-500/30"
                            : p.status === "Pending"
                            ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                            : "bg-red-500/20 text-red-400 border-red-500/30"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
