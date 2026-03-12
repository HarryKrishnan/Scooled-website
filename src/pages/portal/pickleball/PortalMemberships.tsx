import SportMemberships from "@/components/portal/SportMemberships";
import { allSportMemberships } from "@/data/mockData";
import { ShieldCheck, Calendar, History } from "lucide-react";
import pbImg1 from "@/assets/hero-pickleball.png";
import pbImg2 from "@/assets/prog-pickleball-competitive.png";

export default function PortalMemberships() {
  const sportName = "Pickleball";
  const memberships = allSportMemberships[sportName];
  
  // Use the first membership as "active" for Pickleball mock
  const mockActive = memberships[0];

  const activePlan = {
    ...mockActive,
    status: "Active",
    expiryDate: "2025-06-15",
    usage: {
      metric1Label: "Court Sessions",
      metric1Value: "8",
      metric1Sub: "this month",
      metric2Label: "Guest Passes",
      metric2Value: `1 / ${mockActive.features.find(f => f.includes("Guest"))?.match(/\d+/)?.[0] || 0}`,
      metric3Label: "Discount Active",
      metric3Value: "15% Off",
      metric3Sub: "gear"
    }
  };

  const redeemedAddons = [
    { 
      id: 1, name: "Paddle Pro Pack", type: "Discount", val: "20% Off Gear", expiry: "Aug 2026", 
      color: "text-emerald-500", bg: "bg-emerald-500/10", image: pbImg1, 
      desc: "An exclusive benefit providing significant discounts on all premium pickleball paddles."
    },
    { 
      id: 2, name: "Advanced Coaching", type: "Benefit", val: "+2 Free Sessions", expiry: "Apr 2026", 
      color: "text-primary", bg: "bg-primary/10", image: pbImg2, 
      desc: "Master your dinks with two additional expert coaching sessions included in your plan."
    }
  ];

  const upgradePlans = memberships.filter(p => p.id !== mockActive.id);

  const perks = [
    { icon: ShieldCheck, title: "Priority Booking", desc: "Access slots 24h before non-members.", color: "text-emerald-500" },
    { icon: Calendar, title: "Free Cancellations", desc: "No fees for session cancellations.", color: "text-green-500" },
    { icon: History, title: "Play History", desc: "Detailed logs of your monthly matches.", color: "text-gold" },
  ];

  return (
    <SportMemberships
      title="Pickleball Memberships"
      subtitle="Manage your subscription and explore premium pickleball plans."
      headerBorderClass="border-green-tile"
      activePlan={activePlan}
      redeemedAddons={redeemedAddons}
      upgradePlans={upgradePlans}
      perksTitle="Player Perks"
      perks={perks}
      accentColor="text-emerald-500"
      promoButtonClass="bg-emerald-500 hover:bg-emerald-400"
    />
  );
}
