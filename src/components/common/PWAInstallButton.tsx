import React, { useState } from 'react';
import { Download, Share2, PlusSquare, X, CheckCircle, Smartphone } from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { useApp } from '../../context/AppContext';

export const PWAInstallButton: React.FC<{ variant?: 'header' | 'footer' | 'banner' }> = ({ variant = 'header' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const { language } = useApp();
  const isUrdu = language === 'ur';

  // If already running in standalone/installed mode, do not display
  if (isInstalled) {
    return null;
  }

  // Header compact pill button
  if (variant === 'header') {
    if (isInstallable) {
      return (
        <button
          onClick={install}
          title={isUrdu ? "ایپ انسٹال کریں" : "Install ZaynoorPay PWA"}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 shadow-sm transition hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>{isUrdu ? "ایپ حاصل کریں" : "Install App"}</span>
        </button>
      );
    }

    if (isIOS) {
      return (
        <>
          <button
            onClick={() => setShowIOSGuide(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-amber-400/40 text-amber-300 hover:bg-amber-400/10 transition cursor-pointer"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>{isUrdu ? "آئی او ایس ایپ" : "iOS Install"}</span>
          </button>

          {showIOSGuide && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
              <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-700 p-6 text-white shadow-2xl relative">
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#C8102E] flex items-center justify-center font-bold text-white text-lg">
                    Z
                  </div>
                  <div>
                    <h3 className="font-bold text-base">Install on iPhone / iPad</h3>
                    <p className="text-xs text-slate-400">Add ZaynoorPay to your Home Screen</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-slate-300">
                  <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50">
                    <Share2 className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                    <span>1. Tap the <strong>Share</strong> icon in the Safari navigation bar.</span>
                  </div>
                  <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50">
                    <PlusSquare className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                    <span>2. Scroll down and select <strong>Add to Home Screen</strong>.</span>
                  </div>
                  <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50">
                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>3. Open ZaynoorPay directly with zero address bar and biometric login!</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="mt-5 w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 font-semibold text-slate-950 text-sm transition"
                >
                  Got It
                </button>
              </div>
            </div>
          )}
        </>
      );
    }
  }

  // Footer or banner full CTA
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={install}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold text-xs transition shadow-md"
      >
        <Download className="w-4 h-4" />
        <span>{isUrdu ? "اینڈرائیڈ اور ڈیسک ٹاپ ایپ انسٹال کریں" : "Install Desktop & Mobile App (PWA)"}</span>
      </button>
    </div>
  );
};
