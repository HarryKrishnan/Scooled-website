import SportMemberships from "@/components/portal/SportMemberships";
import { userActiveMembership, membershipPlans } from "@/data/mockData";
import { ShieldCheck, Calendar, History } from "lucide-react";
import summerSplashImg from "@/assets/summer_splash_offer_bg_1773151662663.png";
import proCoachingImg from "@/assets/pro_coaching_bundle_bg_1773151684239.png";

export default function PortalMemberships() {
  const activePlan = {
    ...userActiveMembership,
    usage: {
      metric1Label: "Pool Visits",
      metric1Value: userActiveMembership.usage.poolAccess,
      metric1Sub: "this month",
      metric2Label: "Guest Passes",
      metric2Value: `${userActiveMembership.usage.guestPassesUsed} / ${userActiveMembership.usage.guestPassesTotal}`,
      metric3Label: "Discount Active",
      metric3Value: "10% Off",
      metric3Sub: "coaching"
    }
  };

  const redeemedAddons = [
    { 
      id: 1, name: "Summer Splash Bonus", type: "Discount", val: "20% Off Renewals", expiry: "Aug 2026", 
      color: "text-emerald-500", bg: "bg-emerald-500/10", image: summerSplashImg, 
      desc: "An exclusive summer benefit providing significant discounts on all annual plan renewals."
    },
    { 
      id: 2, name: "Pro Coaching Pack", type: "Benefit", val: "+2 Free Sessions", expiry: "Apr 2026", 
      color: "text-primary", bg: "bg-primary/10", image: proCoachingImg, 
      desc: "Master your strokes with two additional expert coaching sessions included in your plan."
    },
    { 
      id: 3, name: "Early Bird Access", type: "Priority", val: "Daily 5AM Entry", expiry: "Dec 2025", 
      color: "text-gold", bg: "bg-gold/10", image: summerSplashImg, 
      desc: "Get exclusive early morning access to the Olympic pool before standard hours."
    },
  ];

  const upgradePlans = membershipPlans.filter(p => p.id !== activePlan.id);

  const perks = [
    { icon: ShieldCheck, title: "Priority Booking", desc: "Access slots 24h before non-members.", color: "text-emerald-500" },
    { icon: Calendar, title: "Free Cancellations", desc: "No fees for session cancellations.", color: "text-primary" },
    { icon: History, title: "Visit History", desc: "Detailed logs of your monthly activity.", color: "text-gold" },
  ];

  return (
    <SportMemberships
      title="Memberships"
      subtitle="Manage your subscription and explore premium aquatic plans."
      headerBorderClass="border-blue-tile"
      activePlan={activePlan}
      redeemedAddons={redeemedAddons}
      upgradePlans={upgradePlans}
      perksTitle="Membership Perks"
      perks={perks}
      promoButtonClass="bg-gold hover:bg-gold-light hover:shadow-gold/20 shadow-gold/10"
    />
  );
}
