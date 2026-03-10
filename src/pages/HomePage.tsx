import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users, Calendar, Award, Building2, CalendarCheck, Shield, CreditCard,
  TrendingUp, Bell, Globe, ChevronRight, Star, CheckCircle2, ArrowRight,
  MapPin, Clock, Wallet
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import WaveDivider from "@/components/ui/WaveDivider";
import { programs, membershipPlans, testimonials, faqs } from "@/data/mockData";
import heroImg from "@/assets/hero-pool.jpg";
import kidsImg from "@/assets/kids-swim.jpg";
import adultImg from "@/assets/adult-swim.jpg";
import { useState } from "react";

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

const programImages: Record<string, string> = {
  "Kids Learn to Swim": kidsImg,
  "Adult Fitness Swimming": adultImg,
  "Competitive Coaching": adultImg,
  "Weekend Training": kidsImg,
};

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Premium swimming pool" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-navy/30" />
        </div>
        <div className="container-custom relative z-10 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm text-primary-foreground text-sm font-medium mb-6">
              <Star size={14} className="text-gold" /> Premium Aquatics Platform
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-[1.1] mb-6">
              Dive Into <br />
              <span className="gradient-text">Excellence</span>
            </h1>
            <p className="text-lg text-primary-foreground/70 mb-8 max-w-lg leading-relaxed">
              Book swimming slots, enroll in coaching programs, and manage your aquatic journey — all from one beautiful platform.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/book" className="btn-primary text-base py-3.5 px-10">
                Book a Slot
              </Link>
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
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <s.icon className="text-primary" size={24} />
                </div>
                <span className="text-2xl md:text-3xl font-bold text-foreground font-display">{s.value}</span>
                <span className="text-sm text-muted-foreground mt-1">{s.label}</span>
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
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="text-primary" size={22} />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="section-padding bg-muted/50">
        <div className="container-custom">
          <SectionHeading badge="Programs" title="Swimming Programs" subtitle="Expert-led coaching for every age and skill level." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.slice(0, 4).map((p, i) => (
              <motion.div
                key={p.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="card-premium overflow-hidden group"
              >
                <div className="h-48 -mx-6 -mt-6 mb-4 overflow-hidden">
                  <img
                    src={programImages[p.title] || kidsImg}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                  {p.level}
                </span>
                <h3 className="font-display text-lg font-semibold text-foreground mt-3 mb-1">{p.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{p.ageGroup} • {p.schedule}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-foreground">₹{p.price.toLocaleString()}<span className="text-xs text-muted-foreground font-normal">/mo</span></span>
                  <Link to="/programs" className="text-sm font-medium text-primary flex items-center gap-1 hover:gap-2 transition-all">
                    Details <ChevronRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Flow */}
      <section className="section-padding bg-navy text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0"><WaveDivider color="hsl(var(--muted) / 0.5)" flip /></div>
        <div className="container-custom relative z-10">
          <SectionHeading badge="How It Works" title="Book in 4 Simple Steps" subtitle="From selection to confirmation in under 2 minutes." light />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bookingSteps.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="text-center p-6"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 relative">
                  <s.icon size={28} className="text-cyan" />
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-primary-foreground/60">{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/book" className="btn-primary text-base py-3.5 px-10">
              Book Your Slot Now <ArrowRight className="inline ml-2" size={18} />
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0"><WaveDivider /></div>
      </section>

      {/* Membership Plans */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeading badge="Memberships" title="Choose Your Plan" subtitle="Flexible plans designed for every swimmer." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {membershipPlans.map((plan, i) => (
              <motion.div
                key={plan.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className={`card-premium relative ${plan.popular ? "ring-2 ring-primary" : ""}`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className="font-display text-xl font-bold text-foreground">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.duration}</p>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-foreground">₹{plan.price.toLocaleString()}</span>
                </div>
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/memberships"
                  className={`block text-center py-2.5 rounded-full text-sm font-semibold transition-all ${
                    plan.popular
                      ? "btn-primary w-full"
                      : "border border-border text-foreground hover:bg-muted"
                  }`}
                >
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-muted/50">
        <div className="container-custom">
          <SectionHeading badge="Testimonials" title="What Our Swimmers Say" />
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="card-premium"
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={16} className="fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-background">
        <div className="container-custom max-w-3xl">
          <SectionHeading badge="FAQ" title="Frequently Asked Questions" />
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="card-premium cursor-pointer" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-foreground text-sm">{faq.q}</h3>
                  <ChevronRight size={18} className={`text-muted-foreground transition-transform ${openFaq === i ? "rotate-90" : ""}`} />
                </div>
                {openFaq === i && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-sm text-muted-foreground mt-3 leading-relaxed"
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
            Join thousands of swimmers who trust Scooled Aquatics for their aquatic journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/book" className="btn-primary text-base py-3.5 px-10">Book Your First Session</Link>
            <Link to="/contact" className="btn-outline-hero text-base py-3.5 px-10">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
