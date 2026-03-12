import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Calendar, Award, Building2, CalendarCheck, Shield, CreditCard,
  TrendingUp, Bell, Globe, ChevronRight, Star, CheckCircle2,
  MapPin, Wallet, Clock, ArrowRight, Zap, ArrowUpRight
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import WaveDivider from "@/components/ui/WaveDivider";
import { faqs } from "@/data/mockData";
import heroSwimming from "@/assets/hero-swimming.png";
import heroFutsal from "@/assets/hero-futsal.png";
import heroPickleball from "@/assets/hero-pickleball.png";
import heroTableTennis from "@/assets/hero-table-tennis.png";
import programKids from "@/assets/program-kids.png";
import programAdult from "@/assets/program-adult.png";
import programCompetitive from "@/assets/program-competitive.png";
import programWeekend from "@/assets/program-weekend.png";
// Futsal
import progFutsalKids from "@/assets/prog-futsal-kids.png";
import progFutsalAdult from "@/assets/prog-futsal-adult.png";
import progFutsalCompetitive from "@/assets/prog-futsal-competitive.png";
import progFutsalWeekend from "@/assets/prog-futsal-weekend.png";
// Pickleball
import progPickleballKids from "@/assets/prog-pickleball-kids.png";
import progPickleballAdult from "@/assets/prog-pickleball-adult.png";
import progPickleballCompetitive from "@/assets/prog-pickleball-competitive.png";
import progPickleballWeekend from "@/assets/prog-pickleball-weekend.png";
// Table Tennis
import progTTKids from "@/assets/prog-tt-kids.png";
import progTTAdult from "@/assets/prog-tt-adult.png";
import progTTCompetitive from "@/assets/prog-tt-competitive.png";
import progTTWeekend from "@/assets/prog-tt-weekend.png";
import { useState, useEffect, useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const stats = [
  { icon: Users, value: "2,500+", label: "Active Members" },
  { icon: Calendar, value: "120+", label: "Daily Slots" },
  { icon: Award, value: "15+", label: "Certified Coaches" },
  { icon: Building2, value: "4", label: "Centres" },
];

const whyItems = [
  { icon: CalendarCheck, title: "Seamless Self-Service Booking", desc: "Book swimming slots instantly with real-time availability and smart scheduling." },
  { icon: Globe, title: "Unified Operations Platform", desc: "One platform for bookings, coaching, payments, and member management." },
  { icon: CreditCard, title: "Secure Payments", desc: "Multiple payment options with bank-grade security and instant confirmation." },
  { icon: TrendingUp, title: "Progress Tracking", desc: "Track swimming progress with detailed reports and performance analytics." },
  { icon: Bell, title: "Smart Notifications", desc: "Automated reminders for sessions, renewals, and important updates." },
  { icon: Shield, title: "Scalable Multi-Centre", desc: "Built to scale across multiple centres with centralized management." },
];

const bookingSteps = [
  { icon: MapPin, title: "Select Centre", desc: "Choose your preferred swimming centre" },
  { icon: Calendar, title: "Choose Slot", desc: "Pick from available time slots" },
  { icon: Wallet, title: "Pay Securely", desc: "Complete payment with your preferred method" },
  { icon: CheckCircle2, title: "Get Confirmation", desc: "Receive instant booking confirmation" },
];



const heroImages = [heroSwimming, heroFutsal, heroPickleball, heroTableTennis];
const heroSports = ["Swimming", "Futsal", "Pickleball", "Table Tennis"];
const HERO_WORDS = ["Excellence", "Innovation", "Achievement", "Community"];

type SportProgram = {
  title: string;
  level: string;
  ageGroup: string;
  schedule: string;
  price: number;
  image: string;
  badge: string;
  badgeColor: string;
  accentColor: string;
};

const allSportPrograms: Record<string, SportProgram[]> = {
  Swimming: [
    {
      title: "Kids Learn to Swim",
      level: "Beginner",
      ageGroup: "4–8 years",
      schedule: "Mon, Wed, Fri",
      price: 3500,
      image: programKids,
      badge: "🏊 Most Popular",
      badgeColor: "bg-emerald-500",
      accentColor: "from-emerald-600/80",
    },
    {
      title: "Adult Fitness Swimming",
      level: "All Levels",
      ageGroup: "18+ years",
      schedule: "Tue, Thu, Sat",
      price: 4500,
      image: programAdult,
      badge: "🔥 Trending",
      badgeColor: "bg-orange-500",
      accentColor: "from-blue-600/80",
    },
    {
      title: "Competitive Coaching",
      level: "Advanced",
      ageGroup: "10–18 years",
      schedule: "Mon–Sat",
      price: 8000,
      image: programCompetitive,
      badge: "🏆 Elite",
      badgeColor: "bg-amber-500",
      accentColor: "from-purple-700/80",
    },
    {
      title: "Weekend Family Training",
      level: "Intermediate",
      ageGroup: "All Ages",
      schedule: "Sat, Sun",
      price: 3000,
      image: programWeekend,
      badge: "👨‍👩‍👧 Family",
      badgeColor: "bg-primary",
      accentColor: "from-cyan-700/80",
    },
  ],
  Futsal: [
    {
      title: "Kids Futsal Fundamentals",
      level: "Beginner",
      ageGroup: "5–10 years",
      schedule: "Mon, Wed, Fri",
      price: 3000,
      image: progFutsalKids,
      badge: "⚽ Most Popular",
      badgeColor: "bg-emerald-500",
      accentColor: "from-emerald-600/80",
    },
    {
      title: "Adult Futsal Fitness",
      level: "All Levels",
      ageGroup: "18+ years",
      schedule: "Tue, Thu, Sat",
      price: 4000,
      image: progFutsalAdult,
      badge: "🔥 Trending",
      badgeColor: "bg-orange-500",
      accentColor: "from-orange-700/80",
    },
    {
      title: "Competitive Futsal Training",
      level: "Advanced",
      ageGroup: "12–20 years",
      schedule: "Mon–Sat",
      price: 7000,
      image: progFutsalCompetitive,
      badge: "🏆 Elite",
      badgeColor: "bg-amber-500",
      accentColor: "from-yellow-700/80",
    },
    {
      title: "Weekend Futsal League",
      level: "Intermediate",
      ageGroup: "All Ages",
      schedule: "Sat, Sun",
      price: 2500,
      image: progFutsalWeekend,
      badge: "🎉 Social League",
      badgeColor: "bg-primary",
      accentColor: "from-green-700/80",
    },
  ],
  Pickleball: [
    {
      title: "Kids Pickleball Starter",
      level: "Beginner",
      ageGroup: "6–12 years",
      schedule: "Mon, Wed, Fri",
      price: 2800,
      image: progPickleballKids,
      badge: "🏓 Most Popular",
      badgeColor: "bg-emerald-500",
      accentColor: "from-lime-600/80",
    },
    {
      title: "Adult Fitness Pickleball",
      level: "All Levels",
      ageGroup: "18+ years",
      schedule: "Tue, Thu, Sat",
      price: 3500,
      image: progPickleballAdult,
      badge: "🔥 Trending",
      badgeColor: "bg-orange-500",
      accentColor: "from-teal-600/80",
    },
    {
      title: "Competitive Pickleball",
      level: "Advanced",
      ageGroup: "14–35 years",
      schedule: "Mon–Sat",
      price: 6500,
      image: progPickleballCompetitive,
      badge: "🏆 Elite",
      badgeColor: "bg-amber-500",
      accentColor: "from-indigo-700/80",
    },
    {
      title: "Weekend Doubles Clinic",
      level: "Intermediate",
      ageGroup: "All Ages",
      schedule: "Sat, Sun",
      price: 2500,
      image: progPickleballWeekend,
      badge: "👫 Doubles",
      badgeColor: "bg-primary",
      accentColor: "from-sky-700/80",
    },
  ],
  "Table Tennis": [
    {
      title: "Kids TT Starter",
      level: "Beginner",
      ageGroup: "5–12 years",
      schedule: "Mon, Wed, Fri",
      price: 2500,
      image: progTTKids,
      badge: "🏓 Most Popular",
      badgeColor: "bg-emerald-500",
      accentColor: "from-emerald-600/80",
    },
    {
      title: "Adult Table Tennis Fitness",
      level: "All Levels",
      ageGroup: "18+ years",
      schedule: "Tue, Thu, Sat",
      price: 3000,
      image: progTTAdult,
      badge: "🔥 Trending",
      badgeColor: "bg-orange-500",
      accentColor: "from-red-700/80",
    },
    {
      title: "Competitive TT Coaching",
      level: "Advanced",
      ageGroup: "10–25 years",
      schedule: "Mon–Sat",
      price: 6000,
      image: progTTCompetitive,
      badge: "🏆 Elite",
      badgeColor: "bg-amber-500",
      accentColor: "from-purple-700/80",
    },
    {
      title: "Weekend TT Social League",
      level: "Intermediate",
      ageGroup: "All Ages",
      schedule: "Sat, Sun",
      price: 2000,
      image: progTTWeekend,
      badge: "🎉 Social",
      badgeColor: "bg-primary",
      accentColor: "from-pink-700/80",
    },
  ],
};

const sportTabs = [
  { key: "Swimming", label: "Swimming", emoji: "🏊" },
  { key: "Futsal", label: "Futsal", emoji: "⚽" },
  { key: "Pickleball", label: "Pickleball", emoji: "🏓" },
  { key: "Table Tennis", label: "Table Tennis", emoji: "🏓" },
];

const allSportMemberships: Record<string, { id: string; name: string; duration: string; price: number; features: string[]; popular: boolean }[]> = {
  Swimming: [
    { id: "sm1", name: "Monthly", duration: "1 Month", price: 2999, features: ["Unlimited pool access", "Locker facility", "1 Guest pass", "Basic progress report"], popular: false },
    { id: "sm2", name: "Quarterly", duration: "3 Months", price: 7999, features: ["Unlimited pool access", "Locker facility", "3 Guest passes", "Detailed progress reports", "10% coaching discount"], popular: true },
    { id: "sm3", name: "Half-Yearly", duration: "6 Months", price: 13999, features: ["Unlimited pool access", "Premium locker", "6 Guest passes", "Detailed progress reports", "15% coaching discount", "Free towel service"], popular: false },
    { id: "sm4", name: "Annual", duration: "12 Months", price: 24999, features: ["Unlimited pool access", "Premium locker", "12 Guest passes", "All progress reports", "20% coaching discount", "Free towel service", "Priority slot booking"], popular: false },
  ],
  Futsal: [
    { id: "fm1", name: "Monthly", duration: "1 Month", price: 2499, features: ["Unlimited court access", "Locker facility", "1 Guest pass", "Basic stats report"], popular: false },
    { id: "fm2", name: "Quarterly", duration: "3 Months", price: 6499, features: ["Unlimited court access", "Locker facility", "3 Guest passes", "Performance reports", "10% coaching discount"], popular: true },
    { id: "fm3", name: "Half-Yearly", duration: "6 Months", price: 11999, features: ["Unlimited court access", "Premium locker", "6 Guest passes", "Performance reports", "15% coaching discount", "Free jersey"], popular: false },
    { id: "fm4", name: "Annual", duration: "12 Months", price: 21999, features: ["Unlimited court access", "Premium locker", "12 Guest passes", "All performance reports", "20% coaching discount", "Free jersey", "Priority booking"], popular: false },
  ],
  Pickleball: [
    { id: "pm1", name: "Monthly", duration: "1 Month", price: 1999, features: ["Unlimited court access", "Paddle rental", "1 Guest pass", "Basic stats report"], popular: false },
    { id: "pm2", name: "Quarterly", duration: "3 Months", price: 5499, features: ["Unlimited court access", "Paddle rental", "3 Guest passes", "Performance reports", "10% coaching discount"], popular: true },
    { id: "pm3", name: "Half-Yearly", duration: "6 Months", price: 9999, features: ["Unlimited court access", "Own paddle storage", "6 Guest passes", "Performance reports", "15% coaching discount", "Free grip tape"], popular: false },
    { id: "pm4", name: "Annual", duration: "12 Months", price: 17999, features: ["Unlimited court access", "Own paddle storage", "12 Guest passes", "All performance reports", "20% coaching discount", "Free grip tape", "Priority booking"], popular: false },
  ],
  "Table Tennis": [
    { id: "tm1", name: "Monthly", duration: "1 Month", price: 1499, features: ["Unlimited table access", "Paddle rental", "1 Guest pass", "Basic stats report"], popular: false },
    { id: "tm2", name: "Quarterly", duration: "3 Months", price: 3999, features: ["Unlimited table access", "Paddle rental", "3 Guest passes", "Performance reports", "10% coaching discount"], popular: true },
    { id: "tm3", name: "Half-Yearly", duration: "6 Months", price: 7499, features: ["Unlimited table access", "Own paddle rack", "6 Guest passes", "Performance reports", "15% coaching discount", "Free rubber sheet"], popular: false },
    { id: "tm4", name: "Annual", duration: "12 Months", price: 13499, features: ["Unlimited table access", "Own paddle rack", "12 Guest passes", "All performance reports", "20% coaching discount", "Free rubber sheet", "Priority booking"], popular: false },
  ],
};

const memberSportTabs = [
  { key: "Swimming", label: "Swimming", emoji: "🏊" },
  { key: "Futsal", label: "Futsal", emoji: "⚽" },
  { key: "Pickleball", label: "Pickleball", emoji: "🏓" },
  { key: "Table Tennis", label: "Table Tennis", emoji: "🏓" },
];

const multiSportTestimonials = [
  // Swimming
  { name: "Priya Sharma", initials: "PS", role: "Swimming · Parent", sport: "🏊 Swimming", accent: "from-cyan-600/30 to-blue-500/10", text: "Our kids have transformed completely. The coaches are incredibly patient and the pool facilities are world-class!" },
  { name: "Rahul Verma", initials: "RV", role: "Swimming · Competitive", sport: "🏊 Swimming", accent: "from-blue-700/30 to-cyan-400/10", text: "I cut 8 seconds off my 100m freestyle in just 3 months. The data-driven tracking is unlike anything I've experienced." },
  { name: "Anita Krishnan", initials: "AK", role: "Swimming · Adult Fitness", sport: "🏊 Swimming", accent: "from-teal-600/30 to-emerald-400/10", text: "Started as a complete beginner at 38. Within 6 months I'm swimming 2km daily. The booking app makes everything effortless." },
  // Futsal
  { name: "Kiran Mehta", initials: "KM", role: "Futsal · Weekend League", sport: "⚽ Futsal", accent: "from-emerald-600/30 to-green-400/10", text: "The weekend futsal league is the highlight of my week. Great facilities, excellent coaching and a brilliant community!" },
  { name: "Siddharth Rao", initials: "SR", role: "Futsal · Competitive", sport: "⚽ Futsal", accent: "from-lime-600/30 to-yellow-400/10", text: "Competitive futsal training at Scooled is top-notch. Our team went from district level to state finals in one season." },
  { name: "Deepa Nair", initials: "DN", role: "Futsal · Adult Fitness", sport: "⚽ Futsal", accent: "from-green-700/30 to-emerald-300/10", text: "Never thought I'd love indoor football this much. The coaches push you just right and the energy in every session is electric." },
  // Pickleball
  { name: "Arjun Pillai", initials: "AP", role: "Pickleball · Doubles Clinic", sport: "🏓 Pickleball", accent: "from-violet-600/30 to-purple-400/10", text: "The doubles clinic completely transformed my game. The court quality is superb and coaches break down strategy brilliantly." },
  { name: "Meera Joshi", initials: "MJ", role: "Pickleball · Adult Fitness", sport: "🏓 Pickleball", accent: "from-indigo-600/30 to-blue-400/10", text: "Pickleball at Scooled is addictive! Perfect pace for beginners. I went from not knowing the rules to winning club matches." },
  { name: "Rajan Thomas", initials: "RT", role: "Pickleball · Competitive", sport: "🏓 Pickleball", accent: "from-purple-700/30 to-violet-300/10", text: "The competitive pickleball program is structured brilliantly. I can track every improvement session-by-session through the app." },
  // Table Tennis
  { name: "Sneha Iyer", initials: "SI", role: "Table Tennis · Social League", sport: "🏓 Table Tennis", accent: "from-rose-600/30 to-pink-400/10", text: "The TT social league is so fun and friendly. I've made so many friends and my backhand has improved dramatically!" },
  { name: "Vikram Bose", initials: "VB", role: "Table Tennis · Competitive", sport: "🏓 Table Tennis", accent: "from-red-600/30 to-orange-400/10", text: "Elite coaching at Scooled helped me qualify for the state juniors. The attention to technique and spin is exceptional." },
  { name: "Lavanya Reddy", initials: "LR", role: "Table Tennis · Kids Starter", sport: "🏓 Table Tennis", accent: "from-pink-600/30 to-rose-300/10", text: "My 9-year-old daughter is obsessed with table tennis now! Patient coaches and a programme designed perfectly for young players." },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeSport, setActiveSport] = useState("Swimming");
  const [activeMemberSport, setActiveMemberSport] = useState("Swimming");

  // Hero slideshow
  const [heroIndex, setHeroIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setHeroIndex(i => (i + 1) % heroImages.length), 4000);
    return () => clearInterval(t);
  }, []);

  // Typing animation
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const word = HERO_WORDS[wordIndex];
    if (!deleting && displayed.length < word.length) {
      typingRef.current = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === word.length) {
      typingRef.current = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      typingRef.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIndex(i => (i + 1) % HERO_WORDS.length);
    }
    return () => { if (typingRef.current) clearTimeout(typingRef.current); };
  }, [displayed, deleting, wordIndex]);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <AnimatePresence mode="sync">
            <motion.img
              key={heroIndex}
              src={heroImages[heroIndex]}
              alt="Premium swimming pool"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-navy/30" />
        </div>
        {/* Slide indicators with sport labels */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-3 z-20 items-center">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setHeroIndex(idx)}
              title={heroSports[idx]}
              className={`h-1.5 rounded-full transition-all duration-500 ${idx === heroIndex ? "w-8 bg-primary" : "w-2 bg-white/30"
                }`}
            />
          ))}
        </div>
        <div className="container-custom relative z-10 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm text-primary-foreground text-sm font-medium mb-6">
              <Star size={14} className="text-gold" /> Premium Multi-Sport Platform
            </span>
            {/* Sport label for current slide */}

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-[1.1] mb-6">
              Play Into <br />
              <span className="gradient-text">{displayed}<span className="animate-pulse">|</span></span>
            </h1>
            <p className="text-lg text-primary-foreground/70 mb-8 max-w-lg leading-relaxed">
              Book slots, enroll in coaching programs, and manage your sports journey.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/programs" className="btn-outline-hero text-base py-3.5 px-10">
                Explore Programs
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <WaveDivider />
        </div>
      </section>

      {/* Stats Strip */}
      <section className="py-8 -mt-1 bg-background relative z-10">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="stat-card card-premium"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-3">
                  <s.icon className="text-primary" size={24} />
                </div>
                <span className="text-2xl md:text-3xl font-black text-white font-display">{s.value}</span>
                <span className="text-sm text-white/50 font-bold mt-1">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Scooled */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeading badge="Why Scooled" title="Built for Modern Aquatics" subtitle="Everything you need to manage swimming operations, beautifully." />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyItems.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="card-premium group cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                  <item.icon className="text-primary" size={22} />
                </div>
                <h3 className="font-display text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="section-padding bg-gradient-to-b from-background to-navy/5">
        <div className="container-custom">
          <SectionHeading
            badge="Programs"
            title={`${activeSport} Programs`}
            subtitle="Expert-led coaching for every age and skill level."
          />

          {/* Sport Tab Switcher */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {sportTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveSport(tab.key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-black uppercase tracking-widest transition-all duration-300 border ${activeSport === tab.key
                  ? "bg-yellow-400 text-black border-yellow-400 shadow-lg shadow-yellow-400/30 scale-105"
                  : "bg-black text-white border-white/20 hover:border-yellow-400/50"
                  }`}
              >
                <span>{tab.emoji}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Animated Program Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSport}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {allSportPrograms[activeSport].map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative overflow-hidden rounded-[2.5rem] bg-black/95 border border-white/10 shadow-2xl shadow-black/40 cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${p.accentColor} via-transparent to-transparent`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    {/* Badge */}
                    <span className={`absolute top-4 left-4 ${p.badgeColor} text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg`}>
                      {p.badge}
                    </span>
                    {/* Level */}
                    <span className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white/80 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border border-white/20">
                      {p.level}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-display text-lg font-black text-white mb-2 tracking-tight">{p.title}</h3>
                    <div className="flex items-center gap-2 text-white/40 text-[10px] font-bold uppercase tracking-widest mb-4">
                      <Clock size={12} className="text-primary" />
                      {p.ageGroup} • {p.schedule}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div>
                        <span className="text-2xl font-black text-white tracking-tighter">₹{p.price.toLocaleString()}</span>
                        <span className="text-[10px] text-white/30 font-bold ml-1">/mo</span>
                      </div>
                      <Link
                        to="/programs"
                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:text-white bg-primary/10 hover:bg-primary px-4 py-2.5 rounded-xl transition-all border border-primary/20 hover:border-primary"
                      >
                        Enroll <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>



      {/* Membership Plans */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeading
            badge="Memberships"
            title="Choose Your Plan"
            subtitle={`Flexible plans designed for every ${activeMemberSport.toLowerCase()} player.`}
          />

          {/* Membership Sport Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {memberSportTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveMemberSport(tab.key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-black uppercase tracking-widest transition-all duration-300 border ${activeMemberSport === tab.key
                  ? "bg-yellow-400 text-black border-yellow-400 shadow-lg shadow-yellow-400/30 scale-105"
                  : "bg-black text-white border-white/20 hover:border-yellow-400/50"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Animated Membership Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMemberSport}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {allSportMemberships[activeMemberSport].map((plan, i) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  whileHover={{ y: -8 }}
                  className={`relative rounded-[2.5rem] bg-black/95 border p-8 flex flex-col gap-0 shadow-2xl shadow-black/40 transition-all ${plan.popular ? "border-primary ring-2 ring-primary/40" : "border-white/10 hover:border-white/20"
                    }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-primary/30">
                      Most Popular
                    </span>
                  )}

                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="font-display text-2xl font-black text-white italic tracking-tight">{plan.name}</h3>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mt-1.5 flex items-center gap-1.5">
                        <Zap size={11} /> Premium Tier
                      </p>
                    </div>
                    <Link
                      to="/memberships"
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all shadow-xl shrink-0 ${plan.popular
                        ? "bg-primary text-white shadow-primary/30"
                        : "bg-white/5 text-white/40 hover:bg-primary hover:text-white border border-white/10"
                        }`}
                    >
                      <ArrowUpRight size={20} />
                    </Link>
                  </div>

                  {/* Price Box */}
                  <div className="mb-8 p-5 bg-white/5 rounded-3xl border border-white/5">
                    <span className="text-4xl font-black text-white tracking-tighter italic">₹{plan.price.toLocaleString()}</span>
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-3">/ Month</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8 flex-1">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm font-bold text-white/80">
                        <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center border border-primary/25 shrink-0">
                          <CheckCircle2 size={12} className="text-primary" />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    to="/memberships"
                    className="block text-center py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] text-white transition-all shadow-xl"
                    style={{ background: "linear-gradient(135deg, hsl(205 85% 45%), hsl(190 70% 50%))", boxShadow: "0 8px 32px -8px hsl(205 85% 45% / 0.4)" }}
                  >
                    Upgrade Now
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>


      {/* Testimonials — Infinite Marquee */}
      <section className="section-padding bg-muted/50 overflow-hidden relative">
        <style>{`
          @keyframes marquee-ltr { from { transform: translateX(0) } to { transform: translateX(-50%) } }
          @keyframes marquee-rtl { from { transform: translateX(-50%) } to { transform: translateX(0) } }
          .marquee-ltr { animation: marquee-ltr 36s linear infinite; }
          .marquee-rtl { animation: marquee-rtl 40s linear infinite; }
          .marquee-ltr:hover, .marquee-rtl:hover { animation-play-state: paused; }
        `}</style>

        <div className="container-custom mb-12">
          <SectionHeading
            badge="Testimonials"
            title="What Our Players Say"
            subtitle="Real experiences from swimmers, futsal players, pickleball fans &amp; table tennis enthusiasts."
          />
        </div>

        {/* Row 1: right → left */}
        <div className="relative overflow-hidden mb-6">
          <div className="flex gap-5 w-max marquee-ltr">
            {[...multiSportTestimonials, ...multiSportTestimonials].map((t, i) => (
              <div
                key={i}
                className={`w-80 shrink-0 rounded-3xl bg-gradient-to-br ${t.accent} border border-white/10 p-6 flex flex-col gap-4 backdrop-blur-sm`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/50 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                    {t.sport}
                  </span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={12} className="fill-amber-400 text-amber-400" />)}
                  </div>
                </div>
                <p className="text-sm text-white/80 leading-relaxed italic flex-1">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-cyan flex items-center justify-center text-white font-black text-xs shadow-lg shadow-primary/30 shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-black text-white tracking-tight leading-tight">{t.name}</p>
                    <p className="text-[10px] text-white/40 font-bold mt-0.5">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: left → right (reversed) */}
        <div className="relative overflow-hidden">
          <div className="flex gap-5 w-max marquee-rtl">
            {[...multiSportTestimonials.slice().reverse(), ...multiSportTestimonials.slice().reverse()].map((t, i) => (
              <div
                key={i}
                className={`w-80 shrink-0 rounded-3xl bg-gradient-to-br ${t.accent} border border-white/10 p-6 flex flex-col gap-4 backdrop-blur-sm`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/50 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                    {t.sport}
                  </span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={12} className="fill-amber-400 text-amber-400" />)}
                  </div>
                </div>
                <p className="text-sm text-white/80 leading-relaxed italic flex-1">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-cyan flex items-center justify-center text-white font-black text-xs shadow-lg shadow-primary/30 shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-black text-white tracking-tight leading-tight">{t.name}</p>
                    <p className="text-[10px] text-white/40 font-bold mt-0.5">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Edge fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-muted/80 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-muted/80 to-transparent z-10" />
      </section>

      {/* FAQ */}
      <section className="section-padding bg-background">
        <div className="container-custom max-w-3xl">
          <SectionHeading badge="FAQ" title="Frequently Asked Questions" />
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="card-premium cursor-pointer border-white/5 hover:border-white/20 transition-all" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="flex justify-between items-center gap-4">
                  <h3 className="font-bold text-white text-sm leading-relaxed">{faq.q}</h3>
                  <ChevronRight size={18} className={`text-primary shrink-0 transition-transform ${openFaq === i ? "rotate-90" : ""}`} />
                </div>
                {openFaq === i && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-sm text-white/60 mt-4 leading-relaxed"
                  >
                    {faq.a}
                  </motion.p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-navy text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0"><WaveDivider color="hsl(var(--background))" flip /></div>
        <div className="container-custom text-center relative z-10">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">Ready to Make a Splash?</h2>
          <p className="text-lg text-primary-foreground/70 mb-8 max-w-lg mx-auto">
            Join thousands of swimmers who trust Scooled for their aquatic journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/login" className="btn-primary text-base py-3.5 px-10">Sign In to Book</Link>
            <Link to="/contact" className="btn-outline-hero text-base py-3.5 px-10">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
