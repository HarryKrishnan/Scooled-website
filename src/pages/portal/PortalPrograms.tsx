import { motion } from "framer-motion";
import { GraduationCap, Clock, Calendar, TrendingUp, ChevronRight, Activity } from "lucide-react";
import { userEnrollments } from "@/data/mockData";

export default function PortalPrograms() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-4xl font-bold text-navy tracking-tight">Active Programs</h1>
        <p className="text-navy/50 font-medium">Manage your current enrollments and track your performance.</p>
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
                className="card-premium flex flex-col group"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-all">
                      <Activity size={24} className="text-primary group-hover:text-white transition-all" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-navy">{program.title}</h3>
                      <p className="text-xs text-navy/40 font-medium">{program.coach}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                    Active
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 rounded-2xl bg-navy/5 border border-navy/5">
                    <p className="text-[9px] font-black uppercase tracking-widest text-navy/30 mb-1">Sessions</p>
                    <p className="text-sm font-bold text-navy">{program.sessionsCompleted}/{program.sessionsTotal}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-navy/5 border border-navy/5">
                    <p className="text-[9px] font-black uppercase tracking-widest text-navy/30 mb-1">Attendance</p>
                    <p className="text-sm font-bold text-navy">{program.attendanceRate}%</p>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex justify-between text-[11px] font-bold text-navy/60">
                    <span>Progress</span>
                    <span>{program.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-navy/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${program.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-navy/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-primary" />
                    <span className="text-[11px] font-bold text-navy">Next: {program.nextSession}</span>
                  </div>
                  <button className="text-primary font-bold text-xs hover:underline flex items-center gap-1">
                    View Details <ChevronRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          <div className="card-premium border-primary/20 bg-primary/5">
            <h3 className="font-display text-lg font-bold text-navy mb-4 flex items-center gap-2">
              <TrendingUp size={20} className="text-primary" /> Training Insights
            </h3>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/50 border border-white">
                <p className="text-xs font-bold text-navy mb-1">Top Performer</p>
                <p className="text-[11px] text-navy/50 leading-relaxed">Your attendance is 12% higher than average swimmers this month.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/50 border border-white">
                <p className="text-xs font-bold text-navy mb-1">Next Milestone</p>
                <p className="text-[11px] text-navy/50 leading-relaxed">Complete 5 more sessions to level up your badge.</p>
              </div>
            </div>
          </div>

          <div className="card-premium">
            <h3 className="font-display text-lg font-bold text-navy mb-2">Certificates</h3>
            <p className="text-xs text-navy/40 mb-4 font-medium">Complete programs to earn excellence badges.</p>
            <button className="w-full py-3 rounded-xl bg-navy/5 text-navy font-bold text-xs hover:bg-navy/10 transition-all">
              View Gallery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
