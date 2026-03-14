import React from 'react';
import { Button } from '@/components/ui/button';
import { OnboardingData } from '../../RegisterPage';
import { Timer, ArrowRight } from 'lucide-react';

interface Step4Props {
  data: OnboardingData;
  onNext: () => void;
  onBack: () => void;
}

const Step4TrialExpiry: React.FC<Step4Props> = ({ data, onNext, onBack }) => {
  return (
    <div className="flex flex-col h-full items-center justify-center text-center">
      <div className="w-20 h-20 rounded-full bg-orange-500/10 flex items-center justify-center mb-6">
        <Timer className="w-10 h-10 text-orange-500 animate-pulse" />
      </div>

      <h2 className="text-3xl font-bold text-white mb-4">Trial Period Ended</h2>
      
      <div className="max-w-md space-y-4">
        <p className="text-white/60 text-lg leading-relaxed">
          "Your trial session for <span className="text-primary font-bold">{data.sport}</span> has ended. Select a membership plan to continue training."
        </p>
        
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white/40 text-sm italic">
          You booked your trial for {data.trialDate} at {data.trialSlot}.
        </div>
      </div>

      <div className="mt-12 w-full flex gap-4 max-w-sm">
        <Button
          variant="ghost"
          onClick={onBack}
          className="flex-1 text-white/40 hover:text-white hover:bg-white/5 border border-white/5"
        >
          Back
        </Button>
        <Button
          onClick={onNext}
          className="flex-1 bg-primary hover:bg-primary/80 text-white font-bold py-6 rounded-2xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
        >
          Choose a Plan
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default Step4TrialExpiry;
