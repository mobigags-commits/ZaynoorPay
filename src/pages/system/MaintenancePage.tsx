import React from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../../components/brand/Logo';
import { Wrench, ShieldCheck, Clock } from 'lucide-react';

export const MaintenancePage: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="min-h-[calc(100vh-12rem)] py-16 flex items-center justify-center px-4 bg-[#101A33] text-white text-center">
      <div className="max-w-md w-full bg-[#1B2947] rounded-3xl p-8 border border-slate-700 shadow-2xl space-y-6">
        
        <div className="flex justify-center mb-2">
          <Logo variant="full" theme="light" size="lg" />
        </div>

        <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-[#D6B36A] flex items-center justify-center mx-auto">
          <Wrench className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold tracking-tight">
            Scheduled Infrastructure Upgrade
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            We are performing essential cryptographic key rotations and database shard optimizations. All user funds remain safely secured.
          </p>
        </div>

        <div className="p-3 bg-black/30 rounded-xl text-xs font-mono text-slate-400 flex items-center justify-center gap-2">
          <Clock className="w-4 h-4 text-[#D6B36A]" />
          <span>Estimated Completion: 03:00 UTC</span>
        </div>

        <button
          onClick={() => navigate('/')}
          className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition-colors"
        >
          Check Service Status
        </button>

      </div>
    </div>
  );
};
