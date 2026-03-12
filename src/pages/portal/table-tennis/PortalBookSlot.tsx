import SportBookSlot from "@/components/portal/SportBookSlot";

const ttSlots = [
  { id: 1, time: "06:00 AM", type: "Social Play", capacity: 8, available: 4, full: false, venue: "Table Tennis Arena - T1" },
  { id: 2, time: "07:00 AM", type: "Table Booking", capacity: 8, available: 0, full: true, venue: "Table Tennis Arena - T2" },
  { id: 3, time: "08:00 AM", type: "Coaching", capacity: 4, available: 2, full: false, venue: "Table Tennis Arena - T1" },
  { id: 4, time: "05:00 PM", type: "Robot Practice", capacity: 2, available: 1, full: false, venue: "Robot Zone" },
  { id: 5, time: "06:00 PM", type: "Tournament", capacity: 16, available: 4, full: false, venue: "Main Hall" },
  { id: 6, time: "07:00 PM", type: "Table Booking", capacity: 8, available: 3, full: false, venue: "Table Tennis Arena - T3" },
];

export default function PortalBookSlot() {
  const getCapacityLabel = (avail: number, full: boolean) => full ? "Sold Out" : `${avail} tables available`;
  
  return (
    <SportBookSlot
      title="Book a Table"
      subtitle="Select your preferred time to reserve a table tennis court at the Arena."
      headerBorderClass="border-red-tile"
      centreSelectionLabel="Select Arena"
      buttonGradientClass="bg-gradient-to-r from-red-500 to-red-600"
      slots={ttSlots}
      getCapacityLabel={getCapacityLabel}
    />
  );
}
