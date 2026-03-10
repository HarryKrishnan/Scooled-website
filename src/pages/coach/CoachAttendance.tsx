import { coachAttendance } from "@/data/coachMock";
import { Table } from "@/components/ui/table";

export default function CoachAttendance() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-foreground">Attendance Tracker</h1>
      <div className="overflow-x-auto">
        <Table>
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 text-xs text-muted-foreground font-medium">Batch</th>
              <th className="text-left py-2 text-xs text-muted-foreground font-medium">Date</th>
              <th className="text-left py-2 text-xs text-muted-foreground font-medium">Trainee</th>
              <th className="text-left py-2 text-xs text-muted-foreground font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {coachAttendance.flatMap((rec) =>
              rec.attendees.map((a, idx) => (
                <tr key={`${rec.id}-${idx}`} className="border-b border-border/50">
                  <td className="py-2.5 text-foreground">{rec.batch}</td>
                  <td className="py-2.5 text-muted-foreground">{rec.date}</td>
                  <td className="py-2.5 text-foreground">{a.trainee}</td>
                  <td className="py-2.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      a.status === "Present" ? "bg-primary/10 text-primary" : a.status === "Late" ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"
                    }`}>{a.status}</span>
                  </td>
                </tr>
              )),
            )}
          </tbody>
        </Table>
      </div>
      {/* summary card */}
      <div className="card-premium max-w-xs">
        <p className="text-sm text-muted-foreground">Overall attendance rate</p>
        <p className="text-2xl font-bold text-foreground">{Math.round(coachAttendance.reduce((acc, r) => acc + r.attendees.filter((a) => a.status === "Present").length, 0) / coachAttendance.reduce((acc, r) => acc + r.attendees.length, 0) * 100)}%</p>
      </div>
    </div>
  );
}
