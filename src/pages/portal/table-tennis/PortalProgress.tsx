import { motion } from "framer-motion";
import { 
  TrendingUp, Award, Calendar, Clock, 
  Target, Zap, Sun, Download, Star, 
  ChevronRight, CheckCircle2, MessageSquare, 
  Info, BarChart3, MapPin, Activity
} from "lucide-react";

// Table Tennis Specific Mock Data
const ttEnrollments = [
  {
    programId: "tt1",
    title: "Saturday League",
    coach: "Coach Arjun",
    sessionsTotal: 12,
    sessionsCompleted: 4,
    attendanceRate: 95,
    progress: 33,
  },
  {
    programId: "tt2",
    title: "Advanced Spin Control",
    coach: "Coach Rahul",
    sessionsTotal: 8,
    sessionsCompleted: 6,
    attendanceRate: 100,
    progress: 75,
  }
];

const ttPerformanceTrend = [
  { week: "Week 1", spin: 1200, sets: 8 },
  { week: "Week 2", spin: 1350, sets: 10 },
  { week: "Week 3", spin: 1400, sets: 9 },
  { week: "Week 4", spin: 1650, sets: 12 },
  { week: "Week 5", spin: 1700, sets: 11 },
  { week: "Week 6", spin: 1850, sets: 14 },
];

const ttAchievements = [
  { id: 1, title: "Spin Doctor", desc: "Successfully landed 20 consecutive heavy-spin serves.", date: "2026-03-05", icon: "Target", color: "text-rose-500", bg: "bg-rose-500/10" },
  { id: 2, title: "Smash King", desc: "Maintained 90% smash accuracy for 5 matches.", date: "2026-02-20", icon: "Award", color: "text-gold", bg: "bg-gold/10" },
  { id: 3, title: "Consistent Server", desc: "Recorded zero service faults in a tournament set.", date: "2026-02-25", icon: "Zap", color: "text-blue-500", bg: "bg-blue-500/10" },
  { id: 4, title: "Early Bird", desc: "Completed 5 practice sessions before 7:00 AM.", date: "2026-03-08", icon: "Sun", color: "text-orange-500", bg: "bg-orange-500/10" },
];

const ttCoachFeedback = [
  {
    id: 1,
    program: "Saturday League",
    coach: "Coach Arjun",
    date: "2026-03-11",
    feedback: "Aarav's forehand loop has significantly improved in RPM. His footwork during transitions is getting smoother. Focusing on serve variation in the coming weeks.",
    ratings: { Spin: 4.8, Speed: 4.3, Footwork: 4.2, Tactics: 4.5 }
  },
  {
    id: 2,
    program: "Advanced Spin Control",
    coach: "Coach Rahul",
    date: "2026-03-05",
    feedback: "Excellent push-block execution. Aarav is reading the opponent's topspin much better. We need to sharpen the backhand flick for short balls.",
    ratings: { Accuracy: 4.6, Control: 4.7, Reflex: 4.5, Power: 4.0 }
  }
];

export default function PortalProgress() {
  const totalSessions = ttEnrollments.reduce((acc, curr) => acc + curr.sessionsCompleted, 0);
  const avgAttendance = Math.round(ttEnrollments.reduce((acc, curr) => acc + curr.attendanceRate, 0) / ttEnrollments.length);
  const totalHours = ttEnrollments.reduce((acc, curr) => acc + (curr.sessionsCompleted * 1.5), 0); 

  return (
    <div className="space-y-8 pb-10">
      <div className="card-premium border-red-tile bg-black/95 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight">Table Tennis Progress</h1>
          <p className="text-sm text-white/70 font-bold mt-1">Review your match performance, spin stats, and rankings.</p>
        </div>
        <button className="btn-primary flex items-center gap-2 px-8 py-2.5 shadow-xl shadow-red-500/20 shrink-0 bg-red-500 hover:bg-red-600">
          <Download size={18} /> Download Report
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Leagues Active", value: ttEnrollments.length, icon: Target, color: "text-rose-500", bg: "bg-rose-500/10", border: "border-red-tile" },
          { label: "Sets Played", value: totalSessions * 3, icon: CheckCircle2, color: "text-green-500", bg: "bg-green-500/10", border: "border-green-tile" },
          { label: "Avg. Attendance", value: `${avgAttendance}%`, icon: Calendar, color: "text-orange-500", bg: "bg-orange-500/10", border: "border-gold-tile" },
          { label: "Total Training", value: `${totalHours}h`, icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-red-tile" },
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
        <div className="lg:col-span-2 space-y-6">
          <div className="card-premium border-red-tile bg-black/95 h-full">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-display text-lg font-bold text-white flex items-center gap-2 tracking-tight">
                <BarChart3 size={18} className="text-rose-500" /> Spin Consistency Trend
              </h3>
              <select className="bg-white/5 text-white text-xs font-bold px-4 py-2 rounded-xl border border-white/10 outline-none appearance-none cursor-pointer">
                <option className="bg-neutral-900">Last 6 Weeks</option>
                <option className="bg-neutral-900">Last 3 Months</option>
              </select>
            </div>
            
            <div className="h-64 flex items-end justify-between gap-2 px-2">
              {ttPerformanceTrend.map((data, i) => {
                const height = (data.spin / 2000) * 100;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-3 h-full justify-end group">
                    <div className="relative w-full flex justify-center">
                      <div className="absolute -top-12 bg-rose-500 text-white text-[10px] font-black px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100 whitespace-nowrap z-10 shadow-xl">
                        {data.spin} RPM • {data.sets} sets
                      </div>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="w-full max-w-[42px] bg-gradient-to-t from-rose-500/20 to-rose-500/40 group-hover:from-rose-500 group-hover:to-pink-400 rounded-t-xl transition-all duration-500 relative"
                      >
                        <div className="absolute top-0 left-0 w-full h-1 bg-pink-300 rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
                      </motion.div>
                    </div>
                    <span className="text-[10px] font-black text-white/40 uppercase group-hover:text-rose-500 transition-colors">{data.week.split(' ')[0]}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="card-premium border-gold-tile bg-black/95 h-full">
            <h3 className="font-display text-base font-bold text-white mb-6 flex items-center gap-2 uppercase tracking-tight">
              <Zap size={16} className="text-rose-500" /> Training Insights
            </h3>
            <div className="space-y-4">
              {[
                { label: "Top Performer", desc: "Your attendance is 12% higher than average Athletes this month. Keep it up!", icon: TrendingUp, color: "text-green-500", bg: "bg-green-500/10" },
                { label: "Badge Progress", desc: "Win 2 more league matches to unlock the 'Spin Doctor' badge.", icon: Award, color: "text-amber-500", bg: "bg-amber-500/10" },
                { label: "Reflex Goal", desc: "You are only 5 blocks away from hitting your defensive consistency target.", icon: Info, color: "text-rose-500", bg: "bg-rose-500/10" }
              ].map((insight, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group">
                  <div className={`w-10 h-10 rounded-xl ${insight.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    <insight.icon size={18} className={insight.color} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white group-hover:text-rose-500 transition-colors">{insight.label}</p>
                    <p className="text-xs text-white/50 mt-1 leading-relaxed font-medium">{insight.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="card-premium border-red-tile bg-black/95">
            <h3 className="font-display text-lg font-bold text-white mb-6 uppercase tracking-tight">League Completion</h3>
            <div className="space-y-6">
              {ttEnrollments.map((prog) => (
                <div key={prog.programId} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <p className="text-sm font-bold text-white">{prog.title}</p>
                    <p className="text-xs font-black text-rose-500">{prog.progress}%</p>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${prog.progress}%` }}
                      transition={{ duration: 1.5 }}
                      className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full"
                    />
                  </div>
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-tight">{prog.sessionsCompleted} <span className="text-white/20">of</span> {prog.sessionsTotal} sessions</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="card-premium border-gold-tile bg-black/95 h-full">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-display text-lg font-bold text-white flex items-center gap-2 uppercase tracking-tight">
                <Award size={18} className="text-amber-500" /> Achievement Gallery
              </h3>
              <button className="text-xs text-rose-500 font-black uppercase tracking-widest hover:underline">View Gallery</button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {ttAchievements.map((ach, i) => {
                const Icon = ach.icon === "Target" ? Target : ach.icon === "Award" ? Award : ach.icon === "Zap" ? Zap : Sun;
                return (
                  <motion.div
                    key={ach.id}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 rounded-2xl border border-white/5 bg-white/5 flex gap-4 transition-all hover:bg-white/10 group"
                  >
                    <div className={`w-12 h-12 rounded-full ${ach.bg} ${ach.color} flex items-center justify-center shrink-0 shadow-lg shadow-black/20 group-hover:scale-110 transition-transform`}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{ach.title}</h4>
                      <p className="text-[11px] text-white/50 mt-1 leading-relaxed font-medium">{ach.desc}</p>
                      <p className="text-[10px] text-white/20 mt-3 uppercase font-black tracking-widest">{ach.date}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="card-premium border-red-tile bg-black/95">
            <h3 className="font-display text-lg font-bold text-white mb-8 flex items-center gap-2 uppercase tracking-tight">
              <MessageSquare size={18} className="text-rose-500" /> Coach Feedback & Ratings
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {ttCoachFeedback.map((fb, i) => (
                <div key={fb.id} className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="text-base font-bold text-white group-hover:text-rose-500 transition-colors">{fb.program}</h4>
                      <p className="text-xs text-white/40 font-bold mt-1">Feedback from <span className="text-rose-500">{fb.coach}</span></p>
                    </div>
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{fb.date}</span>
                  </div>
                  
                  <p className="text-sm text-white/70 leading-relaxed italic mb-8 font-medium">"{fb.feedback}"</p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/5">
                    {Object.entries(fb.ratings).map(([key, val]) => (
                      <div key={key} className="text-center group/rate">
                        <p className="text-[9px] uppercase tracking-widest font-black text-white/30 mb-2 group-hover/rate:text-rose-500 transition-colors">{key}</p>
                        <div className="flex items-center justify-center gap-1.5">
                          <span className="text-sm font-black text-white">{val as number}</span>
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
  );
}
