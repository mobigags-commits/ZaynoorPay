import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Receipt, Zap, Flame, Droplets, Wifi, GraduationCap, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

interface BillCompany {
  id: string;
  name: string;
  category: 'electricity' | 'gas' | 'water' | 'internet' | 'education';
  icon: React.ReactNode;
  sampleConsumer: string;
  sampleAmount: number;
  duePeriod: string;
}

export const BillPaymentsPage: React.FC = () => {
  const { performTransaction, user } = useApp();

  const companies: BillCompany[] = [
    { id: 'lesco', name: 'LESCO Electricity', category: 'electricity', icon: <Zap className="w-4 h-4 text-amber-500" />, sampleConsumer: '08-11234-99881', sampleAmount: 142.00, duePeriod: 'Oct 2026' },
    { id: 'kelectric', name: 'K-Electric Karachi', category: 'electricity', icon: <Zap className="w-4 h-4 text-amber-500" />, sampleConsumer: '12-98412-00192', sampleAmount: 185.50, duePeriod: 'Oct 2026' },
    { id: 'sngpl', name: 'Sui Northern Gas (SNGPL)', category: 'gas', icon: <Flame className="w-4 h-4 text-orange-500" />, sampleConsumer: '99214019284', sampleAmount: 48.20, duePeriod: 'Oct 2026' },
    { id: 'ssgc', name: 'Sui Southern Gas (SSGC)', category: 'gas', icon: <Flame className="w-4 h-4 text-orange-500" />, sampleConsumer: '88102941029', sampleAmount: 39.00, duePeriod: 'Oct 2026' },
    { id: 'wasa', name: 'WASA Water & Sanitation', category: 'water', icon: <Droplets className="w-4 h-4 text-blue-500" />, sampleConsumer: 'WASA-0029-441', sampleAmount: 18.00, duePeriod: 'Oct 2026' },
    { id: 'ptcl', name: 'PTCL Broadband & EVO', category: 'internet', icon: <Wifi className="w-4 h-4 text-emerald-500" />, sampleConsumer: '042-35891024', sampleAmount: 35.00, duePeriod: 'Oct 2026' },
    { id: 'stormfiber', name: 'StormFiber FTTH', category: 'internet', icon: <Wifi className="w-4 h-4 text-emerald-500" />, sampleConsumer: 'SF-991204', sampleAmount: 42.00, duePeriod: 'Oct 2026' },
    { id: 'lums', name: 'LUMS University Tuition', category: 'education', icon: <GraduationCap className="w-4 h-4 text-indigo-500" />, sampleConsumer: 'STD-2026-904', sampleAmount: 620.00, duePeriod: 'Fall Semester' },
  ];

  const [selectedCompany, setSelectedCompany] = useState<BillCompany>(companies[0]);
  const [consumerNumber, setConsumerNumber] = useState(companies[0].sampleConsumer);
  const [billFetched, setBillFetched] = useState<boolean>(true);
  const [isPaying, setIsPaying] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSelectCompany = (comp: BillCompany) => {
    setSelectedCompany(comp);
    setConsumerNumber(comp.sampleConsumer);
    setBillFetched(true);
    setErrorMsg('');
  };

  const handlePayBill = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    setIsPaying(true);
    const res = performTransaction({
      type: 'bill_payment',
      amount: selectedCompany.sampleAmount,
      currency: 'USD',
      recipient: selectedCompany.name,
      recipientAccount: consumerNumber,
      category: 'utility',
      note: `${selectedCompany.duePeriod} Bill Settlement`,
      customFee: 0.00, // 0 fee for consumers
    });

    setIsPaying(false);

    if (!res.success) {
      setErrorMsg(res.error || 'Bill payment failed');
    }
  };

  return (
    <div className="py-12 bg-[#F4F6FA] text-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#850D22]">
            Zero Processing Surcharge
          </span>
          <h1 className="text-3xl font-extrabold text-[#101A33] tracking-tight">
            Utility Bill Payments
          </h1>
          <p className="text-xs text-slate-600">
            Pay electricity, gas, municipal water, broadband, and tuition fees with immediate consumer clearance codes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Company Picker */}
          <div className="md:col-span-5 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-[#101A33] uppercase tracking-wider">
              Select Biller Company
            </h3>

            <div className="space-y-1.5 max-h-[460px] overflow-y-auto pr-1">
              {companies.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleSelectCompany(c)}
                  className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${selectedCompany.id === c.id ? 'border-[#C8102E] bg-rose-50/20 font-bold text-[#101A33]' : 'border-slate-100 hover:border-slate-300 text-slate-700'}`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-slate-100 rounded-lg">
                      {c.icon}
                    </div>
                    <div>
                      <span className="text-xs block">{c.name}</span>
                      <span className="text-[10px] text-slate-400 capitalize">{c.category}</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-800">
                    ${c.sampleAmount.toFixed(2)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Bill Payment Form & Inquiry */}
          <div className="md:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-slate-100 rounded-xl">
                  {selectedCompany.icon}
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#101A33]">{selectedCompany.name}</h3>
                  <span className="text-[11px] text-slate-500">Billing Period: {selectedCompany.duePeriod}</span>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-mono text-xs font-bold rounded-lg">
                CONNECTED
              </span>
            </div>

            {errorMsg && (
              <div className="p-3 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handlePayBill} className="space-y-4 text-xs">
              
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Consumer / Reference Number</label>
                <input
                  type="text"
                  value={consumerNumber}
                  onChange={(e) => setConsumerNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono text-slate-900 focus:outline-hidden"
                  required
                />
              </div>

              {billFetched && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Consumer Name:</span>
                    <span className="font-semibold text-slate-800">{user.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Bill Status:</span>
                    <span className="text-amber-600 font-bold">UNPAID (Due: Nov 05, 2026)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Service Fee:</span>
                    <span className="text-emerald-600 font-semibold">$0.00 (Free)</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-bold text-[#101A33]">
                    <span>Total Amount Due:</span>
                    <span className="font-mono text-[#C8102E]">${selectedCompany.sampleAmount.toFixed(2)} USD</span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isPaying}
                className="w-full py-3.5 bg-[#C8102E] hover:bg-[#850D22] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Receipt className="w-4 h-4" />
                <span>{isPaying ? 'Processing Biller Direct Debit...' : `Pay $${selectedCompany.sampleAmount.toFixed(2)} USD Bill`}</span>
              </button>

            </form>

          </div>

        </div>

      </div>
    </div>
  );
};
