import { CalendarCheck, X, RefreshCw, MapPin, Clock } from "lucide-react";
import { useState } from "react";

interface Booking {
  id: string;
  date: string;
  time: string;
  centre: string;
  type: string;
  status: string;
}

interface SportBookingsProps {
  title: string;
  subtitle: string;
  headerBorderClass: string;
  accentColorClass: string;
  accentBgClass: string;
  bookings: Booking[];
  sportTypeLabel: string; // e.g., "Open Swim", "Court Booking" (if need default, though it's in the data)
}

export default function SportBookings({
  title,
  subtitle,
  headerBorderClass,
  accentColorClass,
  accentBgClass,
  bookings: initialBookings,
}: SportBookingsProps) {
  const [bookingsList, setBookingsList] = useState(initialBookings);
  const [activeFilter, setActiveFilter] = useState("all");
  const filteredBookings = activeFilter === "all" ? bookingsList : bookingsList.filter((b) => b.status.toLowerCase() === activeFilter);

  // Reschedule State
  const [rescheduleData, setRescheduleData] = useState<{ id: string, date: string, time: string } | null>(null);

  const handleRescheduleSubmit = () => {
    if (!rescheduleData) return;
    setBookingsList(bookingsList.map(b => b.id === rescheduleData.id ? { ...b, date: rescheduleData.date, time: rescheduleData.time } : b));
    setRescheduleData(null);
  };

  const handleCancel = (id: string) => {
    setBookingsList(bookingsList.map(b => b.id === id ? { ...b, status: "Cancelled" } : b));
  };

  return (
    <div className="space-y-10">
      <div className={`card-premium ${headerBorderClass} flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden relative`}>
        <div className={`absolute -top-10 -right-10 w-40 h-40 ${accentBgClass} rounded-full blur-3xl`} />
        <div className="flex flex-col gap-1 relative z-10">
          <h1 className="font-display text-4xl font-bold text-white tracking-tight">{title}</h1>
          <p className="text-white/70 font-semibold text-lg italic">{subtitle}</p>
        </div>
      </div>

      <div className="card-premium border-white/10 p-6 sm:p-10">
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
              className={`group p-8 rounded-[2.5rem] bg-black/95 border border-white/5 hover:border-primary/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-8 shadow-2xl shadow-black/40`}
            >
              {rescheduleData?.id === booking.id ? (
                <div className="flex-1 flex flex-col md:flex-row items-end gap-4">
                  <div className="flex-1 w-full space-y-4">
                    <p className="text-sm font-bold text-white">Select new date & time for your booking:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase tracking-widest text-white/30 ml-2">New Date</label>
                        <input 
                          type="date" 
                          value={rescheduleData.date}
                          onChange={(e) => setRescheduleData({ ...rescheduleData, date: e.target.value })}
                          className="w-full px-5 py-3 rounded-2xl bg-white/5 text-white font-bold text-sm border border-white/10 outline-none focus:border-primary transition-all"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase tracking-widest text-white/30 ml-2">New Time</label>
                        <input 
                          type="text" 
                          placeholder="e.g. 6:30 PM - 7:30 PM"
                          value={rescheduleData.time}
                          onChange={(e) => setRescheduleData({ ...rescheduleData, time: e.target.value })}
                          className="w-full px-5 py-3 rounded-2xl bg-white/5 text-white font-bold text-sm border border-white/10 outline-none focus:border-primary transition-all placeholder:text-white/10"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full md:w-auto h-fit">
                    <button 
                      onClick={handleRescheduleSubmit}
                      className="flex-1 md:flex-none px-8 py-3.5 rounded-2xl bg-primary text-white font-black text-[10px] uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                    >
                      Confirm
                    </button>
                    <button 
                      onClick={() => setRescheduleData(null)}
                      className="flex-1 md:flex-none px-8 py-3.5 rounded-2xl bg-white/5 text-white font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all border border-white/10"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg shadow-black/20">
                        <CalendarCheck size={20} className={accentColorClass} />
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
                    <div className="flex flex-wrap items-center gap-6 text-white/40 font-bold text-xs md:ml-16">
                      <span className="flex items-center gap-2.5 font-bold uppercase tracking-widest text-[10px]">
                        <Clock size={14} className={accentColorClass} /> {booking.time}
                      </span>
                      <span className="flex items-center gap-2.5 font-bold uppercase tracking-widest text-[10px]">
                        <MapPin size={14} className={accentColorClass} /> {booking.centre} Centre
                      </span>
                      <span className={`font-black uppercase tracking-widest text-[9px] px-3 py-1.5 rounded-xl ${accentBgClass} ${accentColorClass} border border-white/10 backdrop-blur-md shadow-glow shadow-primary/10`}>
                        {booking.type}
                      </span>
                    </div>
                  </div>
                  {booking.status === "Upcoming" && (
                    <div className="flex flex-col sm:flex-row gap-4 sm:pl-8 sm:border-l border-white/5">
                      <button 
                         onClick={() => setRescheduleData({ id: booking.id, date: booking.date, time: booking.time })}
                        className="px-6 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-[11px] font-black uppercase tracking-widest text-white hover:bg-primary hover:border-primary hover:text-white transition-all flex items-center gap-3 shadow-xl shadow-black/20 group/btn"
                      >
                        <RefreshCw size={16} className="group-hover/btn:rotate-180 transition-transform duration-700" /> Reschedule
                      </button>
                      <button 
                        onClick={() => handleCancel(booking.id)}
                        className="px-6 py-3.5 rounded-2xl bg-destructive/10 border border-destructive/20 text-[11px] font-black uppercase tracking-widest text-destructive hover:bg-destructive hover:text-white transition-all flex items-center gap-3 shadow-xl shadow-destructive/20 group/btn"
                      >
                        <X size={16} className="group-hover/btn:scale-110 transition-transform" /> Cancel
                      </button>
                    </div>
                  )}
                </>
              )
}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
