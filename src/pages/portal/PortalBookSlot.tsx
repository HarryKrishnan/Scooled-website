import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, Calendar as CalendarIcon, Clock, Users, CheckCircle2, AlertCircle } from "lucide-react";
import { centres, slots } from "@/data/mockData";

export default function PortalBookSlot() {
  const [selectedCentre, setSelectedCentre] = useState(centres[0].id);
  const [selectedDate, setSelectedDate] = useState("2025-03-10");
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);

  const centre = centres.find((c) => c.id === selectedCentre)!;
  const slot = slots.find((s) => s.id === selectedSlot);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-3xl font-bold text-white tracking-tight">Book Slots</h1>
        <p className="text-sm text-white/50 font-medium">Select your centre, date, and preferred time to reserve a session.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Centre Selection */}
          <div className="card-premium">
            <h3 className="text-sm font-black uppercase tracking-widest text-primary/60 mb-6 flex items-center gap-2">
              <MapPin size={18} /> Select Centre
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {centres.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCentre(c.id)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all duration-300 ${
                    selectedCentre === c.id 
                      ? "border-primary bg-primary/20 shadow-lg shadow-primary/10" 
                      : "border-white/5 bg-white/5 hover:border-white/20"
                  }`}
                >
                  <p className="font-bold text-white text-sm">{c.name}</p>
                  <p className="text-xs text-white/40 mt-1">{c.address}</p>
                  <p className="text-xs text-primary font-black uppercase tracking-widest mt-2">{c.pools} pools</p>
                </button>
              ))}
            </div>
          </div>

          {/* Date Selection */}
          <div className="card-premium">
            <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <CalendarIcon size={18} className="text-primary" /> Select Date
            </h3>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm"
            />
          </div>

          {/* Slots */}
          <div className="card-premium">
            <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Clock size={18} className="text-primary" /> Available Slots
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {slots.map((s) => {
                const full = s.booked >= s.capacity;
                const avail = s.capacity - s.booked;
                return (
                  <button
                    key={s.id}
                    disabled={full}
                    onClick={() => { setSelectedSlot(s.id); setShowSummary(true); }}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      full
                        ? "border-border/50 opacity-50 cursor-not-allowed"
                        : selectedSlot === s.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    <p className="font-semibold text-foreground text-sm">{s.time}</p>
                    <p className="text-xs text-muted-foreground mt-1">{s.type}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <Users size={12} className={full ? "text-destructive" : "text-primary"} />
                      <span className={`text-xs font-medium ${full ? "text-destructive" : "text-primary"}`}>
                        {full ? "Full" : `${avail} spots left`}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5 mt-1.5">
                      <div
                        className={`h-1.5 rounded-full ${full ? "bg-destructive" : avail <= 3 ? "bg-gold" : "bg-primary"}`}
                        style={{ width: `${(s.booked / s.capacity) * 100}%` }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Summary Panel */}
        <div className="lg:col-span-1">
          <div className="card-premium sticky top-20">
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">Booking Summary</h3>
            {showSummary && slot ? (
              <div className="space-y-6">
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between items-center"><span className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Centre</span><span className="font-bold text-white">{centre.name.replace("Scooled — ", "")}</span></div>
                  <div className="flex justify-between items-center"><span className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Date</span><span className="font-bold text-white">{selectedDate}</span></div>
                  <div className="flex justify-between items-center"><span className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Time</span><span className="font-bold text-primary">{slot.time}</span></div>
                  <div className="flex justify-between items-center"><span className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Type</span><span className="font-bold text-white">{slot.type}</span></div>
                </div>
                <hr className="border-white/10" />
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-sm font-medium">Amount</span>
                  <span className="text-2xl font-black text-white">₹299</span>
                </div>
                <button className="btn-primary w-full flex items-center justify-center gap-2 py-4 shadow-xl shadow-primary/20" onClick={() => alert("Demo: Booking confirmed!")}>
                  <CheckCircle2 size={18} /> Confirm Booking
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertCircle size={32} className="text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Select a slot to see your booking summary</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
