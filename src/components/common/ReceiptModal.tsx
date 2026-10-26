import React from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../brand/Logo';
import { CheckCircle2, Download, Printer, X, ShieldCheck } from 'lucide-react';

export const ReceiptModal: React.FC = () => {
  const { activeReceipt, closeReceipt, t, language } = useApp();

  if (!activeReceipt) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const textContent = `
========================================
           ZAYNOORPAY OFFICIAL RECEIPT
========================================
Transaction ID:    ${activeReceipt.id}
Reference Number:  ${activeReceipt.referenceNumber}
Idempotency Key:   ${activeReceipt.idempotencyKey}
Timestamp:         ${activeReceipt.timestamp}
Status:            ${activeReceipt.status.toUpperCase()}
Category:          ${activeReceipt.category}

Type:              ${activeReceipt.type.toUpperCase()}
Amount:            ${activeReceipt.currency} ${activeReceipt.amount.toLocaleString()}
Processing Fee:    ${activeReceipt.currency} ${activeReceipt.fee.toFixed(2)}
Total Debited:     ${activeReceipt.currency} ${activeReceipt.netAmount.toLocaleString()}

Sender:            ${activeReceipt.sender}
Recipient:         ${activeReceipt.recipient}
${activeReceipt.recipientAccount ? `Account/Ref:       ${activeReceipt.recipientAccount}\n` : ''}
Memo/Note:         ${activeReceipt.note || 'None'}

DOUBLE-ENTRY LEDGER AUDIT TRAIL:
${activeReceipt.doubleEntryLegs.map(l => `  Debit: ${l.debitAccount} | Credit: ${l.creditAccount} | ${activeReceipt.currency} ${l.amount}`).join('\n')}

Notice: DEMO ENVIRONMENT - Verified by ZaynoorPay Cryptographic Ledger
========================================
    `;

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ZaynoorPay_Receipt_${activeReceipt.referenceNumber}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 text-slate-800">
        
        {/* Top Header with Brand */}
        <div className="bg-[#101A33] px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo variant="full" theme="light" size="sm" />
            <span className="text-[10px] bg-[#D6B36A]/20 text-[#D6B36A] px-2 py-0.5 rounded font-mono font-medium">
              VERIFIED RECEIPT
            </span>
          </div>
          <button
            onClick={closeReceipt}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close receipt"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          
          {/* Status Indicator */}
          <div className="text-center pb-3 border-b border-slate-100">
            <div className="inline-flex p-3 bg-emerald-50 text-emerald-600 rounded-full mb-2">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              {language === 'ur' ? 'کامیاب ٹرانزیکشن' : 'Payment Completed Successfully'}
            </p>
            <h2 className="text-3xl font-extrabold text-[#101A33] mt-1 tabular-nums">
              {activeReceipt.currency} {activeReceipt.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {activeReceipt.title}
            </p>
          </div>

          {/* Details Table */}
          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">{t.common.reference}</span>
              <span className="font-mono font-semibold text-slate-800">{activeReceipt.referenceNumber}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">{t.common.date}</span>
              <span className="text-slate-800 tabular-nums">{activeReceipt.timestamp}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Sender</span>
              <span className="font-medium text-slate-800">{activeReceipt.sender}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">{t.common.recipient}</span>
              <span className="font-medium text-slate-800">{activeReceipt.recipient}</span>
            </div>

            {activeReceipt.recipientAccount && (
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Account / Till</span>
                <span className="font-mono text-slate-800">{activeReceipt.recipientAccount}</span>
              </div>
            )}

            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">{t.common.fee}</span>
              <span className="text-slate-800 tabular-nums font-mono">
                {activeReceipt.currency} {activeReceipt.fee.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-100 font-semibold text-slate-900">
              <span>{t.common.total}</span>
              <span className="tabular-nums font-mono text-[#C8102E]">
                {activeReceipt.currency} {activeReceipt.netAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>

            {activeReceipt.note && (
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">{t.common.note}</span>
                <span className="text-slate-700 italic">{activeReceipt.note}</span>
              </div>
            )}
          </div>

          {/* Double-entry Ledger Footprint */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-1.5 text-[11px]">
            <div className="flex items-center gap-1.5 text-slate-600 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Double-Entry Cryptographic Balance Trail</span>
            </div>
            {activeReceipt.doubleEntryLegs.map((leg, i) => (
              <div key={i} className="flex justify-between text-slate-500 font-mono text-[10px]">
                <span>DR: {leg.debitAccount} / CR: {leg.creditAccount}</span>
                <span>{activeReceipt.currency} {leg.amount}</span>
              </div>
            ))}
            <div className="text-[10px] text-slate-400 pt-1 font-mono">
              Idempotency: {activeReceipt.idempotencyKey}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>{t.actions.printReceipt}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#101A33] text-white text-xs font-semibold hover:bg-[#1B2947] transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>{t.actions.downloadReceipt}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
