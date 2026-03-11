import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { ProgressRecord } from "@/store/progressStore";

interface Props {
  trainee: string;
  current: Pick<ProgressRecord, "stamina" | "breathing" | "consistency" | "technique" | "confidence" | "note">;
  onSave: (updated: Partial<ProgressRecord>) => void;
  trigger?: React.ReactNode;
}

export default function UpdateProgressModal({ trainee, current, onSave, trigger }: Props) {
  const [values, setValues] = useState({ ...current });

  const handleChange = (field: string, val: number) => {
    setValues((v) => ({ ...v, [field]: val }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger ?? <Button size="sm" className="bg-amber-500 text-slate-900 hover:bg-amber-400">Update Progress</Button>}
      </DialogTrigger>
      <DialogContent className="bg-[#0a0f16] border-white/10 text-slate-200">
        <DialogTitle className="text-white text-xl">Update {trainee}'s Progress</DialogTitle>
        <div className="space-y-6 mt-4">
          {(["stamina", "breathing", "consistency", "technique", "confidence"] as const).map((field) => (
            <div key={field} className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-semibold text-slate-300 capitalize">{field}</label>
                <span className="text-sm font-bold text-cyan-400">{values[field]}%</span>
              </div>
              <Slider
                value={[values[field]]}
                onValueChange={(v) => handleChange(field, v[0])}
                min={0}
                max={100}
                className="[&_[role=slider]]:bg-cyan-400 [&_[role=slider]]:border-cyan-400 [&_.relative_>_.absolute]:bg-cyan-500 [&_.rounded-full]:bg-slate-800"
              />
            </div>
          ))}
          <div className="space-y-2 pt-2">
            <label className="text-sm font-semibold text-slate-300">Coach Note</label>
            <Textarea
              value={values.note}
              onChange={(e) => setValues((v) => ({ ...v, note: e.target.value }))}
              className="bg-slate-900/50 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-cyan-500 min-h-[100px] resize-none"
              placeholder="Add your observations..."
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <DialogClose asChild>
              <button className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
                Cancel
              </button>
            </DialogClose>
            <DialogClose asChild>
              <button
                className="px-6 py-2 rounded-xl text-sm font-bold bg-amber-500 text-slate-900 hover:bg-amber-400 transition-colors shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                onClick={() => {
                  onSave({ ...values, lastUpdated: new Date().toISOString().split("T")[0] });
                }}
              >
                Save Progress
              </button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
