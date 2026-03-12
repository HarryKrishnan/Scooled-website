import { useNavigate } from "react-router-dom";
import { 
  CalendarCheck, CreditCard, GraduationCap, Clock
} from "lucide-react";
import { userActiveMembership, userEnrollments } from "@/data/mockData";
import summerSplashImg from "@/assets/summer_splash_offer_bg_1773151662663.png";
import proCoachingImg from "@/assets/pro_coaching_bundle_bg_1773151684239.png";
import aquaFitnessImg from "@/assets/aqua_fitness_masterclass_bg_1773152099078.png";
import familyWeekendImg from "@/assets/family_weekend_special_bg_1773152117111.png";
import SportDashboard from "@/components/portal/SportDashboard";

const campaigns = [
  { id: 1, title: "Summer Splash Offer", desc: "Get 20% off on Annual Memberships this week!", image: summerSplashImg, badge: "Limited Time", basePrice: 5000 },
  { id: 2, title: "Pro Coaching Bundle", desc: "Buy 10 sessions, get 2 free for advanced swimmers.", image: proCoachingImg, badge: "Popular", basePrice: 3500 },
  { id: 3, title: "Aqua Fitness Masterclass", desc: "Join our expert-led aqua aerobics for a full-body workout.", image: aquaFitnessImg, badge: "New", basePrice: 1200 },
  { id: 4, title: "Family Weekend Special", desc: "Kids swim for free every Saturday & Sunday morning.", image: familyWeekendImg, badge: "Weekend Only", basePrice: 800 }
];

const upcomingBooking = { date: "Today, March 10", time: "6:30 AM – 7:30 AM", centre: "Downtown", type: "Open Swim" };
const portalUser = "Aarav Patel";

const quickActions = [
  { label: "Book a Slot", path: "/portal/swimming/book", icon: CalendarCheck, color: "bg-primary/10 text-primary" },
  { label: "My Bookings", path: "/portal/swimming/bookings", icon: Clock, color: "bg-cyan/10 text-cyan" },
  { label: "View Programs", path: "/portal/swimming/programs", icon: GraduationCap, color: "bg-aqua/10 text-aqua" },
  { label: "Make Payment", path: "/portal/swimming/payments", icon: CreditCard, color: "bg-gold/10 text-gold" },
];

export default function PortalDashboard() {
  return (
    <SportDashboard
      sportName="Swimming"
      accentColor="text-primary"
      accentBg="bg-primary/10"
      accentBorder="border-primary/20"
      accentBadge="bg-primary"
      tileColor="blue-tile"
      welcomeName={portalUser}
      statsPoint={1250}
      campaigns={campaigns}
      upcomingBooking={upcomingBooking}
      quickActions={quickActions}
      enrollments={userEnrollments}
      membership={userActiveMembership}
    />
  );
}
