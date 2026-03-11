import { create } from "zustand";
import { coachProgress } from "@/data/coachMock";

export interface ProgressRecord {
  id: string;
  trainee: string;
  level: string;
  stamina: number;
  breathing: number;
  consistency: number;
  technique: number;
  confidence: number;
  note: string;
  lastUpdated: string;
}

interface ProgressState {
  records: ProgressRecord[];
  update: (id: string, updated: Partial<ProgressRecord>) => void;
  add: (rec: ProgressRecord) => void;
  remove: (id: string) => void;
}

// initialize with coachProgress data (which now includes a record for the sample portal user)
export const useProgressStore = create<ProgressState>((set) => ({
  records: [...coachProgress],
  update: (id, updated) =>
    set((state) => ({
      records: state.records.map((r) => (r.id === id ? { ...r, ...updated } : r)),
    })),
  add: (rec) => set((state) => ({ records: [...state.records, rec] })),
  remove: (id) => set((state) => ({ records: state.records.filter((r) => r.id !== id) })),
}));
