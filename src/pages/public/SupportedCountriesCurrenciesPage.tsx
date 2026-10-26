import React, { useState } from 'react';
import { Globe2, Search, CheckCircle2, ShieldCheck } from 'lucide-react';

interface CountryItem {
  country: string;
  code: string;
  currency: string;
  currencySymbol: string;
  services: string[];
  status: 'active' | 'inbound_only';
}

export const SupportedCountriesCurrenciesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const countries: CountryItem[] = [
    { country: 'Pakistan', code: 'PK', currency: 'PKR - Pakistan Rupee', currencySymbol: 'Rs', services: ['Direct Inbound Remittance', 'Utility Bills', 'Raast Instant', '1Link ATM Cashout'], status: 'active' },
    { country: 'United States', code: 'US', currency: 'USD - United States Dollar', currencySymbol: '$', services: ['Full Multi-Currency Wallet', 'ACH Bank Rail', 'Debit/Credit Funding'], status: 'active' },
    { country: 'United Kingdom', code: 'GB', currency: 'GBP - British Pound Sterling', currencySymbol: '£', services: ['Faster Payments Rail', 'Cross-Border Inbound', 'Virtual Card'], status: 'active' },
    { country: 'United Arab Emirates', code: 'AE', currency: 'AED - UAE Dirham', currencySymbol: 'د.إ', services: ['Direct Outbound Corridor', 'WPS Compliant Payroll', 'Instant Transfer'], status: 'active' },
    { country: 'Saudi Arabia', code: 'SA', currency: 'SAR - Saudi Riyal', currencySymbol: '﷼', services: ['Direct Authorized Remittance', 'Bank Wire', 'SAR Wallet'], status: 'active' },
    { country: 'European Union (Eurozone)', code: 'EU', currency: 'EUR - Euro', currencySymbol: '€', services: ['SEPA Instant Credit', 'Direct IBAN Clearing', 'Euro Balance'], status: 'active' },
    { country: 'Canada', code: 'CA', currency: 'CAD - Canadian Dollar', currencySymbol: 'C$', services: ['Interac e-Transfer Rail', 'Cross-Border Corridor'], status: 'active' },
    { country: 'Qatar', code: 'QA', currency: 'QAR - Qatari Riyal', currencySymbol: 'ر.ق', services: ['Inbound Remittance Corridor'], status: 'active' },
    { country: 'Oman', code: 'OM', currency: 'OMR - Omani Rial', currencySymbol: 'ر.ع', services: ['Inbound Remittance Corridor'], status: 'active' },
    { country: 'Kuwait', code: 'KW', currency: 'KWD - Kuwaiti Dinar', currencySymbol: 'د.ك', services: ['Direct Remittance Channel'], status: 'active' },
    { country: 'Bahrain', code: 'BH', currency: 'BHD - Bahraini Dinar', currencySymbol: '.د.ب', services: ['Direct Remittance Channel'], status: 'active' },
    { country: 'Malaysia', code: 'MY', currency: 'MYR - Malaysian Ringgit', currencySymbol: 'RM', services: ['DuitNow Remittance Corridor'], status: 'active' },
    { country: 'Singapore', code: 'SG', currency: 'SGD - Singapore Dollar', currencySymbol: 'S$', services: ['FAST Instant Inbound Rail'], status: 'active' },
    { country: 'Australia', code: 'AU', currency: 'AUD - Australian Dollar', currencySymbol: 'A$', services: ['NPP Bank Clearing Rail'], status: 'active' },
  ];

  const filtered = countries.filter(c =>
    c.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.currency.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-12 bg-[#F4F6FA] text-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#850D22]">
            Verified Geographic Footprint
          </span>
          <h1 className="text-4xl font-extrabold text-[#101A33] tracking-tight">
            Supported Countries & Currencies
          </h1>
          <p className="text-sm text-slate-600">
            We only display jurisdictions where authorized clearing channels and banking partnerships are legally established.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search country, currency, or ISO code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-hidden focus:border-[#C8102E]"
            />
          </div>
        </div>

        {/* Countries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.code}
              className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4 hover:border-slate-300 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center font-mono font-bold text-xs text-[#101A33]">
                    {item.code}
                  </span>
                  <div>
                    <h3 className="font-bold text-sm text-[#101A33]">{item.country}</h3>
                    <span className="text-xs text-slate-500 font-mono">{item.currency}</span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-[#850D22] bg-rose-50 px-2 py-0.5 rounded">
                  {item.currencySymbol}
                </span>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                <span className="font-semibold text-slate-700 block text-[11px]">Enabled Services:</span>
                {item.services.map((svc, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[11px]">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>{svc}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
