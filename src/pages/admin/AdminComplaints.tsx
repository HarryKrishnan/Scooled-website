import { complaints } from "@/data/mockData";
import { AlertCircle, CheckCircle2, Clock, User } from "lucide-react";

const statusConfig: Record<string, { icon: typeof Clock; color: string }> = {
  Open: { icon: AlertCircle, color: "text-destructive bg-destructive/10" },
  "In Progress": { icon: Clock, color: "text-gold bg-gold/10" },
  Resolved: { icon: CheckCircle2, color: "text-primary bg-primary/10" },
};

export default function AdminComplaints() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold text-navy">Complaints</h1>

      <div className="grid sm:grid-cols-3 gap-4">
        {["Open", "In Progress", "Resolved"].map((s) => {
          const cfg = statusConfig[s];
          const Icon = cfg.icon;
          return (
            <div key={s} className="card-premium flex items-center gap-3 hover:-translate-y-1 transition-all duration-300">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cfg.color}`}>
                <Icon size={18} />
              </div>
              <div>
                <p className="text-xl font-bold text-navy">{complaints.filter((c) => c.status === s).length}</p>
                <p className="text-xs text-navy/60">{s}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="space-y-3">
        {complaints.map((c) => {
          const cfg = statusConfig[c.status];
          const Icon = cfg.icon;
          return (
            <div key={c.id} className="card-premium hover:shadow-lg transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${cfg.color}`}>{c.status}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      c.priority === "High" ? "bg-destructive/10 text-destructive" :
                      c.priority === "Medium" ? "bg-gold/10 text-gold" :
                      "bg-muted text-muted-foreground"
                    }`}>{c.priority}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-navy">{c.subject}</h3>
                  <p className="text-xs text-navy/60 mt-1">
                    <span className="flex items-center gap-1"><User size={12} /> {c.customer} • {c.category} • {c.date}</span>
                  </p>
                </div>
                <div className="flex gap-2">
                  {c.status !== "Resolved" && (
                    <button className="px-3 py-1.5 rounded-lg border border-navy/10 text-xs font-medium text-navy hover:bg-white/50 transition-colors">
                      {c.status === "Open" ? "Assign" : "Resolve"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
