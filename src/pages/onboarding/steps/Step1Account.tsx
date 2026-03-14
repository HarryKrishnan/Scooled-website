import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { OnboardingData } from '../../RegisterPage';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { motion, AnimatePresence } from 'framer-motion';

interface Step1Props {
  data: OnboardingData;
  updateData: (newData: Partial<OnboardingData>) => void;
  onNext: () => void;
}

const Step1Account: React.FC<Step1Props> = ({ data, updateData, onNext }) => {
  const [screen, setScreen] = useState(1);
  const [otpSent, setOtpSent] = useState({ phone: false, email: false });

  const handleNextScreen = () => {
    if (screen === 1) {
      setScreen(2);
    } else {
      onNext();
    }
  };

  const isScreen1Valid = data.firstName && data.lastName && data.dob && data.gender;
  const isScreen2Valid = data.phone && data.email;

  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
        <p className="text-white/60 text-sm">
          {screen === 1 ? "Tell us about yourself" : "Verify your contact information"}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide">
        <AnimatePresence mode="wait">
          {screen === 1 ? (
            <motion.div
              key="screen1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-white/80">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={data.firstName}
                    onChange={(e) => updateData({ firstName: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-white/80">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={data.lastName}
                    onChange={(e) => updateData({ lastName: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dob" className="text-white/80">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={data.dob}
                  onChange={(e) => updateData({ dob: e.target.value })}
                  className="bg-white/5 border-white/10 text-white [color-scheme:dark]"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-white/80">Gender</Label>
                <RadioGroup
                  value={data.gender}
                  onValueChange={(val) => updateData({ gender: val })}
                  className="flex gap-4"
                >
                  {['Male', 'Female', 'Other'].map((g) => (
                    <div key={g} className="flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                      <RadioGroupItem value={g} id={g} className="border-white/20 text-primary" />
                      <Label htmlFor={g} className="text-white cursor-pointer">{g}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="screen2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white/80">Phone Number</Label>
                <div className="flex gap-2">
                  <Input
                    id="phone"
                    placeholder="+91 9876543210"
                    value={data.phone}
                    onChange={(e) => updateData({ phone: e.target.value })}
                    className="bg-white/5 border-white/10 text-white flex-1"
                  />
                  <Button 
                    variant="outline" 
                    className="border-white/10 bg-white/5 text-white text-xs whitespace-nowrap"
                    onClick={() => setOtpSent({ ...otpSent, phone: true })}
                  >
                    {otpSent.phone ? "Resend" : "Send OTP"}
                  </Button>
                </div>
                {otpSent.phone && (
                  <Input placeholder="Enter 6-digit OTP" className="bg-white/5 border-white/10 text-white mt-2" />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/80">Email Address</Label>
                <div className="flex gap-2">
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    value={data.email}
                    onChange={(e) => updateData({ email: e.target.value })}
                    className="bg-white/5 border-white/10 text-white flex-1"
                  />
                  <Button 
                    variant="outline" 
                    className="border-white/10 bg-white/5 text-white text-xs whitespace-nowrap"
                    onClick={() => setOtpSent({ ...otpSent, email: true })}
                  >
                    {otpSent.email ? "Resend" : "Send OTP"}
                  </Button>
                </div>
                {otpSent.email && (
                  <Input placeholder="Enter 6-digit OTP" className="bg-white/5 border-white/10 text-white mt-2" />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-8 flex gap-4">
        {screen === 2 && (
          <Button
            variant="ghost"
            onClick={() => setScreen(1)}
            className="text-white/40 hover:text-white hover:bg-white/5 border border-white/5"
          >
            Back
          </Button>
        )}
        <Button
          onClick={handleNextScreen}
          disabled={screen === 1 ? !isScreen1Valid : !isScreen2Valid}
          className="flex-1 bg-primary hover:bg-primary/80 text-white font-bold py-6 rounded-2xl shadow-lg shadow-primary/20"
        >
          {screen === 1 ? "Continue" : "Verify & Create Account"}
        </Button>
      </div>
    </div>
  );
};

export default Step1Account;
