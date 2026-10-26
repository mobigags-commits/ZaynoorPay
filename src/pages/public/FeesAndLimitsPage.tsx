import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, ArrowRight, Check } from 'lucide-react';

export const FeesAndLimitsPage: React.FC = () => {
  const { navigate, user } = useApp();

  const tiers = [
    {
      level: 'Tier 1 (Basic)',
      requirement: 'Mobile number or email verification',
      dailyLimit: '$500 USD (PKR 140,000)',
      monthlyLimit: '$2,500 USD (PKR 700,000)',
      maxBalance: '$1,000 USD',
      features: ['P2P Wallet Transfers', 'Utility Bill Payments', 'Mobile Top-ups'],
      highlight: false,
    },
    {
      level: 'Tier 2 (Verified Citizen)',
      requirement: 'Government ID card or Passport selfie',
      dailyLimit: '$5,000 USD (PKR 1,400,000)',
      monthlyLimit: '$50,000 USD (PKR 14,000,000)',
      maxBalance: '$25,000 USD',
      features: ['All Tier 1 features', 'International Remittance in/out', 'Titanium Virtual Debit Card', 'ATM Cardless Cashouts'],
      highlight: true,
    },
    {
      level: 'Tier 3 (Commercial & Merchant)',
      requirement: 'Tax Registration (NTN/EIN) & Corporate Bank Statement',
      dailyLimit: '$50,000 USD (PKR 14,000,000)',
      monthlyLimit: 'Unlimited / Custom Volume',
      maxBalance: 'Unlimited',
      features: ['All Tier 2 features', 'Dedicated Corporate Account Manager', 'Merchant POS Gateway API', 'Bulk Salary Payouts'],
      highlight: false,
    },
  ];

  const feeSchedule = [
    { service: 'Internal Zaynoor-to-Zaynoor Transfer', fee: 'FREE ($0.00)', notes: 'Real-time settlement between any two wallets' },
    { service: 'Electricity, Gas & Water Bill Payments', fee: 'FREE ($0.00)', notes: 'Zero consumer convenience surcharges' },
    { service: 'Mobile Cellular Top-up & Bundles', fee: 'FREE ($0.00)', notes: 'Direct airtime face value' },
    { service: 'Inbound Bank Wire Deposit', fee: 'FREE ($0.00)', notes: 'Zero platform fee (intermediary bank wire fees may apply)' },
    { service: 'Debit/Credit Card Top-up', fee: '1.25%', notes: 'Standard interchange & acquiring pass-through' },
    { service: 'Interbank Outbound Transfer (1Link/ACH)', fee: '$0.50 (PKR 50)', notes: 'Network switch clearance fee' },
    { service: 'International Remittance Transfer', fee: '$1.50 flat', notes: 'Mid-market FX quote provided upfront' },
    { service: 'Cardless ATM Cash Out', fee: '$1.00 (PKR 100)', notes: 'ATM terminal dispensing fee' },
  ];

  return (
    <div className="py-12 bg-[#F4F6FA] text-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#850D22]">
            Radical Transparency
          </span>
          <h1 className="text-4xl font-extrabold text-[#101A33] tracking-tight">
            Fees and Account Limits
          </h1>
          <p className="text-sm text-slate-600">
            No surprise monthly maintenance costs, inactivity penalties, or hidden currency conversion fees.
          </p>
        </div>

        {/* Tier Cards Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((t, i) => (
            <div
              key={i}
              className={`p-6 sm:p-7 rounded-2xl border transition-all flex flex-col justify-between ${t.highlight ? 'bg-white border-[#D6B36A] shadow-xl ring-2 ring-[#D6B36A]/40' : 'bg-white border-slate-200 shadow-sm'}`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-[#101A33]">{t.level}</h3>
                  {t.highlight && (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#D6B36A] text-[#101A33] px-2 py-0.5 rounded">
                      POPULAR
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-500 pb-3 border-b border-slate-100">
                  <span className="font-semibold block text-slate-700">Verification Requirement:</span>
                  <span>{t.requirement}</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Daily Transfer Limit:</span>
                    <span className="font-mono font-bold text-slate-900">{t.dailyLimit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Monthly Limit:</span>
                    <span className="font-mono font-bold text-slate-900">{t.monthlyLimit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Max Wallet Holding:</span>
                    <span className="font-mono font-bold text-slate-900">{t.maxBalance}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                  <span className="font-bold text-[#101A33] block">Included Features:</span>
                  {t.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-2 text-slate-600">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-4">
                <button
                  onClick={() => navigate('/kyc-verification')}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer ${t.highlight ? 'bg-[#C8102E] text-white hover:bg-[#850D22]' : 'bg-slate-100 text-[#101A33] hover:bg-slate-200'}`}
                >
                  {user.tier === (i + 1) ? 'Current Active Tier' : 'Upgrade to this Tier'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Complete Transparent Fee Table */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-[#101A33]">Comprehensive Fee Schedule</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4 font-semibold">Service Operation</th>
                  <th className="py-3 px-4 font-semibold">Standard Fee</th>
                  <th className="py-3 px-4 font-semibold">Notes & Timing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {feeSchedule.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-semibold text-slate-900">{row.service}</td>
                    <td className="py-3 px-4 font-mono font-bold text-[#C8102E]">{row.fee}</td>
                    <td className="py-3 px-4 text-slate-500">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
