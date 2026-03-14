import React from 'react';
import { Button } from '@/components/ui/button';
import { OnboardingData } from '../../RegisterPage';
import { Check, Star } from 'lucide-react';

interface Step5Props {
  data: OnboardingData;
  updateData: (newData: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const planData: Record<string, { id: string; name: string; price: string; features: string[] }[]> = {
  Swimming: [
    { id: 'sw-beg', name: 'Beginner Program', price: '₹2,500/mo', features: ['4 Sessions/week', 'Basics Training', 'Pool Access'] },
    { id: 'sw-int', name: 'Intermediate Program', price: '₹4,000/mo', features: ['Daily Sessions', 'Stroke Correction', 'Video Analysis'] },
    { id: 'sw-adv', name: 'Advanced Program', price: '₹6,000/mo', features: ['Elite Coaching', 'Strength Training', 'Competition Prep'] },
  ],
  Pickleball: [
    { id: 'pb-wknd', name: 'Weekend Training', price: '₹3,000/mo', features: ['Sat-Sun Only', '2hr Sessions', 'Equipment Provided'] },
    { id: 'pb-pro', name: 'Pro Training', price: '₹5,500/mo', features: ['Daily Pro Drills', 'Match Play', 'Ranking Support'] },
  ],
  Football: [
    { id: 'fb-acad', name: 'Academy Program', price: '₹3,500/mo', features: ['3 Days/week', 'Skill Drills', 'Local Matches'] },
    { id: 'fb-elite', name: 'Elite Program', price: '₹7,000/mo', features: ['Internal League', 'Diet Plan', 'High Intensity'] },
  ],
  Badminton: [
    { id: 'bd-reg', name: 'Regular Training', price: '₹2,800/mo', features: ['3 Sessions/week', 'Court Time', 'Basic Drills'] },
    { id: 'bd-perf', name: 'Performance Batch', price: '₹5,000/mo', features: ['Daily Training', 'Tournament Focus', 'Footwork Drill'] },
  ],
};

const Step5SelectMembership: React.FC<Step5Props> = ({ data, updateData, onNext, onBack }) => {
  const sportsPlans = planData[data.sport || 'Swimming'] || [];

  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Select Your Plan</h2>
        <p className="text-white/60 text-sm">Choose a membership for <span className="text-primary font-bold">{data.sport}</span></p>
      </div>

      <div className="flex-1 grid grid-cols-1 gap-4 overflow-y-auto pr-2 scrollbar-hide">
        {sportsPlans.map((plan) => {
          const isSelected = data.membershipPlan === plan.id;
          return (
            <div
              key={plan.id}
              onClick={() => updateData({ membershipPlan: plan.id })}
              className={`relative p-5 rounded-[1.5rem] border transition-all duration-300 cursor-pointer flex justify-between items-center ${
                isSelected 
                  ? 'border-primary bg-primary/5' 
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white">{plan.name}</h3>
                  {plan.name.includes("Elite") || plan.name.includes("Advanced") && (
                    <span className="flex items-center gap-1 bg-gold/20 text-gold text-[8px] px-2 py-0.5 rounded-full font-bold uppercase">
                      <Star className="w-2 h-2 fill-current" />
                      Popular
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {plan.features.map(f => (
                    <div key={f} className="flex items-center gap-1 text-[10px] text-white/40">
                      <Check className="w-2.5 h-2.5 text-primary" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-black text-white">{plan.price.split('/')[0]}</p>
                <p className="text-[10px] text-white/20">{plan.price.split('/')[1]}</p>
              </div>
              {isSelected && (
                <div className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center">
                   <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-white stroke-[4]" />
                   </div>
                </div>
              )}
            </div>
          );
        })}
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
          disabled={!data.membershipPlan}
          className="flex-1 bg-primary hover:bg-primary/80 text-white font-bold py-6 rounded-2xl shadow-lg shadow-primary/20"
        >
          Continue to Documents
        </Button>
      </div>
    </div>
  );
};

export default Step5SelectMembership;
