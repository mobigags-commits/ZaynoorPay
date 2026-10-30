import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CurrencyCode } from '../../types';
import { 
  Landmark, 
  Smartphone, 
  AlertCircle, 
  CheckCircle2, 
  ShieldCheck, 
  KeyRound, 
  ArrowUpRight, 
  QrCode, 
  Wallet, 
  Copy, 
  Check, 
  Sparkles,
  Building2,
  Lock,
  Printer
} from 'lucide-react';
import { ApiClient } from '../../services/api';

type WithdrawRail = 'jazzcash' | 'easypaisa' | 'bank_raast' | 'atm_cardless' | 'crypto_usdt' | 'payoneer';

export const WithdrawMoneyPage: React.FC = () => {
  const { user, performTransaction, language, navigate } = useApp();
  const isUrdu = language === 'ur';

  const [activeRail, setActiveRail] = useState<WithdrawRail>('jazzcash');
  const [currency, setCurrency] = useState<CurrencyCode>('PKR');
  const [amount, setAmount] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // JazzCash Form State
  const [jazzcashNumber, setJazzcashNumber] = useState('0300-8492019');
  const [jazzcashTitle, setJazzcashTitle] = useState(user.name);

  // EasyPaisa Form State
  const [easypaisaNumber, setEasypaisaNumber] = useState('0345-9921401');
  const [easypaisaTitle, setEasypaisaTitle] = useState(user.name);

  // Bank Transfer Form State
  const [selectedBank, setSelectedBank] = useState('Habib Bank Ltd (HBL)');
  const [iban, setIban] = useState('PK36HABB00012398491029');
  const [bankTitle, setBankTitle] = useState(user.name);
  const [purpose, setPurpose] = useState('Family Support / Monthly Expenses');

  // ATM Cardless Form State
  const [atmCode, setAtmCode] = useState<string | null>(null);
  const [atmExpiryTime, setAtmExpiryTime] = useState<string | null>(null);
  const [atmReference, setAtmReference] = useState<string | null>(null);

  // Crypto USDT Form State
  const [usdtAddress, setUsdtAddress] = useState('TJv79x1KqpL29sB2p91A82Q440vBn99X01');
  const [cryptoNetwork, setCryptoNetwork] = useState<'TRC-20' | 'BEP-20'>('TRC-20');

  // Payoneer Form State
  const [payoneerEmail, setPayoneerEmail] = useState('mobigags@gmail.com');

  const currentBal = user.balances[currency] || 0;
  const numAmt = parseFloat(amount) || 0;
  const fee = 0; // Promotional Zero-Fee Payouts

  const handleQuickPercent = (pct: number) => {
    const val = Math.floor(currentBal * pct);
    setAmount(val > 0 ? val.toString() : '');
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setAtmCode(null);

    const parsed = parseFloat(amount);
    if (isNaN(parsed) || parsed <= 0) {
      setErrorMsg(isUrdu ? 'براہ کرم درست رقم درج کریں۔' : 'Please specify a withdrawal amount greater than zero.');
      return;
    }

    if (parsed > currentBal) {
      setErrorMsg(
        isUrdu
          ? `ناکافی بیلنس! آپ کے پاس صرف ${currency} ${currentBal.toLocaleString()} دستیاب ہیں۔`
          : `Insufficient funds! Available balance: ${currency} ${currentBal.toLocaleString()}`
      );
      return;
    }

    let recipientTitle = '';
    let recipientAccount = '';
    let memo = '';

    if (activeRail === 'jazzcash') {
      recipientTitle = `JazzCash (${jazzcashTitle})`;
      recipientAccount = jazzcashNumber;
      memo = 'Instant JazzCash Cashout';
    } else if (activeRail === 'easypaisa') {
      recipientTitle = `EasyPaisa (${easypaisaTitle})`;
      recipientAccount = easypaisaNumber;
      memo = 'Instant EasyPaisa Cashout';
    } else if (activeRail === 'bank_raast') {
      recipientTitle = `${selectedBank} (${bankTitle})`;
      recipientAccount = iban;
      memo = `1Link / Raast Wire: ${purpose}`;
    } else if (activeRail === 'atm_cardless') {
      recipientTitle = '1Link Cardless ATM Terminal';
      recipientAccount = 'ATM Cashout Voucher';
      memo = 'Cardless ATM Cashout Token Generation';
    } else if (activeRail === 'crypto_usdt') {
      recipientTitle = `Binance USDT (${cryptoNetwork})`;
      recipientAccount = usdtAddress;
      memo = `USDT Blockchain Withdrawal (${cryptoNetwork})`;
    } else {
      recipientTitle = `Payoneer (${payoneerEmail})`;
      recipientAccount = payoneerEmail;
      memo = 'Payoneer External Transfer';
    }

    const res = performTransaction({
      type: 'withdraw',
      amount: parsed,
      currency,
      recipient: recipientTitle,
      recipientAccount,
      category: 'withdrawal',
      note: memo,
      customFee: fee,
    });

    if (res.success) {
      // Async dispatch to backend REST API
      ApiClient.submitWithdrawal({
        amount: parsed,
        currency,
        method: activeRail,
        recipientAccount,
        pinCode: '2026',
      }).catch(() => {});

      if (activeRail === 'atm_cardless') {
        const generatedPin = Math.floor(100000 + Math.random() * 900000).toString();
        const refId = `ATM-${Math.floor(10000000 + Math.random() * 90000000)}`;
        setAtmCode(generatedPin);
        setAtmExpiryTime('30:00 minutes');
        setAtmReference(refId);
      }

      setSuccessMsg(
        isUrdu
          ? `کامیابی! ${currency} ${parsed.toLocaleString()} کی رقم ${recipientTitle} پر کامیابی سے بھیج دی گئی ہے۔`
          : `Success! ${currency} ${parsed.toLocaleString()} has been dispatched to ${recipientTitle}.`
      );
      setAmount('');
    } else {
      setErrorMsg(res.error || (isUrdu ? 'ودڈرا مکمل کرنے میں خرابی پیش آگئی۔' : 'Withdrawal failed to process.'));
    }
  };

  return (
    <div className="py-10 bg-[#F4F6FA] text-slate-800 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Header */}
        <div className="bg-gradient-to-r from-[#101A33] via-[#1B2947] to-[#101A33] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider bg-[#D6B36A] text-[#101A33] px-2.5 py-0.5 rounded font-black">
                {isUrdu ? 'رقم نکلوانے کا فارم' : 'WITHDRAWAL FORMS'}
              </span>
              <span className="text-[11px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {isUrdu ? 'فوری منتقلی · کوئی پوشیدہ کٹوتی نہیں' : 'Instant Payout · Zero Hidden Deductions'}
              </span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              {isUrdu ? 'والٹ سے رقم نکلوانے کا فارم (ودڈرا فنڈز)' : 'Withdraw Funds from Your ZaynoorPay Wallet'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1.5 leading-relaxed">
              {isUrdu
                ? 'اپنے جاز کیش، ایزی پیسہ، پاکستانی بینک اکاؤنٹ (راست / 1لنک)، بغیر کارڈ اے ٹی ایم، یا بائنانس USDT میں فنڈز فوری طور پر کیش کروائیں۔'
                : 'Instantly transfer funds to your JazzCash, EasyPaisa, Pakistani bank account via Raast, Cardless ATM token, or Binance USDT.'
              }
            </p>
          </div>

          <div className="bg-white/10 rounded-2xl p-4 border border-white/15 text-center shrink-0">
            <span className="text-[11px] text-slate-300 block uppercase font-medium">
              {isUrdu ? 'دستیاب کیش بیلنس' : 'Available for Cashout'}
            </span>
            <div className="text-2xl font-black text-white font-mono mt-0.5">
              {currency} {currentBal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <span className="text-[10px] text-emerald-400 block mt-1">
              {isUrdu ? '100% فوری قابل واپسی' : 'Instant Clearance (0% Fee)'}
            </span>
          </div>
        </div>

        {/* Currency Switcher */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-bold text-slate-700">
            {isUrdu ? 'ودڈرا کرنسی کا انتخاب کریں:' : 'Select Withdrawal Currency:'}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {(['PKR', 'USD', 'AED', 'EUR', 'GBP', 'SAR'] as CurrencyCode[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCurrency(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  currency === c 
                    ? 'bg-[#101A33] text-white shadow-xs' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {c} ({user.balances[c] ? user.balances[c].toLocaleString() : 0})
              </button>
            ))}
          </div>
        </div>

        {/* Main Withdrawal Form Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">

          {/* Rail Selector Tabs */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2.5">
              {isUrdu ? 'رقم وصول کرنے کا چینل منتخب کریں:' : 'Select Cashout Destination Rail:'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2.5">
              
              {/* JazzCash */}
              <button
                type="button"
                onClick={() => { setActiveRail('jazzcash'); setCurrency('PKR'); }}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  activeRail === 'jazzcash'
                    ? 'border-[#C8102E] bg-rose-50/40 ring-2 ring-[#C8102E]/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <Smartphone className="w-4 h-4 text-[#C8102E] mb-1" />
                <div className="font-extrabold text-xs text-[#101A33]">JazzCash</div>
                <span className="text-[10px] text-slate-500">فوری موبائل کیش آؤٹ</span>
              </button>

              {/* EasyPaisa */}
              <button
                type="button"
                onClick={() => { setActiveRail('easypaisa'); setCurrency('PKR'); }}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  activeRail === 'easypaisa'
                    ? 'border-[#C8102E] bg-rose-50/40 ring-2 ring-[#C8102E]/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <Smartphone className="w-4 h-4 text-emerald-600 mb-1" />
                <div className="font-extrabold text-xs text-[#101A33]">EasyPaisa</div>
                <span className="text-[10px] text-slate-500">فوری والٹ ٹرانسفر</span>
              </button>

              {/* Pakistani Bank & Raast */}
              <button
                type="button"
                onClick={() => setActiveRail('bank_raast')}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  activeRail === 'bank_raast'
                    ? 'border-[#C8102E] bg-rose-50/40 ring-2 ring-[#C8102E]/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <Landmark className="w-4 h-4 text-[#101A33] mb-1" />
                <div className="font-extrabold text-xs text-[#101A33]">Pak Bank / Raast</div>
                <span className="text-[10px] text-slate-500">HBL, Meezan, MCB</span>
              </button>

              {/* Cardless ATM Cashout */}
              <button
                type="button"
                onClick={() => { setActiveRail('atm_cardless'); setCurrency('PKR'); }}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  activeRail === 'atm_cardless'
                    ? 'border-[#C8102E] bg-rose-50/40 ring-2 ring-[#C8102E]/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <KeyRound className="w-4 h-4 text-[#850D22] mb-1" />
                <div className="font-extrabold text-xs text-[#101A33]">Cardless ATM</div>
                <span className="text-[10px] text-slate-500">1Link 6-Digit PIN</span>
              </button>

              {/* Crypto USDT */}
              <button
                type="button"
                onClick={() => { setActiveRail('crypto_usdt'); setCurrency('USD'); }}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  activeRail === 'crypto_usdt'
                    ? 'border-[#C8102E] bg-rose-50/40 ring-2 ring-[#C8102E]/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <QrCode className="w-4 h-4 text-[#D6B36A] mb-1" />
                <div className="font-extrabold text-xs text-[#101A33]">Binance USDT</div>
                <span className="text-[10px] text-slate-500">Crypto Web3</span>
              </button>

              {/* Payoneer */}
              <button
                type="button"
                onClick={() => { setActiveRail('payoneer'); setCurrency('USD'); }}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  activeRail === 'payoneer'
                    ? 'border-[#C8102E] bg-rose-50/40 ring-2 ring-[#C8102E]/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <Wallet className="w-4 h-4 text-purple-700 mb-1" />
                <div className="font-extrabold text-xs text-[#101A33]">Payoneer</div>
                <span className="text-[10px] text-slate-500">International Wire</span>
              </button>

            </div>
          </div>

          {/* Feedback Alerts */}
          {errorMsg && (
            <div className="p-3.5 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-2xl text-xs flex items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="font-medium">{successMsg}</span>
              </div>
              <button
                onClick={() => navigate('/wallet-history')}
                className="px-3 py-1 bg-emerald-700 text-white rounded-lg font-bold text-[11px] hover:bg-emerald-800 transition-colors"
              >
                {isUrdu ? 'رسید دیکھیں' : 'View Receipt'}
              </button>
            </div>
          )}

          {/* CARDLESS ATM VOUCHER IF GENERATED */}
          {atmCode && (
            <div className="p-6 bg-gradient-to-br from-[#101A33] to-[#1B2947] text-white rounded-3xl border-2 border-[#D6B36A] shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/15 pb-3">
                <div className="flex items-center gap-2">
                  <KeyRound className="w-5 h-5 text-[#D6B36A]" />
                  <span className="font-bold text-sm text-[#D6B36A]">
                    {isUrdu ? 'اے ٹی ایم کیش آؤٹ واؤچر اور 6-ہندسی کوڈ' : '1Link Cardless ATM Cashout Token Generated'}
                  </span>
                </div>
                <span className="text-xs text-rose-400 font-mono font-bold bg-rose-500/20 px-2 py-0.5 rounded">
                  Expires in {atmExpiryTime}
                </span>
              </div>

              <div className="text-center py-3 bg-black/30 rounded-2xl border border-white/10 space-y-1">
                <span className="text-xs text-slate-400 block uppercase">
                  {isUrdu ? 'کسی بھی اے ٹی ایم مشین پر یہ کوڈ درج کریں:' : 'Enter this 6-Digit One-Time PIN at any 1Link ATM:'}
                </span>
                <div className="text-4xl sm:text-5xl font-black font-mono tracking-widest text-emerald-400">
                  {atmCode}
                </div>
                <span className="text-[11px] text-slate-400 font-mono block">
                  Reference: {atmReference}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-300 pt-2 border-t border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-[#D6B36A] text-[#101A33] font-bold text-[10px] flex items-center justify-center">1</span>
                  <span>1Link ATM اسکرین پر Cardless منتخب کریں</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-[#D6B36A] text-[#101A33] font-bold text-[10px] flex items-center justify-center">2</span>
                  <span>رجسٹرڈ موبائل نمبر اور 6 ہندسوں کا کوڈ درج کریں</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-[#D6B36A] text-[#101A33] font-bold text-[10px] flex items-center justify-center">3</span>
                  <span>مشین سے فوری کیش حاصل کریں!</span>
                </div>
              </div>
            </div>
          )}

          {/* DYNAMIC WITHDRAWAL FORM ACCORDING TO SELECTED RAIL */}
          <form onSubmit={handleWithdrawSubmit} className="space-y-5">

            {/* 1. JAZZCASH FORM */}
            {activeRail === 'jazzcash' && (
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                  <Smartphone className="w-4 h-4 text-[#C8102E]" />
                  <span className="text-xs font-bold text-[#101A33]">
                    {isUrdu ? 'جاز کیش اکاؤنٹ میں رقم وصول کریں' : 'JazzCash Instant Direct Payout'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {isUrdu ? 'جاز کیش موبائل نمبر (03xx-xxxxxxx):' : 'JazzCash Mobile Account Number:'}
                    </label>
                    <input
                      type="text"
                      value={jazzcashNumber}
                      onChange={(e) => setJazzcashNumber(e.target.value)}
                      placeholder="0300-8492019"
                      className="w-full bg-white border border-slate-300 rounded-xl py-2.5 px-3.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-[#C8102E]"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {isUrdu ? 'اکاؤنٹ ہولڈر کا نام:' : 'Account Title / Recipient Name:'}
                    </label>
                    <input
                      type="text"
                      value={jazzcashTitle}
                      onChange={(e) => setJazzcashTitle(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl py-2.5 px-3.5 text-xs text-slate-900 focus:outline-none focus:border-[#C8102E]"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 2. EASYPAISA FORM */}
            {activeRail === 'easypaisa' && (
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                  <Smartphone className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-[#101A33]">
                    {isUrdu ? 'ایزی پیسہ اکاؤنٹ میں رقم وصول کریں' : 'EasyPaisa Master Account Payout'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {isUrdu ? 'ایزی پیسہ موبائل نمبر (03xx-xxxxxxx):' : 'EasyPaisa Mobile Account Number:'}
                    </label>
                    <input
                      type="text"
                      value={easypaisaNumber}
                      onChange={(e) => setEasypaisaNumber(e.target.value)}
                      placeholder="0345-9921401"
                      className="w-full bg-white border border-slate-300 rounded-xl py-2.5 px-3.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-[#C8102E]"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {isUrdu ? 'اکاؤنٹ ہولڈر کا نام:' : 'Account Title / Recipient Name:'}
                    </label>
                    <input
                      type="text"
                      value={easypaisaTitle}
                      onChange={(e) => setEasypaisaTitle(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl py-2.5 px-3.5 text-xs text-slate-900 focus:outline-none focus:border-[#C8102E]"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 3. PAKISTANI BANK & RAAST FORM */}
            {activeRail === 'bank_raast' && (
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                  <Building2 className="w-4 h-4 text-[#101A33]" />
                  <span className="text-xs font-bold text-[#101A33]">
                    {isUrdu ? 'پاکستانی بینک اکاؤنٹ میں رقم ٹرانسفر (1لنک / راست)' : 'Pakistani Bank Wire via 1Link / Raast Instant'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {isUrdu ? 'بینک کا انتخاب کریں:' : 'Select Destination Bank:'}
                    </label>
                    <select
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl py-2.5 px-3 text-xs text-slate-900 focus:outline-none focus:border-[#C8102E]"
                    >
                      <option value="Habib Bank Ltd (HBL)">Habib Bank Ltd (HBL)</option>
                      <option value="Meezan Bank Limited">Meezan Islamic Bank</option>
                      <option value="Bank Alfalah">Bank Alfalah</option>
                      <option value="MCB Bank Limited">MCB Bank</option>
                      <option value="United Bank Limited (UBL)">United Bank Ltd (UBL)</option>
                      <option value="Allied Bank Limited (ABL)">Allied Bank (ABL)</option>
                      <option value="Standard Chartered Pakistan">Standard Chartered</option>
                      <option value="Faysal Bank">Faysal Bank</option>
                      <option value="Bank of Punjab (BOP)">Bank of Punjab</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {isUrdu ? 'اکاؤنٹ ٹائٹل (مکمل نام):' : 'Beneficiary Account Title:'}
                    </label>
                    <input
                      type="text"
                      value={bankTitle}
                      onChange={(e) => setBankTitle(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl py-2.5 px-3.5 text-xs text-slate-900 focus:outline-none focus:border-[#C8102E]"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {isUrdu ? '24-ہندسی IBAN نمبر (PK...):' : '24-Character IBAN / Account Number:'}
                    </label>
                    <input
                      type="text"
                      value={iban}
                      onChange={(e) => setIban(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl py-2.5 px-3.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-[#C8102E]"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 4. CARDLESS ATM FORM */}
            {activeRail === 'atm_cardless' && (
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                  <KeyRound className="w-4 h-4 text-[#850D22]" />
                  <span className="text-xs font-bold text-[#101A33]">
                    {isUrdu ? 'بغیر ڈیبٹ کارڈ کے اے ٹی ایم سے کیش نکالیں' : 'Cardless ATM Cashout at 18,000+ ATMs in Pakistan'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isUrdu
                    ? 'رقم کا انتخاب کریں اور سبمٹ پر کلک کریں۔ سسٹم آپ کو ایک خفیہ 6 ہندسوں کا کوڈ فراہم کرے گا جسے کسی بھی 1Link اے ٹی ایم پر درج کر کے آپ فوری نقد رقم نکال سکتے ہیں۔'
                    : 'Select amount to withdraw. The system generates an immediate 6-digit ATM PIN token valid at any 1Link ATM machine across Pakistan without requiring a debit card.'
                  }
                </p>
              </div>
            )}

            {/* 5. CRYPTO USDT / BINANCE FORM */}
            {activeRail === 'crypto_usdt' && (
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <QrCode className="w-4 h-4 text-[#D6B36A]" />
                    <span className="text-xs font-bold text-[#101A33]">
                      {isUrdu ? 'بائنانس و کرپٹو والٹ ایڈریس' : 'Binance / Web3 Tether USDT Wallet Destination'}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setCryptoNetwork('TRC-20')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        cryptoNetwork === 'TRC-20' ? 'bg-emerald-600 text-white' : 'bg-white border text-slate-600'
                      }`}
                    >
                      TRC-20
                    </button>
                    <button
                      type="button"
                      onClick={() => setCryptoNetwork('BEP-20')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        cryptoNetwork === 'BEP-20' ? 'bg-[#D6B36A] text-[#101A33]' : 'bg-white border text-slate-600'
                      }`}
                    >
                      BEP-20
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {isUrdu ? `آپ کا ${cryptoNetwork} والیٹ ایڈریس:` : `Destination ${cryptoNetwork} Wallet Address:`}
                  </label>
                  <input
                    type="text"
                    value={usdtAddress}
                    onChange={(e) => setUsdtAddress(e.target.value)}
                    placeholder="e.g. TJv79x1KqpL29sB2p91A82Q440vBn99X01"
                    className="w-full bg-white border border-slate-300 rounded-xl py-2.5 px-3.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-[#C8102E]"
                    required
                  />
                </div>
              </div>
            )}

            {/* 6. PAYONEER FORM */}
            {activeRail === 'payoneer' && (
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                  <Wallet className="w-4 h-4 text-purple-700" />
                  <span className="text-xs font-bold text-[#101A33]">
                    {isUrdu ? 'پائیونیر اکاؤنٹ میں ٹرانسفر' : 'Payoneer Direct Payout'}
                  </span>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {isUrdu ? 'پائیونیر رجسٹرڈ ای میل:' : 'Payoneer Email Address:'}
                  </label>
                  <input
                    type="email"
                    value={payoneerEmail}
                    onChange={(e) => setPayoneerEmail(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl py-2.5 px-3.5 text-xs text-slate-900 focus:outline-none focus:border-[#C8102E]"
                    required
                  />
                </div>
              </div>
            )}

            {/* AMOUNT INPUT SECTION */}
            <div className="bg-gradient-to-br from-slate-50 to-white p-5 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-800">
                  {isUrdu ? 'نکلوائی جانے والی رقم:' : 'Withdrawal Amount:'}
                </label>
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-slate-500">{isUrdu ? 'فوری فیصد:' : 'Quick Percent:'}</span>
                  <button
                    type="button"
                    onClick={() => handleQuickPercent(0.25)}
                    className="px-2 py-0.5 bg-slate-200 hover:bg-slate-300 rounded text-[11px] font-semibold text-slate-800 cursor-pointer"
                  >
                    25%
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickPercent(0.50)}
                    className="px-2 py-0.5 bg-slate-200 hover:bg-slate-300 rounded text-[11px] font-semibold text-slate-800 cursor-pointer"
                  >
                    50%
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickPercent(0.75)}
                    className="px-2 py-0.5 bg-slate-200 hover:bg-slate-300 rounded text-[11px] font-semibold text-slate-800 cursor-pointer"
                  >
                    75%
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickPercent(1.0)}
                    className="px-2 py-0.5 bg-[#101A33] text-white rounded text-[11px] font-bold cursor-pointer"
                  >
                    Max (100%)
                  </button>
                </div>
              </div>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-sm font-mono">
                  {currency}
                </span>
                <input
                  type="number"
                  step="any"
                  min="1"
                  max={currentBal}
                  placeholder={`Max: ${currentBal.toLocaleString()}`}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-white border-2 border-slate-300 rounded-xl py-3 pl-16 pr-4 text-slate-900 font-mono text-lg font-bold focus:outline-none focus:border-[#C8102E] shadow-inner"
                  required
                />
              </div>

              {/* Real-time Math Summary */}
              {numAmt > 0 && (
                <div className="p-3 bg-slate-100 rounded-xl text-xs space-y-1">
                  <div className="flex justify-between text-slate-600">
                    <span>{isUrdu ? 'دستیاب بیلنس:' : 'Available Balance:'}</span>
                    <span className="font-mono">{currency} {currentBal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>{isUrdu ? 'ودڈرا فیس:' : 'Payout Fee:'}</span>
                    <span className="font-mono text-emerald-600 font-bold">$0.00 (Zero Fee Promotion)</span>
                  </div>
                  <div className="flex justify-between text-slate-900 font-bold border-t border-slate-200 pt-1">
                    <span>{isUrdu ? 'ودڈرا کے بعد بقایا بیلنس:' : 'Remaining Balance After Payout:'}</span>
                    <span className="font-mono text-[#101A33] font-black">
                      {currency} {(Math.max(0, currentBal - numAmt)).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 bg-[#101A33] hover:bg-[#1B2947] text-white font-black text-sm rounded-2xl transition-all shadow-lg shadow-[#101A33]/25 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                <ArrowUpRight className="w-5 h-5 text-[#D6B36A]" />
                <span>
                  {isUrdu 
                    ? `رقم نکلوائیں (${currency} ${numAmt ? numAmt.toLocaleString() : '0'})` 
                    : `Dispatch Withdrawal (${currency} ${numAmt ? numAmt.toLocaleString() : '0'})`
                  }
                </span>
              </button>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
};
