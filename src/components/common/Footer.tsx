import React from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../brand/Logo';
import { 
  ShieldCheck, 
  Globe2, 
  HelpCircle, 
  FileText, 
  PhoneCall, 
  ArrowUpRight 
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate, t, language } = useApp();

  return (
    <footer className="bg-[#101A33] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <button 
              onClick={() => navigate('/')} 
              className="focus-visible:outline-hidden text-left"
            >
              <Logo variant="full" theme="light" size="lg" />
            </button>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              {language === 'ur'
                ? 'زینور پے — اگلی نسل کا ڈیجیٹل والیٹ اور ادائیگیوں کا عالمی نیٹ ورک۔ آپ کے سرمائے کا قابلِ اعتماد محافظ اور تیز رفتار ترسیل کا ضامن۔'
                : 'Next-generation multi-currency digital wallet and financial ecosystem. Engineered for institutional transparency, instant settlements, and zero unverified intermediaries.'}
            </p>
            <div className="flex items-center gap-3 text-xs text-[#D6B36A] pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="font-medium">Cryptographic Double-Entry Ledger</span>
            </div>
          </div>

          {/* Column 1: Financial Services */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              {language === 'ur' ? 'ادائیگی خدمات' : 'Payments'}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => navigate('/send')} className="hover:text-white transition-colors">
                  {t.nav.send}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/receive')} className="hover:text-white transition-colors">
                  {t.nav.receive}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/add-money')} className="hover:text-white transition-colors">
                  {t.nav.addMoney}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/withdraw')} className="hover:text-white transition-colors">
                  {t.nav.withdraw}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/bills')} className="hover:text-white transition-colors">
                  {t.nav.bills}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/topups')} className="hover:text-white transition-colors">
                  {t.nav.topups}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/qr-payments')} className="hover:text-white transition-colors">
                  {t.nav.qr}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Platform & Security */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              {language === 'ur' ? 'پلیٹ فارم' : 'Platform'}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-white transition-colors">
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/features')} className="hover:text-white transition-colors">
                  {t.nav.features}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/how-it-works')} className="hover:text-white transition-colors">
                  {t.nav.howItWorks}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/international-transfers')} className="hover:text-white transition-colors">
                  {t.nav.international}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/fees-limits')} className="hover:text-white transition-colors">
                  {t.nav.fees}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/supported-coverage')} className="hover:text-white transition-colors">
                  {t.nav.supported}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/security')} className="hover:text-white transition-colors">
                  {t.nav.security}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/system-status')} className="hover:text-white transition-colors">
                  {t.footer.systemStatus}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Trust & Legal */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              {language === 'ur' ? 'قانونی و مدد' : 'Legal & Help'}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => navigate('/help')} className="hover:text-white transition-colors">
                  {t.nav.help}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/contact')} className="hover:text-white transition-colors">
                  {t.nav.contact}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/blog')} className="hover:text-white transition-colors">
                  {t.nav.blog}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/privacy-policy')} className="hover:text-white transition-colors">
                  {t.footer.privacy}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/terms')} className="hover:text-white transition-colors">
                  {t.footer.terms}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/cookie-policy')} className="hover:text-white transition-colors">
                  {t.footer.cookies}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/disputes')} className="hover:text-white transition-colors">
                  {t.footer.disputes}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/accessibility')} className="hover:text-white transition-colors">
                  {t.footer.accessibility}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/disclaimer')} className="hover:text-[#D6B36A] transition-colors font-medium">
                  {language === 'ur' ? 'قانونی ڈس کلیمر' : 'Risk & Legal Disclaimer'}
                </button>
              </li>
              <li>
                <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  XML Sitemap
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory & Demo Disclaimer Notice */}
        <div className="py-6 border-b border-slate-800/80">
          <p className="text-[11px] text-slate-400 leading-relaxed">
            <strong className="text-slate-300">DEMO SANDBOX PROTOCOL NOTICE:</strong> {t.footer.legalDisclaimer} ZaynoorPay does not claim unverified statutory licenses or mock bank guarantees. All simulated transaction hashes and cryptographic balance records operate on client-side and sandboxed backend storage for prototype demonstration.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ZaynoorPay Global Technologies Inc. {t.footer.rights}</p>
          <div className="flex items-center gap-6">
            <button onClick={() => navigate('/admin-login')} className="hover:text-slate-300 transition-colors">
              Staff Portal
            </button>
            <button onClick={() => navigate('/accessibility')} className="hover:text-slate-300 transition-colors">
              WCAG 2.1 AA
            </button>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">USD · PKR · EUR · GBP · AED</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
