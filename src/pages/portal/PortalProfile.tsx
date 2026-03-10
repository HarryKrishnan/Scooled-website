import { User, Mail, Phone, MapPin, Camera } from "lucide-react";
import { useState } from "react";

export default function PortalProfile() {
  const [editing, setEditing] = useState(false);

  return (
    <div className="max-w-3xl space-y-8">
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-3xl font-bold text-navy tracking-tight">My Profile</h1>
        <p className="text-sm text-navy/50 font-medium">Manage your personal information and account settings.</p>
      </div>

      <div className="card-premium">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold relative">
            A
            <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
              <Camera size={12} />
            </button>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-navy">Aarav Patel</h2>
            <p className="text-sm text-navy/40 font-medium">Member since January 2025</p>
          </div>
        </div>

        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setEditing(false); }}>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-primary/60 mb-2 block">Full Name</label>
              <div className="relative group">
                <User size={16} className="absolute left-4 top-3.5 text-navy/20 group-focus-within:text-primary transition-colors" />
                <input defaultValue="Aarav Patel" disabled={!editing} className="w-full pl-12 pr-4 py-3 rounded-2xl border border-navy/5 bg-navy/5 text-navy text-sm focus:border-primary/50 outline-none transition-all disabled:opacity-40" />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-primary/60 mb-2 block">Email</label>
              <div className="relative group">
                <Mail size={16} className="absolute left-4 top-3.5 text-navy/20 group-focus-within:text-primary transition-colors" />
                <input defaultValue="aarav@example.com" disabled={!editing} className="w-full pl-12 pr-4 py-3 rounded-2xl border border-navy/5 bg-navy/5 text-navy text-sm focus:border-primary/50 outline-none transition-all disabled:opacity-40" />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-primary/60 mb-2 block">Phone</label>
              <div className="relative group">
                <Phone size={16} className="absolute left-4 top-3.5 text-navy/20 group-focus-within:text-primary transition-colors" />
                <input defaultValue="+91 98765 43210" disabled={!editing} className="w-full pl-12 pr-4 py-3 rounded-2xl border border-navy/5 bg-navy/5 text-navy text-sm focus:border-primary/50 outline-none transition-all disabled:opacity-40" />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-primary/60 mb-2 block">Address</label>
              <div className="relative group">
                <MapPin size={16} className="absolute left-4 top-3.5 text-navy/20 group-focus-within:text-primary transition-colors" />
                <input defaultValue="Bandra, Mumbai" disabled={!editing} className="w-full pl-12 pr-4 py-3 rounded-2xl border border-navy/5 bg-navy/5 text-navy text-sm focus:border-primary/50 outline-none transition-all disabled:opacity-40" />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            {editing ? (
              <>
                <button type="submit" className="btn-primary py-2 px-6 text-sm">Save Changes</button>
                <button type="button" onClick={() => setEditing(false)} className="px-6 py-2 rounded-full border border-border text-sm font-medium text-foreground hover:bg-muted">Cancel</button>
              </>
            ) : (
              <button type="button" onClick={() => setEditing(true)} className="btn-primary py-2 px-6 text-sm">Edit Profile</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
