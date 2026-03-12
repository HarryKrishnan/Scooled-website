import { motion } from "framer-motion";
import { GraduationCap, Clock, Calendar, TrendingUp, ChevronRight, Activity } from "lucide-react";

const futsalEnrollments = [
  {
    programId: "fp1",
    title: "Kids Futsal Foundation",
    coach: "Marco Silva",
    sessionsTotal: 12,
    sessionsCompleted: 5,
    lastSession: "2026-03-08",
    attendanceRate: 100,
    nextSession: "Tomorrow, 6:00 PM",
    progress: 42,
  },
  {
    programId: "fp2",
    title: "Weekend Futsal League",
    coach: "Carlos Diaz",
    sessionsTotal: 8,
    sessionsCompleted: 3,
    lastSession: "2026-03-07",
    attendanceRate: 85,
    nextSession: "Sat, 9:00 AM",
    progress: 38,
  }
];

export default function PortalPrograms() {
  return (
    <div className="space-y-10">
      <div className="card-premium border-orange-tile bg-black/95 mb-8">
        <h1 className="font-display text-3xl font-bold text-white tracking-tight">Active Programs</h1>
        <p className="text-sm text-white/70 font-bold">Manage your current futsal training and tournament progress.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Program Cards Column */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid md:grid-cols-1 gap-6">
            {futsalEnrollments.map((program, i) => (
              <motion.div 
                key={program.programId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card-premium border-orange-tile bg-black/95 flex flex-col group"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center shrink-0 group-hover:bg-orange-500 transition-all shadow-lg shadow-black/20">
                      <Activity size={24} className="text-orange-500 group-hover:text-white transition-all" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-white group-hover:text-orange-500 transition-colors">{program.title}</h3>
                      <p className="text-xs text-white/40 font-bold uppercase tracking-tight">{program.coach}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white bg-orange-500 px-3 py-1.5 rounded-full shadow-lg shadow-orange-500/20">
                    Active
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/5 group-hover:border-white/10 transition-all">
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-2">Sessions</p>
                    <p className="text-sm font-black text-white">{program.sessionsCompleted} <span className="text-white/20">/</span> {program.sessionsTotal}</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/5 group-hover:border-white/10 transition-all">
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-2">Attendance</p>
                    <p className="text-sm font-black text-orange-500">{program.attendanceRate}%</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-white/60">
                    <span>Skill Progress</span>
                    <span className="text-orange-500">{program.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${program.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar size={14} className="text-orange-500" />
                    <span className="text-[11px] font-black text-white/60 tracking-tight">Next Match: <span className="text-white">{program.nextSession}</span></span>
                  </div>
                  <button className="text-orange-500 font-black text-xs uppercase tracking-widest hover:underline flex items-center gap-1.5 group/btn">
                    Tactics Portal <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          <div className="card-premium border-orange-500/20 bg-orange-500/5 shadow-2xl shadow-orange-500/5">
            <h3 className="font-display text-lg font-bold text-white mb-6 flex items-center gap-2 uppercase tracking-tight">
              <TrendingUp size={20} className="text-orange-500" /> Player Insights
            </h3>
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-black/40 border border-white/5 group">
                <p className="text-xs font-black uppercase tracking-widest text-orange-500 mb-2">Top Performer</p>
                <p className="text-[11px] text-white/60 leading-relaxed font-medium">Your stamina is <span className="text-white">15% higher</span> than other league players this month.</p>
              </div>
              <div className="p-5 rounded-2xl bg-black/40 border border-white/5 group">
                <p className="text-xs font-black uppercase tracking-widest text-gold mb-2">Next Milestone</p>
                <p className="text-[11px] text-white/60 leading-relaxed font-medium">Attend <span className="text-white">3 more matches</span> to earn your Gold Badge.</p>
              </div>
            </div>
          </div>

          <div className="card-premium border-white/5 bg-black/80">
            <h3 className="font-display text-lg font-bold text-white mb-2 uppercase tracking-tight">Certificates</h3>
            <p className="text-xs text-white/40 mb-6 font-bold">Earn excellence awards for match performance.</p>
            <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white/10 transition-all">
              Achievement Gallery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
