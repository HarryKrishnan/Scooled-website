import { 
  CalendarCheck, CreditCard, GraduationCap, Clock
} from "lucide-react";
import progPickleballKids from "@/assets/prog-pickleball-kids.png";
import progPickleballCompetitive from "@/assets/prog-pickleball-competitive.png";
import progPickleballAdult from "@/assets/prog-pickleball-adult.png";
import progPickleballWeekend from "@/assets/prog-pickleball-weekend.png";
import SportDashboard from "@/components/portal/SportDashboard";

const campaigns = [
  { id: 1, title: "Beginner Pickleball Clinic", desc: "Learn the fastest growing sport with our expert coaches.", image: progPickleballKids, badge: "New", basePrice: 4000 },
  { id: 2, title: "Weekend Social Play", desc: "Open play sessions every weekend. Meet new players!", image: progPickleballCompetitive, badge: "Popular", basePrice: 1500 },
  { id: 3, title: "Pickleball Ladder League", desc: "Compete and climb the ranks in our official competitive league.", image: progPickleballAdult, badge: "Competitive", basePrice: 3500 },
  { id: 4, title: "Family Day Tournament", desc: "Parent-child tournament every Sunday. Prizes to be won!", image: progPickleballWeekend, badge: "Weekend Only", basePrice: 1000 }
];

const upcomingBooking = { date: "Tomorrow, March 11", time: "7:00 PM – 8:00 PM", centre: "Westside", type: "Scrimmage" };
const portalUser = "Aarav Patel";

const quickActions = [
  { label: "Book a Court", path: "/portal/pickleball/book", icon: CalendarCheck, color: "bg-emerald-500/10 text-emerald-500" },
  { label: "My Matches", path: "/portal/pickleball/bookings", icon: Clock, color: "bg-cyan/10 text-cyan" },
  { label: "View Leagues", path: "/portal/pickleball/programs", icon: GraduationCap, color: "bg-emerald-500/10 text-emerald-500" },
  { label: "Pay Fees", path: "/portal/pickleball/payments", icon: CreditCard, color: "bg-gold/10 text-gold" },
];

const pickleballEnrollments = [
  {
    programId: "pb1",
    title: "Saturday League",
    coach: "Coach Arjun",
    sessionsTotal: 12,
    sessionsCompleted: 4,
    progress: 33,
  },
  {
    programId: "pb2",
    title: "Advanced Ball Control",
    coach: "Coach Rahul",
    sessionsTotal: 8,
    sessionsCompleted: 6,
    progress: 75,
  }
];

const pickleballMembership = {
  name: "Pickleball Membership",
  status: "Active",
  expiryDate: "2025-06-15",
};

export default function PortalPickleballDashboard() {
  return (
    <SportDashboard
      sportName="Pickleball"
      accentColor="text-emerald-500"
      accentBg="bg-emerald-500/10"
      accentBorder="border-emerald-500/20"
      accentBadge="bg-emerald-500"
      tileColor="green-tile"
      welcomeName={portalUser}
      welcomeSubtitle="You have 2 pickleball sessions scheduled this week."
      statsPoint={850}
      campaigns={campaigns}
      upcomingBooking={upcomingBooking}
      quickActions={quickActions}
      enrollments={pickleballEnrollments}
      membership={pickleballMembership}
    />
  );
}
