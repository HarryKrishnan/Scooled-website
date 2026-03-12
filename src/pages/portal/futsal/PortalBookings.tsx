import { CalendarCheck, X, RefreshCw, MapPin, Clock } from "lucide-react";
import { useState } from "react";

const bookings = [
  { id: "b1", date: "Mar 10, 2025", time: "6:30 AM – 7:30 AM", centre: "Downtown", type: "Open Play", status: "Upcoming" },
  { id: "b2", date: "Mar 11, 2025", time: "4:00 PM – 5:00 PM", centre: "Downtown", type: "Coaching", status: "Upcoming" },
  { id: "b3", date: "Mar 8, 2025", time: "7:00 PM – 8:00 PM", centre: "Westside", type: "Open Play", status: "Completed" },
  { id: "b4", date: "Mar 7, 2025", time: "6:30 AM – 7:30 AM", centre: "Downtown", type: "Open Play", status: "Completed" },
  { id: "b5", date: "Mar 5, 2025", time: "5:00 PM – 6:00 PM", centre: "Westside", type: "Coaching", status: "Cancelled" },
];

export default function PortalBookings() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? bookings : bookings.filter((b) => b.status === filter);

  const [activeFilter, setActiveFilter] = useState("all");
  const filteredBookings = activeFilter === "all" ? bookings : bookings.filter((b) => b.status.toLowerCase() === activeFilter);

  return (
    <div className="space-y-10">
      <div className="card-premium border-orange-tile flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden relative">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
        <div className="flex flex-col gap-1 relative z-10">
          <h1 className="font-display text-4xl font-bold text-white tracking-tight">Your Bookings</h1>
          <p className="text-white/70 font-semibold text-lg italic">View and manage your upcoming and past Play sessions.</p>
        </div>
      </div>

      <div className="card-premium border-green-tile p-6 sm:p-10">
        <div className="flex flex-wrap gap-2 mb-8 p-1.5 bg-white/5 rounded-[1.5rem] w-fit border border-white/10">
          {["all", "upcoming", "completed", "cancelled"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter as any)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeFilter === filter
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "text-white/40 hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="group p-8 rounded-[2.5rem] bg-black/95 border border-white/5 hover:border-primary/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-8 shadow-2xl shadow-black/40"
            >
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg shadow-black/20">
                    <CalendarCheck size={20} className="text-primary" />
                  </div>
                  <div>
                    <span className="text-lg font-black text-white tracking-tight italic block">{booking.date}</span>
                    <span
                      className={`inline-block mt-2 text-[10px] px-3 py-1 rounded-lg font-black uppercase tracking-widest border ${
                        booking.status === "Upcoming"
                          ? "bg-primary/20 text-primary border-primary/30"
                          : booking.status === "Completed"
                          ? "bg-emerald-500/20 text-emerald-500 border-emerald-500/20"
                          : "bg-destructive/20 text-destructive border-destructive/20"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-6 text-white/40 font-bold text-xs ml-16">
                  <span className="flex items-center gap-2.5 font-bold uppercase tracking-widest text-[10px]">
                    <Clock size={14} className="text-primary" /> {booking.time}
                  </span>
                  <span className="flex items-center gap-2.5 font-bold uppercase tracking-widest text-[10px]">
                    <MapPin size={14} className="text-primary" /> {booking.centre} Centre
                  </span>
                  <span className="text-primary font-black uppercase tracking-widest text-[9px] px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 backdrop-blur-md shadow-glow shadow-primary/10">
                    {booking.type}
                  </span>
                </div>
              </div>
              {booking.status === "Upcoming" && (
                <div className="flex gap-4 sm:pl-8 sm:border-l border-white/5">
                  <button className="px-6 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-[11px] font-black uppercase tracking-widest text-white hover:bg-primary hover:border-primary hover:text-white transition-all flex items-center gap-3 shadow-xl shadow-black/20 group/btn">
                    <RefreshCw size={16} className="group-hover/btn:rotate-180 transition-transform duration-700" /> Reschedule
                  </button>
                  <button className="px-6 py-3.5 rounded-2xl bg-destructive/10 border border-destructive/20 text-[11px] font-black uppercase tracking-widest text-destructive hover:bg-destructive hover:text-white transition-all flex items-center gap-3 shadow-xl shadow-destructive/20 group/btn">
                    <X size={16} className="group-hover/btn:scale-110 transition-transform" /> Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
