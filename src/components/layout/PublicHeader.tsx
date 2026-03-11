import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo-new.png";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Programs", path: "/programs" },
  { label: "Memberships", path: "/memberships" },
  { label: "Contact", path: "/contact" },
];

export default function PublicHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  const isHome = location.pathname === "/";
  const headerBg = scrolled || !isHome
    ? "bg-card/95 backdrop-blur-lg shadow-lg"
    : "bg-transparent";
  const textColor = scrolled || !isHome ? "text-foreground" : "text-primary-foreground";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}>
      <div className="container-custom flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="Scooled Logo" className="h-12 w-auto object-contain transition-transform group-hover:scale-105" />
          <div className="flex flex-col">
            <span className={`font-display text-lg font-black tracking-tight leading-none ${textColor}`}>
              SCOOLED
            </span>

          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === l.path ? "text-primary" : textColor
                }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link to="/login" className={`text-sm font-medium ${textColor} hover:text-primary transition-colors`}>
            Login
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden p-2 ${textColor}`}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card border-t border-border overflow-hidden"
          >
            <div className="container-custom py-4 flex flex-col gap-3">
              {navLinks.map((l) => (
                <Link
                  key={l.path}
                  to={l.path}
                  className={`py-2 text-sm font-medium ${location.pathname === l.path ? "text-primary" : "text-foreground"
                    }`}
                >
                  {l.label}
                </Link>
              ))}
              <hr className="border-border" />
              <Link to="/login" className="py-2 text-sm font-medium text-foreground">Login</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
