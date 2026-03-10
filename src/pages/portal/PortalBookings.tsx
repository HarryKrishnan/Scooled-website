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
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-foreground">My Bookings</h1>

      <div className="flex gap-2 flex-wrap">
        {["All", "Upcoming", "Completed", "Cancelled"].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((b) => (
          <div key={b.id} className="card-premium flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <CalendarCheck size={16} className="text-primary" />
                <span className="text-sm font-semibold text-foreground">{b.date}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  b.status === "Upcoming" ? "bg-primary/10 text-primary" :
                  b.status === "Completed" ? "bg-muted text-muted-foreground" :
                  "bg-destructive/10 text-destructive"
                }`}>{b.status}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock size={12} /> {b.time}</span>
                <span className="flex items-center gap-1"><MapPin size={12} /> {b.centre}</span>
                <span>{b.type}</span>
              </div>
            </div>
            {b.status === "Upcoming" && (
              <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-muted flex items-center gap-1">
                  <RefreshCw size={12} /> Reschedule
                </button>
                <button className="px-3 py-1.5 rounded-lg border border-destructive/30 text-xs font-medium text-destructive hover:bg-destructive/5 flex items-center gap-1">
                  <X size={12} /> Cancel
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
