import SportBookSlot from "@/components/portal/SportBookSlot";

const futsalSlots = [
  { id: "fs1", time: "6:00 AM – 7:00 AM", capacity: 2, booked: 1, type: "Court Booking" },
  { id: "fs2", time: "7:00 AM – 8:00 AM", capacity: 2, booked: 2, type: "Team Match" },
  { id: "fs3", time: "8:00 AM – 9:00 AM", capacity: 2, booked: 0, type: "Court Booking" },
  { id: "fs4", time: "4:00 PM – 5:00 PM", capacity: 4, booked: 2, type: "Training" },
  { id: "fs5", time: "5:00 PM – 6:00 PM", capacity: 2, booked: 2, type: "Court Booking" },
  { id: "fs6", time: "6:00 PM – 7:00 PM", capacity: 2, booked: 1, type: "Team Match" },
  { id: "fs7", time: "7:00 PM – 8:00 PM", capacity: 2, booked: 0, type: "Court Booking" },
  { id: "fs8", time: "8:00 PM – 9:00 PM", capacity: 2, booked: 1, type: "Training" },
  { id: "fs9", time: "9:00 PM – 10:00 PM", capacity: 2, booked: 0, type: "Court Booking" },
];

export default function PortalBookSlot() {
  const getCapacityLabel = (avail: number, full: boolean) => full ? "Fully Booked" : `${avail} courts available`;
  
  return (
    <SportBookSlot
      title="Book a Court"
      subtitle="Select your preferred futsal centre and reserve your match slot."
      headerBorderClass="border-orange-tile"
      centreSelectionLabel="Select Futsal Arena"
      buttonGradientClass="bg-gradient-to-r from-primary to-orange-500"
      slots={futsalSlots}
      getCapacityLabel={getCapacityLabel}
    />
  );
}
