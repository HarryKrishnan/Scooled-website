import UpdateProgressModal from "@/components/coach/UpdateProgressModal";
import { useProgressStore, ProgressRecord } from "@/store/progressStore";
import { Activity, Clock } from "lucide-react";
import { useState, useMemo } from "react";
import { coachAssignedSports } from "@/data/coachMock";
import { getSportConfig, SportID } from "@/data/sportConfig";

export default function CoachProgress() {
  // read records from shared store
  const allRecords = useProgressStore((s) => s.records);
  const updateRecord = useProgressStore((s) => s.update);

  const sports = coachAssignedSports.length ? coachAssignedSports : (["swimming"] as SportID[]);
  const [activeSport, setActiveSport] = useState<SportID>(sports[0]);
  const sportConfig = getSportConfig(activeSport);

  const records = useMemo(
    () => allRecords.filter((r) => r.sport === activeSport),
    [allRecords, activeSport]
  );

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
        {sports.length > 1 && (
          <div className="flex gap-2 mb-2">
            {sports.map((s) => {
              const cfg = getSportConfig(s);
              const active = s === activeSport;
              return (
                <button
                  key={s}
                  onClick={() => setActiveSport(s)}
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold transition-colors ${
                    active ? cfg.classes.badge : "bg-white/5 text-slate-400"
                  }`}
                >
                  <cfg.icon size={16} className={active ? cfg.classes.accentText : "text-slate-400"} />
                  {cfg.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {records.map((rec) => (
          <div key={rec.id} className="relative bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 lg:p-8 overflow-hidden group hover:border-white/10 transition-colors">
            {/* Background Glow */}
            <div className={`absolute top-0 right-0 w-32 h-32 ${sportConfig.classes.accentBg} rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none group-hover:${sportConfig.classes.accentBg.replace('/10','/20')} transition-colors`}></div>

            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-800 border border-white/5 flex items-center justify-center shrink-0">
                  <Activity className={sportConfig.classes.accentText} size={24} />
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
                trigger={<button className={`px-4 py-2 ${sportConfig.classes.accentBg} ${sportConfig.classes.accentText} hover:opacity-80 border ${sportConfig.classes.accentBorder} rounded-xl text-sm font-bold transition-all`}>Update</button>}
              />
            </div>

            <div className="space-y-4 relative z-10 mb-6 bg-black/20 rounded-2xl p-5 border border-white/5">
              {sportConfig.performanceMetrics.map((label, idx) => {
                // convert label to key by removing spaces and making camelCase
                const key = label.replace(/\s+/g, "").replace(/^[A-Z]/, (c) => c.toLowerCase());
                const value = (rec as any)[key] as number | undefined;
                return (
                  <div key={label} className="flex items-center gap-4">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider w-28 shrink-0">{label}</span>
                    <div className="h-2 flex-1 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${sportConfig.classes.gradient} rounded-full`}
                        style={{ width: `${value ?? 0}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-white w-10 text-right">{value ?? 0}%</span>
                  </div>
                );
              })}
            </div>

            <div className="relative z-10 border-t border-white/5 pt-4">
              <p className={`text-sm text-slate-400 leading-relaxed italic border-l-2 ${sportConfig.classes.accentBg} pl-3 mb-3`}>"{rec.note}"</p>
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
