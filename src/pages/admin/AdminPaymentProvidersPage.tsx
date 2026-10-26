import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sliders, ShieldCheck, ArrowLeft, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

export const AdminPaymentProvidersPage: React.FC = () => {
  const { providers, toggleProviderStatus, navigate } = useApp();

  return (
    <div className="py-8 bg-[#0B1224] text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/admin')}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Admin Overview</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#101A33] rounded-2xl p-6 border border-slate-800 shadow-md">
          <div>
            <span className="text-xs font-mono font-bold text-[#D6B36A] uppercase">Gateway Adapters</span>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Payment Provider Configurations
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Manage network switches, webhook HMAC secret signatures, and throughput rate limits.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {providers.map((p) => (
            <div
              key={p.id}
              className="p-6 bg-[#101A33] rounded-3xl border border-slate-800 shadow-sm space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-base text-white">{p.name}</h3>
                  <span className="text-xs text-slate-400 font-mono block mt-0.5">{p.endpoint}</span>
                </div>
                <span className={`text-[10px] font-bold uppercase font-mono px-2.5 py-1 rounded-full ${p.status === 'connected_sandbox' ? 'bg-[#D6B36A]/20 text-[#D6B36A] border border-[#D6B36A]/30' : p.status === 'connected_live' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-500'}`}>
                  {p.status.replace('_', ' ')}
                </span>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl space-y-1.5 text-xs font-mono border border-slate-800/80">
                <div className="flex justify-between text-slate-300">
                  <span>Type:</span>
                  <span className="text-white">{p.type.replace('_', ' ').toUpperCase()}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>HMAC Webhook Verified:</span>
                  <span className="text-emerald-400">{p.webhookVerified ? 'PASSED (256-bit)' : 'FAILED'}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Rate Limit:</span>
                  <span className="text-white">{p.rateLimitPerSec} req/sec</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Currencies:</span>
                  <span className="text-[#D6B36A]">{p.supportedCurrencies.join(', ')}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">Mode Toggle:</span>
                <button
                  onClick={() => toggleProviderStatus(p.id)}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold text-xs transition-colors cursor-pointer"
                >
                  Cycle Status
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
