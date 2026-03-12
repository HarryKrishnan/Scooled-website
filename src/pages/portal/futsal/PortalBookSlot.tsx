import SportBookSlot from "@/components/portal/SportBookSlot";
import { slots } from "@/data/mockData";

export default function PortalBookSlot() {
  const getCapacityLabel = (avail: number, full: boolean) => full ? "Sold Out" : `${avail} courts available`;
  
  const mappedSlots = slots.map(s => {
    let type = s.type;
    if (type === "Open Swim") type = "Court Booking";
    if (type === "Coaching") type = "Training";
    if (type === "Ladies Only" || type === "Kids Batch") type = "Team Match";
    return { ...s, type };
  });

  return (
    <SportBookSlot
      title="Book a Court"
      subtitle="Select your centre, date, and preferred time to reserve a futsal court."
      headerBorderClass="border-orange-tile"
      centreSelectionLabel="Select Futsal Centre"
      buttonGradientClass="bg-gradient-to-r from-primary to-orange-500"
      slots={mappedSlots}
      getCapacityLabel={getCapacityLabel}
    />
  );
}
