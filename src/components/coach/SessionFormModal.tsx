import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState, useEffect } from "react";

import { SportID } from "@/data/sportConfig";

export interface Session {
  id: string;
  sport: SportID;
  time: string;
  batch: string;
  trainees: number;
  location: string;
  field?: string;
  type: string;
  status: "Upcoming" | "Ongoing" | "Completed";
}

interface Props {
  session?: Session;
  onSave: (session: Session) => void;
  trigger?: React.ReactNode;
}

export default function SessionFormModal({ session, onSave, trigger }: Props) {
  const [formData, setFormData] = useState<Partial<Session>>({
    time: "",
    batch: "",
    trainees: 0,
    location: "",
    field: "",
    type: "Regular",
    status: "Upcoming",
  });

  useEffect(() => {
    if (session) {
      setFormData(session);
    } else {
      setFormData({
        time: "",
        batch: "",
        trainees: 0,
        location: "",
        field: "",
        type: "Regular",
        status: "Upcoming",
      });
    }
  }, [session]);

  const handleChange = (field: keyof Session, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave({
      id: session?.id || Math.random().toString(36).substring(7),
      sport: session?.sport || "swimming",
      time: formData.time || "00:00 AM",
      batch: formData.batch || "New Batch",
      trainees: formData.trainees || 0,
      location: formData.location || "Main Location",
      field: formData.field,
      type: formData.type || "Regular",
      status: formData.status as Session["status"] || "Upcoming",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || <Button>Add Session</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#0a0f16] border border-white/10 text-slate-200 shadow-2xl">
        <DialogTitle className="text-xl font-bold text-white mb-4">
          {session ? "Edit Session" : "New Session"}
        </DialogTitle>

        <div className="grid gap-5 py-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="time" className="text-sm font-semibold text-slate-400">Time (e.g. 09:00 AM)</Label>
              <Input
                id="time"
                value={formData.time}
                onChange={(e) => handleChange("time", e.target.value)}
                className="bg-slate-900/50 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-cyan-500 rounded-xl px-4 py-2"
                placeholder="09:00 AM"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="batch" className="text-sm font-semibold text-slate-400">Batch Name</Label>
              <Input
                id="batch"
                value={formData.batch}
                onChange={(e) => handleChange("batch", e.target.value)}
                className="bg-slate-900/50 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-cyan-500 rounded-xl px-4 py-2"
                placeholder="Advanced"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-semibold text-slate-400">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className="bg-slate-900/50 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-cyan-500 rounded-xl px-4 py-2"
                placeholder="Court 1 / Pool 1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="trainees" className="text-sm font-semibold text-slate-400">Trainees Count</Label>
              <Input
                id="trainees"
                type="number"
                value={formData.trainees}
                onChange={(e) => handleChange("trainees", parseInt(e.target.value) || 0)}
                className="bg-slate-900/50 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-cyan-500 rounded-xl px-4 py-2"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-semibold text-slate-400">Status</Label>
            <RadioGroup
              value={formData.status}
              onValueChange={(val) => handleChange("status", val)}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2 bg-slate-900/50 px-3 py-2 border border-white/10 rounded-xl hover:border-cyan-500/50 transition-colors">
                <RadioGroupItem value="Upcoming" id="up" className="text-cyan-400 border-white/20 focus-visible:ring-cyan-500" />
                <Label htmlFor="up" className="text-slate-200 font-medium cursor-pointer">Upcoming</Label>
              </div>
              <div className="flex items-center space-x-2 bg-slate-900/50 px-3 py-2 border border-white/10 rounded-xl hover:border-amber-500/50 transition-colors">
                <RadioGroupItem value="Ongoing" id="on" className="text-amber-500 border-white/20 focus-visible:ring-amber-500" />
                <Label htmlFor="on" className="text-slate-200 font-medium cursor-pointer">Ongoing</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-white/10 mt-2">
          <DialogClose asChild>
            <button className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
              Cancel
            </button>
          </DialogClose>
          <DialogClose asChild>
            <button
               className="px-6 py-2.5 rounded-xl text-sm font-bold bg-amber-500 text-slate-900 hover:bg-amber-400 transition-colors shadow-[0_0_15px_rgba(245,158,11,0.3)]"
               onClick={handleSave}
            >
              {session ? "Save Changes" : "Create Session"}
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
