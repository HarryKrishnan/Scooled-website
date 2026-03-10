import { notifications } from "@/data/mockData";
import { Bell, CalendarCheck, CreditCard, Info, Megaphone } from "lucide-react";

const typeIcons: Record<string, typeof Bell> = {
  booking: CalendarCheck,
  payment: CreditCard,
  reminder: Bell,
  update: Megaphone,
};

export default function PortalNotifications() {
  return (
    <div className="space-y-8 max-w-2xl">
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-3xl font-bold text-white tracking-tight">Notifications</h1>
        <p className="text-sm text-white/50 font-medium">Stay updated with your latest activities and pool alerts.</p>
      </div>

      <div className="space-y-4">
        {notifications.map((n) => {
          const Icon = typeIcons[n.type] || Info;
          return (
            <div key={n.id} className={`card-premium flex items-start gap-4 transition-all ${n.read ? "opacity-40" : "border-primary/20 shadow-lg shadow-primary/5"}`}>
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0">
                <Icon size={20} className={n.read ? "text-white/40" : "text-primary"} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-bold text-white">{n.title}</p>
                  <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">{n.time}</p>
                </div>
                <p className="text-xs text-white/50 leading-relaxed">{n.message}</p>
              </div>
              {!n.read && <div className="w-2.5 h-2.5 rounded-full bg-primary mt-2 shrink-0 shadow-glow shadow-primary/40" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
