import { Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Calendar, GraduationCap, CreditCard as CardIcon, Users,
  UserPlus, Wallet, ClipboardCheck, TrendingUp, MessageSquare, Bell,
  BarChart3, Settings, LogOut, Menu, X, Home
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo-new.png";

const navItems = [
  { label: "Overview", path: "/admin", icon: LayoutDashboard },
  { label: "Customers", path: "/admin/customers", icon: Users },
  { label: "Coaches", path: "/admin/coaches", icon: UserPlus },
  { label: "Programs", path: "/admin/programs", icon: GraduationCap },
  { label: "Payments", path: "/admin/payments", icon: Wallet },
  { label: "Calendar", path: "/admin/calendar", icon: Calendar },
  { label: "Complaints", path: "/admin/complaints", icon: MessageSquare },
  { label: "Memberships", path: "/admin/memberships", icon: CardIcon },
  { label: "Attendance", path: "/admin/attendance", icon: ClipboardCheck },
  { label: "Progress", path: "/admin/progress", icon: TrendingUp },
  { label: "Notifications", path: "/admin/notifications", icon: Bell },
  { label: "Reports", path: "/admin/reports", icon: BarChart3 },
  { label: "Settings", path: "/admin/settings", icon: Settings },
];

export default function AdminLayout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setMobileMenuOpen(false), [location]);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden selection:bg-primary/20">
      {/* Dark Background Layer */}
      <div className="fixed inset-0 z-0 bg-[#0c0c0c]">
        {/* Vertical Stripe Pattern */}
        <div className="absolute left-1/2 -translate-x-1/2 w-48 h-full bg-[#1a1a1a] opacity-50" />
      </div>

      {/* UI Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top Navigation */}
        <header className="fixed top-0 left-0 right-0 z-50">
          <div className="mx-4 mt-4 glass-panel rounded-3xl px-6 py-4 border-white/10 bg-black/95 shadow-xl shadow-black/20 backdrop-blur-md">
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-2.5 group shrink-0" title="Back to website">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center group-hover:bg-amber-500 transition-colors">
                  <Home size={18} className="text-amber-500 group-hover:text-navy" />
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-sm tracking-tight text-white leading-none group-hover:text-amber-500 transition-colors">SCOOLED</span>
                  <span className="text-[9px] font-black uppercase tracking-[0.15em] text-amber-500 mt-1">ADMIN</span>
                </div>
              </Link>

              {/* Horizontal Scrollable Navigation */}
              <div className="relative flex-1 hidden lg:block overflow-hidden">
                {/* Left Fade Gradient */}
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black/95 to-transparent z-10" />
                
                {/* Navigation Items */}
                <nav className="flex items-center gap-2 overflow-x-scroll scrollbar-hide scroll-smooth px-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                          active
                            ? "bg-amber-500 text-navy shadow-lg shadow-amber-500/20"
                            : "text-white/70 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <Icon size={14} />
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>

                {/* Right Fade Gradient */}
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black/95 to-transparent z-10" />
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button className="relative w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/60 hover:bg-amber-500/20 hover:text-amber-500 transition-all">
                  <Bell size={18} />
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-amber-500 rounded-full border-2 border-black" />
                </button>
                <div className="hidden sm:flex items-center gap-3 pl-2 border-l border-white/10">
                  <div className="text-right">
                    <p className="text-xs font-bold text-white">Admin User</p>
                    <p className="text-[10px] font-black uppercase text-amber-500">System Admin</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-navy flex items-center justify-center font-bold text-sm shadow-lg shadow-amber-500/20">
                    SA
                  </div>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="lg:hidden p-2 text-white hover:bg-white/10 rounded-xl transition-colors"
                >
                  <Menu size={24} />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              className="fixed inset-0 z-[100] bg-black lg:hidden"
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-display font-bold text-xl text-white">Admin Menu</h2>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-white">
                    <X size={24} />
                  </button>
                </div>
                <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-4 p-4 rounded-2xl text-sm font-bold transition-all ${
                        location.pathname === item.path
                          ? "bg-amber-500/20 text-amber-500"
                          : "text-white/70 hover:bg-white/10"
                      }`}
                    >
                      <item.icon size={20} />
                      {item.label}
                    </Link>
                  ))}
                </div>
                <Link
                  to="/"
                  className="flex items-center gap-3 p-4 rounded-2xl text-sm font-bold text-white/70 hover:bg-white/10 mt-auto"
                >
                  <LogOut size={20} />
                  Back to Website
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="flex-1 pt-24 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto px-4 space-y-6"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
