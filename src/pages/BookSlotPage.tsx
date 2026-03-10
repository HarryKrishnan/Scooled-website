import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, Calendar as CalendarIcon, Clock, Users, CheckCircle2, AlertCircle } from "lucide-react";
import { centres, slots } from "@/data/mockData";

export default function BookSlotPage() {
  const [selectedCentre, setSelectedCentre] = useState(centres[0].id);
  const [selectedDate, setSelectedDate] = useState("2025-03-10");
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);

  const centre = centres.find((c) => c.id === selectedCentre)!;
  const slot = slots.find((s) => s.id === selectedSlot);

  return (
    <>
      <section className="pt-32 pb-16 bg-navy text-primary-foreground">
        <div className="container-custom text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl md:text-5xl font-bold mb-4">Book a Slot</motion.h1>
          <p className="text-lg text-primary-foreground/70">Select your centre, date, and preferred time.</p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Centre Selection */}
              <div className="card-premium">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <MapPin size={18} className="text-primary" /> Select Centre
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {centres.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCentre(c.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        selectedCentre === c.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                      }`}
                    >
                      <p className="font-semibold text-foreground text-sm">{c.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{c.address}</p>
                      <p className="text-xs text-primary mt-1">{c.pools} pools</p>
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
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
              <div className="card-premium sticky top-24">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">Booking Summary</h3>
                {showSummary && slot ? (
                  <div className="space-y-4">
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between"><span className="text-muted-foreground">Centre</span><span className="font-medium text-foreground">{centre.name.replace("Scooled Aquatics — ", "")}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="font-medium text-foreground">{selectedDate}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Time</span><span className="font-medium text-foreground">{slot.time}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Type</span><span className="font-medium text-foreground">{slot.type}</span></div>
                    </div>
                    <hr className="border-border" />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-sm">Amount</span>
                      <span className="text-xl font-bold text-foreground">₹299</span>
                    </div>
                    <button className="btn-primary w-full text-center" onClick={() => alert("Demo: Booking confirmed!")}>
                      <CheckCircle2 className="inline mr-2" size={16} /> Confirm Booking
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
      </section>
    </>
  );
}
