import { useState } from "react";
import { coachTrainees } from "@/data/coachMock";
import { Table } from "@/components/ui/table";
import { Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export default function CoachTrainees() {
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [batchFilter, setBatchFilter] = useState("");

  const filtered = coachTrainees.filter((t) => {
    if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (levelFilter && t.level !== levelFilter) return false;
    if (batchFilter && t.batch !== batchFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-foreground">My Trainees</h1>
      {/* optional filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Input
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <select
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
          className="max-w-xs rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="">All Levels</option>
          {[...new Set(coachTrainees.map((t) => t.level))].map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
        <select
          value={batchFilter}
          onChange={(e) => setBatchFilter(e.target.value)}
          className="max-w-xs rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="">All Batches</option>
          {[...new Set(coachTrainees.map((t) => t.batch))].map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 text-xs text-muted-foreground font-medium">Name</th>
              <th className="text-left py-2 text-xs text-muted-foreground font-medium">Age Group</th>
              <th className="text-left py-2 text-xs text-muted-foreground font-medium">Level</th>
              <th className="text-left py-2 text-xs text-muted-foreground font-medium">Batch</th>
              <th className="text-left py-2 text-xs text-muted-foreground font-medium">Attendance %</th>
              <th className="text-left py-2 text-xs text-muted-foreground font-medium">Last Update</th>
              <th className="text-right py-2 text-xs text-muted-foreground font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id} className="border-b border-border/50">
                <td className="py-2.5 text-foreground">{t.name}</td>
                <td className="py-2.5 text-muted-foreground">{t.ageGroup}</td>
                <td className="py-2.5 text-foreground">{t.level}</td>
                <td className="py-2.5 text-muted-foreground">{t.batch}</td>
                <td className="py-2.5 text-foreground">{t.attendance}%</td>
                <td className="py-2.5 text-muted-foreground">{t.lastUpdate}</td>
                <td className="py-2.5 text-right">
                  <button className="text-primary hover:underline flex items-center gap-1">
                    <Eye size={14} /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
