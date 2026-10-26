import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Megaphone, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const AdminContentManagementPage: React.FC = () => {
  const { navigate } = useApp();
  const [broadcast, setBroadcast] = useState('Scheduled maintenance for SEPA Euro clearing corridor this Sunday at 02:00 UTC.');
  const [usdPkrRate, setUsdPkrRate] = useState('278.40');
  const [maintenanceActive, setMaintenanceActive] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="py-8 bg-[#0B1224] text-slate-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/admin')}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Admin Overview</span>
          </button>
        </div>

        <div className="bg-[#101A33] rounded-2xl p-6 border border-slate-800 shadow-md">
          <span className="text-xs font-mono font-bold text-[#D6B36A] uppercase">Broadcast & Market Operations</span>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Content & Rate Tickers Management
          </h1>
        </div>

        {saved && (
          <div className="p-4 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-2xl text-xs flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Market parameters and broadcast notices published to live endpoints.</span>
          </div>
        )}

        <div className="bg-[#101A33] rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-sm space-y-6 text-xs">
          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Live Global User Broadcast Banner</label>
              <textarea
                rows={3}
                value={broadcast}
                onChange={(e) => setBroadcast(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900/60 text-white focus:outline-hidden"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">USD to PKR Mid-Market Liquidity Rate Quote</label>
              <input
                type="text"
                value={usdPkrRate}
                onChange={(e) => setUsdPkrRate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900/60 font-mono text-white"
              />
            </div>

            <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Emergency Maintenance Mode</span>
                <span className="text-slate-400 text-[11px]">Directs non-admin requests to the maintenance notice page.</span>
              </div>
              <button
                type="button"
                onClick={() => setMaintenanceActive(!maintenanceActive)}
                className={`py-1.5 px-3 rounded-lg font-bold text-xs ${maintenanceActive ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400'}`}
              >
                {maintenanceActive ? 'ACTIVE' : 'OFF'}
              </button>
            </div>

            <button
              type="submit"
              className="py-3 px-6 bg-[#C8102E] hover:bg-[#850D22] text-white font-bold rounded-xl transition-colors cursor-pointer"
            >
              Save & Broadcast Updates
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
