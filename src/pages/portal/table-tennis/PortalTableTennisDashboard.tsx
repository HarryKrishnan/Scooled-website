import { 
  CalendarCheck, CreditCard, GraduationCap, Clock
} from "lucide-react";
import { allSportMemberships, allSportPrograms, userEnrollments } from "@/data/mockData";
import SportDashboard from "@/components/portal/SportDashboard";

const upcomingBooking = { date: "Tomorrow, March 11", time: "7:00 PM – 8:00 PM", centre: "Westside", type: "Scrimmage" };
const portalUser = "Aarav Patel";

export default function PortalTableTennisDashboard() {
  const sportName = "Table Tennis";
  
  // Map allSportPrograms to campaigns
  const campaigns = allSportPrograms[sportName].map(p => ({
    id: p.id,
    title: p.title,
    desc: p.description,
    image: p.image,
    badge: p.badge.replace(/[^a-zA-Z\s]/g, '').trim(),
    basePrice: p.price
  }));

  // Get active membership for this sport
  const membership = allSportMemberships[sportName][0]; 

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
      nextSession: "Sat, 11:00 AM",
      attendanceRate: 90
    },
    {
      programId: "tt2",
      title: "Advanced Spin Control",
      coach: "Coach Rahul",
      sessionsTotal: 8,
      sessionsCompleted: 6,
      progress: 75,
      nextSession: "Wed, 7:00 PM",
      attendanceRate: 80
    }
  ];

  return (
    <SportDashboard
      sportName={sportName}
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
      membership={membership}
    />
  );
}
