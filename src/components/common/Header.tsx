import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../brand/Logo';
import { 
  Globe, 
  Smartphone, 
  Monitor, 
  Menu, 
  X, 
  ShieldCheck, 
  User, 
  LogOut,
  ChevronDown
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    currentPath, 
    navigate, 
    language, 
    setLanguage, 
    t, 
    appMode, 
    setAppMode, 
    isAuthenticated, 
    isAdmin, 
    logout 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isHomepage = currentPath === '/' || currentPath === '';

  // Theme styling based on page
  const headerBg = isHomepage 
    ? 'bg-[#C8102E] text-white border-b border-white/10' 
    : 'bg-[#101A33] text-white border-b border-slate-800';

  const navLinkActive = isHomepage 
    ? 'text-[#D6B36A] font-semibold' 
    : 'text-[#D6B36A] font-semibold';

  const navLinkHover = isHomepage
    ? 'text-white/80 hover:text-white transition-colors'
    : 'text-slate-300 hover:text-white transition-colors';

  const handleNav = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <header className={`sticky top-0 z-40 w-full transition-colors ${headerBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strictly 3 zones separated by gap-8 as per frontend-design Top Bar Contract */}
        <div className="flex items-center justify-between gap-8 h-18">
          
          {/* ZONE 1: Brand Wordmark (One element, whitespace-nowrap shrink-0) */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => handleNav('/')}
              className="flex items-center gap-2 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#D6B36A] rounded-lg"
              aria-label="ZaynoorPay Home"
            >
              <Logo 
                variant="full" 
                theme="light" 
                size="md" 
              />
            </button>

            {/* Sandbox Notice Tag */}
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono tracking-wider font-semibold bg-white/10 text-[#D6B36A] border border-[#D6B36A]/30">
              SANDBOX
            </span>
          </div>

          {/* ZONE 2: 4–5 single-line clean nav links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
            <button
              onClick={() => handleNav('/')}
              className={`whitespace-nowrap shrink-0 cursor-pointer ${currentPath === '/' ? navLinkActive : navLinkHover}`}
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => handleNav('/features')}
              className={`whitespace-nowrap shrink-0 cursor-pointer ${currentPath === '/features' ? navLinkActive : navLinkHover}`}
            >
              {t.nav.features}
            </button>
            <button
              onClick={() => handleNav('/how-it-works')}
              className={`whitespace-nowrap shrink-0 cursor-pointer ${currentPath === '/how-it-works' ? navLinkActive : navLinkHover}`}
            >
              {t.nav.howItWorks}
            </button>
            <button
              onClick={() => handleNav('/fees-limits')}
              className={`whitespace-nowrap shrink-0 cursor-pointer ${currentPath === '/fees-limits' ? navLinkActive : navLinkHover}`}
            >
              {t.nav.fees}
            </button>
            <button
              onClick={() => handleNav('/security')}
              className={`whitespace-nowrap shrink-0 cursor-pointer ${currentPath === '/security' ? navLinkActive : navLinkHover}`}
            >
              {t.nav.security}
            </button>
            <button
              onClick={() => handleNav('/international-transfers')}
              className={`whitespace-nowrap shrink-0 cursor-pointer ${currentPath === '/international-transfers' ? navLinkActive : navLinkHover}`}
            >
              {t.nav.international}
            </button>
          </nav>

          {/* ZONE 3: 1 Primary Action + App Mode & Language Switchers */}
          <div className="flex items-center gap-3 shrink-0">
            
            {/* Language Switcher (EN / اردو) */}
            <div className="relative">
              <button
                onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 transition-colors text-white"
                title="Switch Language"
                aria-label="Toggle language between English and Urdu"
              >
                <Globe className="w-3.5 h-3.5 text-[#D6B36A]" />
                <span className="uppercase">{language === 'en' ? 'اردو' : 'English'}</span>
              </button>
            </div>

            {/* App / Web Mode Switcher ('aur is ki web aur app dono benani h') */}
            <button
              onClick={() => setAppMode(appMode === 'web' ? 'mobile_app' : 'web')}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-xs ${
                appMode === 'mobile_app'
                  ? 'bg-[#D6B36A] text-[#101A33]'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
              title="Toggle interactive Mobile App Simulator"
            >
              {appMode === 'mobile_app' ? (
                <>
                  <Monitor className="w-3.5 h-3.5" />
                  <span>{t.nav.webMode}</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-3.5 h-3.5 text-[#D6B36A]" />
                  <span>{t.nav.appMode}</span>
                </>
              )}
            </button>

            {/* Portal Action Button */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 py-1.5 px-3 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-[#D6B36A]" />
                  <span className="hidden md:inline">{isAdmin ? 'Admin Console' : 'My Wallet'}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl py-2 border border-slate-200 text-slate-800 z-50 text-xs">
                    <button
                      onClick={() => handleNav(isAdmin ? '/admin' : '/dashboard')}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 font-medium text-[#101A33] flex items-center justify-between"
                    >
                      <span>{isAdmin ? 'Admin Dashboard' : t.nav.dashboard}</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-[#D6B36A]" />
                    </button>
                    {!isAdmin && (
                      <>
                        <button
                          onClick={() => handleNav('/wallet-history')}
                          className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-600"
                        >
                          Ledger & History
                        </button>
                        <button
                          onClick={() => handleNav('/profile')}
                          className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-600"
                        >
                          Profile & Verification
                        </button>
                        <button
                          onClick={() => handleNav('/security-settings')}
                          className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-600"
                        >
                          Security & 2FA
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleNav('/admin')}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-600 border-t border-slate-100"
                    >
                      Switch to Admin Portal
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-rose-50 text-rose-600 flex items-center gap-1.5 border-t border-slate-100 mt-1"
                    >
                      <LogOut className="w-3 h-3" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNav('/login')}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white/90 hover:text-white transition-colors"
                >
                  {t.nav.login}
                </button>
                <button
                  onClick={() => handleNav('/signup')}
                  className="px-4 py-2 text-xs font-bold text-[#101A33] bg-[#D6B36A] hover:bg-[#e4c583] rounded-lg transition-all shadow-xs"
                >
                  {t.nav.signUp}
                </button>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#101A33] border-b border-slate-800 text-white px-5 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 text-xs font-medium">
            <button onClick={() => handleNav('/')} className="text-left py-2 px-3 rounded-lg hover:bg-white/5">
              {t.nav.home}
            </button>
            <button onClick={() => handleNav('/features')} className="text-left py-2 px-3 rounded-lg hover:bg-white/5">
              {t.nav.features}
            </button>
            <button onClick={() => handleNav('/how-it-works')} className="text-left py-2 px-3 rounded-lg hover:bg-white/5">
              {t.nav.howItWorks}
            </button>
            <button onClick={() => handleNav('/send')} className="text-left py-2 px-3 rounded-lg hover:bg-white/5">
              {t.nav.send}
            </button>
            <button onClick={() => handleNav('/receive')} className="text-left py-2 px-3 rounded-lg hover:bg-white/5">
              {t.nav.receive}
            </button>
            <button onClick={() => handleNav('/bills')} className="text-left py-2 px-3 rounded-lg hover:bg-white/5">
              {t.nav.bills}
            </button>
            <button onClick={() => handleNav('/topups')} className="text-left py-2 px-3 rounded-lg hover:bg-white/5">
              {t.nav.topups}
            </button>
            <button onClick={() => handleNav('/qr-payments')} className="text-left py-2 px-3 rounded-lg hover:bg-white/5">
              {t.nav.qr}
            </button>
            <button onClick={() => handleNav('/international-transfers')} className="text-left py-2 px-3 rounded-lg hover:bg-white/5">
              {t.nav.international}
            </button>
            <button onClick={() => handleNav('/fees-limits')} className="text-left py-2 px-3 rounded-lg hover:bg-white/5">
              {t.nav.fees}
            </button>
            <button onClick={() => handleNav('/security')} className="text-left py-2 px-3 rounded-lg hover:bg-white/5">
              {t.nav.security}
            </button>
            <button onClick={() => handleNav('/help')} className="text-left py-2 px-3 rounded-lg hover:bg-white/5">
              {t.nav.help}
            </button>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
            <button
              onClick={() => {
                setAppMode(appMode === 'web' ? 'mobile_app' : 'web');
                setMobileMenuOpen(false);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-white/10 rounded-lg text-xs font-semibold"
            >
              <Smartphone className="w-3.5 h-3.5 text-[#D6B36A]" />
              <span>{appMode === 'mobile_app' ? 'Web Mode' : 'Mobile App'}</span>
            </button>

            <button
              onClick={() => handleNav(isAuthenticated ? '/dashboard' : '/login')}
              className="flex-1 py-2 px-3 bg-[#D6B36A] text-[#101A33] rounded-lg text-xs font-bold text-center"
            >
              {isAuthenticated ? t.nav.dashboard : t.nav.login}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
