import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { 
  Check, 
  ChevronRight, 
  ArrowLeft, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  Calendar as CalendarIcon,
  CreditCard,
  Target,
  Smartphone,
  Trophy,
  ArrowRight
} from "lucide-react";
import { allSportPrograms } from "@/data/mockData";

// Sports data
import heroSwimming from "@/assets/hero-swimming.png";
import heroFutsal from "@/assets/hero-futsal.png";
import heroPickleball from "@/assets/hero-pickleball.png";
import heroTableTennis from "@/assets/hero-table-tennis.png";

const sports = [
  { id: "swimming", name: "Swimming", image: heroSwimming, color: "from-blue-600/80", participantLabel: "Swimmer", abilityLabel: "Swimming Ability" },
  { id: "futsal", name: "Futsal", image: heroFutsal, color: "from-orange-600/80", participantLabel: "Player", abilityLabel: "Experience Level" },
  { id: "pickleball", name: "Pickleball", image: heroPickleball, color: "from-emerald-600/80", participantLabel: "Player", abilityLabel: "Skill Level" },
  { id: "table-tennis", name: "Table-Tennis", image: heroTableTennis, color: "from-rose-600/80", participantLabel: "Player", abilityLabel: "Skill Level" },
];

const steps = [
  { id: 1, name: "SPORT", icon: Target },
  { id: 2, name: "INFO", icon: User },
  { id: 3, name: "PLAN", icon: Trophy },
  { id: 4, name: "PAYMENT", icon: CreditCard },
  { id: 5, name: "DONE", icon: Check },
];

export default function RegisterPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSport, setSelectedSport] = useState<typeof sports[0] | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<any>(null);
  
  // Form states
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    ability: "",
    medicalNotes: "",
    emergencyContact: ""
  });

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  // Step 1: Sport Selection
  const Step1 = () => (
    <div className="space-y-8">
      <div className="text-center mb-10">
        <h2 className="font-display text-3xl font-bold text-white mb-3 tracking-tight uppercase">Select Your Sport</h2>
        <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Choose the discipline you wish to excel in</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        {sports.map((sport) => (
          <motion.div
            key={sport.id}
            whileHover={{ y: -8, scale: 1.02 }}
            onClick={() => {
              setSelectedSport(sport);
              handleNext();
            }}
            className={`group relative h-64 rounded-[2rem] overflow-hidden cursor-pointer border-2 transition-all ${
              selectedSport?.id === sport.id ? 'border-primary shadow-glow shadow-primary/20' : 'border-white/5'
            }`}
          >
            <img src={sport.image} alt={sport.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className={`absolute inset-0 bg-gradient-to-t ${sport.color} via-navy/20 to-transparent opacity-80`} />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
            <div className="absolute inset-x-0 bottom-0 p-8 flex items-end justify-between">
              <div>
                <h3 className="text-2xl font-display font-bold text-white tracking-tight">{sport.name}</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Professional Track</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover:bg-primary group-hover:border-primary transition-all">
                <ChevronRight size={20} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  // Step 2: Info
  const Step2 = () => (
    <div className="max-w-xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h2 className="font-display text-4xl font-bold text-white mb-2 tracking-tight uppercase">{selectedSport?.participantLabel} INFO</h2>
        <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">Personal excellence starts with detail</p>
      </div>

      <div className="card-premium border-white/5 bg-navy-light/20 p-8 space-y-6">
        <div className="space-y-4 pb-4 border-b border-white/5">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/40">Account Credentials</h3>
          <div className="space-y-4">
            <div className="relative group">
              <Mail size={16} className="absolute left-5 top-5 text-white/20" />
              <input type="email" placeholder="Email Address" className="w-full bg-navy/40 border border-white/10 rounded-2xl pl-14 pr-5 py-4 text-white text-sm focus:border-primary outline-none transition-all font-bold" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative group">
                <Lock size={16} className="absolute left-5 top-5 text-white/20" />
                <input type="password" placeholder="Password" className="w-full bg-navy/40 border border-white/10 rounded-2xl pl-14 pr-5 py-4 text-white text-sm focus:border-primary outline-none transition-all font-bold" />
              </div>
              <div className="relative group">
                <Smartphone size={16} className="absolute left-5 top-5 text-white/20" />
                <input type="tel" placeholder="Mobile" className="w-full bg-navy/40 border border-white/10 rounded-2xl pl-14 pr-5 py-4 text-white text-sm focus:border-primary outline-none transition-all font-bold" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/40">{selectedSport?.participantLabel} Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">First Name</label>
              <input 
                type="text" 
                placeholder="Arjun"
                className="w-full bg-navy/40 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:border-primary outline-none transition-all placeholder:text-white/20 font-bold"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Last Name</label>
              <input 
                type="text" 
                placeholder="Kumar"
                className="w-full bg-navy/40 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:border-primary outline-none transition-all placeholder:text-white/20 font-bold"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Date of Birth</label>
          <input 
            type="date" 
            className="w-full bg-navy/40 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:border-primary outline-none transition-all font-bold [color-scheme:dark]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Gender</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {['Male', 'Female', 'Non-binary', 'Other'].map(g => (
              <button key={g} className="py-3 rounded-xl border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/60 hover:border-primary hover:text-white transition-all">
                {g}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">{selectedSport?.abilityLabel}</label>
          <select className="w-full bg-navy/40 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:border-primary outline-none transition-all font-bold appearance-none cursor-pointer">
            <option>Select level...</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
            <option>Competitive</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Medical Notes (Optional)</label>
          <textarea 
            rows={3}
            placeholder="Anything coaches should know..."
            className="w-full bg-navy/40 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:border-primary outline-none transition-all placeholder:text-white/20 font-bold resize-none"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button 
            onClick={handleBack}
            className="flex-1 py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <button 
            onClick={handleNext}
            className="flex-[2] py-4 rounded-2xl bg-primary text-white text-xs font-black uppercase tracking-[0.2em] hover:scale-[1.02] transition-all shadow-glow shadow-primary/20 flex items-center justify-center gap-2"
          >
            Continue <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  // Step 3: Plan
  const Step3 = () => {
    const sportPrograms = selectedSport ? allSportPrograms[selectedSport.name] || [] : [];
    
    return (
      <div className="space-y-8">
        <div className="text-center mb-8 text-white">
          <h2 className="font-display text-4xl font-bold tracking-tight uppercase">CHOOSE YOUR PATH</h2>
          <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Select a professional program for {selectedSport?.name}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sportPrograms.length > 0 ? sportPrograms.map((program, i) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => {
                setSelectedProgram(program);
                handleNext();
              }}
              className={`card-premium bg-black/60 border border-white/5 group hover:border-primary transition-all cursor-pointer flex flex-col p-6 overflow-hidden relative ${
                selectedProgram?.id === program.id ? 'border-primary ring-1 ring-primary' : ''
              }`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-primary/10 transition-all" />
              
              <div className="relative z-10 flex flex-col h-full">
                <span className={`px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest text-white self-start mb-6 ${program.badgeColor}`}>
                  {program.badge.split(' ').slice(1).join(' ')}
                </span>
                
                <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-primary transition-colors">{program.title}</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-6">{program.level} • {program.ageGroup}</p>
                
                <p className="text-xs text-white/50 mb-8 line-clamp-3 leading-relaxed">
                  {program.description}
                </p>

                <div className="mt-auto">
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-3xl font-black text-white italic">₹{program.price}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/20">/month</span>
                  </div>
                  
                  <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-primary group-hover:border-primary transition-all text-[10px] font-black uppercase tracking-widest text-white">
                    Select Plan
                  </button>
                </div>
              </div>
            </motion.div>
          )) : (
            <div className="col-span-full py-20 text-center card-premium border-dashed border-white/5">
              <p className="text-white/30 font-bold uppercase tracking-widest">No programs available yet for this sport.</p>
            </div>
          )}
        </div>

        <div className="flex justify-center pt-8">
          <button 
            onClick={handleBack}
            className="px-12 py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <ArrowLeft size={16} /> Previous Step
          </button>
        </div>
      </div>
    );
  };

  // Step 4: Payment
  const Step4 = () => (
    <div className="max-w-xl mx-auto space-y-8">
      <div className="text-center mb-8 text-white">
        <h2 className="font-display text-4xl font-bold tracking-tight uppercase">SECURE PAYMENT</h2>
        <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Initialize your professional subscription</p>
      </div>

      <div className="grid md:grid-cols-1 gap-8">
        {/* Order Summary */}
        <div className="card-premium border-white/5 bg-navy-light/20 p-8">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/40 mb-6 flex items-center gap-3">
             Order Summary
          </h3>
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center group">
              <span className="text-sm font-bold text-white/60">Selected Sport</span>
              <span className="text-sm font-black text-white">{selectedSport?.name}</span>
            </div>
            <div className="flex justify-between items-center group">
              <span className="text-sm font-bold text-white/60">Program Track</span>
              <span className="text-sm font-black text-white">{selectedProgram?.title}</span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-white/5 group">
              <span className="text-lg font-black text-white uppercase italic">Total Due</span>
              <span className="text-3xl font-black text-primary italic">₹{selectedProgram?.price}</span>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/40 mb-2 flex items-center gap-3">
              Payment Method
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="py-4 rounded-2xl bg-primary/10 border border-primary text-[10px] font-black uppercase tracking-widest text-primary flex flex-col items-center gap-2">
                <CreditCard size={20} /> Card
              </button>
              <button className="py-4 rounded-2xl bg-white/3 border border-white/5 text-[10px] font-black uppercase tracking-widest text-white/40 flex flex-col items-center gap-2 hover:border-white/20 transition-all">
                <Smartphone size={20} /> UPI
              </button>
            </div>

            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Card Number</label>
                <div className="relative">
                  <CreditCard className="absolute left-4 top-4 text-white/20" size={18} />
                  <input type="text" placeholder="#### #### #### ####" className="w-full bg-navy/40 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white font-mono text-sm focus:border-primary outline-none transition-all placeholder:text-white/10" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Expiry</label>
                  <input type="text" placeholder="MM/YY" className="w-full bg-navy/40 border border-white/10 rounded-2xl px-5 py-4 text-white font-mono text-sm focus:border-primary outline-none transition-all placeholder:text-white/10" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">CVV</label>
                  <input type="password" placeholder="***" className="w-full bg-navy/40 border border-white/10 rounded-2xl px-5 py-4 text-white font-mono text-sm focus:border-primary outline-none transition-all placeholder:text-white/10" />
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button 
                onClick={handleBack}
                className="flex-1 py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all"
              >
                Back
              </button>
              <button 
                onClick={handleNext}
                className="flex-[2] py-4 rounded-2xl bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] hover:scale-[1.02] transition-all shadow-glow shadow-primary/20"
              >
                Pay Now & Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Step 5: Success
  const Step5 = () => (
    <div className="max-w-xl mx-auto text-center py-12 flex flex-col items-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-24 h-24 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center text-primary mb-8"
      >
        <Check size={48} strokeWidth={4} />
      </motion.div>
      
      <h2 className="font-display text-4xl font-bold text-white mb-4 tracking-tight uppercase italic">WELCOME ABOARD!</h2>
      <p className="text-white/60 mb-12 max-w-sm leading-relaxed font-medium">
        Your registration for <span className="text-white font-black">{selectedProgram?.title}</span> is successful. A confirmation email has been sent.
      </p>

      <div className="w-full card-premium border-white/5 bg-navy-light/10 p-8 mb-12 text-left space-y-4">
        <div className="flex justify-between">
          <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Registration ID</span>
          <span className="text-[11px] font-black text-white italic">#SCO-{Math.floor(Math.random() * 90000) + 10000}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Official Sport</span>
          <span className="text-[11px] font-black text-white font-bold">{selectedSport?.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Portal Access</span>
          <span className="text-[11px] font-black text-primary font-black uppercase tracking-widest">Enabled</span>
        </div>
      </div>

      <button
        onClick={() => navigate('/login')}
        className="w-full py-5 rounded-2xl bg-white text-navy text-sm font-black uppercase tracking-[0.3em] hover:scale-[1.02] transition-all flex items-center justify-center gap-3 shadow-2xl shadow-white/10"
      >
        GO TO LOGIN <ArrowRight size={20} strokeWidth={3} />
      </button>
    </div>
  );

  return (
    <section className="min-h-screen bg-navy py-12 lg:py-20 px-4">
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -mr-64 -mt-64 text-indigo-900" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] -ml-64 -mb-64" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8 text-white">
          <div className="space-y-2">
            <span className="px-5 py-2 inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em]">
               Self Registration Page
            </span>
            <h1 className="font-display text-6xl font-bold tracking-tighter uppercase italic">
              Create <span className="text-white/20">Account</span>
            </h1>
          </div>

          <div className="flex items-center">
            {steps.map((step, i) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 ${
                    currentStep >= step.id 
                      ? 'bg-primary border-primary text-white shadow-glow shadow-primary/20' 
                      : 'border-white/10 text-white/20 bg-navy/40'
                  }`}>
                    {currentStep > step.id ? <Check size={20} /> : <step.icon size={20} />}
                  </div>
                  <span className={`text-[8px] font-black uppercase tracking-[0.2em] mt-3 ${
                    currentStep >= step.id ? 'text-primary' : 'text-white/20'
                  }`}>
                    {step.name}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="w-8 sm:w-16 md:w-24 h-0.5 bg-white/5 mx-2 -mt-7">
                    <div className={`h-full bg-primary transition-all duration-700 ${
                      currentStep > step.id ? 'w-full' : 'w-0'
                    }`} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="min-h-[500px]"
        >
          {currentStep === 1 && <Step1 />}
          {currentStep === 2 && <Step2 />}
          {currentStep === 3 && <Step3 />}
          {currentStep === 4 && <Step4 />}
          {currentStep === 5 && <Step5 />}
        </motion.div>
      </div>
    </section>
  );
}
