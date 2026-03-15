import { programs, offers, coaches } from "@/data/mockData";
import {
  Search, Plus, Trash2, X, Check, ChevronDown, ChevronRight,
  SlidersHorizontal, BookOpen, Tag
} from "lucide-react";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// ── Types ─────────────────────────────────────────────────────────────────────
type Program = {
  id: string; title: string; ageGroup: string; level: string; coach: string;
  schedule: string; time: string; duration: string; capacity: number;
  enrolled: number; price: number; image: string; totalSessions: number;
  status: string; description?: string;
};
type Offer = {
  id: string; title: string; parentProgramId: string; coach: string;
  schedule: string; time: string; duration: string; price: number;
  image: string; totalSessions: number; status: string; description?: string;
};
type EntityType = "program" | "offer";

// ── Local extra programs & offers for non-Swimming sports (no mockData.ts edit) ─
const LOCAL_PROGRAMS: Program[] = [
  // Futsal
  { id: "lp1", title: "Futsal Juniors", ageGroup: "6–12 years", level: "Beginner", coach: "Arjun Menon", schedule: "Tue, Thu", time: "4:00 PM – 5:00 PM", duration: "60 min", capacity: 16, enrolled: 11, price: 2800, image: "", totalSessions: 20, status: "Active", description: "Fundamentals of futsal for young players." },
  { id: "lp2", title: "Futsal Elite", ageGroup: "14–20 years", level: "Advanced", coach: "Arjun Menon", schedule: "Mon, Wed, Fri", time: "6:00 PM – 7:30 PM", duration: "90 min", capacity: 12, enrolled: 9, price: 5500, image: "", totalSessions: 36, status: "Active", description: "Advanced futsal training for competitive players." },
  { id: "lp3", title: "Futsal Weekend Blitz", ageGroup: "All Ages", level: "Intermediate", coach: "Priya Sharma", schedule: "Sat, Sun", time: "9:00 AM – 11:00 AM", duration: "120 min", capacity: 20, enrolled: 14, price: 3200, image: "", totalSessions: 16, status: "Draft", description: "Weekend futsal drills and match play." },
  // Table Tennis
  { id: "lp4", title: "TT Beginners", ageGroup: "8–15 years", level: "Beginner", coach: "Priya Sharma", schedule: "Mon, Wed", time: "3:30 PM – 4:30 PM", duration: "60 min", capacity: 10, enrolled: 7, price: 2200, image: "", totalSessions: 24, status: "Active", description: "Introduction to table tennis strokes and footwork." },
  { id: "lp5", title: "TT Competitive Track", ageGroup: "12–25 years", level: "Advanced", coach: "Rahul Das", schedule: "Tue, Thu, Sat", time: "5:00 PM – 7:00 PM", duration: "120 min", capacity: 8, enrolled: 6, price: 7000, image: "", totalSessions: 48, status: "Active", description: "Tournament preparation and advanced spin techniques." },
  { id: "lp6", title: "TT Fitness Camp", ageGroup: "18+ years", level: "All Levels", coach: "Priya Sharma", schedule: "Sat", time: "8:00 AM – 10:00 AM", duration: "120 min", capacity: 12, enrolled: 5, price: 1800, image: "", totalSessions: 8, status: "Draft", description: "Cardio and agility training combined with TT drills." },
  // Pickleball
  { id: "lp7", title: "Pickleball Intro", ageGroup: "All Ages", level: "Beginner", coach: "Rahul Das", schedule: "Mon, Wed, Fri", time: "7:00 AM – 8:00 AM", duration: "60 min", capacity: 14, enrolled: 10, price: 2500, image: "", totalSessions: 20, status: "Active", description: "Learn the basics of pickleball in a fun environment." },
  { id: "lp8", title: "Pickleball Pro League", ageGroup: "18+ years", level: "Intermediate", coach: "Arjun Menon", schedule: "Tue, Thu", time: "6:30 PM – 8:00 PM", duration: "90 min", capacity: 16, enrolled: 12, price: 4200, image: "", totalSessions: 28, status: "Active", description: "Strategy drills and competitive doubles play." },
  { id: "lp9", title: "Pickleball Weekend Warriors", ageGroup: "30+ years", level: "All Levels", coach: "Rahul Das", schedule: "Sat, Sun", time: "6:00 AM – 7:30 AM", duration: "90 min", capacity: 20, enrolled: 8, price: 3000, image: "", totalSessions: 12, status: "Draft", description: "Early morning weekend sessions for adult players." },
];

const LOCAL_OFFERS: Offer[] = [
  // Futsal
  { id: "lo1", title: "Futsal Summer League", parentProgramId: "lp1", coach: "Arjun Menon", schedule: "Mon–Fri", time: "10:00 AM – 12:00 PM", duration: "120 min", price: 6999, image: "", totalSessions: 10, status: "Active", description: "Intensive summer league for young futsal players." },
  { id: "lo2", title: "Futsal Trial Day", parentProgramId: "lp2", coach: "Priya Sharma", schedule: "Sat", time: "10:00 AM – 11:00 AM", duration: "60 min", price: 499, image: "", totalSessions: 1, status: "Active", description: "One-day trial session before enrolling." },
  // Table Tennis
  { id: "lo3", title: "TT School Holiday Camp", parentProgramId: "lp4", coach: "Priya Sharma", schedule: "Mon–Fri", time: "9:00 AM – 12:00 PM", duration: "180 min", price: 7500, image: "", totalSessions: 5, status: "Active", description: "Intensive holiday camp for young TT enthusiasts." },
  { id: "lo4", title: "TT Open Day", parentProgramId: "lp5", coach: "Rahul Das", schedule: "Sun", time: "11:00 AM – 1:00 PM", duration: "120 min", price: 599, image: "", totalSessions: 1, status: "Draft", description: "Free-play open day to experience the sport." },
  // Pickleball
  { id: "lo5", title: "Pickleball Starter Pack", parentProgramId: "lp7", coach: "Rahul Das", schedule: "Sat, Sun", time: "7:00 AM – 8:00 AM", duration: "60 min", price: 1999, image: "", totalSessions: 4, status: "Active", description: "Kick-start pack for brand-new pickleball players." },
  { id: "lo6", title: "Pickleball Corporate", parentProgramId: "lp8", coach: "Arjun Menon", schedule: "Fri", time: "5:00 PM – 7:00 PM", duration: "120 min", price: 8999, image: "", totalSessions: 4, status: "Draft", description: "Custom corporate team-building pickleball session." },
];

// ── Sport mapping ──────────────────────────────────────────────────────────────
const INIT_PROGRAM_SPORT: Record<string, string> = {
  p1: "Swimming", p2: "Swimming", p3: "Swimming",
  p4: "Swimming", p5: "Swimming", p6: "Swimming",
  lp1: "Futsal",  lp2: "Futsal",  lp3: "Futsal",
  lp4: "Table Tennis", lp5: "Table Tennis", lp6: "Table Tennis",
  lp7: "Pickleball",   lp8: "Pickleball",   lp9: "Pickleball",
};
const INIT_OFFER_SPORT: Record<string, string> = {
  o1: "Swimming", o2: "Swimming", o3: "Swimming",
  lo1: "Futsal",  lo2: "Futsal",
  lo3: "Table Tennis", lo4: "Table Tennis",
  lo5: "Pickleball",   lo6: "Pickleball",
};

const ALL_SPORTS = ["All", "Swimming", "Futsal", "Table Tennis", "Pickleball"] as const;
const ALL_LEVELS = ["Beginner", "Intermediate", "Advanced", "All Levels"] as const;
const ALL_STATUSES_PROG = ["Active", "Draft", "Archived"] as const;
const ALL_AGE_GROUPS = ["Kids (≤12)", "Youth (13–17)", "Adult (18+)", "All Ages"] as const;

const sportEmoji: Record<string, string> = {
  Swimming: "🏊", Futsal: "⚽", "Table Tennis": "🏓", Pickleball: "🥒", All: "🏅",
};
const sportDot: Record<string, string> = {
  Swimming: "bg-cyan-400", Futsal: "bg-emerald-400",
  "Table Tennis": "bg-violet-400", Pickleball: "bg-amber-400",
};
const statusColor = (s: string) =>
  s === "Active"   ? "bg-green-500/20 text-green-400 border-green-500/30"
  : s === "Draft"  ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
  : s === "Archived" ? "bg-red-500/20 text-red-400 border-red-500/30"
  : "bg-white/10 text-white/50 border-white/10";

const levelColor = (l: string) =>
  l === "Beginner"     ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
  : l === "Intermediate" ? "bg-orange-500/20 text-orange-400 border-orange-500/30"
  : l === "Advanced"   ? "bg-red-500/20 text-red-400 border-red-500/30"
  : "bg-white/10 text-white/50 border-white/10";

// ── FilterRow shared component ────────────────────────────────────────────────
function FilterRow({ label, active, color, emoji, onClick }:
  { label: string; active: boolean; color?: string; emoji?: string; onClick: () => void }) {
  return (
    <div onClick={onClick} className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl border cursor-pointer transition-all select-none ${active ? (color ?? "bg-amber-500/20 text-amber-400 border-amber-500/30") : "border-white/10 hover:bg-white/5 text-white/70"}`}>
      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${active ? "border-current" : "border-white/30"}`}>
        {active && <Check size={9} strokeWidth={3} />}
      </div>
      <span className="text-sm font-medium">{emoji && <span className="mr-1.5">{emoji}</span>}{label}</span>
    </div>
  );
}

// ── Blank form state factory ──────────────────────────────────────────────────
function blankForm(type: EntityType, programList: Program[]) {
  return {
    title: "", ageGroup: "", level: "Beginner",
    coach: coaches[0]?.name || "", schedule: "", time: "", duration: "",
    capacity: 10, enrolled: 0, price: 0, totalSessions: 12, status: "Active",
    description: "", parentProgramId: programList[0]?.id || "",
  };
}

// ═════════════════════════ MAIN COMPONENT ════════════════════════════════════
export default function AdminPrograms() {
  const [programList, setProgramList] = useState<Program[]>([...programs, ...LOCAL_PROGRAMS]);
  const [offerList, setOfferList]     = useState<Offer[]>([...offers, ...LOCAL_OFFERS]);
  const [programSportMap, setProgramSportMap] = useState<Record<string, string>>(INIT_PROGRAM_SPORT);
  const [offerSportMap, setOfferSportMap]     = useState<Record<string, string>>(INIT_OFFER_SPORT);

  // Controls
  const [search, setSearch]               = useState("");
  const [selectedSport, setSelectedSport] = useState<string>("All");
  const [deleteMode, setDeleteMode]       = useState(false);
  const [selProgs, setSelProgs]           = useState<string[]>([]);
  const [selOffers, setSelOffers]         = useState<string[]>([]);

  // Accordion — mutually exclusive
  const [openSection, setOpenSection] = useState<"programs" | "offers">("programs");
  const toggleSection = (section: "programs" | "offers") =>
    setOpenSection(section);

  // Filter popup
  const [filterOpen, setFilterOpen]       = useState(false);
  const [filterStatus, setFilterStatus]   = useState("");
  const [filterLevel, setFilterLevel]     = useState("");
  const [filterAgeGroup, setFilterAgeGroup] = useState("");
  const activeFilterCount = (filterStatus ? 1 : 0) + (filterLevel ? 1 : 0) + (filterAgeGroup ? 1 : 0);
  const clearFilters = () => { setFilterStatus(""); setFilterLevel(""); setFilterAgeGroup(""); };

  // Right panel
  const [selectedItem, setSelectedItem]   = useState<{ type: EntityType; item: Program | Offer } | null>(null);
  const [createMode, setCreateMode]       = useState<EntityType | null>(null);
  const [formData, setFormData]           = useState(blankForm("program", programList));

  // ── Derived lists ──────────────────────────────────────────────────────────
  const filteredPrograms = programList.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchSport  = selectedSport === "All" || programSportMap[p.id] === selectedSport;
    const matchStatus = !filterStatus || p.status === filterStatus;
    const matchLevel  = !filterLevel  || p.level === filterLevel;
    const matchAge    = !filterAgeGroup; // age-group filter is cosmetic for now
    return matchSearch && matchSport && matchStatus && matchLevel && matchAge;
  });
  const filteredOffers = offerList.filter((o) => {
    const matchSearch = o.title.toLowerCase().includes(search.toLowerCase());
    const matchSport  = selectedSport === "All" || offerSportMap[o.id] === selectedSport;
    const matchStatus = !filterStatus || o.status === filterStatus;
    return matchSearch && matchSport && matchStatus;
  });

  // ── CRUD helpers ───────────────────────────────────────────────────────────
  const openCreate = (type: EntityType) => {
    setCreateMode(type);
    setSelectedItem(null);
    setFormData(blankForm(type, programList));
  };
  const openEdit = (type: EntityType, item: Program | Offer) => {
    setSelectedItem({ type, item });
    setCreateMode(null);
    if (type === "program") {
      const p = item as Program;
      setFormData({ title: p.title, ageGroup: p.ageGroup, level: p.level, coach: p.coach, schedule: p.schedule, time: p.time, duration: p.duration, capacity: p.capacity, enrolled: p.enrolled, price: p.price, totalSessions: p.totalSessions, status: p.status, description: p.description || "", parentProgramId: "" });
    } else {
      const o = item as Offer;
      setFormData({ title: o.title, ageGroup: "", level: "Beginner", coach: o.coach, schedule: o.schedule, time: o.time, duration: o.duration, capacity: 0, enrolled: 0, price: o.price, totalSessions: o.totalSessions, status: o.status, description: o.description || "", parentProgramId: o.parentProgramId });
    }
  };
  const handleCancel = () => { setSelectedItem(null); setCreateMode(null); };

  const handleSave = () => {
    const type = selectedItem?.type ?? createMode;
    if (!type) return;
    if (type === "program") {
      if (selectedItem) {
        setProgramList(programList.map(p => p.id === selectedItem.item.id ? { ...p, ...formData } : p));
      } else {
        const id = `p${Date.now()}`;
        setProgramList([...programList, { id, image: "", ...formData }]);
        setProgramSportMap({ ...programSportMap, [id]: selectedSport === "All" ? "Swimming" : selectedSport });
      }
    } else {
      if (selectedItem) {
        setOfferList(offerList.map(o => o.id === selectedItem.item.id ? { ...o, ...formData } : o));
      } else {
        const id = `o${Date.now()}`;
        setOfferList([...offerList, { id, image: "", ...formData }]);
        setOfferSportMap({ ...offerSportMap, [id]: selectedSport === "All" ? "Swimming" : selectedSport });
      }
    }
    handleCancel();
  };

  const handleDelete = () => {
    setProgramList(programList.filter(p => !selProgs.includes(p.id)));
    setOfferList(offerList.filter(o => !selOffers.includes(o.id)));
    setSelProgs([]); setSelOffers([]); setDeleteMode(false);
  };

  const getParentName = (id: string) => programList.find(p => p.id === id)?.title ?? "—";
  const activeRightType = selectedItem?.type ?? createMode;

  // ══════════════════════════ RENDER ═════════════════════════════════════════
  return (
    <div className="flex flex-col gap-4" style={{ height: "calc(100vh - 88px)" }}>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shrink-0">
        <h1 className="font-display text-4xl font-bold text-white">Programs & Offers</h1>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Sport picker */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-white/80 text-sm font-semibold hover:bg-white/15 transition-colors">
                <span>{sportEmoji[selectedSport] ?? "🏅"}</span>
                {selectedSport}
                <ChevronDown size={14} className="text-white/50" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black/95 backdrop-blur-xl border-white/10 text-white min-w-[160px]">
              {ALL_SPORTS.map((s) => (
                <DropdownMenuItem key={s} onClick={() => setSelectedSport(s)} className={`cursor-pointer gap-2 ${selectedSport === s ? "text-amber-400" : "text-white/80"}`}>
                  <span>{sportEmoji[s]}</span> {s}
                  {selectedSport === s && <Check size={12} className="ml-auto text-amber-400" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Search */}
          <div className="relative">
            <Search size={15} className="absolute left-3 top-2.5 text-white/50" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..."
              className="pl-9 pr-4 py-2 rounded-xl border border-white/10 bg-white/10 backdrop-blur-sm text-sm w-44 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-white placeholder:text-white/40" />
          </div>

          {/* Filter */}
          <button onClick={() => setFilterOpen(true)} className={`relative flex items-center gap-2 px-3 py-2 rounded-xl transition-colors text-sm font-bold border ${activeFilterCount > 0 ? "bg-amber-500/20 text-amber-400 border-amber-500/30" : "bg-white/10 text-white/70 border-white/10 hover:bg-white/15"}`}>
            <SlidersHorizontal size={14} /> Filters
            {activeFilterCount > 0 && <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-amber-500 text-navy text-[10px] font-black flex items-center justify-center">{activeFilterCount}</span>}
          </button>

          {/* Create */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-9 h-9 rounded-xl bg-amber-500 text-navy hover:bg-amber-600 transition-colors flex items-center justify-center shadow-lg shadow-amber-500/20" title="Create">
                <Plus size={17} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black/95 backdrop-blur-xl border-white/10 text-white">
              <DropdownMenuItem onClick={() => openCreate("program")} className="cursor-pointer gap-2 text-white/80">
                <BookOpen size={14} /> Create Program
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => openCreate("offer")} className="cursor-pointer gap-2 text-white/80">
                <Tag size={14} /> Create Offer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Delete */}
          <button onClick={() => { setDeleteMode(!deleteMode); setSelProgs([]); setSelOffers([]); }}
            title={deleteMode ? "Cancel" : "Delete"}
            className={`w-9 h-9 rounded-xl transition-colors flex items-center justify-center text-sm font-bold ${deleteMode ? "bg-red-500 text-white" : "bg-white/10 text-white border border-white/10 hover:bg-white/20"}`}>
            {deleteMode ? <X size={16} /> : <Trash2 size={16} />}
          </button>
          {deleteMode && (selProgs.length + selOffers.length) > 0 && (
            <button onClick={handleDelete} className="w-9 h-9 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors flex items-center justify-center font-bold" title={`Delete ${selProgs.length + selOffers.length} items`}>
              <Check size={16} />
            </button>
          )}
        </div>
      </div>

      {/* ── Split panel ────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-12 gap-4 flex-1 min-h-0">

        {/* LEFT — Accordion tiles */}
        <div className="col-span-5 flex flex-col gap-3 min-h-0 overflow-hidden">

          {/* Programs tile */}
          <div className={`bg-black/95 backdrop-blur-3xl rounded-[2rem] border border-white/20 shadow-2xl flex flex-col transition-all duration-300 ${openSection === "programs" ? "flex-1 min-h-0 overflow-hidden" : "shrink-0"}`}>
            <button
              onClick={() => toggleSection("programs")}
              className="w-full flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <BookOpen size={16} className="text-cyan-400" />
                <span className="font-display font-bold text-white text-base">Programs</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60 font-semibold">{filteredPrograms.length}</span>
              </div>
              {openSection === "programs" ? <ChevronDown size={16} className="text-amber-400" /> : <ChevronRight size={16} className="text-white/40" />}
            </button>

            {openSection === "programs" && (
              <div className="border-t border-white/10 overflow-y-auto admin-scroll flex-1">
                {filteredPrograms.length === 0 && (
                  <p className="text-center text-white/30 text-sm py-8">No programs match the current filters.</p>
                )}
                {filteredPrograms.map((p, idx) => {
                  const sport = programSportMap[p.id] ?? "Swimming";
                  const isSelected = selectedItem?.item.id === p.id;
                  return (
                    <div
                      key={p.id}
                      onClick={() => !deleteMode && openEdit("program", p)}
                      className={`flex items-start gap-3 px-6 py-4 border-b border-white/5 transition-all cursor-pointer ${
                        isSelected ? "bg-amber-500/10 border-l-2 border-l-amber-500" : "hover:bg-white/5"
                      } ${idx === filteredPrograms.length - 1 ? "border-b-0" : ""}`}
                    >
                      {deleteMode && (
                        <input type="checkbox" checked={selProgs.includes(p.id)}
                          onChange={() => setSelProgs(prev => prev.includes(p.id) ? prev.filter(s => s !== p.id) : [...prev, p.id])}
                          onClick={e => e.stopPropagation()}
                          className="mt-1 w-4 h-4 rounded border-white/20 text-amber-500 shrink-0" />
                      )}
                      <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${sportDot[sport] ?? "bg-white/40"}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-white text-sm leading-snug">{p.title}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${statusColor(p.status)}`}>{p.status}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${levelColor(p.level)}`}>{p.level}</span>
                        </div>
                        <p className="text-xs text-white/50 mt-0.5">{p.ageGroup} · {p.schedule}</p>
                        <p className="text-[11px] text-white/40 mt-0.5">{p.enrolled}/{p.capacity} enrolled · ₹{p.price.toLocaleString()}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Offers tile */}
          <div className={`bg-black/95 backdrop-blur-3xl rounded-[2rem] border border-white/20 shadow-2xl flex flex-col transition-all duration-300 ${openSection === "offers" ? "flex-1 min-h-0 overflow-hidden" : "shrink-0"}`}>
            <button
              onClick={() => toggleSection("offers")}
              className="w-full flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Tag size={16} className="text-amber-400" />
                <span className="font-display font-bold text-white text-base">Special Offers</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60 font-semibold">{filteredOffers.length}</span>
              </div>
              {openSection === "offers" ? <ChevronDown size={16} className="text-amber-400" /> : <ChevronRight size={16} className="text-white/40" />}
            </button>

            {openSection === "offers" && (
              <div className="border-t border-white/10 overflow-y-auto admin-scroll flex-1">
                {filteredOffers.length === 0 && (
                  <p className="text-center text-white/30 text-sm py-8">No offers match the current filters.</p>
                )}
                {filteredOffers.map((o, idx) => {
                  const sport = offerSportMap[o.id] ?? "Swimming";
                  const isSelected = selectedItem?.item.id === o.id;
                  return (
                    <div
                      key={o.id}
                      onClick={() => !deleteMode && openEdit("offer", o)}
                      className={`flex items-start gap-3 px-6 py-4 border-b border-white/5 transition-all cursor-pointer ${
                        isSelected ? "bg-amber-500/10 border-l-2 border-l-amber-500" : "hover:bg-white/5"
                      } ${idx === filteredOffers.length - 1 ? "border-b-0" : ""}`}
                    >
                      {deleteMode && (
                        <input type="checkbox" checked={selOffers.includes(o.id)}
                          onChange={() => setSelOffers(prev => prev.includes(o.id) ? prev.filter(s => s !== o.id) : [...prev, o.id])}
                          onClick={e => e.stopPropagation()}
                          className="mt-1 w-4 h-4 rounded border-white/20 text-amber-500 shrink-0" />
                      )}
                      <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${sportDot[sport] ?? "bg-amber-400"}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-white text-sm leading-snug">{o.title}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${statusColor(o.status)}`}>{o.status}</span>
                        </div>
                        <p className="text-xs text-white/50 mt-0.5">{getParentName(o.parentProgramId)} · {o.schedule}</p>
                        <p className="text-[11px] text-white/40 mt-0.5">₹{o.price.toLocaleString()} · {o.totalSessions} sessions</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT — Inline form panel */}
        <div className="col-span-7 min-h-0 admin-scroll overflow-y-auto">
          {/* ── Right panel ── */}
          {!activeRightType ? (
            /* Empty state */
            <div className="bg-black/95 backdrop-blur-3xl rounded-[2rem] border border-white/20 shadow-2xl h-full flex flex-col items-center justify-center gap-4 text-center px-8">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                <BookOpen size={28} className="text-white/20" />
              </div>
              <p className="text-white/40 text-sm leading-relaxed">
                Select a program or offer to edit,<br />or create a new one.
              </p>
              <div className="flex gap-2 mt-2">
                <button onClick={() => openCreate("program")} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 text-sm font-semibold hover:bg-amber-500/30 transition-colors">
                  <Plus size={14} /> New Program
                </button>
                <button onClick={() => openCreate("offer")} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-white/60 border border-white/10 text-sm font-semibold hover:bg-white/10 transition-colors">
                  <Plus size={14} /> New Offer
                </button>
              </div>
            </div>
          ) : (
            /* Form panel */
            <div className="bg-black/95 backdrop-blur-3xl rounded-[2rem] border border-white/20 shadow-2xl overflow-hidden" style={{ background: 'rgba(8,8,8,0.97)' }}>
              {/* Form header */}
              <div className="flex items-center justify-between px-7 py-5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-black uppercase tracking-widest text-white/40">
                    {createMode ? "CREATE —" : "EDIT —"}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-white/30">
                    {activeRightType === "program" ? "Program" : "Offer"}
                  </span>
                </div>
                <span className="text-sm font-bold text-amber-400 uppercase tracking-wide truncate max-w-[200px]">
                  {formData.title || (createMode ? "NEW " + activeRightType?.toUpperCase() : "")}
                </span>
              </div>

              {/* Form body */}
              <div className="px-7 py-6 space-y-5" style={{ background: 'rgba(8,8,8,0.97)' }}>
                {/* Row 1 */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-[11px] text-white/40 uppercase tracking-widest font-semibold">Name</Label>
                    <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Enter name" className="rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/20 h-11 focus:bg-white/8 focus:border-amber-500/40 transition-colors" />
                  </div>
                  {activeRightType === "program" ? (
                    <div className="space-y-1.5">
                      <Label className="text-[11px] text-white/40 uppercase tracking-widest font-semibold">Level</Label>
                      <Select value={formData.level} onValueChange={(v) => setFormData({ ...formData, level: v })}>
                        <SelectTrigger className="rounded-xl border border-white/10 bg-white/5 text-white h-11 hover:bg-white/8 transition-colors"><SelectValue /></SelectTrigger>
                        <SelectContent className="bg-[#111] border-white/10 text-white">
                          {ALL_LEVELS.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <Label className="text-[11px] text-white/40 uppercase tracking-widest font-semibold">Parent Program</Label>
                      <Select value={formData.parentProgramId} onValueChange={(v) => setFormData({ ...formData, parentProgramId: v })}>
                        <SelectTrigger className="rounded-xl border border-white/10 bg-white/5 text-white h-11 hover:bg-white/8 transition-colors"><SelectValue /></SelectTrigger>
                        <SelectContent className="bg-[#111] border-white/10 text-white">
                          {programList.map((p) => <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <Label className="text-[11px] text-white/40 uppercase tracking-widest font-semibold">Description</Label>
                  <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Enter description..." rows={3} className="rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/20 resize-none focus:border-amber-500/40 transition-colors" />
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-2 gap-4">
                  {activeRightType === "program" ? (
                    <div className="space-y-1.5">
                      <Label className="text-[11px] text-white/40 uppercase tracking-widest font-semibold">Age Range</Label>
                      <Input value={formData.ageGroup} onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })} placeholder="e.g. 4–8 years" className="rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/20 h-11 focus:border-amber-500/40 transition-colors" />
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <Label className="text-[11px] text-white/40 uppercase tracking-widest font-semibold">Total Sessions</Label>
                      <Input type="number" value={formData.totalSessions} onChange={(e) => setFormData({ ...formData, totalSessions: parseInt(e.target.value) || 0 })} className="rounded-xl border border-white/10 bg-white/5 text-white h-11 focus:border-amber-500/40 transition-colors" />
                    </div>
                  )}
                  <div className="space-y-1.5">
                    <Label className="text-[11px] text-white/40 uppercase tracking-widest font-semibold">Coach</Label>
                    <Select value={formData.coach} onValueChange={(v) => setFormData({ ...formData, coach: v })}>
                      <SelectTrigger className="rounded-xl border border-white/10 bg-white/5 text-white h-11 hover:bg-white/8 transition-colors"><SelectValue /></SelectTrigger>
                      <SelectContent className="bg-[#111] border-white/10 text-white">
                        {coaches.map((c) => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Row 4 */}
                <div className="grid grid-cols-2 gap-4">
                  {activeRightType === "program" && (
                    <div className="space-y-1.5">
                      <Label className="text-[11px] text-white/40 uppercase tracking-widest font-semibold">Capacity</Label>
                      <Input type="number" value={formData.capacity} onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 0 })} className="rounded-xl border border-white/10 bg-white/5 text-white h-11 focus:border-amber-500/40 transition-colors" />
                    </div>
                  )}
                  <div className="space-y-1.5">
                    <Label className="text-[11px] text-white/40 uppercase tracking-widest font-semibold">Duration (min)</Label>
                    <Input value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} placeholder="e.g. 60 min" className="rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/20 h-11 focus:border-amber-500/40 transition-colors" />
                  </div>
                </div>

                {/* Row 5 */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-[11px] text-white/40 uppercase tracking-widest font-semibold">Schedule</Label>
                    <Input value={formData.schedule} onChange={(e) => setFormData({ ...formData, schedule: e.target.value })} placeholder="Mon, Wed, Fri" className="rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/20 h-11 focus:border-amber-500/40 transition-colors" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[11px] text-white/40 uppercase tracking-widest font-semibold">Start Time</Label>
                    <Input value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} placeholder="7:00 AM" className="rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/20 h-11 focus:border-amber-500/40 transition-colors" />
                  </div>
                </div>

                {/* Row 6 */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-[11px] text-white/40 uppercase tracking-widest font-semibold">Fee (₹/mo)</Label>
                    <Input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })} className="rounded-xl border border-white/10 bg-white/5 text-white h-11 focus:border-amber-500/40 transition-colors" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[11px] text-white/40 uppercase tracking-widest font-semibold">Status</Label>
                    <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v })}>
                      <SelectTrigger className="rounded-xl border border-white/10 bg-white/5 text-white h-11 hover:bg-white/8 transition-colors"><SelectValue /></SelectTrigger>
                      <SelectContent className="bg-[#111] border-white/10 text-white">
                        {ALL_STATUSES_PROG.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Form footer */}
              <div className="px-7 py-5 border-t border-white/10 flex items-center justify-end gap-3">
                <button onClick={handleCancel} className="px-5 py-2.5 rounded-xl border border-white/10 text-white/60 text-sm hover:bg-white/5 transition-colors font-medium">
                  Cancel
                </button>
                <button onClick={handleSave} className="px-6 py-2.5 rounded-xl bg-amber-500 text-navy text-sm font-bold hover:bg-amber-600 transition-colors shadow-lg shadow-amber-500/20">
                  {createMode ? `Create ${activeRightType === "program" ? "Program" : "Offer"}` : "Save Changes"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Filter popup ────────────────────────────────────────────────────── */}
      <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
        <DialogContent className="w-[min(460px,90vw)] max-h-[85vh] bg-black/95 backdrop-blur-3xl border border-white/15 rounded-[2rem] shadow-2xl p-0 gap-0 overflow-hidden">
          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/10">
            <DialogTitle className="font-display text-lg font-bold text-white flex items-center gap-2 m-0">
              <SlidersHorizontal size={17} className="text-amber-400" />
              Filter Programs & Offers
            </DialogTitle>
            <button onClick={() => setFilterOpen(false)} className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors text-white/60">
              <X size={14} />
            </button>
          </div>

          <div className="px-6 py-5 space-y-5 overflow-y-auto admin-scroll" style={{ maxHeight: "calc(85vh - 140px)" }}>
            {/* Status */}
            <div>
              <p className="text-[11px] text-white/40 uppercase tracking-widest font-semibold mb-2.5">Status</p>
              <div className="grid grid-cols-3 gap-2">
                {ALL_STATUSES_PROG.map((s) => (
                  <FilterRow key={s} label={s} active={filterStatus === s} color={statusColor(s)} onClick={() => setFilterStatus(filterStatus === s ? "" : s)} />
                ))}
              </div>
            </div>
            {/* Level */}
            <div>
              <p className="text-[11px] text-white/40 uppercase tracking-widest font-semibold mb-2.5">Level</p>
              <div className="grid grid-cols-2 gap-2">
                {ALL_LEVELS.map((l) => (
                  <FilterRow key={l} label={l} active={filterLevel === l} color={levelColor(l)} onClick={() => setFilterLevel(filterLevel === l ? "" : l)} />
                ))}
              </div>
            </div>
            {/* Age Group */}
            <div>
              <p className="text-[11px] text-white/40 uppercase tracking-widest font-semibold mb-2.5">Age Group</p>
              <div className="grid grid-cols-2 gap-2">
                {ALL_AGE_GROUPS.map((a) => (
                  <FilterRow key={a} label={a} active={filterAgeGroup === a} onClick={() => setFilterAgeGroup(filterAgeGroup === a ? "" : a)} />
                ))}
              </div>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-white/10 flex items-center gap-3">
            {activeFilterCount > 0 && (
              <button onClick={clearFilters} className="px-4 py-2.5 rounded-xl border border-white/10 text-white/60 text-sm hover:bg-white/5 transition-colors font-medium">Clear All</button>
            )}
            <button onClick={() => setFilterOpen(false)} className="flex-1 py-2.5 rounded-xl bg-amber-500 text-navy text-sm font-bold hover:bg-amber-600 transition-colors">
              Show {filteredPrograms.length + filteredOffers.length} Result{(filteredPrograms.length + filteredOffers.length) !== 1 ? "s" : ""}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
