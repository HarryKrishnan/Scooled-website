import { 
  CalendarCheck, CreditCard, GraduationCap, Clock
} from "lucide-react";
import { allSportMemberships, allSportPrograms, userEnrollments } from "@/data/mockData";
import SportDashboard from "@/components/portal/SportDashboard";

const upcomingBooking = { date: "Tomorrow, March 11", time: "7:00 PM – 8:00 PM", centre: "Westside", type: "Scrimmage" };
const portalUser = "Aarav Patel";

export default function PortalPickleballDashboard() {
  const sportName = "Pickleball";
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
    expiryDate: "May 20, 2025"
  };

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
      quickActions={[]}
      enrollments={userEnrollments.filter(e => e.programId.startsWith('pb-'))}
      membership={membership}
      isTrial={isTrial}
    />
  );
}
