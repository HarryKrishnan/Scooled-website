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

  useEffect(() => setMobileMenuOpen(false), [location]);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden selection:bg-primary/20">
      {/* Dark Background Layer */}
      <div className="fixed inset-0 z-0 bg-[#0c0c0c]">
        <div className="absolute left-1/2 -translate-x-1/2 w-48 h-full bg-[#1a1a1a] opacity-50" />
      </div>

      {/* UI Layer */}
      <div className="relative z-10 flex min-h-screen">

        {/* ── LEFT SIDEBAR (desktop) ── */}
        <aside className="hidden lg:flex flex-col fixed top-0 left-0 h-screen w-64 z-50 bg-black/95 border-r border-white/10 backdrop-blur-md">

          {/* Brand */}
          <div className="px-5 py-5 border-b border-white/10">
            <Link to="/" className="flex items-center gap-3 group" title="Back to website">
              <img src={logo} alt="Scooled Logo" className="w-10 h-10 rounded-xl object-contain" />
              <div className="flex flex-col">
                <span className="font-display font-bold text-sm tracking-tight text-white leading-none group-hover:text-amber-500 transition-colors">
                  SCOOLED
                </span>
                <span className="text-[9px] font-black uppercase tracking-[0.15em] text-amber-500 mt-1">
                  ADMIN PANEL
                </span>
              </div>
            </Link>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    active
                      ? "bg-amber-500 text-navy shadow-lg shadow-amber-500/20"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Bottom: Bell + User */}
          <div className="px-3 py-4 border-t border-white/10 space-y-3">
            {/* Notifications */}
            <button className="relative w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-white/70 hover:bg-white/10 hover:text-white transition-all">
              <div className="relative">
                <Bell size={16} />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full border border-black" />
              </div>
              Notifications
            </button>

            {/* Back to Website */}
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              <Home size={16} />
              Back to Website
            </Link>

            {/* User */}
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-navy flex items-center justify-center font-bold text-sm shadow-lg shadow-amber-500/20 shrink-0">
                SA
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-white truncate">Admin User</p>
                <p className="text-[10px] font-black uppercase text-amber-500 truncate">System Admin</p>
              </div>
            </div>
          </div>
        </aside>

        {/* ── MOBILE HAMBURGER ── */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-black/90 border border-white/10 text-white hover:bg-white/10 transition-colors"
        >
          <Menu size={22} />
        </button>

        {/* ── MOBILE MENU OVERLAY ── */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed inset-0 z-[100] bg-black lg:hidden"
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <img src={logo} alt="Scooled Logo" className="w-9 h-9 rounded-xl object-contain" />
                    <div>
                      <p className="font-display font-bold text-sm text-white leading-none">SCOOLED</p>
                      <p className="text-[9px] font-black uppercase tracking-[0.15em] text-amber-500 mt-0.5">ADMIN PANEL</p>
                    </div>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-white hover:text-amber-500 transition-colors">
                    <X size={24} />
                  </button>
                </div>

                <div className="flex-1 flex flex-col gap-1 overflow-y-auto">
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

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 lg:ml-64 min-h-screen py-10 lg:py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6"
          >
            <Outlet />
          </motion.div>
        </main>

      </div>
    </div>
  );
}
