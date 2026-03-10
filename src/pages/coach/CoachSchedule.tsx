import { coachSchedule } from "@/data/coachMock";
import { Table } from "@/components/ui/table";

export default function CoachSchedule() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-foreground">Session Schedule</h1>
      <div className="overflow-x-auto">
        <Table>
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 text-xs text-muted-foreground font-medium">Time</th>
              <th className="text-left py-2 text-xs text-muted-foreground font-medium">Batch</th>
              <th className="text-left py-2 text-xs text-muted-foreground font-medium">Trainees</th>
              <th className="text-left py-2 text-xs text-muted-foreground font-medium">Pool/Lane</th>
              <th className="text-left py-2 text-xs text-muted-foreground font-medium">Type</th>
              <th className="text-left py-2 text-xs text-muted-foreground font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {coachSchedule.map((s) => (
              <tr key={s.id} className="border-b border-border/50">
                <td className="py-2.5 text-foreground">{s.time}</td>
                <td className="py-2.5 text-muted-foreground">{s.batch}</td>
                <td className="py-2.5 text-foreground">{s.trainees}</td>
                <td className="py-2.5 text-muted-foreground">{s.pool}</td>
                <td className="py-2.5 text-muted-foreground">{s.type}</td>
                <td className="py-2.5">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    s.status === "Upcoming" ? "bg-primary/10 text-primary" : s.status === "Ongoing" ? "bg-cyan/10 text-cyan" : "bg-muted/20 text-muted-foreground"
                  }`}>{s.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
