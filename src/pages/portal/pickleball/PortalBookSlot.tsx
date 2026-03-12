import SportBookSlot from "@/components/portal/SportBookSlot";

const pickleballSlots = [
  { id: 1, time: "06:00 AM", type: "Social Play", capacity: 4, available: 2, full: false, venue: "Pickleball Arena - Court 1" },
  { id: 2, time: "07:00 AM", type: "Court Booking", capacity: 4, available: 0, full: true, venue: "Pickleball Arena - Court 2" },
  { id: 3, time: "08:00 AM", type: "Coaching", capacity: 6, available: 3, full: false, venue: "Pickleball Arena - Court 1" },
  { id: 4, time: "05:00 PM", type: "Social Play", capacity: 4, available: 1, full: false, venue: "Pickleball Arena - Court 3" },
  { id: 5, time: "06:00 PM", type: "Tournament", capacity: 16, available: 4, full: false, venue: "Main Arena" },
  { id: 6, time: "07:00 PM", type: "Court Booking", capacity: 4, available: 2, full: false, venue: "Pickleball Arena - Court 2" },
];

export default function PortalBookSlot() {
  const getCapacityLabel = (avail: number, full: boolean) => full ? "Sold Out" : `${avail} courts available`;
  
  return (
    <SportBookSlot
      title="Book a Court"
      subtitle="Select your preferred time to reserve a pickleball court at the Arena."
      headerBorderClass="border-green-tile"
      centreSelectionLabel="Select Arena"
      buttonGradientClass="bg-gradient-to-r from-emerald-500 to-emerald-600"
      slots={pickleballSlots}
      getCapacityLabel={getCapacityLabel}
    />
  );
}
