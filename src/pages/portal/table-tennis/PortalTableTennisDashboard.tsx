import { 
  CalendarCheck, CreditCard, GraduationCap, Clock
} from "lucide-react";
import progTtKids from "@/assets/prog-tt-kids.png";
import progTtCompetitive from "@/assets/prog-tt-competitive.png";
import progTtAdult from "@/assets/prog-tt-adult.png";
import progTtWeekend from "@/assets/prog-tt-weekend.png";
import SportDashboard from "@/components/portal/SportDashboard";

const campaigns = [
  { id: 1, title: "Table Tennis Coaching Clinic", desc: "Master your spins and serves with professional coaching.", image: progTtKids, badge: "All Levels", basePrice: 3000 },
  { id: 2, title: "Weekend Table Tennis Tournament", desc: "Compete against local players for cash prizes and medals.", image: progTtCompetitive, badge: "Competitive", basePrice: 1500 },
  { id: 3, title: "Intermediate Training Camp", desc: "Take your skills to the next level in this intensive weekend camp.", image: progTtAdult, badge: "Intense", basePrice: 5000 },
  { id: 4, title: "Family Day Tournament", desc: "Parent-child tournament every Sunday. Prizes to be won!", image: progTtWeekend, badge: "Weekend Only", basePrice: 1000 }
];

const upcomingBooking = { date: "Tomorrow, March 11", time: "7:00 PM – 8:00 PM", centre: "Westside", type: "Scrimmage" };
const portalUser = "Aarav Patel";

const quickActions = [
  { label: "Book a Table", path: "/portal/table-tennis/book", icon: CalendarCheck, color: "bg-rose-500/10 text-rose-500" },
  { label: "My Matches", path: "/portal/table-tennis/bookings", icon: Clock, color: "bg-cyan/10 text-cyan" },
  { label: "View Leagues", path: "/portal/table-tennis/programs", icon: GraduationCap, color: "bg-rose-500/10 text-rose-500" },
  { label: "Pay Fees", path: "/portal/table-tennis/payments", icon: CreditCard, color: "bg-gold/10 text-gold" },
];

const ttEnrollments = [
  {
    programId: "tt1",
    title: "Saturday League",
    coach: "Coach Arjun",
    sessionsTotal: 12,
    sessionsCompleted: 4,
    progress: 33,
  },
  {
    programId: "tt2",
    title: "Advanced Spin Control",
    coach: "Coach Rahul",
    sessionsTotal: 8,
    sessionsCompleted: 6,
    progress: 75,
  }
];

const ttMembership = {
  name: "Table Tennis Membership",
  status: "Active",
  expiryDate: "2025-06-15",
};

export default function PortalTableTennisDashboard() {
  return (
    <SportDashboard
      sportName="Table Tennis"
      accentColor="text-rose-500"
      accentBg="bg-rose-500/10"
      accentBorder="border-rose-500/20"
      accentBadge="bg-rose-500"
      tileColor="red-tile"
      welcomeName={portalUser}
      welcomeSubtitle="You have 2 table tennis bookings scheduled this week."
      statsPoint={850}
      campaigns={campaigns}
      upcomingBooking={upcomingBooking}
      quickActions={quickActions}
      enrollments={ttEnrollments}
      membership={ttMembership}
    />
  );
}
