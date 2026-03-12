import SportBookings from "@/components/portal/SportBookings";

const bookings = [
  { id: "b1", date: "Mar 10, 2026", time: "6:30 AM – 7:30 AM", centre: "Downtown", type: "Court Play", status: "Upcoming" },
  { id: "b2", date: "Mar 11, 2026", time: "4:00 PM – 5:00 PM", centre: "Downtown", type: "Social Play", status: "Upcoming" },
  { id: "b3", date: "Mar 8, 2026", time: "7:00 PM – 8:00 PM", centre: "Westside", type: "Court Play", status: "Completed" },
  { id: "b4", date: "Mar 7, 2026", time: "6:30 AM – 7:30 AM", centre: "Downtown", type: "Pickleball Clinic", status: "Completed" },
  { id: "b5", date: "Mar 5, 2026", time: "5:00 PM – 6:00 PM", centre: "Westside", type: "Social Play", status: "Cancelled" },
];

export default function PortalBookings() {
  return (
    <SportBookings
      title="Your Bookings"
      subtitle="View and manage your upcoming and past pickleball sessions."
      headerBorderClass="border-green-tile"
      accentColorClass="text-emerald-500"
      accentBgClass="bg-emerald-500/10"
      bookings={bookings}
      sportTypeLabel="Court Play"
    />
  );
}
