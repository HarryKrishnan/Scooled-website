import { Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Calendar, GraduationCap, CreditCard as CardIcon, Users,
  UserPlus, Wallet, ClipboardCheck, TrendingUp, MessageSquare, Bell,
  BarChart3, Settings, LogOut, Menu, X, Waves, ChevronDown
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";
import bgImage from "@/assets/portal-dash.jpg";

const primaryNavItems = [
  { label: "Overview", path: "/admin", icon: LayoutDashboard },
  { label: "Customers", path: "/admin/customers", icon: Users },
  { label: "Leads", path: "/admin/leads", icon: UserPlus },
  { label: "Programs", path: "/admin/programs", icon: GraduationCap },
  { label: "Payments", path: "/admin/payments", icon: Wallet },
  { label: "Complaints", path: "/admin/complaints", icon: MessageSquare },
];

const moreNavItems = [
  { label: "Calendar", path: "/admin/calendar", icon: Calendar },
  { label: "Memberships", path: "/admin/memberships", icon: CardIcon },
  { label: "Attendance", path: "/admin/attendance", icon: ClipboardCheck },
  { label: "Progress", path: "/admin/progress", icon: TrendingUp },
  { label: "Notifications", path: "/admin/notifications", icon: Bell },
  { label: "Reports", path: "/admin/reports", icon: BarChart3 },
  { label: "Settings", path: "/admin/settings", icon: Settings },
];

const allNavItems = [...primaryNavItems, ...moreNavItems];

export default function AdminLayout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setMobileMenuOpen(false), [location]);

  const isMoreItemActive = moreNavItems.some(item => item.path === location.pathname);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden selection:bg-primary/20">
      {/* Background Image Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src={bgImage}
          alt=""
          className="w-full h-full object-cover"
        />
        {/* Frost Overlay for Readability */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />
      </div>

      {/* UI Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top Navigation */}
        <header className="sticky top-4 z-50 mx-4">
          <div className="glass-panel rounded-3xl px-4 h-16 flex items-center justify-between border-white/40 bg-white/70 shadow-xl shadow-black/5">
            <div className="flex items-center gap-8">
              <Link to="/admin" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <img src={logo} alt="Scooled" className="w-5 h-5 brightness-0" />
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-sm tracking-tight text-navy">Scooled</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary leading-none">Admin</span>
                </div>
              </Link>

              <nav className="hidden xl:flex items-center gap-1">
                {primaryNavItems.map((item) => {
                  const Icon = item.icon;
                  const active = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        active
                          ? "bg-primary text-white shadow-lg shadow-primary/20"
                          : "text-navy/60 hover:bg-white/50 hover:text-navy"
                      }`}
                    >
                      <Icon size={14} />
                      {item.label}
                    </Link>
                  );
                })}
                
                {/* More Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      isMoreItemActive
                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                        : "text-navy/60 hover:bg-white/50 hover:text-navy"
                    }`}
                  >
                    More
                    <ChevronDown size={14} className={`transition-transform ${moreMenuOpen ? "rotate-180" : ""}`} />
                  </button>
                  
                  <AnimatePresence>
                    {moreMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full mt-2 right-0 w-56 glass-panel rounded-2xl p-2 shadow-xl border-white/40 bg-white/95"
                      >
                        {moreNavItems.map((item) => {
                          const Icon = item.icon;
                          const active = location.pathname === item.path;
                          return (
                            <Link
                              key={item.path}
                              to={item.path}
                              onClick={() => setMoreMenuOpen(false)}
                              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                                active
                                  ? "bg-primary/10 text-primary"
                                  : "text-navy/60 hover:bg-white/50 hover:text-navy"
                              }`}
                            >
                              <Icon size={14} />
                              {item.label}
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center text-navy/60 hover:bg-primary/10 hover:text-primary transition-all">
                <Bell size={18} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-white" />
              </button>
              <div className="hidden sm:flex items-center gap-3 pl-2 border-l border-navy/5">
                <div className="text-right">
                  <p className="text-xs font-bold text-navy">Admin User</p>
                  <p className="text-[10px] font-black uppercase text-primary">System Admin</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-primary/20">
                  SA
                </div>
              </div>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="xl:hidden p-2 text-navy hover:bg-navy/5 rounded-xl transition-colors"
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
              className="fixed inset-0 z-[100] bg-white xl:hidden"
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-display font-bold text-xl text-navy">Admin Menu</h2>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-navy">
                    <X size={24} />
                  </button>
                </div>
                <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
                  {allNavItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-4 p-4 rounded-2xl text-sm font-bold transition-all ${
                        location.pathname === item.path
                          ? "bg-primary/10 text-primary"
                          : "text-navy/60 hover:bg-navy/5"
                      }`}
                    >
                      <item.icon size={20} />
                      {item.label}
                    </Link>
                  ))}
                </div>
                <Link
                  to="/"
                  className="flex items-center gap-3 p-4 rounded-2xl text-sm font-bold text-navy/60 hover:bg-navy/5 mt-auto"
                >
                  <LogOut size={20} />
                  Back to Website
                </Link>
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
