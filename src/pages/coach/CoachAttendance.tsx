import { coachAttendance } from "@/data/coachMock";
import { Table } from "@/components/ui/table";
import { CheckCircle, AlertCircle, Clock, CalendarDays } from "lucide-react";

export default function CoachAttendance() {
  const totalRecords = coachAttendance.reduce((acc, r) => acc + r.attendees.length, 0);
  const presentRecords = coachAttendance.reduce((acc, r) => acc + r.attendees.filter((a) => a.status === "Present").length, 0);
  const attendanceRate = totalRecords > 0 ? Math.round((presentRecords / totalRecords) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-white mb-2">Attendance</h1>
          <p className="text-slate-400 text-sm">Monitor daily swimmer attendance and trends.</p>
        </div>
        
        {/* Quick Summary Card */}
        <div className="flex items-center gap-4 bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-2xl p-4 min-w-[200px]">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0">
            <CheckCircle className="text-cyan-400" size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold text-white tracking-tight">{attendanceRate}%</div>
            <div className="text-xs font-semibold text-slate-500 tracking-wider uppercase">Overall Rate</div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-[2rem] overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <CalendarDays size={18} className="text-cyan-400" />
                Recent Records
            </h3>
        </div>
        <div className="overflow-x-auto p-1">
          <Table>
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-6 text-xs text-slate-400 font-semibold uppercase tracking-wider">Date</th>
                <th className="text-left py-4 px-6 text-xs text-slate-400 font-semibold uppercase tracking-wider">Batch</th>
                <th className="text-left py-4 px-6 text-xs text-slate-400 font-semibold uppercase tracking-wider">Trainee</th>
                <th className="text-left py-4 px-6 text-xs text-slate-400 font-semibold uppercase tracking-wider text-right">Status</th>
              </tr>
            </thead>
            <tbody className="space-y-2">
              {coachAttendance.flatMap((rec) =>
                rec.attendees.map((a, idx) => (
                  <tr key={`${rec.id}-${idx}`} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6 text-sm text-slate-400 whitespace-nowrap">{rec.date}</td>
                    <td className="py-4 px-6 font-medium text-slate-300">{rec.batch}</td>
                    <td className="py-4 px-6 font-semibold text-white">{a.trainee}</td>
                    <td className="py-4 px-6 text-right">
                      {a.status === "Present" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                          <CheckCircle size={12} /> PRESENT
                        </span>
                      )}
                      {a.status === "Late" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold border border-amber-500/20">
                          <Clock size={12} /> LATE
                        </span>
                      )}
                      {a.status === "Absent" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-bold border border-rose-500/20">
                          <AlertCircle size={12} /> ABSENT
                        </span>
                      )}
                    </td>
                  </tr>
                )),
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
