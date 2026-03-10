import { User, Mail, Phone, MapPin, Camera } from "lucide-react";
import { useState } from "react";

export default function PortalProfile() {
  const [editing, setEditing] = useState(false);

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="font-display text-2xl font-bold text-foreground">My Profile</h1>

      <div className="card-premium">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold relative">
            A
            <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
              <Camera size={12} />
            </button>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">Aarav Patel</h2>
            <p className="text-sm text-muted-foreground">Member since January 2025</p>
          </div>
        </div>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setEditing(false); }}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-3 text-muted-foreground" />
                <input defaultValue="Aarav Patel" disabled={!editing} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm disabled:opacity-60" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-3 text-muted-foreground" />
                <input defaultValue="aarav@example.com" disabled={!editing} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm disabled:opacity-60" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Phone</label>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-3 text-muted-foreground" />
                <input defaultValue="+91 98765 43210" disabled={!editing} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm disabled:opacity-60" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Address</label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3 top-3 text-muted-foreground" />
                <input defaultValue="Bandra, Mumbai" disabled={!editing} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm disabled:opacity-60" />
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
