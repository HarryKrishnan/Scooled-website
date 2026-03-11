import { Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Users, Calendar, ClipboardCheck, TrendingUp,
  MessageSquare, Bell, LogOut, Menu, X, Waves
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", path: "/coach", icon: LayoutDashboard },
  { label: "My Trainees", path: "/coach/trainees", icon: Users },
  { label: "Schedule", path: "/coach/schedule", icon: Calendar },
  { label: "Attendance", path: "/coach/attendance", icon: ClipboardCheck },
  { label: "Progress", path: "/coach/progress", icon: TrendingUp },
  { label: "Messages", path: "/coach/messages", icon: MessageSquare },
];

export default function CoachLayout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0f16] text-slate-200 font-sans selection:bg-cyan-500/30">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[#0a0f16]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo area */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                <Waves size={24} className="text-white" />
              </div>
              <div>
                <span className="font-display text-xl font-bold text-white tracking-wide">Scooled</span>
                <span className="text-xs font-semibold tracking-widest text-cyan-400 uppercase block -mt-1">Coach Portal</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              {navItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                      active
                        ? "bg-amber-500 text-slate-900 shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <item.icon size={18} className={active ? "text-slate-900" : "text-slate-500"} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-white/5 hidden sm:block">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
              </button>

              <div className="flex items-center gap-3 pl-4 border-l border-white/10 hidden sm:flex">
                <div className="w-9 h-9 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-cyan-400 font-bold shadow-inner">
                  CR
                </div>
                <Link to="/" className="text-sm font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                  <LogOut size={16} /> Exit
                </Link>
              </div>

              {/* Mobile menu button */}
              <button
                className="lg:hidden p-2 text-slate-400 hover:text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-[#0a0f16]/95 backdrop-blur-3xl pt-24 px-4 pb-6 overflow-y-auto">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl text-base font-medium transition-all ${
                    active
                      ? "bg-amber-500 text-slate-900 shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                      : "text-slate-300 hover:bg-white/5"
                  }`}
                >
                  <item.icon size={20} className={active ? "text-slate-900" : "text-slate-500"} />
                  {item.label}
                </Link>
              );
            })}
            <div className="mt-8 pt-6 border-t border-white/10">
              <Link to="/" className="flex items-center gap-3 px-5 py-3 text-slate-400 hover:text-white">
                <LogOut size={20} /> Back to Website
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}
