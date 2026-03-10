import { motion } from "framer-motion";
import { Clock, Users as UsersIcon, ChevronRight, Filter } from "lucide-react";
import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { programs } from "@/data/mockData";
import kidsImg from "@/assets/kids-swim.jpg";
import adultImg from "@/assets/adult-swim.jpg";
import { Link } from "react-router-dom";

const filters = {
  level: ["All", "Beginner", "Intermediate", "Advanced", "All Levels"],
};

const imgMap: Record<string, string> = {
  "Kids Learn to Swim": kidsImg,
  "Water Safety & Survival": kidsImg,
  "Weekend Training": kidsImg,
  "Adult Fitness Swimming": adultImg,
  "Competitive Coaching": adultImg,
  "Master's Swimming": adultImg,
};

export default function ProgramsPage() {
  const [level, setLevel] = useState("All");

  const filtered = level === "All" ? programs : programs.filter((p) => p.level === level);

  return (
    <>
      <section className="pt-32 pb-16 bg-navy text-primary-foreground">
        <div className="container-custom text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl md:text-5xl font-bold mb-4">Swimming Programs</motion.h1>
          <p className="text-lg text-primary-foreground/70">Expert-led coaching for every age and skill level.</p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <Filter size={18} className="text-muted-foreground" />
            {filters.level.map((l) => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  level === l ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="card-premium overflow-hidden group">
                <div className="h-48 -mx-6 -mt-6 mb-4 overflow-hidden">
                  <img src={imgMap[p.title] || kidsImg} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex gap-2 mb-3">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">{p.level}</span>
                  <span className="text-xs font-medium text-accent bg-accent/10 px-2.5 py-1 rounded-full">{p.ageGroup}</span>
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{p.title}</h3>
                <div className="space-y-1.5 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2"><Clock size={14} /> {p.schedule} • {p.time}</div>
                  <div className="flex items-center gap-2"><UsersIcon size={14} /> Coach: {p.coach} • {p.enrolled}/{p.capacity} enrolled</div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-xl font-bold text-foreground">₹{p.price.toLocaleString()}<span className="text-xs text-muted-foreground font-normal">/mo</span></span>
                  <Link to="/book" className="text-sm font-medium text-primary flex items-center gap-1 hover:gap-2 transition-all">
                    Enroll <ChevronRight size={14} />
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
