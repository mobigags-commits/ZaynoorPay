import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../brand/Logo';
import { 
  Send, 
  Download, 
  CreditCard, 
  QrCode, 
  User, 
  Bell, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Smartphone, 
  Receipt, 
  Zap, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  ChevronRight,
  Sparkles,
  CheckCircle,
  X,
  Plus
} from 'lucide-react';
import { CurrencyCode } from '../../types';

export const MobileAppSimulator: React.FC = () => {
  const { 
    user, 
    transactions, 
    performTransaction, 
    openReceipt, 
    setAppMode, 
    language,
    setLanguage,
    ownerWallet,
    navigate
  } = useApp();

  const [activeTab, setActiveTab] = useState<'home' | 'transfers' | 'qr' | 'cards' | 'profile'>('home');
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>('USD');
  
  // Quick Send Sheet State
  const [sendModalOpen, setSendModalOpen] = useState(false);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [quickSendError, setQuickSendError] = useState('');
  const [successNotice, setSuccessNotice] = useState('');

  // QR Scan Simulator State
  const [isScanning, setIsScanning] = useState(false);

  const handleQuickSend = (e: React.FormEvent) => {
    e.preventDefault();
    setQuickSendError('');
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setQuickSendError('Please enter a valid amount.');
      return;
    }
    if (!recipient.trim()) {
      setQuickSendError('Please enter recipient identifier.');
      return;
    }

    const res = performTransaction({
      type: 'send',
      amount: numAmount,
      currency: selectedCurrency,
      recipient,
      category: 'transfer',
      note: 'Mobile App Quick Transfer',
      customFee: 0.25,
    });

    if (res.success) {
      setSuccessNotice(`Sent ${selectedCurrency} ${numAmount} to ${recipient}!`);
      setAmount('');
      setRecipient('');
      setSendModalOpen(false);
      setTimeout(() => setSuccessNotice(''), 4000);
    } else {
      setQuickSendError(res.error || 'Transaction failed');
    }
  };

  const handleSimulateQrScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      performTransaction({
        type: 'merchant_qr',
        amount: 22.50,
        currency: 'USD',
        recipient: 'Metro Express Market (Till #812)',
        category: 'merchant',
        note: 'QR Scan payment',
      });
      setSuccessNotice('QR Merchant Payment Completed!');
      setTimeout(() => setSuccessNotice(''), 4000);
    }, 1800);
  };

  return (
    <div className="py-10 px-4 flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] bg-slate-900 text-white">
      
      {/* Top Banner explaining App Simulator */}
      <div className="text-center max-w-lg mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D6B36A]/20 text-[#D6B36A] text-xs font-semibold mb-2">
          <Smartphone className="w-3.5 h-3.5" />
          <span>ZaynoorPay Native Mobile App Experience</span>
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight">
          {language === 'ur' ? 'زینور پے موبائل ایپ سمولیٹر' : 'Interactive Mobile Wallet App'}
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          {language === 'ur'
            ? 'آپ موبائل فون پر ایپ کی صورت میں براہ راست رقم بھیج سکتے ہیں، کیو آر کوڈ اسکین کر سکتے ہیں اور کارڈ دیکھ سکتے ہیں۔'
            : 'Test the mobile application interface. Send funds, simulate QR contactless tap, review cards, and manage balances in real-time.'}
        </p>
        <button
          onClick={() => setAppMode('web')}
          className="mt-3 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 rounded-lg transition-colors"
        >
          ← Return to Desktop Web Portal
        </button>
      </div>

      {/* Realistic Smartphone Hardware Chassis (iPhone 16 Pro Dimensions) */}
      <div className="relative w-[375px] h-[780px] bg-black rounded-[52px] p-3.5 shadow-2xl ring-1 ring-white/20 shadow-black/80">
        
        {/* Outer Phone Bezel Buttons */}
        <div className="absolute -left-[5px] top-28 w-[3px] h-9 bg-slate-700 rounded-l-sm" />
        <div className="absolute -left-[5px] top-42 w-[3px] h-12 bg-slate-700 rounded-l-sm" />
        <div className="absolute -left-[5px] top-58 w-[3px] h-12 bg-slate-700 rounded-l-sm" />
        <div className="absolute -right-[5px] top-36 w-[3px] h-16 bg-slate-700 rounded-r-sm" />

        {/* Screen Viewport */}
        <div className="w-full h-full bg-[#101A33] rounded-[44px] overflow-hidden flex flex-col relative text-slate-100 select-none">
          
          {/* Hardware Notch / Dynamic Island */}
          <div className="pt-2 px-6 flex items-center justify-between text-[11px] font-semibold text-slate-300 z-30">
            <span>9:41</span>
            <div className="w-24 h-5 bg-black rounded-full mx-auto flex items-center justify-end px-2 gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700" />
            </div>
            <div className="flex items-center gap-1.5 text-[10px]">
              <span>5G</span>
              <div className="w-4 h-2 border border-slate-300 rounded-xs p-0.5 flex items-center">
                <div className="w-full h-full bg-emerald-400 rounded-xs" />
              </div>
            </div>
          </div>

          {/* Toast Notification */}
          {successNotice && (
            <div className="absolute top-10 left-3 right-3 z-40 bg-emerald-600 text-white p-2.5 rounded-xl shadow-lg flex items-center gap-2 text-xs animate-in slide-in-from-top duration-200">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span className="truncate">{successNotice}</span>
            </div>
          )}

          {/* Main App Content View based on Active Tab */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
            
            {activeTab === 'home' && (
              <>
                {/* Header in App */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <Logo variant="icon" size="sm" />
                    <div>
                      <span className="text-[10px] text-slate-400 block leading-tight">Welcome,</span>
                      <span className="text-xs font-bold text-white">{user.name}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
                      className="text-[10px] bg-white/10 px-2 py-1 rounded-md text-[#D6B36A] font-semibold"
                    >
                      {language === 'en' ? 'اردو' : 'EN'}
                    </button>
                    <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center relative">
                      <Bell className="w-3.5 h-3.5 text-slate-300" />
                      <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#C8102E] rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Balance Card (Crimson & Gold Fintech Card) */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#C8102E] via-[#850D22] to-[#101A33] border border-white/15 shadow-lg relative overflow-hidden">
                  <div className="flex items-center justify-between text-xs text-white/80">
                    <div className="flex items-center gap-1.5">
                      <span>Available Balance</span>
                      <button onClick={() => setBalanceVisible(!balanceVisible)} aria-label="Toggle visibility">
                        {balanceVisible ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      </button>
                    </div>
                    {/* Currency Selector */}
                    <select
                      value={selectedCurrency}
                      onChange={(e) => setSelectedCurrency(e.target.value as CurrencyCode)}
                      className="bg-black/30 border border-white/20 text-white text-[11px] rounded-lg px-2 py-0.5 focus:outline-hidden"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="PKR">PKR (Rs)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="AED">AED (د.إ)</option>
                      <option value="SAR">SAR (﷼)</option>
                    </select>
                  </div>

                  <div className="mt-2">
                    <h3 className="text-2xl font-black tracking-tight text-white tabular-nums">
                      {balanceVisible ? (
                        <>
                          {selectedCurrency}{' '}
                          {user.balances[selectedCurrency].toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </>
                      ) : (
                        '••••••••'
                      )}
                    </h3>
                  </div>

                  <div className="mt-3 pt-3 border-t border-white/15 flex items-center justify-between text-[10px] text-white/70">
                    <span>Tier {user.tier} Verified</span>
                    <span className="font-mono text-[#D6B36A]">Ref: ZN-{user.id.slice(4, 9)}</span>
                  </div>
                </div>

                {/* 4 Quick Action Buttons */}
                <div className="grid grid-cols-4 gap-2 text-center">
                  <button
                    onClick={() => setSendModalOpen(true)}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex flex-col items-center gap-1 transition-transform active:scale-95"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#C8102E] flex items-center justify-center text-white">
                      <Send className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-medium text-slate-200">Send</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('qr')}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex flex-col items-center gap-1 transition-transform active:scale-95"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#D6B36A] flex items-center justify-center text-[#101A33]">
                      <QrCode className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-medium text-slate-200">Scan QR</span>
                  </button>

                  <button
                    onClick={() => {
                      performTransaction({
                        type: 'add_money',
                        amount: 250,
                        currency: selectedCurrency,
                        recipient: 'Card Deposit',
                        category: 'deposit',
                        note: 'Instant App Top-up',
                      });
                      setSuccessNotice(`Added ${selectedCurrency} 250 to Wallet!`);
                      setTimeout(() => setSuccessNotice(''), 3000);
                    }}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex flex-col items-center gap-1 transition-transform active:scale-95"
                  >
                    <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white">
                      <Plus className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-medium text-slate-200">Add $</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('transfers')}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex flex-col items-center gap-1 transition-transform active:scale-95"
                  >
                    <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white">
                      <Zap className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-medium text-slate-200">Bills</span>
                  </button>
                </div>

                {/* Virtual Card Preview */}
                <div className="p-3 rounded-xl bg-[#1B2947] border border-slate-700/60 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-[#D6B36A]/20 rounded-lg text-[#D6B36A]">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-white block">Titanium Virtual Debit</span>
                      <span className="text-[10px] text-slate-400 font-mono">•••• 3456 | Active</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('cards')}
                    className="text-xs text-[#D6B36A] font-medium flex items-center"
                  >
                    Manage <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Owner Earnings & Wallet Quick Mobile Banner */}
                <div 
                  onClick={() => {
                    setAppMode('web');
                    navigate('/owner-earnings');
                  }}
                  className="p-3 rounded-xl bg-gradient-to-r from-[#D6B36A]/20 via-[#101A33] to-[#C8102E]/20 border border-[#D6B36A]/30 cursor-pointer hover:border-[#D6B36A] transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#D6B36A] text-[#101A33] flex items-center justify-center font-black text-xs">
                      $
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold text-white">Owner Treasury Hub</span>
                        <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1 py-0.2 rounded font-mono">Zero Inv</span>
                      </div>
                      <span className="text-[10px] text-slate-300">
                        Balance: ${ownerWallet.balances.USD.toLocaleString()} • Withdraw Profits
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-[#D6B36A]" />
                </div>

                {/* Recent Activity List */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-white">Recent Transactions</span>
                    <button
                      onClick={() => setActiveTab('transfers')}
                      className="text-[#D6B36A] text-[11px]"
                    >
                      View all
                    </button>
                  </div>

                  <div className="space-y-2">
                    {transactions.slice(0, 4).map((tx) => (
                      <div
                        key={tx.id}
                        onClick={() => openReceipt(tx)}
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-between cursor-pointer border border-white/5"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                            tx.type === 'receive' || tx.type === 'add_money'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-rose-500/20 text-rose-400'
                          }`}>
                            {tx.type === 'receive' || tx.type === 'add_money' ? (
                              <ArrowDownLeft className="w-3.5 h-3.5" />
                            ) : (
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            )}
                          </div>
                          <div>
                            <span className="text-xs font-medium text-white block truncate max-w-[130px]">
                              {tx.recipient}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {tx.timestamp.slice(5)}
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className={`text-xs font-bold tabular-nums font-mono ${
                            tx.type === 'receive' || tx.type === 'add_money'
                              ? 'text-emerald-400'
                              : 'text-white'
                          }`}>
                            {tx.type === 'receive' || tx.type === 'add_money' ? '+' : '-'}
                            {tx.currency} {tx.amount.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* TAB: Transfers & Bills */}
            {activeTab === 'transfers' && (
              <div className="space-y-4 pt-2">
                <h3 className="text-sm font-bold text-white">Transfers & Utility Bills</h3>
                
                {/* Send Money Trigger */}
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-3">
                  <span className="text-xs font-semibold text-[#D6B36A] block">Instant Wallet Transfer</span>
                  <button
                    onClick={() => setSendModalOpen(true)}
                    className="w-full py-2.5 bg-[#C8102E] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send to Zaynoor ID or Mobile</span>
                  </button>
                </div>

                {/* Quick Bill Actions */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-300">Quick Utility Clearances</span>
                  
                  {[
                    { name: 'LESCO Electricity', fee: 142.00, cat: 'Electricity' },
                    { name: 'SNGPL Sui Gas', fee: 45.00, cat: 'Gas' },
                    { name: 'PTCL Smart Broadband', fee: 38.00, cat: 'Internet' },
                  ].map((b, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-medium text-white block">{b.name}</span>
                        <span className="text-[10px] text-slate-400">{b.cat}</span>
                      </div>
                      <button
                        onClick={() => {
                          performTransaction({
                            type: 'bill_payment',
                            amount: b.fee,
                            currency: 'USD',
                            recipient: b.name,
                            category: 'utility',
                            note: `${b.cat} bill clearance`,
                          });
                          setSuccessNotice(`Paid ${b.name}!`);
                          setTimeout(() => setSuccessNotice(''), 3000);
                        }}
                        className="px-2.5 py-1 bg-[#101A33] border border-[#D6B36A]/50 text-[#D6B36A] text-[11px] rounded-lg font-semibold"
                      >
                        Pay ${b.fee}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: QR Code Scan */}
            {activeTab === 'qr' && (
              <div className="space-y-4 pt-2 text-center">
                <h3 className="text-sm font-bold text-white">Contactless QR Payments</h3>
                
                {/* QR Code Presentation */}
                <div className="p-4 bg-white rounded-2xl max-w-[200px] mx-auto shadow-md">
                  <div className="w-40 h-40 bg-slate-900 rounded-lg p-2 flex items-center justify-center relative overflow-hidden">
                    {/* Simulated Clean SVG QR Code */}
                    <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current">
                      <rect x="5" y="5" width="25" height="25" rx="4" />
                      <rect x="9" y="9" width="17" height="17" fill="#101A33" />
                      <rect x="13" y="13" width="9" height="9" />
                      
                      <rect x="70" y="5" width="25" height="25" rx="4" />
                      <rect x="74" y="9" width="17" height="17" fill="#101A33" />
                      <rect x="78" y="13" width="9" height="9" />

                      <rect x="5" y="70" width="25" height="25" rx="4" />
                      <rect x="9" y="74" width="17" height="17" fill="#101A33" />
                      <rect x="13" y="78" width="9" height="9" />

                      <circle cx="50" cy="50" r="10" fill="#D6B36A" />
                      <rect x="36" y="20" width="6" height="16" />
                      <rect x="56" y="24" width="8" height="8" />
                      <rect x="44" y="72" width="12" height="6" />
                      <rect x="72" y="52" width="8" height="18" />
                    </svg>
                  </div>
                  <span className="text-[10px] text-slate-800 font-mono mt-2 block font-bold">
                    ZN-PAY-{user.id.slice(4, 9)}
                  </span>
                </div>

                <p className="text-[11px] text-slate-400">
                  Show this QR to receive funds or scan any merchant QR code to pay instantly.
                </p>

                <button
                  onClick={handleSimulateQrScan}
                  disabled={isScanning}
                  className="w-full py-2.5 bg-[#D6B36A] text-[#101A33] rounded-xl text-xs font-bold transition-all"
                >
                  {isScanning ? 'Scanning EMV Terminal...' : 'Simulate Camera POS Scan'}
                </button>
              </div>
            )}

            {/* TAB: Cards */}
            {activeTab === 'cards' && (
              <div className="space-y-4 pt-2">
                <h3 className="text-sm font-bold text-white">Payment Cards</h3>
                
                {/* Luxury Titanium Card */}
                <div className="p-4 rounded-2xl bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-800 border border-[#D6B36A]/40 shadow-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono tracking-widest text-[#D6B36A] uppercase font-bold">
                      ZAYNOORPAY TITANIUM
                    </span>
                    <span className="text-xs font-bold text-white">VISA</span>
                  </div>

                  <div className="w-8 h-6 bg-gradient-to-r from-amber-200 to-amber-400 rounded-sm" />

                  <div className="text-center font-mono text-sm tracking-wider text-slate-100 font-semibold">
                    4123 •••• •••• 3456
                  </div>

                  <div className="flex justify-between items-end text-[10px] text-slate-400">
                    <div>
                      <span className="block text-[8px] uppercase">Cardholder</span>
                      <span className="text-slate-200 font-medium">{user.name}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] uppercase">Expires</span>
                      <span className="text-slate-200 font-medium">10/29</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-white/5 flex items-center justify-between">
                    <span>Contactless NFC Payments</span>
                    <span className="text-[10px] text-emerald-400 font-semibold">ENABLED</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 flex items-center justify-between">
                    <span>Online E-Commerce Transactions</span>
                    <span className="text-[10px] text-emerald-400 font-semibold">ENABLED</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 flex items-center justify-between">
                    <span>Daily Card Limit</span>
                    <span className="font-mono text-slate-200">$5,000.00</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Profile */}
            {activeTab === 'profile' && (
              <div className="space-y-3 pt-2">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full bg-[#C8102E] mx-auto flex items-center justify-center text-xl font-bold text-white border-2 border-[#D6B36A]">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h4 className="text-sm font-bold text-white mt-1.5">{user.name}</h4>
                  <span className="text-[10px] text-slate-400">{user.email}</span>
                </div>

                <div className="p-3 bg-white/5 rounded-xl space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">KYC Status</span>
                    <span className="text-emerald-400 font-semibold uppercase">{user.kycStatus}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Account Tier</span>
                    <span className="text-[#D6B36A] font-semibold">Tier {user.tier} Verified</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">2FA Security</span>
                    <span className="text-emerald-400 font-semibold">TOTP Active</span>
                  </div>
                </div>

                <button
                  onClick={() => setAppMode('web')}
                  className="w-full py-2 bg-white/10 hover:bg-white/15 text-xs text-white rounded-xl font-medium transition-colors"
                >
                  Switch to Desktop Web View
                </button>
              </div>
            )}
          </div>

          {/* Quick Send Bottom Sheet (when triggered) */}
          {sendModalOpen && (
            <div className="absolute inset-0 bg-black/70 backdrop-blur-xs z-50 flex flex-col justify-end">
              <div className="bg-[#101A33] border-t border-slate-700 rounded-t-3xl p-5 space-y-3 text-slate-200 animate-in slide-in-from-bottom">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white">Send Money</h4>
                  <button onClick={() => setSendModalOpen(false)} className="p-1 text-slate-400">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {quickSendError && (
                  <p className="text-[11px] text-rose-400 bg-rose-500/10 p-2 rounded-lg">
                    {quickSendError}
                  </p>
                )}

                <form onSubmit={handleQuickSend} className="space-y-3 text-xs">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Recipient (Phone or Zaynoor ID)</label>
                    <input
                      type="text"
                      placeholder="e.g. Farhan Tariq or ZN-7712"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      className="w-full p-2 rounded-lg bg-white/10 border border-white/15 text-white text-xs focus:outline-hidden"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Amount ({selectedCurrency})</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full p-2 rounded-lg bg-white/10 border border-white/15 text-white text-xs font-mono focus:outline-hidden"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#C8102E] text-white rounded-xl text-xs font-bold hover:bg-[#850D22] transition-colors"
                  >
                    Confirm & Send Funds
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Bottom App Navigation Bar */}
          <div className="bg-[#0B1224] border-t border-slate-800 px-3 py-2 flex items-center justify-between text-[10px] text-slate-400">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-[#D6B36A] font-bold' : 'hover:text-white'}`}
            >
              <div className="w-4 h-4 flex items-center justify-center">
                <Logo variant="icon" size="sm" />
              </div>
              <span>Home</span>
            </button>

            <button
              onClick={() => setActiveTab('transfers')}
              className={`flex flex-col items-center gap-1 ${activeTab === 'transfers' ? 'text-[#D6B36A] font-bold' : 'hover:text-white'}`}
            >
              <Send className="w-4 h-4" />
              <span>Transfers</span>
            </button>

            {/* Center QR Scan Floating Icon */}
            <button
              onClick={() => setActiveTab('qr')}
              className="flex flex-col items-center -mt-4 bg-[#C8102E] text-white p-2.5 rounded-full shadow-lg hover:scale-105 transition-transform"
              aria-label="Scan QR"
            >
              <QrCode className="w-5 h-5" />
            </button>

            <button
              onClick={() => setActiveTab('cards')}
              className={`flex flex-col items-center gap-1 ${activeTab === 'cards' ? 'text-[#D6B36A] font-bold' : 'hover:text-white'}`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Cards</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-[#D6B36A] font-bold' : 'hover:text-white'}`}
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </button>
          </div>

          {/* iOS Bottom Bar Indicator */}
          <div className="pb-1 pt-0.5 flex justify-center bg-[#0B1224]">
            <div className="w-32 h-1 bg-white/20 rounded-full" />
          </div>

        </div>
      </div>
    </div>
  );
};
