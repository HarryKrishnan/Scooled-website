import { CalendarCheck, CreditCard, GraduationCap, Bell, ArrowRight, Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { notifications, userActiveMembership, userEnrollments } from "@/data/mockData";

const upcomingBooking = {
  date: "Today, March 10",
  time: "6:30 AM – 7:30 AM",
  centre: "Downtown",
  type: "Open Swim",
};

const quickActions = [
  { label: "Book a Slot", path: "/portal/book", icon: CalendarCheck, color: "bg-primary/10 text-primary" },
  { label: "My Bookings", path: "/portal/bookings", icon: Clock, color: "bg-cyan/10 text-cyan" },
  { label: "View Programs", path: "/portal/programs", icon: GraduationCap, color: "bg-aqua/10 text-aqua" },
  { label: "Make Payment", path: "/portal/payments", icon: CreditCard, color: "bg-gold/10 text-gold" },
];

export default function PortalDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Welcome back, Aarav! 👋</h1>
        <p className="text-sm text-muted-foreground mt-1">Here's your swimming overview.</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((a) => (
          <Link key={a.path} to={a.path} className="card-premium flex items-center gap-3 hover:shadow-lg">
            <div className={`w-10 h-10 rounded-xl ${a.color} flex items-center justify-center`}>
              <a.icon size={20} />
            </div>
            <span className="text-sm font-medium text-foreground">{a.label}</span>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upcoming Booking */}
        <div className="card-premium">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <CalendarCheck size={16} className="text-primary" /> Upcoming Booking
          </h3>
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
            <p className="text-sm font-semibold text-foreground">{upcomingBooking.date}</p>
            <p className="text-xs text-muted-foreground mt-1">{upcomingBooking.time}</p>
            <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
              <MapPin size={12} /> {upcomingBooking.centre} • {upcomingBooking.type}
            </div>
          </div>
        </div>

        {/* Membership */}
        <div className="card-premium">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <CreditCard size={16} className="text-primary" /> Membership
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Plan</span><span className="font-medium text-foreground">{userActiveMembership.name}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Status</span><span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{userActiveMembership.status}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Expires</span><span className="font-medium text-foreground">{userActiveMembership.expiryDate}</span></div>
          </div>
          <Link to="/portal/memberships" className="text-xs text-primary font-medium mt-4 block">Manage Membership</Link>
        </div>

        {/* Notifications */}
        <div className="card-premium">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Bell size={16} className="text-primary" /> Notifications
          </h3>
          <div className="space-y-3">
            {notifications.slice(0, 3).map((n) => (
              <div key={n.id} className={`text-sm ${n.read ? "opacity-60" : ""}`}>
                <p className="font-medium text-foreground text-xs">{n.title}</p>
                <p className="text-xs text-muted-foreground">{n.time}</p>
              </div>
            ))}
          </div>
          <Link to="/portal/notifications" className="text-xs text-primary font-medium mt-3 flex items-center gap-1">
            View all <ArrowRight size={12} />
          </Link>
        </div>
        {/* Programs Progress */}
        <div className="lg:col-span-3 card-premium">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <GraduationCap size={16} className="text-primary" /> Program Progress
            </h3>
            <Link to="/portal/programs" className="text-xs text-primary font-medium">My Programs</Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {userEnrollments.map((prog) => (
              <div key={prog.programId} className="space-y-2">
                <div className="flex justify-between items-end">
                  <p className="text-sm font-medium text-foreground">{prog.title}</p>
                  <p className="text-xs text-muted-foreground">{prog.progress}%</p>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${prog.progress}%` }}
                    className="h-full bg-primary"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Payments */}
      <div className="card-premium">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground">Recent Payments</h3>
          <Link to="/portal/payments" className="text-xs text-primary font-medium">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 text-xs text-muted-foreground font-medium">Date</th>
                <th className="text-left py-2 text-xs text-muted-foreground font-medium">Type</th>
                <th className="text-left py-2 text-xs text-muted-foreground font-medium">Amount</th>
                <th className="text-left py-2 text-xs text-muted-foreground font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: "Mar 1, 2025", type: "Membership", amount: "₹7,999", status: "Completed" },
                { date: "Feb 15, 2025", type: "Coaching", amount: "₹3,500", status: "Completed" },
              ].map((p, i) => (
                <tr key={i} className="border-b border-border/50">
                  <td className="py-2.5 text-foreground">{p.date}</td>
                  <td className="py-2.5 text-muted-foreground">{p.type}</td>
                  <td className="py-2.5 font-medium text-foreground">{p.amount}</td>
                  <td className="py-2.5"><span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{p.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
