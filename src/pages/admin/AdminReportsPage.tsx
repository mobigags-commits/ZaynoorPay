import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, BarChart3, TrendingUp, PieChart, Download } from 'lucide-react';

export const AdminReportsPage: React.FC = () => {
  const { navigate } = useApp();

  const corridors = [
    { name: 'UK (GBP) → Pakistan (PKR)', share: 38, vol: '$1,831,000' },
    { name: 'UAE (AED) → Pakistan (PKR)', share: 29, vol: '$1,397,000' },
    { name: 'USA (USD) → Pakistan (PKR)', share: 21, vol: '$1,012,000' },
    { name: 'EU (EUR) → Pakistan (PKR)', share: 12, vol: '$578,000' },
  ];

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
            <span className="text-xs font-mono font-bold text-[#D6B36A] uppercase">Regulatory Analytics</span>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Platform Liquidity & Volume Reports
            </h1>
          </div>
          <button
            onClick={() => alert('Exporting signed regulatory audit package...')}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-colors"
          >
            Export Signed Compliance Bundle
          </button>
        </div>

        {/* Corridor Breakdown Cards */}
        <div className="bg-[#101A33] rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-sm space-y-6">
          <h2 className="text-base font-bold text-white">Cross-Border Remittance Corridor Flow (30-Day Trailing)</h2>
          
          <div className="space-y-4">
            {corridors.map((c, i) => (
              <div key={i} className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span className="font-semibold text-white">{c.name}</span>
                  <span className="font-mono text-[#D6B36A] font-bold">{c.vol} ({c.share}%)</span>
                </div>
                <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#C8102E] to-[#D6B36A] rounded-full"
                    style={{ width: `${c.share}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
