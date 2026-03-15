import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { OnboardingData } from '../../RegisterPage';
import { Upload, FileText, Camera, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface Step6Props {
  data: OnboardingData;
  updateData: (newData: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step6UploadDocuments: React.FC<Step6Props> = ({ data, updateData, onNext, onBack }) => {
  const fileInputRefs = {
    idProof: useRef<HTMLInputElement>(null),
    medicalCertificate: useRef<HTMLInputElement>(null),
    passportPhoto: useRef<HTMLInputElement>(null),
  };

  const handleFileChange = (key: keyof OnboardingData['documents'], file: File | null) => {
    updateData({
      documents: {
        ...data.documents,
        [key]: file,
      },
    });
  };

  const docTypes = [
    { id: 'idProof' as const, name: 'ID Proof', icon: ShieldCheck, desc: 'Aadhar, Passport or DL' },
    { id: 'medicalCertificate' as const, name: 'Medical Certificate', icon: FileText, desc: 'Fit to train certificate' },
    { id: 'passportPhoto' as const, name: 'Passport Photo', icon: Camera, desc: 'Clear front-facing photo' },
  ];

  const isComplete = data.documents.idProof && data.documents.medicalCertificate && data.documents.passportPhoto;

  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Upload Documents</h2>
        <p className="text-white/60 text-sm">We need these to verify your identity and fitness</p>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto pr-2 scrollbar-hide">
        {docTypes.map((doc) => {
          const file = data.documents[doc.id];
          const Icon = doc.icon;
          
          return (
            <div
              key={doc.id}
              onClick={() => fileInputRefs[doc.id].current?.click()}
              className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between ${
                file 
                  ? 'border-green-500/50 bg-green-500/5' 
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  file ? 'bg-green-500/20' : 'bg-white/10'
                }`}>
                  <Icon className={`w-6 h-6 ${file ? 'text-green-500' : 'text-white/40'}`} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">{doc.name}</h3>
                  <p className="text-[10px] text-white/30">{file ? file.name : doc.desc}</p>
                </div>
              </div>
              
              <input
                type="file"
                ref={fileInputRefs[doc.id]}
                className="hidden"
                onChange={(e) => handleFileChange(doc.id, e.target.files?.[0] || null)}
              />

              {file ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10">
                  <Upload className="w-4 h-4 text-white/20" />
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
          disabled={!isComplete}
          className="flex-1 bg-primary hover:bg-primary/80 text-white font-bold py-6 rounded-2xl shadow-lg shadow-primary/20"
        >
          Proceed to Payment
        </Button>
      </div>
    </div>
  );
};

export default Step6UploadDocuments;
