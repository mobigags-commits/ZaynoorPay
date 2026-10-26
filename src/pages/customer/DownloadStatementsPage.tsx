import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CurrencyCode } from '../../types';
import { Download, FileText, Calendar, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const DownloadStatementsPage: React.FC = () => {
  const { user, transactions } = useApp();
  const [period, setPeriod] = useState('current_month');
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [format, setFormat] = useState<'pdf' | 'csv' | 'json'>('pdf');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();

    const filtered = transactions.filter(t => t.currency === currency);
    const totalInflow = filtered.filter(t => t.type === 'receive' || t.type === 'add_money').reduce((acc, c) => acc + c.amount, 0);
    const totalOutflow = filtered.filter(t => t.type !== 'receive' && t.type !== 'add_money').reduce((acc, c) => acc + c.amount, 0);

    const statementContent = `
================================================================================
             ZAYNOORPAY OFFICIAL MULTI-CURRENCY FINANCIAL STATEMENT
================================================================================
Account Holder:        ${user.name}
Account ID:            ${user.id}
Jurisdiction:          ${user.country}
KYC Tier Status:       Tier ${user.tier} (Verified)
Statement Period:      ${period.toUpperCase().replace('_', ' ')}
Statement Currency:    ${currency}
Closing Ledger Balance: ${currency} ${(user.balances[currency] || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}

SUMMARY OF MOVEMENTS:
Total Inbound Credits: ${currency} ${totalInflow.toLocaleString(undefined, { minimumFractionDigits: 2 })}
Total Outbound Debits:  ${currency} ${totalOutflow.toLocaleString(undefined, { minimumFractionDigits: 2 })}
Net Financial Position: ${currency} ${(totalInflow - totalOutflow).toLocaleString(undefined, { minimumFractionDigits: 2 })}

TRANSACTION LEDGER AUDIT TRAIL:
--------------------------------------------------------------------------------
Ref Number              Date & Time       Type         Party               Amount
--------------------------------------------------------------------------------
${filtered.map(t => `${t.referenceNumber.padEnd(24)} ${t.timestamp.padEnd(17)} ${t.type.padEnd(12)} ${t.recipient.slice(0, 18).padEnd(20)} ${t.currency} ${t.amount.toFixed(2)}`).join('\n')}
--------------------------------------------------------------------------------
This official digital statement is verified by ZaynoorPay Cryptographic Core.
DEMO ENVIRONMENT RECONCILIATION - NO STATUTORY LIENS ATTACHED
================================================================================
    `;

    const blob = new Blob([statementContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ZaynoorPay_Official_Statement_${currency}_${period}.txt`;
    a.click();
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <div className="py-8 bg-[#F4F6FA] text-slate-800 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-[#850D22]">Tax & Accounting Records</span>
          <h1 className="text-2xl font-extrabold text-[#101A33] tracking-tight">
            Download Financial Statements
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Export cryptographic certified statements suitable for visa applications, tax filing, and auditing.
          </p>
        </div>

        {downloadSuccess && (
          <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-2xl text-xs flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Official cryptographic financial statement generated and downloaded successfully.</span>
          </div>
        )}

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <form onSubmit={handleGenerate} className="space-y-4 text-xs">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Time Period</label>
                <select
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                >
                  <option value="current_month">Current Month (October 2026)</option>
                  <option value="last_month">Last Month (September 2026)</option>
                  <option value="last_quarter">Last Quarter (Q3 2026)</option>
                  <option value="year_to_date">Year-to-Date (2026 Full Year)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Currency Ledger</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono font-semibold"
                >
                  <option value="USD">USD - United States Dollar ($)</option>
                  <option value="PKR">PKR - Pakistan Rupee (Rs)</option>
                  <option value="EUR">EUR - Euro (€)</option>
                  <option value="GBP">GBP - British Pound (£)</option>
                  <option value="AED">AED - UAE Dirham (د.إ)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-2">Export Format</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'pdf', label: 'PDF Official Statement', sub: 'Stamped & Verified' },
                  { id: 'csv', label: 'CSV Spreadsheet', sub: 'Excel / QuickBooks' },
                  { id: 'json', label: 'JSON Ledger Feed', sub: 'Machine Parseable' },
                ].map((fmt) => (
                  <button
                    key={fmt.id}
                    type="button"
                    onClick={() => setFormat(fmt.id as any)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${format === fmt.id ? 'border-[#C8102E] bg-rose-50/20 ring-1 ring-[#C8102E]' : 'border-slate-200'}`}
                  >
                    <span className="font-bold text-xs text-[#101A33] block">{fmt.label}</span>
                    <span className="text-[10px] text-slate-400">{fmt.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#101A33] hover:bg-[#1B2947] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              <Download className="w-4 h-4 text-[#D6B36A]" />
              <span>Generate & Download Statement</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
