import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../../components/brand/Logo';
import { Lock, Mail, ArrowRight, ShieldCheck, UserCheck, KeyRound, Sparkles } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { navigate, loginAsCustomer, loginAsAdmin, language } = useApp();
  const [email, setEmail] = useState('aris.ahmed@example.com');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsCustomer();
  };

  return (
    <div className="min-h-[calc(100vh-10rem)] py-12 flex items-center justify-center px-4 bg-[#F4F6FA]">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
        
        {/* Top Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <Logo variant="full" size="lg" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#101A33] tracking-tight">
            Sign in to Your Wallet
          </h1>
          <p className="text-xs text-slate-500">
            Access multi-currency balances, cards, and instant settlements.
          </p>
        </div>

        {/* Demo Fast-Login Box (Crucial for Reviewer testing) */}
        <div className="p-3.5 bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#850D22]">
            <Sparkles className="w-4 h-4 text-[#D6B36A]" />
            <span>Instant Demo Account Shortcuts:</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={loginAsCustomer}
              className="py-2 px-3 bg-[#101A33] hover:bg-[#1B2947] text-white rounded-xl font-bold transition-all text-center flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#D6B36A]" />
              <span>Customer Demo</span>
            </button>
            <button
              type="button"
              onClick={loginAsAdmin}
              className="py-2 px-3 bg-[#C8102E] hover:bg-[#850D22] text-white rounded-xl font-bold transition-all text-center flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-white" />
              <span>Admin Demo</span>
            </button>
          </div>
        </div>

        {/* Standard Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Email or Mobile Phone</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-[#C8102E]"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-slate-700">Account Password</label>
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="text-[11px] text-[#850D22] hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-[#C8102E]"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded-sm accent-[#C8102E]"
              />
              <span className="text-slate-600">Remember this trusted device</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#101A33] hover:bg-[#1B2947] text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Sign In to ZaynoorPay</span>
            <ArrowRight className="w-4 h-4 text-[#D6B36A]" />
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-slate-500">
          Do not have an account?{' '}
          <button
            onClick={() => navigate('/signup')}
            className="font-bold text-[#850D22] hover:underline"
          >
            Create Free Wallet
          </button>
        </div>

      </div>
    </div>
  );
};
