import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, MessageSquare, AlertCircle, Send, CheckCircle2, 
  User, Waves, ShieldAlert, History, ThumbsUp, HelpCircle, ShieldCheck
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const STAR_RATING_LABELS = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Very Good",
  5: "Excellent"
};

const COMPLAINT_CATEGORIES = [
  "Facility Maintenance",
  "Coaching Quality",
  "Safety Concern",
  "Staff Behavior",
  "Scheduling Issue",
  "Other"
];

export default function PortalFeedback() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"feedback" | "complaints">("feedback");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Feedback State
  const [coachRating, setCoachRating] = useState(0);
  const [poolRating, setPoolRating] = useState(0);
  const [poolComment, setPoolComment] = useState("");
  const [hoverRating, setHoverRating] = useState({ type: "", value: 0 });

  // Complaint State
  const [complaintCategory, setComplaintCategory] = useState("");
  const [complaintMessage, setComplaintMessage] = useState("");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Medium");

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (coachRating === 0 || poolRating === 0) {
      toast({
        title: "Incomplete Rating",
        description: "Please provide a star rating for both the coach and the pool.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast({
        title: "Feedback Submitted!",
        description: "Thank you for helping us improve our services.",
      });
    }, 1500);
  };

  const handleSubmitComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintCategory || !complaintMessage) {
      toast({
        title: "Details Missing",
        description: "Please select a category and describe your concern.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast({
        title: "Concern Posted",
        description: "Your complaint has been forwarded to the Management and Head Coach.",
      });
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
          <CheckCircle2 size={40} className="text-emerald-500" />
        </div>
        <h2 className="font-display text-3xl font-bold text-white mb-2">Thank You!</h2>
        <p className="text-white/60 font-medium mb-8">Your submission has been recorded and will be reviewed shortly.</p>
        <button 
          onClick={() => { setSubmitted(false); setCoachRating(0); setPoolRating(0); setPoolComment(""); setComplaintMessage(""); }}
          className="btn-primary"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="card-premium border-blue-tile bg-black/95 mb-8">
        <h1 className="font-display text-3xl font-bold text-white tracking-tight">Feedback & Complaints</h1>
        <p className="text-sm text-white/70 font-bold mt-1">Help us maintain the highest standards of aquatic excellence.</p>
      </div>

      <div className="flex p-1 bg-white/5 rounded-2xl w-fit mb-8 border border-white/5">
        <button
          onClick={() => setActiveTab("feedback")}
          className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === "feedback" ? "bg-amber-500 text-navy shadow-lg" : "text-white/40 hover:text-white"}`}
        >
          Daily Feedback
        </button>
        <button
          onClick={() => setActiveTab("complaints")}
          className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === "complaints" ? "bg-amber-500 text-navy shadow-lg" : "text-white/40 hover:text-white"}`}
        >
          Report Concern
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {activeTab === "feedback" ? (
              <motion.div
                key="feedback"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <form onSubmit={handleSubmitFeedback} className="space-y-6">
                  {/* Coach Rating */}
                  <div className="card-premium border-green-tile space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <User size={20} />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-bold text-white">Rate Your Coach</h3>
                        <p className="text-xs text-white/40 font-bold uppercase tracking-wider">Coach Michael Vance</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-center py-8 bg-white/5 rounded-[2.5rem] border border-white/5">
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <motion.button
                            key={star}
                            type="button"
                            whileHover={{ scale: 1.25, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            onMouseEnter={() => setHoverRating({ type: "coach", value: star })}
                            onMouseLeave={() => setHoverRating({ type: "", value: 0 })}
                            onClick={() => setCoachRating(star)}
                            className="p-1"
                          >
                            <Star 
                              size={44} 
                              className={`transition-all duration-300 ${
                                star <= (hoverRating.type === "coach" ? hoverRating.value : coachRating)
                                ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" 
                                : "text-navy/10"
                              }`} 
                            />
                          </motion.button>
                        ))}
                      </div>
                      <p className="mt-4 text-sm font-black text-amber-500 uppercase tracking-widest h-5">
                        {coachRating > 0 ? (STAR_RATING_LABELS as any)[coachRating] : ""}
                      </p>
                    </div>
                  </div>

                  {/* Pool Rating & Comments */}
                  <div className="card-premium border-gold-tile space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-cyan/10 flex items-center justify-center text-cyan">
                        <Waves size={20} />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-bold text-white">Pool & Facility Experience</h3>
                        <p className="text-xs text-white/40 font-bold uppercase tracking-wider">Main Olympic Pool</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-center py-8 bg-white/5 rounded-[2.5rem] border border-white/5 mb-6">
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <motion.button
                            key={star}
                            type="button"
                            whileHover={{ scale: 1.25, rotate: -5 }}
                            whileTap={{ scale: 0.9 }}
                            onMouseEnter={() => setHoverRating({ type: "pool", value: star })}
                            onMouseLeave={() => setHoverRating({ type: "", value: 0 })}
                            onClick={() => setPoolRating(star)}
                            className="p-1"
                          >
                            <Star 
                              size={44} 
                              className={`transition-all duration-300 ${
                                star <= (hoverRating.type === "pool" ? hoverRating.value : poolRating)
                                ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" 
                                : "text-navy/10"
                              }`} 
                            />
                          </motion.button>
                        ))}
                      </div>
                      <p className="mt-4 text-sm font-black text-amber-500 uppercase tracking-widest h-5">
                        {poolRating > 0 ? (STAR_RATING_LABELS as any)[poolRating] : ""}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-navy/40 ml-4">Additional Comments & Observations</label>
                      <textarea
                        value={poolComment}
                        onChange={(e) => setPoolComment(e.target.value)}
                        placeholder="e.g. Water temperature was perfect, locker room cleaning needed..."
                        className="w-full min-h-[120px] p-6 rounded-[2rem] bg-navy/5 border border-navy/5 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium transition-all"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-5 bg-primary text-white text-xs font-black uppercase tracking-[0.25em] rounded-3xl hover:bg-navy transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? <History className="animate-spin" size={18} /> : <ThumbsUp size={18} />}
                    {isSubmitting ? "Submitting..." : "Submit Experience Feedback"}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="complaints"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="card-premium border-red-tile space-y-8 bg-black/95">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center text-destructive">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-white uppercase tracking-tight">Report a Concern</h3>
                      <p className="text-xs text-white/40 font-bold">Your privacy is our priority. Issues are handled directly by management.</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmitComplaint} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Issue Category</label>
                        <div className="grid grid-cols-2 gap-2">
                          {COMPLAINT_CATEGORIES.map(cat => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => setComplaintCategory(cat)}
                              className={`py-3 px-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border ${
                                complaintCategory === cat 
                                ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                                : "bg-white/5 text-white/40 border-white/10 hover:border-white/20"
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Urgency Level</label>
                        <div className="flex gap-2">
                          {(["Low", "Medium", "High"] as const).map(p => (
                            <button
                              key={p}
                              type="button"
                              onClick={() => setPriority(p)}
                              className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                                priority === p 
                                ? p === "High" ? "bg-destructive text-white border-destructive" :
                                  p === "Medium" ? "bg-amber-500 text-white border-amber-500" :
                                  "bg-emerald-500 text-white border-emerald-500"
                                : "bg-white/5 text-white/40 border-white/10 hover:border-white/20"
                              }`}
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Detailed Concern Description</label>
                      <textarea
                        value={complaintMessage}
                        onChange={(e) => setComplaintMessage(e.target.value)}
                        placeholder="Please provide specific details about the issue. Include dates, times, or personnel involved if applicable..."
                        className="w-full min-h-[200px] p-6 rounded-[2rem] bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-destructive/20 text-sm font-medium transition-all text-white placeholder:text-white/10"
                      />
                    </div>

                    <div className="p-6 rounded-[2rem] bg-destructive/5 border border-destructive/10 flex gap-4 items-start">
                      <HelpCircle size={20} className="text-destructive shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-destructive">Submission Impact</p>
                        <p className="text-[11px] text-destructive/60 font-medium mt-1 leading-relaxed">
                          Once posted, this concern will be visible to the Admin Panel and the assigned Head Coach. You will receive an update in your notifications within 24-48 hours.
                        </p>
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full py-5 bg-destructive text-white text-xs font-black uppercase tracking-[0.25em] rounded-3xl hover:bg-navy transition-all shadow-xl shadow-destructive/20 flex items-center justify-center gap-3"
                    >
                      {isSubmitting ? <History className="animate-spin" size={18} /> : <Send size={18} />}
                      {isSubmitting ? "Submitting Concern..." : "Post Concern to Management"}
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar Status / Help */}
        <div className="space-y-6">
          <div className="card-premium bg-black/95 border-white/5 shadow-2xl shadow-black/40">
            <h4 className="font-display font-bold text-white mb-8 uppercase tracking-tight">Recent Activity</h4>
            <div className="space-y-8">
              {[
                { type: "Feedback", date: "Yesterday", status: "Processed", icon: ThumbsUp, color: "text-emerald-500" },
                { type: "Concern", date: "4 Days Ago", status: "Resolved", icon: CheckCircle2, color: "text-primary" },
              ].map((item, i) => (
                <div key={i} className="flex gap-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 group-hover:bg-primary group-hover:text-white transition-all shadow-lg shadow-black/40 border border-white/10">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-black text-white tracking-tight">{item.type} Submission</p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{item.date}</span>
                      <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-lg bg-emerald-500/10 ${item.color} border border-emerald-500/20`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-premium bg-black/95 border-blue-tile shadow-2xl shadow-primary/5">
            <h4 className="font-display font-bold text-white mb-4 uppercase tracking-tight">Direct Contact</h4>
            <p className="text-xs text-white/40 leading-relaxed font-bold mb-8 italic">
              For immediate emergencies or facility access issues, please use our 24/7 dedicated support channels.
            </p>
            <div className="space-y-4">
              <button className="w-full py-4 px-6 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-primary transition-all shadow-xl shadow-black/20">
                Call Management
              </button>
              <button className="w-full py-4 px-6 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-primary transition-all shadow-xl shadow-black/20">
                Email Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
