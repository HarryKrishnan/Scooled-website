import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { OnboardingData } from '../../RegisterPage';
import { PartyPopper, Calendar, Trophy, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Step9Props {
  data: OnboardingData;
}

const Step9Welcome: React.FC<Step9Props> = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full items-center justify-center text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 10, stiffness: 100 }}
        className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-8"
      >
        <PartyPopper className="w-12 h-12 text-primary" />
      </motion.div>

      <h2 className="text-4xl font-black text-white mb-4">Welcome to the Team!</h2>
      <p className="text-white/40 text-sm mb-12">Your membership has been activated successfully.</p>
      
      <div className="grid grid-cols-3 gap-4 w-full mb-12">
        <div className="p-4 rounded-3xl bg-white/5 border border-white/10">
          <Trophy className="w-5 h-5 text-primary mx-auto mb-2" />
          <p className="text-[10px] text-white/40 uppercase tracking-widest">Sport</p>
          <p className="text-white font-bold text-xs">{data.sport}</p>
        </div>
        <div className="p-4 rounded-3xl bg-white/5 border border-white/10">
          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
            <div className="w-2 h-2 bg-primary rounded-full" />
          </div>
          <p className="text-[10px] text-white/40 uppercase tracking-widest">Plan</p>
          <p className="text-white font-bold text-xs">Pro Membership</p>
        </div>
        <div className="p-4 rounded-3xl bg-white/5 border border-white/10">
          <Calendar className="w-5 h-5 text-primary mx-auto mb-2" />
          <p className="text-[10px] text-white/40 uppercase tracking-widest">Starts</p>
          <p className="text-white font-bold text-xs">16 Mar 2026</p>
        </div>
      </div>

      <Button
        onClick={() => {
          localStorage.setItem('scooled_member_status', 'active');
          const sportPath = data.sport?.toLowerCase().replace(' ', '-');
          navigate(`/portal/${sportPath}`);
          window.location.reload(); // Force refresh to clear any guard state
        }}
        className="w-full bg-primary hover:bg-primary/80 text-white font-bold py-8 rounded-[2rem] shadow-2xl shadow-primary/40 flex items-center justify-center gap-3 group"
      >
        Go to My Sport Dashboard
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
};

export default Step9Welcome;
