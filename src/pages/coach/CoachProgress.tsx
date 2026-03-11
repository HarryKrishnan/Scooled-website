import UpdateProgressModal from "@/components/coach/UpdateProgressModal";
import { useProgressStore, ProgressRecord } from "@/store/progressStore";
import { Activity, Clock } from "lucide-react";

export default function CoachProgress() {
  // read records from shared store
  const records = useProgressStore((s) => s.records);
  const updateRecord = useProgressStore((s) => s.update);

  const handleSave = (id: string, updated: Partial<ProgressRecord>) => {
    updateRecord(id, updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-white mb-2">Trainee Progress</h1>
          <p className="text-slate-400 text-sm">Track skill development and update progress reports.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {records.map((rec) => (
          <div key={rec.id} className="relative bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 lg:p-8 overflow-hidden group hover:border-white/10 transition-colors">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none group-hover:bg-cyan-500/10 transition-colors"></div>

            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-800 border border-white/5 flex items-center justify-center shrink-0">
                  <Activity className="text-cyan-400" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{rec.trainee}</h3>
                  <span className="inline-flex px-2.5 py-1 rounded-md bg-white/5 text-slate-300 border border-white/10 text-xs font-medium">
                    Level: {rec.level}
                  </span>
                </div>
              </div>
              <UpdateProgressModal
                trainee={rec.trainee}
                current={rec}
                onSave={(updated) => handleSave(rec.id, updated)}
                trigger={<button className="px-4 py-2 bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-slate-900 border border-amber-500/20 rounded-xl text-sm font-bold transition-all shadow-[0_0_10px_rgba(245,158,11,0)] hover:shadow-[0_0_15px_rgba(245,158,11,0.4)]">Update</button>}
              />
            </div>

            <div className="space-y-4 relative z-10 mb-6 bg-black/20 rounded-2xl p-5 border border-white/5">
              {(["stamina", "breathing", "consistency", "technique", "confidence"] as const).map((field) => (
                <div key={field} className="flex items-center gap-4">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider w-28 shrink-0">{field}</span>
                  <div className="h-2 flex-1 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full"
                      style={{ width: `${rec[field]}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-white w-10 text-right">{rec[field]}%</span>
                </div>
              ))}
            </div>

            <div className="relative z-10 border-t border-white/5 pt-4">
              <p className="text-sm text-slate-400 leading-relaxed italic border-l-2 border-cyan-500/30 pl-3 mb-3">"{rec.note}"</p>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Clock size={12} /> Last updated: {rec.lastUpdated}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
