import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, ShieldCheck, UserX, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react';

interface ManagedUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  tier: 1 | 2 | 3;
  kycStatus: 'verified' | 'pending' | 'unverified' | 'rejected';
  balanceUsd: number;
  status: 'active' | 'frozen';
}

export const AdminUserManagementPage: React.FC = () => {
  const { navigate, user, adminApproveKyc } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const [userList, setUserList] = useState<ManagedUser[]>([
    { id: user.id, name: user.name, email: user.email, phone: user.phone, country: user.country, tier: user.tier, kycStatus: user.kycStatus, balanceUsd: user.balances.USD, status: 'active' },
    { id: 'usr_zaynoor_9901', name: 'Farhan Tariq', email: 'farhan.tariq@gmail.com', phone: '+92 300 8492019', country: 'Pakistan', tier: 2, kycStatus: 'verified', balanceUsd: 1420.00, status: 'active' },
    { id: 'usr_zaynoor_9902', name: 'Ayesha Siddiqui', email: 'ayesha.s@outlook.com', phone: '+92 321 4409182', country: 'Pakistan', tier: 1, kycStatus: 'pending', balanceUsd: 380.00, status: 'active' },
    { id: 'usr_zaynoor_9903', name: 'Zaid Al-Harbi', email: 'zaid.harbi@saudi.sa', phone: '+966 50 123 4567', country: 'Saudi Arabia', tier: 2, kycStatus: 'verified', balanceUsd: 8400.00, status: 'active' },
    { id: 'usr_zaynoor_9904', name: 'Suspicious Bot Account', email: 'anon8819@tempmail.io', phone: '+1 555 019241', country: 'United States', tier: 1, kycStatus: 'unverified', balanceUsd: 12.00, status: 'frozen' },
  ]);

  const handleToggleFreeze = (id: string) => {
    setUserList(prev => prev.map(u => {
      if (u.id === id) {
        return { ...u, status: u.status === 'active' ? 'frozen' : 'active' };
      }
      return u;
    }));
  };

  const handleApproveKyc = (id: string) => {
    setUserList(prev => prev.map(u => {
      if (u.id === id) {
        return { ...u, kycStatus: 'verified', tier: 3 };
      }
      return u;
    }));
    adminApproveKyc(id);
  };

  const filtered = userList.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-8 bg-[#0B1224] text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/admin')}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Admin Overview</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#101A33] rounded-2xl p-6 border border-slate-800 shadow-md">
          <div>
            <span className="text-xs font-mono font-bold text-[#D6B36A] uppercase">Regulatory Desk</span>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              User & Identity Management
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Inspect citizen dossiers, authorize Tier 3 commercial limits, or enforce compliance freezes.
            </p>
          </div>
          <div className="relative max-w-xs">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search user ID, name, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 text-xs text-white rounded-xl focus:outline-hidden"
            />
          </div>
        </div>

        <div className="bg-[#101A33] rounded-3xl p-6 border border-slate-800 shadow-sm overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3 font-semibold">User ID & Name</th>
                <th className="py-3 px-3 font-semibold">Contact</th>
                <th className="py-3 px-3 font-semibold">Country</th>
                <th className="py-3 px-3 font-semibold">Tier / KYC</th>
                <th className="py-3 px-3 font-semibold">Status</th>
                <th className="py-3 px-3 font-semibold text-right">Balance</th>
                <th className="py-3 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-3.5 px-3">
                    <span className="font-bold text-white block font-sans">{u.name}</span>
                    <span className="text-[10px] text-[#D6B36A]">{u.id}</span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-400 text-[11px]">
                    <span className="block text-slate-200">{u.email}</span>
                    <span>{u.phone}</span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-300 font-sans">
                    {u.country}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 mr-1">
                      Tier {u.tier}
                    </span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${u.kycStatus === 'verified' ? 'bg-emerald-500/20 text-emerald-400' : u.kycStatus === 'pending' ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-400'}`}>
                      {u.kycStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${u.status === 'active' ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right font-bold tabular-nums text-white">
                    ${u.balanceUsd.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3.5 px-3 text-right space-x-2">
                    {u.kycStatus !== 'verified' && (
                      <button
                        onClick={() => handleApproveKyc(u.id)}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] font-sans font-bold"
                      >
                        Approve
                      </button>
                    )}
                    <button
                      onClick={() => handleToggleFreeze(u.id)}
                      className={`px-2.5 py-1 rounded text-[11px] font-sans font-bold ${u.status === 'active' ? 'bg-rose-600/80 hover:bg-rose-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                    >
                      {u.status === 'active' ? 'Freeze' : 'Unfreeze'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};
