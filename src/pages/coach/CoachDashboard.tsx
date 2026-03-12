import { Calendar, Users, CheckCircle, TrendingUp, Clock, FileText, ChevronRight, Activity } from "lucide-react";
import { useState, useMemo } from "react";
import { coachSchedule, recentNotes, assignedGroups, coachTrainees, coachProgress, coachAssignedSports } from "@/data/coachMock";
import { getSportConfig, SportID } from "@/data/sportConfig";
import { motion } from "framer-motion";

export default function CoachDashboard() {
  const sports = coachAssignedSports.length ? coachAssignedSports : (["swimming"] as SportID[]);
  const [activeSport, setActiveSport] = useState<SportID>(sports[0]);
  const sportConfig = getSportConfig(activeSport);

  // derive filtered data
  const filteredTrainees = useMemo(
    () => coachTrainees.filter((t) => t.sport === activeSport),
    [activeSport]
  );
  const filteredSchedule = useMemo(
    () => coachSchedule.filter((s) => s.sport === activeSport),
    [activeSport]
  );
  const filteredProgress = useMemo(
    () => coachProgress.filter((p) => p.sport === activeSport),
    [activeSport]
  );

  const stats = useMemo(() => {
    const totalTrainees = filteredTrainees.length;
    const todaysSessions = filteredSchedule.filter(
      (s) => s.status === "Upcoming" || s.status === "Ongoing"
    ).length;
    const avgAttendance =
      totalTrainees > 0
        ? Math.round(
            filteredTrainees.reduce((a, b) => a + b.attendance, 0) /
              totalTrainees
          )
        : 0;
    const progressPending = filteredProgress.length;
    return { totalTrainees, todaysSessions, avgAttendance, progressPending };
  }, [filteredTrainees, filteredSchedule, filteredProgress]);

  return (
    <div className="space-y-8 pb-8">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-[#0f172a] to-slate-900 border border-white/5 shadow-2xl">
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
          <Activity size={240} className={sportConfig.classes.accentText} />
        </div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        
        <div className="relative p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            {/* sport badge/switcher */}
            {sports.length > 1 && (
              <div className="flex flex-wrap gap-2 mb-4">
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

            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${sportConfig.classes.accentBg} border ${sportConfig.classes.accentBorder} ${sportConfig.classes.accentText} text-xs font-semibold tracking-wider uppercase mb-4`}>
              <span className={`${sportConfig.classes.accentBg.replace('/10','')} w-2 h-2 rounded-full animate-pulse`}></span>
              Live Session Status
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r ${sportConfig.classes.gradient}">Rahul.</span>
              <span className="ml-3 inline-flex items-center gap-2 text-base font-medium uppercase">
                {sportConfig.icon({ size: 24, className: sportConfig.classes.accentText })}
                {sportConfig.label}
              </span>
            </h1>
            <p className="text-slate-400 text-lg">
              You have <strong className="text-white font-semibold">{stats.todaysSessions} sessions</strong> scheduled today.
              {stats.todaysSessions === 0 && "No sessions today."}
            </p>
          </div>
          
          <div className="hidden lg:flex gap-4">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center min-w-[120px]">
              <div className="text-3xl font-bold text-white mb-1">{stats.totalTrainees}</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Active<br/>Trainees</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center min-w-[120px]">
              <div className={`text-3xl font-bold ${sportConfig.classes.accentText} mb-1`}>{stats.todaysSessions}</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Sessions<br/>Today</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center min-w-[120px]">
              <div className={`${sportConfig.classes.accentText} text-3xl font-bold mb-1`}>{stats.avgAttendance}%</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Avg<br/>Attendance</div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Stats - Mobile/Tablet (Visible when Hero stats are hidden) */}
      <div className="grid grid-cols-2 gap-4 lg:hidden">
         <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-5 border border-white/5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full ${sportConfig.classes.accentBg} flex items-center justify-center shrink-0`}>
              <Users className={sportConfig.classes.accentText} size={20} />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{stats.totalTrainees}</div>
              <div className="text-xs text-slate-400 font-medium">Total Trainees</div>
            </div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-5 border border-white/5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full ${sportConfig.classes.accentBg} flex items-center justify-center shrink-0`}>
              <CheckCircle className={sportConfig.classes.accentText} size={20} />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{stats.avgAttendance}%</div>
              <div className="text-xs text-slate-400 font-medium">Avg Attendance</div>
            </div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-5 border border-white/5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full ${sportConfig.classes.accentBg} flex items-center justify-center shrink-0`}>
              <Calendar className={sportConfig.classes.accentText} size={20} />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{stats.todaysSessions}</div>
              <div className="text-xs text-slate-400 font-medium">Sessions Today</div>
            </div>
          </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Column (2/3 width on very large screens, full otherwise) */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* Trainee Preview Card */}
          {filteredTrainees.length > 0 && (
            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 lg:p-8">
              <h3 className="text-lg font-semibold text-white mb-4">Trainees (showing {Math.min(3, filteredTrainees.length)})</h3>
              <ul className="space-y-2 text-slate-300">
                {filteredTrainees.slice(0, 3).map((t) => (
                  <li key={t.id} className="flex items-center gap-2">
                    <Users size={16} className={sportConfig.classes.accentText} />
                    {t.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

        {/* Schedule Card */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 lg:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
            
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <span className={`w-10 h-10 rounded-xl ${sportConfig.classes.accentBg} flex items-center justify-center`}>
                    <Clock size={20} className={sportConfig.classes.accentText} />
                  </span>
                  Today's Schedule
                </h3>
              </div>
              <button className={`text-sm font-semibold ${sportConfig.classes.accentText} hover:opacity-80 flex items-center gap-1 transition-colors`}>
                View All <ChevronRight size={16} />
              </button>
            </div>

            <div className="space-y-3 relative z-10">
              {filteredSchedule.map((s) => (
                <div key={s.id} className="group flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all hover:border-white/10 cursor-default">
                  <div className="hidden sm:flex flex-col items-center justify-center w-20 h-16 rounded-xl bg-slate-950/50 border border-white/5 text-center shrink-0">
                    <span className="text-sm font-bold text-white">{s.time.split(" ")[0]}</span>
                    <span className="text-[10px] text-slate-500 font-semibold uppercase">{s.time.split(" ")[1] || "AM"}</span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-white truncate pr-4 text-base">{s.batch}</h4>
                      <div className="shrink-0">
                        {s.status === "Ongoing" && <span className={`px-2.5 py-1 rounded-full ${sportConfig.classes.accentBg} ${sportConfig.classes.accentText} text-xs font-bold border ${sportConfig.classes.accentBorder}`}>LIVE</span>}
                        {s.status === "Upcoming" && <span className={`px-2.5 py-1 rounded-full ${sportConfig.classes.accentBg} ${sportConfig.classes.accentText} text-xs font-bold border ${sportConfig.classes.accentBorder}`}>NEXT</span>}
                        {s.status === "Completed" && <span className="px-2.5 py-1 rounded-full bg-white/5 text-slate-400 text-xs font-bold border border-white/10">DONE</span>}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-400">
                      <div className="flex items-center gap-1.5 object-contain">
                        <Users size={14} className="text-slate-500" /> {s.trainees} trainees
                      </div>
                      <div className="flex flex-col sm:flex-row items-center gap-1.5">
                         <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                         <span>{sportConfig.sessionLabels.location}: {s.location}</span>
                         {s.field && (
                           <span className="sm:ml-2">{sportConfig.sessionLabels.field}: {s.field}</span>
                         )}
                      </div>
                      <div className="flex items-center gap-1.5">
                         <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                         <span className="text-slate-300 font-medium">{s.type}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Overview */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 lg:p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <span className={`w-10 h-10 rounded-xl ${sportConfig.classes.accentBg} flex items-center justify-center`}>
                  <TrendingUp size={20} className={sportConfig.classes.accentText} />
                </span>
                Cohort Performance
              </h3>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {assignedGroups
                .filter((g) => g.sport === activeSport)
                .map((g, i) => (
                <div key={g.id} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <h4 className="font-semibold text-white mb-1">{g.name}</h4>
                      <p className="text-xs text-slate-400 font-medium">{g.level} • {g.size} Trainees</p>
                    </div>
                    <div className="text-xl font-bold text-white">
                      {Math.round((g.size / 15) * 100)}<span className="text-sm font-medium text-slate-500">%</span>
                    </div>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (g.size / 15) * 100)}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className={`h-full rounded-full bg-gradient-to-r ${sportConfig.classes.gradient}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (1/3 width) */}
        <div className="space-y-8">
          
          {/* Urgent Actions Mini-Card */}
          <div className={`bg-gradient-to-b ${sportConfig.classes.accentBg.replace('/10','/[0.15]')} to-transparent border ${sportConfig.classes.accentBorder} rounded-[2rem] p-6 relative overflow-hidden`}>
            <div className={`absolute top-0 right-0 w-32 h-32 ${sportConfig.classes.accentBg.replace('/10','/20')} rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none`}></div>
            <h3 className={`${sportConfig.classes.accentText} font-bold mb-2 flex items-center gap-2`}>
              <span className={`${sportConfig.classes.accentBg.replace('/10','')} w-2 h-2 rounded-full animate-pulse`}></span>
              Action Required
            </h3>
            <p className="text-slate-300 text-sm mb-4 leading-relaxed">
              You have <strong className="text-white">{stats.progressPending} progress reports</strong> pending update for the Intermediate batch.
            </p>
            <button className={`${sportConfig.classes.accentText} w-full py-2.5 rounded-xl ${sportConfig.classes.accentBg.replace('/10','')} hover:opacity-90 text-slate-900 font-bold text-sm transition-colors shadow-[0_0_15px_rgba(0,0,0,0.25)]`}>
              Update Now
            </button>
          </div>

          {/* Recent Notes */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 lg:p-8">
            <h3 className="text-lg font-bold text-white flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
                <FileText size={16} className="text-slate-300" />
              </span>
              Recent Notes
            </h3>
            <div className="space-y-4">
              {recentNotes.map((n, i) => (
                <div key={n.id} className={`group relative pl-4 ${i !== recentNotes.length - 1 ? 'pb-4 border-l-2 border-slate-800' : ''}`}>
                  <div className="absolute w-3 h-3 rounded-full bg-slate-800 border-2 border-[#0a0f16] -left-[7px] top-1 group-hover:bg-cyan-500 transition-colors"></div>
                  <p className="text-sm text-slate-300 leading-relaxed mb-1.5">{n.text}</p>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{n.date}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm transition-colors border border-white/5">
              + New Note
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
