import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Smartphone, Zap, Wifi, AlertCircle, CheckCircle2 } from 'lucide-react';

export const MobileTopupsPage: React.FC = () => {
  const { performTransaction } = useApp();

  const carriers = [
    { name: 'Jazz 4G', color: 'from-amber-600 to-red-600', code: 'jazz' },
    { name: 'Telenor Pakistan', color: 'from-blue-600 to-sky-600', code: 'telenor' },
    { name: 'Zong 4G', color: 'from-emerald-600 to-teal-600', code: 'zong' },
    { name: 'Ufone 4G', color: 'from-orange-600 to-amber-600', code: 'ufone' },
    { name: 'Vodafone Global', color: 'from-rose-600 to-red-700', code: 'vodafone' },
  ];

  const packages = [
    { title: 'Super Weekly 10GB', amount: 8.50, desc: '10GB Data + 1000 On-net Mins' },
    { title: 'Monthly Max 50GB', amount: 25.00, desc: '50GB Data + Unlimited Calling' },
    { title: 'Standard Top-up Load', amount: 15.00, desc: 'Direct Balance Airtime Credit' },
    { title: 'Quick Mini Load', amount: 5.00, desc: 'Emergency Airtime Recharge' },
  ];

  const [selectedCarrier, setSelectedCarrier] = useState(carriers[0]);
  const [phoneNumber, setPhoneNumber] = useState('+92 300 8492019');
  const [selectedPackage, setSelectedPackage] = useState(packages[1]);
  const [errorMsg, setErrorMsg] = useState('');

  const handleTopup = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const res = performTransaction({
      type: 'mobile_topup',
      amount: selectedPackage.amount,
      currency: 'USD',
      recipient: `${selectedCarrier.name} (${phoneNumber})`,
      recipientAccount: phoneNumber,
      category: 'mobile',
      note: `${selectedPackage.title} recharge`,
    });

    if (!res.success) {
      setErrorMsg(res.error || 'Recharge failed');
    }
  };

  return (
    <div className="py-12 bg-[#F4F6FA] text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#850D22]">
            Instant Airtime & Bundles
          </span>
          <h1 className="text-3xl font-extrabold text-[#101A33] tracking-tight">
            Mobile Top-ups & Data
          </h1>
          <p className="text-xs text-slate-600">
            Recharge any prepaid number or pay postpaid mobile cellular bills in under 15 seconds.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          
          {/* Carrier Pills */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">Select Mobile Network</label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {carriers.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => setSelectedCarrier(c)}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${selectedCarrier.code === c.code ? 'border-[#C8102E] bg-rose-50 text-[#C8102E]' : 'border-slate-200 text-slate-700 hover:border-slate-300'}`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleTopup} className="space-y-5 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Mobile Phone Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono text-sm"
                required
              />
            </div>

            {/* Package Grid */}
            <div>
              <label className="font-semibold text-slate-700 block mb-2">Select Bundle or Recharge Plan</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {packages.map((pkg, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedPackage(pkg)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${selectedPackage.title === pkg.title ? 'border-[#C8102E] bg-rose-50/20 ring-1 ring-[#C8102E]' : 'border-slate-200 hover:border-slate-300'}`}
                  >
                    <div>
                      <span className="font-bold text-slate-900 block">{pkg.title}</span>
                      <span className="text-[10px] text-slate-500">{pkg.desc}</span>
                    </div>
                    <span className="font-mono font-bold text-sm text-[#C8102E]">
                      ${pkg.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#C8102E] hover:bg-[#850D22] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              <span>Confirm & Recharge ${selectedPackage.amount.toFixed(2)} USD</span>
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};
