import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, ShieldAlert, CheckCircle2, Search, Filter } from 'lucide-react';

export const AdminTransactionsAuditPage: React.FC = () => {
  const { transactions, openReceipt, navigate } = useApp();
  const [filterStatus, setFilterStatus] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = transactions.filter(t => {
    const matchSearch = t.referenceNumber.toLowerCase().includes(search.toLowerCase()) ||
                        t.recipient.toLowerCase().includes(search.toLowerCase()) ||
                        t.sender.toLowerCase().includes(search.toLowerCase()) ||
                        t.idempotencyKey.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || t.status === filterStatus;
    return matchSearch && matchStatus;
  });

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
            <span className="text-xs font-mono font-bold text-[#D6B36A] uppercase">Immutable Ledger Inspection</span>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Transaction Monitoring & Double-Entry Audit
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Verify cryptographic idempotency signatures, debit/credit matching legs, and AML velocity thresholds.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search reference or idempotency..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-2 bg-slate-900 border border-slate-700 text-xs text-white rounded-xl focus:outline-hidden"
            />
          </div>
        </div>

        <div className="bg-[#101A33] rounded-3xl p-6 border border-slate-800 shadow-sm overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3 font-semibold">Reference & Idempotency</th>
                <th className="py-3 px-3 font-semibold">Transaction Type</th>
                <th className="py-3 px-3 font-semibold">Double-Entry Legs</th>
                <th className="py-3 px-3 font-semibold">Parties</th>
                <th className="py-3 px-3 font-semibold">Timestamp</th>
                <th className="py-3 px-3 font-semibold">Status</th>
                <th className="py-3 px-3 font-semibold text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono">
              {filtered.map((t) => (
                <tr
                  key={t.id}
                  onClick={() => openReceipt(t)}
                  className="hover:bg-slate-900/60 transition-colors cursor-pointer"
                >
                  <td className="py-3.5 px-3">
                    <span className="font-bold text-white block">{t.referenceNumber}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{t.idempotencyKey}</span>
                  </td>
                  <td className="py-3.5 px-3 font-sans font-semibold text-[#D6B36A]">
                    {t.type.toUpperCase()}
                  </td>
                  <td className="py-3.5 px-3 text-[10px] text-slate-400">
                    {t.doubleEntryLegs.map((l, i) => (
                      <div key={i}>
                        DR: {l.debitAccount} / CR: {l.creditAccount}
                      </div>
                    ))}
                  </td>
                  <td className="py-3.5 px-3 font-sans text-slate-300">
                    <span className="block text-slate-200">{t.sender}</span>
                    <span className="text-slate-500 text-[11px]">→ {t.recipient}</span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-400 tabular-nums">
                    {t.timestamp}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                      {t.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right font-bold tabular-nums text-white">
                    {t.currency} {t.amount.toFixed(2)}
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
