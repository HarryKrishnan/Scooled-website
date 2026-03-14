import { useNavigate } from "react-router-dom";
import { 
  CalendarCheck, CreditCard, GraduationCap, Clock
} from "lucide-react";
import { allSportMemberships, allSportPrograms, userEnrollments } from "@/data/mockData";
import SportDashboard from "@/components/portal/SportDashboard";

const upcomingBooking = { date: "Today, March 10", time: "6:30 AM – 7:30 AM", centre: "Downtown", type: "Open Play" };
const portalUser = "Aarav Patel";

export default function PortalDashboard() {
  const sportName = "Futsal";
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

  // Get active membership for this sport (using index 1 for Futsal mock)
  const mockMembership = allSportMemberships[sportName][1]; 
  const membership = {
    name: mockMembership.name,
    status: "Active",
    expiryDate: "April 15, 2025"
  };

  const quickActions = [
    { label: "Book a Slot", path: "/portal/futsal/book", icon: CalendarCheck, color: "bg-primary/10 text-primary" },
    { label: "My Bookings", path: "/portal/futsal/bookings", icon: Clock, color: "bg-cyan/10 text-cyan" },
    { label: "View Programs", path: "/portal/futsal/programs", icon: GraduationCap, color: "bg-orange-500/10 text-orange-500" },
    { label: "Make Payment", path: "/portal/futsal/payments", icon: CreditCard, color: "bg-gold/10 text-gold" },
  ];

  return (
    <SportDashboard
      sportName={sportName}
      accentColor="text-primary"
      accentBg="bg-primary/10"
      accentBorder="border-primary/20"
      accentBadge="bg-primary"
      tileColor="orange-tile"
      welcomeName={portalUser}
      statsPoint={1250}
      campaigns={campaigns}
      upcomingBooking={upcomingBooking}
      quickActions={quickActions}
      enrollments={userEnrollments}
      membership={membership}
      isTrial={isTrial}
    />
  );
}
