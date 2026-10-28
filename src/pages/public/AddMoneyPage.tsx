import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CurrencyCode } from '../../types';
import { 
  CreditCard, 
  Landmark, 
  Zap, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Smartphone, 
  QrCode, 
  Copy, 
  Check, 
  ArrowDownLeft, 
  Lock, 
  Sparkles,
  Building2,
  Wallet
} from 'lucide-react';

type DepositRail = 'jazzcash_easypaisa' | 'bank_raast' | 'card' | 'crypto_usdt' | 'payoneer';

export const AddMoneyPage: React.FC = () => {
  const { performTransaction, user, language, navigate } = useApp();
  const isUrdu = language === 'ur';

  const [activeRail, setActiveRail] = useState<DepositRail>('jazzcash_easypaisa');
  const [currency, setCurrency] = useState<CurrencyCode>('PKR');
  const [amount, setAmount] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [copiedAddress, setCopiedAddress] = useState(false);

  // JazzCash / EasyPaisa Form State
  const [walletProvider, setWalletProvider] = useState<'JazzCash' | 'EasyPaisa'>('JazzCash');
  const [mobileNumber, setMobileNumber] = useState('0300-8492019');
  const [mpin, setMpin] = useState('4821');

  // Bank Transfer / Raast Form State
  const [selectedBank, setSelectedBank] = useState('Habib Bank Ltd (HBL)');
  const [iban, setIban] = useState('PK36HABB00012398491029');
  const [senderTitle, setSenderTitle] = useState(user.name);
  const [raastId, setRaastId] = useState('03008492019');

  // Card Form State
  const [cardNumber, setCardNumber] = useState('4123 8810 9920 4019');
  const [cardHolder, setCardHolder] = useState(user.name);
  const [expiry, setExpiry] = useState('08/28');
  const [cvv, setCvv] = useState('812');
  const [otpCode, setOtpCode] = useState('591024');

  // Crypto USDT Form State
  const [cryptoNetwork, setCryptoNetwork] = useState<'TRC-20' | 'BEP-20'>('TRC-20');
  const [txHash, setTxHash] = useState('a9f8c02b11e98d...4f2');
  const usdtDepositAddress = cryptoNetwork === 'TRC-20' 
    ? 'TJv79x1KqpL29sB2p91A82Q440vBn99X01' 
    : '0x849B278D9C01132Ef11a49E99fB4210B';

  // Payoneer Form State
  const [payoneerEmail, setPayoneerEmail] = useState('mobigags@gmail.com');

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const parsed = parseFloat(amount);
    if (isNaN(parsed) || parsed <= 0) {
      setErrorMsg(isUrdu ? 'براہ کرم 0 سے بڑی رقم درج کریں۔' : 'Please enter a deposit amount greater than zero.');
      return;
    }

    let providerDetail = '';
    let category: import('../../types').Transaction['category'] = 'deposit';

    if (activeRail === 'jazzcash_easypaisa') {
      if (!mobileNumber.trim()) {
        setErrorMsg(isUrdu ? 'براہ کرم موبائل اکاؤنٹ نمبر درج کریں۔' : 'Please enter mobile wallet number.');
        return;
      }
      providerDetail = `${walletProvider} Instant Deposit (${mobileNumber})`;
    } else if (activeRail === 'bank_raast') {
      providerDetail = `${selectedBank} (IBAN: ...${iban.slice(-4)}) via Raast`;
    } else if (activeRail === 'card') {
      if (cardNumber.replace(/\s/g, '').length < 15) {
        setErrorMsg(isUrdu ? 'براہ کرم درست 16 ہندسی کارڈ نمبر درج کریں۔' : 'Please enter valid 16-digit card number.');
        return;
      }
      providerDetail = `Card (•••• ${cardNumber.replace(/\s/g, '').slice(-4)}) 3D-Secure`;
    } else if (activeRail === 'crypto_usdt') {
      if (!txHash.trim()) {
        setErrorMsg(isUrdu ? 'براہ کرم بلاک چین ٹرانزیکشن ہیش (TXID) درج کریں۔' : 'Please enter blockchain TXID hash.');
        return;
      }
      providerDetail = `Binance / USDT (${cryptoNetwork}) - Ref: ${txHash.slice(0, 8)}...`;
    } else {
      providerDetail = `Payoneer ACH Wire (${payoneerEmail})`;
    }

    const res = performTransaction({
      type: 'add_money',
      amount: parsed,
      currency,
      recipient: `${user.name} Primary Wallet`,
      category,
      note: `Inbound wallet funding via ${providerDetail}`,
      customFee: 0,
    });

    if (res.success) {
      setSuccessMsg(
        isUrdu 
          ? `مبارک ہو! آپ کے والٹ میں ${currency} ${parsed.toLocaleString()} کامیابی سے شامل کر دیے گئے ہیں۔` 
          : `Success! ${currency} ${parsed.toLocaleString()} has been added to your wallet immediately.`
      );
      setAmount('');
    } else {
      setErrorMsg(res.error || (isUrdu ? 'ڈپازٹ کا عمل مکمل نہیں ہو سکا۔' : 'Deposit processing failed.'));
    }
  };

  const currentBal = user.balances[currency] || 0;
  const numAmt = parseFloat(amount) || 0;
  const newBal = currentBal + numAmt;

  return (
    <div className="py-10 bg-[#F4F6FA] text-slate-800 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Header */}
        <div className="bg-gradient-to-r from-[#101A33] via-[#1B2947] to-[#101A33] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider bg-[#C8102E] text-white px-2.5 py-0.5 rounded">
                {isUrdu ? 'والٹ ڈپازٹ فارم' : 'WALLET DEPOSIT FORMS'}
              </span>
              <span className="text-[11px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {isUrdu ? 'فوری رقم جمع کروائیں - زیرو فیس' : 'Instant Funding · Zero Processing Fee'}
              </span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              {isUrdu ? 'والٹ میں رقم جمع کرنے کا فارم (ڈپازٹ)' : 'Deposit Funds Into Your ZaynoorPay Wallet'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1.5 leading-relaxed">
              {isUrdu
                ? 'جاز کیش، ایزی پیسہ، پاکستانی بینکوں (راست / 1لنک)، ڈیبٹ کارڈز یا بائنانس USDT کے ذریعے اپنے والیٹ میں فوری فنڈز جمع کریں۔'
                : 'Instantly top-up your balance using JazzCash, EasyPaisa, Pakistani Banks via Raast, Visa/Mastercard, or Binance USDT.'
              }
            </p>
          </div>

          <div className="bg-white/10 rounded-2xl p-4 border border-white/15 text-center shrink-0">
            <span className="text-[11px] text-slate-300 block uppercase font-medium">
              {isUrdu ? 'موجودہ بیلنس' : 'Current Balance'}
            </span>
            <div className="text-2xl font-black text-[#D6B36A] font-mono mt-0.5">
              {currency} {currentBal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <span className="text-[10px] text-emerald-400 block mt-1">Tier {user.tier} Verified</span>
          </div>
        </div>

        {/* Currency Switcher */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-bold text-slate-700">
            {isUrdu ? 'ڈپازٹ کرنسی کا انتخاب کریں:' : 'Select Deposit Currency:'}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {(['PKR', 'USD', 'AED', 'EUR', 'GBP', 'SAR'] as CurrencyCode[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCurrency(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  currency === c 
                    ? 'bg-[#C8102E] text-white shadow-xs' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Main Deposit Form Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">

          {/* Rail Selector Tabs */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2.5">
              {isUrdu ? 'رقم جمع کرنے کا طریقہ منتخب کریں:' : 'Choose Deposit Method:'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              
              {/* JazzCash & EasyPaisa */}
              <button
                type="button"
                onClick={() => { setActiveRail('jazzcash_easypaisa'); setCurrency('PKR'); }}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  activeRail === 'jazzcash_easypaisa'
                    ? 'border-[#C8102E] bg-rose-50/40 ring-2 ring-[#C8102E]/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Smartphone className="w-4 h-4 text-[#C8102E]" />
                  <span className="text-[10px] font-bold bg-[#C8102E] text-white px-1 rounded">POPULAR</span>
                </div>
                <div className="font-extrabold text-xs text-[#101A33]">JazzCash / EasyPaisa</div>
                <span className="text-[10px] text-slate-500">فوری موبائل ڈپازٹ</span>
              </button>

              {/* Bank & Raast */}
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
                <div className="font-extrabold text-xs text-[#101A33]">Pak Bank & Raast</div>
                <span className="text-[10px] text-slate-500">1Link / IBAN Transfer</span>
              </button>

              {/* Debit / Credit Card */}
              <button
                type="button"
                onClick={() => setActiveRail('card')}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  activeRail === 'card'
                    ? 'border-[#C8102E] bg-rose-50/40 ring-2 ring-[#C8102E]/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <CreditCard className="w-4 h-4 text-[#D6B36A] mb-1" />
                <div className="font-extrabold text-xs text-[#101A33]">Visa & Mastercard</div>
                <span className="text-[10px] text-slate-500">Instant Debit Card</span>
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
                <QrCode className="w-4 h-4 text-emerald-600 mb-1" />
                <div className="font-extrabold text-xs text-[#101A33]">Binance USDT</div>
                <span className="text-[10px] text-slate-500">TRC-20 / BEP-20</span>
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
                <Wallet className="w-4 h-4 text-[#850D22] mb-1" />
                <div className="font-extrabold text-xs text-[#101A33]">Payoneer Global</div>
                <span className="text-[10px] text-slate-500">ACH / Inbound Wire</span>
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
                {isUrdu ? 'رسید اور تاریخ دیکھیں' : 'View Ledger'}
              </button>
            </div>
          )}

          {/* DYNAMIC FORM ACCORDING TO SELECTED RAIL */}
          <form onSubmit={handleDepositSubmit} className="space-y-5">

            {/* 1. JAZZCASH & EASYPAISA FORM */}
            {activeRail === 'jazzcash_easypaisa' && (
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-[#C8102E]" />
                    <span className="text-xs font-bold text-[#101A33]">
                      {isUrdu ? 'جاز کیش / ایزی پیسہ سے رقم جمع کریں' : 'JazzCash / EasyPaisa Mobile Direct Funding'}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setWalletProvider('JazzCash')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        walletProvider === 'JazzCash' ? 'bg-[#C8102E] text-white' : 'bg-white border text-slate-600'
                      }`}
                    >
                      JazzCash
                    </button>
                    <button
                      type="button"
                      onClick={() => setWalletProvider('EasyPaisa')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        walletProvider === 'EasyPaisa' ? 'bg-emerald-600 text-white' : 'bg-white border text-slate-600'
                      }`}
                    >
                      EasyPaisa
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {isUrdu ? 'موبائل اکاؤنٹ نمبر (03xx-xxxxxxx):' : 'Registered Mobile Account Number:'}
                    </label>
                    <input
                      type="text"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="0300-8492019"
                      className="w-full bg-white border border-slate-300 rounded-xl py-2.5 px-3.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-[#C8102E]"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {isUrdu ? '4-ہندسوں کا سیکیورٹی پن (MPIN):' : '4-Digit Authorization MPIN:'}
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      value={mpin}
                      onChange={(e) => setMpin(e.target.value)}
                      placeholder="••••"
                      className="w-full bg-white border border-slate-300 rounded-xl py-2.5 px-3.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-[#C8102E]"
                      required
                    />
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 bg-white p-3 rounded-xl border border-slate-200 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    {isUrdu
                      ? 'تصدیق کے بعد آپ کے موبائل پر فوری یو ایس ایس ڈی پاپ اپ (USSD Prompt) موصول ہو گا جس سے رقم براہ راست والٹ میں جمع ہو جائے گی۔'
                      : 'After submission, a secure USSD approval prompt is sent to your mobile phone for instantaneous authorization.'
                    }
                  </span>
                </div>
              </div>
            )}

            {/* 2. PAKISTANI BANK & RAAST FORM */}
            {activeRail === 'bank_raast' && (
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                  <Building2 className="w-4 h-4 text-[#101A33]" />
                  <span className="text-xs font-bold text-[#101A33]">
                    {isUrdu ? 'بینک ٹرانسفر و راست آئی ڈی فارم' : 'Bank Wire / 1Link / Raast Instant Direct Transfer'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {isUrdu ? 'بینک کا انتخاب کریں:' : 'Select Partner Bank:'}
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
                      <option value="JPMorgan Chase Wire">JPMorgan Chase (Global)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {isUrdu ? 'راست آئی ڈی / موبائل نمبر:' : 'Raast Payment ID:'}
                    </label>
                    <input
                      type="text"
                      value={raastId}
                      onChange={(e) => setRaastId(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl py-2.5 px-3.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-[#C8102E]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {isUrdu ? '24-ہندسی IBAN نمبر:' : '24-Character IBAN / Account Number:'}
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

            {/* 3. DEBIT & CREDIT CARD FORM */}
            {activeRail === 'card' && (
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#C8102E]" />
                    <span className="text-xs font-bold text-[#101A33]">
                      {isUrdu ? 'ڈیبٹ و کریڈٹ کارڈ کی تفصیلات' : 'Debit / Credit Card (Visa, Mastercard, UnionPay)'}
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-mono font-bold">
                    AES-256 ENCRYPTED
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {isUrdu ? '16 ہندسوں کا کارڈ نمبر:' : '16-Digit Card Number:'}
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4123 8810 9920 4019"
                      className="w-full bg-white border border-slate-300 rounded-xl py-2.5 px-3.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-[#C8102E]"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {isUrdu ? 'کارڈ ہولڈر کا نام:' : 'Cardholder Name:'}
                    </label>
                    <input
                      type="text"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl py-2.5 px-3.5 text-xs text-slate-900 focus:outline-none focus:border-[#C8102E]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        {isUrdu ? 'تاریخ تنسیخ (MM/YY):' : 'Expiry (MM/YY):'}
                      </label>
                      <input
                        type="text"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        placeholder="08/28"
                        className="w-full bg-white border border-slate-300 rounded-xl py-2.5 px-3.5 text-xs text-slate-900 font-mono text-center focus:outline-none focus:border-[#C8102E]"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        CVV / CVC:
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        placeholder="812"
                        className="w-full bg-white border border-slate-300 rounded-xl py-2.5 px-3.5 text-xs text-slate-900 font-mono text-center focus:outline-none focus:border-[#C8102E]"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. CRYPTO USDT / BINANCE FORM */}
            {activeRail === 'crypto_usdt' && (
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <QrCode className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold text-[#101A33]">
                      {isUrdu ? 'بائنانس و کرپٹو USDT ڈپازٹ ایڈریس' : 'Binance / Tether USDT Web3 Deposit Address'}
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
                      TRC-20 (Tron)
                    </button>
                    <button
                      type="button"
                      onClick={() => setCryptoNetwork('BEP-20')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        cryptoNetwork === 'BEP-20' ? 'bg-[#D6B36A] text-[#101A33]' : 'bg-white border text-slate-600'
                      }`}
                    >
                      BEP-20 (BNB)
                    </button>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                  <span className="text-[11px] text-slate-500 block">
                    {isUrdu ? `آپ کا مخصوص ${cryptoNetwork} ڈپازٹ ایڈریس:` : `Your Dedicated ${cryptoNetwork} Deposit Address:`}
                  </span>
                  <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs font-mono text-slate-800 break-all">
                    <span>{usdtDepositAddress}</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(usdtDepositAddress)}
                      className="ml-2 px-2.5 py-1 bg-[#101A33] hover:bg-[#1B2947] text-white rounded text-[11px] font-sans font-bold flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      {copiedAddress ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedAddress ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {isUrdu ? 'ٹرانزیکشن ہیش / TXID داخل کریں:' : 'Blockchain Transaction Hash / TXID:'}
                  </label>
                  <input
                    type="text"
                    value={txHash}
                    onChange={(e) => setTxHash(e.target.value)}
                    placeholder="e.g. a9f8c02b11e98d8a7c645..."
                    className="w-full bg-white border border-slate-300 rounded-xl py-2.5 px-3.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-[#C8102E]"
                    required
                  />
                </div>
              </div>
            )}

            {/* 5. PAYONEER FORM */}
            {activeRail === 'payoneer' && (
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                  <Wallet className="w-4 h-4 text-[#850D22]" />
                  <span className="text-xs font-bold text-[#101A33]">
                    {isUrdu ? 'پائیونیر و بین الاقوامی وائر ٹرانسفر' : 'Payoneer Direct Balance Link / Global Receiving Account'}
                  </span>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {isUrdu ? 'پائیونیر رجسٹرڈ ای میل:' : 'Payoneer Registered Email:'}
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
                  {isUrdu ? 'ڈپازٹ کی جانے والی رقم:' : 'Deposit Amount:'}
                </label>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <span>{isUrdu ? 'فوری رقم منتخب کریں:' : 'Quick Select:'}</span>
                  {(currency === 'PKR' ? [5000, 15000, 50000, 100000] : [100, 250, 500, 1000]).map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => setAmount(q.toString())}
                      className="px-2 py-0.5 bg-slate-200 hover:bg-slate-300 rounded text-[11px] font-mono text-slate-800 font-semibold cursor-pointer"
                    >
                      {q.toLocaleString()}
                    </button>
                  ))}
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
                  placeholder="e.g. 10000"
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
                    <span>{isUrdu ? 'موجودہ بیلنس:' : 'Current Balance:'}</span>
                    <span className="font-mono">{currency} {currentBal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>{isUrdu ? 'ڈپازٹ فیس:' : 'Deposit Processing Fee:'}</span>
                    <span className="font-mono text-emerald-600 font-bold">$0.00 (Free)</span>
                  </div>
                  <div className="flex justify-between text-slate-900 font-bold border-t border-slate-200 pt-1">
                    <span>{isUrdu ? 'ڈپازٹ کے بعد نیا بیلنس:' : 'New Balance After Deposit:'}</span>
                    <span className="font-mono text-[#C8102E] font-black">{currency} {newBal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 bg-[#C8102E] hover:bg-[#a50d26] text-white font-black text-sm rounded-2xl transition-all shadow-lg shadow-[#C8102E]/25 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                <ArrowDownLeft className="w-5 h-5" />
                <span>
                  {isUrdu 
                    ? `رقم جمع کریں (${currency} ${numAmt ? numAmt.toLocaleString() : '0'})` 
                    : `Confirm & Process Deposit (${currency} ${numAmt ? numAmt.toLocaleString() : '0'})`
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
