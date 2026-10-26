import React from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Lock, Smartphone, AlertTriangle, KeyRound, CheckCircle, FileText, ArrowRight } from 'lucide-react';

export const SecurityCenterPage: React.FC = () => {
  const { navigate } = useApp();

  const securityPillars = [
    {
      icon: <Lock className="w-6 h-6 text-[#C8102E]" />,
      title: 'Double-Entry Cryptographic Balance Ledger',
      desc: 'Our ledger requires equal and opposite debit/credit entries for every transaction. Client balances are strictly derived from immutable transaction histories.',
    },
    {
      icon: <KeyRound className="w-6 h-6 text-[#D6B36A]" />,
      title: 'Time-Based Two-Factor Authentication (TOTP)',
      desc: 'Protect withdrawals and profile changes with authenticator apps (Google Authenticator, 1Password, Authy) or hardware security keys.',
    },
    {
      icon: <Smartphone className="w-6 h-6 text-[#101A33]" />,
      title: 'Biometric & Device Session Management',
      desc: 'Sign in with Touch ID or Face ID. View active browser and mobile sessions with one-tap instant remote revocation.',
    },
    {
      icon: <Shield className="w-6 h-6 text-emerald-600" />,
      title: 'Zero-Tolerance Fraud & Velocity Rules',
      desc: 'Real-time velocity monitors flag abnormal spending patterns, sudden geo-ip anomalies, and repeated failed PIN challenges.',
    },
  ];

  return (
    <div className="py-12 bg-[#F4F6FA] text-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#850D22]">
            Zero-Trust Architecture
          </span>
          <h1 className="text-4xl font-extrabold text-[#101A33] tracking-tight">
            Security & Data Protection Center
          </h1>
          <p className="text-sm text-slate-600">
            How ZaynoorPay shields your wealth, private identity, and digital transactions across all endpoints.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {securityPillars.map((p, idx) => (
            <div key={idx} className="p-7 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                {p.icon}
              </div>
              <h3 className="text-base font-bold text-[#101A33]">{p.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* User Best Practices Box */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#850D22]">User Hygiene</span>
            <h2 className="text-2xl font-bold text-[#101A33] mt-1">Five Rules to Keep Your Wallet Secure</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-slate-600">
            <div className="space-y-1.5 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-bold text-[#101A33] block">1. Never Share Your 6-Digit Transaction PIN</span>
              <p>ZaynoorPay employees will never ask for your PIN, OTP, or password over the phone, email, or chat.</p>
            </div>
            <div className="space-y-1.5 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-bold text-[#101A33] block">2. Enable Two-Factor Authentication (2FA)</span>
              <p>Activate TOTP in your security settings to require a 6-digit rolling code on all outgoing transfers.</p>
            </div>
            <div className="space-y-1.5 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-bold text-[#101A33] block">3. Verify Recipient Identifiers Carefully</span>
              <p>Double-check recipient phone numbers, Zaynoor IDs, or bank IBANs before authorizing settlement.</p>
            </div>
            <div className="space-y-1.5 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-bold text-[#101A33] block">4. Audit Your Active Device Sessions</span>
              <p>Review logged-in browsers in your Security Dashboard and revoke unknown or expired devices promptly.</p>
            </div>
          </div>
        </div>

        {/* Report Suspicious Activity Callout */}
        <div className="p-8 rounded-3xl bg-[#101A33] text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>Suspect Unauthorized Activity?</span>
            </div>
            <h3 className="text-xl font-bold">Freeze Your Wallet or Report Phishing Immediately</h3>
            <p className="text-xs text-slate-300">Our 24/7 financial crime desk can lock compromised credentials in under 30 seconds.</p>
          </div>
          <button
            onClick={() => navigate('/contact')}
            className="px-6 py-3 bg-[#C8102E] hover:bg-[#850D22] text-white rounded-xl font-bold text-xs shrink-0 transition-colors cursor-pointer"
          >
            Emergency Contact Desk
          </button>
        </div>

      </div>
    </div>
  );
};
