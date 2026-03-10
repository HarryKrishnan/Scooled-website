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

export default function PortalProgress() {
  const totalSessions = userEnrollments.reduce((acc, curr) => acc + curr.sessionsCompleted, 0);
  const avgAttendance = Math.round(userEnrollments.reduce((acc, curr) => acc + curr.attendanceRate, 0) / userEnrollments.length);
  const totalHours = userEnrollments.reduce((acc, curr) => acc + (curr.sessionsCompleted * 1.5), 0); // Assuming 1.5h avg per session

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight">Progress & Reports</h1>
          <p className="text-sm text-white/50 font-medium mt-1">Deep dive into your swimming performance and trends.</p>
        </div>
        <button className="btn-primary flex items-center gap-2 px-6 py-2.5 shadow-xl shadow-primary/20">
          <Download size={18} /> Download Report
        </button>
      </div>

      {/* Overall Progress Summary */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Programs Enrolled", value: userEnrollments.length, icon: Target, color: "text-primary", bg: "bg-primary/20" },
          { label: "Sessions Completed", value: totalSessions, icon: CheckCircle2, color: "text-green-500", bg: "bg-green-500/20" },
          { label: "Avg. Attendance", value: `${avgAttendance}%`, icon: Calendar, color: "text-aqua", bg: "bg-aqua/20" },
          { label: "Total Training Hours", value: `${totalHours}h`, icon: Clock, color: "text-gold", bg: "bg-gold/20" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card-premium group"
          >
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
              <stat.icon size={24} />
            </div>
            <p className="text-[10px] uppercase tracking-widest font-black text-white/30 mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Training Performance Trend */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card-premium h-full">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                <BarChart3 size={18} className="text-primary" /> Training Performance Trend
              </h3>
              <select className="bg-muted text-xs font-semibold px-3 py-1.5 rounded-lg border-none focus:ring-1 focus:ring-primary outline-none">
                <option>Last 6 Weeks</option>
                <option>Last 3 Months</option>
              </select>
            </div>
            
            <div className="h-64 flex items-end justify-between gap-2 px-2">
              {userPerformanceTrend.map((data, i) => {
                const height = (data.distance / 2500) * 100;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-3 h-full justify-end group">
                    <div className="relative w-full flex justify-center">
                       {/* Tooltip */}
                      <div className="absolute -top-12 bg-navy text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        {data.distance}m • {data.sessions} sessions
                      </div>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="w-full max-w-[40px] bg-primary/20 group-hover:bg-primary rounded-t-lg transition-colors relative"
                      >
                        <div className="absolute top-0 left-0 w-full h-1 bg-primary group-hover:bg-cyan rounded-full" />
                      </motion.div>
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">{data.week.split(' ')[0]}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Training Insights */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card-premium bg-primary/5 border-primary/20 h-full">
            <h3 className="font-display text-base font-semibold text-foreground mb-4 flex items-center gap-2">
              <Zap size={16} className="text-primary" /> Smart Insights
            </h3>
            <div className="space-y-5">
              <div className="flex gap-4 p-3 rounded-xl bg-background/50 border border-border/50">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                  <TrendingUp size={18} className="text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Attendance Peak</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">Your attendance is 12% higher than average swimmers this month. Keep it up!</p>
                </div>
              </div>
              <div className="flex gap-4 p-3 rounded-xl bg-background/50 border border-border/50">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <Award size={18} className="text-gold" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Badge Progress</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">Complete 3 more sessions to unlock the "Master Endurance" badge.</p>
                </div>
              </div>
              <div className="flex gap-4 p-3 rounded-xl bg-background/50 border border-border/50">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                  <Info size={18} className="text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Next Milestone</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">You are only 400m away from hitting your 10,000m total distance goal.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Program Comparison */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card-premium">
            <h3 className="font-display text-lg font-semibold text-foreground mb-6">Program Completion</h3>
            <div className="space-y-6">
              {userEnrollments.map((prog) => (
                <div key={prog.programId} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <p className="text-sm font-bold text-foreground">{prog.title}</p>
                    <p className="text-xs font-bold text-primary">{prog.progress}%</p>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${prog.progress}%` }}
                      transition={{ duration: 1.5 }}
                      className="h-full bg-primary"
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground">{prog.sessionsCompleted} of {prog.sessionsTotal} sessions</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements & Milestones */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card-premium">
             <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                <Award size={18} className="text-gold" /> Achievements & Milestones
              </h3>
              <button className="text-xs text-primary font-bold hover:underline">View All Badges</button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {userAchievements.map((ach, i) => (
                <motion.div
                  key={ach.id}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-xl border border-border bg-muted/20 flex gap-4 transition-all"
                >
                  <div className={`w-12 h-12 rounded-full ${ach.bg} ${ach.color} flex items-center justify-center shrink-0 shadow-sm shadow-black/5`}>
                    {ach.icon === "Target" && <Target size={24} />}
                    {ach.icon === "Award" && <Award size={24} />}
                    {ach.icon === "Zap" && <Zap size={24} />}
                    {ach.icon === "Sun" && <Sun size={24} />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{ach.title}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{ach.desc}</p>
                    <p className="text-[10px] text-muted-foreground mt-2 opacity-50 uppercase font-black">{ach.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Coach Feedback */}
        <div className="lg:col-span-3 space-y-6">
          <div className="card-premium">
            <h3 className="font-display text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
              <MessageSquare size={18} className="text-primary" /> Coach Feedback & Ratings
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {userCoachFeedback.map((fb, i) => (
                <div key={fb.id} className="p-6 rounded-2xl bg-muted/30 border border-border/50">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-base font-bold text-foreground">{fb.program}</h4>
                      <p className="text-xs text-muted-foreground">Feedback from <span className="text-primary font-semibold">{fb.coach}</span></p>
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-50">{fb.date}</span>
                  </div>
                  
                  <p className="text-sm text-foreground/80 leading-relaxed italic mb-6">"{fb.feedback}"</p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {Object.entries(fb.ratings).map(([key, val]) => (
                      <div key={key} className="text-center">
                        <p className="text-[9px] uppercase tracking-widest text-muted-foreground mb-1">{key}</p>
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-sm font-bold text-foreground">{val}</span>
                          <Star size={10} className="fill-gold text-gold" />
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
  );
}
