import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../../components/brand/Logo';
import { AdSlot } from '../../components/common/AdSlot';
import { 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Globe2, 
  Smartphone, 
  Lock, 
  CreditCard, 
  Receipt, 
  HelpCircle, 
  CheckCircle2, 
  ArrowUpRight,
  TrendingUp,
  RefreshCw
} from 'lucide-react';
import { CurrencyCode } from '../../types';

export const HomePage: React.FC = () => {
  const { navigate, t, language, setAppMode } = useApp();

  // Interactive Live Currency Remittance Calculator
  const [sendAmount, setSendAmount] = useState<number>(1000);
  const [sourceCurrency, setSourceCurrency] = useState<CurrencyCode>('USD');
  const [targetCurrency, setTargetCurrency] = useState<CurrencyCode>('PKR');

  // Realistic FX rates (Sample real-world mid-market indicators)
  const FX_RATES: Record<string, number> = {
    'USD_PKR': 278.40,
    'USD_EUR': 0.92,
    'USD_GBP': 0.78,
    'USD_AED': 3.6725,
    'USD_SAR': 3.7510,
    'GBP_PKR': 356.50,
    'EUR_PKR': 302.20,
    'AED_PKR': 75.80,
    'SAR_PKR': 74.20,
  };

  const getExchangeRate = (from: CurrencyCode, to: CurrencyCode): number => {
    if (from === to) return 1.0;
    const pair = `${from}_${to}`;
    if (FX_RATES[pair]) return FX_RATES[pair];
    const reversePair = `${to}_${from}`;
    if (FX_RATES[reversePair]) return parseFloat((1 / FX_RATES[reversePair]).toFixed(4));
    return 1.0;
  };

  const rate = getExchangeRate(sourceCurrency, targetCurrency);
  const receivedAmount = (sendAmount * rate).toFixed(2);
  const estimatedFee = sourceCurrency === 'USD' ? 1.50 : 2.00;

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: language === 'ur' ? 'زینور پے میں اکاؤنٹ بنانے کا طریقہ کیا ہے؟' : 'How do I open and verify an account with ZaynoorPay?',
      a: language === 'ur' 
        ? 'آپ محض چند سیکنڈوں میں اپنے ای میل یا موبائل نمبر سے مفت رجسٹر ہو سکتے ہیں۔ پاسپورٹ یا شناختی کارڈ اپ لوڈ کر کے فورا ٹرانزیکشن کی حد بڑھائی جا سکتی ہے۔'
        : 'Registration takes under two minutes. Sign up with your verified email and mobile number. Tier 1 is granted immediately; submit government ID to unlock Tier 2 ($5,000/day).'
    },
    {
      q: language === 'ur' ? 'کیا رقوم کی ترسیل فوری ہوتی ہے؟' : 'Are digital wallet transfers and utility payments instantaneous?',
      a: language === 'ur'
        ? 'جی ہاں، زینور پے اندرونی والیٹ ٹرانسفرز، بجلی گیس کے بل اور موبائل لوڈ فوری مکمل ہوتے ہیں اور باضابطہ تصدیقی رسید فراہم کی جاتی ہے۔'
        : 'Yes. P2P transfers between ZaynoorPay wallets, utility bill settlements, and mobile top-ups execute immediately on our double-entry ledger with instant cryptographic receipts.'
    },
    {
      q: language === 'ur' ? 'سیکیورٹی اور انکرپشن کس معیار کی ہے؟' : 'What security protocols protect my money and data?',
      a: language === 'ur'
        ? 'ہم AES-256 GCM انکرپشن، دو عنصری تصدیق (2FA)، بائیومیٹرک فنگر پرنٹ اور خودکار فراڈ مانیٹرنگ سسٹم استعمال کرتے ہیں۔'
        : 'We enforce AES-256 GCM encryption at rest, TLS 1.3 in transit, strict Time-based One-Time Passwords (TOTP), idempotency keys against duplicate charges, and automated velocity monitoring.'
    },
    {
      q: language === 'ur' ? 'ڈیمو موڈ کا کیا مطلب ہے؟' : 'What is Demo Sandbox mode?',
      a: language === 'ur'
        ? 'فی الوقت یہ پلیٹ فارم پروٹوٹائپ سینڈ باکس میں چل رہا ہے تاکہ صارفین تمام خصوصیات اور والیٹ کا مکمل جائزہ لے سکیں۔ اصل رقوم منتقل نہیں کی جاتیں۔'
        : 'All transactions operate within a prototype sandbox mode to demonstrate financial flows, double-entry ledgers, and UI features without touching real-world bank reserves.'
    }
  ];

  return (
    <div className="w-full">
      
      {/* SECTION 1: MANDATORY RICH CRIMSON-RED HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#C8102E] via-[#A00E26] to-[#850D22] text-white pt-12 pb-20 lg:pt-20 lg:pb-28">
        
        {/* Subtle geometric light beam background motif */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#D6B36A_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Proposition & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-[#D6B36A] backdrop-blur-xs">
                <ShieldCheck className="w-4 h-4 text-[#D6B36A]" />
                <span>Next-Gen Institutional Digital Wallet</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white text-balance">
                {t.hero.titlePrimary}{' '}
                <span className="text-[#D6B36A]">{t.hero.titleSecondary}</span>
              </h1>

              <p className="text-base sm:text-lg text-white/90 max-w-xl leading-relaxed">
                {t.hero.description}
              </p>

              {/* Primary CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => navigate('/signup')}
                  className="px-7 py-3.5 rounded-xl bg-[#D6B36A] hover:bg-[#e3c481] text-[#101A33] font-bold text-sm tracking-wide transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-2 shrink-0 cursor-pointer"
                >
                  <span>{t.hero.ctaPrimary}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigate('/features')}
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all border border-white/20 shrink-0 cursor-pointer"
                >
                  {t.hero.ctaSecondary}
                </button>

                <button
                  onClick={() => setAppMode('mobile_app')}
                  className="px-5 py-3.5 rounded-xl bg-black/20 hover:bg-black/30 text-[#D6B36A] font-semibold text-sm transition-all border border-[#D6B36A]/30 flex items-center gap-2 shrink-0 cursor-pointer"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Interactive App View</span>
                </button>
              </div>

              {/* Social Proof & Quantitative Proof */}
              <div className="pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs">
                <div>
                  <span className="block text-2xl font-black text-white tabular-nums">250,000+</span>
                  <span className="text-white/70">Verified Wallets</span>
                </div>
                <div>
                  <span className="block text-2xl font-black text-white tabular-nums">99.98%</span>
                  <span className="text-white/70">Gateway Availability</span>
                </div>
                <div>
                  <span className="block text-2xl font-black text-[#D6B36A] tabular-nums">AES-256</span>
                  <span className="text-white/70">Military-Grade GCM</span>
                </div>
              </div>

            </div>

            {/* Right Column: Custom Visual Digital Wallet Mockup */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-[#101A33] transform hover:scale-[1.01] transition-transform duration-300">
                <img
                  src="/src/assets/images/hero_fintech_mockup_1792997931529.jpg"
                  alt="ZaynoorPay Digital Wallet Mobile Application Interface"
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Overlay Badge on Mockup */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#101A33]/90 backdrop-blur-md p-4 rounded-xl border border-white/15 text-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#C8102E] flex items-center justify-center text-white font-bold">
                      ZN
                    </div>
                    <div>
                      <span className="text-[11px] text-[#D6B36A] font-mono block">INSTANT SETTLEMENT</span>
                      <span className="text-xs font-bold">$14,875.50 USD Available</span>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="px-3 py-1.5 bg-[#D6B36A] text-[#101A33] rounded-lg text-xs font-bold hover:bg-white transition-colors"
                  >
                    Open
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 2: INTERACTIVE LIVE REMITTANCE & FX CALCULATOR */}
      <section className="py-16 bg-[#F4F6FA] text-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#850D22]">
              Real-Time Mid-Market Rates
            </span>
            <h2 className="text-3xl font-extrabold text-[#101A33] tracking-tight">
              Calculate Instant Cross-Border Transfers
            </h2>
            <p className="text-sm text-slate-600">
              Zero hidden markups. We quote transparent fees before you confirm. Authorized corridors only.
            </p>
          </div>

          <div className="max-w-xl mx-auto bg-white rounded-2xl p-6 shadow-xl border border-slate-200 space-y-5">
            
            {/* Send Amount Input */}
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                You Send
              </label>
              <div className="flex items-center rounded-xl border border-slate-300 bg-slate-50 focus-within:border-[#C8102E] focus-within:ring-1 focus-within:ring-[#C8102E] overflow-hidden">
                <input
                  type="number"
                  min="1"
                  max="10000"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(Math.max(1, Number(e.target.value)))}
                  className="flex-1 px-4 py-3 bg-transparent text-lg font-bold text-slate-900 focus:outline-hidden font-mono"
                />
                <select
                  value={sourceCurrency}
                  onChange={(e) => setSourceCurrency(e.target.value as CurrencyCode)}
                  className="px-4 py-3 bg-slate-100 font-semibold text-xs border-l border-slate-200 text-[#101A33] focus:outline-hidden cursor-pointer"
                >
                  <option value="USD">USD ($)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="AED">AED (د.إ)</option>
                  <option value="SAR">SAR (﷼)</option>
                </select>
              </div>
            </div>

            {/* Fee Breakdown Info */}
            <div className="py-2 px-3 bg-slate-50 rounded-xl space-y-1.5 text-xs text-slate-600 border border-slate-100">
              <div className="flex justify-between">
                <span>Guaranteed Exchange Rate</span>
                <span className="font-mono font-semibold text-[#101A33]">
                  1 {sourceCurrency} = {rate} {targetCurrency}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Zaynoor Transparent Fee</span>
                <span className="font-mono text-emerald-600 font-medium">
                  {sourceCurrency} {estimatedFee.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Arrival</span>
                <span className="font-medium text-slate-800">Under 60 seconds (Instant)</span>
              </div>
            </div>

            {/* Recipient Gets */}
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                Recipient Gets
              </label>
              <div className="flex items-center rounded-xl border border-slate-300 bg-slate-100 overflow-hidden">
                <input
                  type="text"
                  readOnly
                  value={receivedAmount}
                  className="flex-1 px-4 py-3 bg-transparent text-lg font-bold text-[#101A33] focus:outline-hidden font-mono"
                />
                <select
                  value={targetCurrency}
                  onChange={(e) => setTargetCurrency(e.target.value as CurrencyCode)}
                  className="px-4 py-3 bg-slate-200 font-semibold text-xs border-l border-slate-300 text-[#101A33] focus:outline-hidden cursor-pointer"
                >
                  <option value="PKR">PKR (Rs)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="AED">AED (د.إ)</option>
                  <option value="SAR">SAR (﷼)</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => navigate('/international-transfers')}
              className="w-full py-3.5 bg-[#C8102E] hover:bg-[#850D22] text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Transfer Funds Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>
      </section>

      {/* SECTION 3: 4 CORE FINANCIAL PILLARS (BENTO LAYOUT) */}
      <section className="py-20 bg-white text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#850D22]">
              Complete Financial Suite
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101A33] tracking-tight mt-1">
              Engineered for Speed, Clarity, and Control
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Consolidate everyday payments, cross-border remittances, and utility settlements into a single intuitive digital wallet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: P2P Instant Transfers */}
            <div className="p-7 rounded-2xl border border-slate-200 bg-slate-50 hover:border-slate-300 transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#C8102E]/10 text-[#C8102E] flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#101A33]">Instant Direct Transfers</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Send funds to any registered ZaynoorPay user, domestic bank account, or mobile wallet in seconds with verified confirmation receipts.
              </p>
              <button
                onClick={() => navigate('/send')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C8102E] hover:underline"
              >
                Send Money Now <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 2: Utility & Bill Payments */}
            <div className="p-7 rounded-2xl border border-slate-200 bg-slate-50 hover:border-slate-300 transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#101A33]/10 text-[#101A33] flex items-center justify-center">
                <Receipt className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#101A33]">Unified Utility Payments</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Clear electricity, gas, water, broadband, and school fees directly. Fetch real-time unpaid consumer bills automatically.
              </p>
              <button
                onClick={() => navigate('/bills')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#101A33] hover:underline"
              >
                Pay Bills <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 3: Contactless QR & Merchants */}
            <div className="p-7 rounded-2xl border border-slate-200 bg-slate-50 hover:border-slate-300 transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#D6B36A]/20 text-[#850D22] flex items-center justify-center">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#101A33]">Merchant QR & POS Tap</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Scan EMV compliant merchant QR codes or generate your personalized dynamic invoice code to receive payments on the spot.
              </p>
              <button
                onClick={() => navigate('/qr-payments')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#850D22] hover:underline"
              >
                Explore QR Code <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 4: THREE-STEP ONBOARDING */}
      <section className="py-20 bg-[#101A33] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D6B36A]">
              Simple Three-Step Flow
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight mt-1 text-white">
              Get Started in Minutes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            
            <div className="space-y-3 p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-12 h-12 rounded-full bg-[#D6B36A] text-[#101A33] text-lg font-black mx-auto flex items-center justify-center">
                1
              </div>
              <h3 className="text-base font-bold text-white">Register Free Wallet</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Sign up with your phone number or email, confirm the one-time verification passcode, and establish your transaction PIN.
              </p>
            </div>

            <div className="space-y-3 p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-12 h-12 rounded-full bg-[#D6B36A] text-[#101A33] text-lg font-black mx-auto flex items-center justify-center">
                2
              </div>
              <h3 className="text-base font-bold text-white">Add Funds Safely</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Top-up using debit or credit cards, direct bank transfer, or instant payment networks (Raast / 1Link).
              </p>
            </div>

            <div className="space-y-3 p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-12 h-12 rounded-full bg-[#D6B36A] text-[#101A33] text-lg font-black mx-auto flex items-center justify-center">
                3
              </div>
              <h3 className="text-base font-bold text-white">Transact with Peace of Mind</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Send funds worldwide, pay utilities, recharge mobiles, and export tax-compliant cryptographic transaction statements.
              </p>
            </div>

          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => navigate('/how-it-works')}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-colors"
            >
              Read Detailed How-It-Works Guide →
            </button>
          </div>

        </div>
      </section>

      {/* SECTION 5: COMPLIANT AD RECEPTACLE (AdSense Prepared) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSlot slotId="home-mid-banner" format="banner" />
      </div>

      {/* SECTION 6: FAQS ACCORDION */}
      <section className="py-20 bg-slate-50 text-slate-900 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#850D22]">
              Transparent Answers
            </span>
            <h2 className="text-3xl font-extrabold text-[#101A33] tracking-tight mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-semibold text-sm text-[#101A33] hover:text-[#C8102E] transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="text-lg font-bold text-slate-400">
                    {openFaq === idx ? '−' : '+'}
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/help')}
              className="text-xs font-bold text-[#101A33] hover:text-[#C8102E] underline"
            >
              Browse all Help Center articles and tutorials →
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
