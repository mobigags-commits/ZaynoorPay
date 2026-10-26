import React from 'react';

interface AdSlotProps {
  slotId?: string;
  format?: 'banner' | 'in-feed' | 'rectangle';
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({
  slotId = 'placeholder-slot',
  format = 'banner',
  className = '',
}) => {
  // In production, when VITE_ADSENSE_PUB_ID is supplied, this will mount the Google AdSense script
  const isAdConfigured = Boolean(import.meta.env.VITE_ADSENSE_PUB_ID);

  if (!isAdConfigured) {
    return (
      <aside
        aria-label="Sponsored Space"
        className={`my-8 p-4 rounded-xl border border-dashed border-slate-200 bg-slate-50/50 text-center transition-all ${className}`}
      >
        <div className="max-w-md mx-auto py-2">
          <span className="text-[10px] tracking-wider uppercase font-semibold text-slate-400 block mb-1">
            Advertisement Space
          </span>
          <p className="text-xs text-slate-400">
            Compliant AdSense placement zone. Ads will appear here following Google publisher review and approval.
          </p>
        </div>
      </aside>
    );
  }

  return (
    <div className={`ad-container my-6 text-center overflow-hidden ${className}`}>
      <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1">
        Advertisement
      </span>
      {/* Real AdSense tag container */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={import.meta.env.VITE_ADSENSE_PUB_ID}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};
