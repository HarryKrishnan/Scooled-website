import { motion } from "framer-motion";
import { Clock, Users as UsersIcon, ChevronRight, Filter } from "lucide-react";
import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { allSportPrograms, sportTabs } from "@/data/mockData";
import { Link } from "react-router-dom";

const filters = {
  level: ["All", "Beginner", "Intermediate", "Advanced", "All Levels"],
};

export default function ProgramsPage() {
  const [activeSport, setActiveSport] = useState("Swimming");
  const [level, setLevel] = useState("All");

  const programsForSport = allSportPrograms[activeSport] || [];
  const filtered = level === "All" ? programsForSport : programsForSport.filter((p) => p.level === level);

  return (
    <>
      <section className="pt-32 pb-16 bg-navy text-primary-foreground">
        <div className="container-custom text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl md:text-5xl font-bold mb-4">Our Programs</motion.h1>
          <p className="text-lg text-primary-foreground/70">Expert-led coaching for every sport, age, and skill level.</p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          {/* Sport Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {sportTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveSport(tab.key);
                  setLevel("All");
                }}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-display text-sm font-bold transition-all ${
                  activeSport === tab.key
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                <span>{tab.emoji}</span>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-10">
            <Filter size={18} className="text-muted-foreground mr-2" />
            {filters.level.map((l) => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                  level === l 
                    ? "bg-primary border-primary text-primary-foreground" 
                    : "bg-transparent border-border text-muted-foreground hover:border-primary/50"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="card-premium overflow-hidden group">
                <div className="h-48 -mx-6 -mt-6 mb-4 overflow-hidden relative">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {p.badge && (
                    <div className={`absolute top-4 right-4 ${p.badgeColor} text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg`}>
                      {p.badge}
                    </div>
                  )}
                  <div className={`absolute inset-0 bg-gradient-to-t ${p.accentColor} to-transparent opacity-60`} />
                </div>
                <div className="flex gap-2 mb-3">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">{p.level}</span>
                  <span className="text-xs font-medium text-accent bg-accent/10 px-2.5 py-1 rounded-full">{p.ageGroup}</span>
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{p.title}</h3>
                <div className="space-y-1.5 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2"><Clock size={14} /> {p.schedule}</div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-xl font-bold text-foreground">₹{p.price.toLocaleString()}<span className="text-xs text-muted-foreground font-normal">/mo</span></span>
                  <Link to="/contact" className="text-sm font-medium text-primary flex items-center gap-1 hover:gap-2 transition-all">
                    Inquire <ChevronRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
