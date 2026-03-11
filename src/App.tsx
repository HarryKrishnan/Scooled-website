import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Layouts
import PublicLayout from "@/components/layout/PublicLayout";
import PortalLayout from "@/components/layout/PortalLayout";
import AdminLayout from "@/components/layout/AdminLayout";
import CoachLayout from "@/components/layout/CoachLayout";

// Public Pages
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ProgramsPage from "@/pages/ProgramsPage";
import MembershipsPage from "@/pages/MembershipsPage";
import ContactPage from "@/pages/ContactPage";
import LoginPage from "@/pages/LoginPage";
import NotFound from "@/pages/NotFound";

// Portal Pages
import PortalDashboard from "@/pages/portal/PortalDashboard";
import PortalProfile from "@/pages/portal/PortalProfile";
import PortalBookings from "@/pages/portal/PortalBookings";
import PortalPayments from "@/pages/portal/PortalPayments";
import PortalNotifications from "@/pages/portal/PortalNotifications";
import PortalPlaceholder from "@/pages/portal/PortalPlaceholder";
import PortalBookSlot from "@/pages/portal/PortalBookSlot";
import PortalPrograms from "@/pages/portal/PortalPrograms";
import PortalMemberships from "@/pages/portal/PortalMemberships";
import PortalProgress from "@/pages/portal/PortalProgress";
import PortalFeedback from "@/pages/portal/PortalFeedback";

// Admin Pages
import AdminOverview from "@/pages/admin/AdminOverview";
import AdminCustomers from "@/pages/admin/AdminCustomers";
import AdminCoaches from "@/pages/admin/AdminCoaches";
import AdminPrograms from "@/pages/admin/AdminPrograms";
import AdminPayments from "@/pages/admin/AdminPayments";
import AdminCalendar from "@/pages/admin/AdminCalendar";
import AdminComplaints from "@/pages/admin/AdminComplaints";
import AdminMemberships from "@/pages/admin/AdminMemberships";
import AdminPlaceholder from "@/pages/admin/AdminPlaceholder";

// Coach Pages
import CoachDashboard from "@/pages/coach/CoachDashboard";
import CoachTrainees from "@/pages/coach/CoachTrainees";
import CoachSchedule from "@/pages/coach/CoachSchedule";
import CoachAttendance from "@/pages/coach/CoachAttendance";
import CoachProgress from "@/pages/coach/CoachProgress";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Website */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/memberships" element={<MembershipsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />

          {/* Customer Portal */}
          <Route path="/portal" element={<PortalLayout />}>
            <Route index element={<PortalDashboard />} />
            <Route path="profile" element={<PortalProfile />} />
            <Route path="book" element={<PortalBookSlot />} />
            <Route path="bookings" element={<PortalBookings />} />
            <Route path="programs" element={<PortalPrograms />} />
            <Route path="memberships" element={<PortalMemberships />} />
            <Route path="payments" element={<PortalPayments />} />
            <Route path="progress" element={<PortalProgress />} />
            <Route path="feedback" element={<PortalFeedback />} />
            <Route path="notifications" element={<PortalNotifications />} />
          </Route>

          {/* Admin Dashboard */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminOverview />} />
            <Route path="calendar" element={<AdminCalendar />} />
            <Route path="programs" element={<AdminPrograms />} />
            <Route path="memberships" element={<AdminMemberships />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="coaches" element={<AdminCoaches />} />
            <Route path="payments" element={<AdminPayments />} />
            <Route path="attendance" element={<AdminPlaceholder title="Attendance & Progress" />} />
            <Route path="progress" element={<AdminPlaceholder title="Progress Reports" />} />
            <Route path="complaints" element={<AdminComplaints />} />
            <Route path="notifications" element={<AdminPlaceholder title="Notifications" />} />
            <Route path="reports" element={<AdminPlaceholder title="Reports & Analytics" />} />
            <Route path="settings" element={<AdminPlaceholder title="Settings" />} />
          </Route>

          {/* Coach / Staff Portal */}
          <Route path="/coach" element={<CoachLayout />}>
            <Route index element={<CoachDashboard />} />
            <Route path="trainees" element={<CoachTrainees />} />
            <Route path="schedule" element={<CoachSchedule />} />
            <Route path="attendance" element={<CoachAttendance />} />
            <Route path="progress" element={<CoachProgress />} />
            <Route path="messages" element={<PortalPlaceholder title="Messages" />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
