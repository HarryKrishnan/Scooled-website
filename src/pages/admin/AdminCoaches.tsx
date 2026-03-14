import { coaches } from "@/data/mockData";
import { Search, Plus, Trash2, X, Check, Award, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ALL_SPORTS = ["Swimming", "Futsal", "Table Tennis", "Pickleball"] as const;
const ALL_STATUSES_COACH = ["Active", "Inactive"] as const;

const sportColors: Record<string, string> = {
  Swimming:       "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  Futsal:         "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "Table Tennis": "bg-violet-500/20 text-violet-400 border-violet-500/30",
  Pickleball:     "bg-amber-500/20 text-amber-400 border-amber-500/30",
};
const sportEmoji: Record<string, string> = {
  Swimming: "🏊", Futsal: "⚽", "Table Tennis": "🏓", Pickleball: "🥒",
};
const tileBorderHover = ["hover:border-orange-tile", "hover:border-teal-tile", "hover:border-yellow-tile", "hover:border-blue-tile", "hover:border-green-tile"];

type Coach = {
  id: string; name: string; specialization: string; avatar: string;
  certifications: string[]; sports: string[]; status: string; email?: string; phone?: string;
};

// ── Shared filter row ─────────────────────────────────────────────────────────
function FilterRow({ label, active, color, emoji, onClick }:
  { label: string; active: boolean; color?: string; emoji?: string; onClick: () => void }) {
  return (
    <div onClick={onClick} className={`flex items-center gap-3 px-4 py-3 rounded-2xl border cursor-pointer transition-all select-none ${
      active ? (color ?? "bg-amber-500/20 text-amber-400 border-amber-500/30") : "border-white/10 hover:bg-white/5 text-white/70"
    }`}>
      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${active ? "border-current" : "border-white/30"}`}>
        {active && <Check size={9} strokeWidth={3} />}
      </div>
      <span className="text-sm font-medium">{emoji && <span className="mr-1.5">{emoji}</span>}{label}</span>
    </div>
  );
}

export default function AdminCoaches() {
  const [search, setSearch]         = useState("");
  const [coachList, setCoachList]   = useState<Coach[]>(coaches as Coach[]);
  const [deleteMode, setDeleteMode] = useState(false);
  const [selected, setSelected]     = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCoach, setEditingCoach] = useState<Coach | null>(null);

  const [filterSports, setFilterSports] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState("");

  const [formData, setFormData] = useState({
    name: "", specialization: "", email: "", phone: "",
    certifications: "", sports: [] as string[], status: "Active",
  });

  // Summary tiles
  const summaryTiles = [
    { label: "All", value: coachList.length, emoji: "👥" },
    ...ALL_SPORTS.map((sport) => ({ label: sport, value: coachList.filter((c) => c.sports?.includes(sport)).length, emoji: sportEmoji[sport] })),
  ];

  const filtered = coachList.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchSport  = filterSports.length === 0 || filterSports.every((s) => c.sports?.includes(s));
    const matchStatus = !filterStatus || (c.status ?? "Active") === filterStatus;
    return matchSearch && matchSport && matchStatus;
  });

  const activeFilterCount = filterSports.length + (filterStatus ? 1 : 0);
  const clearFilters = () => { setFilterSports([]); setFilterStatus(""); };
  const toggleFs = (sport: string) =>
    setFilterSports((p) => p.includes(sport) ? p.filter((s) => s !== sport) : [...p, sport]);

  const handleAddNew = () => {
    setEditingCoach(null);
    setFormData({ name: "", specialization: "", email: "", phone: "", certifications: "", sports: [], status: "Active" });
    setDialogOpen(true);
  };
  const handleEdit = (c: Coach) => {
    setEditingCoach(c);
    setFormData({ name: c.name, specialization: c.specialization, email: c.email || "", phone: c.phone || "", certifications: c.certifications.join(", "), sports: c.sports ?? [], status: c.status ?? "Active" });
    setDialogOpen(true);
  };
  const handleSave = () => {
    const certArray = formData.certifications.split(",").map((s) => s.trim()).filter(Boolean);
    editingCoach
      ? setCoachList(coachList.map((c) => c.id === editingCoach.id ? { ...c, ...formData, certifications: certArray } : c))
      : setCoachList([...coachList, { id: `co${Date.now()}`, avatar: "", ...formData, certifications: certArray }]);
    setDialogOpen(false);
  };
  const handleDelete = () => { setCoachList(coachList.filter((c) => !selected.includes(c.id))); setSelected([]); setDeleteMode(false); };
  const toggleSelect = (id: string) => setSelected((p) => p.includes(id) ? p.filter((s) => s !== id) : [...p, id]);
  const toggleDeleteMode = () => { setDeleteMode(!deleteMode); setSelected([]); };
  const toggleFormSport = (sport: string) =>
    setFormData((p) => ({ ...p, sports: p.sports.includes(sport) ? p.sports.filter((s) => s !== sport) : [...p.sports, sport] }));

  return (
    <div className="flex flex-col gap-4" style={{ height: "calc(100vh - 88px)" }}>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shrink-0">
        <h1 className="font-display text-4xl font-bold text-white">Coaches</h1>
        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={() => setFilterOpen(true)} className={`relative flex items-center gap-2 px-3 py-2 rounded-xl transition-colors text-sm font-bold border ${activeFilterCount > 0 ? "bg-amber-500/20 text-amber-400 border-amber-500/30" : "bg-white/10 text-white/70 border-white/10 hover:bg-white/15"}`}>
            <SlidersHorizontal size={15} />
            Filters
            {activeFilterCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-amber-500 text-navy text-[10px] font-black flex items-center justify-center">{activeFilterCount}</span>
            )}
          </button>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-2.5 text-white/60" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search coaches..."
              className="pl-10 pr-4 py-2 rounded-xl border border-white/10 bg-white/10 backdrop-blur-sm text-sm w-52 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-white placeholder:text-white/40" />
          </div>
          <button onClick={handleAddNew} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 text-navy hover:bg-amber-600 transition-colors text-sm font-bold shadow-lg shadow-amber-500/20">
            <Plus size={16} /> Add
          </button>
          <button onClick={toggleDeleteMode} className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors text-sm font-bold ${deleteMode ? "bg-red-500 text-white hover:bg-red-600" : "bg-white/10 text-white border border-white/10 hover:bg-white/20"}`}>
            {deleteMode ? <X size={16} /> : <Trash2 size={16} />}
            {deleteMode ? "Cancel" : "Delete"}
          </button>
          {deleteMode && selected.length > 0 && (
            <button onClick={handleDelete} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors text-sm font-bold">
              <Check size={16} /> Delete ({selected.length})
            </button>
          )}
        </div>
      </div>

      {/* ── Summary tiles — TOP ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-5 gap-3 shrink-0">
        {summaryTiles.map((tile, idx) => (
          <div
            key={tile.label}
            onClick={() => tile.label === "All" ? clearFilters() : toggleFs(tile.label)}
            className={`bg-black/95 backdrop-blur-3xl rounded-[1.75rem] p-4 border border-white/20 shadow-xl transition-all duration-300 cursor-pointer text-center hover:-translate-y-1 ${tileBorderHover[idx % tileBorderHover.length]} ${
              tile.label !== "All" && filterSports.includes(tile.label) ? "border-amber-500/40 bg-amber-500/5" : ""
            }`}
          >
            <p className="text-xl font-bold text-white">{tile.value}</p>
            <p className="text-[11px] text-white/50 mt-0.5 leading-tight">{tile.label}</p>
            <p className="text-base mt-1">{tile.emoji}</p>
          </div>
        ))}
      </div>

      {/* Active filter chips */}
      {activeFilterCount > 0 && (
        <div className="flex items-center gap-2 flex-wrap shrink-0 -mt-1">
          {filterSports.map((s) => (
            <span key={s} className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border font-semibold ${sportColors[s]}`}>
              {sportEmoji[s]} {s} <button onClick={() => toggleFs(s)} className="ml-0.5 opacity-70 hover:opacity-100"><X size={10} /></button>
            </span>
          ))}
          {filterStatus && (
            <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border font-semibold ${filterStatus === "Active" ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-red-500/20 text-red-400 border-red-500/30"}`}>
              {filterStatus} <button onClick={() => setFilterStatus("")} className="ml-0.5 opacity-70 hover:opacity-100"><X size={10} /></button>
            </span>
          )}
          <button onClick={clearFilters} className="text-xs text-white/40 hover:text-white/60 underline transition-colors">Clear all</button>
          <span className="text-xs text-white/30">· {filtered.length} of {coachList.length}</span>
        </div>
      )}

      {/* ── Coach table — fills remaining space ──────────────────────────────── */}
      <div className="bg-black/95 backdrop-blur-3xl rounded-[2rem] border border-white/20 shadow-2xl flex flex-col flex-1 min-h-0 overflow-hidden">
        <div className="overflow-x-auto admin-scroll flex-1">
          <table className="w-full text-sm">
            <thead className="sticky top-0 z-10" style={{ background: "rgba(5,5,5,0.98)" }}>
              <tr className="border-b border-white/10">
                {deleteMode && <th className="text-left py-3 pl-6 w-10" />}
                {["Name", "Specialization", "Sports Trained", "Contact", "Certifications", "Status", ""].map((h) => (
                  <th key={h} className={`text-left py-3 text-xs text-white/40 font-semibold uppercase tracking-wider pr-4 ${h === "Name" && !deleteMode ? "pl-6" : ""}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  {deleteMode && (
                    <td className="py-3 pl-6">
                      <input type="checkbox" checked={selected.includes(c.id)} onChange={() => toggleSelect(c.id)} className="w-4 h-4 rounded border-white/20 text-amber-500 focus:ring-amber-500/20" />
                    </td>
                  )}
                  <td className={`py-3 pr-4 ${!deleteMode ? "pl-6" : ""}`}>
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-xs font-bold shrink-0">{c.name.charAt(0)}</div>
                      <span className="font-medium text-white whitespace-nowrap">{c.name}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-white/70 text-sm">{c.specialization}</td>
                  <td className="py-3 pr-4">
                    <div className="flex flex-wrap gap-1">
                      {(c.sports ?? []).map((sport) => (
                        <span key={sport} className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border font-semibold ${sportColors[sport] ?? "bg-white/10 text-white/60 border-white/20"}`}>
                          {sportEmoji[sport]} {sport}
                        </span>
                      ))}
                      {(!c.sports || c.sports.length === 0) && <span className="text-white/25 text-xs">—</span>}
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-white/60 text-xs">
                    {c.email && <div>{c.email}</div>}
                    {c.phone && <div>{c.phone}</div>}
                    {!c.email && !c.phone && <span className="text-white/30">Not provided</span>}
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex flex-wrap gap-1">
                      {c.certifications.map((cert, i) => (
                        <span key={i} className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-400 border border-teal-500/30 font-semibold">
                          <Award size={10} /> {cert}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${(c.status ?? "Active") === "Active" ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-red-500/20 text-red-400 border-red-500/30"}`}>
                      {c.status ?? "Active"}
                    </span>
                  </td>
                  <td className="py-3 pr-6">
                    {!deleteMode && (
                      <button onClick={() => handleEdit(c)} className="text-xs px-3 py-1 rounded-lg bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 transition-colors font-medium">Edit</button>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="py-16 text-center text-white/30 text-sm">
                  No coaches match the current filters.
                  {activeFilterCount > 0 && <button onClick={clearFilters} className="ml-2 text-amber-400 hover:underline font-semibold">Clear filters</button>}
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Filter popup ─────────────────────────────────────────────────────── */}
      <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
        <DialogContent className="w-[min(420px,88vw)] max-h-[80vh] bg-black/95 backdrop-blur-3xl border border-white/15 rounded-[2rem] shadow-2xl p-0 gap-0 overflow-hidden">
          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/10">
            <DialogTitle className="font-display text-lg font-bold text-white flex items-center gap-2 m-0">
              <SlidersHorizontal size={18} className="text-amber-400" />
              Filter Coaches
            </DialogTitle>
            <button onClick={() => setFilterOpen(false)} className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors text-white/60">
              <X size={15} />
            </button>
          </div>

          <div className="px-6 py-4 space-y-5 overflow-y-auto admin-scroll" style={{ maxHeight: "calc(80vh - 140px)" }}>
            <div>
              <p className="text-[11px] text-white/40 uppercase tracking-widest font-semibold mb-2.5">Sport Coached</p>
              <div className="grid grid-cols-2 gap-2">
                {ALL_SPORTS.map((sport) => (
                  <FilterRow key={sport} label={sport} emoji={sportEmoji[sport]} active={filterSports.includes(sport)} color={sportColors[sport]} onClick={() => toggleFs(sport)} />
                ))}
              </div>
            </div>
            <div>
              <p className="text-[11px] text-white/40 uppercase tracking-widest font-semibold mb-2.5">Coach Status</p>
              <div className="grid grid-cols-2 gap-2">
                {ALL_STATUSES_COACH.map((s) => {
                  const color = s === "Active" ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-red-500/20 text-red-400 border-red-500/30";
                  return <FilterRow key={s} label={s} active={filterStatus === s} color={color} onClick={() => setFilterStatus(filterStatus === s ? "" : s)} />;
                })}
              </div>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-white/10 flex items-center gap-3">
            {activeFilterCount > 0 && (
              <button onClick={clearFilters} className="px-4 py-2.5 rounded-xl border border-white/10 text-white/60 text-sm hover:bg-white/5 transition-colors font-medium">Clear All</button>
            )}
            <button onClick={() => setFilterOpen(false)} className="flex-1 py-2.5 rounded-xl bg-amber-500 text-navy text-sm font-bold hover:bg-amber-600 transition-colors">
              Show {filtered.length} Result{filtered.length !== 1 ? "s" : ""}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Add / Edit Dialog ───────────────────────────────────────────────── */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[520px] bg-black/95 backdrop-blur-xl border-white/10 rounded-[2rem]">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-white">{editingCoach ? "Edit Coach" : "Add New Coach"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2"><Label className="text-white/80 text-sm font-medium">Name</Label><Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Enter full name" className="rounded-xl border-white/10 bg-white/10 text-white placeholder:text-white/40" /></div>
            <div className="space-y-2"><Label className="text-white/80 text-sm font-medium">Specialization</Label><Input value={formData.specialization} onChange={(e) => setFormData({ ...formData, specialization: e.target.value })} placeholder="e.g., Competitive Swimming" className="rounded-xl border-white/10 bg-white/10 text-white placeholder:text-white/40" /></div>
            <div className="space-y-2">
              <Label className="text-white/80 text-sm font-medium">Sports Trained</Label>
              <div className="flex flex-wrap gap-2">
                {ALL_SPORTS.map((sport) => (
                  <button key={sport} type="button" onClick={() => toggleFormSport(sport)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${formData.sports.includes(sport) ? sportColors[sport] : "bg-white/5 text-white/40 border-white/10 hover:bg-white/10"}`}>
                    {sportEmoji[sport]} {sport}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label className="text-white/80 text-sm font-medium">Email</Label><Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="email@example.com" className="rounded-xl border-white/10 bg-white/10 text-white placeholder:text-white/40" /></div>
              <div className="space-y-2"><Label className="text-white/80 text-sm font-medium">Phone</Label><Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+91 XXXXX XXXXX" className="rounded-xl border-white/10 bg-white/10 text-white placeholder:text-white/40" /></div>
            </div>
            <div className="space-y-2">
              <Label className="text-white/80 text-sm font-medium">Certifications <span className="text-white/30 text-xs">(comma-separated)</span></Label>
              <Input value={formData.certifications} onChange={(e) => setFormData({ ...formData, certifications: e.target.value })} placeholder="e.g., FINA Level 2, CPR Certified" className="rounded-xl border-white/10 bg-white/10 text-white placeholder:text-white/40" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} className="rounded-xl border-white/10 text-white hover:bg-white/10">Cancel</Button>
            <Button onClick={handleSave} className="rounded-xl bg-amber-500 text-navy hover:bg-amber-600">{editingCoach ? "Save Changes" : "Add Coach"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
