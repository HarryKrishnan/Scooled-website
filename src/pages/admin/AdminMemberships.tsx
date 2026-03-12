import { customerMembershipSubscriptions, membershipPlans, notificationHistory, getExpiryStatus } from "@/data/mockData";
import { Search, Bell, MessageSquare, Crown, Calendar, AlertTriangle, TrendingUp, Users, CheckCircle2, Clock, XCircle, ChevronDown, Send, Smartphone, X } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";

type CustomerSubscription = {
  id: string;
  customerId: string;
  customerName: string;
  membershipPlanId: string;
  planName: string;
  startDate: string;
  expiryDate: string;
  status: string;
  autoRenew: boolean;
  phone: string;
  email: string;
};

type NotificationType = "Expiration Warning" | "Renewal Reminder" | "Premium Upgrade Offer" | "Custom Message";

const notificationTemplates: Record<NotificationType, string> = {
  "Expiration Warning": "Hi {customerName}, your {planName} membership expires on {expiryDate}. Renew now to continue enjoying unlimited pool access!",
  "Renewal Reminder": "Hi {customerName}, this is a friendly reminder that your {planName} membership is expiring in {daysRemaining} days. Renew today!",
  "Premium Upgrade Offer": "Hi {customerName}, upgrade from {planName} to a premium plan and save up to 30%! Limited time offer. Contact us to learn more.",
  "Custom Message": "",
};

export default function AdminMemberships() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [notificationDialogOpen, setNotificationDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerSubscription | null>(null);
  const [notificationType, setNotificationType] = useState<NotificationType>("Expiration Warning");
  const [customMessage, setCustomMessage] = useState("");
  const [bulkMode, setBulkMode] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState<string | null>(null);

  // Notification Settings
  const [autoNotify7Days, setAutoNotify7Days] = useState(true);
  const [autoNotify1Day, setAutoNotify1Day] = useState(true);
  const [autoNotifyExpiry, setAutoNotifyExpiry] = useState(false);

  // Filter subscriptions based on active tab
  const getFilteredSubscriptions = () => {
    let filtered = customerMembershipSubscriptions;

    if (activeTab !== "All") {
      if (activeTab === "Expiring Soon") {
        filtered = filtered.filter((sub) => {
          const { daysRemaining } = getExpiryStatus(sub.expiryDate);
          return daysRemaining >= 0 && daysRemaining <= 7;
        });
      } else {
        filtered = filtered.filter((sub) => sub.planName === activeTab);
      }
    }

    if (search) {
      filtered = filtered.filter((sub) => sub.customerName.toLowerCase().includes(search.toLowerCase()));
    }

    return filtered;
  };

  const filteredSubscriptions = getFilteredSubscriptions();

  // Calculate stats
  const activeCount = customerMembershipSubscriptions.filter((sub) => {
    const { daysRemaining } = getExpiryStatus(sub.expiryDate);
    return daysRemaining >= 0;
  }).length;

  const expiringThisWeek = customerMembershipSubscriptions.filter((sub) => {
    const { daysRemaining } = getExpiryStatus(sub.expiryDate);
    return daysRemaining >= 0 && daysRemaining <= 7;
  }).length;

  const expiringThisMonth = customerMembershipSubscriptions.filter((sub) => {
    const { daysRemaining } = getExpiryStatus(sub.expiryDate);
    return daysRemaining >= 0 && daysRemaining <= 30;
  }).length;

  const expiredCount = customerMembershipSubscriptions.filter((sub) => {
    const { daysRemaining } = getExpiryStatus(sub.expiryDate);
    return daysRemaining < 0;
  }).length;

  // Handle notification
  const handleSendNotification = (customer: CustomerSubscription) => {
    setSelectedCustomer(customer);
    setNotificationType("Expiration Warning");
    setCustomMessage("");
    setNotificationDialogOpen(true);
  };

  const getNotificationMessage = () => {
    if (notificationType === "Custom Message") {
      return customMessage;
    }
    
    if (!selectedCustomer) return "";
    
    const { daysRemaining } = getExpiryStatus(selectedCustomer.expiryDate);
    const template = notificationTemplates[notificationType];
    
    return template
      .replace("{customerName}", selectedCustomer.customerName)
      .replace("{planName}", selectedCustomer.planName)
      .replace("{expiryDate}", selectedCustomer.expiryDate)
      .replace("{daysRemaining}", Math.max(0, daysRemaining).toString());
  };

  const sendAlert = () => {
    toast({
      title: "Alert Sent!",
      description: `Notification sent to ${selectedCustomer?.customerName}`,
    });
    setNotificationDialogOpen(false);
  };

  const sendWhatsApp = () => {
    toast({
      title: "WhatsApp Message Queued!",
      description: `Message will be sent to ${selectedCustomer?.phone}`,
    });
    setNotificationDialogOpen(false);
  };

  const sendBulkNotification = () => {
    if (selectedCustomers.length === 0) {
      toast({
        title: "No customers selected",
        description: "Please select at least one customer",
        variant: "destructive",
      });
      return;
    }

    if (selectedCustomers.length > 50) {
      toast({
        title: "Too many customers",
        description: "Maximum 50 customers per batch",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Bulk Notification Sent!",
      description: `Notifications sent to ${selectedCustomers.length} customers`,
    });
    setSelectedCustomers([]);
    setBulkMode(false);
  };

  const toggleCustomerSelection = (customerId: string) => {
    setSelectedCustomers((prev) =>
      prev.includes(customerId) ? prev.filter((id) => id !== customerId) : [...prev, customerId]
    );
  };

  const getCustomerNotifications = (customerId: string) => {
    return notificationHistory.filter((n) => n.customerId === customerId);
  };

  const tabs = ["All", "Expiring Soon", ...membershipPlans.map((p) => p.name)];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="font-display text-3xl font-bold text-white">Membership Management</h1>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-2.5 text-white/60" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search customers..."
              className="pl-10 pr-4 py-2 rounded-xl border border-white/10 bg-white/10 backdrop-blur-sm text-sm w-64 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-white placeholder:text-white/40"
            />
          </div>
          <button
            onClick={() => setBulkMode(!bulkMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors text-sm font-bold ${
              bulkMode
                ? "bg-amber-500 text-navy hover:bg-amber-600"
                : "bg-white/10 text-white border border-white/10 hover:bg-white/20"
            }`}
          >
            <Bell size={16} />
            {bulkMode ? "Cancel Bulk" : "Bulk Notify"}
          </button>
          {bulkMode && selectedCustomers.length > 0 && (
            <button
              onClick={sendBulkNotification}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors text-sm font-bold"
            >
              <Send size={16} />
              Send ({selectedCustomers.length})
            </button>
          )}
        </div>
      </div>

      {/* Notification Settings Card */}
      <div className="card-premium bg-gradient-to-br from-primary/5 to-gold/5 border-primary/20">
        <div className="flex items-center gap-2 mb-3">
          <Bell className="text-primary" size={20} />
          <h3 className="font-semibold text-white">Notification Settings</h3>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="auto7" className="text-xs text-white/70">Auto-notify 7 days before expiry</Label>
            <Switch id="auto7" checked={autoNotify7Days} onCheckedChange={setAutoNotify7Days} />
          </div>
          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="auto1" className="text-xs text-white/70">Auto-notify 1 day before expiry</Label>
            <Switch id="auto1" checked={autoNotify1Day} onCheckedChange={setAutoNotify1Day} />
          </div>
          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="autoExp" className="text-xs text-white/70">Auto-notify on expiry day</Label>
            <Switch id="autoExp" checked={autoNotifyExpiry} onCheckedChange={setAutoNotifyExpiry} />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-premium flex items-center gap-3 hover:-translate-y-1 transition-all duration-300">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-primary bg-primary/10">
            <Users size={18} />
          </div>
          <div>
            <p className="text-xl font-bold text-white">{activeCount}</p>
            <p className="text-xs text-white/60">Active Members</p>
          </div>
        </div>

        <div className="card-premium flex items-center gap-3 hover:-translate-y-1 transition-all duration-300">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-destructive bg-destructive/10">
            <AlertTriangle size={18} />
          </div>
          <div>
            <p className="text-xl font-bold text-white">{expiringThisWeek}</p>
            <p className="text-xs text-white/60">Expiring This Week</p>
          </div>
        </div>

        <div className="card-premium flex items-center gap-3 hover:-translate-y-1 transition-all duration-300">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-gold bg-gold/10">
            <Clock size={18} />
          </div>
          <div>
            <p className="text-xl font-bold text-white">{expiringThisMonth}</p>
            <p className="text-xs text-white/60">Expiring This Month</p>
          </div>
        </div>

        <div className="card-premium flex items-center gap-3 hover:-translate-y-1 transition-all duration-300">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground bg-muted">
            <XCircle size={18} />
          </div>
          <div>
            <p className="text-xl font-bold text-white">{expiredCount}</p>
            <p className="text-xs text-white/60">Expired Members</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab
                ? "bg-amber-500 text-navy shadow-lg shadow-amber-500/20"
                : "bg-white/10 text-white/60 hover:bg-white/20 border border-white/10"
            }`}
          >
            {tab}
            {tab !== "All" && tab !== "Expiring Soon" && (
              <span className="ml-2 text-xs opacity-70">
                ({customerMembershipSubscriptions.filter((s) => s.planName === tab).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Customer Cards */}
      <div className="space-y-3">
        {filteredSubscriptions.length === 0 ? (
          <div className="card-premium text-center py-12">
            <Users className="mx-auto text-white/20 mb-3" size={48} />
            <p className="text-white/60">No customers found in this category</p>
          </div>
        ) : (
          filteredSubscriptions.map((sub) => {
            const expiryInfo = getExpiryStatus(sub.expiryDate);
            const customerNotifications = getCustomerNotifications(sub.customerId);
            const isExpanded = showHistory === sub.id;

            return (
              <div key={sub.id} className="card-premium hover:shadow-lg transition-shadow">
                <div className="flex flex-col gap-3">
                  {/* Main Customer Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    {bulkMode && (
                      <input
                        type="checkbox"
                        checked={selectedCustomers.includes(sub.customerId)}
                        onChange={() => toggleCustomerSelection(sub.customerId)}
                        className="w-4 h-4 accent-primary"
                      />
                    )}
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <Crown className="text-gold" size={14} />
                        <span className="font-semibold text-white">{sub.customerName}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${expiryInfo.color}`}>
                          {expiryInfo.status}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-primary/10 text-primary">
                          {sub.planName}
                        </span>
                        {sub.autoRenew && (
                          <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-gold/10 text-gold">
                            Auto-Renew
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-white/60 space-y-1">
                        <p className="flex items-center gap-2 flex-wrap">
                          <span>{sub.email}</span> • <span>{sub.phone}</span>
                        </p>
                        <p className="flex items-center gap-2 flex-wrap">
                          <Calendar size={12} />
                          <span>Started: {sub.startDate}</span> • 
                          <span>Expires: {sub.expiryDate}</span>
                          {expiryInfo.daysRemaining >= 0 && (
                            <span className="font-semibold">
                              ({expiryInfo.daysRemaining} days remaining)
                            </span>
                          )}
                          {expiryInfo.daysRemaining < 0 && (
                            <span className="font-semibold text-destructive">
                              (Expired {Math.abs(expiryInfo.daysRemaining)} days ago)
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={() => handleSendNotification(sub)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-xs font-medium"
                      >
                        <Bell size={14} />
                        Notify
                      </button>
                      <button
                        onClick={() => setShowHistory(isExpanded ? null : sub.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-xs font-medium text-white hover:bg-white/10 transition-colors"
                      >
                        <MessageSquare size={14} />
                        History ({customerNotifications.length})
                        <ChevronDown size={12} className={`transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                      </button>
                    </div>
                  </div>

                  {/* Notification History (Collapsible) */}
                  {isExpanded && customerNotifications.length > 0 && (
                    <div className="border-t border-white/5 pt-3 mt-2">
                      <p className="text-xs font-semibold text-white/70 mb-2">Notification History</p>
                      <div className="space-y-2">
                        {customerNotifications.map((notif) => (
                          <div key={notif.id} className="flex items-start gap-2 text-xs bg-white/10 p-2 rounded-lg">
                            <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              notif.channel === "WhatsApp" ? "bg-green-500/10 text-green-600" : "bg-primary/10 text-primary"
                            }`}>
                              {notif.channel === "WhatsApp" ? <Smartphone size={12} /> : <Bell size={12} />}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-white">{notif.type}</p>
                              <p className="text-white/60 mt-0.5">{notif.message}</p>
                              <p className="text-white/40 text-[10px] mt-1">{notif.sentAt} • {notif.channel}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Notification Dialog */}
      <Dialog open={notificationDialogOpen} onOpenChange={setNotificationDialogOpen}>
        <DialogContent className="sm:max-w-[600px] bg-[#1a1a1a] border-white/10">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-white">
              <Bell className="text-primary" size={20} />
              Send Notification
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Recipient Info */}
            <div className="card-premium bg-primary/5 border-primary/20">
              <p className="text-xs text-white/60 mb-1">Recipient</p>
              <p className="font-semibold text-white">{selectedCustomer?.customerName}</p>
              <p className="text-xs text-white/60 mt-1">{selectedCustomer?.email} • {selectedCustomer?.phone}</p>
              <p className="text-xs text-white/60 mt-1">
                Plan: <span className="font-medium">{selectedCustomer?.planName}</span> • 
                Expires: <span className="font-medium">{selectedCustomer?.expiryDate}</span>
              </p>
            </div>

            {/* Notification Type Selector */}
            <div>
              <Label htmlFor="notifType" className="text-sm font-medium text-white">Notification Type</Label>
              <Select value={notificationType} onValueChange={(v) => setNotificationType(v as NotificationType)}>
                <SelectTrigger id="notifType" className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Expiration Warning">Expiration Warning</SelectItem>
                  <SelectItem value="Renewal Reminder">Renewal Reminder</SelectItem>
                  <SelectItem value="Premium Upgrade Offer">Premium Upgrade Offer</SelectItem>
                  <SelectItem value="Custom Message">Custom Message</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Custom Message Input */}
            {notificationType === "Custom Message" && (
              <div>
                <Label htmlFor="customMsg" className="text-sm font-medium text-white">Custom Message</Label>
                <Textarea
                  id="customMsg"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Type your custom message here..."
                  className="mt-1 min-h-[100px]"
                />
              </div>
            )}

            {/* Message Preview */}
            <div>
              <Label className="text-sm font-medium text-white">Message Preview</Label>
              <div className="mt-1 p-4 rounded-lg bg-white/10 border border-white/10 text-sm text-white">
                {getNotificationMessage() || <span className="text-white/40 italic">Message preview will appear here...</span>}
              </div>
            </div>

            {/* WhatsApp Preview */}
            <div className="card-premium bg-green-500/10 border-green-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Smartphone className="text-green-400" size={16} />
                <p className="text-xs font-semibold text-green-400">WhatsApp Message Format</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3 text-xs text-white whitespace-pre-wrap">
                {getNotificationMessage()}
              </div>
              <p className="text-[10px] text-green-400 mt-2">
                Message will be sent to: <span className="font-medium">{selectedCustomer?.phone}</span>
              </p>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setNotificationDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="outline" onClick={sendAlert} className="gap-2">
              <Bell size={14} />
              Send Alert
            </Button>
            <Button onClick={sendWhatsApp} className="gap-2 bg-green-600 hover:bg-green-700">
              <Smartphone size={14} />
              Send via WhatsApp
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
