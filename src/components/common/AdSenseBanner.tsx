import React, { useEffect } from 'react';
import { DollarSign, ShieldCheck } from 'lucide-react';

interface AdSenseBannerProps {
  slotId?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  className?: string;
}

export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({
  slotId = 'default_fintech_slot',
  format = 'auto',
  className = '',
}) => {
  useEffect(() => {
    try {
      // Trigger AdSense ad request if script is loaded
      if (typeof window !== 'undefined' && (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle) {
        ((window as unknown as { adsbygoogle: unknown[] }).adsbygoogle).push({});
      }
    } catch {
      // Ignore if AdSense blocked by user adblocker
    }
  }, []);

  return (
    <div className={`w-full my-6 text-center overflow-hidden ${className}`}>
      <div className="text-[10px] uppercase tracking-wider text-slate-600 dark:text-slate-300 font-semibold mb-1 flex items-center justify-center gap-1.5">
        <DollarSign className="w-3 h-3 text-emerald-600" />
        <span>Sponsored Financial Partner • Google AdSense (ca-pub-7550936944889241)</span>
        <ShieldCheck className="w-3 h-3 text-blue-500" />
      </div>

      <div className="relative mx-auto rounded-xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-4 transition">
        {/* Real Google AdSense Ins Tag */}
        <ins
          className="adsbygoogle"
          style={{ display: 'block', minHeight: '90px' }}
          data-ad-client="ca-pub-7550936944889241"
          data-ad-slot={slotId}
          data-ad-format={format}
          data-full-width-responsive="true"
        />

        {/* Fallback Financial Partner preview container for local testing / unapproved domains */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2 px-3 rounded-lg bg-gradient-to-r from-slate-100 to-amber-50/50 dark:from-slate-800/80 dark:to-slate-800/40 border border-slate-200 dark:border-slate-700/60 text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
                0% Zero-Commission Global Business Accounts
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Receive ACH, SEPA & Wire payouts directly with institutional FX margins.
              </p>
            </div>
          </div>
          <button
            onClick={() => window.location.hash = '/deposit'}
            className="shrink-0 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 text-xs font-semibold shadow-xs transition"
          >
            Explore Partner Rates →
          </button>
        </div>
      </div>
    </div>
  );
};
