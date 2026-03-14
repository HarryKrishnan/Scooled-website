import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { OnboardingData } from '../../RegisterPage';
import { CreditCard, Smartphone, Building2, Apple, CheckCircle2 } from 'lucide-react';

interface Step8Props {
  data: OnboardingData;
  onNext: () => void;
  onBack: () => void;
}

const Step8Payment: React.FC<Step8Props> = ({ data, onNext, onBack }) => {
  const [method, setMethod] = useState('upi');

  const methods = [
    { id: 'upi', name: 'UPI', icon: Smartphone, desc: 'GPay, PhonePe, Paytm' },
    { id: 'card', name: 'Credit / Debit Card', icon: CreditCard, desc: 'Visa, Mastercard, RuPay' },
    { id: 'net', name: 'Net Banking', icon: Building2, desc: 'All Indian Banks' },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Payment Summary</h2>
        <p className="text-white/60 text-sm">Almost there! Complete the payment to activate</p>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto pr-2 scrollbar-hide">
        <div className="p-5 rounded-2xl bg-primary/10 border border-primary/20 space-y-3">
          <div className="flex justify-between items-center text-xs uppercase tracking-widest text-primary font-bold">
            <span>Membership Details</span>
            <span>Summary</span>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-white font-bold text-lg">{data.sport}</p>
              <p className="text-white/40 text-[10px]">{data.membershipPlan}</p>
            </div>
            <div className="text-right">
              <p className="text-white/40 text-[10px] line-through">₹5,000</p>
              <p className="text-white font-black text-2xl">₹4,200</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest ml-1">Payment Method</p>
          <div className="space-y-2">
            {methods.map((m) => {
              const Icon = m.icon;
              const isSelected = method === m.id;
              return (
                <div
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected 
                      ? 'border-primary bg-primary/5' 
                      : 'border-white/5 bg-white/2 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isSelected ? 'bg-primary/20' : 'bg-white/5'}`}>
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-primary' : 'text-white/40'}`} />
                    </div>
                    <div>
                      <p className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-white/60'}`}>{m.name}</p>
                      <p className="text-[10px] text-white/20">{m.desc}</p>
                    </div>
                  </div>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-primary" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-white/40 hover:text-white hover:bg-white/5 border border-white/5"
        >
          Back
        </Button>
        <Button
          onClick={onNext}
          className="flex-1 bg-primary hover:bg-primary/80 text-white font-bold py-6 rounded-2xl shadow-lg shadow-primary/20"
        >
          Pay ₹4,200 Securely
        </Button>
      </div>
    </div>
  );
};

export default Step8Payment;
