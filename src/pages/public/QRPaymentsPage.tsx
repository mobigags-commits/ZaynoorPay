import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { QrCode, Camera, Scan, CheckCircle2, ShieldCheck, RefreshCw } from 'lucide-react';

export const QRPaymentsPage: React.FC = () => {
  const { user, performTransaction } = useApp();
  const [mode, setMode] = useState<'scan' | 'generate'>('scan');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);

  // Dynamic QR generation
  const [customAmount, setCustomAmount] = useState('50.00');
  const [customNote, setCustomNote] = useState('Dinner split');

  const handleSimulateScan = () => {
    setIsScanning(true);
    setScanResult(null);

    setTimeout(() => {
      setIsScanning(false);
      setScanResult('EMV-QR: Gloria Jean’s Coffees (Till #4019)');
      performTransaction({
        type: 'merchant_qr',
        amount: 14.80,
        currency: 'USD',
        recipient: 'Gloria Jean’s Coffees (Till #4019)',
        category: 'merchant',
        note: 'QR Terminal Scan Payment',
      });
    }, 2000);
  };

  return (
    <div className="py-12 bg-[#F4F6FA] text-slate-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#850D22]">
            Contactless Technology
          </span>
          <h1 className="text-3xl font-extrabold text-[#101A33] tracking-tight">
            QR Code Payments
          </h1>
          <p className="text-xs text-slate-600">
            EMVCo standard QR code reader & generator. Pay in person or request specific amounts instantly.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setMode('scan')}
              className={`py-2 rounded-lg transition-colors flex items-center justify-center gap-2 ${mode === 'scan' ? 'bg-white text-[#101A33] shadow-xs' : 'text-slate-600'}`}
            >
              <Camera className="w-4 h-4" />
              <span>Scan QR Code</span>
            </button>
            <button
              onClick={() => setMode('generate')}
              className={`py-2 rounded-lg transition-colors flex items-center justify-center gap-2 ${mode === 'generate' ? 'bg-white text-[#101A33] shadow-xs' : 'text-slate-600'}`}
            >
              <QrCode className="w-4 h-4" />
              <span>Generate Dynamic QR</span>
            </button>
          </div>

          {mode === 'scan' ? (
            <div className="space-y-6 text-center">
              
              {/* Camera Viewfinder Simulation */}
              <div className="relative w-64 h-64 mx-auto rounded-3xl bg-slate-900 border-2 border-[#D6B36A] flex flex-col items-center justify-center overflow-hidden shadow-xl text-white">
                {isScanning && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#C8102E] animate-bounce shadow-lg shadow-rose-500" />
                )}
                
                <Scan className={`w-16 h-16 ${isScanning ? 'text-[#D6B36A] animate-pulse' : 'text-slate-500'}`} />
                <span className="text-xs mt-3 text-slate-300 font-medium">
                  {isScanning ? 'Aligning Optical QR Frame...' : 'Point camera at merchant QR'}
                </span>
                <span className="text-[10px] text-slate-500 mt-1">EMVCo / Raast / ISO 20022</span>
              </div>

              {scanResult && (
                <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Verified & Paid $14.80 to {scanResult}!</span>
                </div>
              )}

              <button
                onClick={handleSimulateScan}
                disabled={isScanning}
                className="px-6 py-3 bg-[#C8102E] hover:bg-[#850D22] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
              >
                {isScanning ? 'Scanning POS Terminal...' : 'Simulate Camera POS Scan'}
              </button>

            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Requested Amount (USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Invoice Memo / Reference</label>
                  <input
                    type="text"
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="p-6 bg-slate-900 rounded-2xl max-w-xs mx-auto text-center space-y-3 shadow-lg">
                <svg viewBox="0 0 100 100" className="w-44 h-44 text-white fill-current mx-auto">
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
                </svg>

                <div className="text-white text-xs">
                  <span className="block text-[#D6B36A] font-bold font-mono text-sm">
                    ${parseFloat(customAmount || '0').toFixed(2)} USD
                  </span>
                  <span className="text-[10px] text-slate-400">{customNote || 'Pay to Zaynoor'}</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
