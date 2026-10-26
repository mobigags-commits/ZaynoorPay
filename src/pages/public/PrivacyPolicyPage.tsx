import React from 'react';
import { ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="py-12 bg-[#F4F6FA] text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#850D22]">
            Data Sovereignty & Compliance
          </span>
          <h1 className="text-3xl font-extrabold text-[#101A33] tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500 font-mono">
            Last Updated & Verified: October 24, 2026 · Version 3.4
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8 text-xs text-slate-700 leading-relaxed">
          
          <div className="space-y-3">
            <h2 className="text-base font-bold text-[#101A33]">1. Commitment to User Data Privacy</h2>
            <p>
              ZaynoorPay Global Technologies Inc. ("ZaynoorPay", "we", "us", or "our") is dedicated to protecting your fundamental right to privacy. We process personal and financial identity information strictly in compliance with applicable data protection laws, including the General Data Protection Regulation (GDPR) and national central bank regulatory guidelines.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-[#101A33]">2. Categories of Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>Identity Data:</strong> Full legal name, date of birth, nationality, national identity card number (CNIC), and passport images submitted during KYC verification.</li>
              <li><strong>Contact Information:</strong> Verified mobile phone number, email address, and residential postal address.</li>
              <li><strong>Financial Ledger Data:</strong> Inbound funding source details, recipient accounts, transaction hashes, timestamps, and utility consumer reference numbers.</li>
              <li><strong>Device & Telemetry Data:</strong> IP addresses, browser fingerprint, operating system, and login session identifiers utilized strictly for fraud prevention.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-[#101A33]">3. How We Protect Your Sensitive Credentials</h2>
            <p>
              We implement industry-standard cryptographic safeguards:
            </p>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1 font-mono text-[11px] text-slate-800">
              <p>• Data at Rest: Encrypted using AES-256 GCM with rotating hardware security module (HSM) keys.</p>
              <p>• Data in Transit: TLS 1.3 enforced across all public endpoints with strict HSTS preloading.</p>
              <p>• PIN Protection: Salted and hashed using Argon2id; zero plain-text PINs are ever accessible.</p>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-[#101A33]">4. Data Retention & Regulatory Mandates</h2>
            <p>
              In accordance with Anti-Money Laundering (AML) and Counter-Terrorism Financing statutory requirements, financial transaction records and identity verification logs are securely archived for a minimum statutory period of five (5) to ten (10) years following account closure.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-[#101A33]">5. Your Legal Rights</h2>
            <p>
              Subject to applicable statutory exemptions, you hold the right to request access to your stored personal data, request rectification of inaccurate records, and obtain a copy of your full transaction ledger in structured machine-readable format (CSV/JSON).
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-base font-bold text-[#101A33]">6. Data Protection Officer (DPO) Contact</h2>
            <p>
              For inquiries or rights requests, contact our dedicated Data Privacy Desk at <strong className="text-slate-900 font-mono">dpo@zaynoorpay.com</strong>.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
