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
    <div className="space-y-6 max-w-2xl">
      <h1 className="font-display text-2xl font-bold text-foreground">Notifications</h1>
      <div className="space-y-3">
        {notifications.map((n) => {
          const Icon = typeIcons[n.type] || Info;
          return (
            <div key={n.id} className={`card-premium flex items-start gap-3 ${n.read ? "opacity-60" : ""}`}>
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Icon size={16} className="text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{n.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{n.message}</p>
                <p className="text-xs text-muted-foreground/60 mt-1">{n.time}</p>
              </div>
              {!n.read && <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
