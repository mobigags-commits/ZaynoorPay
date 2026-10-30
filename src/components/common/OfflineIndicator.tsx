import React from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';
import { useApp } from '../../context/AppContext';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();
  const { language } = useApp();
  const isUrdu = language === 'ur';

  if (isOnline) return null;

  return (
    <aside aria-label="Offline status banner" className="fixed bottom-4 left-4 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-medium text-xs shadow-2xl border border-amber-400 animate-bounce">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-slate-950"></span>
      </span>
      <WifiOff className="w-4 h-4 shrink-0" />
      <span>
        {isUrdu 
          ? "آپ آف لائن ہیں۔ محفوظ شدہ کیش اور لوکل والٹ کا استعمال کیا جا رہا ہے۔" 
          : "Offline Mode Active — Secured local cached ledger in use."}
      </span>
      <button 
        onClick={() => window.location.reload()}
        className="ml-2 px-2 py-0.5 rounded-md bg-slate-950/20 hover:bg-slate-950/30 text-slate-950 font-semibold text-[11px] flex items-center gap-1 cursor-pointer"
        title="Retry connection"
      >
        <RefreshCw className="w-3 h-3" />
        <span>{isUrdu ? "دوبارہ چیک کریں" : "Retry"}</span>
      </button>
    </aside>
  );
};
