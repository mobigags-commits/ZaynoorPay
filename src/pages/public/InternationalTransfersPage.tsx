import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CurrencyCode } from '../../types';
import { Globe2, ArrowRight, ShieldCheck, CheckCircle2, Clock, Landmark } from 'lucide-react';

export const InternationalTransfersPage: React.FC = () => {
  const { performTransaction, user } = useApp();

  const [fromCurrency, setFromCurrency] = useState<CurrencyCode>('USD');
  const [toCurrency, setToCurrency] = useState<CurrencyCode>('PKR');
  const [sendAmount, setSendAmount] = useState<number>(1000);
  const [recipientName, setRecipientName] = useState('Tariq Mahmood');
  const [destinationIban, setDestinationIban] = useState('PK36MEZN00099120491029');
  const [destinationBank, setDestinationBank] = useState('Meezan Bank Ltd');
  const [purpose, setPurpose] = useState('Family Support / Remittance');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Authorized corridors only
  const corridors = [
    { from: 'United States (USD)', to: 'Pakistan (PKR)', rate: 278.40, time: '< 2 mins', badge: 'Raast Direct' },
    { from: 'United Kingdom (GBP)', to: 'Pakistan (PKR)', rate: 356.50, time: '< 2 mins', badge: '1Link Authorized' },
    { from: 'United Arab Emirates (AED)', to: 'Pakistan (PKR)', rate: 75.80, time: '< 5 mins', badge: 'Instant Clearing' },
    { from: 'Saudi Arabia (SAR)', to: 'Pakistan (PKR)', rate: 74.20, time: '< 5 mins', badge: 'Direct Corridor' },
    { from: 'European Union (EUR)', to: 'Pakistan (PKR)', rate: 302.20, time: '< 10 mins', badge: 'SEPA Bridge' },
  ];

  const FX: Record<string, number> = {
    'USD_PKR': 278.40,
    'GBP_PKR': 356.50,
    'AED_PKR': 75.80,
    'SAR_PKR': 74.20,
    'EUR_PKR': 302.20,
    'USD_EUR': 0.92,
    'USD_GBP': 0.78,
  };

  const getRate = (f: string, t: string) => {
    if (f === t) return 1.0;
    const pair = `${f}_${t}`;
    return FX[pair] || 1.0;
  };

  const rate = getRate(fromCurrency, toCurrency);
  const fee = fromCurrency === 'USD' ? 1.50 : 2.00;
  const targetPayout = (sendAmount * rate).toFixed(2);

  const handleExecuteRemittance = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    const res = performTransaction({
      type: 'send',
      amount: sendAmount,
      currency: fromCurrency,
      recipient: `${recipientName} (${destinationBank} - ${toCurrency})`,
      recipientAccount: destinationIban,
      category: 'transfer',
      note: `Cross-border Remittance: ${purpose} (Exchanged at ${rate} ${toCurrency}/${fromCurrency})`,
      customFee: fee,
    });

    setIsSubmitting(false);

    if (!res.success) {
      setErrorMsg(res.error || 'Remittance execution failed');
    }
  };

  return (
    <div className="py-12 bg-[#F4F6FA] text-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#850D22]">
            Licensed Direct Corridors Only
          </span>
          <h1 className="text-4xl font-extrabold text-[#101A33] tracking-tight">
            International Remittance
          </h1>
          <p className="text-sm text-slate-600">
            Real-time mid-market foreign exchange. Transparent fees with zero hidden spread deductions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Transfer Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            
            <h2 className="text-base font-bold text-[#101A33] flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-[#C8102E]" />
              <span>Remittance Settlement Ticket</span>
            </h2>

            {errorMsg && (
              <div className="p-3 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleExecuteRemittance} className="space-y-4 text-xs">
              
              {/* Send Amount & Currency */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1">You Send (Source Currency)</label>
                <div className="flex rounded-xl border border-slate-300 overflow-hidden focus-within:border-[#C8102E]">
                  <input
                    type="number"
                    step="1"
                    min="10"
                    value={sendAmount}
                    onChange={(e) => setSendAmount(Math.max(10, Number(e.target.value)))}
                    className="flex-1 px-4 py-2.5 font-mono text-base font-bold text-slate-900 focus:outline-hidden"
                    required
                  />
                  <select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value as CurrencyCode)}
                    className="px-4 py-2.5 bg-slate-100 font-semibold border-l border-slate-200 text-[#101A33] focus:outline-hidden cursor-pointer"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="AED">AED (د.إ)</option>
                    <option value="SAR">SAR (﷼)</option>
                  </select>
                </div>
              </div>

              {/* Recipient Gets */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Recipient Receives (Guaranteed Payout)</label>
                <div className="flex rounded-xl border border-slate-300 bg-slate-50 overflow-hidden">
                  <input
                    type="text"
                    readOnly
                    value={targetPayout}
                    className="flex-1 px-4 py-2.5 font-mono text-base font-bold text-[#101A33] focus:outline-hidden"
                  />
                  <select
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value as CurrencyCode)}
                    className="px-4 py-2.5 bg-slate-100 font-semibold border-l border-slate-200 text-[#101A33] focus:outline-hidden cursor-pointer"
                  >
                    <option value="PKR">PKR (Rs)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>
              </div>

              {/* Rates preview */}
              <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-slate-600 border border-slate-100">
                <div className="flex justify-between">
                  <span>Guaranteed FX Rate:</span>
                  <span className="font-mono font-bold text-slate-900">1 {fromCurrency} = {rate} {toCurrency}</span>
                </div>
                <div className="flex justify-between">
                  <span>Transfer Fee:</span>
                  <span className="font-mono text-emerald-600 font-semibold">{fromCurrency} {fee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Speed:</span>
                  <span className="font-semibold text-[#101A33]">Instant (Under 2 Minutes)</span>
                </div>
              </div>

              {/* Recipient Details */}
              <div className="space-y-3 pt-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Recipient Full Legal Name</label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Destination Bank</label>
                    <input
                      type="text"
                      value={destinationBank}
                      onChange={(e) => setDestinationBank(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Account # or IBAN</label>
                    <input
                      type="text"
                      value={destinationIban}
                      onChange={(e) => setDestinationIban(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Remittance Purpose (Mandatory for Compliance)</label>
                  <select
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden"
                  >
                    <option value="Family Support / Remittance">Family Support & Maintenance</option>
                    <option value="Freelance & IT Services Payout">Freelance & IT Services Payout</option>
                    <option value="Education Tuition & Medical">Education Tuition & Medical</option>
                    <option value="Personal Savings Transfer">Personal Savings Transfer</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#C8102E] hover:bg-[#850D22] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-[#D6B36A]" />
                <span>{isSubmitting ? 'Verifying Compliance...' : `Send ${fromCurrency} ${sendAmount} Now`}</span>
              </button>

            </form>
          </div>

          {/* Right: Supported corridors list */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-[#101A33] uppercase tracking-wider">
                Authorized Live Corridors
              </h3>

              <div className="space-y-2.5 text-xs">
                {corridors.map((c, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                    <div className="flex items-center justify-between font-bold text-[#101A33]">
                      <span>{c.from} → {c.to}</span>
                      <span className="text-[10px] bg-[#D6B36A]/20 text-[#850D22] px-2 py-0.5 rounded font-mono">
                        {c.badge}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-500 text-[11px]">
                      <span>Rate: 1 = {c.rate} PKR</span>
                      <span className="flex items-center gap-1 text-emerald-700">
                        <Clock className="w-3 h-3" /> {c.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 text-xs space-y-2 text-slate-600">
              <span className="font-bold text-[#101A33] block">Automated Regulatory Reporting</span>
              <p className="text-[11px] leading-relaxed">
                Transactions comply with Financial Action Task Force (FATF) and Central Bank Foreign Exchange Remittance Regulations.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
