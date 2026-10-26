import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldAlert, Home, ArrowLeft } from 'lucide-react';

export const AccessDeniedPage: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="min-h-[calc(100vh-12rem)] py-16 flex items-center justify-center px-4 bg-[#F4F6FA] text-center">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
        
        <div className="w-14 h-14 rounded-2xl bg-rose-50 text-[#C8102E] flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-3xl font-black text-[#C8102E]">403</span>
          <h1 className="text-2xl font-extrabold text-[#101A33] tracking-tight">
            Access Denied
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            You do not have the required administrative credentials or cryptographic token permissions to access this internal console.
          </p>
        </div>

        <button
          onClick={() => navigate('/')}
          className="w-full py-3 bg-[#101A33] hover:bg-[#1B2947] text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <Home className="w-4 h-4 text-[#D6B36A]" />
          <span>Return to Public Website</span>
        </button>

      </div>
    </div>
  );
};
