import SportBookSlot from "@/components/portal/SportBookSlot";
import { slots } from "@/data/mockData";

export default function PortalBookSlot() {
  const getCapacityLabel = (avail: number, full: boolean) => full ? "Sold Out" : `${avail} spots left`;
  
  const mappedSlots = slots.map(s => {
    let type = s.type;
    if (type === "Open Swim") type = "Court Play";
    if (type === "Coaching" || type === "Ladies Only" || type === "Kids Batch") type = "Social Play";
    return { ...s, type };
  });

  return (
    <SportBookSlot
      title="Book a Court"
      subtitle="Select your centre, date, and preferred time to reserve a pickleball court."
      headerBorderClass="border-green-tile"
      centreSelectionLabel="Select Pickleball Centre"
      buttonGradientClass="bg-gradient-to-r from-primary to-emerald-500"
      slots={mappedSlots}
      getCapacityLabel={getCapacityLabel}
    />
  );
}
