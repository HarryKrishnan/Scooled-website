import SportMemberships from "@/components/portal/SportMemberships";
import { allSportMemberships } from "@/data/mockData";
import { ShieldCheck, Calendar, History } from "lucide-react";
import futsalImg from "@/assets/hero-futsal.png";
import courtImg from "@/assets/prog-futsal-competitive.png";

export default function PortalMemberships() {
  const sportName = "Futsal";
  const memberships = allSportMemberships[sportName];
  
  // Use a middle plan as "active" for Futsal mock
  const mockActive = memberships[1];

  const activePlan = {
    ...mockActive,
    status: "Active",
    expiryDate: "2025-05-20",
    usage: {
      metric1Label: "Court Sessions",
      metric1Value: 12,
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
      id: 1, name: "Weekend Warrior", type: "Benefit", val: "Weekend Slots", expiry: "Aug 2026", 
      color: "text-emerald-500", bg: "bg-emerald-500/10", image: futsalImg, 
      desc: "Guaranteed priority booking for peak weekend court times."
    },
    { 
      id: 2, name: "Team Coaching Pack", type: "Training", val: "+2 Free Sessions", expiry: "Apr 2026", 
      color: "text-primary", bg: "bg-primary/10", image: courtImg, 
      desc: "Master tactical futsal plays with two team coaching sessions included."
    }
  ];

  const upgradePlans = memberships.filter(p => memberships.indexOf(p) > memberships.indexOf(mockActive));

  const perks = [
    { icon: ShieldCheck, title: "Priority Booking", desc: "Access slots 24h before non-members.", color: "text-emerald-500" },
    { icon: Calendar, title: "Free Cancellations", desc: "No fees for session cancellations.", color: "text-orange-500" },
    { icon: History, title: "Match History", desc: "Detailed logs of your monthly games.", color: "text-gold" },
  ];

  return (
    <SportMemberships
      title="Futsal Memberships"
      subtitle="Manage your team's subscription and explore premium futsal plans."
      headerBorderClass="border-orange-tile"
      activePlan={activePlan}
      redeemedAddons={redeemedAddons}
      upgradePlans={upgradePlans}
      perksTitle="Futsal Perks"
      perks={perks}
      promoButtonClass="bg-orange-500 hover:bg-orange-400 hover:shadow-orange-500/20 shadow-orange-500/10"
    />
  );
}
