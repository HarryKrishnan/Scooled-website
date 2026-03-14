import { motion } from "framer-motion";
import { 
  TrendingUp, Award, Calendar, Clock, 
  Target, Zap, Sun, Download, Star, 
  ChevronRight, CheckCircle2, MessageSquare, 
  Info, BarChart3, MapPin, Activity
} from "lucide-react";
import { 
  userPerformanceTrend, 
  userAchievements, 
} from "@/data/mockData";

const futsalEnrollments = [
  {
    programId: "fp1",
    title: "Beginner Futsal Training",
    coach: "Marco Silva",
    sessionsTotal: 12,
    sessionsCompleted: 5,
    lastSession: "2026-03-08",
    attendanceRate: 100,
    nextSession: "Tomorrow, 6:00 PM",
    progress: 42,
    goals: 3,
    assists: 5,
    matchMinutes: 450
  },
  {
    programId: "fp2",
    title: "Weekend Futsal Tournament",
    coach: "Carlos Diaz",
    sessionsTotal: 8,
    sessionsCompleted: 3,
    lastSession: "2026-03-07",
    attendanceRate: 85,
    nextSession: "Sat, 9:00 AM",
    progress: 38,
    goals: 7,
    assists: 2,
    matchMinutes: 270
  }
];

const userCoachFeedback = [
  {
    id: "ff1",
    program: "Beginner Futsal Training",
    coach: "Marco Silva",
    date: "2026-03-05",
    feedback: "Great spatial awareness during the scrimmage. Focus on your first touch under pressure to transition faster to attack.",
    ratings: { mobility: 4.2, shooting: 3.8, passing: 4.5, defense: 4.0 },
  },
  {
    id: "ff2",
    program: "Weekend Futsal Tournament",
    coach: "Carlos Diaz",
    date: "2026-03-01",
    feedback: "Clinical finishing in front of goal! Work on tracking back to help the defense during counter-attacks.",
    ratings: { mobility: 4.5, shooting: 4.8, passing: 3.5, defense: 3.0 },
  }
];

export default function PortalProgress() {
  const totalSessions = futsalEnrollments.reduce((acc, curr) => acc + curr.sessionsCompleted, 0);
  const avgAttendance = Math.round(futsalEnrollments.reduce((acc, curr) => acc + curr.attendanceRate, 0) / futsalEnrollments.length);
  const totalMinutes = futsalEnrollments.reduce((acc, curr) => acc + curr.matchMinutes, 0);
  const totalGoals = futsalEnrollments.reduce((acc, curr) => acc + (curr.goals || 0), 0);

  return (
    <div className="space-y-8 pb-10">
      <div className="card-premium border-orange-tile bg-black/95 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight">Progress & Reports</h1>
          <p className="text-sm text-white/70 font-bold mt-1">Deep dive into your Futsal performance and match stats.</p>
        </div>
        <button className="btn-primary flex items-center gap-2 px-8 py-2.5 shadow-xl shadow-orange-500/20 shrink-0 bg-orange-500 hover:bg-orange-600">
          <Download size={18} /> Download Stats
        </button>
      </div>

      {/* Overall Progress Summary */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Goals Scored", value: totalGoals, icon: Activity, color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-tile" },
          { label: "Matches Played", value: totalSessions, icon: CheckCircle2, color: "text-green-500", bg: "bg-green-500/10", border: "border-green-tile" },
          { label: "Avg. Attendance", value: `${avgAttendance}%`, icon: Calendar, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-tile" },
          { label: "Total Play Time", value: `${totalMinutes}m`, icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-gold-tile" },
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
        {/* Match Performance Trend */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card-premium border-orange-tile bg-black/95 h-full">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                <BarChart3 size={18} className="text-orange-500" /> Match Performance Trend
              </h3>
              <select className="bg-white/5 text-white text-xs font-bold px-4 py-2 rounded-xl border border-white/10 focus:ring-1 focus:ring-orange-500 outline-none appearance-none cursor-pointer">
                <option className="bg-neutral-900">Last 6 Matches</option>
                <option className="bg-neutral-900">Season 2026</option>
              </select>
            </div>
            
            <div className="h-64 flex items-end justify-between gap-2 px-2">
              {userPerformanceTrend.map((data, i) => {
                const height = (data.sessions / 5) * 100;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-3 h-full justify-end group">
                    <div className="relative w-full flex justify-center">
                      <div className="absolute -top-12 bg-orange-500 text-white text-[10px] font-black px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100 whitespace-nowrap z-10 shadow-xl">
                        {data.sessions} Match Goals
                      </div>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="w-full max-w-[42px] bg-gradient-to-t from-orange-500/20 to-orange-500/40 group-hover:from-orange-500 group-hover:to-orange-600 rounded-t-xl transition-all duration-500 relative"
                      >
                        <div className="absolute top-0 left-0 w-full h-1 bg-orange-400 rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
                      </motion.div>
                    </div>
                    <span className="text-[10px] font-black text-white/40 uppercase group-hover:text-orange-500 transition-colors">{data.week.split(' ')[0]}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Player Insights */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card-premium border-gold-tile bg-black/95 h-full">
            <h3 className="font-display text-base font-bold text-white mb-6 flex items-center gap-2 uppercase tracking-tight">
              <Zap size={16} className="text-orange-500" /> Player Insights
            </h3>
            <div className="space-y-4">
              {[
                { label: "Stamina Peak", desc: "Your match play-time is 15% higher than average league players this month. Elite level!", icon: TrendingUp, color: "text-green-500", bg: "bg-green-500/10" },
                { label: "Golden Boot", desc: "Score 3 more goals to unlock the 'Sharp Shooter' badge.", icon: Award, color: "text-amber-500", bg: "bg-amber-500/10" },
                { label: "Next Milestone", desc: "You are only 120 minutes away from reaching your 1,000 minute season goal.", icon: Info, color: "text-orange-500", bg: "bg-orange-500/10" }
              ].map((insight, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group">
                  <div className={`w-10 h-10 rounded-xl ${insight.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    <insight.icon size={18} className={insight.color} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white group-hover:text-orange-500 transition-colors">{insight.label}</p>
                    <p className="text-xs text-white/50 mt-1 leading-relaxed font-medium">{insight.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Program Progress */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card-premium border-green-tile bg-black/95">
            <h3 className="font-display text-lg font-bold text-white mb-6 uppercase tracking-tight">Skill Completion</h3>
            <div className="space-y-6">
              {futsalEnrollments.map((prog) => (
                <div key={prog.programId} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <p className="text-sm font-bold text-white">{prog.title}</p>
                    <p className="text-xs font-black text-orange-500">{prog.progress}%</p>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${prog.progress}%` }}
                      transition={{ duration: 1.5 }}
                      className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                    />
                  </div>
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-tight">{prog.sessionsCompleted} <span className="text-white/20">of</span> {prog.sessionsTotal} sessions</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Coach Feedback */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card-premium border-orange-tile bg-black/95 h-full">
            <h3 className="font-display text-lg font-bold text-white mb-8 flex items-center gap-2 uppercase tracking-tight">
              <MessageSquare size={18} className="text-orange-500" /> Tactics & Ratings
            </h3>
            <div className="space-y-6">
              {userCoachFeedback.map((fb, i) => (
                <div key={fb.id} className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="text-base font-bold text-white group-hover:text-orange-500 transition-colors">{fb.program}</h4>
                      <p className="text-xs text-white/40 font-bold mt-1">Feedback from <span className="text-orange-500">{fb.coach}</span></p>
                    </div>
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{fb.date}</span>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed italic mb-8 font-medium">"{fb.feedback}"</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/5">
                    {Object.entries(fb.ratings).map(([key, val]) => (
                      <div key={key} className="text-center group/rate">
                        <p className="text-[9px] uppercase tracking-widest font-black text-white/30 mb-2 group-hover/rate:text-orange-500 transition-colors">{key}</p>
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
  );
}
