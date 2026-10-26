import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Store, ShieldCheck, AlertCircle, CheckCircle2, Split } from 'lucide-react';

export const MerchantPaymentsPage: React.FC = () => {
  const { performTransaction } = useApp();

  const [tillNumber, setTillNumber] = useState('781920');
  const [merchantName, setMerchantName] = useState('Al-Fatah Gourmet Superstore');
  const [amount, setAmount] = useState('64.50');
  const [splitCount, setSplitCount] = useState<number>(1);
  const [errorMsg, setErrorMsg] = useState('');

  const handlePayMerchant = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const parsed = parseFloat(amount);
    if (isNaN(parsed) || parsed <= 0) {
      setErrorMsg('Please specify a valid transaction amount.');
      return;
    }

    const perPerson = parsed / splitCount;

    const res = performTransaction({
      type: 'merchant_qr',
      amount: perPerson,
      currency: 'USD',
      recipient: `${merchantName} (Till #${tillNumber})`,
      category: 'merchant',
      note: splitCount > 1 ? `Split bill payment (1 of ${splitCount} shares)` : 'In-store POS merchant settlement',
    });

    if (!res.success) {
      setErrorMsg(res.error || 'Payment failed');
    }
  };

  const perPersonAmount = (parseFloat(amount || '0') / splitCount).toFixed(2);

  return (
    <div className="py-12 bg-[#F4F6FA] text-slate-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#850D22]">
            Point of Sale Payments
          </span>
          <h1 className="text-3xl font-extrabold text-[#101A33] tracking-tight">
            Pay In-Store Merchants
          </h1>
          <p className="text-xs text-slate-600">
            Pay registered merchant tills, supermarkets, dining, and fuel stations with instant till confirmations.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          
          {errorMsg && (
            <div className="p-3 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handlePayMerchant} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Merchant Till / Store ID</label>
                <input
                  type="text"
                  value={tillNumber}
                  onChange={(e) => setTillNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono"
                  required
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Store / Business Name</label>
                <input
                  type="text"
                  value={merchantName}
                  onChange={(e) => setMerchantName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                  required
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Total Bill Amount (USD)</label>
              <input
                type="number"
                step="0.01"
                min="0.50"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono text-base font-bold text-slate-900"
                required
              />
            </div>

            {/* Split Bill with Friends Feature */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <Split className="w-4 h-4 text-[#C8102E]" />
                  <span>Split Bill with Group</span>
                </span>
                <span className="text-[11px] text-slate-500">
                  {splitCount > 1 ? `${splitCount} Friends` : 'Single Payer'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {[1, 2, 3, 4, 5].map((cnt) => (
                  <button
                    key={cnt}
                    type="button"
                    onClick={() => setSplitCount(cnt)}
                    className={`py-1.5 px-3 rounded-lg border text-xs font-semibold ${splitCount === cnt ? 'bg-[#101A33] text-white border-[#101A33]' : 'bg-white border-slate-200 text-slate-600'}`}
                  >
                    {cnt === 1 ? 'Solo' : `${cnt}x`}
                  </button>
                ))}
              </div>
              {splitCount > 1 && (
                <div className="text-[11px] text-[#C8102E] font-medium pt-1">
                  Your individual share to pay: ${perPersonAmount} USD
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#C8102E] hover:bg-[#850D22] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Store className="w-4 h-4" />
              <span>Confirm & Pay ${perPersonAmount} to Till #{tillNumber}</span>
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};
