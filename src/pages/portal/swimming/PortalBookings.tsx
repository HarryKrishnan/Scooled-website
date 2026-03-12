import SportBookings from "@/components/portal/SportBookings";

const bookings = [
  { id: "b1", date: "Mar 10, 2026", time: "6:30 AM – 7:30 AM", centre: "Downtown", type: "Open Swim", status: "Upcoming" },
  { id: "b2", date: "Mar 11, 2026", time: "4:00 PM – 5:00 PM", centre: "Downtown", type: "Coaching", status: "Upcoming" },
  { id: "b3", date: "Mar 8, 2026", time: "7:00 PM – 8:00 PM", centre: "Westside", type: "Open Swim", status: "Completed" },
  { id: "b4", date: "Mar 7, 2026", time: "6:30 AM – 7:30 AM", centre: "Downtown", type: "Open Swim", status: "Completed" },
  { id: "b5", date: "Mar 5, 2026", time: "5:00 PM – 6:00 PM", centre: "Westside", type: "Coaching", status: "Cancelled" },
];

export default function PortalBookings() {
  return (
    <SportBookings
      title="Your Bookings"
      subtitle="View and manage your upcoming and past swim sessions."
      headerBorderClass="border-blue-tile"
      accentColorClass="text-primary"
      accentBgClass="bg-primary/10"
      bookings={bookings}
      sportTypeLabel="Open Swim"
    />
  );
}
