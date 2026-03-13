import { motion } from "framer-motion";
import SportBookSlot from "@/components/portal/SportBookSlot";
import { userActiveMembership } from "@/data/mockData";

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

  const hasMembership = !!userActiveMembership;

  return (
    <div className="space-y-8 pb-12 font-poppins text-white">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-display text-4xl font-black text-white tracking-tight drop-shadow-sm">
            Book <span className="text-orange-500">Futsal</span> Court
          </h1>
          <p className="text-sm text-white/50 font-bold mt-2 max-w-lg leading-relaxed">
            Reserve your court for casual matches or group training. Team coaching schedules are managed on your dashboard.
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
          subtitle="Select arena and match time. Each slot is for 60 minutes of court time."
          headerBorderClass="border-orange-500"
          centreSelectionLabel="Futsal Arena"
          buttonGradientClass="bg-gradient-to-r from-orange-500 to-orange-700"
          slots={futsalSlots}
          getCapacityLabel={getCapacityLabel}
          hasMembership={hasMembership}
        />
      </motion.div>
    </div>
  );
}
