import { 
  CalendarCheck, CreditCard, GraduationCap, Clock
} from "lucide-react";
import progFutsalKids from "@/assets/prog-futsal-kids.png";
import progFutsalCompetitive from "@/assets/prog-futsal-competitive.png";
import progFutsalAdult from "@/assets/prog-futsal-adult.png";
import progFutsalWeekend from "@/assets/prog-futsal-weekend.png";
import SportDashboard from "@/components/portal/SportDashboard";

const campaigns = [
  { id: 1, title: "Beginner Futsal Training", desc: "Start your futsal journey with expert 60-minute sessions.", image: progFutsalKids, badge: "New Members", basePrice: 4000 },
  { id: 2, title: "Pro Striker Bundle", desc: "10 personal training sessions with Coach Arjun for finishing skills.", image: progFutsalCompetitive, badge: "Popular", basePrice: 6000 },
  { id: 3, title: "Late Night Futsal Scrimmage", desc: "Friday night under the lights. Unlimited 5v5 action.", image: progFutsalAdult, badge: "Members", basePrice: 500 },
  { id: 4, title: "Weekend Futsal Tournament", desc: "Competitive 5v5 tournament every Sunday. Prizes to be won!", image: progFutsalWeekend, badge: "Weekend Only", basePrice: 1000 }
];

const upcomingBooking = { date: "Tomorrow, March 11", time: "7:00 PM – 8:00 PM", centre: "Westside", type: "Scrimmage" };
const portalUser = "Aarav Patel";

const quickActions = [
  { label: "Book a Court", path: "/portal/futsal/book", icon: CalendarCheck, color: "bg-orange-500/10 text-orange-500" },
  { label: "My Matches", path: "/portal/futsal/bookings", icon: Clock, color: "bg-cyan/10 text-cyan" },
  { label: "View Teams", path: "/portal/futsal/programs", icon: GraduationCap, color: "bg-orange-500/10 text-orange-500" },
  { label: "Pay Fees", path: "/portal/futsal/payments", icon: CreditCard, color: "bg-gold/10 text-gold" },
];

const futsalEnrollments = [
  {
    programId: "fp1",
    title: "Saturday League",
    coach: "Coach Arjun",
    sessionsTotal: 12,
    sessionsCompleted: 4,
    progress: 33,
  },
  {
    programId: "fp2",
    title: "Advanced Ball Control",
    coach: "Coach Rahul",
    sessionsTotal: 8,
    sessionsCompleted: 6,
    progress: 75,
  }
];

const futsalMembership = {
  name: "Futsal Membership",
  status: "Active",
  expiryDate: "2025-06-15",
};

export default function PortalFutsalDashboard() {
  return (
    <SportDashboard
      sportName="Futsal"
      accentColor="text-orange-500"
      accentBg="bg-orange-500/10"
      accentBorder="border-orange-500/20"
      accentBadge="bg-orange-500"
      tileColor="orange-tile"
      welcomeName={portalUser}
      welcomeSubtitle="You have 2 futsal matches scheduled this week."
      statsPoint={850}
      campaigns={campaigns}
      upcomingBooking={upcomingBooking}
      quickActions={[]}
      enrollments={futsalEnrollments}
      membership={futsalMembership}
    />
  );
}
