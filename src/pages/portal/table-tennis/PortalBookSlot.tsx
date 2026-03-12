import SportBookSlot from "@/components/portal/SportBookSlot";
import { slots } from "@/data/mockData";

export default function PortalBookSlot() {
  const getCapacityLabel = (avail: number, full: boolean) => full ? "Sold Out" : `${avail} tables available`;
  
  const mappedSlots = slots.map(s => {
    let type = s.type;
    if (type === "Open Swim") type = "Table Booking";
    if (type === "Coaching" || type === "Ladies Only" || type === "Kids Batch") type = "Practice Session";
    return { ...s, type };
  });

  return (
    <SportBookSlot
      title="Book a Table"
      subtitle="Select your centre, date, and preferred time to reserve a table."
      headerBorderClass="border-red-tile"
      centreSelectionLabel="Select Table Tennis Centre"
      buttonGradientClass="bg-gradient-to-r from-primary to-red-500"
      slots={mappedSlots}
      getCapacityLabel={getCapacityLabel}
    />
  );
}
