import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div className="py-12 bg-[#F4F6FA] text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#850D22]">
            Legal Agreement
          </span>
          <h1 className="text-3xl font-extrabold text-[#101A33] tracking-tight">
            Terms & Conditions of Service
          </h1>
          <p className="text-xs text-slate-500 font-mono">
            Effective Date: October 24, 2026 · Standard Customer Agreement
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8 text-xs text-slate-700 leading-relaxed">
          
          <div className="space-y-3">
            <h2 className="text-base font-bold text-[#101A33]">1. Scope & Acceptance of Agreement</h2>
            <p>
              By creating a wallet account, accessing our mobile application, or authorizing any transaction on ZaynoorPay, you legally agree to be bound by these Terms and Conditions. If you do not accept these terms in full, you must not access the platform.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-[#101A33]">2. Sandbox Environment & Prototype Notice</h2>
            <p className="p-4 bg-amber-50 text-amber-900 border border-amber-200 rounded-xl leading-relaxed">
              <strong>MANDATORY NOTICE:</strong> The current deployment of ZaynoorPay operates in an interactive demonstration and sandbox mode. Balances, account deposits, and test transactions represent simulated double-entry ledger records and do not constitute real legal fiat money reserves until final statutory license activation by the competent Central Bank authority.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-[#101A33]">3. Account Eligibility & KYC Tiers</h2>
            <p>
              Users must be at least 18 years of age. You agree to provide accurate, truthful identity documentation during onboarding. Providing fraudulent identity papers or operating anonymous nominee accounts constitutes an immediate material breach and grounds for account freezing.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-[#101A33]">4. Transaction Authorizations & Irrevocability</h2>
            <p>
              Once an outgoing transaction is confirmed with your verified 6-digit transaction PIN, biometric authorization, or TOTP code, the double-entry transaction record is committed immediately and irrevocably to the settlement ledger. Users are solely responsible for ensuring recipient details are accurate prior to confirmation.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-[#101A33]">5. Prohibited Activities</h2>
            <p>
              You agree not to utilize ZaynoorPay for illegal gambling, unlicensed currency arbitrations, money laundering, darknet transactions, or circumvention of international trade sanctions.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-[#101A33]">6. Limitation of Liability & Governing Law</h2>
            <p>
              These Terms are governed by and construed in accordance with standard international commercial arbitration principles. In no event shall ZaynoorPay be liable for indirect, incidental, or consequential damages resulting from third-party network outages or telecom carrier interruptions.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
