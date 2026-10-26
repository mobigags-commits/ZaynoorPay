import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Send, 
  Download, 
  Receipt, 
  Smartphone, 
  QrCode, 
  Globe2, 
  ShieldCheck, 
  CreditCard, 
  Clock, 
  ArrowRight 
} from 'lucide-react';

export const FeaturesPage: React.FC = () => {
  const { navigate, language } = useApp();

  const featureList = [
    {
      icon: <Send className="w-5 h-5" />,
      title: 'Peer-to-Peer Instant Transfers',
      desc: 'Send money instantly by phone number, Zaynoor ID, or email with immediate SMS and cryptographic receipt dispatch.',
      link: '/send',
    },
    {
      icon: <Download className="w-5 h-5" />,
      title: 'Receive & Request Funds',
      desc: 'Generate custom payment links or share your personalized QR code for direct contactless collection.',
      link: '/receive',
    },
    {
      icon: <Receipt className="w-5 h-5" />,
      title: 'Automated Utility Bill Clearances',
      desc: 'Connect your electricity, natural gas, municipal water, broadband, and school fees for one-tap payments.',
      link: '/bills',
    },
    {
      icon: <Smartphone className="w-5 h-5" />,
      title: 'Mobile Top-ups & Data Bundles',
      desc: 'Instant prepaid recharge and postpaid bill payment for major domestic and international mobile networks.',
      link: '/topups',
    },
    {
      icon: <QrCode className="w-5 h-5" />,
      title: 'Merchant POS QR Payments',
      desc: 'Scan merchant QR codes at restaurants, retail stores, and transport terminals without handing over physical plastic.',
      link: '/qr-payments',
    },
    {
      icon: <Globe2 className="w-5 h-5" />,
      title: 'Cross-Border Authorized Remittance',
      desc: 'Direct remittance corridors from UK, Europe, UAE, Saudi Arabia, and USA with live mid-market exchange rates.',
      link: '/international-transfers',
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      title: 'Titanium Virtual & Physical Cards',
      desc: 'Issue instant virtual debit cards for global online subscriptions with configurable transaction limits.',
      link: '/dashboard',
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: 'Cryptographic Security & 2FA',
      desc: 'Double-entry balancing on every debit/credit, biometrics, TOTP two-factor authentication, and active session controls.',
      link: '/security',
    },
  ];

  return (
    <div className="py-12 bg-[#F4F6FA] text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#850D22]">
            Comprehensive Capabilities
          </span>
          <h1 className="text-4xl font-extrabold text-[#101A33] tracking-tight">
            Features Built for Complete Financial Agility
          </h1>
          <p className="text-sm text-slate-600">
            Every feature is backed by double-entry ledger verification, guaranteed idempotency, and high-availability endpoints.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureList.map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#101A33]/5 text-[#C8102E] flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-[#101A33]">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100">
                <button
                  onClick={() => navigate(item.link)}
                  className="text-xs font-bold text-[#850D22] hover:text-[#C8102E] inline-flex items-center gap-1"
                >
                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
