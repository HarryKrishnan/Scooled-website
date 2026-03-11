import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Trainee } from "@/data/coachMock";

interface Props {
  trainee: Trainee;
  children?: React.ReactNode; // optional custom trigger
}

export default function TraineeDetailsModal({ trainee, children }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children ?? <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-semibold transition-colors">View</button>}
      </DialogTrigger>
      <DialogContent className="max-w-xl bg-[#0a0f16] border-white/10 text-slate-200 shadow-2xl">
        <DialogTitle className="text-white text-2xl font-bold flex items-center gap-3">
          {trainee.name}
          <span className="inline-flex px-2.5 py-1 rounded-md bg-white/5 text-slate-300 border border-white/10 text-xs font-medium font-sans">
            Level: {trainee.level}
          </span>
        </DialogTitle>
        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="bg-slate-900/50 border border-white/5 p-1 rounded-xl">
            <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">Overview</TabsTrigger>
            <TabsTrigger value="attendance" className="rounded-lg data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">Attendance</TabsTrigger>
            <TabsTrigger value="progress" className="rounded-lg data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">Progress</TabsTrigger>
            <TabsTrigger value="notes" className="rounded-lg data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">Notes</TabsTrigger>
          </TabsList>
          
          <div className="mt-6 min-h-[200px] bg-slate-900/30 border border-white/5 rounded-2xl p-5">
            <TabsContent value="overview" className="space-y-4 m-0">
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Age Group</p><p className="text-slate-200">{trainee.ageGroup}</p></div>
                <div><p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Batch</p><p className="text-slate-200">{trainee.batch}</p></div>
                <div><p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Membership</p><p className="text-slate-200">{trainee.membershipType || "-"}</p></div>
                <div><p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Coach</p><p className="text-slate-200">{trainee.coachName || "-"}</p></div>
              </div>
              <div className="pt-4 border-t border-white/5">
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">Emergency Contact</p>
                <p className="text-slate-200 bg-white/5 px-3 py-2 rounded-lg inline-block border border-white/5">{trainee.emergencyContact || "-"}</p>
              </div>
            </TabsContent>
            <TabsContent value="attendance" className="space-y-3 m-0">
              {trainee.recentAttendance?.map((a, idx) => (
                <div key={idx} className="flex justify-between items-center bg-white/[0.02] p-3 rounded-xl border border-white/5">
                  <span className="text-sm font-medium text-slate-300">{a.date}</span>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-bold border ${a.status === "Present" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : a.status === "Late" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : "bg-rose-500/10 text-rose-400 border-rose-500/20"}`}>
                    {a.status.toUpperCase()}
                  </span>
                </div>
              )) || <p className="text-sm text-slate-500 italic">No recent attendance data.</p>}
            </TabsContent>
            <TabsContent value="progress" className="m-0">
              <p className="text-slate-300 leading-relaxed">{trainee.progressSummary || "No progress summary available."}</p>
            </TabsContent>
            <TabsContent value="notes" className="m-0">
              <p className="text-slate-300 leading-relaxed italic border-l-2 border-cyan-500/30 pl-4 py-1">{trainee.remarks || "No remarks on file."}</p>
            </TabsContent>
          </div>
        </Tabs>
        <div className="flex justify-end mt-2 pt-4 border-t border-white/10">
          <DialogClose asChild>
            <button className="px-5 py-2 rounded-xl text-sm font-semibold text-slate-300 bg-white/5 hover:bg-white/10 hover:text-white transition-colors">Close</button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
