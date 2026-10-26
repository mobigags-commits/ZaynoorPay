import React, { useEffect } from 'react';

interface AdSlotProps {
  slotId?: string;
  format?: 'auto' | 'banner' | 'in-feed' | 'rectangle';
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({
  slotId = 'auto',
  format = 'auto',
  className = '',
}) => {
  const pubId = (import.meta.env.VITE_ADSENSE_PUB_ID as string) || 'ca-pub-7550936944889241';

  useEffect(() => {
    try {
      // @ts-expect-error Google AdSense global
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Silently catch ad blocker or preview issues
    }
  }, []);

  return (
    <div className={`ad-container my-8 text-center overflow-hidden max-w-5xl mx-auto ${className}`}>
      <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1.5 font-medium">
        Advertisement
      </span>
      {/* Official Google AdSense Tag */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minHeight: '90px' }}
        data-ad-client={pubId}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};
