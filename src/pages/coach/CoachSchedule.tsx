import { useState, useMemo } from "react";
import { coachSchedule, coachAssignedSports } from "@/data/coachMock";
import { getSportConfig, SportID } from "@/data/sportConfig";
import { Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import SessionFormModal, { Session } from "@/components/coach/SessionFormModal";
import DeleteSessionDialog from "@/components/coach/DeleteSessionDialog";

export default function CoachSchedule() {
  const sports = coachAssignedSports.length ? coachAssignedSports : (["swimming"] as SportID[]);
  const [activeSport, setActiveSport] = useState<SportID>(sports[0]);
  const sportConfig = getSportConfig(activeSport);
  const [sessions, setSessions] = useState<Session[]>([...coachSchedule]);
  const filtered = useMemo(() => sessions.filter((s) => s.sport === activeSport), [sessions, activeSport]);

  const handleSave = (s: Session) => {
    setSessions((prev) => {
      const exists = prev.find((x) => x.id === s.id);
      if (exists) {
        return prev.map((x) => (x.id === s.id ? s : x));
      }
      return [...prev, s];
    });
  };

  const handleDelete = (id: string) => {
    setSessions((prev) => prev.filter((x) => x.id !== id));
  };

  const getStatusBadge = (status: Session["status"]) => {
    const base = "inline-flex px-2.5 py-1 rounded-full text-xs font-bold";
    switch (status) {
      case "Ongoing":
        return (
          <span className={`${base} ${sportConfig.classes.accentBg} ${sportConfig.classes.accentText} border ${sportConfig.classes.accentBorder} shadow-[0_0_10px_rgba(0,0,0,0.2)]`}>LIVE</span>
        );
      case "Upcoming":
        return (
          <span className={`${base} ${sportConfig.classes.accentBg} ${sportConfig.classes.accentText} border ${sportConfig.classes.accentBorder}`}>NEXT</span>
        );
      case "Completed":
      default:
        return <span className={`${base} bg-white/5 text-slate-400 border border-white/10`}>DONE</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-white mb-2">Session Schedule</h1>
          <p className="text-slate-400 text-sm">Manage your upcoming classes and batches.</p>
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
        <SessionFormModal 
          onSave={handleSave} 
          trigger={
            <button className={`${sportConfig.classes.accentBg.replace('/10','')} px-5 py-2.5 ${sportConfig.classes.accentText} font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:opacity-90`}>+ Add Session</button>
          }
        />
      </div>

      <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-[2rem] overflow-hidden">
        <div className="overflow-x-auto p-1">
          <Table>
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-6 text-xs text-slate-400 font-semibold uppercase tracking-wider">Time</th>
                <th className="text-left py-4 px-6 text-xs text-slate-400 font-semibold uppercase tracking-wider">Batch</th>
                <th className="text-left py-4 px-6 text-xs text-slate-400 font-semibold uppercase tracking-wider text-center">Trainees</th>
                <th className="text-left py-4 px-6 text-xs text-slate-400 font-semibold uppercase tracking-wider">
                {sportConfig.sessionLabels.location}{sportConfig.sessionLabels.field ? ` / ${sportConfig.sessionLabels.field}` : ""}
              </th>
                <th className="text-left py-4 px-6 text-xs text-slate-400 font-semibold uppercase tracking-wider">Type</th>
                <th className="text-left py-4 px-6 text-xs text-slate-400 font-semibold uppercase tracking-wider">Status</th>
                <th className="text-right py-4 px-6 text-xs text-slate-400 font-semibold uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="space-y-2">
              {filtered.map((s) => (
                <tr key={s.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-slate-950/50 border border-white/5 text-center shrink-0">
                        <span className="text-sm font-bold text-white">{s.time.split(" ")[0]}</span>
                        <span className="text-[10px] text-slate-500 font-semibold uppercase">{s.time.split(" ")[1] || "AM"}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-semibold text-white">{s.batch}</td>
                  <td className="py-4 px-6 text-center text-slate-300 font-medium">{s.trainees}</td>
                  <td className="py-4 px-6 text-slate-400 text-sm whitespace-nowrap">
                    {sportConfig.sessionLabels.location}: {s.location}{s.field ? ` / ${sportConfig.sessionLabels.field}: ${s.field}` : ""}
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex px-2.5 py-1 rounded-md bg-white/5 text-slate-300 border border-white/10 text-xs font-medium">
                      {s.type}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {getStatusBadge(s.status)}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <SessionFormModal
                        session={s}
                        trigger={
                          <button className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors border border-transparent hover:border-cyan-500/20">
                            <Edit size={16} />
                          </button>
                        }
                        onSave={(updated) => handleSave(updated)}
                      />
                      <DeleteSessionDialog onConfirm={() => handleDelete(s.id)} />
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    No sessions scheduled.
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
