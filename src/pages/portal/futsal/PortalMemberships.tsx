import SportMemberships from "@/components/portal/SportMemberships";
import { userActiveMembership, membershipPlans } from "@/data/mockData";
import { ShieldCheck, Calendar, History } from "lucide-react";
import futsalImg from "@/assets/hero-futsal.png";
import courtImg from "@/assets/prog-futsal-competitive.png";

export default function PortalMemberships() {
  const activePlan = {
    ...userActiveMembership,
    name: "Futsal Court Access",
    usage: {
      metric1Label: "Court Sessions",
      metric1Value: userActiveMembership.usage.poolAccess,
      metric1Sub: "this month",
      metric2Label: "Guest Passes",
      metric2Value: `${userActiveMembership.usage.guestPassesUsed} / ${userActiveMembership.usage.guestPassesTotal}`,
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

  const upgradePlans = membershipPlans.filter(p => p.id !== activePlan.id).map(p => ({
    ...p,
    name: p.name.replace("Quarterly", "League Tier").replace("Annual", "Pro Team Tier"),
    features: p.features.map(f => f.replace("pool access", "court access").replace("coaching discount", "tournament discount"))
  }));

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
