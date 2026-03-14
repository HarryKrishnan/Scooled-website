import { 
  CalendarCheck, CreditCard, GraduationCap, Clock
} from "lucide-react";
import { allSportMemberships, allSportPrograms, userEnrollments } from "@/data/mockData";
import SportDashboard from "@/components/portal/SportDashboard";

const upcomingBooking = { date: "Tomorrow, March 11", time: "7:00 PM – 8:00 PM", centre: "Westside", type: "Scrimmage" };
const portalUser = "Aarav Patel";

export default function PortalTableTennisDashboard() {
  const sportName = "Table Tennis";
  
  const memberStatus = localStorage.getItem('scooled_member_status');
  const isTrial = memberStatus !== 'active';

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
  const mockMembership = allSportMemberships[sportName][0]; 
  const membership = {
    name: mockMembership.name,
    status: "Active",
    expiryDate: "July 10, 2025"
  };

  return (
    <SportDashboard
      sportName={sportName}
      accentColor="text-purple-500"
      accentBg="bg-purple-500/10"
      accentBorder="border-purple-500/20"
      accentBadge="bg-purple-500"
      tileColor="purple-tile"
      welcomeName={portalUser}
      welcomeSubtitle="You have 2 table tennis bookings scheduled this week."
      statsPoint={600}
      campaigns={campaigns}
      upcomingBooking={upcomingBooking}
      quickActions={[]}
      enrollments={userEnrollments.filter(e => e.programId.startsWith('tt-'))}
      membership={membership}
      isTrial={isTrial}
    />
  );
}
