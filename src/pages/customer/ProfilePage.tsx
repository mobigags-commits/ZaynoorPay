import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, Mail, Phone, MapPin, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, updateUser } = useApp();
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [country, setCountry] = useState(user.country);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, phone, country });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 4000);
  };

  return (
    <div className="py-8 bg-[#F4F6FA] text-slate-800 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-[#850D22]">Identity Record</span>
          <h1 className="text-2xl font-extrabold text-[#101A33] tracking-tight">
            Profile & Account Settings
          </h1>
        </div>

        {savedNotice && (
          <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Profile information updated successfully.</span>
          </div>
        )}

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          
          {/* Avatar and Tier Lockup */}
          <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
            <div className="w-16 h-16 rounded-2xl bg-[#101A33] text-white flex items-center justify-center font-bold text-xl border-2 border-[#D6B36A]">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-[#101A33]">{user.name}</h3>
                <span className="text-[10px] font-mono font-bold bg-[#D6B36A]/20 text-[#850D22] px-2 py-0.5 rounded">
                  TIER {user.tier}
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono">Account ID: {user.id}</span>
              <span className="text-xs text-slate-400 block">Member since: {user.createdAt}</span>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Full Legal Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Email Address (Fixed)</label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Registered Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Country of Primary Residence</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                >
                  <option value="Pakistan">Pakistan</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#101A33] hover:bg-[#1B2947] text-white font-bold rounded-xl transition-colors cursor-pointer"
              >
                Save Profile Changes
              </button>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
};
