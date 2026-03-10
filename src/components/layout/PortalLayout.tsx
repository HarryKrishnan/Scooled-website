import { Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, User, CalendarPlus, CalendarCheck, GraduationCap,
  CreditCard, Wallet, TrendingUp, MessageSquare, Bell, LogOut, Menu, X, Waves
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", path: "/portal", icon: LayoutDashboard },
  { label: "My Profile", path: "/portal/profile", icon: User },
  { label: "Book Slots", path: "/portal/book", icon: CalendarPlus },
  { label: "My Bookings", path: "/portal/bookings", icon: CalendarCheck },
  { label: "Programs", path: "/portal/programs", icon: GraduationCap },
  { label: "Memberships", path: "/portal/memberships", icon: CreditCard },
  { label: "Payments", path: "/portal/payments", icon: Wallet },
  { label: "Progress", path: "/portal/progress", icon: TrendingUp },
  { label: "Feedback", path: "/portal/feedback", icon: MessageSquare },
  { label: "Notifications", path: "/portal/notifications", icon: Bell },
];

export default function PortalLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-foreground/20 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-navy text-primary-foreground flex flex-col z-50 transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-5 flex items-center gap-2 border-b border-primary-foreground/10">
          <Waves size={24} className="text-cyan" />
          <span className="font-display text-lg font-bold">Scooled</span>
          <button className="lg:hidden ml-auto" onClick={() => setSidebarOpen(false)}><X size={20} /></button>
        </div>
        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-5 py-2.5 text-sm font-medium transition-colors ${
                  active ? "bg-sidebar-accent text-primary-foreground" : "text-primary-foreground/60 hover:text-primary-foreground hover:bg-sidebar-accent/50"
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-primary-foreground/10">
          <Link to="/" className="flex items-center gap-2 text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
            <LogOut size={16} /> Back to Website
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-card/95 backdrop-blur-lg border-b border-border h-14 flex items-center px-4 lg:px-6">
          <button className="lg:hidden mr-3" onClick={() => setSidebarOpen(true)}><Menu size={20} /></button>
          <h2 className="font-display text-lg font-semibold text-foreground">Customer Portal</h2>
          <div className="ml-auto flex items-center gap-3">
            <Bell size={18} className="text-muted-foreground cursor-pointer" />
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">A</div>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
