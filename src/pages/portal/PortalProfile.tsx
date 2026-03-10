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
    swimmingLevel: "Intermediate",
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
      <div className="card-premium bg-white/95 border-white/40 shadow-xl shadow-navy/5 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-primary tracking-tight">My Profile</h1>
          <p className="text-sm text-navy/70 font-bold mt-1">Manage your identity and aquatic preferences.</p>
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
                className="px-6 py-2.5 rounded-full border border-navy/10 text-xs font-bold text-navy hover:bg-navy/5 transition-all"
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
          <div className="card-premium">
            <div className="flex items-center gap-2 mb-8 border-b border-navy/5 pb-4">
              <User className="text-primary" size={20} />
              <h2 className="font-display text-xl font-bold text-navy">Personal Details</h2>
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
                    <field.icon size={16} className="absolute left-4 top-3.5 text-navy/20 group-focus-within:text-primary transition-colors" />
                    <input 
                      type={field.type}
                      value={profileData[field.key as keyof typeof profileData]} 
                      onChange={(e) => setProfileData({ ...profileData, [field.key]: e.target.value })}
                      disabled={!editing} 
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-navy/5 bg-navy/5 text-navy text-sm font-semibold focus:border-primary/50 focus:bg-white outline-none transition-all disabled:opacity-60" 
                    />
                  </div>
                </div>
              ))}
              <div className="sm:col-span-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-primary mb-2 block">Residential Address</label>
                <div className="relative group">
                  <MapPin size={16} className="absolute left-4 top-3.5 text-navy/20 group-focus-within:text-primary transition-colors" />
                  <input 
                    value={profileData.address} 
                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                    disabled={!editing} 
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-navy/5 bg-navy/5 text-navy text-sm font-semibold focus:border-primary/50 focus:bg-white outline-none transition-all disabled:opacity-60" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section: Aquatic Profile */}
          <div className="card-premium">
            <div className="flex items-center gap-2 mb-8 border-b border-navy/5 pb-4">
              <Waves className="text-aqua" size={20} />
              <h2 className="font-display text-xl font-bold text-navy">Aquatic Profile</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-aqua mb-2 block">Skill Level</label>
                <select 
                  disabled={!editing}
                  value={profileData.swimmingLevel}
                  onChange={(e) => setProfileData({ ...profileData, swimmingLevel: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-2xl border border-navy/5 bg-navy/5 text-navy text-sm font-bold focus:border-aqua/50 outline-none transition-all appearance-none disabled:opacity-60"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>Pro Athlete</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-aqua mb-2 block">Preferred Training Center</label>
                <select 
                  disabled={!editing}
                  value={profileData.preferredCenter}
                  onChange={(e) => setProfileData({ ...profileData, preferredCenter: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-2xl border border-navy/5 bg-navy/5 text-navy text-sm font-bold focus:border-aqua/50 outline-none transition-all appearance-none disabled:opacity-60"
                >
                  <option>Downtown Centre</option>
                  <option>Westside Aqua Complex</option>
                  <option>Elite Sports Arena</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section: Safety & Health */}
          <div className="card-premium">
            <div className="flex items-center gap-2 mb-8 border-b border-navy/5 pb-4">
              <ShieldCheck className="text-emerald-500" size={20} />
              <h2 className="font-display text-xl font-bold text-navy">Safety & Health</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-2 block">Emergency Contact Name</label>
                <input 
                  value={profileData.emergencyContactName} 
                  onChange={(e) => setProfileData({ ...profileData, emergencyContactName: e.target.value })}
                  disabled={!editing} 
                  className="w-full px-4 py-3.5 rounded-2xl border border-navy/5 bg-navy/5 text-navy text-sm font-semibold focus:border-emerald-500/50 outline-none disabled:opacity-60" 
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-2 block">Emergency Phone</label>
                <input 
                  value={profileData.emergencyContactPhone} 
                  onChange={(e) => setProfileData({ ...profileData, emergencyContactPhone: e.target.value })}
                  disabled={!editing} 
                  className="w-full px-4 py-3.5 rounded-2xl border border-navy/5 bg-navy/5 text-navy text-sm font-semibold focus:border-emerald-500/50 outline-none disabled:opacity-60" 
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-2 block">Critical Medical Notes</label>
              <textarea 
                value={profileData.medicalNotes} 
                onChange={(e) => setProfileData({ ...profileData, medicalNotes: e.target.value })}
                disabled={!editing} 
                rows={3}
                placeholder="e.g., Allergies, Heart condition, etc."
                className="w-full px-4 py-3.5 rounded-2xl border border-navy/5 bg-navy/5 text-navy text-sm font-semibold focus:border-emerald-500/50 outline-none resize-none disabled:opacity-60"
              />
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="card-premium text-center">
            <div className="relative inline-block mb-6">
              <div className="w-28 h-28 rounded-full border-4 border-primary/20 p-1">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-aqua flex items-center justify-center text-white text-3xl font-black shadow-lg">
                  AP
                </div>
              </div>
              <button className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-white text-primary shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                <Camera size={14} />
              </button>
            </div>
            <h3 className="font-display text-2xl font-bold text-navy mb-1">{profileData.name}</h3>
            <p className="text-xs text-primary font-black uppercase tracking-widest mb-6">Pro Swimmer</p>
            
            <div className="grid grid-cols-2 gap-3 py-6 border-y border-navy/5">
              <div>
                <p className="text-xl font-black text-navy leading-none">12</p>
                <p className="text-[9px] uppercase font-bold text-navy/40">Programs</p>
              </div>
              <div>
                <p className="text-xl font-black text-gold leading-none">1.2k</p>
                <p className="text-[9px] uppercase font-bold text-navy/40">Points</p>
              </div>
            </div>
          </div>

          <div className="card-premium bg-primary/5 border-primary/20">
             <div className="flex items-center gap-2 mb-4">
               <Heart className="text-primary fill-primary/20" size={18} />
               <h4 className="font-display font-bold text-navy">Trust & Safety</h4>
             </div>
             <p className="text-xs text-navy/70 leading-relaxed italic">
               Your details are encrypted and shared only with certified coaches during emergencies.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
