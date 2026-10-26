import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Upload, FileText, Camera, CheckCircle2, AlertCircle } from 'lucide-react';

export const KycVerificationPage: React.FC = () => {
  const { user, updateUser } = useApp();
  const [docType, setDocType] = useState('national_id');
  const [docNumber, setDocNumber] = useState('35201-8492019-3');
  const [frontUploaded, setFrontUploaded] = useState(true);
  const [backUploaded, setBackUploaded] = useState(true);
  const [selfieTaken, setSelfieTaken] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedNotice, setSubmittedNotice] = useState(false);

  const handleKycSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      updateUser({
        kycStatus: 'verified',
        tier: 2,
        monthlyLimitTotal: 50000,
        monthlyLimitRemaining: 48500,
      });
      setSubmittedNotice(true);
      setTimeout(() => setSubmittedNotice(false), 5000);
    }, 1500);
  };

  return (
    <div className="py-8 bg-[#F4F6FA] text-slate-800 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#850D22]">Anti-Money Laundering (AML) Compliance</span>
            <h1 className="text-2xl font-extrabold text-[#101A33] tracking-tight">
              Identity Verification (KYC)
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Verify your statutory identity to increase your daily withdrawal limits to $5,000 USD.
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs bg-emerald-50 text-emerald-700 font-mono font-bold px-3 py-1 rounded-full border border-emerald-200">
              {user.kycStatus.toUpperCase()}
            </span>
          </div>
        </div>

        {submittedNotice && (
          <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-2xl text-xs flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Biometric signatures and identity credentials verified! Tier 2 limits are now fully active.</span>
          </div>
        )}

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <form onSubmit={handleKycSubmit} className="space-y-6 text-xs">
            
            {/* Step 1: Document selection */}
            <div>
              <label className="font-bold text-slate-900 block mb-2">1. Select Government Issued Document</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'national_id', label: 'National ID Card (CNIC)' },
                  { id: 'passport', label: 'International Passport' },
                  { id: 'driving_license', label: 'Official Driver License' },
                ].map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setDocType(d.id)}
                    className={`py-3 px-3 rounded-xl border font-semibold text-center transition-all ${docType === d.id ? 'border-[#C8102E] bg-rose-50 text-[#C8102E] ring-1 ring-[#C8102E]' : 'border-slate-200 text-slate-700 hover:border-slate-300'}`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Document Identification Number</label>
              <input
                type="text"
                value={docNumber}
                onChange={(e) => setDocNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono"
                required
              />
            </div>

            {/* Step 2: Upload simulation */}
            <div>
              <label className="font-bold text-slate-900 block mb-2">2. Document Photos (High Resolution)</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 border-2 border-dashed border-emerald-300 bg-emerald-50/30 rounded-2xl text-center space-y-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                  <span className="font-bold text-slate-800 block">Front Side Uploaded</span>
                  <span className="text-[10px] text-slate-500 font-mono">cnic_front_verified.jpg (2.4 MB)</span>
                </div>

                <div className="p-5 border-2 border-dashed border-emerald-300 bg-emerald-50/30 rounded-2xl text-center space-y-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                  <span className="font-bold text-slate-800 block">Back Side Uploaded</span>
                  <span className="text-[10px] text-slate-500 font-mono">cnic_back_verified.jpg (2.1 MB)</span>
                </div>
              </div>
            </div>

            {/* Step 3: Biometric Liveness */}
            <div>
              <label className="font-bold text-slate-900 block mb-2">3. 3D Face Liveness Biometric Check</label>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Biometric Scan Complete</span>
                    <span className="text-[11px] text-slate-500">Liveness confidence score: 99.4% (Passed)</span>
                  </div>
                </div>
                <span className="text-xs text-emerald-600 font-bold">MATCHED</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-[#C8102E] hover:bg-[#850D22] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#D6B36A]" />
              <span>{isSubmitting ? 'Verifying with Central Identity Bureau...' : 'Submit Verification Dossier'}</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
