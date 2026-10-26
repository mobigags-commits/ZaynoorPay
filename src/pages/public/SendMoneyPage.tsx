import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CurrencyCode } from '../../types';
import { Send, Users, ShieldCheck, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export const SendMoneyPage: React.FC = () => {
  const { user, performTransaction, beneficiaries, navigate, language } = useApp();

  const [transferMethod, setTransferMethod] = useState<'zaynoor' | 'bank' | 'mobile'>('zaynoor');
  const [recipient, setRecipient] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('Habib Bank Ltd');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [note, setNote] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Quick select from saved beneficiary
  const handleSelectBeneficiary = (b: typeof beneficiaries[0]) => {
    setRecipient(b.name);
    setAccountNumber(b.accountNumber);
    setCurrency(b.currency);
    if (b.type === 'zaynoor') setTransferMethod('zaynoor');
    else if (b.type === 'bank') setTransferMethod('bank');
    else setTransferMethod('mobile');
  };

  const calculateFee = () => {
    if (transferMethod === 'zaynoor') return 0.00; // Free internal transfer
    return currency === 'USD' ? 0.50 : currency === 'PKR' ? 50.00 : 0.40;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setErrorMsg('Please enter a valid amount.');
      return;
    }

    if (!recipient.trim()) {
      setErrorMsg('Recipient name or identifier is required.');
      return;
    }

    setIsSubmitting(true);

    const fee = calculateFee();
    const result = performTransaction({
      type: 'send',
      amount: parsedAmount,
      currency,
      recipient: `${recipient} (${transferMethod === 'bank' ? bankName : transferMethod === 'mobile' ? 'Mobile Wallet' : 'ZN-ID'})`,
      recipientAccount: accountNumber || recipient,
      category: 'transfer',
      note: note || 'P2P Transfer',
      customFee: fee,
    });

    setIsSubmitting(false);

    if (!result.success) {
      setErrorMsg(result.error || 'Transfer failed.');
    } else {
      // Form cleared
      setAmount('');
      setRecipient('');
      setAccountNumber('');
      setNote('');
    }
  };

  const fee = calculateFee();
  const currentBalance = user.balances[currency] || 0;

  return (
    <div className="py-12 bg-[#F4F6FA] text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#850D22]">
            Instant Settlement
          </span>
          <h1 className="text-3xl font-extrabold text-[#101A33] tracking-tight">
            Send Money Anywhere
          </h1>
          <p className="text-xs text-slate-600">
            Internal Zaynoor transfers are completely free. Interbank and mobile wallet transfers settle in real time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Main Transfer Form */}
          <div className="md:col-span-8 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            
            {/* Transfer Rail Tabs */}
            <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setTransferMethod('zaynoor')}
                className={`py-2 rounded-lg transition-colors ${transferMethod === 'zaynoor' ? 'bg-white text-[#101A33] shadow-xs' : 'text-slate-600'}`}
              >
                Zaynoor ID (0% Fee)
              </button>
              <button
                type="button"
                onClick={() => setTransferMethod('bank')}
                className={`py-2 rounded-lg transition-colors ${transferMethod === 'bank' ? 'bg-white text-[#101A33] shadow-xs' : 'text-slate-600'}`}
              >
                Bank Account
              </button>
              <button
                type="button"
                onClick={() => setTransferMethod('mobile')}
                className={`py-2 rounded-lg transition-colors ${transferMethod === 'mobile' ? 'bg-white text-[#101A33] shadow-xs' : 'text-slate-600'}`}
              >
                Mobile Number
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Recipient Details */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Recipient Full Name / Tag
                </label>
                <input
                  type="text"
                  placeholder="e.g. Farhan Tariq or @farhan"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#C8102E] focus:outline-hidden"
                  required
                />
              </div>

              {transferMethod === 'bank' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Bank Name</label>
                    <select
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden"
                    >
                      <option value="Habib Bank Ltd">Habib Bank Ltd (HBL)</option>
                      <option value="Meezan Islamic Bank">Meezan Islamic Bank</option>
                      <option value="Standard Chartered">Standard Chartered Bank</option>
                      <option value="HSBC UK">HSBC UK</option>
                      <option value="JPMorgan Chase">JPMorgan Chase</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">IBAN / Account #</label>
                    <input
                      type="text"
                      placeholder="e.g. PK36HABB00012398491029"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono focus:border-[#C8102E] focus:outline-hidden"
                      required
                    />
                  </div>
                </div>
              )}

              {transferMethod === 'mobile' && (
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Mobile Phone (with country code)</label>
                  <input
                    type="tel"
                    placeholder="+92 300 1234567 or +1 (555) 0192"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono focus:border-[#C8102E] focus:outline-hidden"
                    required
                  />
                </div>
              )}

              {/* Amount and Currency */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-semibold text-slate-700">Amount</label>
                  <span className="text-slate-500">
                    Available: <strong className="font-mono text-slate-800">{currency} {currentBalance.toLocaleString()}</strong>
                  </span>
                </div>
                <div className="flex rounded-xl border border-slate-300 overflow-hidden focus-within:border-[#C8102E]">
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    placeholder="0.00"
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

              {/* Note / Memo */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Payment Purpose / Note</label>
                <input
                  type="text"
                  placeholder="e.g. Freelance invoice clearance"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden"
                />
              </div>

              {/* Summary box */}
              <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 border border-slate-100 text-slate-600">
                <div className="flex justify-between">
                  <span>Transfer Fee:</span>
                  <span className="font-mono text-slate-900 font-semibold">
                    {fee === 0 ? 'FREE (0.00)' : `${currency} ${fee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-slate-900 pt-1 border-t border-slate-200">
                  <span>Total Deducted:</span>
                  <span className="font-mono text-[#C8102E]">
                    {currency} {(parseFloat(amount || '0') + fee).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#C8102E] hover:bg-[#850D22] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Verifying & Executing...' : 'Authorize & Send Payment'}</span>
              </button>

            </form>
          </div>

          {/* Right Column: Saved Beneficiaries Quick Select */}
          <div className="md:col-span-4 space-y-5">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-[#101A33] uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#D6B36A]" />
                  <span>Saved Beneficiaries</span>
                </h3>
                <button
                  onClick={() => navigate('/beneficiaries')}
                  className="text-[11px] text-[#850D22] font-semibold hover:underline"
                >
                  Manage
                </button>
              </div>

              <div className="space-y-2">
                {beneficiaries.slice(0, 4).map((b) => (
                  <div
                    key={b.id}
                    onClick={() => handleSelectBeneficiary(b)}
                    className="p-2.5 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-[#101A33] block">{b.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono truncate max-w-[140px] block">
                        {b.bankOrWallet}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-[#850D22] font-mono">
                      {b.currency}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Idempotency Protected</span>
              </div>
              <p className="text-[11px] leading-relaxed text-emerald-700">
                Our core banking engine prevents double charges. Even if your connection flickers, duplicate payments will never execute.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
