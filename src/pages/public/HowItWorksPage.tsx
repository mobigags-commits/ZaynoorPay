import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle, ShieldCheck, ArrowRight, UserPlus, Wallet, Send, FileCheck } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const { navigate, language } = useApp();

  const steps = [
    {
      step: '01',
      icon: <UserPlus className="w-6 h-6 text-[#C8102E]" />,
      title: 'Create & Verify Your Wallet Account',
      desc: 'Sign up with your mobile number or email. Confirm the one-time passcode (OTP) and create your 6-digit transaction PIN. Tier 1 gives immediate access to basic limits.',
    },
    {
      step: '02',
      icon: <FileCheck className="w-6 h-6 text-[#D6B36A]" />,
      title: 'Complete Biometric & Document Verification (KYC)',
      desc: 'Upload your national ID card or passport to unlock Tier 2 ($5,000/day limit) and international remittance inbound corridors.',
    },
    {
      step: '03',
      icon: <Wallet className="w-6 h-6 text-[#101A33]" />,
      title: 'Fund Your Multi-Currency Balances',
      desc: 'Add funds through linked debit/credit cards, domestic 1Link/Raast instant switch, or international bank wire transfer.',
    },
    {
      step: '04',
      icon: <Send className="w-6 h-6 text-emerald-600" />,
      title: 'Transact, Pay Bills, and Track Financial Health',
      desc: 'Send payments in seconds, pay monthly bills before due dates, generate receipts, and export statements anytime.',
    },
  ];

  return (
    <div className="py-12 bg-[#F4F6FA] text-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#850D22]">
            Step-by-Step Onboarding
          </span>
          <h1 className="text-4xl font-extrabold text-[#101A33] tracking-tight">
            How ZaynoorPay Works
          </h1>
          <p className="text-sm text-slate-600">
            A frictionless process designed for maximum compliance, speed, and user safety.
          </p>
        </div>

        <div className="space-y-6">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 bg-white rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center gap-6 shadow-xs"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                {s.icon}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#850D22]">{s.step}</span>
                  <h3 className="text-base font-bold text-[#101A33]">{s.title}</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Action card */}
        <div className="p-8 bg-[#101A33] text-white rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold">Ready to take control of your digital payments?</h3>
            <p className="text-xs text-slate-300">Open a test sandbox account in seconds with zero commitment.</p>
          </div>
          <button
            onClick={() => navigate('/signup')}
            className="px-6 py-3 bg-[#D6B36A] hover:bg-[#e4c583] text-[#101A33] rounded-xl font-bold text-xs shrink-0 transition-colors"
          >
            Create Free Account
          </button>
        </div>

      </div>
    </div>
  );
};
