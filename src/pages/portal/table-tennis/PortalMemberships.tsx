import SportMemberships from "@/components/portal/SportMemberships";
import { userActiveMembership, membershipPlans } from "@/data/mockData";
import { ShieldCheck, Calendar, History } from "lucide-react";
import ttImg1 from "@/assets/hero-table-tennis.png";
import ttImg2 from "@/assets/prog-tt-competitive.png";

export default function PortalMemberships() {
  const activePlan = {
    ...userActiveMembership,
    name: "Table Tennis Pro",
    usage: {
      metric1Label: "Table Sessions",
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
      id: 1, name: "Spin Master Bonus", type: "Discount", val: "20% Off Renewals", expiry: "Aug 2026", 
      color: "text-red-500", bg: "bg-red-500/10", image: ttImg1, 
      desc: "An exclusive benefit providing significant discounts on all annual plan renewals."
    },
    { 
      id: 2, name: "Robot Training Pack", type: "Benefit", val: "+2 Free Sessions", expiry: "Apr 2026", 
      color: "text-primary", bg: "bg-primary/10", image: ttImg2, 
      desc: "Master your strokes with two additional robot training sessions included in your plan."
    }
  ];

  const upgradePlans = membershipPlans.filter(p => p.id !== activePlan.id).map(p => ({
    ...p,
    name: p.name.replace("Quarterly", "Tournament Tier").replace("Annual", "Elite Tier"),
    features: p.features.map(f => f.replace("pool access", "table access").replace("coaching discount", "tournament discount"))
  }));

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
      promoButtonClass="bg-red-500 hover:bg-red-400 hover:shadow-red-500/20 shadow-red-500/10"
    />
  );
}
