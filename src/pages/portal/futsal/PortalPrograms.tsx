import { motion } from "framer-motion";
import { GraduationCap, Clock, Calendar, TrendingUp, ChevronRight, Activity } from "lucide-react";
import { userEnrollments } from "@/data/mockData";

export default function PortalPrograms() {
  return (
    <div className="space-y-10">
      <div className="card-premium border-orange-tile bg-black/95 mb-8">
        <h1 className="font-display text-3xl font-bold text-white tracking-tight">Active Programs</h1>
        <p className="text-sm text-white/70 font-bold">Manage your current enrollments and track your performance.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Program Cards Column */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid md:grid-cols-1 gap-6">
            {userEnrollments.map((program, i) => (
              <motion.div 
                key={program.programId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card-premium border-orange-tile bg-black/95 flex flex-col group"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-all shadow-lg shadow-black/20">
                      <Activity size={24} className="text-primary group-hover:text-white transition-all" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-white group-hover:text-primary transition-colors">{program.title}</h3>
                      <p className="text-xs text-white/40 font-bold uppercase tracking-tight">{program.coach}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white bg-primary px-3 py-1.5 rounded-full shadow-lg shadow-primary/20">
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
                    <p className="text-sm font-black text-primary">{program.attendanceRate}%</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-white/60">
                    <span>Performance Progress</span>
                    <span className="text-primary">{program.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${program.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-primary to-orange-500 rounded-full"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar size={14} className="text-primary" />
                    <span className="text-[11px] font-black text-white/60 tracking-tight">Next Session: <span className="text-white">{program.nextSession}</span></span>
                  </div>
                  <button className="text-primary font-black text-xs uppercase tracking-widest hover:underline flex items-center gap-1.5 group/btn">
                    Course Portal <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          <div className="card-premium border-primary/20 bg-primary/5 shadow-2xl shadow-primary/5">
            <h3 className="font-display text-lg font-bold text-white mb-6 flex items-center gap-2 uppercase tracking-tight">
              <TrendingUp size={20} className="text-primary" /> Training Insights
            </h3>
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-black/40 border border-white/5 group">
                <p className="text-xs font-black uppercase tracking-widest text-primary mb-2">Top Performer</p>
                <p className="text-[11px] text-white/60 leading-relaxed font-medium">Your attendance is <span className="text-white">12% higher</span> than average Athletes this month.</p>
              </div>
              <div className="p-5 rounded-2xl bg-black/40 border border-white/5 group">
                <p className="text-xs font-black uppercase tracking-widest text-gold mb-2">Next Milestone</p>
                <p className="text-[11px] text-white/60 leading-relaxed font-medium">Complete <span className="text-white">5 more sessions</span> to level up your badge.</p>
              </div>
            </div>
          </div>

          <div className="card-premium border-white/5 bg-black/80">
            <h3 className="font-display text-lg font-bold text-white mb-2 uppercase tracking-tight">Certificates</h3>
            <p className="text-xs text-white/40 mb-6 font-bold">Complete programs to earn excellence badges.</p>
            <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white/10 transition-all">
              View Achievement Gallery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
