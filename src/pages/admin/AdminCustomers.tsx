import { customers } from "@/data/mockData";
import { Search, Plus, Trash2, X, Check } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  membership: string;
  status: string;
  joinDate: string;
};

export default function AdminCustomers() {
  const [search, setSearch] = useState("");
  const [customerList, setCustomerList] = useState<Customer[]>(customers);
  const [deleteMode, setDeleteMode] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    membership: "Monthly",
    status: "Active",
    joinDate: new Date().toISOString().split("T")[0],
  });

  const filtered = customerList.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  const handleAddNew = () => {
    setEditingCustomer(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      membership: "Monthly",
      status: "Active",
      joinDate: new Date().toISOString().split("T")[0],
    });
    setDialogOpen(true);
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      membership: customer.membership,
      status: customer.status,
      joinDate: customer.joinDate,
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (editingCustomer) {
      setCustomerList(customerList.map(c => 
        c.id === editingCustomer.id ? { ...c, ...formData } : c
      ));
    } else {
      const newCustomer: Customer = {
        id: `cu${Date.now()}`,
        ...formData,
      };
      setCustomerList([...customerList, newCustomer]);
    }
    setDialogOpen(false);
  };

  const handleDelete = () => {
    setCustomerList(customerList.filter(c => !selected.includes(c.id)));
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
        <h1 className="font-display text-4xl font-bold text-white">Customers</h1>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-2.5 text-white/60" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search customers..." className="pl-10 pr-4 py-2 rounded-xl border border-white/10 bg-white/10 backdrop-blur-sm text-sm w-64 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-white placeholder:text-white/40" />
          </div>
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 text-navy hover:bg-amber-600 transition-colors text-sm font-bold shadow-lg shadow-amber-500/20"
          >
            <Plus size={16} />
            Add
          </button>
          <button
            onClick={toggleDeleteMode}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors text-sm font-bold ${
              deleteMode
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-white/10 text-white border border-white/10 hover:bg-white/20"
            }`}
          >
            {deleteMode ? <X size={16} /> : <Trash2 size={16} />}
            {deleteMode ? "Cancel" : "Delete"}
          </button>
          {deleteMode && selected.length > 0 && (
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors text-sm font-bold"
            >
              <Check size={16} />
              Delete ({selected.length})
            </button>
          )}
        </div>
      </div>

      <div className="card-premium overflow-x-auto hover:border-orange-tile hover:-translate-y-2 transition-all duration-500">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              {deleteMode && <th className="text-left py-2.5 w-10"></th>}
              {["Name", "Email", "Phone", "Membership", "Status", "Joined", ""].map((h) => (
                <th key={h} className="text-left py-2.5 text-xs text-white/40 font-semibold uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                {deleteMode && (
                  <td className="py-2.5">
                    <input
                      type="checkbox"
                      checked={selected.includes(c.id)}
                      onChange={() => toggleSelect(c.id)}
                      className="w-4 h-4 rounded border-white/20 text-amber-500 focus:ring-amber-500/20"
                    />
                  </td>
                )}
                <td className="py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-xs font-bold">{c.name.charAt(0)}</div>
                    <span className="font-medium text-white">{c.name}</span>
                  </div>
                </td>
                <td className="py-2.5 text-white/70">{c.email}</td>
                <td className="py-2.5 text-white/70">{c.phone}</td>
                <td className="py-2.5 text-white/70">{c.membership}</td>
                <td className="py-2.5">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                    c.status === "Active" ? "bg-green-500/20 text-green-400 border-green-500/30" :
                    c.status === "Expired" ? "bg-red-500/20 text-red-400 border-red-500/30" :
                    "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                  }`}>{c.status}</span>
                </td>
                <td className="py-2.5 text-white/70">{c.joinDate}</td>
                <td className="py-2.5">
                  {!deleteMode && (
                    <button
                      onClick={() => handleEdit(c)}
                      className="text-xs px-3 py-1 rounded-lg bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 transition-colors font-medium"
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
        <DialogContent className="sm:max-w-[500px] bg-black/95 backdrop-blur-xl border-white/10">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-white">
              {editingCustomer ? "Edit Customer" : "Add New Customer"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white/80 text-sm font-medium">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter full name"
                className="rounded-xl border-white/10 bg-white/10 text-white placeholder:text-white/40"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/80 text-sm font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@example.com"
                className="rounded-xl border-white/10 bg-white/10 text-white placeholder:text-white/40"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white/80 text-sm font-medium">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 XXXXX XXXXX"
                className="rounded-xl border-white/10 bg-white/10 text-white placeholder:text-white/40"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="membership" className="text-white/80 text-sm font-medium">Membership</Label>
                <Select value={formData.membership} onValueChange={(v) => setFormData({ ...formData, membership: v })}>
                  <SelectTrigger className="rounded-xl border-white/10 bg-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-black/95 border-white/10 text-white">
                    <SelectItem value="Monthly">Monthly</SelectItem>
                    <SelectItem value="Quarterly">Quarterly</SelectItem>
                    <SelectItem value="Half-Yearly">Half-Yearly</SelectItem>
                    <SelectItem value="Annual">Annual</SelectItem>
                    <SelectItem value="None">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status" className="text-white/80 text-sm font-medium">Status</Label>
                <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v })}>
                  <SelectTrigger className="rounded-xl border-white/10 bg-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-black/95 border-white/10 text-white">
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Expired">Expired</SelectItem>
                    <SelectItem value="Trial">Trial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="joinDate" className="text-white/80 text-sm font-medium">Join Date</Label>
              <Input
                id="joinDate"
                type="date"
                value={formData.joinDate}
                onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                className="rounded-xl border-white/10 bg-white/10 text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} className="rounded-xl border-white/10 text-white hover:bg-white/10">
              Cancel
            </Button>
            <Button onClick={handleSave} className="rounded-xl bg-amber-500 text-navy hover:bg-amber-600">
              {editingCustomer ? "Save Changes" : "Add Customer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
