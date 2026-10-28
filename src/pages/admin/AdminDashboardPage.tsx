import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Activity, 
  ShieldCheck, 
  Database, 
  Sliders, 
  FileText, 
  BarChart3, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { auditLogs, providers, navigate } = useApp();

  return (
    <div className="py-8 bg-[#0B1224] text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#101A33] rounded-2xl p-6 border border-slate-800 shadow-md">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-rose-500/20 text-rose-400 font-mono px-2 py-0.5 rounded font-bold">
                ROOT PRIVILEGES
              </span>
              <span className="text-xs text-slate-400">Compliance & Infrastructure Management</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight mt-1">
              Administration & Oversight Console
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-3.5 py-2 text-xs font-semibold bg-white/10 hover:bg-white/15 text-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Switch to Customer View
            </button>
          </div>
        </div>

        {/* 4 Core Platform Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-[#101A33] rounded-2xl border border-slate-800 space-y-2">
            <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">24h Ledger Volume</span>
            <div className="text-2xl font-black text-white font-mono tabular-nums">$4,819,250.00</div>
            <span className="text-[10px] text-emerald-400 block font-mono">100% Double-Entry Balanced</span>
          </div>

          <div className="p-5 bg-[#101A33] rounded-2xl border border-slate-800 space-y-2">
            <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">Registered Wallets</span>
            <div className="text-2xl font-black text-white font-mono tabular-nums">254,109</div>
            <span className="text-[10px] text-slate-400 block">Tier 2/3 Accounts: 84.2%</span>
          </div>

          <div className="p-5 bg-[#101A33] rounded-2xl border border-slate-800 space-y-2">
            <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">Pending KYC Queue</span>
            <div className="text-2xl font-black text-[#D6B36A] font-mono tabular-nums">12 Dossiers</div>
            <button onClick={() => navigate('/admin/users')} className="text-[10px] text-[#D6B36A] hover:underline block font-semibold">
              Review Queue →
            </button>
          </div>

          <div className="p-5 bg-[#101A33] rounded-2xl border border-slate-800 space-y-2">
            <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">Gateway Rails</span>
            <div className="text-2xl font-black text-emerald-400 font-mono tabular-nums">
              {providers.filter(p => p.status !== 'inactive').length} Active
            </div>
            <span className="text-[10px] text-slate-400 block">Stripe, 1Link, Raast Sandbox</span>
          </div>
        </div>

        {/* OWNER SPECIAL CALLOUT BANNER */}
        <div className="bg-gradient-to-r from-[#C8102E]/20 via-[#101A33] to-[#D6B36A]/20 rounded-3xl p-6 border border-[#D6B36A]/40 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#D6B36A] flex items-center justify-center text-[#101A33] font-black text-xl shadow-md">
              $
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold bg-[#D6B36A] text-[#101A33] px-2 py-0.5 rounded">
                  FOUNDER / OWNER
                </span>
                <span className="text-xs text-emerald-400 font-bold">100% Zero-Investment Monetization</span>
              </div>
              <h2 className="text-lg font-black text-white mt-1">
                Owner Earnings, Treasury Wallet, Deposit & Withdrawal Console
              </h2>
              <p className="text-xs text-slate-300">
                Track 8 passive revenue channels (fees, FX, AdSense, bills, airtime, MDR) and withdraw profits to HBL, JazzCash, EasyPaisa, or Binance USDT.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/owner-earnings')}
            className="px-5 py-3 bg-[#D6B36A] hover:bg-[#c4a157] text-[#101A33] font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer shrink-0"
          >
            <span>Open Owner Hub</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Admin Navigation Hub Modules */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <button
            onClick={() => navigate('/owner-earnings')}
            className="p-5 bg-gradient-to-b from-[#1B2947] to-[#101A33] hover:border-[#D6B36A] rounded-2xl border border-[#D6B36A]/30 transition-all text-left space-y-2 cursor-pointer group"
          >
            <ShieldCheck className="w-5 h-5 text-[#D6B36A] group-hover:scale-105 transition-transform" />
            <h3 className="font-bold text-sm text-white">Owner Earnings Hub</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Zero-investment revenue breakdown, Treasury deposits, and local/crypto payouts.
            </p>
          </button>

          <button
            onClick={() => navigate('/admin/users')}
            className="p-5 bg-[#101A33] hover:bg-[#1B2947] rounded-2xl border border-slate-800 transition-all text-left space-y-2 cursor-pointer group"
          >
            <Users className="w-5 h-5 text-[#D6B36A] group-hover:scale-105 transition-transform" />
            <h3 className="font-bold text-sm text-white">User & KYC Management</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Review citizen identification papers, freeze suspect accounts, and alter transaction velocity limits.
            </p>
          </button>

          <button
            onClick={() => navigate('/admin/transactions')}
            className="p-5 bg-[#101A33] hover:bg-[#1B2947] rounded-2xl border border-slate-800 transition-all text-left space-y-2 cursor-pointer group"
          >
            <Activity className="w-5 h-5 text-[#C8102E] group-hover:scale-105 transition-transform" />
            <h3 className="font-bold text-sm text-white">Transaction & Audit Monitoring</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Inspect double-entry debit/credit balance trails, inspect idempotency keys, and flag AML violations.
            </p>
          </button>

          <button
            onClick={() => navigate('/admin/providers')}
            className="p-5 bg-[#101A33] hover:bg-[#1B2947] rounded-2xl border border-slate-800 transition-all text-left space-y-2 cursor-pointer group"
          >
            <Sliders className="w-5 h-5 text-emerald-400 group-hover:scale-105 transition-transform" />
            <h3 className="font-bold text-sm text-white">Payment Provider Gateways</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Toggle Stripe, 1Link, Raast, and Checkout.com gateway environments between Sandbox and Live.
            </p>
          </button>
        </div>

        {/* Real-Time Immutable Audit Log Stream */}
        <div className="bg-[#101A33] rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-base font-bold text-white">Platform System & Compliance Audit Logs</h2>
              <span className="text-xs text-slate-400 font-mono">Real-time append-only ledger events</span>
            </div>
          </div>

          <div className="space-y-2">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-3 bg-[#0B1224] rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <div>
                    <span className="font-bold text-white block">{log.action}</span>
                    <span className="text-[11px] text-slate-400">{log.details} · Target: {log.targetId}</span>
                  </div>
                </div>
                <div className="text-right text-[11px] text-slate-400">
                  <span className="block text-slate-300">{log.adminEmail}</span>
                  <span>{log.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
