import React from 'react';
import { Button } from '@/components/ui/button';
import { OnboardingData } from '../../RegisterPage';
import { Calendar as CalendarIcon, Clock, Users } from 'lucide-react';

interface Step3Props {
  data: OnboardingData;
  updateData: (newData: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const dates = [
  { day: 'Mon', date: '16 Mar' },
  { day: 'Tue', date: '17 Mar' },
  { day: 'Wed', date: '18 Mar' },
  { day: 'Thu', date: '19 Mar' },
  { day: 'Fri', date: '20 Mar' },
];

const slots = ['06:00 AM', '08:00 AM', '10:00 AM', '04:00 PM', '06:00 PM', '08:00 PM'];

const Step3BookTrial: React.FC<Step3Props> = ({ data, updateData, onNext, onBack }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Book Your Trial</h2>
        <p className="text-white/60 text-sm">Experience the {data.sport} training first-hand</p>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto pr-2 scrollbar-hide">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
            <CalendarIcon className="w-4 h-4 text-primary" />
            <span>Select Date</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {dates.map((d) => {
              const dateStr = `${d.day}, ${d.date}`;
              const isSelected = data.trialDate === dateStr;
              return (
                <div
                  key={dateStr}
                  onClick={() => updateData({ trialDate: dateStr })}
                  className={`flex flex-col items-center min-w-[70px] p-3 rounded-2xl border transition-all cursor-pointer ${
                    isSelected 
                      ? 'border-primary bg-primary/10 text-white' 
                      : 'border-white/10 bg-white/5 text-white/40 hover:border-white/20'
                  }`}
                >
                  <span className="text-[10px] uppercase tracking-wider mb-1">{d.day}</span>
                  <span className="text-sm font-bold">{d.date}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
            <Clock className="w-4 h-4 text-primary" />
            <span>Select Time Slot</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {slots.map((slot) => {
              const isSelected = data.trialSlot === slot;
              return (
                <div
                  key={slot}
                  onClick={() => updateData({ trialSlot: slot })}
                  className={`p-3 rounded-xl border text-center text-xs font-medium transition-all cursor-pointer ${
                    isSelected 
                      ? 'border-primary bg-primary/10 text-white' 
                      : 'border-white/10 bg-white/5 text-white/40 hover:border-white/20'
                  }`}
                >
                  {slot}
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-white/40" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">Batch Type</p>
              <p className="text-white/40 text-[10px]">Morning Beginner Batch</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-primary text-[10px] hover:bg-primary/10">
            Edit
          </Button>
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
          disabled={!data.trialDate || !data.trialSlot}
          className="flex-1 bg-primary hover:bg-primary/80 text-white font-bold py-6 rounded-2xl shadow-lg shadow-primary/20"
        >
          Confirm Trial Booking
        </Button>
      </div>
    </div>
  );
};

export default Step3BookTrial;
