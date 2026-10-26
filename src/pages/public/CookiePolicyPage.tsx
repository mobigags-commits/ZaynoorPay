import React from 'react';
import { Cookie, ShieldCheck } from 'lucide-react';

export const CookiePolicyPage: React.FC = () => {
  return (
    <div className="py-12 bg-[#F4F6FA] text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#850D22]">
            Cookies & Local Storage
          </span>
          <h1 className="text-3xl font-extrabold text-[#101A33] tracking-tight">
            Cookie & Tracking Policy
          </h1>
          <p className="text-xs text-slate-500 font-mono">
            Compliance Standard: ePrivacy Directive (Directive 2002/58/EC) & GDPR
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8 text-xs text-slate-700 leading-relaxed">
          
          <div className="space-y-3">
            <h2 className="text-base font-bold text-[#101A33]">1. What are Cookies & Local Tokens?</h2>
            <p>
              Cookies and browser local storage tokens are small text strings saved on your device when you interact with our web applications. They allow our systems to recognize your authenticated session, remember your language preference (English or Urdu), and safeguard against cross-site request forgery (CSRF).
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-[#101A33]">2. The Cookies We Deploy</h2>
            
            <div className="space-y-3 pt-2">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="font-bold text-[#101A33] block">Strictly Necessary Security Cookies (Mandatory)</span>
                <p className="text-slate-600">
                  Essential for signing in, maintaining encrypted TLS sessions, and validating double-entry financial inputs. These cannot be disabled.
                </p>
                <span className="text-[10px] font-mono text-slate-400">Tokens: `zaynoor_session`, `csrf_token`, `auth_fingerprint` · Duration: Session to 30 days</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="font-bold text-[#101A33] block">Functional & Localization Cookies (Optional)</span>
                <p className="text-slate-600">
                  Preserve your user interface customization such as your preferred language (English or Urdu) and active wallet layout theme (Light or Dark).
                </p>
                <span className="text-[10px] font-mono text-slate-400">Tokens: `zaynoor_lang`, `zaynoor_theme`, `zaynoor_app_mode` · Duration: 1 year</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="font-bold text-[#101A33] block">Analytics & Fraud Detection Cookies (Optional)</span>
                <p className="text-slate-600">
                  Provide aggregate insights on page latency, transaction completion rates, and failed login anomalies without personally profiling individuals.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-[#101A33]">3. How You Can Control Cookies</h2>
            <p>
              You may adjust your cookie preferences at any time using our floating Cookie Choices panel at the bottom of the screen, or through your web browser settings. Disabling necessary session tokens may restrict access to authenticated wallet dashboards.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
