import { customers } from "@/data/mockData";
import { Search, Plus, Trash2, X, Check, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ALL_SPORTS = ["Swimming", "Futsal", "Table Tennis", "Pickleball"] as const;
const ALL_MEMBERSHIPS = ["Monthly", "Quarterly", "Half-Yearly", "Annual", "None"] as const;
const ALL_STATUSES = ["Active", "Expired", "Trial"] as const;

const sportColors: Record<string, string> = {
  Swimming:       "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  Futsal:         "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "Table Tennis": "bg-violet-500/20 text-violet-400 border-violet-500/30",
  Pickleball:     "bg-amber-500/20 text-amber-400 border-amber-500/30",
};
const sportEmoji: Record<string, string> = {
  Swimming: "🏊", Futsal: "⚽", "Table Tennis": "🏓", Pickleball: "🥒",
};

type Customer = {
  id: string; name: string; email: string; phone: string;
  membership: string; status: string; joinDate: string; sports: string[];
};

// ── Reusable filter row ──────────────────────────────────────────────────────
function FilterRow({
  label, active, color, emoji, onClick,
}: { label: string; active: boolean; color?: string; emoji?: string; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-2xl border cursor-pointer transition-all select-none ${
        active ? (color ?? "bg-amber-500/20 text-amber-400 border-amber-500/30") : "border-white/10 hover:bg-white/5 text-white/70"
      }`}
    >
      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
        active ? "border-current" : "border-white/30 bg-transparent"
      }`}>
        {active && <Check size={9} strokeWidth={3} />}
      </div>
      <span className="text-sm font-medium">
        {emoji && <span className="mr-1.5">{emoji}</span>}
        {label}
      </span>
    </div>
  );
}

export default function AdminCustomers() {
  const [search, setSearch]           = useState("");
  const [customerList, setCustomerList] = useState<Customer[]>(customers as Customer[]);
  const [deleteMode, setDeleteMode]   = useState(false);
  const [selected, setSelected]       = useState<string[]>([]);
  const [filterOpen, setFilterOpen]   = useState(false);
  const [dialogOpen, setDialogOpen]   = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  const [filterSports, setFilterSports]       = useState<string[]>([]);
  const [filterMembership, setFilterMembership] = useState("");
  const [filterStatus, setFilterStatus]       = useState("");

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "",
    membership: "Monthly", status: "Active",
    joinDate: new Date().toISOString().split("T")[0],
    sports: [] as string[],
  });

  const filtered = customerList.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchSport  = filterSports.length === 0 || filterSports.every((s) => c.sports?.includes(s));
    const matchMem    = !filterMembership || c.membership === filterMembership;
    const matchStat   = !filterStatus || c.status === filterStatus;
    return matchSearch && matchSport && matchMem && matchStat;
  });

  const activeFilterCount = filterSports.length + (filterMembership ? 1 : 0) + (filterStatus ? 1 : 0);
  const clearFilters = () => { setFilterSports([]); setFilterMembership(""); setFilterStatus(""); };
  const toggleFs = (sport: string) =>
    setFilterSports((p) => p.includes(sport) ? p.filter((s) => s !== sport) : [...p, sport]);

  const handleAddNew = () => {
    setEditingCustomer(null);
    setFormData({ name: "", email: "", phone: "", membership: "Monthly", status: "Active", joinDate: new Date().toISOString().split("T")[0], sports: [] });
    setDialogOpen(true);
  };
  const handleEdit = (c: Customer) => {
    setEditingCustomer(c);
    setFormData({ name: c.name, email: c.email, phone: c.phone, membership: c.membership, status: c.status, joinDate: c.joinDate, sports: c.sports ?? [] });
    setDialogOpen(true);
  };
  const handleSave = () => {
    editingCustomer
      ? setCustomerList(customerList.map((c) => c.id === editingCustomer.id ? { ...c, ...formData } : c))
      : setCustomerList([...customerList, { id: `cu${Date.now()}`, ...formData }]);
    setDialogOpen(false);
  };
  const handleDelete = () => { setCustomerList(customerList.filter((c) => !selected.includes(c.id))); setSelected([]); setDeleteMode(false); };
  const toggleSelect = (id: string) => setSelected((p) => p.includes(id) ? p.filter((s) => s !== id) : [...p, id]);
  const toggleDeleteMode = () => { setDeleteMode(!deleteMode); setSelected([]); };
  const toggleFormSport = (sport: string) =>
    setFormData((p) => ({ ...p, sports: p.sports.includes(sport) ? p.sports.filter((s) => s !== sport) : [...p.sports, sport] }));

  return (
    <div className="flex flex-col gap-4" style={{ height: "calc(100vh - 88px)" }}>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shrink-0">
        <h1 className="font-display text-4xl font-bold text-white">Customers</h1>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setFilterOpen(true)}
            className={`relative flex items-center gap-2 px-3 py-2 rounded-xl transition-colors text-sm font-bold border ${
              activeFilterCount > 0 ? "bg-amber-500/20 text-amber-400 border-amber-500/30" : "bg-white/10 text-white/70 border-white/10 hover:bg-white/15"
            }`}
          >
            <SlidersHorizontal size={15} />
            Filters
            {activeFilterCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-amber-500 text-navy text-[10px] font-black flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-2.5 text-white/60" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search customers..."
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

      {/* Active filter chips */}
      {activeFilterCount > 0 && (
        <div className="flex items-center gap-2 flex-wrap shrink-0 -mt-1">
          {filterSports.map((s) => (
            <span key={s} className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border font-semibold ${sportColors[s]}`}>
              {sportEmoji[s]} {s}
              <button onClick={() => toggleFs(s)} className="ml-0.5 opacity-70 hover:opacity-100"><X size={10} /></button>
            </span>
          ))}
          {filterMembership && (
            <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border font-semibold bg-amber-500/20 text-amber-400 border-amber-500/30">
              {filterMembership} <button onClick={() => setFilterMembership("")} className="ml-0.5 opacity-70 hover:opacity-100"><X size={10} /></button>
            </span>
          )}
          {filterStatus && (
            <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border font-semibold ${filterStatus === "Active" ? "bg-green-500/20 text-green-400 border-green-500/30" : filterStatus === "Expired" ? "bg-red-500/20 text-red-400 border-red-500/30" : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"}`}>
              {filterStatus} <button onClick={() => setFilterStatus("")} className="ml-0.5 opacity-70 hover:opacity-100"><X size={10} /></button>
            </span>
          )}
          <button onClick={clearFilters} className="text-xs text-white/40 hover:text-white/60 underline transition-colors">Clear all</button>
          <span className="text-xs text-white/30">· {filtered.length} of {customerList.length}</span>
        </div>
      )}

      {/* ── Table card — fills remaining space, internal scroll ─────────────── */}
      <div className="bg-black/95 backdrop-blur-3xl rounded-[2rem] border border-white/20 shadow-2xl flex flex-col flex-1 min-h-0 overflow-hidden">
        <div className="overflow-x-auto admin-scroll flex-1">
          <table className="w-full text-sm">
            <thead className="sticky top-0 z-10" style={{ background: "rgba(5,5,5,0.98)" }}>
              <tr className="border-b border-white/10">
                {deleteMode && <th className="text-left py-3 pl-6 w-10" />}
                {["Name", "Email", "Phone", "Membership", "Enrolled Sports", "Status", "Joined", ""].map((h) => (
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
                  <td className="py-3 pr-4 text-white/60 text-xs">{c.email}</td>
                  <td className="py-3 pr-4 text-white/60 text-xs whitespace-nowrap">{c.phone}</td>
                  <td className="py-3 pr-4 text-white/70 text-sm">{c.membership}</td>
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
                  <td className="py-3 pr-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                      c.status === "Active" ? "bg-green-500/20 text-green-400 border-green-500/30"
                        : c.status === "Expired" ? "bg-red-500/20 text-red-400 border-red-500/30"
                        : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                    }`}>{c.status}</span>
                  </td>
                  <td className="py-3 pr-4 text-white/60 text-xs whitespace-nowrap">{c.joinDate}</td>
                  <td className="py-3 pr-6">
                    {!deleteMode && (
                      <button onClick={() => handleEdit(c)} className="text-xs px-3 py-1 rounded-lg bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 transition-colors font-medium">Edit</button>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={9} className="py-16 text-center text-white/30 text-sm">
                  No customers match the current filters.
                  {activeFilterCount > 0 && <button onClick={clearFilters} className="ml-2 text-amber-400 hover:underline font-semibold">Clear filters</button>}
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Filter popup ────────────────────────────────────────────────────── */}
      <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
        <DialogContent className="w-[min(460px,90vw)] max-h-[85vh] bg-black/95 backdrop-blur-3xl border border-white/15 rounded-[2rem] shadow-2xl p-0 gap-0 overflow-hidden">
          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/10">
            <DialogTitle className="font-display text-lg font-bold text-white flex items-center gap-2 m-0">
              <SlidersHorizontal size={18} className="text-amber-400" />
              Filter Customers
            </DialogTitle>
            <button onClick={() => setFilterOpen(false)} className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors text-white/60">
              <X size={15} />
            </button>
          </div>

          <div className="px-6 py-4 space-y-5 overflow-y-auto admin-scroll" style={{ maxHeight: "calc(85vh - 140px)" }}>
            {/* Sport */}
            <div>
              <p className="text-[11px] text-white/40 uppercase tracking-widest font-semibold mb-2.5">Enrolled Sport</p>
              <div className="grid grid-cols-2 gap-2">
                {ALL_SPORTS.map((sport) => (
                  <FilterRow key={sport} label={sport} emoji={sportEmoji[sport]} active={filterSports.includes(sport)} color={sportColors[sport]} onClick={() => toggleFs(sport)} />
                ))}
              </div>
            </div>
            {/* Membership */}
            <div>
              <p className="text-[11px] text-white/40 uppercase tracking-widest font-semibold mb-2.5">Membership Plan</p>
              <div className="grid grid-cols-2 gap-2">
                {ALL_MEMBERSHIPS.map((m) => (
                  <FilterRow key={m} label={m} active={filterMembership === m} onClick={() => setFilterMembership(filterMembership === m ? "" : m)} />
                ))}
              </div>
            </div>
            {/* Status */}
            <div>
              <p className="text-[11px] text-white/40 uppercase tracking-widest font-semibold mb-2.5">Status</p>
              <div className="grid grid-cols-3 gap-2">
                {ALL_STATUSES.map((s) => {
                  const color = s === "Active" ? "bg-green-500/20 text-green-400 border-green-500/30"
                    : s === "Expired" ? "bg-red-500/20 text-red-400 border-red-500/30"
                    : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
                  return <FilterRow key={s} label={s} active={filterStatus === s} color={color} onClick={() => setFilterStatus(filterStatus === s ? "" : s)} />;
                })}
              </div>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-white/10 flex items-center gap-3">
            {activeFilterCount > 0 && (
              <button onClick={clearFilters} className="px-4 py-2.5 rounded-xl border border-white/10 text-white/60 text-sm hover:bg-white/5 transition-colors font-medium">
                Clear All
              </button>
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
            <DialogTitle className="font-display text-xl text-white">{editingCustomer ? "Edit Customer" : "Add New Customer"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2"><Label className="text-white/80 text-sm font-medium">Name</Label><Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Enter full name" className="rounded-xl border-white/10 bg-white/10 text-white placeholder:text-white/40" /></div>
            <div className="space-y-2"><Label className="text-white/80 text-sm font-medium">Email</Label><Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="email@example.com" className="rounded-xl border-white/10 bg-white/10 text-white placeholder:text-white/40" /></div>
            <div className="space-y-2"><Label className="text-white/80 text-sm font-medium">Phone</Label><Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+91 XXXXX XXXXX" className="rounded-xl border-white/10 bg-white/10 text-white placeholder:text-white/40" /></div>
            <div className="space-y-2">
              <Label className="text-white/80 text-sm font-medium">Enrolled Sports</Label>
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
              <div className="space-y-2">
                <Label className="text-white/80 text-sm font-medium">Membership</Label>
                <Select value={formData.membership} onValueChange={(v) => setFormData({ ...formData, membership: v })}>
                  <SelectTrigger className="rounded-xl border-white/10 bg-white/10 text-white"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-black/95 border-white/10 text-white">{ALL_MEMBERSHIPS.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-white/80 text-sm font-medium">Status</Label>
                <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v })}>
                  <SelectTrigger className="rounded-xl border-white/10 bg-white/10 text-white"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-black/95 border-white/10 text-white">{ALL_STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2"><Label className="text-white/80 text-sm font-medium">Join Date</Label><Input type="date" value={formData.joinDate} onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })} className="rounded-xl border-white/10 bg-white/10 text-white" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} className="rounded-xl border-white/10 text-white hover:bg-white/10">Cancel</Button>
            <Button onClick={handleSave} className="rounded-xl bg-amber-500 text-navy hover:bg-amber-600">{editingCustomer ? "Save Changes" : "Add Customer"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
