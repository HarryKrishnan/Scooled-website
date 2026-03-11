// Mock data for coach/staff portal

export interface Trainee {
  id: string;
  name: string;
  ageGroup: string;
  level: string;
  batch: string;
  attendance: number; // percentage
  lastUpdate: string;
  // additional profile details for the modal
  membershipType?: string;
  coachName?: string;
  emergencyContact?: string;
  trainingGoals?: string[];
  recentAttendance?: { date: string; status: string }[];
  progressSummary?: string;
  remarks?: string;
}

export const coachTrainees: Trainee[] = [
  { id: "t1", name: "Riya Patel", ageGroup: "10–12", level: "Intermediate", batch: "Batch A", attendance: 92, lastUpdate: "2025-03-08", membershipType: "Quarterly", coachName: "Coach Rahul", emergencyContact: "+91 98765 43210", trainingGoals: ["Master butterfly stroke"], recentAttendance: [{ date: "2025-03-08", status: "Present" }, { date: "2025-03-07", status: "Present" }], progressSummary: "Strong technique, maintain consistency.", remarks: "Excellent attitude." },
  { id: "t2", name: "Vikram Singh", ageGroup: "13–15", level: "Advanced", batch: "Batch B", attendance: 85, lastUpdate: "2025-03-09", membershipType: "Monthly", coachName: "Coach Rahul", emergencyContact: "+91 91234 56789", trainingGoals: ["Increase lap consistency"], recentAttendance: [{ date: "2025-03-09", status: "Present" }, { date: "2025-03-08", status: "Late" }], progressSummary: "Needs to work on stamina.", remarks: "Keep pushing." },
  { id: "t3", name: "Anjali Rao", ageGroup: "8–10", level: "Beginner", batch: "Batch C", attendance: 100, lastUpdate: "2025-03-07", membershipType: "Half-Yearly", coachName: "Coach Neha", emergencyContact: "+91 99887 66554", trainingGoals: ["Learn basic strokes"], recentAttendance: [{ date: "2025-03-07", status: "Present" }, { date: "2025-03-06", status: "Present" }], progressSummary: "Very attentive.", remarks: "Has potential." },
  { id: "t4", name: "Karan Mehta", ageGroup: "16–18", level: "Advanced", batch: "Batch B", attendance: 78, lastUpdate: "2025-03-05", membershipType: "Annual", coachName: "Coach Rahul", emergencyContact: "+91 90000 12345", trainingGoals: ["Prepare for competition"], recentAttendance: [{ date: "2025-03-05", status: "Absent" }, { date: "2025-03-04", status: "Present" }], progressSummary: "Should work on endurance.", remarks: "Bring extra energy." },
  { id: "t5", name: "Sahana Iyer", ageGroup: "6–8", level: "Beginner", batch: "Batch A", attendance: 95, lastUpdate: "2025-03-10", membershipType: "Monthly", coachName: "Coach Rahul", emergencyContact: "+91 91234 56789", trainingGoals: ["Improve freestyle", "Build endurance"], recentAttendance: [{ date: "2025-03-08", status: "Present" }, { date: "2025-03-06", status: "Absent" }], progressSummary: "Consistent improvements on lap times.", remarks: "Needs to work on flip turns." },
];

export interface CoachSession {
  id: string;
  time: string;
  batch: string;
  trainees: number;
  pool: string;
  type: string;
  status: "Upcoming" | "Ongoing" | "Completed";
}

export const coachSchedule: CoachSession[] = [
  { id: "s1", time: "5:30 AM", batch: "Batch A", trainees: 12, pool: "Pool 1", type: "Technique", status: "Upcoming" },
  { id: "s2", time: "6:30 AM", batch: "Batch B", trainees: 9, pool: "Pool 2", type: "Endurance", status: "Ongoing" },
  { id: "s3", time: "7:30 AM", batch: "Batch C", trainees: 5, pool: "Pool 1", type: "Beginners", status: "Completed" },
  { id: "s4", time: "4:00 PM", batch: "Batch A", trainees: 11, pool: "Pool 3", type: "Sprint", status: "Upcoming" },
];

export interface AttendanceStatus {
  trainee: string;
  status: "Present" | "Absent" | "Late";
}

export interface AttendanceRecord {
  id: string;
  batch: string;
  date: string;
  attendees: AttendanceStatus[];
}

export const coachAttendance: AttendanceRecord[] = [
  {
    id: "a1",
    batch: "Batch A",
    date: "2025-03-10",
    attendees: [
      { trainee: "Riya Patel", status: "Present" },
      { trainee: "Sahana Iyer", status: "Late" },
      { trainee: "Karan Mehta", status: "Absent" },
    ],
  },
];

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

export const coachProgress: ProgressRecord[] = [
  {
    id: "p1",
    trainee: "Riya Patel",
    level: "Intermediate",
    stamina: 80,
    breathing: 70,
    consistency: 85,
    technique: 75,
    confidence: 90,
    note: "Good form, needs to work on turns.",
    lastUpdated: "2025-03-08",
  },
  {
    id: "p2",
    trainee: "Vikram Singh",
    level: "Advanced",
    stamina: 60,
    breathing: 65,
    consistency: 70,
    technique: 80,
    confidence: 75,
    note: "Strong starts but stamina dips mid-session.",
    lastUpdated: "2025-03-09",
  },
  {
    id: "p3",
    trainee: "Aarav Patel",
    level: "Beginner",
    stamina: 50,
    breathing: 55,
    consistency: 60,
    technique: 50,
    confidence: 45,
    note: "Just joined, needs orientation on breathing.",
    lastUpdated: "2025-03-10",
  },
];

export const recentNotes = [
  { id: "n1", text: "Riya showing great improvement on butterfly.", date: "2025-03-08" },
  { id: "n2", text: "Vikram struggled with pacing today.", date: "2025-03-09" },
];

export const assignedGroups = [
  { id: "g1", name: "Batch A", level: "Intermediate", size: 12 },
  { id: "g2", name: "Batch B", level: "Advanced", size: 9 },
  { id: "g3", name: "Batch C", level: "Beginner", size: 5 },
];

export const coachStats = {
  totalTrainees: coachTrainees.length,
  todaysSessions: coachSchedule.filter((s) => s.status === "Upcoming" || s.status === "Ongoing").length,
  avgAttendance: 88,
  progressPending: 3,
};
