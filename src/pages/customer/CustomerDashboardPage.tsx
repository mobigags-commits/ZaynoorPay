import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CurrencyCode } from '../../types';
import { 
  Send, 
  PlusCircle, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Receipt, 
  CreditCard, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  ChevronRight,
  TrendingUp,
  Landmark,
  Zap,
  ArrowRight
} from 'lucide-react';

export const CustomerDashboardPage: React.FC = () => {
  const { user, transactions, openReceipt, navigate, t } = useApp();
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>('USD');
  const [showBalance, setShowBalance] = useState(true);

  const availableBalance = user.balances[selectedCurrency] || 0;
  const recentTxs = transactions.slice(0, 5);

  return (
    <div className="py-8 bg-[#F4F6FA] text-slate-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Welcome & Account Tier Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold">{t.dashboard.welcome}</span>
              <span className="text-xs bg-[#D6B36A]/20 text-[#850D22] font-mono px-2 py-0.5 rounded font-bold">
                TIER {user.tier} VERIFIED
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-[#101A33] tracking-tight mt-0.5">
              {user.name}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/kyc-verification')}
              className="px-3.5 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors cursor-pointer"
            >
              Limits & Verification
            </button>
            <button
              onClick={() => navigate('/download-statements')}
              className="px-3.5 py-2 text-xs font-bold bg-[#101A33] hover:bg-[#1B2947] text-white rounded-xl transition-colors cursor-pointer"
            >
              Export Statement
            </button>
          </div>
        </div>

        {/* Top 3 Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Main Balance Card (Spans 7 cols) */}
          <div className="md:col-span-7 bg-gradient-to-br from-[#101A33] via-[#1B2947] to-[#0A1020] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col justify-between space-y-6">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <span>{t.dashboard.availableBalance}</span>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="p-1 hover:text-white transition-colors"
                  aria-label="Toggle balance privacy"
                >
                  {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Currency Picker */}
              <div className="flex items-center gap-1.5 bg-white/10 p-1 rounded-xl border border-white/10 text-xs">
                {(['USD', 'PKR', 'EUR', 'GBP', 'AED'] as CurrencyCode[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedCurrency(c)}
                    className={`px-2.5 py-1 rounded-lg font-mono font-bold transition-all ${selectedCurrency === c ? 'bg-[#D6B36A] text-[#101A33]' : 'text-slate-300 hover:text-white'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white tabular-nums font-sans">
                {showBalance ? (
                  <>
                    <span className="text-[#D6B36A] text-2xl sm:text-3xl font-bold mr-2">{selectedCurrency}</span>
                    {availableBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </>
                ) : (
                  '••••••••••'
                )}
              </div>
              <span className="text-xs text-slate-400 mt-2 block font-mono">
                Double-Entry Cryptographically Reconciled · No Pending Holds
              </span>
            </div>

            {/* Monthly Limit Progress */}
            <div className="space-y-1.5 pt-4 border-t border-white/10 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Monthly Limit Remaining:</span>
                <span className="font-mono font-bold text-[#D6B36A]">
                  ${user.monthlyLimitRemaining.toLocaleString()} / ${user.monthlyLimitTotal.toLocaleString()} USD
                </span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#D6B36A] rounded-full"
                  style={{ width: `${(user.monthlyLimitRemaining / user.monthlyLimitTotal) * 100}%` }}
                />
              </div>
            </div>

          </div>

          {/* Virtual Titanium Debit Card (Spans 5 cols) */}
          <div className="md:col-span-5 bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-800 rounded-3xl p-6 border border-[#D6B36A]/30 text-white shadow-xl flex flex-col justify-between space-y-4">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#D6B36A]" />
                <span className="text-[11px] font-mono tracking-widest uppercase font-bold text-[#D6B36A]">
                  TITANIUM DEBIT
                </span>
              </div>
              <span className="text-xs font-bold text-slate-300">VISA</span>
            </div>

            <div className="w-10 h-7 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400 rounded-md shadow-xs" />

            <div className="space-y-1">
              <span className="font-mono text-lg tracking-widest text-slate-200 font-semibold block">
                4123  7890  0112  3456
              </span>
              <div className="flex justify-between text-[10px] text-slate-400 pt-1 font-mono">
                <span>HOLDER: {user.name.toUpperCase()}</span>
                <span>EXP: 10/29 · CVV: •••</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Active for Online Payments
              </span>
              <button
                onClick={() => navigate('/security-settings')}
                className="text-[#D6B36A] font-semibold hover:underline"
              >
                Card Controls
              </button>
            </div>

          </div>

        </div>

        {/* 4 Quick Action Touchpoints */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button
            onClick={() => navigate('/send')}
            className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-md transition-all text-left space-y-2 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#C8102E]/10 text-[#C8102E] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Send className="w-5 h-5" />
            </div>
            <span className="font-bold text-sm text-[#101A33] block">Send Money</span>
            <span className="text-[11px] text-slate-500 block">P2P, Bank, or Mobile</span>
          </button>

          <button
            onClick={() => navigate('/add-money')}
            className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-md transition-all text-left space-y-2 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <PlusCircle className="w-5 h-5" />
            </div>
            <span className="font-bold text-sm text-[#101A33] block">Add Funds</span>
            <span className="text-[11px] text-slate-500 block">Card or Bank Deposit</span>
          </button>

          <button
            onClick={() => navigate('/withdraw')}
            className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-md transition-all text-left space-y-2 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#101A33]/10 text-[#101A33] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Landmark className="w-5 h-5" />
            </div>
            <span className="font-bold text-sm text-[#101A33] block">Withdraw Cash</span>
            <span className="text-[11px] text-slate-500 block">Bank Wire or ATM PIN</span>
          </button>

          <button
            onClick={() => navigate('/bills')}
            className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-md transition-all text-left space-y-2 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#D6B36A]/20 text-[#850D22] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5" />
            </div>
            <span className="font-bold text-sm text-[#101A33] block">Pay Utility Bills</span>
            <span className="text-[11px] text-slate-500 block">Electricity, Gas, Net</span>
          </button>
        </div>

        {/* Recent Transactions Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-[#101A33]">Recent Ledger Transactions</h2>
              <span className="text-xs text-slate-400">Click any row to view cryptographic receipt</span>
            </div>
            <button
              onClick={() => navigate('/wallet-history')}
              className="text-xs font-bold text-[#850D22] hover:text-[#C8102E] flex items-center gap-1 cursor-pointer"
            >
              <span>View Full Ledger</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3 font-semibold">Type</th>
                  <th className="py-3 px-3 font-semibold">Title / Description</th>
                  <th className="py-3 px-3 font-semibold">Recipient / Source</th>
                  <th className="py-3 px-3 font-semibold">Timestamp</th>
                  <th className="py-3 px-3 font-semibold">Status</th>
                  <th className="py-3 px-3 font-semibold text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentTxs.map((tx) => {
                  const isIncoming = tx.type === 'receive' || tx.type === 'add_money';
                  return (
                    <tr
                      key={tx.id}
                      onClick={() => openReceipt(tx)}
                      className="hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <td className="py-3.5 px-3">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isIncoming ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-[#C8102E]'}`}>
                          {isIncoming ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                        </div>
                      </td>
                      <td className="py-3.5 px-3 font-bold text-[#101A33]">
                        {tx.title}
                      </td>
                      <td className="py-3.5 px-3 text-slate-600">
                        {tx.recipient}
                      </td>
                      <td className="py-3.5 px-3 text-slate-400 font-mono tabular-nums text-[11px]">
                        {tx.timestamp}
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-mono">
                          {tx.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono font-bold tabular-nums">
                        <span className={isIncoming ? 'text-emerald-600' : 'text-slate-900'}>
                          {isIncoming ? '+' : '-'}{tx.currency} {tx.amount.toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
