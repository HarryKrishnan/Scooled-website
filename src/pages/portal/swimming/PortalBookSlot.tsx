import SportBookSlot from "@/components/portal/SportBookSlot";
import { slots } from "@/data/mockData";

export default function PortalBookSlot() {
  const getCapacityLabel = (avail: number, full: boolean) => full ? "Sold Out" : `${avail} spots left`;
  
  return (
    <SportBookSlot
      title="Book Slots"
      subtitle="Select your centre, date, and preferred time to reserve a session."
      headerBorderClass="border-blue-tile"
      centreSelectionLabel="Select Training Centre"
      buttonGradientClass="bg-gradient-to-r from-primary to-aqua"
      slots={slots}
      getCapacityLabel={getCapacityLabel}
    />
  );
}
