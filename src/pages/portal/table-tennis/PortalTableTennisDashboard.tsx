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
      quickActions={[]}
      enrollments={userEnrollments.filter(e => e.programId.startsWith('tt-'))}
      membership={membership}
    />
  );
}
