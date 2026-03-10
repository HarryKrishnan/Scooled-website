import { leads } from "@/data/mockData";
import { Search, Send } from "lucide-react";
import { useState } from "react";

const statusColors: Record<string, string> = {
  New: "bg-primary/10 text-primary",
  Contacted: "bg-cyan/10 text-cyan",
  Qualified: "bg-aqua/10 text-aqua",
  Lost: "bg-muted text-muted-foreground",
};

export default function AdminLeads() {
  const [search, setSearch] = useState("");
  const filtered = leads.filter((l) => l.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="font-display text-2xl font-bold text-foreground">Leads</h1>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-2.5 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search leads..." className="pl-10 pr-4 py-2 rounded-xl border border-border bg-background text-sm w-64" />
        </div>
      </div>

      <div className="grid sm:grid-cols-4 gap-4">
        {["New", "Contacted", "Qualified", "Lost"].map((s) => (
          <div key={s} className="admin-card text-center">
            <p className="text-2xl font-bold text-foreground">{leads.filter((l) => l.status === s).length}</p>
            <p className="text-xs text-muted-foreground mt-1">{s}</p>
          </div>
        ))}
      </div>

      <div className="admin-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {["Name", "Contact", "Source", "Interest", "Status", "Date", ""].map((h) => (
                <th key={h} className="text-left py-2.5 text-xs text-muted-foreground font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((l) => (
              <tr key={l.id} className="border-b border-border/50 hover:bg-muted/30">
                <td className="py-2.5 font-medium text-foreground">{l.name}</td>
                <td className="py-2.5 text-muted-foreground text-xs">{l.phone}<br />{l.email}</td>
                <td className="py-2.5 text-muted-foreground">{l.source}</td>
                <td className="py-2.5 text-muted-foreground">{l.interest}</td>
                <td className="py-2.5"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[l.status] || ""}`}>{l.status}</span></td>
                <td className="py-2.5 text-muted-foreground">{l.date}</td>
                <td className="py-2.5">
                  <button className="p-1.5 rounded-lg hover:bg-muted text-primary" title="Send offer">
                    <Send size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
