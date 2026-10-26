import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Cookie, ShieldCheck, X } from 'lucide-react';

export const CookieConsent: React.FC = () => {
  const { language, navigate } = useApp();
  const [show, setShow] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('zaynoor_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('zaynoor_cookie_consent', JSON.stringify({ essential: true, analytics: true, marketing: true }));
    setShow(false);
  };

  const handleAcceptEssential = () => {
    localStorage.setItem('zaynoor_cookie_consent', JSON.stringify({ essential: true, analytics: false, marketing: false }));
    setShow(false);
  };

  const handleSaveCustom = () => {
    localStorage.setItem('zaynoor_cookie_consent', JSON.stringify({ essential: true, analytics: analyticsEnabled, marketing: marketingEnabled }));
    setShow(false);
    setPreferencesOpen(false);
  };

  if (!show) return null;

  return (
    <aside
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-40 bg-white rounded-2xl shadow-xl border border-slate-200 p-5 text-slate-800 animate-in slide-in-from-bottom duration-300"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#D6B36A]/15 text-[#850D22]">
            <Cookie className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#101A33]">
              {language === 'ur' ? 'کوکیز اور رازداری کی ترجیحات' : 'Privacy & Cookie Choices'}
            </h4>
            <span className="text-[11px] text-slate-400">GDPR & ePrivacy Compliant</span>
          </div>
        </div>
        <button
          onClick={() => setShow(false)}
          className="text-slate-400 hover:text-slate-600 p-1"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
        {language === 'ur'
          ? 'ہم سیکیورٹی، سیشن تصدیق اور بہتر مالیاتی تجربے کے لیے ضروری کوکیز استعمال کرتے ہیں۔ آپ اپنی ترجیحات کو کنٹرول کر سکتے ہیں۔'
          : 'We utilize essential session tokens for security, authentication, and optimal payment flow. No unauthorized tracking cookies are stored without your consent.'}
      </p>

      {preferencesOpen && (
        <div className="my-3 pt-3 border-t border-slate-100 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-medium text-slate-800">Essential Security (Required)</span>
            <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-mono">Always Active</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-700">Performance & Analytics</span>
            <input
              type="checkbox"
              checked={analyticsEnabled}
              onChange={(e) => setAnalyticsEnabled(e.target.checked)}
              className="accent-[#C8102E] w-4 h-4 rounded cursor-pointer"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-700">Financial Insights & Ads</span>
            <input
              type="checkbox"
              checked={marketingEnabled}
              onChange={(e) => setMarketingEnabled(e.target.checked)}
              className="accent-[#C8102E] w-4 h-4 rounded cursor-pointer"
            />
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 mt-4">
        {preferencesOpen ? (
          <button
            onClick={handleSaveCustom}
            className="flex-1 py-2 px-3 bg-[#101A33] text-white rounded-xl text-xs font-semibold hover:bg-[#1B2947] transition-colors"
          >
            Save Preferences
          </button>
        ) : (
          <>
            <button
              onClick={handleAcceptAll}
              className="flex-1 py-2 px-3 bg-[#C8102E] text-white rounded-xl text-xs font-semibold hover:bg-[#850D22] transition-colors shadow-xs"
            >
              {language === 'ur' ? 'تمام قبول کریں' : 'Accept All'}
            </button>
            <button
              onClick={handleAcceptEssential}
              className="py-2 px-3 bg-slate-100 text-slate-700 rounded-xl text-xs font-medium hover:bg-slate-200 transition-colors"
            >
              {language === 'ur' ? 'صرف ضروری' : 'Essential Only'}
            </button>
            <button
              onClick={() => setPreferencesOpen(true)}
              className="text-[11px] text-slate-500 hover:text-slate-800 underline underline-offset-2 ml-auto"
            >
              Customize
            </button>
          </>
        )}
      </div>

      <div className="mt-2 text-right">
        <button
          onClick={() => {
            navigate('/cookie-policy');
            setShow(false);
          }}
          className="text-[10px] text-slate-400 hover:text-slate-600 underline"
        >
          Read Cookie Policy
        </button>
      </div>
    </aside>
  );
};
