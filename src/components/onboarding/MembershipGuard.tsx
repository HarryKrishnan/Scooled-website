import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import Step5SelectMembership from '@/pages/onboarding/steps/Step5SelectMembership';
import Step6UploadDocuments from '@/pages/onboarding/steps/Step6UploadDocuments';
import Step7Terms from '@/pages/onboarding/steps/Step7Terms';
import Step8Payment from '@/pages/onboarding/steps/Step8Payment';
import Step9Welcome from '@/pages/onboarding/steps/Step9Welcome';
import { OnboardingData, Sport } from '@/pages/RegisterPage';
import { ShieldAlert, ArrowRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MembershipGuardProps {
  children: React.ReactNode;
}

const MembershipGuard: React.FC<MembershipGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  const [isExpired, setIsExpired] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [step, setStep] = useState(5); // Start at Plan Selection
  const [data, setData] = useState<OnboardingData>({
    firstName: 'Aarav',
    lastName: 'Patel',
    dob: '1995-05-15',
    gender: 'Male',
    phone: '+91 9876543210',
    email: 'aarav.patel@example.com',
    sport: (localStorage.getItem('scooled_selected_sport') as Sport) || 'Swimming',
    trialDate: localStorage.getItem('scooled_trial_date') || '',
    trialSlot: '10:00 AM',
    membershipPlan: '',
    documents: {
      idProof: null,
      medicalCertificate: null,
      passportPhoto: null,
    },
    termsAccepted: false,
  });

  useEffect(() => {
    const checkExpiry = () => {
      const status = localStorage.getItem('scooled_member_status');
      if (status === 'active') {
        setIsExpired(false);
        return;
      }

      const trialDateStr = localStorage.getItem('scooled_trial_date');
      const trialSlotStr = localStorage.getItem('scooled_trial_slot');
      
      if (trialDateStr && trialSlotStr) {
        // Parse date like "Mon, 16 Mar"
        const [, datePart] = trialDateStr.split(', ');
        const [dayNum, monthName] = datePart.split(' ');
        const monthMap: Record<string, number> = { 
          'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
          'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11 
        };
        
        const currentYear = new Date().getFullYear();
        const trialDate = new Date(currentYear, monthMap[monthName], parseInt(dayNum));
        
        // Parse time like "05:30 PM"
        const [time, modifier] = trialSlotStr.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        
        if (modifier === 'PM' && hours < 12) hours += 12;
        if (modifier === 'AM' && hours === 12) hours = 0;
        
        trialDate.setHours(hours, minutes, 0, 0);
        
        // Trial ends 1 hour after start
        const trialEnd = new Date(trialDate.getTime() + 60 * 60 * 1000);
        const now = new Date();
        
        if (now > trialEnd) {
          setIsExpired(true);
        } else {
          setIsExpired(false);
        }
      }
    };

    checkExpiry();
    
    // Check for forced upgrade
    if (localStorage.getItem('scooled_force_upgrade') === 'true') {
      setShowUpgradeModal(true);
      localStorage.removeItem('scooled_force_upgrade');
    }

    const interval = setInterval(checkExpiry, 60000); // Check every minute
    window.addEventListener('storage', checkExpiry);
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', checkExpiry);
    };
  }, []);

  const nextStep = () => {
    if (step === 8) {
      localStorage.setItem('scooled_member_status', 'active');
      setIsExpired(false);
      setShowUpgradeModal(false);
      const sportPath = data.sport?.toLowerCase().replace(' ', '-');
      navigate(`/portal/${sportPath}`);
      window.location.reload(); 
      return;
    }
    setStep((s) => s + 1);
  };
  
  const prevStep = () => setStep((s) => s - 1);
  
  const updateData = (newData: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  if (isExpired && !showUpgradeModal) {
    return (
      <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6 sm:p-12 overflow-hidden portal-bg-pattern">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-lg bg-[#111111] border border-white/10 rounded-[3rem] p-8 lg:p-12 text-center shadow-2xl"
        >
          <div className="w-20 h-20 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-8">
            <ShieldAlert className="w-10 h-10 text-red-500" />
          </div>
          
          <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-tight italic">Trial Complete</h2>
          <p className="text-white/40 text-sm mb-12 leading-relaxed">
            Your free trial has ended. We hope you enjoyed your session! To continue training and access your professional dashboard, please upgrade your membership plan.
          </p>

          <Button
            onClick={() => setShowUpgradeModal(true)}
            className="w-full bg-primary hover:bg-primary/80 text-white font-bold py-8 rounded-[2rem] shadow-2xl shadow-primary/40 flex items-center justify-center gap-3 group"
          >
            Upgrade Plan
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <button 
            onClick={() => navigate('/login')}
            className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/20 hover:text-white/40 transition-colors"
          >
            Sign out and go back
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      {children}
      
      <AnimatePresence>
        {showUpgradeModal && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setShowUpgradeModal(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 text-white/40 transition-colors z-20"
              >
                <X size={20} />
              </button>

              {/* Progress Bar */}
              <div className="w-full h-1 bg-white/5 flex">
                {[5, 6, 7, 8, 9].map((s) => (
                  <div
                    key={s}
                    className={`flex-1 h-full transition-all duration-500 ${
                      s <= step ? 'bg-primary' : 'bg-transparent'
                    }`}
                  />
                ))}
              </div>

              <div className="flex-1 overflow-hidden relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="h-full w-full p-8 flex flex-col min-h-0"
                  >
                    {step === 5 && <Step5SelectMembership data={data} updateData={updateData} onNext={nextStep} onBack={() => setShowUpgradeModal(false)} />}
                    {step === 6 && <Step7Terms data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} />}
                    {step === 7 && <Step6UploadDocuments data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} />}
                    {step === 8 && <Step8Payment data={data} onNext={nextStep} onBack={prevStep} />}
                    {step === 9 && <Step9Welcome data={data} />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MembershipGuard;
