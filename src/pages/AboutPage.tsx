import { motion } from "framer-motion";
import { Award, Users, Target, Heart, Droplets, Shield } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import heroImg from "@/assets/hero-pool.jpg";

const values = [
  { icon: Heart, title: "Passion for Sports", desc: "We believe in the transformative power of sports to improve health, discipline, and community wellbeing." },
  { icon: Shield, title: "Safety First", desc: "Every session is conducted with professional supervision and stringent safety protocols for all age groups." },
  { icon: Target, title: "Excellence", desc: "Our coaches bring elite training methodologies to every athlete, from beginner to pro." },
  { icon: Droplets, title: "Modern Facilities", desc: "State-of-the-art courts and pools designed for performance and safety." },
  { icon: Award, title: "Expert Coaching", desc: "All coaches are certified professionals with years of competitive experience in their respective sports." },
  { icon: Users, title: "Thriving Community", desc: "Join thousands of active members supporting each other's fitness and athletic journeys." },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 bg-navy text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={heroImg} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl md:text-5xl font-bold mb-4">About Scooled</motion.h1>
          <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto">Redefining the fitness and sports experience with technology, passion, and elite coaching.</p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading badge="Our Story" title="Where Excellence Meets Innovation" center={false} />
              <p className="text-muted-foreground leading-relaxed mb-4">
                Founded with a vision to revolutionize sports operations, Scooled brings together cutting-edge technology and expert coaching to create an unparalleled athletic experience.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Whether it's Swimming, Futsal, Pickleball, or Table Tennis — we've built a platform that puts athletes and their families first, from seamless booking to advanced progress tracking.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, we serve thousands of active members across multiple high-performance centres, with a team of certified coaches dedicated to nurturing the next generation of excellence.
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
