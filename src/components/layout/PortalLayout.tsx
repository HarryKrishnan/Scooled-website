import { Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, User, CalendarPlus, CalendarCheck, GraduationCap,
  CreditCard, Wallet, TrendingUp, MessageSquare, Bell, LogOut, Menu, X, Waves
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo-new.png";
import bgImage from "@/assets/portal-dash.jpg";

const navItems = [
  { label: "Dashboard", path: "/portal", icon: LayoutDashboard },
  { label: "Profile", path: "/portal/profile", icon: User },
  { label: "Book", path: "/portal/book", icon: CalendarPlus },
  { label: "Bookings", path: "/portal/bookings", icon: CalendarCheck },
  { label: "Programs", path: "/portal/programs", icon: GraduationCap },
  { label: "Memberships", path: "/portal/memberships", icon: CreditCard },
  { label: "Payments", path: "/portal/payments", icon: Wallet },
  { label: "Progress", path: "/portal/progress", icon: TrendingUp },
  { label: "Feedback", path: "/portal/feedback", icon: MessageSquare },
];

export default function PortalLayout() {
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
      {/* 1. THE DARK BACKGROUND (Base Layer) */}
      <div className="fixed inset-0 z-0 bg-[#0c0c0c]">
        {/* The Vertical Grey Line/Stripe */}
        <div className="absolute left-1/2 -translate-x-1/2 w-48 h-full bg-[#1a1a1a] opacity-50" />
      </div>

      {/* 2. THE UI LAYER (Above the image) */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top Navigation */}
        <header className="fixed top-0 left-0 right-0 z-50">
          <div className="mx-4 mt-4 glass-panel rounded-3xl px-4 h-16 flex items-center justify-between border-white/10 bg-black/95 shadow-xl shadow-black/20 backdrop-blur-md">
            <div className="flex items-center gap-8">
              <Link to="/portal" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 transition-all shadow-sm overflow-hidden p-1">
                  <img src={logo} alt="Scooled" className="w-full h-full object-contain brightness-0 invert" />
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-sm tracking-tight text-white leading-none">SCOOLED</span>
                  <span className="text-[9px] font-black uppercase tracking-[0.15em] text-primary mt-1">Aquatics Hub</span>
                </div>
              </Link>

              <nav className="hidden lg:flex items-center gap-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${active
                          ? "bg-amber-500 text-navy shadow-lg shadow-amber-500/20"
                          : "text-white/60 hover:bg-white/10 hover:text-white"
                        }`}
                    >
                      <Icon size={14} />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/60 hover:bg-amber-500/20 hover:text-amber-500 transition-all">
                <Bell size={18} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-amber-500 rounded-full border-2 border-black" />
              </button>
              <div className="hidden sm:flex items-center gap-3 pl-2 border-l border-white/10">
                <div className="text-right">
                  <p className="text-xs font-bold text-white">Aarav Patel</p>
                  <p className="text-[10px] font-black uppercase text-amber-500">Pro Member</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-navy flex items-center justify-center font-bold text-sm shadow-lg shadow-amber-500/20">
                  A
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
        </header>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              className="fixed inset-0 z-[100] bg-white lg:hidden"
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-display font-bold text-xl text-navy">Menu</h2>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-navy">
                    <X size={24} />
                  </button>
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-4 p-4 rounded-2xl text-sm font-bold transition-all ${location.pathname === item.path
                          ? "bg-amber-500/10 text-amber-600"
                          : "text-navy/60 hover:bg-navy/5"
                        }`}
                    >
                      <item.icon size={20} />
                      {item.label}
                    </Link>
                  ))}
                </div>
                <button className="flex items-center gap-3 p-4 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 mt-auto">
                  <LogOut size={20} />
                  Sign Out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="flex-1 pt-24 pb-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="container-custom"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
