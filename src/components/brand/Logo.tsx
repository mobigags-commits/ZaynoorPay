import React from 'react';

interface LogoProps {
  variant?: 'full' | 'icon' | 'compact';
  theme?: 'light' | 'dark' | 'auto';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  theme = 'auto',
  className = '',
  size = 'md',
}) => {
  // Dimensions
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  // Color logic
  const isLightText = theme === 'light'; // Light text for dark/red backgrounds
  const primaryTextColor = isLightText ? 'text-white' : 'text-[#101A33]';
  const accentColor = '#D6B36A'; // Gold

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Original Custom Vector Shield + Letter Z + Noor Light Ray */}
      <svg
        className={`${iconSizes[size]} shrink-0 transition-transform hover:scale-105 duration-200`}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="ZaynoorPay Emblem"
      >
        <defs>
          <linearGradient id="shieldGrad" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="#C8102E" />
            <stop offset="1" stopColor="#850D22" />
          </linearGradient>
          <linearGradient id="goldRay" x1="10" y1="8" x2="34" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F9E7B9" />
            <stop offset="0.5" stopColor="#D6B36A" />
            <stop offset="1" stopColor="#A88236" />
          </linearGradient>
          <filter id="noorGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Shield Outer Container */}
        <path
          d="M22 3.5L37 8.5C37 22.5 31 34 22 39.5C13 34 7 22.5 7 8.5L22 3.5Z"
          fill="url(#shieldGrad)"
          stroke="#D6B36A"
          strokeWidth="1.25"
        />

        {/* Noor Light Ray (Diagonal subtle beam behind Z) */}
        <path
          d="M17 9L27 35L29 35L19 9H17Z"
          fill="#D6B36A"
          fillOpacity="0.28"
        />

        {/* Geometric Stylized Letter 'Z' */}
        <path
          d="M14.5 15.5H28.5C29.2 15.5 29.6 16.3 29.1 16.9L16.2 30.5H29.5"
          stroke="url(#goldRay)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#noorGlow)"
        />

        {/* Noor Divine Light Sparkle Accent */}
        <circle cx="29.5" cy="15.5" r="1.6" fill="#FFFFFF" />
        <circle cx="14.5" cy="30.5" r="1.2" fill="#F9E7B9" />
      </svg>

      {/* Brand Wordmark */}
      {variant !== 'icon' && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center">
            <span className={`font-extrabold tracking-tight ${textSizes[size]} ${primaryTextColor}`}>
              Zaynoor
            </span>
            <span className={`font-extrabold tracking-tight ${textSizes[size]} text-[#D6B36A]`}>
              Pay
            </span>
          </div>
          {size === 'xl' && (
            <span className={`text-[10px] tracking-widest uppercase mt-0.5 font-medium ${isLightText ? 'text-white/70' : 'text-slate-500'}`}>
              Institutional Digital Wallet
            </span>
          )}
        </div>
      )}
    </div>
  );
};
