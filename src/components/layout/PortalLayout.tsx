import { Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, User, CalendarPlus, CalendarCheck, GraduationCap,
  CreditCard, Wallet, TrendingUp, MessageSquare, Bell, LogOut, Menu, X, Waves, ChevronDown
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo-new.png";
import bgImage from "@/assets/portal-dash.jpg";

const getPrimaryNavItems = (basePath: string) => [
  { label: "Dashboard", path: `${basePath}`, icon: LayoutDashboard },
  { label: "Book", path: `${basePath}/book`, icon: CalendarPlus },
  { label: "Bookings", path: `${basePath}/bookings`, icon: CalendarCheck },
  { label: "Programs", path: `${basePath}/programs`, icon: GraduationCap },
];

const getProfileNavItems = (basePath: string) => [
  { label: "Profile", path: `${basePath}/profile`, icon: User },
  { label: "Stats", path: `${basePath}/progress`, icon: TrendingUp },
  { label: "Memberships", path: `${basePath}/memberships`, icon: CreditCard },
  { label: "Payments", path: `${basePath}/payments`, icon: Wallet },
  { label: "Feedback", path: `${basePath}/feedback`, icon: MessageSquare },
];

export default function PortalLayout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSportMenu, setShowSportMenu] = useState(false);

  // Determine active sport for links
  let basePath = "/portal/swimming";
  let activeSportName = "Swimming";
  if (location.pathname.includes("/portal/futsal")) { basePath = "/portal/futsal"; activeSportName = "Futsal"; }
  else if (location.pathname.includes("/portal/pickleball")) { basePath = "/portal/pickleball"; activeSportName = "Pickleball"; }
  else if (location.pathname.includes("/portal/table-tennis")) { basePath = "/portal/table-tennis"; activeSportName = "Table Tennis"; }

  const primaryNavItems = getPrimaryNavItems(basePath);
  const profileNavItems = getProfileNavItems(basePath);

  const sports = [
    { name: "Swimming", path: "/portal/swimming" },
    { name: "Futsal", path: "/portal/futsal" },
    { name: "Pickleball", path: "/portal/pickleball" },
    { name: "Table Tennis", path: "/portal/table-tennis" }
  ];

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
              <Link to="/" className="flex items-center gap-2.5 group" title="Back to website">
                <img
                  src={logo}
                  alt="Scooled"
                  className="w-9 h-9 object-contain"
                />
                <div className="flex flex-col">
                  <span className="font-display font-bold text-sm tracking-tight text-white leading-none group-hover:text-primary transition-colors">SCOOLED</span>
                  <span className="text-[9px] font-black uppercase tracking-[0.15em] text-primary mt-1"></span>
                </div>
              </Link>

              <nav className="hidden lg:flex items-center gap-1">
                {primaryNavItems.map((item) => {
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

            <div className="flex items-center gap-2">
              {/* Sport Switcher Dropdown */}
              <div className="relative hidden sm:block mr-2">
                <button
                  onClick={() => setShowSportMenu(!showSportMenu)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 text-sm font-bold text-white hover:bg-white/10 transition-all"
                >
                  <span className="text-white/60">Sport:</span> {activeSportName}
                  <ChevronDown size={14} className="text-white/40" />
                </button>

                <AnimatePresence>
                  {showSportMenu && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setShowSportMenu(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-2 w-48 bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 backdrop-blur-xl"
                      >
                        <div className="p-2 flex flex-col gap-1">
                          {sports.map((sport) => (
                            <Link
                              key={sport.path}
                              to={sport.path}
                              onClick={() => setShowSportMenu(false)}
                              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                                activeSportName === sport.name
                                  ? "bg-amber-500/10 text-amber-500"
                                  : "text-white/60 hover:bg-white/5 hover:text-white"
                              }`}
                            >
                              {sport.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              <Link 
                to={`${basePath}/notifications`}
                className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                   location.pathname === `${basePath}/notifications`
                    ? "bg-amber-500 text-navy shadow-lg shadow-amber-500/20"
                    : "bg-white/10 text-white/60 hover:bg-amber-500/20 hover:text-amber-500"
                }`}
              >
                <Bell size={18} />
                <span className={`absolute top-2.5 right-2.5 w-2 h-2 rounded-full border-2 border-black ${
                  location.pathname === `${basePath}/notifications` ? "bg-navy" : "bg-amber-500"
                }`} />
              </Link>
              <div className="relative">
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="hidden sm:flex items-center gap-3 px-3 border-l border-white/10 ml-1 hover:bg-white/5 rounded-xl transition-all p-1"
                >
                  <div className="text-right">
                    <p className="text-xs font-bold text-white">Aarav Patel</p>
                    <p className="text-[10px] font-black uppercase text-amber-500">Pro Member</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-navy flex items-center justify-center font-bold text-sm shadow-lg shadow-amber-500/20">
                    A
                  </div>
                </button>

                {/* Profile Dropdown */}
                <AnimatePresence>
                  {showProfileMenu && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-2 w-56 bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 backdrop-blur-xl"
                      >
                        <div className="p-2 flex flex-col gap-1">
                          {profileNavItems.map((item) => {
                            const Icon = item.icon;
                            const active = location.pathname === item.path;
                            return (
                              <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setShowProfileMenu(false)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${active
                                  ? "bg-white/10 text-white"
                                  : "text-white/60 hover:bg-white/5 hover:text-white"
                                  }`}
                              >
                                <Icon size={16} />
                                {item.label}
                              </Link>
                            );
                          })}
                          <div className="h-px bg-white/10 my-1 mx-2" />
                          <Link
                            to="/login"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-500/80 hover:bg-red-500/10 hover:text-red-500 transition-all"
                          >
                            <LogOut size={16} />
                            Sign Out
                          </Link>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
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
                <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
                  {primaryNavItems.map((item) => (
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
                  
                  <div className="h-px bg-navy/10 my-2 mx-4" />
                  
                  {profileNavItems.map((item) => (
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
                <Link to="/login" className="flex items-center gap-3 p-4 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 mt-4">
                  <LogOut size={20} />
                  Sign Out
                </Link>
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
