import { leads } from "@/data/mockData";
import { Search, Send } from "lucide-react";
import { useState } from "react";

const statusColors: Record<string, string> = {
  New: "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30",
  Contacted: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  Qualified: "bg-green-500/20 text-green-400 border border-green-500/30",
  Lost: "bg-gray-500/20 text-gray-400 border border-gray-500/30",
};

export default function AdminLeads() {
  const [search, setSearch] = useState("");
  const filtered = leads.filter((l) => l.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="font-display text-4xl font-bold text-white">Leads</h1>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-2.5 text-white/60" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search leads..." className="pl-10 pr-4 py-2 rounded-xl border border-white/10 bg-white/10 backdrop-blur-sm text-sm w-64 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-white placeholder:text-white/40" />
        </div>
      </div>

      <div className="grid sm:grid-cols-4 gap-4">
        {["New", "Contacted", "Qualified", "Lost"].map((s, idx) => (
          <div key={s} className={`card-premium text-center hover:${['border-orange-tile', 'border-teal-tile', 'border-yellow-tile', 'border-orange-tile'][idx]} hover:-translate-y-2 transition-all duration-500`}>
            <p className="text-2xl font-bold text-white">{leads.filter((l) => l.status === s).length}</p>
            <p className="text-xs text-white/60 mt-1">{s}</p>
          </div>
        ))}
      </div>

      <div className="card-premium overflow-x-auto hover:border-teal-tile hover:-translate-y-2 transition-all duration-500">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              {["Name", "Contact", "Source", "Interest", "Status", "Date", ""].map((h) => (
                <th key={h} className="text-left py-2.5 text-xs text-white/40 font-semibold uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((l) => (
              <tr key={l.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-2.5 font-medium text-white">{l.name}</td>
                <td className="py-2.5 text-white/70 text-xs">{l.phone}<br />{l.email}</td>
                <td className="py-2.5 text-white/70">{l.source}</td>
                <td className="py-2.5 text-white/70">{l.interest}</td>
                <td className="py-2.5"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[l.status] || ""}`}>{l.status}</span></td>
                <td className="py-2.5 text-white/60">{l.date}</td>
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
