import React from 'react';
import { Eye, Keyboard, Globe, Sparkles, CheckCircle2 } from 'lucide-react';

export const AccessibilityStatementPage: React.FC = () => {
  return (
    <div className="py-12 bg-[#F4F6FA] text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#850D22]">
            Universal Inclusion
          </span>
          <h1 className="text-3xl font-extrabold text-[#101A33] tracking-tight">
            Accessibility Statement
          </h1>
          <p className="text-xs text-slate-500 font-mono">
            Standard: Web Content Accessibility Guidelines (WCAG) 2.1 Level AA Conformance
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8 text-xs text-slate-700 leading-relaxed">
          
          <div className="space-y-3">
            <h2 className="text-base font-bold text-[#101A33]">Our Accessibility Commitment</h2>
            <p>
              At ZaynoorPay, we firmly believe that digital financial independence must be accessible to everyone, regardless of ability, neurodivergence, or device constraints. We actively design, test, and engineer our user interfaces to adhere strictly to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#101A33]">
                <Eye className="w-4 h-4 text-[#C8102E]" />
                <span>Color Contrast & Typography</span>
              </div>
              <p className="text-slate-600">
                All foreground text meets or exceeds a minimum 4.5:1 contrast ratio against background surfaces (3:1 for large display titles). Status indicators never rely on color alone.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#101A33]">
                <Keyboard className="w-4 h-4 text-[#101A33]" />
                <span>Keyboard Navigability</span>
              </div>
              <p className="text-slate-600">
                Every interactive control, button, input, tab, and dialog is reachable and operable via standard keyboard tabs and Enter/Space keys with distinct visible focus rings.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#101A33]">
                <Globe className="w-4 h-4 text-[#D6B36A]" />
                <span>Bilingual RTL/LTR Architecture</span>
              </div>
              <p className="text-slate-600">
                Full bidirectional layout support ensures authentic typography and logical flow for both Left-to-Right (English) and Right-to-Left (Urdu) readers.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#101A33]">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Screen Reader Optimization</span>
              </div>
              <p className="text-slate-600">
                Explicit ARIA labels, semantic landmark regions (`header`, `main`, `footer`), and live status announcements ensure compatibility with NVDA, VoiceOver, and JAWS.
              </p>
            </div>

          </div>

          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-base font-bold text-[#101A33]">Feedback & Reporting Accessibility Barriers</h2>
            <p>
              If you experience any accessibility barrier while operating ZaynoorPay, please notify our accessibility coordinator directly at <strong className="font-mono text-slate-900">accessibility@zaynoorpay.com</strong>. We commit to responding within two business days.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
