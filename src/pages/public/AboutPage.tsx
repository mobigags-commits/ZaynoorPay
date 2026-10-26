import React from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../../components/brand/Logo';
import { Shield, Sparkles, Building2, Users2, Lock, Award, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigate, language } = useApp();

  return (
    <div className="py-12 bg-[#F4F6FA] text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101A33]/5 text-[#101A33] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#D6B36A]" />
            <span>The Concept of Noor & Digital Clarity</span>
          </div>
          <h1 className="text-4xl font-extrabold text-[#101A33] tracking-tight">
            {language === 'ur' ? 'ہمارے بارے میں — زینور پے' : 'About ZaynoorPay'}
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            {language === 'ur'
              ? 'زینور پے کا قیام مالیاتی معاملات میں غیر ضروری رکاوٹوں، پوشیدہ کٹوتیوں اور تاخیر کو ختم کرنے کے لیے عمل میں لایا گیا ہے۔ ہم شفافیت اور سیکیورٹی پر یقین رکھتے ہیں۔'
              : 'Rooted in the foundational principle of "Noor" (light, clarity, and truth), ZaynoorPay is built to eliminate opaque financial fees, slow legacy bank settlement cycles, and high cross-border remittance costs.'}
          </p>
        </div>

        {/* Visual Showcase: Fintech Architecture Room */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200">
          <img
            src="/src/assets/images/about_fintech_team_1792997932115.jpg"
            alt="ZaynoorPay Financial Operations Center and Engineering Infrastructure"
            className="w-full h-80 lg:h-96 object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101A33] via-[#101A33]/40 to-transparent flex items-end p-8 text-white">
            <div className="max-w-xl space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-[#D6B36A] uppercase font-bold">
                INSTITUTIONAL PRECISION
              </span>
              <h2 className="text-xl sm:text-2xl font-bold">Built by Systems Engineers & Compliance Pioneers</h2>
              <p className="text-xs text-slate-200">
                Operating with automated double-entry verification, immutable audit ledgers, and zero-trust identity isolation.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-7 bg-white rounded-2xl border border-slate-200 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#C8102E]/10 text-[#C8102E] flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#101A33]">Trust & Cryptographic Proof</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every balance update is guaranteed by double-entry ledger math. Never trust an unverified client balance.
            </p>
          </div>

          <div className="p-7 bg-white rounded-2xl border border-slate-200 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#D6B36A]/20 text-[#850D22] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#101A33]">Noor (Radical Clarity)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Zero obscure FX markups or surprise maintenance charges. You see exactly what you pay before clicking submit.
            </p>
          </div>

          <div className="p-7 bg-white rounded-2xl border border-slate-200 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#101A33]/10 text-[#101A33] flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#101A33]">Authorized Corridors</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We operate strictly within verified, authorized regulatory remittance channels.
            </p>
          </div>

        </div>

        {/* Executive Leadership & Governance */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200 space-y-6">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#850D22]">Governance</span>
            <h3 className="text-2xl font-bold text-[#101A33] mt-1">Regulatory & Risk Posture</h3>
            <p className="text-xs text-slate-600 mt-2">
              Our financial risk architecture is designed in consultation with industry compliance veterans across anti-money laundering (AML), countering financing of terrorism (CFT), and data sovereignty frameworks.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100 text-xs">
            <div>
              <span className="font-bold text-[#101A33] block">Sanctions Screening</span>
              <span className="text-slate-500">Real-time OFAC & UN lists</span>
            </div>
            <div>
              <span className="font-bold text-[#101A33] block">Data Residency</span>
              <span className="text-slate-500">Tier-4 Sovereign datacenters</span>
            </div>
            <div>
              <span className="font-bold text-[#101A33] block">Idempotent Rail</span>
              <span className="text-slate-500">Zero double-spending</span>
            </div>
            <div>
              <span className="font-bold text-[#101A33] block">Two-Factor Core</span>
              <span className="text-slate-500">FIDO2 / Hardware token ready</span>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-8 rounded-3xl bg-[#101A33] text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold">Experience the Future of Digital Value</h3>
            <p className="text-xs text-slate-300">Set up your personal multi-currency wallet in under two minutes.</p>
          </div>
          <button
            onClick={() => navigate('/signup')}
            className="px-6 py-3 bg-[#D6B36A] hover:bg-[#e4c583] text-[#101A33] rounded-xl font-bold text-xs transition-colors shrink-0"
          >
            Open Free Wallet
          </button>
        </div>

      </div>
    </div>
  );
};
