import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CurrencyCode } from '../../types';
import { Users, Plus, Star, Trash2, Send, Search, CheckCircle2 } from 'lucide-react';

export const BeneficiariesPage: React.FC = () => {
  const { beneficiaries, addBeneficiary, removeBeneficiary, toggleFavoriteBeneficiary, navigate } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Add form state
  const [name, setName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankOrWallet, setBankOrWallet] = useState('Habib Bank Ltd');
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [type, setType] = useState<'zaynoor' | 'bank' | 'mobile_wallet'>('bank');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !accountNumber) return;

    addBeneficiary({
      name,
      accountNumber,
      bankOrWallet,
      currency,
      isFavorite: false,
      avatarInitials: name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase(),
      type,
    });

    setName('');
    setAccountNumber('');
    setShowAddModal(false);
  };

  const filtered = beneficiaries.filter(b =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.accountNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.bankOrWallet.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-8 bg-[#F4F6FA] text-slate-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#850D22]">Saved Contacts</span>
            <h1 className="text-2xl font-extrabold text-[#101A33] tracking-tight">
              Beneficiaries & Recipients
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage your saved bank accounts, Raast IDs, and ZaynoorPay wallet contacts for rapid transfers.
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#C8102E] hover:bg-[#850D22] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Recipient</span>
          </button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search saved contacts by name or account..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:border-[#C8102E]"
            />
          </div>
        </div>

        {/* Grid of Beneficiaries */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((b) => (
            <div
              key={b.id}
              className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#101A33] text-white flex items-center justify-center font-bold text-xs">
                    {b.avatarInitials}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#101A33]">{b.name}</h3>
                    <span className="text-[11px] text-slate-400 block">{b.bankOrWallet}</span>
                    <span className="text-[10px] font-mono text-slate-500 truncate max-w-[170px] block">
                      {b.accountNumber}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => toggleFavoriteBeneficiary(b.id)}
                  className={`p-1.5 rounded-lg transition-colors ${b.isFavorite ? 'text-amber-500 bg-amber-50' : 'text-slate-300 hover:text-slate-500'}`}
                  aria-label="Toggle favorite"
                >
                  <Star className={`w-4 h-4 ${b.isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-[#850D22] text-[11px]">
                  {b.currency}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => removeBeneficiary(b.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                    title="Delete Recipient"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => navigate('/send')}
                    className="px-3 py-1.5 bg-[#101A33] hover:bg-[#1B2947] text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Send className="w-3 h-3 text-[#D6B36A]" />
                    <span>Send</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
              <h3 className="text-base font-bold text-[#101A33]">Add Saved Beneficiary</h3>
              <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Full Recipient Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Ayesha Siddiqui"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-hidden"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Recipient Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  >
                    <option value="bank">Domestic Bank Account (IBAN)</option>
                    <option value="mobile_wallet">Raast / Mobile Wallet</option>
                    <option value="zaynoor">ZaynoorPay User Tag / ID</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Bank / Institution Name</label>
                  <input
                    type="text"
                    value={bankOrWallet}
                    onChange={(e) => setBankOrWallet(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Account Number / IBAN</label>
                  <input
                    type="text"
                    placeholder="PK36... or +92 300..."
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Currency</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="PKR">PKR (Rs)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="AED">AED (د.إ)</option>
                  </select>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-[#C8102E] text-white rounded-xl font-bold hover:bg-[#850D22]"
                  >
                    Save Recipient
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
