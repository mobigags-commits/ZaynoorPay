import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CurrencyCode } from '../../types';
import { 
  Wallet, 
  ArrowDownLeft, 
  ArrowUpRight, 
  TrendingUp, 
  ShieldCheck, 
  DollarSign, 
  Sparkles, 
  RefreshCw, 
  Building2, 
  Smartphone, 
  Globe2, 
  CheckCircle2, 
  Zap, 
  Layers, 
  CreditCard, 
  Sliders, 
  FileDown, 
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';

export const OwnerEarningsPage: React.FC = () => {
  const { 
    ownerWallet, 
    earningStreams, 
    ownerDeposit, 
    ownerWithdraw, 
    language,
    navigate 
  } = useApp();

  const isUrdu = language === 'ur';

  // Selected Currency for Treasury display
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>('USD');

  // Modal states
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  // Deposit Form State
  const [depositAmount, setDepositAmount] = useState('');
  const [depositCurrency, setDepositCurrency] = useState<CurrencyCode>('USD');
  const [depositSource, setDepositSource] = useState('Habib Bank Ltd (HBL) Corporate Wire');
  const [depositError, setDepositError] = useState('');

  // Withdraw Form State
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawCurrency, setWithdrawCurrency] = useState<CurrencyCode>('USD');
  const [withdrawMethod, setWithdrawMethod] = useState('Binance USDT (TRC-20)');
  const [withdrawAccount, setWithdrawAccount] = useState('TJv79x1KqpL29sB2p91A82Q440vBn99X01');
  const [withdrawError, setWithdrawError] = useState('');

  // Revenue Calculator state
  const [dailyUsers, setDailyUsers] = useState(15000);
  const [dailyTxCount, setDailyTxCount] = useState(3500);
  const [avgTxSize, setAvgTxSize] = useState(65);

  // Projected earnings calculation (Zero investment)
  // Fee revenue + FX + billers + adSense
  const projectedDailyUsd = Math.round((dailyTxCount * 0.40) + (dailyUsers * 0.05) + (dailyTxCount * 0.004 * avgTxSize));
  const projectedMonthlyUsd = projectedDailyUsd * 30;
  const projectedMonthlyPkr = projectedMonthlyUsd * 278;

  // Handle Deposit
  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDepositError('');
    const amt = parseFloat(depositAmount);
    if (!amt || amt <= 0) {
      setDepositError(isUrdu ? 'براہ کرم درست رقم درج کریں۔' : 'Please enter a valid deposit amount.');
      return;
    }

    const res = ownerDeposit({
      amount: amt,
      currency: depositCurrency,
      source: depositSource,
    });

    if (res.success) {
      setShowDepositModal(false);
      setDepositAmount('');
    } else {
      setDepositError(res.error || 'Failed to process deposit.');
    }
  };

  // Handle Withdraw
  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setWithdrawError('');
    const amt = parseFloat(withdrawAmount);
    if (!amt || amt <= 0) {
      setWithdrawError(isUrdu ? 'براہ کرم درست رقم درج کریں۔' : 'Please enter a valid withdrawal amount.');
      return;
    }

    const currentBal = ownerWallet.balances[withdrawCurrency] || 0;
    if (amt > currentBal) {
      setWithdrawError(
        isUrdu 
          ? `ناکافی بیلنس! دستیاب بیلنس: ${withdrawCurrency} ${currentBal.toLocaleString()}` 
          : `Insufficient balance! Available: ${withdrawCurrency} ${currentBal.toLocaleString()}`
      );
      return;
    }

    const res = ownerWithdraw({
      amount: amt,
      currency: withdrawCurrency,
      method: withdrawMethod,
      account: withdrawAccount,
    });

    if (res.success) {
      setShowWithdrawModal(false);
      setWithdrawAmount('');
    } else {
      setWithdrawError(res.error || 'Failed to process withdrawal.');
    }
  };

  const currentBal = ownerWallet.balances[selectedCurrency] || 0;

  return (
    <div className="py-8 bg-[#0B1224] text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Top Header & Breadcrumbs */}
        <div className="bg-gradient-to-r from-[#101A33] via-[#1B2947] to-[#101A33] rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8102E]/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#D6B36A]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-[11px] font-black uppercase tracking-wider bg-[#C8102E] text-white px-2.5 py-1 rounded-md shadow-sm">
                  {isUrdu ? 'اونر کنٹرول ہب' : 'OWNER REVENUE HUB'}
                </span>
                <span className="text-[11px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {isUrdu ? '100% بغیر کسی انویسٹمنٹ کے کمائی' : '100% ZERO-INVESTMENT EARNINGS'}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  ID: ZN-FOUNDER-CHAIR-01
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {isUrdu ? 'مالک کی تمام آمدنی، والٹ، ڈپازٹ اور ودڈرا ہب' : 'Platform Owner Revenue & Treasury Hub'}
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-3xl mt-2 leading-relaxed">
                {isUrdu 
                  ? 'یہاں آپ کی پلیٹ فارم سے حاصل ہونے والی تمام تر آمدنی بغیر کسی سرمایہ کاری کے براہ راست جمع ہوتی ہے۔ آپ جب چاہیں منافع فوری طور پر JazzCash، EasyPaisa، HBL بینک یا Binance USDT میں کیش کر سکتے ہیں، یا ٹریژری والٹ میں ڈپازٹ کر سکتے ہیں۔'
                  : 'Automated revenue engine where your platform monetizes 8 parallel income streams with zero capital risk. Instantly withdraw accumulated profits to local Pakistani banks, JazzCash, EasyPaisa, or global rails like Binance USDT and Payoneer.'
                }
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowWithdrawModal(true)}
                className="px-5 py-3 bg-[#D6B36A] hover:bg-[#c4a157] text-[#101A33] font-bold text-sm rounded-xl transition-all shadow-lg shadow-[#D6B36A]/20 flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <ArrowUpRight className="w-4 h-4" />
                {isUrdu ? 'منافع نکلوائیں (ودڈرا)' : 'Withdraw Profits'}
              </button>
              <button
                onClick={() => setShowDepositModal(true)}
                className="px-5 py-3 bg-[#C8102E] hover:bg-[#a50d26] text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-[#C8102E]/20 flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <ArrowDownLeft className="w-4 h-4" />
                {isUrdu ? 'والٹ میں جمع کریں (ڈپازٹ)' : 'Deposit Capital'}
              </button>
            </div>
          </div>
        </div>

        {/* Core Owner Wallet Card */}
        <div className="bg-[#101A33] rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#C8102E] to-[#D6B36A] flex items-center justify-center text-white shadow-md">
                <Wallet className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                  {isUrdu ? 'اونر ٹریژری اور ریونیو والٹ' : 'Master Owner Treasury & Profit Wallet'}
                </span>
                <h2 className="text-xl font-extrabold text-white">
                  {isUrdu ? 'موجودہ خالص کیش بیلنس' : 'Net Liquidity & Available Treasury Balance'}
                </h2>
              </div>
            </div>

            {/* Currency Pill Switcher */}
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
              {(['USD', 'PKR', 'AED', 'EUR', 'GBP', 'SAR'] as CurrencyCode[]).map((cur) => (
                <button
                  key={cur}
                  onClick={() => setSelectedCurrency(cur)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    selectedCurrency === cur 
                      ? 'bg-[#C8102E] text-white shadow-md' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {cur}
                </button>
              ))}
            </div>
          </div>

          {/* Balance Figures */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-[#1B2947] to-[#101A33] p-6 rounded-2xl border border-slate-700/60 shadow-inner space-y-2">
              <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">
                {isUrdu ? `دستیاب والٹ بیلنس (${selectedCurrency})` : `Available Treasury Balance (${selectedCurrency})`}
              </span>
              <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                {selectedCurrency === 'USD' ? '$' : selectedCurrency === 'PKR' ? 'Rs ' : `${selectedCurrency} `}
                {currentBal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="flex items-center gap-2 pt-2 text-xs text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {isUrdu ? '100% بغیر کسی کٹوتی یا فیس کے فوری دستیاب' : '100% Liquid & Instantly Withdrawable (Zero Fee)'}
              </div>
            </div>

            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">
                {isUrdu ? 'کل مجموعی لائف ٹائم آمدنی' : 'Total All-Time Platform Earnings (USD)'}
              </span>
              <div className="text-3xl sm:text-4xl font-black text-[#D6B36A] font-mono tracking-tight">
                ${ownerWallet.totalEarnedAllTimeUsd.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
              <div className="text-xs text-slate-400">
                ≈ PKR {(ownerWallet.totalEarnedAllTimeUsd * 278).toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>

            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">
                {isUrdu ? 'آج کی خودکار آمدنی' : "Today's Passive Revenue"}
              </span>
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono tracking-tight">
                +${ownerWallet.todayEarnedUsd.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-400/90">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+18.4% vs yesterday</span>
              </div>
            </div>
          </div>

          {/* Quick Payout Rails Banner */}
          <div className="bg-slate-900/50 rounded-2xl p-4 sm:p-5 border border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-[#D6B36A]">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block">
                  {isUrdu ? 'ایکٹو سیٹلمنٹ اکاؤنٹس برائے منافع' : 'Connected Owner Payout Accounts'}
                </span>
                <span className="text-sm font-bold text-white">
                  HBL Corporate (PK36HABB...1029) • JazzCash (0300-8492019) • Binance USDT (TRC-20)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowWithdrawModal(true)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white rounded-lg transition-colors cursor-pointer"
              >
                {isUrdu ? 'پیسے نکالیں' : 'Initiate Payout'}
              </button>
            </div>
          </div>
        </div>

        {/* Section: 8 Zero-Investment Earning Options */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  {isUrdu ? 'بغیر کسی انویسٹمنٹ کے 8 آمدنی ماڈلز' : '8 ZERO-CAPITAL PASSIVE MONETIZATION STREAMS'}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                {isUrdu ? 'پلیٹ فارم اونر کے کمائی کے تمام طریقے' : 'How ZaynoorPay Makes Money for You Without Investment'}
              </h2>
            </div>
            <span className="text-xs text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
              {isUrdu ? 'تمام ماڈلز فعال ہیں' : 'All 8 Streams Live & Active'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {earningStreams.map((stream) => (
              <div
                key={stream.id}
                className="bg-[#101A33] rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 relative group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                      {isUrdu ? 'زیرو انویسٹمنٹ' : 'Zero Investment'}
                    </span>
                    <span className="text-xs font-mono text-[#D6B36A] font-bold">
                      ${stream.totalEarnedUsd.toLocaleString()}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-[#D6B36A] transition-colors">
                      {isUrdu ? stream.titleUrdu : stream.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1.5 line-clamp-3 leading-relaxed">
                      {isUrdu ? stream.descriptionUrdu : stream.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">{isUrdu ? 'نرخ / فیس:' : 'Commission Rate:'}</span>
                    <span className="font-semibold text-white font-mono">{stream.currentRate}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">{isUrdu ? 'پاکستانی روپوں میں:' : 'PKR Revenue:'}</span>
                    <span className="font-semibold text-slate-300 font-mono">Rs {stream.totalEarnedPkr.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Breakdown Table of Revenue by Channel */}
        <div className="bg-[#101A33] rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                {isUrdu ? 'چینل وار خالص منافع کا جائزہ' : 'Zero-Capital Channel Breakdown'}
              </span>
              <h3 className="text-xl font-extrabold text-white">
                {isUrdu ? 'ہر شعبے سے ہونے والی مکمل آمدنی کی تفصیل' : 'Earnings Breakdown Across Software Rail Modules'}
              </h3>
            </div>
            <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full font-mono">
              Gross Software Margin: 96.4%
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block uppercase font-bold">1. Transfer Fees</span>
              <div className="text-xl font-bold text-white font-mono mt-1">${ownerWallet.revenueBreakdown.transactionFees.toLocaleString()}</div>
              <span className="text-[10px] text-slate-500">P2P and domestic payouts</span>
            </div>

            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block uppercase font-bold">2. FX Margins</span>
              <div className="text-xl font-bold text-white font-mono mt-1">${ownerWallet.revenueBreakdown.fxSpreadMargins.toLocaleString()}</div>
              <span className="text-[10px] text-slate-500">0.95% FX spread on remittance</span>
            </div>

            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block uppercase font-bold">3. Google AdSense</span>
              <div className="text-xl font-bold text-white font-mono mt-1">${ownerWallet.revenueBreakdown.adSenseRevenue.toLocaleString()}</div>
              <span className="text-[10px] text-slate-500">ca-pub-7550936944889241</span>
            </div>

            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block uppercase font-bold">4. Utility Kickbacks</span>
              <div className="text-xl font-bold text-white font-mono mt-1">${ownerWallet.revenueBreakdown.billerCommissions.toLocaleString()}</div>
              <span className="text-[10px] text-slate-500">LESCO, KE, SNGPL rebates</span>
            </div>

            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block uppercase font-bold">5. Merchant MDR</span>
              <div className="text-xl font-bold text-white font-mono mt-1">${ownerWallet.revenueBreakdown.merchantMdr.toLocaleString()}</div>
              <span className="text-[10px] text-slate-500">1.4% QR checkout fees</span>
            </div>

            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block uppercase font-bold">6. Card Interchange</span>
              <div className="text-xl font-bold text-white font-mono mt-1">${ownerWallet.revenueBreakdown.cardInterchange.toLocaleString()}</div>
              <span className="text-[10px] text-slate-500">Virtual card spend margin</span>
            </div>

            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block uppercase font-bold">7. Bank Lead CPA</span>
              <div className="text-xl font-bold text-white font-mono mt-1">${ownerWallet.revenueBreakdown.bankReferrals.toLocaleString()}</div>
              <span className="text-[10px] text-slate-500">$15 flat per account opened</span>
            </div>

            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block uppercase font-bold">8. Pro Subscriptions</span>
              <div className="text-xl font-bold text-white font-mono mt-1">${ownerWallet.revenueBreakdown.premiumTiers.toLocaleString()}</div>
              <span className="text-[10px] text-slate-500">Business merchant tier fees</span>
            </div>
          </div>
        </div>

        {/* Interactive Growth Simulator */}
        <div className="bg-gradient-to-r from-[#1B2947] via-[#101A33] to-[#1B2947] rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-xl space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D6B36A]" />
              <span className="text-xs uppercase font-bold text-[#D6B36A] tracking-wider">
                {isUrdu ? 'ریونیو کیلکولیٹر (بغیر سرمایہ کاری کے آمدنی کا تخمینہ)' : 'Interactive Zero-Investment Revenue Simulator'}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
              {isUrdu ? 'روزانہ صارفین اور ٹرانزیکشنز کے حساب سے اپنی متوقع ماہانہ آمدنی دیکھیں' : 'Estimate Your Monthly Cash Flow as Platform Scale Expands'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">{isUrdu ? 'روزانہ فعال صارفین (DAU)' : 'Daily Active Users (DAU)'}</span>
                <span className="text-[#D6B36A] font-mono font-bold">{dailyUsers.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={dailyUsers}
                onChange={(e) => setDailyUsers(Number(e.target.value))}
                className="w-full accent-[#C8102E] cursor-pointer"
              />
              <span className="text-[10px] text-slate-500">Ad impressions + affiliate visits</span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">{isUrdu ? 'روزانہ ٹرانزیکشنز کی تعداد' : 'Daily Transaction Count'}</span>
                <span className="text-[#D6B36A] font-mono font-bold">{dailyTxCount.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="100"
                max="25000"
                step="100"
                value={dailyTxCount}
                onChange={(e) => setDailyTxCount(Number(e.target.value))}
                className="w-full accent-[#C8102E] cursor-pointer"
              />
              <span className="text-[10px] text-slate-500">Transfers, bills, mobile topups</span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">{isUrdu ? 'اوسط ٹرانزیکشن حجم ($)' : 'Average Transaction Value ($)'}</span>
                <span className="text-[#D6B36A] font-mono font-bold">${avgTxSize}</span>
              </div>
              <input
                type="range"
                min="10"
                max="500"
                step="5"
                value={avgTxSize}
                onChange={(e) => setAvgTxSize(Number(e.target.value))}
                className="w-full accent-[#C8102E] cursor-pointer"
              />
              <span className="text-[10px] text-slate-500">Average ticket across multi-currency</span>
            </div>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-400 block font-medium">
                {isUrdu ? 'متوقع ماہانہ خالص منافع (بغیر کسی سرمایہ کاری کے)' : 'Projected Net Monthly Profit (Zero Investment)'}
              </span>
              <div className="text-3xl font-black text-emerald-400 font-mono mt-1">
                ${projectedMonthlyUsd.toLocaleString()} / month
              </div>
              <span className="text-xs text-slate-300">
                ≈ PKR {projectedMonthlyPkr.toLocaleString()} per month into your bank
              </span>
            </div>

            <div className="text-xs text-slate-400 sm:text-right max-w-xs">
              {isUrdu 
                ? 'تمام کلاؤڈ سروسز کسٹمر کی فیس اور کارپوریشن کمیشن سے خود کار طریقے سے فنڈ ہوتی ہیں۔ اونر کو کوئی سرمایہ لگانے کی ضرورت نہیں۔'
                : 'All gateway and infrastructure costs are factored into transaction margins. Owner retains high-margin gross profits.'
              }
            </div>
          </div>
        </div>

        {/* Tables: Withdrawals & Deposits Ledger */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Owner Withdrawals Ledger */}
          <div className="bg-[#101A33] rounded-3xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ArrowUpRight className="w-5 h-5 text-[#D6B36A]" />
                <h3 className="text-lg font-bold text-white">
                  {isUrdu ? 'منافع ودڈرا کی ہسٹری (پیسے نکلوانے کا ریکارڈ)' : 'Owner Profit Payout History'}
                </h3>
              </div>
              <button
                onClick={() => setShowWithdrawModal(true)}
                className="text-xs text-[#D6B36A] hover:underline font-semibold cursor-pointer"
              >
                + {isUrdu ? 'نیا ودڈرا' : 'New Payout'}
              </button>
            </div>

            <div className="divide-y divide-slate-800 overflow-x-auto">
              {ownerWallet.withdrawals.length === 0 ? (
                <p className="text-xs text-slate-500 py-4 text-center">No withdrawal records yet.</p>
              ) : (
                ownerWallet.withdrawals.map((w) => (
                  <div key={w.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <span>{w.method}</span>
                        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded font-mono">
                          {w.status}
                        </span>
                      </div>
                      <div className="text-slate-400 text-[11px] mt-0.5">
                        {w.account} • Ref: {w.referenceNumber}
                      </div>
                      <div className="text-slate-500 text-[10px]">{w.timestamp}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-[#D6B36A] text-sm">
                        -{w.currency} {w.amount.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-slate-400">Zero Fee</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Owner Deposits Ledger */}
          <div className="bg-[#101A33] rounded-3xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ArrowDownLeft className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-bold text-white">
                  {isUrdu ? 'ٹریژری ڈپازٹ ہسٹری (رقم جمع کرنے کا ریکارڈ)' : 'Treasury Injections & Capital Deposits'}
                </h3>
              </div>
              <button
                onClick={() => setShowDepositModal(true)}
                className="text-xs text-emerald-400 hover:underline font-semibold cursor-pointer"
              >
                + {isUrdu ? 'نیا ڈپازٹ' : 'New Deposit'}
              </button>
            </div>

            <div className="divide-y divide-slate-800 overflow-x-auto">
              {ownerWallet.deposits.length === 0 ? (
                <p className="text-xs text-slate-500 py-4 text-center">No deposit records yet.</p>
              ) : (
                ownerWallet.deposits.map((d) => (
                  <div key={d.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <span>{d.source}</span>
                        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded font-mono">
                          {d.status}
                        </span>
                      </div>
                      <div className="text-slate-400 text-[11px] mt-0.5">
                        Ref: {d.referenceNumber}
                      </div>
                      <div className="text-slate-500 text-[10px]">{d.timestamp}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-emerald-400 text-sm">
                        +{d.currency} {d.amount.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-slate-400">Settled</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

      {/* MODAL 1: Owner Deposit Modal */}
      {showDepositModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#101A33] border border-slate-700 rounded-3xl w-full max-w-lg p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <ArrowDownLeft className="w-5 h-5 text-emerald-400" />
                <h3 className="text-xl font-bold text-white">
                  {isUrdu ? 'ٹریژری والٹ میں رقم جمع کریں (ڈپازٹ)' : 'Deposit Funds to Owner Treasury'}
                </h3>
              </div>
              <button
                onClick={() => setShowDepositModal(false)}
                className="text-slate-400 hover:text-white text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {depositError && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{depositError}</span>
              </div>
            )}

            <form onSubmit={handleDepositSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  {isUrdu ? 'کرنسی کا انتخاب کریں:' : 'Select Currency:'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['USD', 'PKR', 'AED', 'EUR', 'GBP', 'SAR'] as CurrencyCode[]).map((cur) => (
                    <button
                      key={cur}
                      type="button"
                      onClick={() => setDepositCurrency(cur)}
                      className={`py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                        depositCurrency === cur
                          ? 'bg-[#C8102E] border-[#C8102E] text-white'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {cur}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  {isUrdu ? 'ڈپازٹ رقم درج کریں:' : 'Deposit Amount:'}
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-sm">
                    {depositCurrency}
                  </span>
                  <input
                    type="number"
                    step="any"
                    min="1"
                    placeholder="e.g. 5000"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 pl-14 pr-4 text-white font-mono text-sm focus:outline-none focus:border-[#C8102E]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  {isUrdu ? 'ڈپازٹ کا ذریعہ (بینک / والٹ):' : 'Deposit Source / Clearing Channel:'}
                </label>
                <select
                  value={depositSource}
                  onChange={(e) => setDepositSource(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 px-3 text-white text-xs focus:outline-none focus:border-[#C8102E]"
                >
                  <option value="Habib Bank Ltd (HBL) Corporate Wire">Habib Bank Ltd (HBL) Corporate Wire</option>
                  <option value="JazzCash Direct Merchant Deposit">JazzCash Direct Merchant Deposit</option>
                  <option value="EasyPaisa Master Account Wire">EasyPaisa Master Account Wire</option>
                  <option value="Binance USDT (TRC-20) Liquidity Injection">Binance USDT (TRC-20) Liquidity Injection</option>
                  <option value="Payoneer ACH Wire Transfer">Payoneer ACH Wire Transfer</option>
                  <option value="Stripe Corporate Clearing">Stripe Corporate Clearing</option>
                </select>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div className="flex justify-between">
                  <span>Double-entry debit:</span>
                  <span className="font-mono text-slate-300">partner_clearing_settlement</span>
                </div>
                <div className="flex justify-between">
                  <span>Double-entry credit:</span>
                  <span className="font-mono text-emerald-400">owner_treasury_{depositCurrency.toLowerCase()}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDepositModal(false)}
                  className="px-4 py-2.5 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  {isUrdu ? 'منسوخ کریں' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#C8102E] hover:bg-[#a50d26] text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-[#C8102E]/20 cursor-pointer"
                >
                  {isUrdu ? 'ڈپازٹ مکمل کریں' : 'Confirm Deposit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Owner Withdrawal Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#101A33] border border-slate-700 rounded-3xl w-full max-w-lg p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <ArrowUpRight className="w-5 h-5 text-[#D6B36A]" />
                <h3 className="text-xl font-bold text-white">
                  {isUrdu ? 'منافع نکلوائیں (ودڈرا فنڈز)' : 'Withdraw Profits to Your Account'}
                </h3>
              </div>
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="text-slate-400 hover:text-white text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {withdrawError && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{withdrawError}</span>
              </div>
            )}

            <form onSubmit={handleWithdrawSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  {isUrdu ? 'کرنسی کا انتخاب کریں:' : 'Select Currency to Withdraw:'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['USD', 'PKR', 'AED', 'EUR', 'GBP', 'SAR'] as CurrencyCode[]).map((cur) => (
                    <button
                      key={cur}
                      type="button"
                      onClick={() => setWithdrawCurrency(cur)}
                      className={`py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                        withdrawCurrency === cur
                          ? 'bg-[#D6B36A] border-[#D6B36A] text-[#101A33]'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {cur} ({ownerWallet.balances[cur] ? ownerWallet.balances[cur].toLocaleString() : 0})
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-300">
                    {isUrdu ? 'رقم درج کریں:' : 'Withdrawal Amount:'}
                  </label>
                  <button
                    type="button"
                    onClick={() => setWithdrawAmount((ownerWallet.balances[withdrawCurrency] || 0).toString())}
                    className="text-[10px] text-[#D6B36A] hover:underline font-semibold cursor-pointer"
                  >
                    Max ({withdrawCurrency} {(ownerWallet.balances[withdrawCurrency] || 0).toLocaleString()})
                  </button>
                </div>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-sm">
                    {withdrawCurrency}
                  </span>
                  <input
                    type="number"
                    step="any"
                    min="1"
                    placeholder="e.g. 2500"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 pl-14 pr-4 text-white font-mono text-sm focus:outline-none focus:border-[#D6B36A]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  {isUrdu ? 'رقم وصول کرنے کا طریقہ:' : 'Select Payout Method:'}
                </label>
                <select
                  value={withdrawMethod}
                  onChange={(e) => {
                    const method = e.target.value;
                    setWithdrawMethod(method);
                    if (method.includes('HBL')) setWithdrawAccount('PK36HABB00012398491029');
                    else if (method.includes('JazzCash')) setWithdrawAccount('0300-8492019');
                    else if (method.includes('EasyPaisa')) setWithdrawAccount('0345-9921401');
                    else if (method.includes('Binance')) setWithdrawAccount('TJv79x1KqpL29sB2p91A82Q440vBn99X01');
                    else if (method.includes('Payoneer')) setWithdrawAccount('mobigags@gmail.com');
                  }}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 px-3 text-white text-xs focus:outline-none focus:border-[#D6B36A]"
                >
                  <option value="Habib Bank Ltd (HBL) - Primary Corporate">Habib Bank Ltd (HBL) - Primary Corporate (PKR)</option>
                  <option value="JazzCash Direct Merchant Wallet">JazzCash Direct Merchant Wallet (PKR)</option>
                  <option value="EasyPaisa Master Account">EasyPaisa Master Account (PKR)</option>
                  <option value="Binance USDT (TRC-20)">Binance USDT (TRC-20) - Instant Crypto (USD)</option>
                  <option value="Payoneer Global Wire">Payoneer Global Wire (USD)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  {isUrdu ? 'اکاؤنٹ نمبر / IBAN / والیٹ ایڈریس:' : 'Account Details / IBAN / Wallet Address:'}
                </label>
                <input
                  type="text"
                  value={withdrawAccount}
                  onChange={(e) => setWithdrawAccount(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 px-3 text-white text-xs font-mono focus:outline-none focus:border-[#D6B36A]"
                  required
                />
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div className="flex justify-between">
                  <span>Owner Payout Processing Fee:</span>
                  <span className="font-mono text-emerald-400 font-bold">$0.00 (Free)</span>
                </div>
                <div className="flex justify-between">
                  <span>Cryptographic Settlement Speed:</span>
                  <span className="font-mono text-white">Instant / 60 seconds</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowWithdrawModal(false)}
                  className="px-4 py-2.5 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  {isUrdu ? 'منسوخ کریں' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#D6B36A] hover:bg-[#c4a157] text-[#101A33] text-xs font-bold rounded-xl transition-all shadow-lg shadow-[#D6B36A]/20 cursor-pointer"
                >
                  {isUrdu ? 'منافع فوری ٹرانسفر کریں' : 'Dispatch Payout'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
