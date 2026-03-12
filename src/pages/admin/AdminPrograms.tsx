import { programs, offers, coaches } from "@/data/mockData";
import { Search, Plus, Trash2, X, Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type Program = {
  id: string;
  title: string;
  ageGroup: string;
  level: string;
  coach: string;
  schedule: string;
  time: string;
  duration: string;
  capacity: number;
  enrolled: number;
  price: number;
  image: string;
  totalSessions: number;
  status: string;
  description?: string;
};

type Offer = {
  id: string;
  title: string;
  parentProgramId: string;
  coach: string;
  schedule: string;
  time: string;
  duration: string;
  price: number;
  image: string;
  totalSessions: number;
  status: string;
  description?: string;
};

type EntityType = "program" | "offer";

export default function AdminPrograms() {
  const [search, setSearch] = useState("");
  const [programList, setProgramList] = useState<Program[]>(programs);
  const [offerList, setOfferList] = useState<Offer[]>(offers);
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);
  const [selectedOffers, setSelectedOffers] = useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [entityType, setEntityType] = useState<EntityType>("program");
  const [editingItem, setEditingItem] = useState<Program | Offer | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    ageGroup: "",
    level: "Beginner",
    coach: coaches[0]?.name || "",
    schedule: "",
    time: "",
    duration: "",
    capacity: 10,
    enrolled: 0,
    price: 0,
    totalSessions: 12,
    status: "Active",
    description: "",
    parentProgramId: "",
  });

  const filteredPrograms = programList.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
  const filteredOffers = offerList.filter((o) => o.title.toLowerCase().includes(search.toLowerCase()));

  const levelCounts = {
    all: programList.length,
    beginner: programList.filter(p => p.level === "Beginner").length,
    intermediate: programList.filter(p => p.level === "Intermediate").length,
    advanced: programList.filter(p => p.level === "Advanced").length,
  };

  const handleAddNew = (type: EntityType) => {
    setEntityType(type);
    setEditingItem(null);
    setFormData({
      title: "",
      ageGroup: "",
      level: "Beginner",
      coach: coaches[0]?.name || "",
      schedule: "",
      time: "",
      duration: "",
      capacity: 10,
      enrolled: 0,
      price: 0,
      totalSessions: 12,
      status: "Active",
      description: "",
      parentProgramId: programList[0]?.id || "",
    });
    setDialogOpen(true);
  };

  const handleEditProgram = (program: Program) => {
    setEntityType("program");
    setEditingItem(program);
    setFormData({
      title: program.title,
      ageGroup: program.ageGroup,
      level: program.level,
      coach: program.coach,
      schedule: program.schedule,
      time: program.time,
      duration: program.duration,
      capacity: program.capacity,
      enrolled: program.enrolled,
      price: program.price,
      totalSessions: program.totalSessions,
      status: program.status,
      description: program.description || "",
      parentProgramId: "",
    });
    setDialogOpen(true);
  };

  const handleEditOffer = (offer: Offer) => {
    setEntityType("offer");
    setEditingItem(offer);
    setFormData({
      title: offer.title,
      ageGroup: "",
      level: "Beginner",
      coach: offer.coach,
      schedule: offer.schedule,
      time: offer.time,
      duration: offer.duration,
      capacity: 0,
      enrolled: 0,
      price: offer.price,
      totalSessions: offer.totalSessions,
      status: offer.status,
      description: offer.description || "",
      parentProgramId: offer.parentProgramId,
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (entityType === "program") {
      if (editingItem) {
        setProgramList(programList.map(p => 
          p.id === editingItem.id ? { 
            ...p, 
            title: formData.title,
            ageGroup: formData.ageGroup,
            level: formData.level,
            coach: formData.coach,
            schedule: formData.schedule,
            time: formData.time,
            duration: formData.duration,
            capacity: formData.capacity,
            enrolled: formData.enrolled,
            price: formData.price,
            totalSessions: formData.totalSessions,
            status: formData.status,
            description: formData.description,
          } : p
        ));
      } else {
        const newProgram: Program = {
          id: `p${Date.now()}`,
          title: formData.title,
          ageGroup: formData.ageGroup,
          level: formData.level,
          coach: formData.coach,
          schedule: formData.schedule,
          time: formData.time,
          duration: formData.duration,
          capacity: formData.capacity,
          enrolled: formData.enrolled,
          price: formData.price,
          image: "",
          totalSessions: formData.totalSessions,
          status: formData.status,
          description: formData.description,
        };
        setProgramList([...programList, newProgram]);
      }
    } else {
      if (editingItem) {
        setOfferList(offerList.map(o => 
          o.id === editingItem.id ? { 
            ...o, 
            title: formData.title,
            parentProgramId: formData.parentProgramId,
            coach: formData.coach,
            schedule: formData.schedule,
            time: formData.time,
            duration: formData.duration,
            price: formData.price,
            totalSessions: formData.totalSessions,
            status: formData.status,
            description: formData.description,
          } : o
        ));
      } else {
        const newOffer: Offer = {
          id: `o${Date.now()}`,
          title: formData.title,
          parentProgramId: formData.parentProgramId,
          coach: formData.coach,
          schedule: formData.schedule,
          time: formData.time,
          duration: formData.duration,
          price: formData.price,
          image: "",
          totalSessions: formData.totalSessions,
          status: formData.status,
          description: formData.description,
        };
        setOfferList([...offerList, newOffer]);
      }
    }
    setDialogOpen(false);
  };

  const handleDeletePrograms = () => {
    setProgramList(programList.filter(p => !selectedPrograms.includes(p.id)));
    setSelectedPrograms([]);
    setDeleteMode(false);
  };

  const handleDeleteOffers = () => {
    setOfferList(offerList.filter(o => !selectedOffers.includes(o.id)));
    setSelectedOffers([]);
    setDeleteMode(false);
  };

  const toggleSelectProgram = (id: string) => {
    setSelectedPrograms(selectedPrograms.includes(id) ? selectedPrograms.filter(s => s !== id) : [...selectedPrograms, id]);
  };

  const toggleSelectOffer = (id: string) => {
    setSelectedOffers(selectedOffers.includes(id) ? selectedOffers.filter(s => s !== id) : [...selectedOffers, id]);
  };

  const toggleDeleteMode = () => {
    setDeleteMode(!deleteMode);
    setSelectedPrograms([]);
    setSelectedOffers([]);
  };

  const getParentProgramName = (parentId: string) => {
    const parent = programList.find(p => p.id === parentId);
    return parent ? parent.title : "Unknown Program";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="font-display text-3xl font-bold text-white">Programs & Offers</h1>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-2.5 text-white/60" />
            <input 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              placeholder="Search programs & offers..." 
              className="pl-10 pr-4 py-2 rounded-xl border border-white/10 bg-white/10 backdrop-blur-sm text-sm w-64 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-white placeholder:text-white/40" 
            />
          </div>
          
          {/* Split Create Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors text-sm font-bold shadow-lg shadow-primary/20">
                <Plus size={16} />
                Create
                <ChevronDown size={14} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-white/95 backdrop-blur-xl border-navy/10">
              <DropdownMenuItem onClick={() => handleAddNew("program")} className="cursor-pointer">
                <Plus size={14} className="mr-2" />
                Create Program
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAddNew("offer")} className="cursor-pointer">
                <Plus size={14} className="mr-2" />
                Create Offer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            onClick={toggleDeleteMode}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors text-sm font-bold ${
              deleteMode
                ? "bg-destructive text-white hover:bg-destructive/90"
                : "bg-white/10 text-white border border-white/10 hover:bg-white/20"
            }`}
          >
            {deleteMode ? <X size={16} /> : <Trash2 size={16} />}
            {deleteMode ? "Cancel" : "Delete"}
          </button>
          
          {deleteMode && (selectedPrograms.length > 0 || selectedOffers.length > 0) && (
            <button
              onClick={() => {
                if (selectedPrograms.length > 0) handleDeletePrograms();
                if (selectedOffers.length > 0) handleDeleteOffers();
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-destructive text-white hover:bg-destructive/90 transition-colors text-sm font-bold"
            >
              <Check size={16} />
              Delete ({selectedPrograms.length + selectedOffers.length})
            </button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-4 gap-4">
        {[
          { label: "All Programs", count: levelCounts.all },
          { label: "Beginner", count: levelCounts.beginner },
          { label: "Intermediate", count: levelCounts.intermediate },
          { label: "Advanced", count: levelCounts.advanced },
        ].map((stat) => (
          <div key={stat.label} className="card-premium text-center hover:-translate-y-1 transition-transform">
            <p className="text-2xl font-bold text-primary">{stat.count}</p>
            <p className="text-xs text-white/60 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Programs Table */}
      <div className="card-premium overflow-x-auto">
        <div className="mb-4 pb-2 border-b border-white/10">
          <h2 className="font-display text-lg font-bold text-white">Programs</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              {deleteMode && <th className="text-left py-2.5 w-10"></th>}
              {["Title", "Age Group", "Level", "Coach", "Schedule", "Capacity", "Price", "Sessions", "Status", ""].map((h) => (
                <th key={h} className="text-left py-2.5 text-xs text-white/40 font-semibold uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredPrograms.map((p) => (
              <tr key={p.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                {deleteMode && (
                  <td className="py-2.5">
                    <input
                      type="checkbox"
                      checked={selectedPrograms.includes(p.id)}
                      onChange={() => toggleSelectProgram(p.id)}
                      className="w-4 h-4 rounded border-white/20 text-primary focus:ring-primary/20"
                    />
                  </td>
                )}
                <td className="py-2.5">
                  <span className="font-medium text-white">{p.title}</span>
                </td>
                <td className="py-2.5 text-white/70 text-xs">{p.ageGroup}</td>
                <td className="py-2.5">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    p.level === "Beginner" ? "bg-blue-500/10 text-blue-500" :
                    p.level === "Intermediate" ? "bg-orange-500/10 text-orange-500" :
                    p.level === "Advanced" ? "bg-red-500/10 text-red-500" :
                    "bg-primary/10 text-primary"
                  }`}>{p.level}</span>
                </td>
                <td className="py-2.5 text-white/70 text-xs">{p.coach}</td>
                <td className="py-2.5 text-white/70 text-xs">
                  <div>{p.schedule}</div>
                  <div className="text-[10px] text-white/40">{p.time}</div>
                </td>
                <td className="py-2.5 text-white/70 text-xs">{p.enrolled}/{p.capacity}</td>
                <td className="py-2.5 text-white font-medium">₹{p.price}</td>
                <td className="py-2.5 text-white/70 text-xs">{p.totalSessions}</td>
                <td className="py-2.5">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    p.status === "Active" ? "bg-primary/10 text-primary" :
                    p.status === "Inactive" ? "bg-destructive/10 text-destructive" :
                    "bg-gold/10 text-gold"
                  }`}>{p.status}</span>
                </td>
                <td className="py-2.5">
                  {!deleteMode && (
                    <button
                      onClick={() => handleEditProgram(p)}
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

      {/* Offers Table */}
      <div className="card-premium overflow-x-auto">
        <div className="mb-4 pb-2 border-b border-white/10">
          <h2 className="font-display text-lg font-bold text-white">Special Offers</h2>
          <p className="text-xs text-white/60 mt-1">Independent special programs and limited-time offers</p>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              {deleteMode && <th className="text-left py-2.5 w-10"></th>}
              {["Title", "Parent Program", "Coach", "Schedule", "Price", "Sessions", "Status", ""].map((h) => (
                <th key={h} className="text-left py-2.5 text-xs text-white/40 font-semibold uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredOffers.map((o) => (
              <tr key={o.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                {deleteMode && (
                  <td className="py-2.5">
                    <input
                      type="checkbox"
                      checked={selectedOffers.includes(o.id)}
                      onChange={() => toggleSelectOffer(o.id)}
                      className="w-4 h-4 rounded border-white/20 text-primary focus:ring-primary/20"
                    />
                  </td>
                )}
                <td className="py-2.5">
                  <span className="font-medium text-white">{o.title}</span>
                </td>
                <td className="py-2.5 text-white/70 text-xs">{getParentProgramName(o.parentProgramId)}</td>
                <td className="py-2.5 text-white/70 text-xs">{o.coach}</td>
                <td className="py-2.5 text-white/70 text-xs">
                  <div>{o.schedule}</div>
                  <div className="text-[10px] text-white/40">{o.time}</div>
                </td>
                <td className="py-2.5 text-white font-medium">₹{o.price}</td>
                <td className="py-2.5 text-white/70 text-xs">{o.totalSessions}</td>
                <td className="py-2.5">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    o.status === "Active" ? "bg-primary/10 text-primary" :
                    o.status === "Inactive" ? "bg-destructive/10 text-destructive" :
                    "bg-gold/10 text-gold"
                  }`}>{o.status}</span>
                </td>
                <td className="py-2.5">
                  {!deleteMode && (
                    <button
                      onClick={() => handleEditOffer(o)}
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
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-[#1a1a1a] border-white/10">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-white">
              {editingItem ? `Edit ${entityType === "program" ? "Program" : "Offer"}` : `Create New ${entityType === "program" ? "Program" : "Offer"}`}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-white/80 text-sm font-medium">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter program title"
                className="rounded-xl border-white/10 bg-white/10 text-white placeholder:text-white/40"
              />
            </div>

            {entityType === "offer" && (
              <div className="space-y-2">
                <Label htmlFor="parentProgram" className="text-white/80 text-sm font-medium">Parent Program</Label>
                <Select value={formData.parentProgramId} onValueChange={(v) => setFormData({ ...formData, parentProgramId: v })}>
                  <SelectTrigger className="rounded-xl border-white/10 bg-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {programList.map((p) => (
                      <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {entityType === "program" && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ageGroup" className="text-white/80 text-sm font-medium">Age Group</Label>
                    <Input
                      id="ageGroup"
                      value={formData.ageGroup}
                      onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })}
                      placeholder="e.g., 4-8 years"
                      className="rounded-xl border-white/10 bg-white/10 text-white placeholder:text-white/40"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="level" className="text-white/80 text-sm font-medium">Level</Label>
                    <Select value={formData.level} onValueChange={(v) => setFormData({ ...formData, level: v })}>
                      <SelectTrigger className="rounded-xl border-white/10 bg-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                        <SelectItem value="All Levels">All Levels</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="capacity" className="text-white/80 text-sm font-medium">Capacity</Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={formData.capacity}
                      onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 0 })}
                      className="rounded-xl border-white/10 bg-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="enrolled" className="text-white/80 text-sm font-medium">Enrolled</Label>
                    <Input
                      id="enrolled"
                      type="number"
                      value={formData.enrolled}
                      onChange={(e) => setFormData({ ...formData, enrolled: parseInt(e.target.value) || 0 })}
                      className="rounded-xl border-white/10 bg-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalSessions" className="text-white/80 text-sm font-medium">Total Sessions</Label>
                    <Input
                      id="totalSessions"
                      type="number"
                      value={formData.totalSessions}
                      onChange={(e) => setFormData({ ...formData, totalSessions: parseInt(e.target.value) || 0 })}
                      className="rounded-xl border-white/10 bg-white/10 text-white"
                    />
                  </div>
                </div>
              </>
            )}

            {entityType === "offer" && (
              <div className="space-y-2">
                <Label htmlFor="totalSessions" className="text-white/80 text-sm font-medium">Total Sessions</Label>
                <Input
                  id="totalSessions"
                  type="number"
                  value={formData.totalSessions}
                  onChange={(e) => setFormData({ ...formData, totalSessions: parseInt(e.target.value) || 0 })}
                  className="rounded-xl border-white/10 bg-white/10 text-white"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="coach" className="text-white/80 text-sm font-medium">Coach</Label>
              <Select value={formData.coach} onValueChange={(v) => setFormData({ ...formData, coach: v })}>
                <SelectTrigger className="rounded-xl border-white/10 bg-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {coaches.map((c) => (
                    <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="schedule" className="text-white/80 text-sm font-medium">Schedule</Label>
                <Input
                  id="schedule"
                  value={formData.schedule}
                  onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                  placeholder="Mon, Wed, Fri"
                  className="rounded-xl border-white/10 bg-white/10 text-white placeholder:text-white/40"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time" className="text-white/80 text-sm font-medium">Time</Label>
                <Input
                  id="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  placeholder="4:00 PM - 5:00 PM"
                  className="rounded-xl border-white/10 bg-white/10 text-white placeholder:text-white/40"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration" className="text-white/80 text-sm font-medium">Duration</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="60 min"
                  className="rounded-xl border-white/10 bg-white/10 text-white placeholder:text-white/40"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-white/80 text-sm font-medium">Price (₹)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                  className="rounded-xl border-white/10 bg-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status" className="text-white/80 text-sm font-medium">Status</Label>
                <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v })}>
                  <SelectTrigger className="rounded-xl border-white/10 bg-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-white/80 text-sm font-medium">
                Description <span className="text-white/40 text-xs">(Optional)</span>
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter program description..."
                rows={3}
                className="rounded-xl border-white/10 bg-white/10 text-white placeholder:text-white/40 resize-none"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} className="rounded-xl">
              Cancel
            </Button>
            <Button onClick={handleSave} className="rounded-xl bg-primary text-white hover:bg-primary/90">
              {editingItem ? "Save Changes" : `Create ${entityType === "program" ? "Program" : "Offer"}`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
