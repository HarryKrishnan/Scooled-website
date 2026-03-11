import { coaches } from "@/data/mockData";
import { Search, Plus, Trash2, X, Check, Award } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Coach = {
  id: string;
  name: string;
  specialization: string;
  avatar: string;
  certifications: string[];
  email?: string;
  phone?: string;
};

export default function AdminCoaches() {
  const [search, setSearch] = useState("");
  const [coachList, setCoachList] = useState<Coach[]>(coaches);
  const [deleteMode, setDeleteMode] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCoach, setEditingCoach] = useState<Coach | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    email: "",
    phone: "",
    certifications: "",
  });

  const filtered = coachList.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  const handleAddNew = () => {
    setEditingCoach(null);
    setFormData({
      name: "",
      specialization: "",
      email: "",
      phone: "",
      certifications: "",
    });
    setDialogOpen(true);
  };

  const handleEdit = (coach: Coach) => {
    setEditingCoach(coach);
    setFormData({
      name: coach.name,
      specialization: coach.specialization,
      email: coach.email || "",
      phone: coach.phone || "",
      certifications: coach.certifications.join(", "),
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    const certArray = formData.certifications.split(",").map(c => c.trim()).filter(Boolean);
    
    if (editingCoach) {
      setCoachList(coachList.map(c => 
        c.id === editingCoach.id ? { 
          ...c, 
          name: formData.name,
          specialization: formData.specialization,
          email: formData.email,
          phone: formData.phone,
          certifications: certArray 
        } : c
      ));
    } else {
      const newCoach: Coach = {
        id: `co${Date.now()}`,
        name: formData.name,
        specialization: formData.specialization,
        avatar: "",
        certifications: certArray,
        email: formData.email,
        phone: formData.phone,
      };
      setCoachList([...coachList, newCoach]);
    }
    setDialogOpen(false);
  };

  const handleDelete = () => {
    setCoachList(coachList.filter(c => !selected.includes(c.id)));
    setSelected([]);
    setDeleteMode(false);
  };

  const toggleSelect = (id: string) => {
    setSelected(selected.includes(id) ? selected.filter(s => s !== id) : [...selected, id]);
  };

  const toggleDeleteMode = () => {
    setDeleteMode(!deleteMode);
    setSelected([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="font-display text-3xl font-bold text-navy">Coaches</h1>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-2.5 text-navy/60" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search coaches..." className="pl-10 pr-4 py-2 rounded-xl border border-navy/10 bg-white/60 backdrop-blur-sm text-sm w-64 focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors text-sm font-bold shadow-lg shadow-primary/20"
          >
            <Plus size={16} />
            Add
          </button>
          <button
            onClick={toggleDeleteMode}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors text-sm font-bold ${
              deleteMode
                ? "bg-destructive text-white hover:bg-destructive/90"
                : "bg-white/60 text-navy border border-navy/10 hover:bg-white/80"
            }`}
          >
            {deleteMode ? <X size={16} /> : <Trash2 size={16} />}
            {deleteMode ? "Cancel" : "Delete"}
          </button>
          {deleteMode && selected.length > 0 && (
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-destructive text-white hover:bg-destructive/90 transition-colors text-sm font-bold"
            >
              <Check size={16} />
              Delete ({selected.length})
            </button>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {["All", "Competitive Swimming", "Kids Learn to Swim", "Adult Fitness"].map((spec) => (
          <div key={spec} className="card-premium text-center hover:-translate-y-1 transition-all duration-300">
            <p className="text-2xl font-bold text-navy">
              {spec === "All" ? coachList.length : coachList.filter(c => c.specialization === spec).length}
            </p>
            <p className="text-xs text-navy/60 mt-1">{spec}</p>
          </div>
        ))}
      </div>

      <div className="card-premium overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-navy/10">
              {deleteMode && <th className="text-left py-2.5 w-10"></th>}
              {["Name", "Specialization", "Contact", "Certifications", ""].map((h) => (
                <th key={h} className="text-left py-2.5 text-xs text-navy/60 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-b border-navy/5 hover:bg-white/40 transition-colors">
                {deleteMode && (
                  <td className="py-2.5">
                    <input
                      type="checkbox"
                      checked={selected.includes(c.id)}
                      onChange={() => toggleSelect(c.id)}
                      className="w-4 h-4 rounded border-navy/20 text-primary focus:ring-primary/20"
                    />
                  </td>
                )}
                <td className="py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">{c.name.charAt(0)}</div>
                    <span className="font-medium text-navy">{c.name}</span>
                  </div>
                </td>
                <td className="py-2.5 text-navy/60">{c.specialization}</td>
                <td className="py-2.5 text-navy/60 text-xs">
                  {c.email && <div>{c.email}</div>}
                  {c.phone && <div>{c.phone}</div>}
                  {!c.email && !c.phone && <span className="text-navy/40">Not provided</span>}
                </td>
                <td className="py-2.5">
                  <div className="flex flex-wrap gap-1">
                    {c.certifications.map((cert, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-aqua/10 text-aqua font-medium">
                        <Award size={10} />
                        {cert}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-2.5">
                  {!deleteMode && (
                    <button
                      onClick={() => handleEdit(c)}
                      className="text-xs px-3 py-1 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white/95 backdrop-blur-xl border-navy/10">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-navy">
              {editingCoach ? "Edit Coach" : "Add New Coach"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-navy/80 text-sm font-medium">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter full name"
                className="rounded-xl border-navy/10 bg-white/60"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialization" className="text-navy/80 text-sm font-medium">Specialization</Label>
              <Input
                id="specialization"
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                placeholder="e.g., Competitive Swimming"
                className="rounded-xl border-navy/10 bg-white/60"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-navy/80 text-sm font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@example.com"
                className="rounded-xl border-navy/10 bg-white/60"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-navy/80 text-sm font-medium">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 XXXXX XXXXX"
                className="rounded-xl border-navy/10 bg-white/60"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="certifications" className="text-navy/80 text-sm font-medium">
                Certifications <span className="text-navy/40 text-xs">(comma-separated)</span>
              </Label>
              <Input
                id="certifications"
                value={formData.certifications}
                onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
                placeholder="e.g., FINA Level 2, CPR Certified"
                className="rounded-xl border-navy/10 bg-white/60"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} className="rounded-xl">
              Cancel
            </Button>
            <Button onClick={handleSave} className="rounded-xl bg-primary text-white hover:bg-primary/90">
              {editingCoach ? "Save Changes" : "Add Coach"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
