import { motion } from "framer-motion";
import SportBookSlot from "@/components/portal/SportBookSlot";
import { userActiveMembership } from "@/data/mockData";

const pickleballSlots = [
  { id: "pb1", time: "06:00 AM", type: "Social Play", capacity: 4, booked: 2, venue: "Pickleball Arena - Court 1" },
  { id: "pb2", time: "07:00 AM", type: "Court Booking", capacity: 4, booked: 4, venue: "Pickleball Arena - Court 2" },
  { id: "pb3", time: "08:00 AM", type: "Coaching", capacity: 6, booked: 3, venue: "Pickleball Arena - Court 1" },
  { id: "pb4", time: "05:00 PM", type: "Social Play", capacity: 4, booked: 1, venue: "Pickleball Arena - Court 3" },
  { id: "pb5", time: "06:00 PM", type: "Tournament", capacity: 16, booked: 12, venue: "Main Arena" },
  { id: "pb6", time: "07:00 PM", type: "Court Booking", capacity: 4, booked: 2, venue: "Pickleball Arena - Court 2" },
];

export default function PortalBookSlot() {
  const getCapacityLabel = (avail: number, full: boolean) => full ? "Sold Out" : `${avail} courts available`;

  const hasMembership = !!userActiveMembership;

  return (
    <div className="space-y-8 pb-12 font-poppins text-white">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-display text-4xl font-black text-white tracking-tight drop-shadow-sm">
            Book <span className="text-purple-500">Pickleball</span> Court
          </h1>
          <p className="text-sm text-white/50 font-bold mt-2 max-w-lg leading-relaxed">
            Reserve your court for social play or competitive drills. Professional clinic schedules are managed on your dashboard.
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <SportBookSlot
          title="Reserve Your Court"
          subtitle="Select pickleball center and playtime. Each slot is for 60 minutes."
          headerBorderClass="border-purple-500"
          centreSelectionLabel="Pickleball Center"
          buttonGradientClass="bg-gradient-to-r from-purple-500 to-purple-700"
          slots={pickleballSlots}
          getCapacityLabel={getCapacityLabel}
          hasMembership={hasMembership}
        />
      </motion.div>
    </div>
  );
}
