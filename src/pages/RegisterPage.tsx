import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Step1Account from './onboarding/steps/Step1Account';
import Step2ChooseSport from './onboarding/steps/Step2ChooseSport';
import Step3BookTrial from './onboarding/steps/Step3BookTrial';
import Step4TrialExpiry from './onboarding/steps/Step4TrialExpiry';
import Step5SelectMembership from './onboarding/steps/Step5SelectMembership';
import Step6UploadDocuments from './onboarding/steps/Step6UploadDocuments';
import Step7Terms from './onboarding/steps/Step7Terms';
import Step8Payment from './onboarding/steps/Step8Payment';
import Step9Welcome from './onboarding/steps/Step9Welcome';

export type Sport = 'Swimming' | 'Futsal' | 'Pickleball' | 'Table-Tennis' | null;

export interface OnboardingData {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  phone: string;
  email: string;
  sport: Sport;
  trialDate: string;
  trialSlot: string;
  membershipPlan: string;
  documents: {
    idProof: File | null;
    medicalCertificate: File | null;
    passportPhoto: File | null;
  };
  termsAccepted: boolean;
}

const RegisterPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    phone: '',
    email: '',
    sport: null,
    trialDate: '',
    trialSlot: '',
    membershipPlan: '',
    documents: {
      idProof: null,
      medicalCertificate: null,
      passportPhoto: null,
    },
    termsAccepted: false,
  });

  const nextStep = () => {
    if (step === 3) {
      // Save trial status and redirect after booking trial
      localStorage.setItem('scooled_member_status', 'trial');
      localStorage.setItem('scooled_selected_sport', data.sport || '');
      localStorage.setItem('scooled_trial_date', data.trialDate);
      localStorage.setItem('scooled_trial_slot', data.trialSlot);
      
      const sportPath = data.sport?.toLowerCase();
      navigate(`/portal/${sportPath}`);
      return;
    }

    if (step === 8) {
      // Save active status and redirect after payment
      localStorage.setItem('scooled_member_status', 'active');
      localStorage.setItem('scooled_selected_sport', data.sport || '');
      
      const sportPath = data.sport?.toLowerCase();
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

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1Account data={data} updateData={updateData} onNext={nextStep} />;
      case 2:
        return <Step2ChooseSport data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} />;
      case 3:
        return <Step3BookTrial data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} />;
      case 4:
        return <Step4TrialExpiry data={data} onNext={nextStep} onBack={prevStep} />;
      case 5:
        return <Step5SelectMembership data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} />;
      case 6:
        return <Step6UploadDocuments data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} />;
      case 7:
        return <Step7Terms data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} />;
      case 8:
        return <Step8Payment data={data} onNext={nextStep} onBack={prevStep} />;
      case 9:
        return <Step9Welcome data={data} />;
      default:
        return null;
    }
  };

  const stepsCount = 9;

  return (
    <div className="h-screen w-full bg-[#0a0a0a] flex items-center justify-center p-4 overflow-hidden portal-bg-pattern">
      <div className="w-full max-w-2xl bg-black/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Progress Bar */}
        <div className="w-full h-1 bg-white/5 flex">
          {Array.from({ length: stepsCount }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-full transition-all duration-500 ${
                i + 1 <= step ? 'bg-primary' : 'bg-transparent'
              }`}
            />
          ))}
        </div>

        {/* Step Indicator */}
        <div className="px-8 pt-6 flex justify-between items-center">
          <span className="text-white/40 text-xs font-medium uppercase tracking-widest">
            Step {step} of {stepsCount}
          </span>
          <div className="flex gap-1">
            {Array.from({ length: stepsCount }).map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i + 1 === step ? 'bg-primary w-4' : 'bg-white/10'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step Content */}
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
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
