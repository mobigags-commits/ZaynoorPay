import React from 'react';
import { ShieldAlert, AlertTriangle, FileText, CheckCircle2, Building, Scale, Lock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DisclaimerPage: React.FC = () => {
  const { language } = useApp();
  const isUrdu = language === 'ur';

  return (
    <div className="py-12 md:py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold mb-4">
            <Scale className="w-3.5 h-3.5" />
            <span>{isUrdu ? "قانونی و ریگولیٹری ڈس کلیمر" : "Legal & Regulatory Compliance Notice"}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isUrdu ? "ڈس کلیمر اور مالیاتی انتباہ" : "Regulatory Disclaimer & Risk Disclosure"}
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
            {isUrdu
              ? "زینور پے کے ذریعے فراہم کی جانے والی مالیاتی خدمات، لائسنسنگ کے دائرہ کار اور رسک مینیجمنٹ کے اصول۔"
              : "Clear disclosures regarding regulatory status, banking partnerships, transaction risks, and custodial clearing rails."}
          </p>
          <div className="mt-2 text-xs text-slate-600 dark:text-slate-300">
            Last Updated: March 30, 2026 • Document Version 2.5
          </div>
        </div>

        {/* Highlight Card */}
        <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-slate-900 dark:text-slate-200 mb-8 flex items-start gap-4">
          <ShieldAlert className="w-7 h-7 text-amber-600 dark:text-amber-400 shrink-0 mt-1" />
          <div className="space-y-1 text-sm">
            <h4 className="font-bold text-amber-800 dark:text-amber-300">
              {isUrdu ? "ضروری آگاہی" : "Essential Notice to Consumers and Businesses"}
            </h4>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              {isUrdu
                ? "زینور پے کوئی غیر مجاز بینک نہیں ہے بلکہ ایک ٹیکنالوجی انٹرفیس ہے جو اسٹیٹ بینک آف پاکستان اور گلوبل کارسپانڈنٹ بینکس کے مجاز لائسنس یافتہ پارٹنرز کے ذریعے فنڈز کی سیٹلمنٹ کرتا ہے۔"
                : "ZaynoorPay operates as a regulated financial technology platform and authorized Electronic Money Institution (EMI) technology provider. Deposit accounts, safeguarding reserves, and cross-border settlement are held in segregated trust accounts with authorized Tier-1 banking partners."}
            </p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-8 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
              <Building className="w-5 h-5 text-[#C8102E]" />
              1. Non-Banking Entity & Custodial Safeguarding
            </h2>
            <p>
              ZaynoorPay does not engage in speculative lending, fractional reserve investment, or proprietary trading with customer deposits. All customer funds deposited via bank transfer, Raast, card rails, or cashout agents are protected under strict 100% safeguarding rules, held in segregated escrow accounts with licensed clearing banks.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              2. Foreign Exchange (FX) & Cross-Border Volatility
            </h2>
            <p>
              International transfers are executed at agreed, locked-in exchange rates shown prior to transaction authentication. Exchange rates reflect interbank bid/ask spreads. ZaynoorPay discloses all applicable partner network fees and transparently itemizes regulatory withholding taxes (if applicable under local jurisdiction laws).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
              <Lock className="w-5 h-5 text-emerald-500" />
              3. Anti-Money Laundering (AML) & Sanctions Compliance
            </h2>
            <p>
              To safeguard our ecosystem against financial crime, terror financing, and fraud, all accounts undergo automated and manual Know Your Customer (KYC) identity verification in compliance with FATF guidelines. ZaynoorPay reserves the right to request proof of funds or freeze transactions pending enhanced due diligence.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-blue-500" />
              4. Zero Investment & Automated Founder Monetization
            </h2>
            <p>
              Platform owner and administrative revenue streams detailed on ZaynoorPay (including Google AdSense, bill aggregator kickbacks, telecom airtime margins, and merchant discount rates) represent legitimate B2B business commissions. They require no speculative seed capital or pyramid recruitment.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-5 h-5 text-purple-500" />
              5. Dispute Resolution & Customer Redressal
            </h2>
            <p>
              If you experience any unauthorized debit, failed utility bill clearance, or delayed remittance, our 24/7 dedicated dispute tribunal is reachable through our Support Center or via email at <span className="text-[#C8102E] font-medium">mobigags@gmail.com</span>. Formal arbitration policies comply with applicable Consumer Protection Charters.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-10 p-6 rounded-2xl bg-slate-100 dark:bg-slate-900 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Have questions regarding legal terms or compliance?
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.location.hash = '/terms'}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
            >
              Terms of Service
            </button>
            <button
              onClick={() => window.location.hash = '/contact'}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#C8102E] text-white hover:bg-[#850D22] transition shadow-xs"
            >
              Contact Legal Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
