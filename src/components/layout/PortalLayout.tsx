import { Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, User, CalendarPlus, CalendarCheck, GraduationCap,
  CreditCard, Wallet, TrendingUp, MessageSquare, Bell, LogOut, Menu, X, Waves, ChevronDown, ShieldCheck
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

  const memberStatus = localStorage.getItem('scooled_member_status');
  const isTrial = memberStatus !== 'active';

  const isProfilePage = location.pathname === `${basePath}/profile`;
  const isDashboardPage = location.pathname === basePath || location.pathname === `${basePath}/`;
  const isRestricted = isTrial && !isProfilePage && !isDashboardPage;

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

  useEffect(() => {
    if (isRestricted) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isRestricted]);

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
                  const itemRestricted = isTrial && item.path !== basePath;
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold transition-all ${active
                        ? "bg-[#ffb800] text-black shadow-lg shadow-amber-500/20"
                        : "text-white/60 hover:text-white"
                        } ${itemRestricted ? "relative pr-10" : ""}`}
                    >
                      {active && <Icon size={14} />}
                      {item.label}
                      {itemRestricted && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40">
                          <ShieldCheck size={12} className="text-[#ffb800]" />
                        </div>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="flex items-center gap-3">
              {/* Sport Switcher Dropdown */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setShowSportMenu(!showSportMenu)}
                  className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#111111] border border-white/5 text-xs font-bold text-white hover:bg-black transition-all"
                >
                  <span className="text-white/40">Sport:</span> {activeSportName}
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
                className={`relative w-11 h-11 rounded-2xl flex items-center justify-center transition-all bg-[#111111] border border-white/5 text-white/40 hover:text-white hover:bg-black`}
              >
                <Bell size={18} />
                <span className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-[#ffb800]" />
              </Link>
              
              <div className="relative ml-2">
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-4 pl-4 hover:bg-white/5 rounded-2xl transition-all"
                >
                  <div className="text-right hidden sm:block">
                    <p className="text-xs font-bold text-white leading-tight">Aarav Patel</p>
                    <p className="text-[9px] font-black uppercase text-[#ffb800] tracking-wider">
                      {localStorage.getItem('scooled_member_status') === 'active' ? 'Pro Member' : 'Member'}
                    </p>
                  </div>
                  <div className="w-11 h-11 rounded-2xl bg-[#ffb800] text-black flex items-center justify-center font-black text-sm shadow-xl shadow-amber-500/20">
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
                            const itemRestricted = isTrial && item.path !== `${basePath}/profile`;

                            return (
                              <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setShowProfileMenu(false)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${active
                                  ? "bg-white/10 text-white"
                                  : "text-white/60 hover:bg-white/5 hover:text-white"
                                  } ${itemRestricted ? "opacity-50" : ""}`}
                              >
                                <Icon size={16} />
                                <span className="flex-1">{item.label}</span>
                                {itemRestricted && <ShieldCheck size={14} className="text-amber-500 opacity-60" />}
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
                  {primaryNavItems.map((item) => {
                    const itemRestricted = isTrial && item.path !== basePath;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-4 p-4 rounded-2xl text-sm font-bold transition-all ${location.pathname === item.path
                          ? "bg-amber-500/10 text-amber-600"
                          : "text-navy/60 hover:bg-navy/5"
                          } ${itemRestricted ? "opacity-50" : ""}`}
                      >
                        <item.icon size={20} />
                        <span className="flex-1">{item.label}</span>
                        {itemRestricted && <ShieldCheck size={18} className="text-amber-500 opacity-60" />}
                      </Link>
                    );
                  })}
                  
                  <div className="h-px bg-navy/10 my-2 mx-4" />
                  
                  {profileNavItems.map((item) => {
                    const itemRestricted = isTrial && item.path !== `${basePath}/profile`;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-4 p-4 rounded-2xl text-sm font-bold transition-all ${location.pathname === item.path
                          ? "bg-amber-500/10 text-amber-600"
                          : "text-navy/60 hover:bg-navy/5"
                          } ${itemRestricted ? "opacity-50" : ""}`}
                      >
                        <item.icon size={20} />
                        <span className="flex-1">{item.label}</span>
                        {itemRestricted && <ShieldCheck size={18} className="text-amber-500 opacity-60" />}
                      </Link>
                    );
                  })}
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
          <div className="container-custom relative h-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                filter: isRestricted ? "blur(12px)" : "blur(0px)" 
              }}
              transition={{ duration: 0.4 }}
              className={`h-full ${isRestricted ? "pointer-events-none select-none" : ""}`}
            >
              <Outlet />
            </motion.div>

            <AnimatePresence>
              {isRestricted && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
                >
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="w-full max-w-md bg-[#111111]/80 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-10 lg:p-14 text-center shadow-2xl overflow-hidden relative group"
                  >
                    {/* Background glow */}
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full group-hover:bg-amber-500/20 transition-all duration-700" />
                    
                    <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-10 relative z-10 shadow-inner">
                      <ShieldCheck className="w-10 h-10 text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
                    </div>
                    
                    <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-tight italic relative z-10">Locked Feature</h2>
                    <p className="text-white/50 text-base mb-12 leading-relaxed relative z-10 font-medium">
                      This part of the portal is reserved for <span className="text-amber-500 font-bold">Pro Members</span>. Upgrade your plan to unlock full access to all features.
                    </p>

                    <button
                      onClick={() => {
                        localStorage.setItem('scooled_force_upgrade', 'true');
                        window.location.reload();
                      }}
                      className="w-full bg-[#ffb800] hover:bg-[#e6a600] text-black font-black py-6 rounded-[1.5rem] flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-95 shadow-2xl shadow-amber-500/30 uppercase text-xs tracking-[0.2em] relative z-10"
                    >
                      Upgrade Plan
                      <TrendingUp size={18} />
                    </button>
                    
                    <Link 
                      to={basePath}
                      className="mt-8 inline-block text-[10px] font-black uppercase tracking-[0.2em] text-white/20 hover:text-white/60 transition-colors relative z-10"
                    >
                      Return to Dashboard
                    </Link>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
