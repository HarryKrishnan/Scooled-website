import { customers } from "@/data/mockData";
import { Search, Filter } from "lucide-react";
import { useState } from "react";

export default function AdminCustomers() {
  const [search, setSearch] = useState("");
  const filtered = customers.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="font-display text-3xl font-bold text-navy">Customers</h1>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-2.5 text-navy/60" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search customers..." className="pl-10 pr-4 py-2 rounded-xl border border-navy/10 bg-white/60 backdrop-blur-sm text-sm w-64 focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
      </div>

      <div className="card-premium overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-navy/10">
              {["Name", "Email", "Phone", "Membership", "Status", "Joined"].map((h) => (
                <th key={h} className="text-left py-2.5 text-xs text-navy/60 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-b border-navy/5 hover:bg-white/40 transition-colors">
                <td className="py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">{c.name.charAt(0)}</div>
                    <span className="font-medium text-navy">{c.name}</span>
                  </div>
                </td>
                <td className="py-2.5 text-navy/60">{c.email}</td>
                <td className="py-2.5 text-navy/60">{c.phone}</td>
                <td className="py-2.5 text-navy/60">{c.membership}</td>
                <td className="py-2.5">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    c.status === "Active" ? "bg-primary/10 text-primary" :
                    c.status === "Expired" ? "bg-destructive/10 text-destructive" :
                    "bg-gold/10 text-gold"
                  }`}>{c.status}</span>
                </td>
                <td className="py-2.5 text-navy/60">{c.joinDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
