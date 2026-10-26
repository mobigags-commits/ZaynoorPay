import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CurrencyCode } from '../../types';
import { PlusCircle, CreditCard, Landmark, Zap, ShieldCheck, AlertCircle } from 'lucide-react';

export const AddMoneyPage: React.FC = () => {
  const { performTransaction, user } = useApp();
  const [method, setMethod] = useState<'card' | 'bank' | 'instant'>('card');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [cardNumber, setCardNumber] = useState('4123 8810 9920 4019');
  const [expiry, setExpiry] = useState('08/28');
  const [cvv, setCvv] = useState('812');
  const [errorMsg, setErrorMsg] = useState('');

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const parsed = parseFloat(amount);
    if (isNaN(parsed) || parsed <= 0) {
      setErrorMsg('Please enter a deposit amount greater than zero.');
      return;
    }

    const providerLabel = method === 'card' ? `Visa Card (•••• ${cardNumber.slice(-4)})` :
                          method === 'bank' ? 'JPMorgan Chase Wire' : 'Instant Payment System';

    const res = performTransaction({
      type: 'add_money',
      amount: parsed,
      currency,
      recipient: `${user.name} Wallet`,
      category: 'deposit',
      note: `Inbound wallet funding via ${providerLabel}`,
    });

    if (res.success) {
      setAmount('');
    } else {
      setErrorMsg(res.error || 'Deposit failed');
    }
  };

  return (
    <div className="py-12 bg-[#F4F6FA] text-slate-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#850D22]">
            Wallet Funding
          </span>
          <h1 className="text-3xl font-extrabold text-[#101A33] tracking-tight">
            Add Funds to Wallet
          </h1>
          <p className="text-xs text-slate-600">
            Top-up your balances securely. Funds are verified and available immediately upon authorization.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          
          {/* Method Selector */}
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setMethod('card')}
              className={`p-3 rounded-xl border text-left transition-all ${method === 'card' ? 'border-[#C8102E] bg-rose-50/30 ring-1 ring-[#C8102E]' : 'border-slate-200 hover:border-slate-300'}`}
            >
              <CreditCard className="w-5 h-5 text-[#C8102E] mb-1.5" />
              <span className="font-bold text-xs text-[#101A33] block">Debit / Credit</span>
              <span className="text-[10px] text-slate-500">Instant (Visa, MC)</span>
            </button>

            <button
              type="button"
              onClick={() => setMethod('bank')}
              className={`p-3 rounded-xl border text-left transition-all ${method === 'bank' ? 'border-[#C8102E] bg-rose-50/30 ring-1 ring-[#C8102E]' : 'border-slate-200 hover:border-slate-300'}`}
            >
              <Landmark className="w-5 h-5 text-[#101A33] mb-1.5" />
              <span className="font-bold text-xs text-[#101A33] block">Bank Wire</span>
              <span className="text-[10px] text-slate-500">Zero fee direct transfer</span>
            </button>

            <button
              type="button"
              onClick={() => setMethod('instant')}
              className={`p-3 rounded-xl border text-left transition-all ${method === 'instant' ? 'border-[#C8102E] bg-rose-50/30 ring-1 ring-[#C8102E]' : 'border-slate-200 hover:border-slate-300'}`}
            >
              <Zap className="w-5 h-5 text-[#D6B36A] mb-1.5" />
              <span className="font-bold text-xs text-[#101A33] block">Instant Switch</span>
              <span className="text-[10px] text-slate-500">Raast / 1Link instant</span>
            </button>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleDeposit} className="space-y-4 text-xs">
            
            {/* Amount */}
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Deposit Amount</label>
              <div className="flex rounded-xl border border-slate-300 overflow-hidden focus-within:border-[#C8102E]">
                <input
                  type="number"
                  step="0.01"
                  min="1"
                  placeholder="100.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1 px-4 py-2.5 font-mono text-base font-bold text-slate-900 focus:outline-hidden"
                  required
                />
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                  className="px-4 py-2.5 bg-slate-100 font-semibold border-l border-slate-200 text-[#101A33] focus:outline-hidden"
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

            {method === 'card' && (
              <div className="space-y-3 pt-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Expiry Date</label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-mono"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">CVV / CVC</label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-mono"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-[#C8102E] hover:bg-[#850D22] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Confirm & Deposit Funds</span>
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};
