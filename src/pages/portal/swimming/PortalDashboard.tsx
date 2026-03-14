import { useNavigate } from "react-router-dom";
import { 
  CalendarCheck, CreditCard, GraduationCap, Clock
} from "lucide-react";
import { allSportMemberships, allSportPrograms, userEnrollments } from "@/data/mockData";
import SportDashboard from "@/components/portal/SportDashboard";

const upcomingBooking = { date: "Today, March 10", time: "6:30 AM – 7:30 AM", centre: "Downtown", type: "Open Swim" };
const portalUser = "Aarav Patel";

export default function PortalDashboard() {
  const sportName = "Swimming";
  
  const memberStatus = localStorage.getItem('scooled_member_status');
  const isTrial = memberStatus !== 'active';

  // Map allSportPrograms to campaigns
  const campaigns = allSportPrograms[sportName].map(p => ({
    id: p.id,
    title: p.title,
    desc: p.description,
    image: p.image,
    badge: p.badge.replace(/[^a-zA-Z\s]/g, '').trim(), // Remove emojis for the badge text if preferred, or keep them
    basePrice: p.price
  }));

  // Get active membership for this sport (using index 0 for now as mock)
  const mockMembership = allSportMemberships[sportName][0]; 
  const membership = {
    name: mockMembership.name,
    status: "Active",
    expiryDate: "June 12, 2025"
  };

  return (
    <SportDashboard
      sportName={sportName}
      accentColor="text-primary"
      accentBg="bg-primary/10"
      accentBorder="border-primary/20"
      accentBadge="bg-primary"
      tileColor="blue-tile"
      welcomeName={portalUser}
      statsPoint={1250}
      campaigns={campaigns}
      upcomingBooking={upcomingBooking}
      quickActions={[]}
      enrollments={userEnrollments.filter(e => e.programId.startsWith('sw-'))}
      membership={membership}
      isTrial={isTrial}
    />
  );
}
