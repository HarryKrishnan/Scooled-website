import { useState } from "react";
import { coachProgress } from "@/data/coachMock";
import UpdateProgressModal from "@/components/coach/UpdateProgressModal";

export default function CoachProgress() {
  const [records, setRecords] = useState(coachProgress);

  const handleSave = (id: string, updated: any) => {
    setRecords((r) => r.map((rec) => (rec.id === id ? { ...rec, ...updated } : rec)));
  };

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-foreground">Progress Tracker</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {records.map((rec) => (
          <div key={rec.id} className="card-premium">
            <div className="flex justify-between items-center mb-2">
              <div>
                <p className="font-medium text-foreground">{rec.trainee}</p>
                <p className="text-xs text-muted-foreground">Level: {rec.level}</p>
              </div>
              <UpdateProgressModal
                trainee={rec.trainee}
                current={rec}
                onSave={(updated) => handleSave(rec.id, updated)}
              />
            </div>
            <div className="space-y-1">
              {(["stamina", "breathing", "consistency", "technique", "confidence"] as const).map((field) => (
                <div key={field} className="flex items-center gap-2">
                  <span className="text-xs w-20 capitalize">{field}</span>
                  <div className="h-1.5 flex-1 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${rec[field]}%` }}
                    />
                  </div>
                  <span className="text-xs w-8 text-right">{rec[field]}%</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">{rec.note}</p>
            <p className="text-xs text-muted-foreground">Last updated: {rec.lastUpdated}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
