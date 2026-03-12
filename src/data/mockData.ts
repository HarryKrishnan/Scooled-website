import programKids from "@/assets/program-kids.png";
import programAdult from "@/assets/program-adult.png";
import programCompetitive from "@/assets/program-competitive.png";
import programWeekend from "@/assets/program-weekend.png";
// Futsal
import progFutsalKids from "@/assets/prog-futsal-kids.png";
import progFutsalAdult from "@/assets/prog-futsal-adult.png";
import progFutsalCompetitive from "@/assets/prog-futsal-competitive.png";
import progFutsalWeekend from "@/assets/prog-futsal-weekend.png";
// Pickleball
import progPickleballKids from "@/assets/prog-pickleball-kids.png";
import progPickleballAdult from "@/assets/prog-pickleball-adult.png";
import progPickleballCompetitive from "@/assets/prog-pickleball-competitive.png";
import progPickleballWeekend from "@/assets/prog-pickleball-weekend.png";
// Table Tennis
import progTTKids from "@/assets/prog-tt-kids.png";
import progTTAdult from "@/assets/prog-tt-adult.png";
import progTTCompetitive from "@/assets/prog-tt-competitive.png";
import progTTWeekend from "@/assets/prog-tt-weekend.png";

export const centres = [
  { id: "c1", name: "Scooled — Downtown", city: "Mumbai", address: "12 Marine Drive, Mumbai 400001", pools: 3 },
  { id: "c2", name: "Scooled — Westside", city: "Mumbai", address: "45 Bandra West, Mumbai 400050", pools: 2 },
];

export const coaches = [
  { id: "co1", name: "Arjun Menon", specialization: "Competitive Swimming", avatar: "", certifications: ["FINA Level 2", "CPR Certified"] },
  { id: "co2", name: "Priya Sharma", specialization: "Kids Learn to Swim", avatar: "", certifications: ["SSA Coach", "First Aid"] },
  { id: "co3", name: "Rahul Das", specialization: "Adult Fitness", avatar: "", certifications: ["ACE Certified", "Lifeguard"] },
];

export const programs = [
  { id: "p1", title: "Kids Learn to Swim", ageGroup: "4–8 years", level: "Beginner", coach: "Priya Sharma", schedule: "Mon, Wed, Fri", time: "4:00 PM – 5:00 PM", duration: "60 min", capacity: 12, enrolled: 8, price: 3500, image: "", totalSessions: 24, status: "Active", description: "A comprehensive beginner program for kids aged 4-8 to learn basic swimming skills and water safety." },
  { id: "p2", title: "Adult Fitness Swimming", ageGroup: "18+ years", level: "All Levels", coach: "Rahul Das", schedule: "Tue, Thu, Sat", time: "6:00 AM – 7:00 AM", duration: "60 min", capacity: 15, enrolled: 11, price: 4500, image: "", totalSessions: 36, status: "Active", description: "Fitness-focused swimming program for adults of all levels. Improve cardiovascular health and endurance." },
  { id: "p3", title: "Competitive Coaching", ageGroup: "10–18 years", level: "Advanced", coach: "Arjun Menon", schedule: "Mon–Sat", time: "5:30 AM – 7:30 AM", duration: "120 min", capacity: 10, enrolled: 7, price: 8000, image: "", totalSessions: 72, status: "Active", description: "Intensive training program for competitive swimmers preparing for state and national level competitions." },
  { id: "p4", title: "Weekend Training", ageGroup: "All Ages", level: "Intermediate", coach: "Rahul Das", schedule: "Sat, Sun", time: "8:00 AM – 10:00 AM", duration: "120 min", capacity: 20, enrolled: 14, price: 3000, image: "", totalSessions: 16, status: "Active", description: "Perfect for busy professionals and students. Weekend-focused intermediate training program." },
  { id: "p5", title: "Water Safety & Survival", ageGroup: "6–14 years", level: "Beginner", coach: "Priya Sharma", schedule: "Wed, Fri", time: "3:00 PM – 4:00 PM", duration: "60 min", capacity: 15, enrolled: 9, price: 2500, image: "", totalSessions: 20, status: "Active", description: "Essential water safety skills and survival techniques for children and teens." },
  { id: "p6", title: "Master's Swimming", ageGroup: "30+ years", level: "Intermediate", coach: "Arjun Menon", schedule: "Mon, Wed, Fri", time: "7:00 PM – 8:00 PM", duration: "60 min", capacity: 12, enrolled: 6, price: 5000, image: "", totalSessions: 36, status: "Active", description: "Tailored program for adults 30+ focusing on technique refinement and fitness maintenance." },
];

export const offers = [
  { id: "o1", title: "Summer Splash Camp", parentProgramId: "p1", coach: "Priya Sharma", schedule: "Mon-Fri", time: "9:00 AM – 12:00 PM", duration: "180 min", price: 8999, image: "", totalSessions: 15, status: "Active", description: "Special summer intensive program for kids to learn swimming in a fun, engaging environment." },
  { id: "o2", title: "Early Bird Special", parentProgramId: "p2", coach: "Rahul Das", schedule: "Mon, Wed, Fri", time: "5:30 AM – 6:30 AM", duration: "60 min", price: 3500, image: "", totalSessions: 24, status: "Active", description: "Discounted early morning fitness sessions for dedicated swimmers." },
  { id: "o3", title: "Weekend Warriors", parentProgramId: "p4", coach: "Arjun Menon", schedule: "Sat, Sun", time: "7:00 AM – 9:00 AM", duration: "120 min", price: 4500, image: "", totalSessions: 12, status: "Draft", description: "Intensive weekend program launching next month for intermediate to advanced swimmers." },
];

export const membershipPlans = [
  { id: "m1", name: "Monthly", duration: "1 Month", price: 2999, features: ["Unlimited pool access", "Locker facility", "1 Guest pass", "Basic progress report"], popular: false },
  { id: "m2", name: "Quarterly", duration: "3 Months", price: 7999, features: ["Unlimited pool access", "Locker facility", "3 Guest passes", "Detailed progress reports", "10% coaching discount"], popular: true },
  { id: "m3", name: "Half-Yearly", duration: "6 Months", price: 13999, features: ["Unlimited pool access", "Premium locker", "6 Guest passes", "Detailed progress reports", "15% coaching discount", "Free towel service"], popular: false },
  { id: "m4", name: "Annual", duration: "12 Months", price: 24999, features: ["Unlimited pool access", "Premium locker", "12 Guest passes", "All progress reports", "20% coaching discount", "Free towel service", "Priority slot booking"], popular: false },
];

export const slots = [
  { id: "s1", time: "5:30 AM – 6:30 AM", capacity: 20, booked: 14, type: "Open Swim" },
  { id: "s2", time: "6:30 AM – 7:30 AM", capacity: 20, booked: 18, type: "Open Swim" },
  { id: "s3", time: "7:30 AM – 8:30 AM", capacity: 15, booked: 15, type: "Coaching" },
  { id: "s4", time: "8:30 AM – 9:30 AM", capacity: 20, booked: 8, type: "Open Swim" },
  { id: "s5", time: "4:00 PM – 5:00 PM", capacity: 15, booked: 12, type: "Coaching" },
  { id: "s6", time: "5:00 PM – 6:00 PM", capacity: 20, booked: 16, type: "Open Swim" },
  { id: "s7", time: "6:00 PM – 7:00 PM", capacity: 20, booked: 19, type: "Open Swim" },
  { id: "s8", time: "7:00 PM – 8:00 PM", capacity: 15, booked: 10, type: "Coaching" },
  { id: "s9", time: "8:00 PM – 9:00 PM", capacity: 20, booked: 5, type: "Open Swim" },
  { id: "s10", time: "9:30 AM – 10:30 AM", capacity: 12, booked: 4, type: "Ladies Only" },
  { id: "s11", time: "10:30 AM – 11:30 AM", capacity: 10, booked: 6, type: "Kids Batch" },
  { id: "s12", time: "3:00 PM – 4:00 PM", capacity: 12, booked: 3, type: "Open Swim" },
];

export const customers = [
  { id: "cu1", name: "Aarav Patel", email: "aarav@example.com", phone: "+91 98765 43210", membership: "Quarterly", status: "Active", joinDate: "2025-01-15" },
  { id: "cu2", name: "Sneha Iyer", email: "sneha@example.com", phone: "+91 98765 43211", membership: "Annual", status: "Active", joinDate: "2024-08-20" },
  { id: "cu3", name: "Rohan Gupta", email: "rohan@example.com", phone: "+91 98765 43212", membership: "Monthly", status: "Active", joinDate: "2025-02-01" },
  { id: "cu4", name: "Meera Nair", email: "meera@example.com", phone: "+91 98765 43213", membership: "Half-Yearly", status: "Active", joinDate: "2024-11-10" },
  { id: "cu5", name: "Vikram Singh", email: "vikram@example.com", phone: "+91 98765 43214", membership: "Quarterly", status: "Expired", joinDate: "2024-06-15" },
  { id: "cu6", name: "Ananya Reddy", email: "ananya@example.com", phone: "+91 98765 43215", membership: "Monthly", status: "Active", joinDate: "2025-02-20" },
  { id: "cu7", name: "Karthik Raj", email: "karthik@example.com", phone: "+91 98765 43216", membership: "Annual", status: "Active", joinDate: "2024-03-01" },
  { id: "cu8", name: "Divya Kapoor", email: "divya@example.com", phone: "+91 98765 43217", membership: "None", status: "Trial", joinDate: "2025-03-05" },
];

export const leads = [
  { id: "l1", name: "Arjun K", phone: "+91 99887 76655", email: "arjun.k@email.com", source: "Website", interest: "Kids Learn to Swim", status: "New", date: "2025-03-08" },
  { id: "l2", name: "Kavitha M", phone: "+91 99887 76656", email: "kavitha@email.com", source: "Walk-in", interest: "Adult Fitness", status: "Contacted", date: "2025-03-06" },
  { id: "l3", name: "Suresh P", phone: "+91 99887 76657", email: "suresh@email.com", source: "Referral", interest: "Competitive Coaching", status: "Qualified", date: "2025-03-04" },
  { id: "l4", name: "Nisha T", phone: "+91 99887 76658", email: "nisha@email.com", source: "Instagram", interest: "Membership", status: "New", date: "2025-03-09" },
  { id: "l5", name: "Rajesh B", phone: "+91 99887 76659", email: "rajesh@email.com", source: "Google Ads", interest: "Weekend Training", status: "Lost", date: "2025-02-28" },
];

export const payments = [
  { id: "pay1", customer: "Aarav Patel", amount: 7999, type: "Membership", method: "UPI", status: "Completed", date: "2025-03-01", time: "10:45 AM", invoice: "INV-2025-001" },
  { id: "pay2", customer: "Sneha Iyer", amount: 8000, type: "Coaching", method: "Credit Card", status: "Completed", date: "2025-02-28", time: "02:30 PM", invoice: "INV-2025-002" },
  { id: "pay3", customer: "Rohan Gupta", amount: 2999, type: "Membership", method: "Net Banking", status: "Completed", date: "2025-03-01", time: "09:15 AM", invoice: "INV-2025-003" },
  { id: "pay4", customer: "Meera Nair", amount: 3500, type: "Coaching", method: "UPI", status: "Pending", date: "2025-03-05", time: "11:20 AM", invoice: "INV-2025-004" },
  { id: "pay5", customer: "Vikram Singh", amount: 7999, type: "Membership", method: "Credit Card", status: "Failed", date: "2025-03-02", time: "03:55 PM", invoice: "INV-2025-005" },
  { id: "pay6", customer: "Ananya Reddy", amount: 4500, type: "Coaching", method: "Debit Card", status: "Completed", date: "2025-03-03", time: "08:30 AM", invoice: "INV-2025-006" },
  { id: "pay7", customer: "Karthik Raj", amount: 24999, type: "Membership", method: "UPI", status: "Completed", date: "2025-03-10", time: "04:12 PM", invoice: "INV-2025-007" },
  { id: "pay8", customer: "Divya Kapoor", amount: 1500, type: "Trial Session", method: "Cash", status: "Completed", date: "2025-03-09", time: "06:00 PM", invoice: "INV-2025-008" },
  { id: "pay9", customer: "Aarav Patel", amount: 3500, type: "Coaching", method: "UPI", status: "Completed", date: "2025-03-08", time: "01:25 PM", invoice: "INV-2025-009" },
  { id: "pay10", customer: "Sneha Iyer", amount: 2500, type: "Guest Pass", method: "UPI", status: "Completed", date: "2025-03-07", time: "10:10 AM", invoice: "INV-2025-010" },
];

export const slotBookings = [
  // March 11, 2025 (Today) - Downtown
  { id: "sb1", slotId: "s1", customerId: "cu1", customerName: "Aarav Patel", date: "2025-03-11", centreId: "c1", status: "confirmed" },
  { id: "sb2", slotId: "s1", customerId: "cu2", customerName: "Sneha Iyer", date: "2025-03-11", centreId: "c1", status: "confirmed" },
  { id: "sb3", slotId: "s1", customerId: "cu3", customerName: "Rohan Gupta", date: "2025-03-11", centreId: "c1", status: "confirmed" },
  { id: "sb4", slotId: "s2", customerId: "cu4", customerName: "Meera Nair", date: "2025-03-11", centreId: "c1", status: "confirmed" },
  { id: "sb5", slotId: "s2", customerId: "cu6", customerName: "Ananya Reddy", date: "2025-03-11", centreId: "c1", status: "confirmed" },
  { id: "sb6", slotId: "s3", customerId: "cu7", customerName: "Karthik Raj", date: "2025-03-11", centreId: "c1", status: "confirmed" },
  { id: "sb7", slotId: "s5", customerId: "cu8", customerName: "Divya Kapoor", date: "2025-03-11", centreId: "c1", status: "confirmed" },
  { id: "sb8", slotId: "s6", customerId: "cu1", customerName: "Aarav Patel", date: "2025-03-11", centreId: "c1", status: "confirmed" },
  { id: "sb9", slotId: "s7", customerId: "cu2", customerName: "Sneha Iyer", date: "2025-03-11", centreId: "c1", status: "confirmed" },
  { id: "sb10", slotId: "s7", customerId: "cu3", customerName: "Rohan Gupta", date: "2025-03-11", centreId: "c1", status: "confirmed" },
  
  // March 11, 2025 (Today) - Westside
  { id: "sb11", slotId: "s1", customerId: "cu4", customerName: "Meera Nair", date: "2025-03-11", centreId: "c2", status: "confirmed" },
  { id: "sb12", slotId: "s2", customerId: "cu6", customerName: "Ananya Reddy", date: "2025-03-11", centreId: "c2", status: "confirmed" },
  { id: "sb13", slotId: "s6", customerId: "cu7", customerName: "Karthik Raj", date: "2025-03-11", centreId: "c2", status: "confirmed" },
  
  // March 12, 2025 (Tomorrow) - Downtown
  { id: "sb14", slotId: "s1", customerId: "cu1", customerName: "Aarav Patel", date: "2025-03-12", centreId: "c1", status: "confirmed" },
  { id: "sb15", slotId: "s2", customerId: "cu2", customerName: "Sneha Iyer", date: "2025-03-12", centreId: "c1", status: "confirmed" },
  { id: "sb16", slotId: "s4", customerId: "cu3", customerName: "Rohan Gupta", date: "2025-03-12", centreId: "c1", status: "confirmed" },
  { id: "sb17", slotId: "s5", customerId: "cu4", customerName: "Meera Nair", date: "2025-03-12", centreId: "c1", status: "confirmed" },
  { id: "sb18", slotId: "s6", customerId: "cu6", customerName: "Ananya Reddy", date: "2025-03-12", centreId: "c1", status: "confirmed" },
  
  // March 10, 2025 (Yesterday) - Downtown
  { id: "sb19", slotId: "s1", customerId: "cu7", customerName: "Karthik Raj", date: "2025-03-10", centreId: "c1", status: "completed" },
  { id: "sb20", slotId: "s2", customerId: "cu8", customerName: "Divya Kapoor", date: "2025-03-10", centreId: "c1", status: "completed" },
  { id: "sb21", slotId: "s6", customerId: "cu1", customerName: "Aarav Patel", date: "2025-03-10", centreId: "c1", status: "completed" },
  
  // March 13-15, 2025 (Rest of week) - Downtown
  { id: "sb22", slotId: "s1", customerId: "cu2", customerName: "Sneha Iyer", date: "2025-03-13", centreId: "c1", status: "confirmed" },
  { id: "sb23", slotId: "s3", customerId: "cu3", customerName: "Rohan Gupta", date: "2025-03-13", centreId: "c1", status: "confirmed" },
  { id: "sb24", slotId: "s7", customerId: "cu4", customerName: "Meera Nair", date: "2025-03-14", centreId: "c1", status: "confirmed" },
  { id: "sb25", slotId: "s2", customerId: "cu6", customerName: "Ananya Reddy", date: "2025-03-15", centreId: "c1", status: "confirmed" },
];

export const userEnrollments = [
  {
    programId: "p3",
    title: "Competitive Coaching",
    coach: "Arjun Menon",
    sessionsTotal: 24,
    sessionsCompleted: 14,
    lastSession: "2025-03-08",
    attendanceRate: 92,
    nextSession: "Tomorrow, 5:30 AM",
    progress: 58,
  },
  {
    programId: "p1",
    title: "Kids Learn to Swim",
    coach: "Priya Sharma",
    sessionsTotal: 12,
    sessionsCompleted: 8,
    lastSession: "2025-03-07",
    attendanceRate: 100,
    nextSession: "Mon, 4:00 PM",
    progress: 66,
  }
];

export const userActiveMembership = {
  id: "m2",
  name: "Quarterly",
  duration: "3 Months",
  startDate: "2025-01-15",
  expiryDate: "2025-04-15",
  price: 7999,
  status: "Active",
  features: ["Unlimited pool access", "Locker facility", "3 Guest passes", "Detailed progress reports", "10% coaching discount"],
  usage: {
    poolAccess: 28,
    guestPassesUsed: 1,
    guestPassesTotal: 3,
  }
};

export const userPerformanceTrend = [
  { week: "Feb 1", sessions: 3, distance: 1200, calories: 450 },
  { week: "Feb 8", sessions: 4, distance: 1800, calories: 680 },
  { week: "Feb 15", sessions: 2, distance: 1000, calories: 380 },
  { week: "Feb 22", sessions: 5, distance: 2500, calories: 950 },
  { week: "Mar 1", sessions: 4, distance: 2200, calories: 820 },
  { week: "Mar 8", sessions: 3, distance: 1600, calories: 600 },
];

export const userAchievements = [
  { id: "a1", title: "First 10 Sessions", desc: "Completed 10 swimming sessions.", icon: "Target", date: "2025-02-15", color: "text-blue-500", bg: "bg-blue-500/10" },
  { id: "a2", title: "Attendance Pro", desc: "Maintained 90%+ attendance for 30 days.", icon: "Award", date: "2025-03-01", color: "text-gold", bg: "bg-gold/10" },
  { id: "a3", title: "1000m Milestone", desc: "Swam 1000m in a single session.", icon: "Zap", date: "2025-02-28", color: "text-cyan", bg: "bg-cyan/10" },
  { id: "a4", title: "Early Bird", desc: "Completed 5 sessions before 7:00 AM.", icon: "Sun", date: "2025-03-08", color: "text-orange-500", bg: "bg-orange-500/10" },
];

export const userCoachFeedback = [
  {
    id: "f1",
    program: "Competitive Coaching",
    coach: "Arjun Menon",
    date: "2025-03-05",
    feedback: "High discipline in morning sessions. Focus on streamlining the freestyle turn to shave off another 0.5s.",
    ratings: { technique: 4.5, speed: 4.0, endurance: 4.8, discipline: 5.0 },
  },
  {
    id: "f2",
    program: "Kids Learn to Swim",
    coach: "Priya Sharma",
    date: "2025-03-01",
    feedback: "Excellent progress in backstroke. Needs to work on breath control during longer laps.",
    ratings: { technique: 3.8, speed: 3.5, endurance: 3.0, discipline: 4.5 },
  }
];

export const complaints = [
  { id: "cmp1", customer: "Rohan Gupta", subject: "Water temperature too cold", category: "Facility", status: "Open", priority: "Medium", date: "2025-03-07", assignedTo: "" },
  { id: "cmp2", customer: "Vikram Singh", subject: "Payment not reflected", category: "Billing", status: "In Progress", priority: "High", date: "2025-03-06", assignedTo: "Admin" },
  { id: "cmp3", customer: "Meera Nair", subject: "Slot was overbooked", category: "Booking", status: "Resolved", priority: "High", date: "2025-03-03", assignedTo: "Manager" },
  { id: "cmp4", customer: "Aarav Patel", subject: "Locker not working", category: "Facility", status: "Open", priority: "Low", date: "2025-03-08", assignedTo: "" },
];

export const testimonials = [
  { name: "Sneha Iyer", role: "Annual Member", text: "Scooled Aquatics transformed my mornings. The coaches are world-class and the facilities are pristine. My kids love the weekend programs!", avatar: "" },
  { name: "Karthik Raj", role: "Competitive Swimmer", text: "Coach Arjun's training methodology is exceptional. I've seen a 15% improvement in my lap times in just 3 months.", avatar: "" },
  { name: "Divya Kapoor", role: "New Member", text: "The booking process is so smooth! I can see available slots, book instantly, and even track my progress. Truly modern.", avatar: "" },
];

export const faqs = [
  { q: "How do I book a swimming slot?", a: "Simply log in to your account, navigate to 'Book a Slot', select your preferred centre, date, and time slot. Confirm your booking with a secure payment." },
  { q: "Can I cancel or reschedule a booking?", a: "Yes! You can cancel or reschedule up to 4 hours before your slot time through the customer portal. Cancellations within 4 hours may incur a small fee." },
  { q: "What coaching programs are available?", a: "We offer Kids Learn to Swim, Adult Fitness Swimming, Competitive Coaching, Weekend Training, Water Safety, and Master's Swimming programs." },
  { q: "How do memberships work?", a: "Choose from Monthly, Quarterly, Half-Yearly, or Annual plans. Each includes unlimited pool access, locker facility, and additional perks based on the plan." },
  { q: "What payment methods do you accept?", a: "We accept Credit/Debit Cards, UPI, Net Banking, and select digital wallets for seamless transactions." },
  { q: "Is there a trial session available?", a: "Yes! First-time visitors can enjoy a complimentary trial session. Contact our team or register online to book yours." },
];

export const notifications = [
  { id: "n1", type: "booking", title: "Booking Confirmed", message: "Your slot for tomorrow 6:30 AM has been confirmed.", time: "2 hours ago", read: false },
  { id: "n2", type: "payment", title: "Payment Received", message: "₹7,999 received for Quarterly membership renewal.", time: "1 day ago", read: false },
  { id: "n3", type: "reminder", title: "Session Reminder", message: "Your coaching session starts in 2 hours.", time: "3 hours ago", read: true },
  { id: "n4", type: "update", title: "New Program Available", message: "Master's Swimming program now open for enrollment!", time: "2 days ago", read: true },
];

// Customer Membership Subscriptions with full lifecycle data
export const customerMembershipSubscriptions = [
  { id: "cms1", customerId: "cu1", customerName: "Aarav Patel", membershipPlanId: "m2", planName: "Quarterly", startDate: "2025-01-15", expiryDate: "2025-04-15", status: "Active", autoRenew: true, phone: "+91 98765 43210", email: "aarav@example.com" },
  { id: "cms2", customerId: "cu2", customerName: "Sneha Iyer", membershipPlanId: "m4", planName: "Annual", startDate: "2024-08-20", expiryDate: "2025-08-20", status: "Active", autoRenew: true, phone: "+91 98765 43211", email: "sneha@example.com" },
  { id: "cms3", customerId: "cu3", customerName: "Rohan Gupta", membershipPlanId: "m1", planName: "Monthly", startDate: "2025-02-01", expiryDate: "2025-03-01", status: "Expired", autoRenew: false, phone: "+91 98765 43212", email: "rohan@example.com" },
  { id: "cms4", customerId: "cu4", customerName: "Meera Nair", membershipPlanId: "m3", planName: "Half-Yearly", startDate: "2024-11-10", expiryDate: "2025-05-10", status: "Active", autoRenew: true, phone: "+91 98765 43213", email: "meera@example.com" },
  { id: "cms5", customerId: "cu5", customerName: "Vikram Singh", membershipPlanId: "m2", planName: "Quarterly", startDate: "2024-06-15", expiryDate: "2024-09-15", status: "Expired", autoRenew: false, phone: "+91 98765 43214", email: "vikram@example.com" },
  { id: "cms6", customerId: "cu6", customerName: "Ananya Reddy", membershipPlanId: "m1", planName: "Monthly", startDate: "2025-02-20", expiryDate: "2025-03-20", status: "Active", autoRenew: true, phone: "+91 98765 43215", email: "ananya@example.com" },
  { id: "cms7", customerId: "cu7", customerName: "Karthik Raj", membershipPlanId: "m4", planName: "Annual", startDate: "2024-03-01", expiryDate: "2025-03-01", status: "Expired", autoRenew: false, phone: "+91 98765 43216", email: "karthik@example.com" },
  { id: "cms8", customerId: "cu8", customerName: "Divya Kapoor", membershipPlanId: "m1", planName: "Monthly", startDate: "2025-03-05", expiryDate: "2025-04-05", status: "Active", autoRenew: false, phone: "+91 98765 43217", email: "divya@example.com" },
  // Adding more customers to show variety
  { id: "cms9", customerId: "cu9", customerName: "Aditya Joshi", membershipPlanId: "m2", planName: "Quarterly", startDate: "2024-12-05", expiryDate: "2025-03-05", status: "Expired", autoRenew: true, phone: "+91 98765 43218", email: "aditya@example.com" },
  { id: "cms10", customerId: "cu10", customerName: "Priya Malhotra", membershipPlanId: "m3", planName: "Half-Yearly", startDate: "2025-01-01", expiryDate: "2025-07-01", status: "Active", autoRenew: true, phone: "+91 98765 43219", email: "priya@example.com" },
  { id: "cms11", customerId: "cu11", customerName: "Ravi Kumar", membershipPlanId: "m1", planName: "Monthly", startDate: "2025-02-15", expiryDate: "2025-03-15", status: "Active", autoRenew: true, phone: "+91 98765 43220", email: "ravi@example.com" },
  { id: "cms12", customerId: "cu12", customerName: "Sanjana Shah", membershipPlanId: "m2", planName: "Quarterly", startDate: "2025-01-20", expiryDate: "2025-04-20", status: "Active", autoRenew: false, phone: "+91 98765 43221", email: "sanjana@example.com" },
];

// Notification History for Admin tracking
export const notificationHistory = [
  { id: "nh1", customerId: "cu3", customerName: "Rohan Gupta", type: "Expiration Warning", channel: "Alert", message: "Your Monthly membership expires on Mar 1, 2025", sentAt: "2025-02-25 10:30 AM", status: "Sent" },
  { id: "nh2", customerId: "cu3", customerName: "Rohan Gupta", type: "Renewal Reminder", channel: "WhatsApp", message: "Reminder: Renew your membership to continue enjoying unlimited pool access", sentAt: "2025-02-28 09:15 AM", status: "Sent" },
  { id: "nh3", customerId: "cu7", customerName: "Karthik Raj", type: "Expiration Warning", channel: "Alert", message: "Your Annual membership expires on Mar 1, 2025", sentAt: "2025-02-22 02:00 PM", status: "Sent" },
  { id: "nh4", customerId: "cu5", customerName: "Vikram Singh", type: "Premium Upgrade Offer", channel: "WhatsApp", message: "Upgrade to Annual plan and save 30%! Limited time offer.", sentAt: "2025-02-10 11:00 AM", status: "Sent" },
  { id: "nh5", customerId: "cu6", customerName: "Ananya Reddy", type: "Renewal Reminder", channel: "Alert", message: "Your membership expires in 9 days. Renew now!", sentAt: "2025-03-11 08:00 AM", status: "Sent" },
];

export type SportProgram = {
  id: string;
  title: string;
  level: string;
  ageGroup: string;
  schedule: string;
  price: number;
  image: string;
  badge: string;
  badgeColor: string;
  accentColor: string;
  description: string;
};

export const allSportPrograms: Record<string, SportProgram[]> = {
  Swimming: [
    {
      id: "sw-p1",
      title: "Kids Learn to Swim",
      level: "Beginner",
      ageGroup: "4–8 years",
      schedule: "Mon, Wed, Fri",
      price: 3500,
      image: programKids,
      badge: "🏊 Most Popular",
      badgeColor: "bg-emerald-500",
      accentColor: "from-emerald-600/80",
      description: "A comprehensive beginner program for kids to learn basic swimming skills and water safety.",
    },
    {
      id: "sw-p2",
      title: "Adult Fitness Swimming",
      level: "All Levels",
      ageGroup: "18+ years",
      schedule: "Tue, Thu, Sat",
      price: 4500,
      image: programAdult,
      badge: "🔥 Trending",
      badgeColor: "bg-orange-500",
      accentColor: "from-blue-600/80",
      description: "Fitness-focused swimming program for adults. Improve cardiovascular health and endurance.",
    },
    {
      id: "sw-p3",
      title: "Competitive Coaching",
      level: "Advanced",
      ageGroup: "10–18 years",
      schedule: "Mon–Sat",
      price: 8000,
      image: programCompetitive,
      badge: "🏆 Elite",
      badgeColor: "bg-amber-500",
      accentColor: "from-purple-700/80",
      description: "Intensive training program for competitive swimmers preparing for championships.",
    },
    {
      id: "sw-p4",
      title: "Weekend Family Training",
      level: "Intermediate",
      ageGroup: "All Ages",
      schedule: "Sat, Sun",
      price: 3000,
      image: programWeekend,
      badge: "👨‍👩‍👧 Family",
      badgeColor: "bg-primary",
      accentColor: "from-cyan-700/80",
      description: "Perfect for busy families. Weekend-focused intermediate swimming training program.",
    },
  ],
  Futsal: [
    {
      id: "fs-p1",
      title: "Kids Futsal Fundamentals",
      level: "Beginner",
      ageGroup: "5–10 years",
      schedule: "Mon, Wed, Fri",
      price: 3000,
      image: progFutsalKids,
      badge: "⚽ Most Popular",
      badgeColor: "bg-emerald-500",
      accentColor: "from-emerald-600/80",
      description: "Essential ball control and teamwork skills for young football enthusiasts.",
    },
    {
      id: "fs-p2",
      title: "Adult Futsal Fitness",
      level: "All Levels",
      ageGroup: "18+ years",
      schedule: "Tue, Thu, Sat",
      price: 4000,
      image: progFutsalAdult,
      badge: "🔥 Trending",
      badgeColor: "bg-orange-500",
      accentColor: "from-orange-700/80",
      description: "High-intensity match play and fitness drills for the modern urban player.",
    },
    {
      id: "fs-p3",
      title: "Competitive Futsal Training",
      level: "Advanced",
      ageGroup: "12–20 years",
      schedule: "Mon–Sat",
      price: 7000,
      image: progFutsalCompetitive,
      badge: "🏆 Elite",
      badgeColor: "bg-amber-500",
      accentColor: "from-yellow-700/80",
      description: "Tactical and physical preparation for competitive futsal tournaments.",
    },
    {
      id: "fs-p4",
      title: "Weekend Futsal League",
      level: "Intermediate",
      ageGroup: "All Ages",
      schedule: "Sat, Sun",
      price: 2500,
      image: progFutsalWeekend,
      badge: "🎉 Social League",
      badgeColor: "bg-primary",
      accentColor: "from-green-700/80",
      description: "Friendly community matches to keep you active and connected every weekend.",
    },
  ],
  Pickleball: [
    {
      id: "pb-p1",
      title: "Kids Pickleball Starter",
      level: "Beginner",
      ageGroup: "6–12 years",
      schedule: "Mon, Wed, Fri",
      price: 2800,
      image: progPickleballKids,
      badge: "🏓 Most Popular",
      badgeColor: "bg-emerald-500",
      accentColor: "from-lime-600/80",
      description: "Fun-filled introduction to the fastest growing sport. Focus on basic dinks and serves.",
    },
    {
      id: "pb-p2",
      title: "Adult Fitness Pickleball",
      level: "All Levels",
      ageGroup: "18+ years",
      schedule: "Tue, Thu, Sat",
      price: 3500,
      image: progPickleballAdult,
      badge: "🔥 Trending",
      badgeColor: "bg-orange-500",
      accentColor: "from-teal-600/80",
      description: "Improve your agility and heart health with dynamic pickleball drills and gameplay.",
    },
    {
      id: "pb-p3",
      title: "Competitive Pickleball",
      level: "Advanced",
      ageGroup: "14–35 years",
      schedule: "Mon–Sat",
      price: 6500,
      image: progPickleballCompetitive,
      badge: "🏆 Elite",
      badgeColor: "bg-amber-500",
      accentColor: "from-indigo-700/80",
      description: "Tournament-level coaching focusing on advanced strategy and power plays.",
    },
    {
      id: "pb-p4",
      title: "Weekend Doubles Clinic",
      level: "Intermediate",
      ageGroup: "All Ages",
      schedule: "Sat, Sun",
      price: 2500,
      image: progPickleballWeekend,
      badge: "👫 Doubles",
      badgeColor: "bg-primary",
      accentColor: "from-sky-700/80",
      description: "Master the art of doubles coordination and tactical positioning.",
    },
  ],
  "Table Tennis": [
    {
      id: "tt-p1",
      title: "Kids TT Starter",
      level: "Beginner",
      ageGroup: "5–12 years",
      schedule: "Mon, Wed, Fri",
      price: 2500,
      image: progTTKids,
      badge: "🏓 Most Popular",
      badgeColor: "bg-emerald-500",
      accentColor: "from-emerald-600/80",
      description: "Develop lightning reflexes and core table tennis techniques for young beginners.",
    },
    {
      id: "tt-p2",
      title: "Adult Table Tennis Fitness",
      level: "All Levels",
      ageGroup: "18+ years",
      schedule: "Tue, Thu, Sat",
      price: 3000,
      image: progTTAdult,
      badge: "🔥 Trending",
      badgeColor: "bg-orange-500",
      accentColor: "from-red-700/80",
      description: "Enhance your focus and fitness with high-speed table tennis training and volleys.",
    },
    {
      id: "tt-p3",
      title: "Competitive TT Coaching",
      level: "Advanced",
      ageGroup: "10–25 years",
      schedule: "Mon–Sat",
      price: 6000,
      image: progTTCompetitive,
      badge: "🏆 Elite",
      badgeColor: "bg-amber-500",
      accentColor: "from-purple-700/80",
      description: "Advanced spin control and psychological preparation for state and national tournaments.",
    },
    {
      id: "tt-p4",
      title: "Weekend TT Social League",
      level: "Intermediate",
      ageGroup: "All Ages",
      schedule: "Sat, Sun",
      price: 2000,
      image: progTTWeekend,
      badge: "🎉 Social",
      badgeColor: "bg-primary",
      accentColor: "from-pink-700/80",
      description: "Join our vibrant social league to enjoy competitive yet fun matches every weekend.",
    },
  ],
};

export const allSportMemberships: Record<string, { id: string; name: string; duration: string; price: number; features: string[]; popular: boolean }[]> = {
  Swimming: [
    { id: "sm1", name: "Monthly", duration: "1 Month", price: 2999, features: ["Unlimited pool access", "Locker facility", "1 Guest pass", "Basic progress report"], popular: false },
    { id: "sm2", name: "Quarterly", duration: "3 Months", price: 7999, features: ["Unlimited pool access", "Locker facility", "3 Guest passes", "Detailed progress reports", "10% coaching discount"], popular: true },
    { id: "sm3", name: "Half-Yearly", duration: "6 Months", price: 13999, features: ["Unlimited pool access", "Premium locker", "6 Guest passes", "Detailed progress reports", "15% coaching discount", "Free towel service"], popular: false },
    { id: "sm4", name: "Annual", duration: "12 Months", price: 24999, features: ["Unlimited pool access", "Premium locker", "12 Guest passes", "All progress reports", "20% coaching discount", "Free towel service", "Priority slot booking"], popular: false },
  ],
  Futsal: [
    { id: "fm1", name: "Monthly", duration: "1 Month", price: 2499, features: ["Unlimited court access", "Locker facility", "1 Guest pass", "Basic stats report"], popular: false },
    { id: "fm2", name: "Quarterly", duration: "3 Months", price: 6499, features: ["Unlimited court access", "Locker facility", "3 Guest passes", "Performance reports", "10% coaching discount"], popular: true },
    { id: "fm3", name: "Half-Yearly", duration: "6 Months", price: 11999, features: ["Unlimited court access", "Premium locker", "6 Guest passes", "Performance reports", "15% coaching discount", "Free jersey"], popular: false },
    { id: "fm4", name: "Annual", duration: "12 Months", price: 21999, features: ["Unlimited court access", "Premium locker", "12 Guest passes", "All performance reports", "20% coaching discount", "Free jersey", "Priority booking"], popular: false },
  ],
  Pickleball: [
    { id: "pm1", name: "Monthly", duration: "1 Month", price: 1999, features: ["Unlimited court access", "Paddle rental", "1 Guest pass", "Basic stats report"], popular: false },
    { id: "pm2", name: "Quarterly", duration: "3 Months", price: 5499, features: ["Unlimited court access", "Paddle rental", "3 Guest passes", "Performance reports", "10% coaching discount"], popular: true },
    { id: "pm3", name: "Half-Yearly", duration: "6 Months", price: 9999, features: ["Unlimited court access", "Own paddle storage", "6 Guest passes", "Performance reports", "15% coaching discount", "Free grip tape"], popular: false },
    { id: "pm4", name: "Annual", duration: "12 Months", price: 17999, features: ["Unlimited court access", "Own paddle storage", "12 Guest passes", "All performance reports", "20% coaching discount", "Free grip tape", "Priority booking"], popular: false },
  ],
  "Table Tennis": [
    { id: "tm1", name: "Monthly", duration: "1 Month", price: 1499, features: ["Unlimited table access", "Paddle rental", "1 Guest pass", "Basic stats report"], popular: false },
    { id: "tm2", name: "Quarterly", duration: "3 Months", price: 3999, features: ["Unlimited table access", "Paddle rental", "3 Guest passes", "Performance reports", "10% coaching discount"], popular: true },
    { id: "tm3", name: "Half-Yearly", duration: "6 Months", price: 7499, features: ["Unlimited table access", "Own paddle rack", "6 Guest passes", "Performance reports", "15% coaching discount", "Free rubber sheet"], popular: false },
    { id: "tm4", name: "Annual", duration: "12 Months", price: 13499, features: ["Unlimited table access", "Own paddle rack", "12 Guest passes", "All performance reports", "20% coaching discount", "Free rubber sheet", "Priority booking"], popular: false },
  ],
};

export const multiSportTestimonials = [
  // Swimming
  { name: "Priya Sharma", initials: "PS", role: "Swimming · Parent", sport: "🏊 Swimming", accent: "from-cyan-600/30 to-blue-500/10", text: "Our kids have transformed completely. The coaches are incredibly patient and the pool facilities are world-class!" },
  { name: "Rahul Verma", initials: "RV", role: "Swimming · Competitive", sport: "🏊 Swimming", accent: "from-blue-700/30 to-cyan-400/10", text: "I cut 8 seconds off my 100m freestyle in just 3 months. The data-driven tracking is unlike anything I've experienced." },
  { name: "Anita Krishnan", initials: "AK", role: "Swimming · Adult Fitness", sport: "🏊 Swimming", accent: "from-teal-600/30 to-emerald-400/10", text: "Started as a complete beginner at 38. Within 6 months I'm swimming 2km daily. The booking app makes everything effortless." },
  // Futsal
  { name: "Kiran Mehta", initials: "KM", role: "Futsal · Weekend League", sport: "⚽ Futsal", accent: "from-emerald-600/30 to-green-400/10", text: "The weekend futsal league is the highlight of my week. Great facilities, excellent coaching and a brilliant community!" },
  { name: "Siddharth Rao", initials: "SR", role: "Futsal · Competitive", sport: "⚽ Futsal", accent: "from-lime-600/30 to-yellow-400/10", text: "Competitive futsal training at Scooled is top-notch. Our team went from district level to state finals in one season." },
  { name: "Deepa Nair", initials: "DN", role: "Futsal · Adult Fitness", sport: "⚽ Futsal", accent: "from-green-700/30 to-emerald-300/10", text: "Never thought I'd love indoor football this much. The coaches push you just right and the energy in every session is electric." },
  // Pickleball
  { name: "Arjun Pillai", initials: "AP", role: "Pickleball · Doubles Clinic", sport: "🏓 Pickleball", accent: "from-violet-600/30 to-purple-400/10", text: "The doubles clinic completely transformed my game. The court quality is superb and coaches break down strategy brilliantly." },
  { name: "Meera Joshi", initials: "MJ", role: "Pickleball · Adult Fitness", sport: "🏓 Pickleball", accent: "from-indigo-600/30 to-blue-400/10", text: "Pickleball at Scooled is addictive! Perfect pace for beginners. I went from not knowing the rules to winning club matches." },
  { name: "Rajan Thomas", initials: "RT", role: "Pickleball · Competitive", sport: "🏓 Pickleball", accent: "from-purple-700/30 to-violet-300/10", text: "The competitive pickleball program is structured brilliantly. I can track every improvement session-by-session through the app." },
  // Table Tennis
  { name: "Sneha Iyer", initials: "SI", role: "Table Tennis · Social League", sport: "🏓 Table Tennis", accent: "from-rose-600/30 to-pink-400/10", text: "The TT social league is so fun and friendly. I've made so many friends and my backhand has improved dramatically!" },
  { name: "Vikram Bose", initials: "VB", role: "Table Tennis · Competitive", sport: "🏓 Table Tennis", accent: "from-red-600/30 to-orange-400/10", text: "Elite coaching at Scooled helped me qualify for the state juniors. The attention to technique and spin is exceptional." },
  { name: "Lavanya Reddy", initials: "LR", role: "Table Tennis · Kids Starter", sport: "🏓 Table Tennis", accent: "from-pink-600/30 to-rose-300/10", text: "My 9-year-old daughter is obsessed with table tennis now! Patient coaches and a programme designed perfectly for young players." },
];

export const sportTabs = [
  { key: "Swimming", label: "Swimming", emoji: "🏊" },
  { key: "Futsal", label: "Futsal", emoji: "⚽" },
  { key: "Pickleball", label: "Pickleball", emoji: "🏓" },
  { key: "Table Tennis", label: "Table Tennis", emoji: "🏓" },
];

// Helper function to calculate days until expiry
export const getDaysUntilExpiry = (expiryDate: string): number => {
  const today = new Date("2026-03-11"); // Current date in the app
  const expiry = new Date(expiryDate);
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Helper function to get expiry status
export const getExpiryStatus = (expiryDate: string): { status: string; color: string; daysRemaining: number } => {
  const daysRemaining = getDaysUntilExpiry(expiryDate);
  
  if (daysRemaining < 0) {
    return { status: "Expired", color: "text-destructive bg-destructive/10", daysRemaining };
  } else if (daysRemaining <= 7) {
    return { status: "Expiring Soon", color: "text-destructive bg-destructive/10", daysRemaining };
  } else if (daysRemaining <= 30) {
    return { status: "Expiring This Month", color: "text-gold bg-gold/10", daysRemaining };
  } else {
    return { status: "Active", color: "text-primary bg-primary/10", daysRemaining };
  }
};
