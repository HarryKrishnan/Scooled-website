import { motion } from "framer-motion";
import { GraduationCap, CheckCircle2, Clock, Calendar, TrendingUp, Users, ChevronRight } from "lucide-react";
import { userEnrollments } from "@/data/mockData";

export default function PortalPrograms() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-2xl font-bold text-foreground">My Programs</h1>
        <p className="text-sm text-muted-foreground">Track your progress and schedule for enrolled coaching programs.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Analytics Overview */}
        <div className="lg:col-span-3 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card-premium">
            <p className="text-xs text-muted-foreground mb-1">Total Programs</p>
            <p className="text-2xl font-bold text-foreground">{userEnrollments.length}</p>
          </div>
          <div className="card-premium">
            <p className="text-xs text-muted-foreground mb-1">Sessions Completed</p>
            <p className="text-2xl font-bold text-primary">
              {userEnrollments.reduce((acc, curr) => acc + curr.sessionsCompleted, 0)}
            </p>
          </div>
          <div className="card-premium">
            <p className="text-xs text-muted-foreground mb-1">Average Attendance</p>
            <p className="text-2xl font-bold text-aqua">
              {Math.round(userEnrollments.reduce((acc, curr) => acc + curr.attendanceRate, 0) / userEnrollments.length)}%
            </p>
          </div>
          <div className="card-premium">
            <p className="text-xs text-muted-foreground mb-1">Next Session</p>
            <p className="text-sm font-semibold text-foreground truncate">{userEnrollments[0].nextSession}</p>
          </div>
        </div>

        {/* Program Cards */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
            <GraduationCap size={18} className="text-primary" /> Enrolled Programs
          </h3>
          {userEnrollments.map((prog, i) => (
            <motion.div
              key={prog.programId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card-premium group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h4 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {prog.title}
                  </h4>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <Users size={14} /> Coach: {prog.coach}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-3 py-1 bg-primary/10 text-primary rounded-full">
                    {prog.progress}% Completed
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Completed</p>
                  <p className="text-sm font-bold text-foreground">{prog.sessionsCompleted} Classes</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Pending</p>
                  <p className="text-sm font-bold text-foreground">{prog.sessionsTotal - prog.sessionsCompleted} Classes</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Attendance</p>
                  <p className="text-sm font-bold text-foreground">{prog.attendanceRate}%</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Last Session</p>
                  <p className="text-sm font-bold text-foreground">{prog.lastSession}</p>
                </div>
              </div>

              <div className="relative h-2 w-full bg-muted rounded-full overflow-hidden mb-6">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${prog.progress}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="absolute top-0 left-0 h-full bg-primary"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar size={14} /> Next: <span className="text-foreground font-medium">{prog.nextSession}</span>
                </div>
                <button className="text-sm font-medium text-primary flex items-center gap-1 hover:gap-2 transition-all">
                  View Analytics <ChevronRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Insights & Tips */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card-premium bg-primary/5 border-primary/20">
            <h3 className="font-display text-base font-semibold text-foreground mb-3 flex items-center gap-2">
              <TrendingUp size={16} className="text-primary" /> Training Insights
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={16} className="text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Top Performer</p>
                  <p className="text-xs text-muted-foreground">Your attendance is 12% higher than average swimmers this month.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                  <Clock size={16} className="text-gold" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Next Milestone</p>
                  <p className="text-xs text-muted-foreground">Complete 5 more sessions to level up your Stroke Technique badge.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card-premium">
            <h3 className="font-display text-base font-semibold text-foreground mb-3">Explore Certificates</h3>
            <p className="text-xs text-muted-foreground mb-4">Complete your current programs to earn certified aquatic excellence badges.</p>
            <button className="btn-outline w-full text-xs py-2">View Certificate Gallery</button>
          </div>
        </div>
      </div>
    </div>
  );
}
