import { motion } from "framer-motion";
import { GraduationCap, Clock, Calendar, TrendingUp, ChevronRight, Activity, Users, Star } from "lucide-react";
import { userEnrollments, allSportPrograms } from "@/data/mockData";

export default function PortalPrograms() {
  const sportName = "Swimming";
  const activePrograms = userEnrollments.filter(p => p.programId.startsWith('sw-'));
  const activeIds = new Set(activePrograms.map(p => p.programId));
  
  const availablePrograms = (allSportPrograms[sportName] || []).filter(p => !activeIds.has(p.id));

  return (
    <div className="space-y-12 pb-12">
      <div className="card-premium border-blue-tile bg-black/95">
        <h1 className="font-display text-3xl font-bold text-white tracking-tight">My Swimming Programs</h1>
        <p className="text-sm text-white/70 font-bold mt-1">Manage your active training and explore premium coaching tracks.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Active Programs Section */}
          <section className="space-y-6">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary/60 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-primary/20"></span> Active Enrollments
            </h2>
            
            <div className="grid gap-6">
              {activePrograms.length > 0 ? activePrograms.map((program, i) => (
                <motion.div 
                  key={program.programId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="card-premium border-blue-tile bg-black/95 flex flex-col group overflow-hidden relative"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/10 transition-all duration-1000" />
                  
                  <div className="relative z-10">
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
                      <div className="p-5 rounded-2xl bg-white/3 border border-white/5 group-hover:border-white/10 transition-all">
                        <p className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-2">Sessions</p>
                        <p className="text-sm font-black text-white">{program.sessionsCompleted} <span className="text-white/20">/</span> {program.sessionsTotal}</p>
                      </div>
                      <div className="p-5 rounded-2xl bg-white/3 border border-white/5 group-hover:border-white/10 transition-all">
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
                          className="h-full bg-gradient-to-r from-primary to-aqua rounded-full"
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
                  </div>
                </motion.div>
              )) : (
                <div className="card-premium border-dashed border-white/10 bg-white/5 py-12 text-center">
                  <p className="text-white/40 text-sm font-medium">No active enrollments for {sportName}.</p>
                </div>
              )}
            </div>
          </section>

          {/* Available Programs Section */}
          {availablePrograms.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary/60 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-primary/20"></span> Discover Other Programs
              </h2>
              
              <div className="grid gap-6">
                {availablePrograms.map((program, i) => (
                  <motion.div 
                    key={program.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="card-premium border-white/5 bg-black/95 group hover:border-primary/30 transition-all overflow-hidden relative"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Image container */}
                      <div className="w-full md:w-48 h-32 rounded-2xl overflow-hidden relative shrink-0">
                        <img src={program.image} alt={program.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        <div className="absolute bottom-3 left-3">
                          <span className={`px-2 py-1 rounded-lg ${program.badgeColor} text-white text-[8px] font-black uppercase tracking-widest`}>
                            {program.badge.split(' ')[1]}
                          </span>
                        </div>
                      </div>

                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{program.title}</h3>
                            <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mt-0.5">{program.level} • {program.ageGroup}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-black text-white tracking-tighter">₹{program.price}</p>
                            <p className="text-[8px] text-white/30 font-bold uppercase">per month</p>
                          </div>
                        </div>

                        <p className="text-xs text-white/60 line-clamp-2 mb-6 leading-relaxed">
                          {program.description}
                        </p>

                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                          <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                              <Calendar size={12} className="text-primary" />
                              <span className="text-[10px] text-white/60 font-medium">{program.schedule}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users size={12} className="text-primary" />
                              <span className="text-[10px] text-white/60 font-medium">{program.ageGroup}</span>
                            </div>
                          </div>
                          <button className="px-5 py-2 rounded-xl bg-primary text-white text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-glow shadow-primary/20">
                            Enroll Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}
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
                <p className="text-[11px] text-white/60 leading-relaxed font-medium">Your attendance is <span className="text-white">12% higher</span> than average swimmers this month.</p>
              </div>
              <div className="p-5 rounded-2xl bg-black/40 border border-white/5 group">
                <p className="text-xs font-black uppercase tracking-widest text-gold mb-2">Next Milestone</p>
                <p className="text-[11px] text-white/60 leading-relaxed font-medium">Complete <span className="text-white">5 more sessions</span> to level up your badge.</p>
              </div>
            </div>
          </div>

          <div className="card-premium border-white/5 bg-black/80">
            <h3 className="font-display text-lg font-bold text-white mb-3 flex items-center gap-2 uppercase tracking-tight">
              <Star size={18} className="text-primary" /> Certificates
            </h3>
            <p className="text-xs text-white/40 mb-6 font-bold leading-relaxed">Complete programs to earn excellence badges and official certification.</p>
            <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white/10 transition-all">
              Achievement Gallery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
