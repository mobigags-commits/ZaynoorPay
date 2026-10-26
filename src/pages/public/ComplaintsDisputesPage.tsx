import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AlertCircle, CheckCircle2, ShieldAlert, ArrowRight, HelpCircle } from 'lucide-react';

export const ComplaintsDisputesPage: React.FC = () => {
  const { createTicket, user } = useApp();

  const [txRef, setTxRef] = useState('');
  const [disputeType, setDisputeType] = useState('unauthorized');
  const [amount, setAmount] = useState('');
  const [details, setDetails] = useState('');
  const [filed, setFiled] = useState(false);

  const handleDisputeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!txRef || !details) return;

    createTicket(
      {
        subject: `Dispute Filed: Ref ${txRef} (${disputeType})`,
        category: 'transaction',
        priority: 'high',
      },
      `Transaction Dispute Notice:\nRef: ${txRef}\nType: ${disputeType}\nAmount: ${amount}\nDetails: ${details}`
    );

    setFiled(true);
    setTxRef('');
    setAmount('');
    setDetails('');
  };

  return (
    <div className="py-12 bg-[#F4F6FA] text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#850D22]">
            Fair Resolution Procedure
          </span>
          <h1 className="text-3xl font-extrabold text-[#101A33] tracking-tight">
            Complaints & Dispute Resolution
          </h1>
          <p className="text-xs text-slate-600">
            We are committed to prompt, impartial adjudication of disputed transactions, erroneous debits, and service grievances.
          </p>
        </div>

        {/* Dispute Steps Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-2 text-xs shadow-xs">
            <span className="font-mono font-bold text-[#850D22] text-sm">STAGE 1</span>
            <h3 className="font-bold text-[#101A33]">File Direct Dispute</h3>
            <p className="text-slate-500">Submit the transaction reference number with evidence via our dispute form below.</p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-2 text-xs shadow-xs">
            <span className="font-mono font-bold text-[#850D22] text-sm">STAGE 2</span>
            <h3 className="font-bold text-[#101A33]">Internal Examination</h3>
            <p className="text-slate-500">Our Compliance Team reviews gateway logs within 48 hours and issues a determination within 14 days.</p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-2 text-xs shadow-xs">
            <span className="font-mono font-bold text-[#850D22] text-sm">STAGE 3</span>
            <h3 className="font-bold text-[#101A33]">Ombudsman Escalation</h3>
            <p className="text-slate-500">If unsatisfied, you may appeal directly to the Banking Ombudsman or Central Bank Consumer Protection Department.</p>
          </div>
        </div>

        {/* Interactive Dispute Filing Form */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-sm font-bold text-[#101A33]">
            <ShieldAlert className="w-5 h-5 text-[#C8102E]" />
            <span>File a Formal Transaction Dispute Ticket</span>
          </div>

          {filed && (
            <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Dispute ticket submitted. An investigator will review your cryptographic ledger proof.</span>
            </div>
          )}

          <form onSubmit={handleDisputeSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Transaction Reference Number</label>
                <input
                  type="text"
                  placeholder="e.g. ZN-REF-20261025-99214"
                  value={txRef}
                  onChange={(e) => setTxRef(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Dispute Reason</label>
                <select
                  value={disputeType}
                  onChange={(e) => setDisputeType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                >
                  <option value="unauthorized">Suspected Unauthorized Transaction</option>
                  <option value="duplicate_debit">Duplicate Debit for Single Purchase</option>
                  <option value="incorrect_amount">Incorrect Amount Charged</option>
                  <option value="merchant_non_delivery">Merchant Goods/Services Not Provided</option>
                  <option value="utility_failed">Utility Bill Not Acknowledged</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Disputed Amount (USD or Local Currency)</label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono"
                required
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Detailed Explanation & Circumstances</label>
              <textarea
                rows={4}
                placeholder="Describe why you are disputing this charge, date of occurrence, and any merchant communication..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#C8102E] hover:bg-[#850D22] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Submit Dispute for Investigation</span>
            </button>
          </form>
        </div>

        {/* Regulatory Escalation Contacts */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 text-xs space-y-3 text-slate-600">
          <span className="font-bold text-[#101A33] block">External Statutory Avenues</span>
          <p className="leading-relaxed">
            If our internal resolution does not resolve your concern within 14 business days, you may file an external appeal with:
          </p>
          <div className="p-4 bg-slate-50 rounded-xl space-y-1 font-mono text-[11px] text-slate-800 border border-slate-100">
            <p>• Banking Mohtasib (Ombudsman) Pakistan: info@bankingmohtasib.gov.pk</p>
            <p>• State Bank of Pakistan Consumer Protection: cpd.helpdesk@sbp.org.pk</p>
            <p>• Financial Ombudsman Service (UK): complaint.info@financial-ombudsman.org.uk</p>
          </div>
        </div>

      </div>
    </div>
  );
};
