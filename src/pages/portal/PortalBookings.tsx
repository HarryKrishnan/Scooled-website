import { CalendarCheck, X, RefreshCw, MapPin, Clock } from "lucide-react";
import { useState } from "react";

const bookings = [
  { id: "b1", date: "Mar 10, 2025", time: "6:30 AM – 7:30 AM", centre: "Downtown", type: "Open Swim", status: "Upcoming" },
  { id: "b2", date: "Mar 11, 2025", time: "4:00 PM – 5:00 PM", centre: "Downtown", type: "Coaching", status: "Upcoming" },
  { id: "b3", date: "Mar 8, 2025", time: "7:00 PM – 8:00 PM", centre: "Westside", type: "Open Swim", status: "Completed" },
  { id: "b4", date: "Mar 7, 2025", time: "6:30 AM – 7:30 AM", centre: "Downtown", type: "Open Swim", status: "Completed" },
  { id: "b5", date: "Mar 5, 2025", time: "5:00 PM – 6:00 PM", centre: "Westside", type: "Coaching", status: "Cancelled" },
];

export default function PortalBookings() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-3xl font-bold text-navy tracking-tight">My Bookings</h1>
        <p className="text-sm text-navy/50 font-medium">Keep track of your upcoming and past swimming sessions.</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {["All", "Upcoming", "Completed", "Cancelled"].map((f) => (
          <button 
            key={f} 
            onClick={() => setFilter(f)} 
            className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
              filter === f 
                ? "bg-primary text-white shadow-lg shadow-primary/20" 
                : "bg-navy/5 text-navy/40 hover:bg-navy/10 hover:text-navy"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((b) => (
          <div key={b.id} className="card-premium flex flex-col sm:flex-row sm:items-center gap-6 group">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <CalendarCheck size={16} className="text-primary" />
                </div>
                <span className="text-sm font-bold text-navy">{b.date}</span>
                <span className={`text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest border ${
                  b.status === "Upcoming" ? "bg-primary/10 text-primary border-primary/20" :
                  b.status === "Completed" ? "bg-navy/5 text-navy/40 border-navy/5" :
                  "bg-destructive/10 text-destructive border-destructive/20"
                }`}>{b.status}</span>
              </div>
              <div className="flex items-center gap-4 text-[11px] font-bold text-navy/40">
                <span className="flex items-center gap-1.5"><Clock size={14} className="text-navy/20" /> {b.time}</span>
                <span className="flex items-center gap-1.5"><MapPin size={14} className="text-navy/20" /> {b.centre} Centre</span>
                <span className="text-primary/60 font-black uppercase tracking-widest text-[9px] px-2 py-0.5 rounded bg-navy/5">{b.type}</span>
              </div>
            </div>
            {b.status === "Upcoming" && (
              <div className="flex gap-3">
                <button className="px-5 py-2.5 rounded-2xl bg-navy/5 border border-navy/5 text-xs font-bold text-navy hover:bg-navy/10 transition-all flex items-center gap-2">
                  <RefreshCw size={14} /> Reschedule
                </button>
                <button className="px-5 py-2.5 rounded-2xl bg-destructive/5 border border-destructive/10 text-xs font-bold text-destructive hover:bg-destructive/10 transition-all flex items-center gap-2">
                  <X size={14} /> Cancel
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
