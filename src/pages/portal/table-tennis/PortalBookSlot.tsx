import { motion } from "framer-motion";
import SportBookSlot from "@/components/portal/SportBookSlot";
import { userActiveMembership } from "@/data/mockData";

const ttSlots = [
  { id: "tt1", time: "06:00 AM", type: "Social Play", capacity: 8, booked: 4, venue: "Table Tennis Arena - T1" },
  { id: "tt2", time: "07:00 AM", type: "Table Booking", capacity: 8, booked: 8, venue: "Table Tennis Arena - T2" },
  { id: "tt3", time: "08:00 AM", type: "Coaching", capacity: 4, booked: 2, venue: "Table Tennis Arena - T1" },
  { id: "tt4", time: "05:00 PM", type: "Robot Practice", capacity: 2, booked: 1, venue: "Robot Zone" },
  { id: "tt5", time: "06:00 PM", type: "Tournament", capacity: 16, booked: 12, venue: "Main Hall" },
  { id: "tt6", time: "07:00 PM", type: "Table Booking", capacity: 8, booked: 5, venue: "Table Tennis Arena - T3" },
];

export default function PortalBookSlot() {
  const getCapacityLabel = (avail: number, full: boolean) => full ? "Sold Out" : `${avail} tables available`;

  const hasMembership = !!userActiveMembership;

  return (
    <div className="space-y-8 pb-12 font-poppins text-white">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-display text-4xl font-black text-white tracking-tight drop-shadow-sm">
            Book <span className="text-red-500">TT</span> Table
          </h1>
          <p className="text-sm text-white/50 font-bold mt-2 max-w-lg leading-relaxed">
            Reserve your table for practice or casual games. Professional coaching schedules are managed on your dashboard.
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <SportBookSlot
          title="Reserve Your Table"
          subtitle="Select arena and session time. Each slot is for 60 minutes."
          headerBorderClass="border-red-500"
          centreSelectionLabel="TT Arena"
          buttonGradientClass="bg-gradient-to-r from-red-500 to-red-700"
          slots={ttSlots}
          getCapacityLabel={getCapacityLabel}
          hasMembership={hasMembership}
        />
      </motion.div>
    </div>
  );
}
