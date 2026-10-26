import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, KeyRound, Smartphone, Laptop, Lock, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';

export const SecuritySettingsPage: React.FC = () => {
  const { user, updateUser } = useApp();

  const [twoFactor, setTwoFactor] = useState(user.twoFactorEnabled);
  const [biometrics, setBiometrics] = useState(user.biometricEnabled);
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [pinNotice, setPinNotice] = useState(false);
  const [sessions, setSessions] = useState([
    { id: 's1', device: 'Chrome on macOS (Current Device)', ip: '198.51.100.44', location: 'Lahore, Pakistan', active: 'Active now' },
    { id: 's2', device: 'ZaynoorPay iOS App (iPhone 16 Pro)', ip: '198.51.100.82', location: 'Lahore, Pakistan', active: '4 hours ago' },
    { id: 's3', device: 'Safari on iPad Pro', ip: '203.0.113.19', location: 'Dubai, UAE', active: '2 days ago' },
  ]);
  const [sessionNotice, setSessionNotice] = useState('');

  const handlePinUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length !== 6) return;
    setPinNotice(true);
    setCurrentPin('');
    setNewPin('');
    setTimeout(() => setPinNotice(false), 4000);
  };

  const handleRevokeOtherSessions = () => {
    setSessions(prev => [prev[0]]);
    setSessionNotice('All other remote device sessions revoked.');
    setTimeout(() => setSessionNotice(''), 4000);
  };

  const handleToggle2fa = () => {
    const updated = !twoFactor;
    setTwoFactor(updated);
    updateUser({ twoFactorEnabled: updated });
  };

  const handleToggleBiometric = () => {
    const updated = !biometrics;
    setBiometrics(updated);
    updateUser({ biometricEnabled: updated });
  };

  return (
    <div className="py-8 bg-[#F4F6FA] text-slate-800 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-[#850D22]">Access Control</span>
          <h1 className="text-2xl font-extrabold text-[#101A33] tracking-tight">
            Security Settings & Active Sessions
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure multi-factor authentication, rolling TOTP keys, biometric signatures, and active device logins.
          </p>
        </div>

        {/* 2FA & Biometric Toggles */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-base font-bold text-[#101A33]">Multi-Factor Authentication</h2>

          <div className="space-y-4 text-xs">
            {/* TOTP 2FA */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-bold text-[#101A33]">
                  <KeyRound className="w-4 h-4 text-[#C8102E]" />
                  <span>Authenticator App (TOTP 2FA)</span>
                </div>
                <p className="text-slate-500">
                  Requires a rotating 6-digit cryptographic security code from Google Authenticator or 1Password.
                </p>
              </div>
              <button
                type="button"
                onClick={handleToggle2fa}
                className={`py-1.5 px-3 rounded-xl font-bold transition-all cursor-pointer ${twoFactor ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'}`}
              >
                {twoFactor ? 'ENABLED' : 'DISABLED'}
              </button>
            </div>

            {/* Biometric */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-bold text-[#101A33]">
                  <Smartphone className="w-4 h-4 text-[#101A33]" />
                  <span>Biometric Quick Unlock</span>
                </div>
                <p className="text-slate-500">
                  Allow Touch ID or Face ID for fast wallet access and payment authorization on verified hardware.
                </p>
              </div>
              <button
                type="button"
                onClick={handleToggleBiometric}
                className={`py-1.5 px-3 rounded-xl font-bold transition-all cursor-pointer ${biometrics ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'}`}
              >
                {biometrics ? 'ENABLED' : 'DISABLED'}
              </button>
            </div>
          </div>
        </div>

        {/* Change Transaction PIN */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-[#101A33]">6-Digit Transaction PIN</h2>
          <p className="text-xs text-slate-500">
            This numerical PIN is required to authorize all money transfers, utility bill payments, and cash-outs.
          </p>

          {pinNotice && (
            <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Transaction PIN successfully updated.</span>
            </div>
          )}

          <form onSubmit={handlePinUpdate} className="space-y-3 max-w-md text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Current PIN</label>
              <input
                type="password"
                maxLength={6}
                value={currentPin}
                onChange={(e) => setCurrentPin(e.target.value)}
                placeholder="••••••"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-center tracking-widest"
                required
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">New 6-Digit PIN</label>
              <input
                type="password"
                maxLength={6}
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                placeholder="••••••"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-center tracking-widest"
                required
              />
            </div>
            <button
              type="submit"
              className="py-2.5 px-4 bg-[#101A33] hover:bg-[#1B2947] text-white font-bold rounded-xl transition-colors"
            >
              Update Transaction PIN
            </button>
          </form>
        </div>

        {/* Active Device Sessions */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#101A33]">Active Device Sessions</h2>
            {sessions.length > 1 && (
              <button
                onClick={handleRevokeOtherSessions}
                className="text-xs font-bold text-rose-600 hover:underline"
              >
                Revoke All Other Sessions
              </button>
            )}
          </div>

          {sessionNotice && (
            <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs">
              {sessionNotice}
            </div>
          )}

          <div className="space-y-2 text-xs">
            {sessions.map((s) => (
              <div key={s.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Laptop className="w-5 h-5 text-slate-500" />
                  <div>
                    <span className="font-bold text-[#101A33] block">{s.device}</span>
                    <span className="text-[11px] text-slate-400 font-mono">IP: {s.ip} · {s.location}</span>
                  </div>
                </div>
                <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono">
                  {s.active}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
