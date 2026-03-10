import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface Props {
  trainee: string;
  current: {
    stamina: number;
    breathing: number;
    consistency: number;
    technique: number;
    confidence: number;
    note: string;
  };
  onSave: (updated: any) => void;
}

export default function UpdateProgressModal({ trainee, current, onSave }: Props) {
  const [values, setValues] = useState({ ...current });

  const handleChange = (field: string, val: number) => {
    setValues((v) => ({ ...v, [field]: val }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">Update Progress</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Update {trainee}'s Progress</DialogTitle>
        <div className="space-y-4">
          {(["stamina", "breathing", "consistency", "technique", "confidence"] as const).map((field) => (
            <div key={field} className="space-y-1">
              <label className="block text-sm font-medium text-foreground capitalize">{field}</label>
              <Slider
                value={[values[field]]}
                onValueChange={(v) => handleChange(field, v[0])}
                min={0}
                max={100}
              />
            </div>
          ))}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-foreground">Coach Note</label>
            <Textarea
              value={values.note}
              onChange={(e) => setValues((v) => ({ ...v, note: e.target.value }))}
            />
          </div>
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                onClick={() => {
                  onSave({ ...values, lastUpdated: new Date().toISOString().split("T")[0] });
                }}
              >
                Save
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
