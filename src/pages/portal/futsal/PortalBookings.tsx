import SportBookings from "@/components/portal/SportBookings";

const bookings = [
  { id: "b1", date: "Mar 10, 2026", time: "6:30 AM – 7:30 AM", centre: "Downtown", type: "Court Booking", status: "Upcoming" },
  { id: "b2", date: "Mar 11, 2026", time: "4:00 PM – 5:00 PM", centre: "Downtown", type: "Training", status: "Upcoming" },
  { id: "b3", date: "Mar 8, 2026", time: "7:00 PM – 8:00 PM", centre: "Westside", type: "Court Booking", status: "Completed" },
  { id: "b4", date: "Mar 7, 2026", time: "6:30 AM – 7:30 AM", centre: "Downtown", type: "Team Match", status: "Completed" },
  { id: "b5", date: "Mar 5, 2026", time: "5:00 PM – 6:00 PM", centre: "Westside", type: "Training", status: "Cancelled" },
];

export default function PortalBookings() {
  return (
    <SportBookings
      title="Your Bookings"
      subtitle="View and manage your upcoming and past futsal matches."
      headerBorderClass="border-orange-tile"
      accentColorClass="text-orange-500"
      accentBgClass="bg-orange-500/10"
      bookings={bookings}
      sportTypeLabel="Court Booking"
    />
  );
}
