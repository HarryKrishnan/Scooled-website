import { User, Mail, Phone, MapPin, Camera, Heart, ShieldCheck, Waves, Info } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function PortalProfile() {
  const [editing, setEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Aarav Patel",
    email: "aarav.p@example.com",
    phone: "+91 98765 43210",
    address: "Bandra, Mumbai",
    dob: "1995-05-15",
    gender: "Male",
    FutsalLevel: "Intermediate",
    preferredCenter: "Downtown",
    emergencyContactName: "Priya Patel",
    emergencyContactPhone: "+91 98765 12345",
    medicalNotes: "N/A",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setEditing(false);
    // In a real app, you'd call an API here
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Tiled Heading Section */}
      <div className="card-premium border-orange-tile flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight">My Profile</h1>
          <p className="text-sm text-white/70 font-bold mt-1">Manage your identity and Futsal preferences.</p>
        </div>
        <div className="flex gap-3">
          {editing ? (
            <>
              <button 
                onClick={handleSave} 
                className="btn-primary py-2.5 px-8 text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20"
              >
                Save Profile
              </button>
              <button 
                onClick={() => setEditing(false)} 
                className="px-6 py-2.5 rounded-full border border-white/10 text-xs font-bold text-white hover:bg-white/5 transition-all"
              >
                Cancel
              </button>
            </>
          ) : (
            <button 
              onClick={() => setEditing(true)} 
              className="btn-primary py-2.5 px-8 text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20"
            >
              Edit Details
            </button>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Section: Personal Information */}
          <div className="card-premium border-green-tile">
            <div className="flex items-center gap-2 mb-8 border-b border-white/5 pb-4">
              <User className="text-primary" size={20} />
              <h2 className="font-display text-xl font-bold text-white">Personal Details</h2>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { label: "Full Name", icon: User, key: "name", type: "text" },
                { label: "Email Address", icon: Mail, key: "email", type: "email" },
                { label: "Phone Number", icon: Phone, key: "phone", type: "tel" },
                { label: "Date of Birth", icon: MapPin, key: "dob", type: "date" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary mb-2 block">{field.label}</label>
                  <div className="relative group">
                    <field.icon size={16} className="absolute left-4 top-3.5 text-white/20 group-focus-within:text-primary transition-colors" />
                    <input 
                      type={field.type}
                      value={profileData[field.key as keyof typeof profileData]} 
                      onChange={(e) => setProfileData({ ...profileData, [field.key]: e.target.value })}
                      disabled={!editing} 
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-white/5 bg-white/5 text-white text-sm font-semibold focus:border-primary/50 focus:bg-white/10 outline-none transition-all disabled:opacity-60" 
                    />
                  </div>
                </div>
              ))}
              <div className="sm:col-span-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-primary mb-2 block">Residential Address</label>
                <div className="relative group">
                  <MapPin size={16} className="absolute left-4 top-3.5 text-white/20 group-focus-within:text-primary transition-colors" />
                  <input 
                    value={profileData.address} 
                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                    disabled={!editing} 
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-white/5 bg-white/5 text-white text-sm font-semibold focus:border-primary/50 focus:bg-white/10 outline-none transition-all disabled:opacity-60" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section: Futsal Profile */}
          <div className="card-premium border-gold-tile">
            <div className="flex items-center gap-2 mb-8 border-b border-white/5 pb-4">
              <Waves className="text-orange-500" size={20} />
              <h2 className="font-display text-xl font-bold text-white">Futsal Profile</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-orange-500 mb-2 block">Skill Level</label>
                <select 
                  disabled={!editing}
                  value={profileData.FutsalLevel}
                  onChange={(e) => setProfileData({ ...profileData, FutsalLevel: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-2xl border border-white/5 bg-white/5 text-white text-sm font-bold focus:border-orange-500/50 outline-none transition-all appearance-none disabled:opacity-60"
                >
                  <option className="bg-neutral-900">Beginner</option>
                  <option className="bg-neutral-900">Intermediate</option>
                  <option className="bg-neutral-900">Advanced</option>
                  <option className="bg-neutral-900">Pro Athlete</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-orange-500 mb-2 block">Preferred Training Center</label>
                <select 
                  disabled={!editing}
                  value={profileData.preferredCenter}
                  onChange={(e) => setProfileData({ ...profileData, preferredCenter: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-2xl border border-white/5 bg-white/5 text-white text-sm font-bold focus:border-orange-500/50 outline-none transition-all appearance-none disabled:opacity-60"
                >
                  <option className="bg-neutral-900">Downtown Centre</option>
                  <option className="bg-neutral-900">Westside Futsal Complex</option>
                  <option className="bg-neutral-900">Elite Sports Arena</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section: Safety & Health */}
          <div className="card-premium border-red-tile">
            <div className="flex items-center gap-2 mb-8 border-b border-white/5 pb-4">
              <ShieldCheck className="text-destructive" size={20} />
              <h2 className="font-display text-xl font-bold text-white">Safety & Health</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-destructive mb-2 block">Emergency Contact Name</label>
                <input 
                  value={profileData.emergencyContactName} 
                  onChange={(e) => setProfileData({ ...profileData, emergencyContactName: e.target.value })}
                  disabled={!editing} 
                  className="w-full px-4 py-3.5 rounded-2xl border border-white/5 bg-white/5 text-white text-sm font-semibold focus:border-destructive/50 focus:bg-white/10 outline-none disabled:opacity-60" 
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-destructive mb-2 block">Emergency Phone</label>
                <input 
                  value={profileData.emergencyContactPhone} 
                  onChange={(e) => setProfileData({ ...profileData, emergencyContactPhone: e.target.value })}
                  disabled={!editing} 
                  className="w-full px-4 py-3.5 rounded-2xl border border-white/5 bg-white/5 text-white text-sm font-semibold focus:border-destructive/50 focus:bg-white/10 outline-none disabled:opacity-60" 
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-destructive mb-2 block">Critical Medical Notes</label>
              <textarea 
                value={profileData.medicalNotes} 
                onChange={(e) => setProfileData({ ...profileData, medicalNotes: e.target.value })}
                disabled={!editing} 
                rows={3}
                placeholder="e.g., Allergies, Heart condition, etc."
                className="w-full px-4 py-3.5 rounded-2xl border border-white/5 bg-white/5 text-white text-sm font-semibold focus:border-destructive/50 focus:bg-white/10 outline-none resize-none disabled:opacity-60"
              />
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="card-premium border-white/10 text-center bg-black/80 shadow-2xl">
            <div className="relative inline-block mb-6">
              <div className="w-28 h-28 rounded-full border-4 border-primary/20 p-1">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center text-white text-3xl font-black shadow-lg">
                  AP
                </div>
              </div>
              <button className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-white text-primary shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                <Camera size={14} />
              </button>
            </div>
            <h3 className="font-display text-2xl font-bold text-white mb-1">{profileData.name}</h3>
            <p className="text-xs text-primary font-black uppercase tracking-widest mb-6">Pro Player</p>
            
            <div className="grid grid-cols-2 gap-3 py-6 border-y border-white/5">
              <div>
                <p className="text-xl font-black text-white leading-none">12</p>
                <p className="text-[9px] uppercase font-bold text-white/40">Programs</p>
              </div>
              <div>
                <p className="text-xl font-black text-amber-500 leading-none">1.2k</p>
                <p className="text-[9px] uppercase font-bold text-white/40">Points</p>
              </div>
            </div>
          </div>

          <div className="card-premium bg-amber-500/5 border-amber-500/20">
             <div className="flex items-center gap-2 mb-4">
               <Heart className="text-amber-500 fill-amber-500/20" size={18} />
               <h4 className="font-display font-bold text-white">Trust & Safety</h4>
             </div>
             <p className="text-xs text-white/70 leading-relaxed italic">
                Your details are encrypted and shared only with certified coaches during emergencies.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
