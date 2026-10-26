import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../../components/brand/Logo';
import { Mail, ArrowLeft, CheckCircle2, Send } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const { navigate } = useApp();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
  };

  return (
    <div className="min-h-[calc(100vh-10rem)] py-12 flex items-center justify-center px-4 bg-[#F4F6FA]">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <Logo variant="full" size="lg" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#101A33] tracking-tight">
            Reset Account Access
          </h1>
          <p className="text-xs text-slate-500">
            Enter your registered email address to receive secure reset instructions.
          </p>
        </div>

        {sent ? (
          <div className="p-5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-2xl text-xs text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-sm">Reset Authorization Dispatched</h4>
            <p>
              We sent a time-sensitive security token link to <strong className="font-mono">{email}</strong>. Please check your inbox and spam folder.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="mt-3 px-4 py-2 bg-[#101A33] text-white rounded-xl font-bold hover:bg-[#1B2947] transition-colors"
            >
              Return to Sign In
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Registered Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="email"
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-[#C8102E]"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#101A33] hover:bg-[#1B2947] text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4 text-[#D6B36A]" />
              <span>Send Recovery Link</span>
            </button>
          </form>
        )}

        <div className="pt-2 text-center text-xs">
          <button
            onClick={() => navigate('/login')}
            className="text-slate-500 hover:text-slate-800 inline-flex items-center gap-1 font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Remembered your password? Back to Login</span>
          </button>
        </div>

      </div>
    </div>
  );
};
