import { useState } from "react";
import { coachTrainees } from "@/data/coachMock";
import { Table } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import TraineeDetailsModal from "@/components/coach/TraineeDetailsModal";
import { Eye, Search, Filter } from "lucide-react";

export default function CoachTrainees() {
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [batchFilter, setBatchFilter] = useState("");

  const filtered = coachTrainees.filter((t) => {
    if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (levelFilter && t.level !== levelFilter) return false;
    if (batchFilter && t.batch !== batchFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-white mb-2">My Trainees</h1>
          <p className="text-slate-400 text-sm">Manage and review your assigned swimmers.</p>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <Input
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-slate-900/50 border-white/10 text-white placeholder:text-slate-500 rounded-xl focus-visible:ring-cyan-500 w-full sm:w-64"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:flex-none">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="w-full sm:w-36 appearance-none pl-9 pr-8 py-2 bg-slate-900/50 border border-white/10 rounded-xl text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="">All Levels</option>
                {[...new Set(coachTrainees.map((t) => t.level))].map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
            <div className="relative flex-1 sm:flex-none">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
              <select
                value={batchFilter}
                onChange={(e) => setBatchFilter(e.target.value)}
                className="w-full sm:w-36 appearance-none pl-9 pr-8 py-2 bg-slate-900/50 border border-white/10 rounded-xl text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="">All Batches</option>
                {[...new Set(coachTrainees.map((t) => t.batch))].map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-[2rem] overflow-hidden">
        <div className="overflow-x-auto p-1">
          <Table>
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-6 text-xs text-slate-400 font-semibold uppercase tracking-wider">Trainee</th>
                <th className="text-left py-4 px-6 text-xs text-slate-400 font-semibold uppercase tracking-wider">Age Group</th>
                <th className="text-left py-4 px-6 text-xs text-slate-400 font-semibold uppercase tracking-wider">Level</th>
                <th className="text-left py-4 px-6 text-xs text-slate-400 font-semibold uppercase tracking-wider">Batch</th>
                <th className="text-left py-4 px-6 text-xs text-slate-400 font-semibold uppercase tracking-wider">Attendance</th>
                <th className="text-left py-4 px-6 text-xs text-slate-400 font-semibold uppercase tracking-wider">Last Update</th>
                <th className="text-right py-4 px-6 text-xs text-slate-400 font-semibold uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                  <td className="py-4 px-6">
                    <div className="font-semibold text-white">{t.name}</div>
                  </td>
                  <td className="py-4 px-6 text-slate-400 text-sm">{t.ageGroup}</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex px-2.5 py-1 rounded-md bg-white/5 text-slate-300 border border-white/10 text-xs font-medium">
                      {t.level}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-400 text-sm whitespace-nowrap">{t.batch}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                       <span className={`font-medium ${t.attendance >= 80 ? 'text-emerald-400' : t.attendance >= 60 ? 'text-amber-400' : 'text-rose-400'}`}>
                         {t.attendance}%
                       </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-500 text-sm whitespace-nowrap">{t.lastUpdate}</td>
                  <td className="py-4 px-6 text-right">
                    <TraineeDetailsModal trainee={t}>
                      <button className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-500 bg-amber-500/10 hover:bg-amber-500 hover:text-slate-900 border border-amber-500/20 rounded-lg transition-all shadow-[0_0_10px_rgba(245,158,11,0)] hover:shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                        <Eye size={14} /> View
                      </button>
                    </TraineeDetailsModal>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    No trainees found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
