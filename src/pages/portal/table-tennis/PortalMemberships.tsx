import SportMemberships from "@/components/portal/SportMemberships";
import { allSportMemberships } from "@/data/mockData";
import { ShieldCheck, Calendar, History } from "lucide-react";
import ttImg1 from "@/assets/hero-table-tennis.png";
import ttImg2 from "@/assets/prog-tt-competitive.png";

export default function PortalMemberships() {
  const sportName = "Table Tennis";
  const memberships = allSportMemberships[sportName];
  
  // Use the first membership as "active" for TT mock
  const mockActive = memberships[0];

  const activePlan = {
    ...mockActive,
    status: "Active",
    expiryDate: "2025-07-20",
    usage: {
      metric1Label: "Table Sessions",
      metric1Value: "12",
      metric1Sub: "this month",
      metric2Label: "Guest Passes",
      metric2Value: `2 / ${mockActive.features.find(f => f.includes("Guest"))?.match(/\d+/)?.[0] || 0}`,
      metric3Label: "Discount Active",
      metric3Value: "10% Off",
      metric3Sub: "tournaments"
    }
  };

  const redeemedAddons = [
    { 
      id: 1, name: "Spin Master Pack", type: "Discount", val: "20% Off Renewals", expiry: "Aug 2026", 
      color: "text-red-500", bg: "bg-red-500/10", image: ttImg1, 
      desc: "An exclusive benefit providing significant discounts on all annual plan renewals."
    },
    { 
      id: 2, name: "Robot Training", type: "Benefit", val: "+2 Free Sessions", expiry: "Apr 2026", 
      color: "text-primary", bg: "bg-primary/10", image: ttImg2, 
      desc: "Master your strokes with two additional robot training sessions included in your plan."
    }
  ];

  const upgradePlans = memberships.filter(p => p.id !== mockActive.id);

  const perks = [
    { icon: ShieldCheck, title: "Priority Booking", desc: "Access tables 24h before non-members.", color: "text-emerald-500" },
    { icon: Calendar, title: "Free Cancellations", desc: "No fees for session cancellations.", color: "text-red-500" },
    { icon: History, title: "Match History", desc: "Detailed logs of your monthly activity.", color: "text-gold" },
  ];

  return (
    <SportMemberships
      title="Table Tennis Memberships"
      subtitle="Manage your subscription and explore premium table tennis plans."
      headerBorderClass="border-red-tile"
      activePlan={activePlan}
      redeemedAddons={redeemedAddons}
      upgradePlans={upgradePlans}
      perksTitle="Player Perks"
      perks={perks}
      accentColor="text-red-500"
      promoButtonClass="bg-red-500 hover:bg-red-600"
    />
  );
}
