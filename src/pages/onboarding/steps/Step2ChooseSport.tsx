import React from 'react';
import { Button } from '@/components/ui/button';
import { OnboardingData, Sport } from '../../RegisterPage';
import { Waves, Trophy, Target, ShieldCheck } from 'lucide-react';

interface Step2Props {
  data: OnboardingData;
  updateData: (newData: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const sports = [
  { id: 'Swimming' as Sport, icon: Waves, color: 'border-blue-tile', desc: 'Master the art of swimming' },
  { id: 'Futsal' as Sport, icon: Trophy, color: 'border-green-tile', desc: 'The beautiful game of goals' },
  { id: 'Pickleball' as Sport, icon: Target, color: 'border-orange-tile', desc: 'Fast-paced paddle fun' },
  { id: 'Table-Tennis' as Sport, icon: ShieldCheck, color: 'border-teal-tile', desc: 'Precision and speed on court' },
];

const Step2ChooseSport: React.FC<Step2Props> = ({ data, updateData, onNext, onBack }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Select Your Sport</h2>
        <p className="text-white/60 text-sm">Choose the discipline you want to excel in</p>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-4">
        {sports.map((sport) => {
          const Icon = sport.icon;
          const isSelected = data.sport === sport.id;

          return (
            <div
              key={sport.id}
              onClick={() => updateData({ sport: sport.id })}
              className={`relative p-5 rounded-[2rem] border transition-all duration-300 cursor-pointer group flex flex-col justify-between ${
                isSelected 
                  ? `${sport.color} bg-white/5` 
                  : 'border-white/10 bg-white/2 hover:border-white/20 hover:bg-white/5'
              }`}
            >
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                isSelected ? 'bg-primary/20' : 'bg-white/5'
              }`}>
                <Icon className={`w-5 h-5 ${isSelected ? 'text-primary' : 'text-white/40 group-hover:text-white/60'}`} />
              </div>
              <div>
                <h3 className={`font-bold text-sm ${isSelected ? 'text-white' : 'text-white/60'}`}>{sport.id}</h3>
                <p className="text-[10px] text-white/30 mt-1 leading-tight">{sport.desc}</p>
              </div>
              {isSelected && (
                <div className="absolute top-4 right-4 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
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
          disabled={!data.sport}
          className="flex-1 bg-primary hover:bg-primary/80 text-white font-bold py-6 rounded-2xl shadow-lg shadow-primary/20"
        >
          Proceed with {data.sport || "Selection"}
        </Button>
      </div>
    </div>
  );
};

export default Step2ChooseSport;
