import { motion } from "framer-motion";
import { Award, Users, Target, Heart, Droplets, Shield } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import heroImg from "@/assets/hero-pool.jpg";

const values = [
  { icon: Heart, title: "Passion for Swimming", desc: "We believe swimming is a life skill that transforms health, confidence, and wellbeing." },
  { icon: Shield, title: "Safety First", desc: "Every session is supervised by certified lifeguards with stringent safety protocols." },
  { icon: Target, title: "Excellence", desc: "Our coaches bring world-class training methodologies to every swimmer." },
  { icon: Droplets, title: "Inclusivity", desc: "Programs designed for every age, ability, and fitness level." },
  { icon: Award, title: "Certified Coaches", desc: "All coaches are internationally certified with years of competitive experience." },
  { icon: Users, title: "Community", desc: "A thriving community of swimmers supporting each other's aquatic journey." },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 bg-navy text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={heroImg} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl md:text-5xl font-bold mb-4">About Scooled Aquatics</motion.h1>
          <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto">Redefining the swimming experience with technology, passion, and world-class coaching.</p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading badge="Our Story" title="Where Excellence Meets Water" center={false} />
              <p className="text-muted-foreground leading-relaxed mb-4">
                Founded with a vision to modernize swimming operations, Scooled Aquatics brings together cutting-edge technology and expert coaching to create an unparalleled aquatic experience.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                From seamless slot booking to detailed progress tracking, we've built a platform that puts swimmers and their families first — while giving administrators the tools they need to run world-class facilities.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, we serve thousands of active members across multiple centres, with a team of certified coaches dedicated to nurturing the next generation of swimmers.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "var(--shadow-elevated)" }}>
              <img src={heroImg} alt="Our facility" className="w-full h-80 object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/50">
        <div className="container-custom">
          <SectionHeading badge="Values" title="What Drives Us" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="card-premium">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <v.icon className="text-primary" size={22} />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
