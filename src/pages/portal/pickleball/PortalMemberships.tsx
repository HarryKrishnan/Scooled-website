import SportMemberships from "@/components/portal/SportMemberships";
import { userActiveMembership, membershipPlans } from "@/data/mockData";
import { ShieldCheck, Calendar, History } from "lucide-react";
import pbImg1 from "@/assets/hero-pickleball.png";
import pbImg2 from "@/assets/prog-pickleball-competitive.png";

export default function PortalMemberships() {
  const activePlan = {
    ...userActiveMembership,
    name: "Pickleball Social Play",
    usage: {
      metric1Label: "Court Sessions",
      metric1Value: userActiveMembership.usage.poolAccess,
      metric1Sub: "this month",
      metric2Label: "Guest Passes",
      metric2Value: `${userActiveMembership.usage.guestPassesUsed} / ${userActiveMembership.usage.guestPassesTotal}`,
      metric3Label: "Discount Active",
      metric3Value: "15% Off",
      metric3Sub: "paddles"
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

  const upgradePlans = membershipPlans.filter(p => p.id !== activePlan.id).map(p => ({
    ...p,
    name: p.name.replace("Quarterly", "Tournament Tier").replace("Annual", "Pro Player Tier"),
    features: p.features.map(f => f.replace("pool access", "court access").replace("coaching discount", "gear discount"))
  }));

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
      promoButtonClass="bg-emerald-500 hover:bg-emerald-400 hover:shadow-emerald-500/20 shadow-emerald-500/10"
    />
  );
}
