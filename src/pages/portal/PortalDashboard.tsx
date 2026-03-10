import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  CalendarCheck, CreditCard, GraduationCap, Bell, ArrowRight, 
  MapPin, Star, MessageSquare, Clock, Gift, Zap 
} from "lucide-react";
import { notifications, userActiveMembership, userEnrollments } from "@/data/mockData";

const campaigns = [
  {
    id: 1,
    title: "Summer Splash Offer",
    desc: "Get 20% off on Annual Memberships this week!",
    icon: Gift,
    color: "from-primary/10 to-primary/5",
    badge: "Limited Time"
  },
  {
    id: 2,
    title: "Pro Coaching Bundle",
    desc: "Buy 10 sessions, get 2 free for advanced swimmers.",
    icon: Zap,
    color: "from-primary/10 to-primary/5",
    badge: "Popular"
  }
];

const upcomingBooking = {
  date: "Today, March 10",
  time: "6:30 AM – 7:30 AM",
  centre: "Downtown",
  type: "Open Swim",
};

export default function PortalDashboard() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-4xl font-bold text-navy tracking-tight">
          Welcome back, Aarav! 👋
        </h1>
        <p className="text-navy/50 font-medium">You have 2 sessions scheduled for this week.</p>
      </div>

      {/* Campaigns & Offers Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {campaigns.map((camp, i) => (
          <motion.div
            key={camp.id}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`relative overflow-hidden card-premium border-none group cursor-pointer`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${camp.color} opacity-40 group-hover:opacity-60 transition-opacity`} />
            <div className="relative z-10 flex gap-5 items-start">
              <div className={`w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-primary shadow-lg shadow-black/5`}>
                <camp.icon size={28} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                   <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">{camp.badge}</span>
                   <ArrowRight size={14} className="text-navy/20 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-bold text-lg text-navy mb-1">{camp.title}</h3>
                <p className="text-sm text-navy/60 leading-relaxed">{camp.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upcoming Booking */}
        <div className="card-premium relative overflow-hidden group">
           <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all" />
          <h3 className="text-sm font-black uppercase tracking-widest text-primary/60 mb-6 flex items-center gap-2">
            <CalendarCheck size={16} /> Booking
          </h3>
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-navy">{upcomingBooking.date}</span>
              <span className="text-sm font-semibold text-primary">{upcomingBooking.time}</span>
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-navy/5">
              <div className="p-2 rounded-lg bg-navy/5">
                <MapPin size={16} className="text-navy/40" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-navy">{upcomingBooking.centre} Centre</span>
                <span className="text-[10px] text-navy/40 uppercase font-black">{upcomingBooking.type}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Membership Status */}
        <div className="card-premium relative overflow-hidden group">
           <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold/10 rounded-full blur-3xl group-hover:bg-gold/20 transition-all" />
          <h3 className="text-sm font-black uppercase tracking-widest text-gold/60 mb-6 flex items-center gap-2">
            <CreditCard size={16} /> Subscription
          </h3>
          <div className="space-y-5">
            <div>
              <p className="text-2xl font-bold text-navy leading-none mb-1">{userActiveMembership.name} Plan</p>
              <p className="text-xs text-navy/40 font-medium">Auto-renews on {userActiveMembership.expiryDate}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-500/20">
                {userActiveMembership.status}
              </span>
            </div>
            <Link to="/portal/memberships" className="flex items-center gap-2 text-xs font-bold text-navy hover:text-primary transition-colors pt-2">
              Upgrade Plan <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Recent Notifications */}
        <div className="card-premium">
          <h3 className="text-sm font-black uppercase tracking-widest text-cyan/60 mb-6 flex items-center gap-2">
            <Bell size={16} /> Feed
          </h3>
          <div className="space-y-4">
            {notifications.slice(0, 3).map((n) => (
              <div key={n.id} className="flex gap-4 items-start group cursor-pointer border-b border-navy/5 pb-3 last:border-0">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.read ? "bg-navy/10" : "bg-primary animate-pulse shadow-glow shadow-primary/30"}`} />
                <div>
                  <p className="text-xs font-bold text-navy mb-0.5 group-hover:text-primary transition-colors leading-tight">{n.title}</p>
                  <p className="text-[10px] text-navy/40 font-medium">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Programs Progress */}
        <div className="lg:col-span-3 card-premium">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl font-bold text-navy flex items-center gap-2">
              <GraduationCap size={24} className="text-primary" /> Training Performance
            </h2>
            <Link to="/portal/programs" className="text-xs font-bold text-primary hover:underline">Full Analytics</Link>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {userEnrollments.map((prog) => (
              <div key={prog.programId} className="space-y-3">
                <div className="flex justify-between items-end">
                  <p className="text-sm font-bold text-navy">{prog.title}</p>
                  <div className="flex items-center gap-1">
                    <Star size={10} className="fill-gold text-gold" />
                    <p className="text-xs font-black text-navy">{prog.progress}%</p>
                  </div>
                </div>
                <div className="h-2 w-full bg-navy/5 rounded-full overflow-hidden border border-navy/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${prog.progress}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-primary to-aqua relative"
                  >
                    <div className="absolute top-0 right-0 w-8 h-full bg-white/20 blur-sm" />
                  </motion.div>
                </div>
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-navy/30">
                  <span>{prog.sessionsCompleted} Sessions</span>
                  <span>{prog.sessionsTotal - prog.sessionsCompleted} Left</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Help */}
        <div className="lg:col-span-1 card-premium bg-gradient-to-br from-primary/5 to-navy/5 border-primary/20">
          <h3 className="text-sm font-bold text-navy mb-4">Need Help?</h3>
          <p className="text-xs text-navy/60 leading-relaxed mb-6">Our support team is available from 9 AM to 6 PM every day.</p>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/50 hover:bg-white/80 text-xs font-bold text-navy transition-all border border-navy/5">
              Chat Support <MessageSquare size={14} />
            </button>
            <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/50 hover:bg-white/80 text-xs font-bold text-navy transition-all border border-navy/5">
              Call Manager <Clock size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
