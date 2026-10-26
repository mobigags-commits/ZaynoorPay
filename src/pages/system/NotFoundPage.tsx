import React from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../../components/brand/Logo';
import { ArrowLeft, Home, Search, HelpCircle } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="min-h-[calc(100vh-12rem)] py-16 flex items-center justify-center px-4 bg-[#F4F6FA] text-center">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
        
        <div className="flex justify-center mb-2">
          <Logo variant="icon" size="lg" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-4xl font-black text-[#C8102E]">404</span>
          <h1 className="text-2xl font-extrabold text-[#101A33] tracking-tight">
            Page Not Found
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            The requested financial endpoint or URL does not exist or has been relocated to a secure route.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs pt-2">
          <button
            onClick={() => navigate('/')}
            className="py-2.5 px-4 bg-[#101A33] hover:bg-[#1B2947] text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-1.5"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </button>
          <button
            onClick={() => navigate('/help')}
            className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-colors flex items-center justify-center gap-1.5"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Help Center</span>
          </button>
        </div>

      </div>
    </div>
  );
};
