import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../../components/brand/Logo';
import { ShieldCheck, ArrowRight, RefreshCw, CheckCircle2 } from 'lucide-react';

export const VerifyOtpPage: React.FC = () => {
  const { navigate, user, loginAsCustomer } = useApp();
  const [digits, setDigits] = useState(['8', '4', '9', '2', '', '']);
  const [resendTimer, setResendTimer] = useState(45);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (resendTimer > 0) {
      const interval = setInterval(() => setResendTimer(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [resendTimer]);

  const handleDigitChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const newDigits = [...digits];
    newDigits[index] = val.slice(-1);
    setDigits(newDigits);

    // Auto move to next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      setVerified(true);
      setTimeout(() => {
        loginAsCustomer();
      }, 1000);
    }, 1200);
  };

  return (
    <div className="min-h-[calc(100vh-10rem)] py-12 flex items-center justify-center px-4 bg-[#F4F6FA]">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6 text-center">
        
        <div className="flex justify-center mb-2">
          <Logo variant="full" size="lg" />
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold text-[#101A33] tracking-tight">
            Security Verification
          </h1>
          <p className="text-xs text-slate-500">
            A 6-digit one-time authorization code was sent to <strong className="text-slate-800 font-mono">{user.phone}</strong>.
          </p>
        </div>

        {verified ? (
          <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-2xl text-xs space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-sm">Passcode Confirmed</h4>
            <p>Accessing your encrypted wallet dashboard...</p>
          </div>
        ) : (
          <form onSubmit={handleVerify} className="space-y-6">
            
            {/* 6 Digit Input Blocks */}
            <div className="flex justify-center gap-2">
              {digits.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-input-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleDigitChange(idx, e.target.value)}
                  className="w-12 h-14 text-center font-mono text-xl font-bold rounded-xl border border-slate-300 focus:border-[#C8102E] focus:ring-2 focus:ring-[#C8102E]/20 text-[#101A33] focus:outline-hidden bg-slate-50"
                  required
                />
              ))}
            </div>

            <div className="text-xs text-slate-500">
              {resendTimer > 0 ? (
                <span>Resend available in <strong className="font-mono text-slate-800">{resendTimer}s</strong></span>
              ) : (
                <button
                  type="button"
                  onClick={() => setResendTimer(45)}
                  className="text-[#850D22] font-semibold hover:underline inline-flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Resend Verification SMS</span>
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3.5 bg-[#C8102E] hover:bg-[#850D22] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{isVerifying ? 'Checking Cryptographic Signature...' : 'Authorize & Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
