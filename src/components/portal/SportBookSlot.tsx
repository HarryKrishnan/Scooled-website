import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, Calendar as CalendarIcon, Clock, Users, CheckCircle2, AlertCircle } from "lucide-react";
import { centres } from "@/data/mockData";

export interface Slot {
  id: string;
  time: string;
  capacity: number;
  booked: number;
  type: string;
}

interface SportBookSlotProps {
  title: string;
  subtitle: string;
  headerBorderClass: string;
  centreSelectionLabel: string;
  buttonGradientClass: string;
  slots: Slot[];
  getCapacityLabel: (avail: number, full: boolean) => string;
}

export default function SportBookSlot({
  title,
  subtitle,
  headerBorderClass,
  centreSelectionLabel,
  buttonGradientClass,
  slots,
  getCapacityLabel,
}: SportBookSlotProps) {
  const [selectedCentre, setSelectedCentre] = useState(centres[0].id);
  const [selectedDate, setSelectedDate] = useState("2026-03-12");
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);

  const centre = centres.find((c) => c.id === selectedCentre)!;
  const slot = slots.find((s) => s.id === selectedSlot);

  return (
    <div className="space-y-8">
      <div className={`card-premium ${headerBorderClass} bg-black/95 mb-8`}>
        <h1 className="font-display text-3xl font-bold text-white tracking-tight">{title}</h1>
        <p className="text-sm text-white/70 font-bold mt-1">{subtitle}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Centre Selection */}
          <div className="card-premium border-white/5 bg-black/95">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-primary mb-8 flex items-center gap-3">
              <MapPin size={18} /> {centreSelectionLabel}
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {centres.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCentre(c.id)}
                  className={`p-6 rounded-[2rem] border-2 text-left transition-all duration-300 group ${
                    selectedCentre === c.id 
                      ? "border-primary bg-primary/10 shadow-glow shadow-primary/10 translate-x-1" 
                      : "border-white/5 bg-white/5 hover:border-primary/20"
                  }`}
                >
                  <p className={`font-bold text-base transition-colors ${selectedCentre === c.id ? "text-white" : "text-white/60"}`}>{c.name.replace("Scooled — ", "")}</p>
                  <p className={`text-xs mt-2 font-medium leading-relaxed ${selectedCentre === c.id ? "text-white/60" : "text-white/30"}`}>{c.address}</p>
                  <div className="flex items-center gap-2 mt-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <p className="text-[9px] text-primary font-black uppercase tracking-widest">{c.pools} premium facilities</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Date Selection */}
          <div className="card-premium border-white/5 bg-black/95">
            <h3 className="font-display text-lg font-bold text-white mb-6 flex items-center gap-3 uppercase tracking-tight">
              <CalendarIcon size={18} className="text-primary" /> Select Date
            </h3>
            <div className="relative inline-block w-full sm:w-auto">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full sm:w-80 px-6 py-4 rounded-2xl border border-white/10 bg-white/5 text-white font-bold text-sm focus:border-primary outline-none transition-all appearance-none"
              />
              <CalendarIcon size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
            </div>
          </div>

          {/* Slots */}
          <div className="card-premium border-white/5 bg-black/95">
            <h3 className="font-display text-lg font-bold text-white mb-8 flex items-center gap-3 uppercase tracking-tight">
              <Clock size={18} className="text-primary" /> Available Slots
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {slots.map((s) => {
                const full = s.booked >= s.capacity;
                const avail = s.capacity - s.booked;
                return (
                  <button
                    key={s.id}
                    disabled={full}
                    onClick={() => { setSelectedSlot(s.id); setShowSummary(true); }}
                    className={`p-5 rounded-2xl border-2 text-left transition-all group ${
                      full
                        ? "border-white/5 opacity-30 cursor-not-allowed grayscale"
                        : selectedSlot === s.id
                        ? "border-primary bg-primary/10 shadow-glow shadow-primary/10"
                        : "border-white/10 bg-white/5 hover:border-primary/40"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <p className={`font-black text-sm ${selectedSlot === s.id ? "text-white" : "text-white/80"}`}>{s.time}</p>
                      {selectedSlot === s.id && <CheckCircle2 size={14} className="text-primary" />}
                    </div>
                    <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mb-4">{s.type}</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users size={12} className={full ? "text-destructive" : "text-primary"} />
                          <span className={`text-[10px] font-black uppercase tracking-tight ${full ? "text-destructive" : "text-primary"}`}>
                            {getCapacityLabel(avail, full)}
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden border border-white/5">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${full ? "bg-destructive" : avail <= 3 ? "bg-amber-500" : "bg-primary"}`}
                          style={{ width: `${(s.booked / s.capacity) * 100}%` }}
                        />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Summary Panel */}
        <div className="lg:col-span-1">
          <div className="card-premium border-gold-tile bg-black/95 sticky top-24 shadow-2xl shadow-primary/5">
            <h3 className="font-display text-lg font-bold text-white mb-8 uppercase tracking-tight">Booking Summary</h3>
            {showSummary && slot ? (
              <div className="space-y-8">
                <div className="space-y-5">
                  {[
                    { label: "Centre", val: centre.name.replace("Scooled — ", ""), icon: MapPin },
                    { label: "Date", val: selectedDate, icon: CalendarIcon },
                    { label: "Time", val: slot.time, icon: Clock, color: "text-primary" },
                    { label: "Type", val: slot.type, icon: Users },
                  ].map((item, id) => (
                    <div key={id} className="flex justify-between items-center group">
                      <div className="flex items-center gap-3">
                        <item.icon size={14} className="text-white/20 group-hover:text-primary transition-colors" />
                        <span className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em]">{item.label}</span>
                      </div>
                      <span className={`text-sm font-black tracking-tight ${item.color || "text-white"}`}>{item.val}</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-8 border-t border-white/10">
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">Grand Total</span>
                    <span className="text-4xl font-black text-white tracking-tighter">₹299</span>
                  </div>
                  <button 
                    className={`w-full py-5 rounded-2xl ${buttonGradientClass} text-white text-[11px] font-black uppercase tracking-[0.25em] shadow-2xl shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.02] active:scale-95 transition-all`}
                    onClick={() => alert("Demo: Booking initiated!")}
                  >
                    Confirm Booking
                  </button>
                  <p className="text-[9px] text-white/20 text-center mt-6 font-bold flex items-center justify-center gap-2">
                    <CheckCircle2 size={10} /> Secure Encryption Enabled
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 px-6">
                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center mx-auto mb-6">
                  <AlertCircle size={32} className="text-white/10" />
                </div>
                <p className="text-sm text-white/40 font-medium leading-relaxed">Please select a time slot to view your reservation summary.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
