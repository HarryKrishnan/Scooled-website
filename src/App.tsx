import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import MembershipGuard from "@/components/onboarding/MembershipGuard";
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
import RegisterPage from "@/pages/RegisterPage";
import NotFound from "@/pages/NotFound";

// Swimming Portal Pages
import SwimmingPortalDashboard from "@/pages/portal/swimming/PortalDashboard";
import SwimmingPortalProfile from "@/pages/portal/swimming/PortalProfile";
import SwimmingPortalBookings from "@/pages/portal/swimming/PortalBookings";
import SwimmingPortalPayments from "@/pages/portal/swimming/PortalPayments";
import SwimmingPortalNotifications from "@/pages/portal/swimming/PortalNotifications";
import SwimmingPortalPlaceholder from "@/pages/portal/swimming/PortalPlaceholder";
import SwimmingPortalBookSlot from "@/pages/portal/swimming/PortalBookSlot";
import SwimmingPortalPrograms from "@/pages/portal/swimming/PortalPrograms";
import SwimmingPortalMemberships from "@/pages/portal/swimming/PortalMemberships";
import SwimmingPortalProgress from "@/pages/portal/swimming/PortalProgress";
import SwimmingPortalFeedback from "@/pages/portal/swimming/PortalFeedback";

// Futsal Portal Pages
import FutsalPortalDashboard from "@/pages/portal/futsal/PortalDashboard";
import FutsalPortalProfile from "@/pages/portal/futsal/PortalProfile";
import FutsalPortalBookings from "@/pages/portal/futsal/PortalBookings";
import FutsalPortalPayments from "@/pages/portal/futsal/PortalPayments";
import FutsalPortalNotifications from "@/pages/portal/futsal/PortalNotifications";
import FutsalPortalPlaceholder from "@/pages/portal/futsal/PortalPlaceholder";
import FutsalPortalBookSlot from "@/pages/portal/futsal/PortalBookSlot";
import FutsalPortalPrograms from "@/pages/portal/futsal/PortalPrograms";
import FutsalPortalMemberships from "@/pages/portal/futsal/PortalMemberships";
import FutsalPortalProgress from "@/pages/portal/futsal/PortalProgress";
import FutsalPortalFeedback from "@/pages/portal/futsal/PortalFeedback";

// Pickleball Portal Pages
import PickleballPortalDashboard from "@/pages/portal/pickleball/PortalPickleballDashboard";
import PickleballPortalProfile from "@/pages/portal/pickleball/PortalProfile";
import PickleballPortalBookings from "@/pages/portal/pickleball/PortalBookings";
import PickleballPortalPayments from "@/pages/portal/pickleball/PortalPayments";
import PickleballPortalNotifications from "@/pages/portal/pickleball/PortalNotifications";
import PickleballPortalPlaceholder from "@/pages/portal/pickleball/PortalPlaceholder";
import PickleballPortalBookSlot from "@/pages/portal/pickleball/PortalBookSlot";
import PickleballPortalPrograms from "@/pages/portal/pickleball/PortalPrograms";
import PickleballPortalMemberships from "@/pages/portal/pickleball/PortalMemberships";
import PickleballPortalProgress from "@/pages/portal/pickleball/PortalProgress";
import PickleballPortalFeedback from "@/pages/portal/pickleball/PortalFeedback";

// Table Tennis Portal Pages
import TTPortalDashboard from "@/pages/portal/table-tennis/PortalTableTennisDashboard";
import TTPortalProfile from "@/pages/portal/table-tennis/PortalProfile";
import TTPortalBookings from "@/pages/portal/table-tennis/PortalBookings";
import TTPortalPayments from "@/pages/portal/table-tennis/PortalPayments";
import TTPortalNotifications from "@/pages/portal/table-tennis/PortalNotifications";
import TTPortalPlaceholder from "@/pages/portal/table-tennis/PortalPlaceholder";
import TTPortalBookSlot from "@/pages/portal/table-tennis/PortalBookSlot";
import TTPortalPrograms from "@/pages/portal/table-tennis/PortalPrograms";
import TTPortalMemberships from "@/pages/portal/table-tennis/PortalMemberships";
import TTPortalProgress from "@/pages/portal/table-tennis/PortalProgress";
import TTPortalFeedback from "@/pages/portal/table-tennis/PortalFeedback";

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
          <Route path="/register" element={<RegisterPage />} />

          {/* Customer Portal */}
          <Route path="/portal" element={<MembershipGuard><PortalLayout /></MembershipGuard>}>
            {/* Default redirect to swimming */}
            <Route index element={<SwimmingPortalDashboard />} />
            
            <Route path="swimming">
              <Route index element={<SwimmingPortalDashboard />} />
              <Route path="profile" element={<SwimmingPortalProfile />} />
              <Route path="book" element={<SwimmingPortalBookSlot />} />
              <Route path="bookings" element={<SwimmingPortalBookings />} />
              <Route path="programs" element={<SwimmingPortalPrograms />} />
              <Route path="memberships" element={<SwimmingPortalMemberships />} />
              <Route path="payments" element={<SwimmingPortalPayments />} />
              <Route path="progress" element={<SwimmingPortalProgress />} />
              <Route path="feedback" element={<SwimmingPortalFeedback />} />
              <Route path="notifications" element={<SwimmingPortalNotifications />} />
            </Route>

            <Route path="futsal">
              <Route index element={<FutsalPortalDashboard />} />
              <Route path="profile" element={<FutsalPortalProfile />} />
              <Route path="book" element={<FutsalPortalBookSlot />} />
              <Route path="bookings" element={<FutsalPortalBookings />} />
              <Route path="programs" element={<FutsalPortalPrograms />} />
              <Route path="memberships" element={<FutsalPortalMemberships />} />
              <Route path="payments" element={<FutsalPortalPayments />} />
              <Route path="progress" element={<FutsalPortalProgress />} />
              <Route path="feedback" element={<FutsalPortalFeedback />} />
              <Route path="notifications" element={<FutsalPortalNotifications />} />
            </Route>

            <Route path="pickleball">
              <Route index element={<PickleballPortalDashboard />} />
              <Route path="profile" element={<PickleballPortalProfile />} />
              <Route path="book" element={<PickleballPortalBookSlot />} />
              <Route path="bookings" element={<PickleballPortalBookings />} />
              <Route path="programs" element={<PickleballPortalPrograms />} />
              <Route path="memberships" element={<PickleballPortalMemberships />} />
              <Route path="payments" element={<PickleballPortalPayments />} />
              <Route path="progress" element={<PickleballPortalProgress />} />
              <Route path="feedback" element={<PickleballPortalFeedback />} />
              <Route path="notifications" element={<PickleballPortalNotifications />} />
            </Route>

            <Route path="table-tennis">
              <Route index element={<TTPortalDashboard />} />
              <Route path="profile" element={<TTPortalProfile />} />
              <Route path="book" element={<TTPortalBookSlot />} />
              <Route path="bookings" element={<TTPortalBookings />} />
              <Route path="programs" element={<TTPortalPrograms />} />
              <Route path="memberships" element={<TTPortalMemberships />} />
              <Route path="payments" element={<TTPortalPayments />} />
              <Route path="progress" element={<TTPortalProgress />} />
              <Route path="feedback" element={<TTPortalFeedback />} />
              <Route path="notifications" element={<TTPortalNotifications />} />
            </Route>
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
            <Route path="messages" element={<SwimmingPortalPlaceholder title="Messages" />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
