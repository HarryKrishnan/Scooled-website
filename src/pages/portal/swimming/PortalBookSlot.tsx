import { motion } from "framer-motion";
import SportBookSlot from "@/components/portal/SportBookSlot";
import { slots, userActiveMembership } from "@/data/mockData";

export default function PortalBookSlot() {
  const getCapacityLabel = (avail: number, full: boolean) => full ? "Sold Out" : `${avail} spots left`;

  const hasMembership = !!userActiveMembership;

  return (
    <div className="space-y-8 pb-12 font-poppins text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-display text-4xl font-black text-white tracking-tight drop-shadow-sm">
            Book <span className="text-primary">Leisure</span> Slot
          </h1>
          <p className="text-sm text-white/50 font-bold mt-2 max-w-lg leading-relaxed">
            Reserve your lane for practice or leisure swimming. Professional coaching schedules are managed on your dashboard.
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <SportBookSlot
          title="Reserve Your Lane"
          subtitle="Select center and date. Each slot is for 60 minutes of lane access."
          headerBorderClass="border-primary"
          centreSelectionLabel="Pool Location"
          buttonGradientClass="bg-gradient-to-r from-primary to-aqua"
          slots={slots}
          getCapacityLabel={getCapacityLabel}
          hasMembership={hasMembership}
        />
      </motion.div>
    </div>
  );
}
