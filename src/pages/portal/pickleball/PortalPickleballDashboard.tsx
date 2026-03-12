import { 
  CalendarCheck, CreditCard, GraduationCap, Clock
} from "lucide-react";
import { allSportMemberships, allSportPrograms, userEnrollments } from "@/data/mockData";
import SportDashboard from "@/components/portal/SportDashboard";

const upcomingBooking = { date: "Tomorrow, March 11", time: "7:00 PM – 8:00 PM", centre: "Westside", type: "Scrimmage" };
const portalUser = "Aarav Patel";

export default function PortalPickleballDashboard() {
  const sportName = "Pickleball";
  
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
    { label: "Book a Court", path: "/portal/pickleball/book", icon: CalendarCheck, color: "bg-emerald-500/10 text-emerald-500" },
    { label: "My Matches", path: "/portal/pickleball/bookings", icon: Clock, color: "bg-cyan/10 text-cyan" },
    { label: "View Leagues", path: "/portal/pickleball/programs", icon: GraduationCap, color: "bg-emerald-500/10 text-emerald-500" },
    { label: "Pay Fees", path: "/portal/pickleball/payments", icon: CreditCard, color: "bg-gold/10 text-gold" },
  ];

  // For mock purposes, we'll keep using the sport-specific hardcoded enrollments if they look better, 
  // or we can add them to mockData.ts later. For now, keep the local ones but ensure it's sport-specific.
  const pickleballEnrollments = [
    {
      programId: "pb1",
      title: "Saturday League",
      coach: "Coach Arjun",
      sessionsTotal: 12,
      sessionsCompleted: 4,
      progress: 33,
      nextSession: "Sat, 10:00 AM",
      attendanceRate: 100
    },
    {
      programId: "pb2",
      title: "Advanced Ball Control",
      coach: "Coach Rahul",
      sessionsTotal: 8,
      sessionsCompleted: 6,
      progress: 75,
      nextSession: "Thu, 6:00 PM",
      attendanceRate: 85
    }
  ];

  return (
    <SportDashboard
      sportName={sportName}
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
      membership={membership}
    />
  );
}
