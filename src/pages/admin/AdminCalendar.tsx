import { slots, slotBookings, centres } from "@/data/mockData";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Users, Clock, CheckCircle2, X } from "lucide-react";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format, startOfWeek, endOfWeek } from "date-fns";

type ViewMode = "daily" | "weekly" | "monthly";

type SlotBooking = {
  id: string;
  slotId: string;
  customerId: string;
  customerName: string;
  date: string;
  centreId: string;
  status: string;
};

type Slot = {
  id: string;
  time: string;
  capacity: number;
  booked: number;
  type: string;
};

export default function AdminCalendar() {
  const [viewMode, setViewMode] = useState<ViewMode>("daily");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [clickedDate, setClickedDate] = useState<Date | null>(null);
  const [selectedCentre, setSelectedCentre] = useState<string>(centres[0].id);
  const [cancelDialog, setCancelDialog] = useState<{ open: boolean; booking: SlotBooking | null }>({ open: false, booking: null });
  const [bookingList, setBookingList] = useState<SlotBooking[]>(slotBookings);

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const formatDisplayDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (formatDate(date) === formatDate(today)) return "Today";
    if (formatDate(date) === formatDate(yesterday)) return "Yesterday";
    if (formatDate(date) === formatDate(tomorrow)) return "Tomorrow";
    
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getBookingsForSlot = (slotId: string, date: string, centreId: string) => {
    return bookingList.filter(
      b => b.slotId === slotId && b.date === date && b.centreId === centreId && b.status === "confirmed"
    );
  };

  const getBookingsForDate = (date: string, centreId: string) => {
    return bookingList.filter(b => b.date === date && b.centreId === centreId && b.status === "confirmed");
  };

  const getAvailabilityColor = (booked: number, capacity: number) => {
    const remaining = capacity - booked;
    if (remaining > 3) return { bg: "bg-primary", text: "text-primary", status: "Available" };
    if (remaining > 0) return { bg: "bg-gold", text: "text-gold", status: "Low" };
    return { bg: "bg-destructive", text: "text-destructive", status: "Full" };
  };

  const handleCancelBooking = (booking: SlotBooking) => {
    setCancelDialog({ open: true, booking });
  };

  const confirmCancelBooking = () => {
    if (cancelDialog.booking) {
      setBookingList(bookingList.map(b => 
        b.id === cancelDialog.booking!.id ? { ...b, status: "cancelled" } : b
      ));
      setCancelDialog({ open: false, booking: null });
    }
  };

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(selectedDate);
    if (viewMode === "daily") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1));
    } else if (viewMode === "weekly") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
    } else {
      newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));
    }
    setSelectedDate(newDate);
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  // Get adaptive date range display based on view mode
  const getDateRangeDisplay = () => {
    if (viewMode === "weekly") {
      const weekStart = startOfWeek(selectedDate, { weekStartsOn: 0 });
      const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 0 });
      return `${format(weekStart, "do MMM")} - ${format(weekEnd, "do MMM yyyy")}`;
    } else if (viewMode === "monthly") {
      return format(selectedDate, "MMMM yyyy");
    } else {
      return formatDisplayDate(selectedDate);
    }
  };

  // Handle calendar date click
  const handleCalendarDateClick = (date: Date | undefined) => {
    if (date) {
      // Toggle behavior: if same date clicked again, deselect
      if (clickedDate && formatDate(date) === formatDate(clickedDate)) {
        setClickedDate(null);
      } else {
        setClickedDate(date);
      }
    }
  };

  // Calculate stats for selected date/centre
  const dateStr = formatDate(selectedDate);
  const todayBookings = getBookingsForDate(dateStr, selectedCentre);
  const totalCapacity = slots.reduce((sum, slot) => sum + slot.capacity, 0);
  const totalBooked = todayBookings.length;
  const occupancyRate = totalCapacity > 0 ? Math.round((totalBooked / totalCapacity) * 100) : 0;

  // Daily View Component
  const DailyView = () => {
    const sortedSlots = [...slots].sort((a, b) => {
      const getHour = (time: string) => {
        const match = time.match(/(\d+):(\d+)\s*(AM|PM)/);
        if (!match) return 0;
        let hour = parseInt(match[1]);
        if (match[3] === "PM" && hour !== 12) hour += 12;
        if (match[3] === "AM" && hour === 12) hour = 0;
        return hour;
      };
      return getHour(a.time) - getHour(b.time);
    });

    return (
      <div className="space-y-3">
        {sortedSlots.map((slot) => {
          const slotBookingsData = getBookingsForSlot(slot.id, dateStr, selectedCentre);
          const currentBooked = slotBookingsData.length;
          const availability = getAvailabilityColor(currentBooked, slot.capacity);
          const occupancyPercent = (currentBooked / slot.capacity) * 100;

          return (
            <div key={slot.id} className="card-premium hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock size={16} className="text-white/60" />
                    <h3 className="font-bold text-white text-sm">{slot.time}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      slot.type === "Open Swim" ? "bg-primary/10 text-primary" :
                      slot.type === "Coaching" ? "bg-orange-500/10 text-orange-500" :
                      slot.type === "Ladies Only" ? "bg-pink-500/10 text-pink-500" :
                      "bg-cyan/10 text-cyan"
                    }`}>
                      {slot.type}
                    </span>
                  </div>
                  
                  {/* Occupancy Bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/60 font-medium">{currentBooked}/{slot.capacity} booked</span>
                      <span className={`font-bold ${availability.text}`}>{availability.status}</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${availability.bg} transition-all`}
                        style={{ width: `${occupancyPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Customer List */}
                  {slotBookingsData.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-white/60 uppercase tracking-wider">Booked Customers</p>
                      <div className="grid gap-2">
                        {slotBookingsData.map((booking) => (
                          <div key={booking.id} className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/10">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                                {booking.customerName.charAt(0)}
                              </div>
                              <span className="text-sm font-medium text-white">{booking.customerName}</span>
                            </div>
                            <button
                              onClick={() => handleCancelBooking(booking)}
                              className="p-1.5 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                              title="Cancel booking"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Weekly View Component
  const WeeklyView = () => {
    const getWeekDates = () => {
      const dates = [];
      const startOfWeek = new Date(selectedDate);
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
      
      for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(date.getDate() + i);
        dates.push(date);
      }
      return dates;
    };

    const weekDates = getWeekDates();

    return (
      <div className="overflow-x-auto">
        <div className="grid grid-cols-7 gap-3 min-w-[800px]">
          {weekDates.map((date) => {
            const dateStr = formatDate(date);
            const dayBookings = getBookingsForDate(dateStr, selectedCentre);
            const isToday = formatDate(date) === formatDate(new Date());

            return (
              <div
                key={dateStr}
                className={`card-premium ${isToday ? 'border-primary border-2' : ''}`}
              >
                <div className="text-center mb-3">
                  <p className="text-xs font-bold text-white/60 uppercase">
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </p>
                  <p className="text-lg font-bold text-white">
                    {date.getDate()}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-primary/5">
                    <Users size={14} className="text-primary" />
                    <span className="text-xs font-bold text-white">{dayBookings.length}</span>
                  </div>
                  
                  {dayBookings.slice(0, 3).map((booking) => {
                    const slot = slots.find(s => s.id === booking.slotId);
                    return (
                      <div key={booking.id} className="p-1.5 rounded-lg bg-white/5 border border-white/10">
                        <p className="text-[10px] text-white/60 font-medium">{slot?.time.split('–')[0].trim()}</p>
                        <p className="text-xs font-medium text-white truncate">{booking.customerName}</p>
                      </div>
                    );
                  })}
                  
                  {dayBookings.length > 3 && (
                    <p className="text-xs text-white/40 text-center font-medium">+{dayBookings.length - 3} more</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Monthly View Component
  const MonthlyView = () => {
    const getMonthlyStats = () => {
      const startOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
      const endOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
      
      const monthBookings = bookingList.filter(b => {
        const bookingDate = new Date(b.date);
        return bookingDate >= startOfMonth && bookingDate <= endOfMonth && 
               b.centreId === selectedCentre && b.status === "confirmed";
      });

      return {
        total: monthBookings.length,
        average: Math.round(monthBookings.length / endOfMonth.getDate()),
      };
    };

    const stats = getMonthlyStats();

    return (
      <div className="space-y-6">
        {/* Monthly Stats */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="card-premium">
            <p className="text-xs font-bold text-white/60 uppercase tracking-wider mb-1">Total Bookings</p>
            <p className="text-2xl font-bold text-primary">{stats.total}</p>
            <p className="text-xs text-white/40 mt-1 font-medium">This month</p>
          </div>
          <div className="card-premium">
            <p className="text-xs font-bold text-white/60 uppercase tracking-wider mb-1">Avg Per Day</p>
            <p className="text-2xl font-bold text-white">{stats.average}</p>
            <p className="text-xs text-white/40 mt-1 font-medium">Bookings per day</p>
          </div>
        </div>
      </div>
    );
  };

  // Enhanced Calendar Component (visible in all views)
  const CalendarWidget = () => {
    return (
      <div className="card-premium p-6">
        <h3 className="text-lg font-bold text-white mb-4">Select Date</h3>
        <Calendar
          mode="single"
          selected={clickedDate || undefined}
          onSelect={handleCalendarDateClick}
          className="rounded-md border-0 [&_.rdp-months]:w-full [&_.rdp-month]:w-full [&_.rdp-caption]:text-white [&_.rdp-caption]:text-base [&_.rdp-caption]:font-bold [&_.rdp-nav_button]:hover:bg-white/10 [&_.rdp-nav_button]:text-white [&_.rdp-head_cell]:text-white/60 [&_.rdp-head_cell]:font-bold [&_.rdp-head_cell]:text-sm [&_.rdp-cell]:p-0 [&_.rdp-day]:h-14 [&_.rdp-day]:w-full [&_.rdp-day]:text-base [&_.rdp-day]:font-medium [&_.rdp-day]:text-white/80 [&_.rdp-day:hover]:bg-white/10 [&_.rdp-day_selected]:bg-amber-500 [&_.rdp-day_selected]:text-white [&_.rdp-day_selected]:font-bold [&_.rdp-day_selected]:hover:bg-amber-600 [&_.rdp-day_today]:bg-white/5 [&_.rdp-day_today]:border-2 [&_.rdp-day_today]:border-primary [&_.rdp-day_today]:font-bold"
          modifiers={{
            booked: (date) => {
              const dateStr = formatDate(date);
              return getBookingsForDate(dateStr, selectedCentre).length > 0;
            }
          }}
          modifiersStyles={{
            booked: {
              position: 'relative',
            }
          }}
          modifiersClassNames={{
            booked: "after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-primary after:rounded-full"
          }}
        />
      </div>
    );
  };

  // Side Panel Schedule Display
  const SidePanel = () => {
    if (!clickedDate) return null;

    const clickedDateStr = formatDate(clickedDate);
    const dayBookings = getBookingsForDate(clickedDateStr, selectedCentre);

    // Group bookings by slot and sort by time
    const sortedSlots = [...slots].sort((a, b) => {
      const getHour = (time: string) => {
        const match = time.match(/(\d+):(\d+)\s*(AM|PM)/);
        if (!match) return 0;
        let hour = parseInt(match[1]);
        if (match[3] === "PM" && hour !== 12) hour += 12;
        if (match[3] === "AM" && hour === 12) hour = 0;
        return hour;
      };
      return getHour(a.time) - getHour(b.time);
    });

    const slotsWithBookings = sortedSlots.map(slot => ({
      slot,
      bookings: dayBookings.filter(b => b.slotId === slot.id)
    })).filter(item => item.bookings.length > 0);

    return (
      <div className="w-[360px] card-premium p-6 space-y-4 max-h-[calc(100vh-240px)] overflow-y-auto hidden lg:block">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-lg font-bold text-white">Schedules</h3>
            <p className="text-sm text-white/60 font-medium">{format(clickedDate, "EEEE, do MMMM yyyy")}</p>
          </div>
          <button
            onClick={() => setClickedDate(null)}
            className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            title="Close panel"
          >
            <X size={18} />
          </button>
        </div>

        {slotsWithBookings.length === 0 ? (
          <div className="text-center py-12">
            <CalendarIcon size={48} className="text-white/20 mx-auto mb-3" />
            <p className="text-white/60 font-medium">No schedules for this date</p>
            <p className="text-xs text-white/40 mt-1">Select another date to view bookings</p>
          </div>
        ) : (
          <div className="space-y-4">
            {slotsWithBookings.map(({ slot, bookings }) => {
              const availability = getAvailabilityColor(bookings.length, slot.capacity);
              
              return (
                <div key={slot.id} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                  {/* Slot Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-white/60" />
                      <span className="text-sm font-bold text-white">{slot.time}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      slot.type === "Open Swim" ? "bg-primary/10 text-primary" :
                      slot.type === "Coaching" ? "bg-orange-500/10 text-orange-500" :
                      slot.type === "Ladies Only" ? "bg-pink-500/10 text-pink-500" :
                      "bg-cyan/10 text-cyan"
                    }`}>
                      {slot.type}
                    </span>
                  </div>

                  {/* Capacity Indicator */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/60 font-medium">{bookings.length}/{slot.capacity} booked</span>
                    <span className={`font-bold ${availability.text}`}>{availability.status}</span>
                  </div>

                  {/* Bookings List */}
                  <div className="space-y-2">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/10">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                            {booking.customerName.charAt(0)}
                          </div>
                          <span className="text-xs font-medium text-white">{booking.customerName}</span>
                        </div>
                        <button
                          onClick={() => handleCancelBooking(booking)}
                          className="p-1 rounded hover:bg-destructive/10 text-destructive transition-colors"
                          title="Cancel booking"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl font-bold text-white">Calendar & Scheduling</h1>
            <p className="text-sm text-white/60 mt-1 font-medium">Manage slots and view bookings</p>
          </div>
          
          {/* View Mode Switcher */}
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-xl bg-white/10 border border-white/10 p-1">
              {(["daily", "weekly", "monthly"] as ViewMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all capitalize ${
                    viewMode === mode
                      ? "bg-amber-500 text-navy shadow-lg shadow-amber-500/20"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          {/* Date Navigation */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateDate("prev")}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-colors"
            >
              <ChevronLeft size={16} className="text-white" />
            </button>
            <div className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 min-w-[200px] text-center">
              <span className="text-sm font-bold text-white">{getDateRangeDisplay()}</span>
            </div>
            <button
              onClick={() => navigateDate("next")}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-colors"
            >
              <ChevronRight size={16} className="text-white" />
            </button>
            <button
              onClick={goToToday}
              className="px-4 py-2 rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors text-xs font-bold"
            >
              Today
            </button>
          </div>

          {/* Centre Selector */}
          <Select value={selectedCentre} onValueChange={setSelectedCentre}>
            <SelectTrigger className="w-full sm:w-[200px] rounded-xl border-white/10 bg-white/10 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {centres.map((centre) => (
                <SelectItem key={centre.id} value={centre.id}>
                  {centre.name.split("—")[1]?.trim() || centre.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Cards (for daily/weekly views) */}
      {(viewMode === "daily" || viewMode === "weekly") && (
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="card-premium">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-white/60 uppercase tracking-wider">Total Bookings</p>
              <CalendarIcon size={16} className="text-primary" />
            </div>
            <p className="text-2xl font-bold text-primary">{totalBooked}</p>
            <p className="text-xs text-white/40 mt-1 font-medium">{formatDisplayDate(selectedDate)}</p>
          </div>
          
          <div className="card-premium">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-white/60 uppercase tracking-wider">Available Slots</p>
              <CheckCircle2 size={16} className="text-primary" />
            </div>
            <p className="text-2xl font-bold text-white">{slots.length}</p>
            <p className="text-xs text-white/40 mt-1 font-medium">Time slots configured</p>
          </div>
          
          <div className="card-premium">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-white/60 uppercase tracking-wider">Occupancy Rate</p>
              <Users size={16} className="text-primary" />
            </div>
            <p className="text-2xl font-bold text-white">{occupancyRate}%</p>
            <p className="text-xs text-white/40 mt-1 font-medium">{totalBooked}/{totalCapacity} capacity</p>
          </div>
        </div>
      )}

      {/* Two-Panel Layout: Main Content + Side Panel */}
      <div className="flex gap-6">
        {/* Main Content Area */}
        <div className="flex-1 space-y-6">
          {/* Calendar Widget (visible in all views) */}
          <CalendarWidget />

          {/* View-Specific Content */}
          <div>
            {viewMode === "daily" && <DailyView />}
            {viewMode === "weekly" && <WeeklyView />}
            {viewMode === "monthly" && <MonthlyView />}
          </div>
        </div>

        {/* Side Panel (shows when date is clicked) */}
        <SidePanel />
      </div>

      {/* Cancel Booking Dialog */}
      <Dialog open={cancelDialog.open} onOpenChange={(open) => setCancelDialog({ open, booking: null })}>
        <DialogContent className="sm:max-w-[425px] bg-[#1a1a1a] border-white/10">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-white">Cancel Booking</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-white/80">
              Are you sure you want to cancel the booking for{" "}
              <span className="font-bold">{cancelDialog.booking?.customerName}</span>?
            </p>
            <p className="text-xs text-white/60 mt-2">
              This action cannot be undone and the customer will be notified.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setCancelDialog({ open: false, booking: null })}
              className="rounded-xl"
            >
              Keep Booking
            </Button>
            <Button
              onClick={confirmCancelBooking}
              className="rounded-xl bg-destructive text-white hover:bg-destructive/90"
            >
              Cancel Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
