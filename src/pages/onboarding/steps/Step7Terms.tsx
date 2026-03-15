import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { OnboardingData } from '../../RegisterPage';
import { ShieldAlert, ScrollText } from 'lucide-react';

interface Step7Props {
  data: OnboardingData;
  updateData: (newData: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step7Terms: React.FC<Step7Props> = ({ data, updateData, onNext, onBack }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Terms & Conditions</h2>
        <p className="text-white/60 text-sm">Please review the rules of the academy</p>
      </div>

      <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 overflow-y-auto mb-6 min-h-0">
        <div className="space-y-6 text-white/60 text-xs leading-relaxed">
          <div className="flex items-center gap-2 text-white font-bold mb-2">
            <ScrollText className="w-4 h-4 text-primary" />
            <span>Academy Rules</span>
          </div>
          
          <p>1. Membership is non-transferable and must be renewed before the expiry date.</p>
          <p>2. Proper sports attire and gear are mandatory for all sessions (e.g., swim caps for swimming, non-marking shoes for badminton).</p>
          <p>3. Members must adhere to the scheduled timings. Late entry might not be permitted.</p>
          <p>4. The academy is not responsible for any personal injury or loss of belongings.</p>
          <p>5. Zero tolerance policy towards misconduct or harassment on the premises.</p>
          <p>6. Refunds are governed by the specific plan's cancellation policy.</p>
          
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-start gap-3">
            <ShieldAlert className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <p className="text-[10px] text-primary/80 italic">
              By proceeding, you agree to comply with all safety protocols and medical advice provided by our coaches.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div 
          onClick={() => updateData({ termsAccepted: !data.termsAccepted })}
          className={`flex items-center space-x-4 p-5 rounded-[2rem] cursor-pointer transition-all duration-300 border ${
            data.termsAccepted 
              ? 'bg-primary/10 border-primary/50' 
              : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
          }`}
        >
          <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
            data.termsAccepted ? 'bg-primary border-primary' : 'bg-transparent border-white/20'
          }`}>
            {data.termsAccepted && (
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-4 h-4 text-white"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>
          <Label className="text-white text-base font-bold cursor-pointer leading-none flex-1">
            I accept the Terms & Conditions
          </Label>
        </div>

        <div className="flex gap-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-white/40 hover:text-white hover:bg-white/5 border border-white/5"
          >
            Back
          </Button>
          <Button
            onClick={onNext}
            disabled={!data.termsAccepted}
            className="flex-1 bg-primary hover:bg-primary/80 text-white font-bold py-6 rounded-2xl shadow-lg shadow-primary/20"
          >
            Continue to Uploads
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Step7Terms;
