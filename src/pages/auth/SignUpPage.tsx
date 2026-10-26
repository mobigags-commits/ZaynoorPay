import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../../components/brand/Logo';
import { User, Mail, Phone, Lock, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export const SignUpPage: React.FC = () => {
  const { navigate, updateUser } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('Pakistan');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  // Simple password strength calculator
  const getPasswordStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strength = getPasswordStrength();

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) return;
    setStep(2);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed || strength < 2) return;

    updateUser({
      name: fullName,
      email,
      phone,
      country,
    });

    navigate('/verify-otp');
  };

  return (
    <div className="min-h-[calc(100vh-10rem)] py-12 flex items-center justify-center px-4 bg-[#F4F6FA]">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <Logo variant="full" size="lg" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#101A33] tracking-tight">
            Create Your Digital Wallet
          </h1>
          <p className="text-xs text-slate-500">
            {step === 1 ? 'Step 1 of 2: Personal Profile Details' : 'Step 2 of 2: Security & Agreement'}
          </p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleStep1} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Full Legal Name</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. Eleanor Vance"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-[#C8102E]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Email Address</label>
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

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Mobile Phone (for 2FA SMS)</label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="tel"
                  placeholder="+92 300 1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 font-mono focus:outline-hidden focus:border-[#C8102E]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Primary Jurisdiction</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden"
              >
                <option value="Pakistan">Pakistan (PKR)</option>
                <option value="United States">United States (USD)</option>
                <option value="United Kingdom">United Kingdom (GBP)</option>
                <option value="United Arab Emirates">United Arab Emirates (AED)</option>
                <option value="Saudi Arabia">Saudi Arabia (SAR)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#101A33] hover:bg-[#1B2947] text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Continue to Password Setup</span>
              <ArrowRight className="w-4 h-4 text-[#D6B36A]" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleFinalSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Create Account Master Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="password"
                  placeholder="Minimum 8 characters with numbers & symbols"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-[#C8102E]"
                  required
                />
              </div>

              {/* Password Strength Indicator */}
              <div className="mt-2 space-y-1">
                <div className="flex gap-1 h-1.5">
                  <div className={`flex-1 rounded-full ${strength >= 1 ? 'bg-rose-500' : 'bg-slate-200'}`} />
                  <div className={`flex-1 rounded-full ${strength >= 2 ? 'bg-amber-500' : 'bg-slate-200'}`} />
                  <div className={`flex-1 rounded-full ${strength >= 3 ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                  <div className={`flex-1 rounded-full ${strength >= 4 ? 'bg-emerald-600' : 'bg-slate-200'}`} />
                </div>
                <span className="text-[10px] text-slate-500">
                  Strength: {strength <= 1 ? 'Weak' : strength <= 2 ? 'Fair' : strength === 3 ? 'Strong' : 'Very Secure'}
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl space-y-2 border border-slate-200 text-slate-600">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-4 h-4 rounded-sm accent-[#C8102E] mt-0.5"
                  required
                />
                <span>
                  I agree to the <button type="button" onClick={() => navigate('/terms')} className="text-[#850D22] font-semibold underline">Terms of Service</button> and acknowledge the <button type="button" onClick={() => navigate('/privacy-policy')} className="text-[#850D22] font-semibold underline">Privacy Policy</button>.
                </span>
              </label>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={!agreed}
                className="flex-1 py-3 bg-[#C8102E] hover:bg-[#850D22] text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>Complete Registration</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        <div className="pt-2 text-center text-xs text-slate-500">
          Already registered?{' '}
          <button
            onClick={() => navigate('/login')}
            className="font-bold text-[#850D22] hover:underline"
          >
            Sign In here
          </button>
        </div>

      </div>
    </div>
  );
};
