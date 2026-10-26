import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CurrencyCode } from '../../types';
import { Landmark, Smartphone, AlertCircle, CheckCircle2, ShieldCheck, KeyRound } from 'lucide-react';

export const WithdrawMoneyPage: React.FC = () => {
  const { user, performTransaction } = useApp();
  const [withdrawMode, setWithdrawMode] = useState<'bank' | 'atm'>('bank');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [destinationIban, setDestinationIban] = useState('PK36HABB00012398491029');
  const [bankName, setBankName] = useState('Habib Bank Ltd');
  const [atmCode, setAtmCode] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const fee = currency === 'USD' ? 1.00 : 100.00;

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setAtmCode(null);

    const parsed = parseFloat(amount);
    if (isNaN(parsed) || parsed <= 0) {
      setErrorMsg('Please specify a withdrawal amount greater than zero.');
      return;
    }

    const res = performTransaction({
      type: 'withdraw',
      amount: parsed,
      currency,
      recipient: withdrawMode === 'bank' ? `${bankName} (${destinationIban.slice(0, 4)}...${destinationIban.slice(-4)})` : 'ATM Cashout Terminal',
      recipientAccount: destinationIban,
      category: 'withdrawal',
      note: withdrawMode === 'bank' ? 'Bank Account Withdrawal' : 'Cardless ATM Cash Out',
      customFee: fee,
    });

    if (res.success) {
      if (withdrawMode === 'atm') {
        const generatedPin = Math.floor(100000 + Math.random() * 900000).toString();
        setAtmCode(generatedPin);
      }
      setAmount('');
    } else {
      setErrorMsg(res.error || 'Withdrawal failed');
    }
  };

  return (
    <div className="py-12 bg-[#F4F6FA] text-slate-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#850D22]">
            Capital Outflow
          </span>
          <h1 className="text-3xl font-extrabold text-[#101A33] tracking-tight">
            Withdraw Funds
          </h1>
          <p className="text-xs text-slate-600">
            Transfer money to your verified external bank account or generate a cardless ATM cash-out authorization token.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setWithdrawMode('bank')}
              className={`p-3.5 rounded-xl border text-left transition-all ${withdrawMode === 'bank' ? 'border-[#C8102E] bg-rose-50/20 ring-1 ring-[#C8102E]' : 'border-slate-200'}`}
            >
              <Landmark className="w-5 h-5 text-[#101A33] mb-1" />
              <span className="font-bold text-xs text-[#101A33] block">Direct Bank Transfer</span>
              <span className="text-[10px] text-slate-500">Same-day clearing</span>
            </button>

            <button
              type="button"
              onClick={() => setWithdrawMode('atm')}
              className={`p-3.5 rounded-xl border text-left transition-all ${withdrawMode === 'atm' ? 'border-[#C8102E] bg-rose-50/20 ring-1 ring-[#C8102E]' : 'border-slate-200'}`}
            >
              <KeyRound className="w-5 h-5 text-[#850D22] mb-1" />
              <span className="font-bold text-xs text-[#101A33] block">Cardless ATM Cashout</span>
              <span className="text-[10px] text-slate-500">Instant 6-digit PIN token</span>
            </button>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {atmCode && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
              <div className="inline-flex p-2 bg-emerald-100 text-emerald-700 rounded-full">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-emerald-900 uppercase">ATM Cashout Authorization Ready</h4>
              <p className="text-[11px] text-emerald-700">Enter this one-time PIN at any 1Link or Visa ATM within 15 minutes:</p>
              <div className="text-3xl font-mono font-black tracking-widest text-[#101A33] py-2">
                {atmCode}
              </div>
            </div>
          )}

          <form onSubmit={handleWithdraw} className="space-y-4 text-xs">
            
            {/* Amount */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-semibold text-slate-700">Withdrawal Amount</label>
                <span className="text-slate-500">
                  Available: <strong className="font-mono text-slate-800">{currency} {user.balances[currency].toLocaleString()}</strong>
                </span>
              </div>
              <div className="flex rounded-xl border border-slate-300 overflow-hidden focus-within:border-[#C8102E]">
                <input
                  type="number"
                  step="0.01"
                  min="5"
                  placeholder="50.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1 px-4 py-2.5 font-mono text-base font-bold text-slate-900 focus:outline-hidden"
                  required
                />
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                  className="px-4 py-2.5 bg-slate-100 font-semibold border-l border-slate-200 text-[#101A33] focus:outline-hidden cursor-pointer"
                >
                  <option value="USD">USD ($)</option>
                  <option value="PKR">PKR (Rs)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="AED">AED (د.إ)</option>
                  <option value="SAR">SAR (﷼)</option>
                </select>
              </div>
            </div>

            {withdrawMode === 'bank' && (
              <div className="space-y-3 pt-1">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Destination Bank Name</label>
                  <input
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Destination IBAN / Account #</label>
                  <input
                    type="text"
                    value={destinationIban}
                    onChange={(e) => setDestinationIban(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono"
                    required
                  />
                </div>
              </div>
            )}

            {/* Fee Note */}
            <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-slate-600 border border-slate-100">
              <div className="flex justify-between">
                <span>Network Processing Fee:</span>
                <span className="font-mono text-slate-800">{currency} {fee.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#101A33] hover:bg-[#1B2947] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Landmark className="w-4 h-4 text-[#D6B36A]" />
              <span>Confirm & Initiate Withdrawal</span>
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};
