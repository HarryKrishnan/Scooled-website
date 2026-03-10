import { useState } from "react";
import { Calendar, Users, CheckCircle, TrendingUp, Clock, Clipboard, FileText } from "lucide-react";
import { coachStats, coachSchedule, recentNotes, assignedGroups } from "@/data/coachMock";
import { motion } from "framer-motion";

export default function CoachDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Hello Coach 👋</h1>
        <p className="text-sm text-muted-foreground mt-1">Here’s your coaching overview for the day.</p>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat-card card-premium">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
            <Users className="text-primary" size={24} />
          </div>
          <span className="text-2xl font-bold text-foreground">{coachStats.totalTrainees}</span>
          <span className="text-sm text-muted-foreground mt-1">Total Trainees</span>
        </div>

        <div className="stat-card card-premium">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
            <Calendar className="text-primary" size={24} />
          </div>
          <span className="text-2xl font-bold text-foreground">{coachStats.todaysSessions}</span>
          <span className="text-sm text-muted-foreground mt-1">Today's Sessions</span>
        </div>

        <div className="stat-card card-premium">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
            <CheckCircle className="text-primary" size={24} />
          </div>
          <span className="text-2xl font-bold text-foreground">{coachStats.avgAttendance}%</span>
          <span className="text-sm text-muted-foreground mt-1">Avg Attendance</span>
        </div>

        <div className="stat-card card-premium">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
            <TrendingUp className="text-primary" size={24} />
          </div>
          <span className="text-2xl font-bold text-foreground">{coachStats.progressPending}</span>
          <span className="text-sm text-muted-foreground mt-1">Progress Updates</span>
        </div>
      </div>

      {/* Second row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Today's schedule */}
        <div className="card-premium">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Clock size={16} className="text-primary" /> Today's Schedule
          </h3>
          {coachSchedule.map((s) => (
            <div key={s.id} className="p-3 mb-2 rounded-lg bg-primary/5 border border-primary/10">
              <div className="flex justify-between items-center">
                <span className="font-medium text-foreground">{s.batch}</span>
                <span className="text-xs text-muted-foreground">{s.time}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {s.pool} • {s.type} ({s.trainees} trainees)
              </div>
            </div>
          ))}
        </div>

        {/* Trainee performance summary */}
        <div className="card-premium">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp size={16} className="text-primary" /> Trainee Performance
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {/* simple summary using assignedGroups or progress data */}
            {assignedGroups.map((g) => (
              <div key={g.id} className="space-y-1">
                <p className="text-sm font-medium text-foreground">{g.name}</p>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (g.size / 15) * 100)}%` }}
                    className="h-full bg-primary"
                  />
                </div>
                <span className="text-xs text-muted-foreground">Level: {g.level}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Third row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent notes */}
        <div className="card-premium">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <FileText size={16} className="text-primary" /> Recent Notes
          </h3>
          <div className="space-y-2">
            {recentNotes.map((n) => (
              <div key={n.id} className="text-sm">
                <p className="font-medium text-foreground">{n.text}</p>
                <p className="text-xs text-muted-foreground">{n.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Assigned groups */}
        <div className="card-premium">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Users size={16} className="text-primary" /> Assigned Groups
          </h3>
          <div className="space-y-2">
            {assignedGroups.map((g) => (
              <div key={g.id} className="flex justify-between text-sm">
                <span>{g.name}</span>
                <span className="text-muted-foreground">{g.level} • {g.size} trainees</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
