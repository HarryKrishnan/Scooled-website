import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight } from "lucide-react";

import heroImg from "@/assets/hero-pool.jpg";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [showPw, setShowPw] = useState(false);

  return (
    <section className="fixed inset-0 z-[100] flex bg-navy overflow-hidden">

      {/* Left Side Hero */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img
          src={heroImg}
          alt="Premium Pool"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-tr from-navy via-navy/40 to-transparent" />

        <div className="relative z-10 w-full flex flex-col justify-end p-10 text-white">

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors mb-10"
          >
            <ArrowRight size={18} className="rotate-180" />
            Back to Website
          </Link>

          <h2 className="font-display text-4xl font-bold mb-4 leading-tight">
            The Ultimate <br />
            <span className="gradient-text">Aquatics Hub</span>
          </h2>

          <p className="text-lg text-primary-foreground/70 max-w-md leading-relaxed">
            Manage your swimming journey with the most advanced platform for athletes and enthusiasts.
          </p>
        </div>
      </div>


      {/* Right Side Login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 relative">

        {/* Mobile Background */}
        <div className="lg:hidden absolute inset-0 z-0">
          <img
            src={heroImg}
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-navy/80" />
        </div>


        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-sm relative z-10"
        >
          <div className="bg-navy-light/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 lg:p-7 shadow-2xl">

            {/* Title */}
            <div className="text-center mb-6">
              <h1 className="font-display text-3xl font-bold text-white mb-2">
                {isRegister ? "Start Your Journey" : "Welcome Back"}
              </h1>

              <p className="text-primary-foreground/50 text-sm">
                {isRegister
                  ? "Join the premier aquatics community"
                  : "Enter your credentials to access your portal"}
              </p>
            </div>


            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Demo: Auth successful!");
              }}
              className="space-y-4"
            >

              {isRegister && (
                <div className="grid grid-cols-1 gap-4">

                  <div className="relative group">
                    <User
                      size={18}
                      className="absolute left-4 top-3 text-primary-foreground/30 group-focus-within:text-primary transition-colors"
                    />

                    <input
                      required
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-white/10 bg-navy/40 text-white text-sm focus:border-primary/50 outline-none transition-all placeholder:text-white/20"
                      placeholder="Full name"
                    />
                  </div>


                  <div className="relative group">
                    <Phone
                      size={18}
                      className="absolute left-4 top-3 text-primary-foreground/30 group-focus-within:text-primary transition-colors"
                    />

                    <input
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-white/10 bg-navy/40 text-white text-sm focus:border-primary/50 outline-none transition-all placeholder:text-white/20"
                      placeholder="Phone number"
                    />
                  </div>

                </div>
              )}


              {/* Email */}
              <div className="relative group">
                <Mail
                  size={18}
                  className="absolute left-4 top-3 text-primary-foreground/30 group-focus-within:text-primary transition-colors"
                />

                <input
                  required
                  type="email"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-white/10 bg-navy/40 text-white text-sm focus:border-primary/50 outline-none transition-all placeholder:text-white/20"
                  placeholder="Email address"
                />
              </div>


              {/* Password */}
              <div className="relative group">
                <Lock
                  size={18}
                  className="absolute left-4 top-3 text-primary-foreground/30 group-focus-within:text-primary transition-colors"
                />

                <input
                  required
                  type={showPw ? "text" : "password"}
                  className="w-full pl-12 pr-12 py-3 rounded-xl border border-white/10 bg-navy/40 text-white text-sm focus:border-primary/50 outline-none transition-all placeholder:text-white/20"
                  placeholder="Password"
                />

                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-3 text-primary-foreground/30 hover:text-white transition-colors"
                >
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>


              {!isRegister && (
                <div className="flex justify-end">
                  <a
                    href="#"
                    className="text-xs text-primary-foreground/40 hover:text-primary transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
              )}


              {/* Button */}
              <button
                type="submit"
                className="btn-primary w-full py-3 text-base font-bold shadow-xl shadow-primary/10"
              >
                {isRegister ? "Create Account" : "Sign In"}
              </button>

            </form>


            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>

              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-navy-light/60 px-4 text-primary-foreground/30 rounded-full">
                  Or continue with
                </span>
              </div>
            </div>


            {/* Toggle Login/Register */}
            <p className="text-center text-sm text-primary-foreground/50">
              {isRegister ? "Already a member?" : "Don't have an account?"}{" "}
              <button
                onClick={() => setIsRegister(!isRegister)}
                className="text-primary font-bold hover:text-primary/80 transition-all"
              >
                {isRegister ? "Sign In" : "Register"}
              </button>
            </p>


            {/* Bottom Links */}
            <div className="mt-6 pt-5 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

              <Link
                to="/portal"
                className="flex items-center justify-center gap-2 py-2 rounded-xl border border-white/5 text-sm font-semibold text-white/50 hover:bg-white/5 hover:text-white transition-all"
              >
                Customer <ArrowRight size={14} />
              </Link>

              <Link
                to="/admin"
                className="flex items-center justify-center gap-2 py-2 rounded-xl border border-white/5 text-sm font-semibold text-white/50 hover:bg-white/5 hover:text-white transition-all"
              >
                Admin <ArrowRight size={14} />
              </Link>

              <Link
                to="/coach"
                className="flex items-center justify-center gap-2 py-2 rounded-xl border border-white/5 text-sm font-semibold text-white/50 hover:bg-white/5 hover:text-white transition-all"
              >
                Coach <ArrowRight size={14} />
              </Link>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}