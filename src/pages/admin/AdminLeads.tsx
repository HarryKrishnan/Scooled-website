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
        <h1 className="font-display text-3xl font-bold text-navy">Leads</h1>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-2.5 text-navy/60" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search leads..." className="pl-10 pr-4 py-2 rounded-xl border border-navy/10 bg-white/60 backdrop-blur-sm text-sm w-64 focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
      </div>

      <div className="grid sm:grid-cols-4 gap-4">
        {["New", "Contacted", "Qualified", "Lost"].map((s) => (
          <div key={s} className="card-premium text-center hover:-translate-y-1 transition-all duration-300">
            <p className="text-2xl font-bold text-navy">{leads.filter((l) => l.status === s).length}</p>
            <p className="text-xs text-navy/60 mt-1">{s}</p>
          </div>
        ))}
      </div>

      <div className="card-premium overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-navy/10">
              {["Name", "Contact", "Source", "Interest", "Status", "Date", ""].map((h) => (
                <th key={h} className="text-left py-2.5 text-xs text-navy/60 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((l) => (
              <tr key={l.id} className="border-b border-navy/5 hover:bg-white/40 transition-colors">
                <td className="py-2.5 font-medium text-navy">{l.name}</td>
                <td className="py-2.5 text-navy/60 text-xs">{l.phone}<br />{l.email}</td>
                <td className="py-2.5 text-navy/60">{l.source}</td>
                <td className="py-2.5 text-navy/60">{l.interest}</td>
                <td className="py-2.5"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[l.status] || ""}`}>{l.status}</span></td>
                <td className="py-2.5 text-navy/60">{l.date}</td>
                <td className="py-2.5">
                  <button className="p-1.5 rounded-lg hover:bg-white/50 text-primary transition-colors" title="Send offer">
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
