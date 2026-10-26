import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Filter, Download, ArrowDownLeft, ArrowUpRight, Calendar, FileSpreadsheet } from 'lucide-react';

export const WalletBalanceHistoryPage: React.FC = () => {
  const { transactions, openReceipt, user } = useApp();
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterCurrency, setFilterCurrency] = useState<string>('all');

  const filtered = transactions.filter((tx) => {
    const matchesSearch = 
      tx.title.toLowerCase().includes(search.toLowerCase()) ||
      tx.recipient.toLowerCase().includes(search.toLowerCase()) ||
      tx.referenceNumber.toLowerCase().includes(search.toLowerCase());
    const matchesCat = filterCategory === 'all' || tx.category === filterCategory;
    const matchesCurr = filterCurrency === 'all' || tx.currency === filterCurrency;
    return matchesSearch && matchesCat && matchesCurr;
  });

  const handleExportCSV = () => {
    const headers = 'Transaction ID,Type,Title,Amount,Currency,Fee,Recipient,Status,Timestamp,Reference,IdempotencyKey\n';
    const rows = filtered.map(t => 
      `"${t.id}","${t.type}","${t.title}","${t.amount}","${t.currency}","${t.fee}","${t.recipient}","${t.status}","${t.timestamp}","${t.referenceNumber}","${t.idempotencyKey}"`
    ).join('\n');
    
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ZaynoorPay_Ledger_Export_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="py-8 bg-[#F4F6FA] text-slate-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#850D22]">Audit Trail</span>
            <h1 className="text-2xl font-extrabold text-[#101A33] tracking-tight">
              Wallet Balance & Transaction Ledger
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Immutable double-entry transaction history with verifiable cryptographic receipts.
            </p>
          </div>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-[#101A33] hover:bg-[#1B2947] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV Ledger</span>
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center gap-3 text-xs">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search reference, recipient, note..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:border-[#C8102E]"
            />
          </div>

          {/* Category Filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-300 bg-white font-medium focus:outline-hidden"
          >
            <option value="all">All Categories</option>
            <option value="transfer">P2P Transfers</option>
            <option value="utility">Utility Bills</option>
            <option value="mobile">Mobile Top-ups</option>
            <option value="merchant">Merchant Payments</option>
            <option value="deposit">Deposits</option>
            <option value="withdrawal">Withdrawals</option>
          </select>

          {/* Currency Filter */}
          <select
            value={filterCurrency}
            onChange={(e) => setFilterCurrency(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-300 bg-white font-medium focus:outline-hidden"
          >
            <option value="all">All Currencies</option>
            <option value="USD">USD ($)</option>
            <option value="PKR">PKR (Rs)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="AED">AED (د.إ)</option>
          </select>
        </div>

        {/* Table of Ledger Entries */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3 font-semibold">Type</th>
                  <th className="py-3 px-3 font-semibold">Reference #</th>
                  <th className="py-3 px-3 font-semibold">Title / Memo</th>
                  <th className="py-3 px-3 font-semibold">Party</th>
                  <th className="py-3 px-3 font-semibold">Timestamp</th>
                  <th className="py-3 px-3 font-semibold">Fee</th>
                  <th className="py-3 px-3 font-semibold text-right">Net Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((tx) => {
                  const isIncoming = tx.type === 'receive' || tx.type === 'add_money';
                  return (
                    <tr
                      key={tx.id}
                      onClick={() => openReceipt(tx)}
                      className="hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <td className="py-3 px-3">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isIncoming ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-[#C8102E]'}`}>
                          {isIncoming ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                        </div>
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px] font-semibold text-slate-700">
                        {tx.referenceNumber}
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-bold text-[#101A33] block">{tx.title}</span>
                        {tx.note && <span className="text-[10px] text-slate-400 italic">{tx.note}</span>}
                      </td>
                      <td className="py-3 px-3 text-slate-600 font-medium">
                        {tx.recipient}
                      </td>
                      <td className="py-3 px-3 text-slate-400 font-mono tabular-nums text-[11px]">
                        {tx.timestamp}
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-500">
                        {tx.currency} {tx.fee.toFixed(2)}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold tabular-nums">
                        <span className={isIncoming ? 'text-emerald-600' : 'text-slate-900'}>
                          {isIncoming ? '+' : '-'}{tx.currency} {tx.amount.toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-400 text-xs">
                      No transactions match your current search and filter criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
