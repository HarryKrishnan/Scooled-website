import { Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, User, CalendarPlus, CalendarCheck, GraduationCap,
  CreditCard, Wallet, TrendingUp, MessageSquare, Bell, LogOut, Menu, X, Waves
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";
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
      {/* 1. THE FRONT FACING IMAGE (Base Layer) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src={bgImage}
          alt=""
          className="w-full h-full object-cover"
        />
        {/* Subtle Frost for Readability */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />
      </div>

      {/* 2. THE UI LAYER (Above the image) */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top Navigation */}
        <header className="sticky top-4 z-50 mx-4">
          <div className="glass-panel rounded-3xl px-4 h-16 flex items-center justify-between border-white/40 bg-white/70 shadow-xl shadow-black/5">
            <div className="flex items-center gap-8">
              <Link to="/portal" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <img src={logo} alt="Scooled" className="w-5 h-5 brightness-0" />
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-sm tracking-tight text-navy">Scooled</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary leading-none">Portal</span>
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
                          ? "bg-primary text-white shadow-lg shadow-primary/20"
                          : "text-navy/60 hover:bg-white/50 hover:text-navy"
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
              <button className="relative w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center text-navy/60 hover:bg-primary/10 hover:text-primary transition-all">
                <Bell size={18} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-white" />
              </button>
              <div className="hidden sm:flex items-center gap-3 pl-2 border-l border-navy/5">
                <div className="text-right">
                  <p className="text-xs font-bold text-navy">Aarav Patel</p>
                  <p className="text-[10px] font-black uppercase text-primary">Pro Member</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-primary/20">
                  A
                </div>
              </div>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 text-navy hover:bg-navy/5 rounded-xl transition-colors"
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
                          ? "bg-primary/10 text-primary"
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

        <main className="flex-1 pt-12 pb-12">
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
