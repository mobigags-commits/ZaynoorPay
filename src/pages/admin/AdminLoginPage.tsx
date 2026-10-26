import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../../components/brand/Logo';
import { ShieldCheck, Lock, Mail, ArrowRight, KeyRound } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { loginAsAdmin, navigate } = useApp();
  const [adminEmail, setAdminEmail] = useState('compliance.officer@zaynoorpay.com');
  const [password, setPassword] = useState('••••••••••••');
  const [hardwareKey, setHardwareKey] = useState('FIDO2-SEC-KEY-9941');

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsAdmin();
  };

  return (
    <div className="min-h-[calc(100vh-10rem)] py-12 flex items-center justify-center px-4 bg-[#0B1224] text-white">
      <div className="w-full max-w-md bg-[#101A33] rounded-3xl p-8 border border-slate-700 shadow-2xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <Logo variant="full" theme="light" size="lg" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/10 text-[#C8102E] text-[10px] font-mono font-bold border border-rose-500/20">
            INTERNAL RESTRICTED AREA
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">
            Staff & Regulatory Console
          </h1>
          <p className="text-xs text-slate-400">
            Authorized compliance officers, risk underwriters, and node operators only.
          </p>
        </div>

        <form onSubmit={handleAdminAuth} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-300 block mb-1">Corporate Staff Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900/60 text-white focus:outline-hidden focus:border-[#D6B36A]"
                required
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-300 block mb-1">Passphrase</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900/60 text-white focus:outline-hidden focus:border-[#D6B36A]"
                required
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-300 block mb-1">Hardware Security Key / Token ID</label>
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={hardwareKey}
                onChange={(e) => setHardwareKey(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900/60 font-mono text-white focus:outline-hidden"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#C8102E] hover:bg-[#850D22] text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <ShieldCheck className="w-4 h-4 text-[#D6B36A]" />
            <span>Authorize Regulatory Staff Session</span>
          </button>
        </form>

        <div className="pt-2 text-center text-[11px] text-slate-500">
          Unauthorized attempts are logged with client IP address & forwarded to central security.
        </div>

      </div>
    </div>
  );
};
