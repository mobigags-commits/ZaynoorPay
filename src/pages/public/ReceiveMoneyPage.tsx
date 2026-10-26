import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Download, QrCode, Copy, Check, Share2, ShieldCheck, ArrowRight } from 'lucide-react';

export const ReceiveMoneyPage: React.FC = () => {
  const { user, language } = useApp();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Request Money Form
  const [requestPayer, setRequestPayer] = useState('');
  const [requestAmount, setRequestAmount] = useState('');
  const [requestSent, setRequestSent] = useState(false);

  const paymentLink = `https://zaynoorpay.com/pay/@${user.name.toLowerCase().replace(/\s+/g, '')}`;

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestPayer || !requestAmount) return;
    setRequestSent(true);
    setTimeout(() => {
      setRequestSent(false);
      setRequestPayer('');
      setRequestAmount('');
    }, 4000);
  };

  return (
    <div className="py-12 bg-[#F4F6FA] text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#850D22]">
            Inbound Clearing
          </span>
          <h1 className="text-3xl font-extrabold text-[#101A33] tracking-tight">
            Receive & Request Money
          </h1>
          <p className="text-xs text-slate-600">
            Share your payment link, display your personal QR code, or create a formal request note.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Column: QR Code & Payment Link */}
          <div className="md:col-span-6 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm text-center space-y-5">
            <h3 className="text-sm font-bold text-[#101A33]">Your Universal QR Code</h3>
            
            {/* Clean SVG QR Presentation */}
            <div className="p-4 bg-slate-900 rounded-2xl inline-block shadow-md">
              <svg viewBox="0 0 100 100" className="w-48 h-48 text-white fill-current">
                <rect x="5" y="5" width="26" height="26" rx="4" />
                <rect x="9" y="9" width="18" height="18" fill="#101A33" />
                <rect x="13" y="13" width="10" height="10" />
                
                <rect x="69" y="5" width="26" height="26" rx="4" />
                <rect x="73" y="9" width="18" height="18" fill="#101A33" />
                <rect x="77" y="13" width="10" height="10" />

                <rect x="5" y="69" width="26" height="26" rx="4" />
                <rect x="9" y="73" width="18" height="18" fill="#101A33" />
                <rect x="13" y="77" width="10" height="10" />

                <circle cx="50" cy="50" r="10" fill="#D6B36A" />
                <rect x="36" y="20" width="6" height="16" />
                <rect x="58" y="24" width="8" height="8" />
                <rect x="42" y="72" width="14" height="6" />
                <rect x="72" y="52" width="8" height="18" />
              </svg>
            </div>

            <div>
              <span className="text-xs font-bold text-[#101A33] block">{user.name}</span>
              <span className="text-[11px] font-mono text-slate-500">Zaynoor ID: ZN-{user.id.slice(4, 9)}</span>
            </div>

            {/* Payment Link Copy */}
            <div className="pt-2">
              <label className="text-[11px] font-semibold text-slate-600 block text-left mb-1">
                Shareable Personal Pay Link
              </label>
              <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-600 truncate flex-1 font-mono text-left">
                  {paymentLink}
                </span>
                <button
                  onClick={() => copyToClipboard(paymentLink, 'paylink')}
                  className="px-3 py-1 bg-[#101A33] text-white rounded-lg text-xs font-semibold hover:bg-[#1B2947] transition-colors flex items-center gap-1 shrink-0"
                >
                  {copiedField === 'paylink' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedField === 'paylink' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Virtual Dedicated Accounts & Request Money Form */}
          <div className="md:col-span-6 space-y-6">
            
            {/* Dedicated Inbound Accounts */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-[#101A33] uppercase tracking-wider">
                Direct Bank Wire Inbound Details
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-slate-500 block text-[10px]">US Dollar (USD) Account #</span>
                    <span className="font-mono font-bold text-slate-800">8492019482910</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard('8492019482910', 'usd')}
                    className="p-1.5 text-slate-400 hover:text-slate-800"
                  >
                    {copiedField === 'usd' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Pakistan Rupee (PKR) Raast ID</span>
                    <span className="font-mono font-bold text-slate-800">{user.phone}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(user.phone, 'raast')}
                    className="p-1.5 text-slate-400 hover:text-slate-800"
                  >
                    {copiedField === 'raast' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Request Money Form */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-[#101A33] uppercase tracking-wider">
                Request Payment
              </h3>

              {requestSent && (
                <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Payment invoice request dispatched to {requestPayer}!</span>
                </div>
              )}

              <form onSubmit={handleSendRequest} className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Payer Email or Phone</label>
                  <input
                    type="text"
                    placeholder="e.g. client@agency.com"
                    value={requestPayer}
                    onChange={(e) => setRequestPayer(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-hidden"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Requested Amount (USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={requestAmount}
                    onChange={(e) => setRequestAmount(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono focus:outline-hidden"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#101A33] text-white rounded-xl font-bold hover:bg-[#1B2947] transition-colors"
                >
                  Dispatch Payment Request
                </button>
              </form>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
