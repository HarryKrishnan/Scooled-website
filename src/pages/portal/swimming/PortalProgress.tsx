import { motion } from "framer-motion";
import { 
  TrendingUp, Award, Calendar, Clock, 
  Target, Zap, Sun, Download, Star, 
  ChevronRight, CheckCircle2, MessageSquare, 
  Info, BarChart3, MapPin
} from "lucide-react";
import { 
  userEnrollments, 
  userPerformanceTrend, 
  userAchievements, 
  userCoachFeedback 
} from "@/data/mockData";
import { useProgressStore } from "@/store/progressStore";

// for demo purposes we assume portal user is Aarav Patel
const portalUser = "Aarav Patel";

export default function PortalProgress() {
  const totalSessions = userEnrollments.reduce((acc, curr) => acc + curr.sessionsCompleted, 0);
  const avgAttendance = Math.round(userEnrollments.reduce((acc, curr) => acc + curr.attendanceRate, 0) / userEnrollments.length);
  const totalHours = userEnrollments.reduce((acc, curr) => acc + (curr.sessionsCompleted * 1.5), 0); // Assuming 1.5h avg per session

  // pull the progress record for the current user
  const record = useProgressStore((s) => s.records.find((r) => r.trainee === portalUser));

  return (
    <div className="space-y-8 pb-10">

      <div className="card-premium border-blue-tile bg-black/95 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight">Progress & Reports</h1>
          <p className="text-sm text-white/70 font-bold mt-1">Deep dive into your swimming performance and trends.</p>
        </div>
        <button className="btn-primary flex items-center gap-2 px-8 py-2.5 shadow-xl shadow-primary/20 shrink-0">
          <Download size={18} /> Download Report
        </button>
      </div>


      {/* Overall Progress Summary */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Programs Enrolled", value: userEnrollments.length, icon: Target, color: "text-primary", bg: "bg-primary/10", border: "border-blue-tile" },
          { label: "Sessions Completed", value: totalSessions, icon: CheckCircle2, color: "text-green-500", bg: "bg-green-500/10", border: "border-green-tile" },
          { label: "Avg. Attendance", value: `${avgAttendance}%`, icon: Calendar, color: "text-aqua", bg: "bg-aqua/10", border: "border-gold-tile" },
          { label: "Total Training Hours", value: `${totalHours}h`, icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-red-tile" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`card-premium bg-black/95 ${stat.border} group`}
          >
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-black/20`}>
              <stat.icon size={24} />
            </div>
            <p className="text-[10px] uppercase tracking-widest font-black text-white/40 mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Training Performance Trend */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card-premium border-blue-tile bg-black/95 h-full">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                <BarChart3 size={18} className="text-primary" /> Training Performance Trend
              </h3>
              <select className="bg-white/5 text-white text-xs font-bold px-4 py-2 rounded-xl border border-white/10 focus:ring-1 focus:ring-primary outline-none appearance-none cursor-pointer">
                <option className="bg-neutral-900">Last 6 Weeks</option>
                <option className="bg-neutral-900">Last 3 Months</option>
              </select>
            </div>
            
            <div className="h-64 flex items-end justify-between gap-2 px-2">
              {userPerformanceTrend.map((data, i) => {
                const height = (data.distance / 2500) * 100;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-3 h-full justify-end group">
                    <div className="relative w-full flex justify-center">
                       {/* Tooltip */}
                      <div className="absolute -top-12 bg-primary text-white text-[10px] font-black px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100 whitespace-nowrap z-10 shadow-xl">
                        {data.distance}m • {data.sessions} sessions
                      </div>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="w-full max-w-[42px] bg-gradient-to-t from-primary/20 to-primary/40 group-hover:from-primary group-hover:to-cyan rounded-t-xl transition-all duration-500 relative"
                      >
                        <div className="absolute top-0 left-0 w-full h-1 bg-cyan rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
                      </motion.div>
                    </div>
                    <span className="text-[10px] font-black text-white/40 uppercase group-hover:text-primary transition-colors">{data.week.split(' ')[0]}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Training Insights */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card-premium border-gold-tile bg-black/95 h-full">
            <h3 className="font-display text-base font-bold text-white mb-6 flex items-center gap-2 uppercase tracking-tight">
              <Zap size={16} className="text-primary" /> Smart Insights
            </h3>
            <div className="space-y-4">
              {[
                { label: "Attendance Peak", desc: "Your attendance is 12% higher than average swimmers this month. Keep it up!", icon: TrendingUp, color: "text-green-500", bg: "bg-green-500/10" },
                { label: "Badge Progress", desc: "Complete 3 more sessions to unlock the 'Master Endurance' badge.", icon: Award, color: "text-amber-500", bg: "bg-amber-500/10" },
                { label: "Next Milestone", desc: "You are only 400m away from hitting your 10,000m total distance goal.", icon: Info, color: "text-primary", bg: "bg-primary/10" }
              ].map((insight, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group">
                  <div className={`w-10 h-10 rounded-xl ${insight.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    <insight.icon size={18} className={insight.color} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">{insight.label}</p>
                    <p className="text-xs text-white/50 mt-1 leading-relaxed font-medium">{insight.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Program Comparison */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card-premium border-green-tile bg-black/95">
            <h3 className="font-display text-lg font-bold text-white mb-6 uppercase tracking-tight">Program Completion</h3>
            <div className="space-y-6">
              {userEnrollments.map((prog) => (
                <div key={prog.programId} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <p className="text-sm font-bold text-white">{prog.title}</p>
                    <p className="text-xs font-black text-primary">{prog.progress}%</p>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${prog.progress}%` }}
                      transition={{ duration: 1.5 }}
                      className="h-full bg-gradient-to-r from-primary to-aqua rounded-full"
                    />
                  </div>
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-tight">{prog.sessionsCompleted} <span className="text-white/20">of</span> {prog.sessionsTotal} sessions</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements & Milestones */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card-premium border-gold-tile bg-black/95">
             <div className="flex items-center justify-between mb-8">
              <h3 className="font-display text-lg font-bold text-white flex items-center gap-2 uppercase tracking-tight">
                <Award size={18} className="text-amber-500" /> Achievements & Milestones
              </h3>
              <button className="text-xs text-primary font-black uppercase tracking-widest hover:underline">View Gallery</button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {userAchievements.map((ach, i) => (
                <motion.div
                  key={ach.id}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-2xl border border-white/5 bg-white/5 flex gap-4 transition-all hover:bg-white/10 group"
                >
                  <div className={`w-12 h-12 rounded-full ${ach.bg} ${ach.color} flex items-center justify-center shrink-0 shadow-lg shadow-black/20 group-hover:scale-110 transition-transform`}>
                    {ach.icon === "Target" && <Target size={24} />}
                    {ach.icon === "Award" && <Award size={24} />}
                    {ach.icon === "Zap" && <Zap size={24} />}
                    {ach.icon === "Sun" && <Sun size={24} />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{ach.title}</h4>
                    <p className="text-xs text-white/50 mt-1 leading-relaxed font-medium">{ach.desc}</p>
                    <p className="text-[10px] text-white/20 mt-3 uppercase font-black tracking-widest">{ach.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Coach Feedback */}
        <div className="lg:col-span-3 space-y-6">
        <div className="lg:col-span-3 space-y-6">
          <div className="card-premium border-blue-tile bg-black/95">
            <h3 className="font-display text-lg font-bold text-white mb-8 flex items-center gap-2 uppercase tracking-tight">
              <MessageSquare size={18} className="text-primary" /> Coach Feedback & Ratings
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {userCoachFeedback.map((fb, i) => (
                <div key={fb.id} className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="text-base font-bold text-white group-hover:text-primary transition-colors">{fb.program}</h4>
                      <p className="text-xs text-white/40 font-bold mt-1">Feedback from <span className="text-primary">{fb.coach}</span></p>
                    </div>
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{fb.date}</span>
                  </div>
                  
                  <p className="text-sm text-white/70 leading-relaxed italic mb-8 font-medium">"{fb.feedback}"</p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/5">
                    {Object.entries(fb.ratings).map(([key, val]) => (
                      <div key={key} className="text-center group/rate">
                        <p className="text-[9px] uppercase tracking-widest font-black text-white/30 mb-2 group-hover/rate:text-primary transition-colors">{key}</p>
                        <div className="flex items-center justify-center gap-1.5">
                          <span className="text-sm font-black text-white">{val}</span>
                          <Star size={11} className="fill-amber-500 text-amber-500 shadow-glow shadow-amber-500/20" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
