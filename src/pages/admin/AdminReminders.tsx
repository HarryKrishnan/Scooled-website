import { useState } from "react";
import { customers, coaches, reminderHistory } from "@/data/mockData";
import { Send, Users, UserPlus, Search, ChevronDown, ChevronUp, Bell, MessageSquare, Megaphone, Calendar, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

type ReminderType = "reminder" | "message" | "announcement";
type RecipientType = "all-users" | "all-coaches" | "both" | "custom";

type ReminderHistory = {
  id: string;
  recipientType: "user" | "coach" | "both";
  recipientIds: string[];
  recipientNames: string[];
  type: ReminderType;
  subject: string;
  message: string;
  sentAt: string;
  sentBy: string;
  status: string;
};

export default function AdminReminders() {
  const { toast } = useToast();
  
  // Compose Form State
  const [reminderType, setReminderType] = useState<ReminderType>("reminder");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [recipientType, setRecipientType] = useState<RecipientType>("all-users");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  
  // Recipient Selection State
  const [activeTab, setActiveTab] = useState<"users" | "coaches">("users");
  const [userSearch, setUserSearch] = useState("");
  const [coachSearch, setCoachSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedCoaches, setSelectedCoaches] = useState<string[]>([]);
  
  // History State
  const [history, setHistory] = useState<ReminderHistory[]>(reminderHistory);
  const [expandedHistory, setExpandedHistory] = useState<string | null>(null);
  const [historyTypeFilter, setHistoryTypeFilter] = useState<"all" | ReminderType>("all");
  const [historyRecipientFilter, setHistoryRecipientFilter] = useState<"all" | "user" | "coach" | "both">("all");
  
  // Filtered Recipients
  const filteredUsers = customers.filter(c => 
    c.name.toLowerCase().includes(userSearch.toLowerCase()) || 
    c.email.toLowerCase().includes(userSearch.toLowerCase())
  );
  
  const filteredCoaches = coaches.filter(c => 
    c.name.toLowerCase().includes(coachSearch.toLowerCase()) || 
    (c as any).email?.toLowerCase().includes(coachSearch.toLowerCase())
  );
  
  // Filtered History
  const filteredHistory = history.filter(h => {
    const typeMatch = historyTypeFilter === "all" || h.type === historyTypeFilter;
    const recipientMatch = historyRecipientFilter === "all" || h.recipientType === historyRecipientFilter;
    return typeMatch && recipientMatch;
  });
  
  // Calculate recipient count
  const getRecipientCount = () => {
    if (recipientType === "all-users") return customers.length;
    if (recipientType === "all-coaches") return coaches.length;
    if (recipientType === "both") return customers.length + coaches.length;
    return selectedUsers.length + selectedCoaches.length;
  };
  
  // Get recipient names for confirmation
  const getRecipientNames = () => {
    if (recipientType === "all-users") return "All Users";
    if (recipientType === "all-coaches") return "All Coaches";
    if (recipientType === "both") return "All Users and Coaches";
    const userNames = customers.filter(c => selectedUsers.includes(c.id)).map(c => c.name);
    const coachNames = coaches.filter(c => selectedCoaches.includes(c.id)).map(c => c.name);
    return [...userNames, ...coachNames].join(", ");
  };
  
  // Handle send
  const handleSendClick = () => {
    if (!subject.trim() || !message.trim()) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in both subject and message fields.",
        variant: "destructive",
      });
      return;
    }
    
    if (recipientType === "custom" && selectedUsers.length === 0 && selectedCoaches.length === 0) {
      toast({
        title: "No Recipients Selected",
        description: "Please select at least one recipient.",
        variant: "destructive",
      });
      return;
    }
    
    setConfirmDialogOpen(true);
  };
  
  const handleConfirmSend = () => {
    const recipientIds: string[] = [];
    const recipientNames: string[] = [];
    let historyRecipientType: "user" | "coach" | "both";
    
    if (recipientType === "all-users") {
      recipientIds.push(...customers.map(c => c.id));
      recipientNames.push(...customers.map(c => c.name));
      historyRecipientType = "user";
    } else if (recipientType === "all-coaches") {
      recipientIds.push(...coaches.map(c => c.id));
      recipientNames.push(...coaches.map(c => c.name));
      historyRecipientType = "coach";
    } else if (recipientType === "both") {
      recipientIds.push(...customers.map(c => c.id), ...coaches.map(c => c.id));
      recipientNames.push(...customers.map(c => c.name), ...coaches.map(c => c.name));
      historyRecipientType = "both";
    } else {
      recipientIds.push(...selectedUsers, ...selectedCoaches);
      const userNames = customers.filter(c => selectedUsers.includes(c.id)).map(c => c.name);
      const coachNames = coaches.filter(c => selectedCoaches.includes(c.id)).map(c => c.name);
      recipientNames.push(...userNames, ...coachNames);
      historyRecipientType = selectedUsers.length > 0 && selectedCoaches.length > 0 ? "both" : 
                             selectedUsers.length > 0 ? "user" : "coach";
    }
    
    const newReminder: ReminderHistory = {
      id: `rh${Date.now()}`,
      recipientType: historyRecipientType,
      recipientIds,
      recipientNames,
      type: reminderType,
      subject,
      message,
      sentAt: new Date().toLocaleString("en-IN", { 
        year: "numeric", 
        month: "2-digit", 
        day: "2-digit", 
        hour: "2-digit", 
        minute: "2-digit",
        hour12: true 
      }),
      sentBy: "Admin",
      status: "Sent",
    };
    
    setHistory([newReminder, ...history]);
    
    toast({
      title: "Reminder Sent Successfully!",
      description: `Sent to ${recipientIds.length} recipient${recipientIds.length > 1 ? 's' : ''}`,
    });
    
    // Reset form
    setSubject("");
    setMessage("");
    setSelectedUsers([]);
    setSelectedCoaches([]);
    setConfirmDialogOpen(false);
  };
  
  // Selection handlers
  const toggleUserSelection = (id: string) => {
    setSelectedUsers(prev => 
      prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]
    );
  };
  
  const toggleCoachSelection = (id: string) => {
    setSelectedCoaches(prev => 
      prev.includes(id) ? prev.filter(coachId => coachId !== id) : [...prev, id]
    );
  };
  
  const selectAllUsers = () => {
    setSelectedUsers(filteredUsers.map(u => u.id));
  };
  
  const deselectAllUsers = () => {
    setSelectedUsers([]);
  };
  
  const selectAllCoaches = () => {
    setSelectedCoaches(filteredCoaches.map(c => c.id));
  };
  
  const deselectAllCoaches = () => {
    setSelectedCoaches([]);
  };
  
  // Get icon for reminder type
  const getTypeIcon = (type: ReminderType) => {
    switch (type) {
      case "reminder": return Bell;
      case "message": return MessageSquare;
      case "announcement": return Megaphone;
    }
  };
  
  const getTypeColor = (type: ReminderType) => {
    switch (type) {
      case "reminder": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "message": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "announcement": return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    }
  };
  
  const getRecipientBadgeColor = (recipientType: "user" | "coach" | "both") => {
    switch (recipientType) {
      case "user": return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
      case "coach": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "both": return "bg-pink-500/20 text-pink-400 border-pink-500/30";
    }
  };
  
  // Stats calculations
  const totalReminders = history.length;
  const totalUsersReached = new Set(history.flatMap(h => h.recipientType === "user" || h.recipientType === "both" ? h.recipientIds.filter(id => id.startsWith("cu")) : [])).size;
  const totalCoachesReached = new Set(history.flatMap(h => h.recipientType === "coach" || h.recipientType === "both" ? h.recipientIds.filter(id => id.startsWith("co")) : [])).size;
  const remindersThisMonth = history.filter(h => h.sentAt.includes("2026-03")).length;
  
  const charLimit = reminderType === "reminder" ? 500 : 1000;
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-bold text-white">Reminders</h1>
          <p className="text-white/60 text-sm mt-1">Send bulk notifications to users and coaches</p>
        </div>
      </div>
      
      {/* Compose Section */}
      <div className="card-premium p-6 space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Send size={20} className="text-amber-500" />
          Compose Reminder
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-white/80">Reminder Type</Label>
            <Select value={reminderType} onValueChange={(v) => setReminderType(v as ReminderType)}>
              <SelectTrigger className="rounded-xl border-white/10 bg-white/10 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black/95 border-white/10 text-white">
                <SelectItem value="reminder">
                  <div className="flex items-center gap-2">
                    <Bell size={14} />
                    Reminder
                  </div>
                </SelectItem>
                <SelectItem value="message">
                  <div className="flex items-center gap-2">
                    <MessageSquare size={14} />
                    Message
                  </div>
                </SelectItem>
                <SelectItem value="announcement">
                  <div className="flex items-center gap-2">
                    <Megaphone size={14} />
                    Announcement
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label className="text-white/80">Send To</Label>
            <Select value={recipientType} onValueChange={(v) => setRecipientType(v as RecipientType)}>
              <SelectTrigger className="rounded-xl border-white/10 bg-white/10 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black/95 border-white/10 text-white">
                <SelectItem value="all-users">
                  <div className="flex items-center gap-2">
                    <Users size={14} />
                    All Users ({customers.length})
                  </div>
                </SelectItem>
                <SelectItem value="all-coaches">
                  <div className="flex items-center gap-2">
                    <UserPlus size={14} />
                    All Coaches ({coaches.length})
                  </div>
                </SelectItem>
                <SelectItem value="both">
                  <div className="flex items-center gap-2">
                    <Users size={14} />
                    Both Users & Coaches ({customers.length + coaches.length})
                  </div>
                </SelectItem>
                <SelectItem value="custom">
                  <div className="flex items-center gap-2">
                    <Check size={14} />
                    Custom Selection
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-white/80">Subject</Label>
          <Input 
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter subject line..."
            className="rounded-xl border-white/10 bg-white/10 text-white placeholder:text-white/40"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-white/80">Message</Label>
            <span className={`text-xs ${message.length > charLimit ? 'text-red-400' : 'text-white/40'}`}>
              {message.length} / {charLimit}
            </span>
          </div>
          <Textarea 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            rows={5}
            maxLength={charLimit}
            className="rounded-xl border-white/10 bg-white/10 text-white placeholder:text-white/40 resize-none"
          />
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <div className="text-sm text-white/60">
            {recipientType === "custom" ? (
              <span>Selected: <span className="font-semibold text-white">{selectedUsers.length + selectedCoaches.length}</span> recipients</span>
            ) : (
              <span>Will send to: <span className="font-semibold text-white">{getRecipientCount()}</span> recipients</span>
            )}
          </div>
          <Button
            onClick={handleSendClick}
            disabled={!subject.trim() || !message.trim() || message.length > charLimit}
            className="rounded-xl bg-amber-500 text-navy hover:bg-amber-600 font-bold shadow-lg shadow-amber-500/20"
          >
            <Send size={16} className="mr-2" />
            Send Reminder
          </Button>
        </div>
      </div>
      
      {/* Recipient Selection (only shown for custom) */}
      {recipientType === "custom" && (
        <div className="card-premium p-6 space-y-4">
          <h2 className="text-xl font-bold text-white">Select Recipients</h2>
          
          {/* Tabs */}
          <div className="flex gap-2 border-b border-white/10">
            <button
              onClick={() => setActiveTab("users")}
              className={`px-4 py-2 font-semibold transition-all ${
                activeTab === "users" 
                  ? "text-amber-500 border-b-2 border-amber-500" 
                  : "text-white/60 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2">
                <Users size={16} />
                Users {selectedUsers.length > 0 && `(${selectedUsers.length})`}
              </div>
            </button>
            <button
              onClick={() => setActiveTab("coaches")}
              className={`px-4 py-2 font-semibold transition-all ${
                activeTab === "coaches" 
                  ? "text-amber-500 border-b-2 border-amber-500" 
                  : "text-white/60 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2">
                <UserPlus size={16} />
                Coaches {selectedCoaches.length > 0 && `(${selectedCoaches.length})`}
              </div>
            </button>
          </div>
          
          {/* Users Tab */}
          {activeTab === "users" && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 justify-between">
                <div className="relative flex-1">
                  <Search size={16} className="absolute left-3 top-2.5 text-white/60" />
                  <input 
                    value={userSearch} 
                    onChange={(e) => setUserSearch(e.target.value)} 
                    placeholder="Search users..." 
                    className="pl-10 pr-4 py-2 rounded-xl border border-white/10 bg-white/10 backdrop-blur-sm text-sm w-full focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-white placeholder:text-white/40" 
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={selectAllUsers}
                    className="text-xs px-3 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors font-medium"
                  >
                    Select All
                  </button>
                  <button
                    onClick={deselectAllUsers}
                    className="text-xs px-3 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors font-medium"
                  >
                    Deselect All
                  </button>
                </div>
              </div>
              
              <div className="max-h-[300px] overflow-y-auto space-y-2">
                {filteredUsers.map(user => (
                  <div 
                    key={user.id}
                    onClick={() => toggleUserSelection(user.id)}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                      selectedUsers.includes(user.id) 
                        ? "bg-amber-500/20 border border-amber-500/30" 
                        : "bg-white/5 border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => {}}
                      className="w-4 h-4 rounded border-white/20 text-amber-500 focus:ring-amber-500/20"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-white">{user.name}</div>
                      <div className="text-xs text-white/60 flex items-center gap-3">
                        <span>{user.email}</span>
                        <span>•</span>
                        <span>{user.phone}</span>
                        <span>•</span>
                        <span className="text-amber-400">{user.membership}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Coaches Tab */}
          {activeTab === "coaches" && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 justify-between">
                <div className="relative flex-1">
                  <Search size={16} className="absolute left-3 top-2.5 text-white/60" />
                  <input 
                    value={coachSearch} 
                    onChange={(e) => setCoachSearch(e.target.value)} 
                    placeholder="Search coaches..." 
                    className="pl-10 pr-4 py-2 rounded-xl border border-white/10 bg-white/10 backdrop-blur-sm text-sm w-full focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-white placeholder:text-white/40" 
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={selectAllCoaches}
                    className="text-xs px-3 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors font-medium"
                  >
                    Select All
                  </button>
                  <button
                    onClick={deselectAllCoaches}
                    className="text-xs px-3 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors font-medium"
                  >
                    Deselect All
                  </button>
                </div>
              </div>
              
              <div className="max-h-[300px] overflow-y-auto space-y-2">
                {filteredCoaches.map(coach => (
                  <div 
                    key={coach.id}
                    onClick={() => toggleCoachSelection(coach.id)}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                      selectedCoaches.includes(coach.id) 
                        ? "bg-amber-500/20 border border-amber-500/30" 
                        : "bg-white/5 border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedCoaches.includes(coach.id)}
                      onChange={() => {}}
                      className="w-4 h-4 rounded border-white/20 text-amber-500 focus:ring-amber-500/20"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-white">{coach.name}</div>
                      <div className="text-xs text-white/60 flex items-center gap-3">
                        {(coach as any).email && <span>{(coach as any).email}</span>}
                        {(coach as any).phone && (
                          <>
                            {(coach as any).email && <span>•</span>}
                            <span>{(coach as any).phone}</span>
                          </>
                        )}
                        {coach.specialization && (
                          <>
                            <span>•</span>
                            <span className="text-purple-400">{coach.specialization}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* History Section */}
      <div className="card-premium p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Calendar size={20} className="text-amber-500" />
            Reminder History
          </h2>
          
          <div className="flex gap-2">
            <Select value={historyTypeFilter} onValueChange={(v) => setHistoryTypeFilter(v as "all" | ReminderType)}>
              <SelectTrigger className="w-[150px] rounded-xl border-white/10 bg-white/10 text-white text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black/95 border-white/10 text-white">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="reminder">Reminders</SelectItem>
                <SelectItem value="message">Messages</SelectItem>
                <SelectItem value="announcement">Announcements</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={historyRecipientFilter} onValueChange={(v) => setHistoryRecipientFilter(v as "all" | "user" | "coach" | "both")}>
              <SelectTrigger className="w-[150px] rounded-xl border-white/10 bg-white/10 text-white text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black/95 border-white/10 text-white">
                <SelectItem value="all">All Recipients</SelectItem>
                <SelectItem value="user">Users Only</SelectItem>
                <SelectItem value="coach">Coaches Only</SelectItem>
                <SelectItem value="both">Both</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-3 max-h-[500px] overflow-y-auto">
          {filteredHistory.length === 0 ? (
            <div className="text-center py-12 text-white/60">
              <Bell size={48} className="mx-auto mb-3 opacity-20" />
              <p>No reminders found matching the filters</p>
            </div>
          ) : (
            filteredHistory.map(item => {
              const TypeIcon = getTypeIcon(item.type);
              const isExpanded = expandedHistory === item.id;
              
              return (
                <div key={item.id} className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full border font-semibold ${getTypeColor(item.type)}`}>
                          <TypeIcon size={12} />
                          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                        </span>
                        <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full border font-semibold ${getRecipientBadgeColor(item.recipientType)}`}>
                          {item.recipientType === "user" && <Users size={12} />}
                          {item.recipientType === "coach" && <UserPlus size={12} />}
                          {item.recipientType === "both" && <Users size={12} />}
                          {item.recipientType === "user" ? "Users" : item.recipientType === "coach" ? "Coaches" : "Both"}
                        </span>
                        <span className="text-xs text-white/40">{item.sentAt}</span>
                      </div>
                      
                      <h3 className="font-semibold text-white mb-1">{item.subject}</h3>
                      
                      <p className="text-sm text-white/70 line-clamp-2 mb-2">
                        {item.message}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs text-white/60">
                        <span>Sent by: {item.sentBy}</span>
                        <span>•</span>
                        <span>Recipients: {item.recipientIds.length}</span>
                        <span>•</span>
                        <span className="text-green-400">{item.status}</span>
                      </div>
                      
                      {isExpanded && (
                        <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
                          <div>
                            <p className="text-xs text-white/60 mb-1">Full Message:</p>
                            <p className="text-sm text-white/80">{item.message}</p>
                          </div>
                          <div>
                            <p className="text-xs text-white/60 mb-1">Recipients ({item.recipientNames.length}):</p>
                            <div className="flex flex-wrap gap-1">
                              {item.recipientNames.map((name, idx) => (
                                <span key={idx} className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70">
                                  {name}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <button
                      onClick={() => setExpandedHistory(isExpanded ? null : item.id)}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      
      {/* Statistics Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-premium text-center hover:border-amber-500/50 hover:-translate-y-2 transition-all duration-500">
          <p className="text-3xl font-bold text-white">{totalReminders}</p>
          <p className="text-xs text-white/60 mt-1">Total Reminders Sent</p>
        </div>
        
        <div className="card-premium text-center hover:border-cyan-500/50 hover:-translate-y-2 transition-all duration-500">
          <p className="text-3xl font-bold text-white">{totalUsersReached}</p>
          <p className="text-xs text-cyan-400 mt-1">Total Users Reached</p>
        </div>
        
        <div className="card-premium text-center hover:border-purple-500/50 hover:-translate-y-2 transition-all duration-500">
          <p className="text-3xl font-bold text-white">{totalCoachesReached}</p>
          <p className="text-xs text-purple-400 mt-1">Total Coaches Reached</p>
        </div>
        
        <div className="card-premium text-center hover:border-green-500/50 hover:-translate-y-2 transition-all duration-500">
          <p className="text-3xl font-bold text-white">{remindersThisMonth}</p>
          <p className="text-xs text-green-400 mt-1">Reminders This Month</p>
        </div>
      </div>
      
      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-black/95 backdrop-blur-xl border-white/10">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-white">Confirm Send Reminder</DialogTitle>
            <DialogDescription className="text-white/60">
              Please review the details before sending this reminder.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <p className="text-xs text-white/60 mb-1">Type:</p>
              <p className="text-sm text-white font-semibold capitalize">{reminderType}</p>
            </div>
            
            <div>
              <p className="text-xs text-white/60 mb-1">Subject:</p>
              <p className="text-sm text-white font-semibold">{subject}</p>
            </div>
            
            <div>
              <p className="text-xs text-white/60 mb-1">Recipients ({getRecipientCount()}):</p>
              <p className="text-sm text-white/80 line-clamp-2">{getRecipientNames()}</p>
            </div>
            
            <div>
              <p className="text-xs text-white/60 mb-1">Message Preview:</p>
              <p className="text-sm text-white/80 line-clamp-3">{message}</p>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmDialogOpen(false)}
              className="rounded-xl border-white/10 bg-white/10 text-white hover:bg-white/20"
            >
              <X size={16} className="mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleConfirmSend}
              className="rounded-xl bg-amber-500 text-navy hover:bg-amber-600 font-bold"
            >
              <Check size={16} className="mr-2" />
              Confirm & Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
