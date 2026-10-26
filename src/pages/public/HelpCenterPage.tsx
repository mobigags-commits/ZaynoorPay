import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, HelpCircle, ChevronRight, MessageSquare, PhoneCall, FileText } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
  category: 'general' | 'transfers' | 'security' | 'bills';
}

export const HelpCenterPage: React.FC = () => {
  const { navigate } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'general' | 'transfers' | 'security' | 'bills'>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      category: 'general',
      q: 'What verification documents are accepted for Tier 2 upgrade?',
      a: 'We accept valid National Identity Cards (CNIC/SNIC), International Passports, and Driver’s Licenses. Documents must be clearly readable without glare or cropped edges.',
    },
    {
      category: 'general',
      q: 'Is there a minimum initial deposit required to open a wallet?',
      a: 'No. Opening a ZaynoorPay wallet is completely free with zero minimum balance requirement.',
    },
    {
      category: 'transfers',
      q: 'How long do international remittances take to arrive?',
      a: 'Remittances across our authorized direct corridors (UK, UAE, Saudi Arabia, USA, EU to Pakistan) settle within 60 to 120 seconds directly into recipient bank accounts or Raast IDs.',
    },
    {
      category: 'transfers',
      q: 'What should I do if I sent money to an incorrect recipient?',
      a: 'Internal wallet transfers settle immediately and cannot be automatically recalled. Please contact our 24/7 dispute desk immediately or file a ticket to request beneficiary mediation.',
    },
    {
      category: 'bills',
      q: 'How do I know my electricity or gas utility bill was accepted by the provider?',
      a: 'Upon payment, a unique 16-digit utility clearing token is embedded into your official ZaynoorPay receipt and sent to the utility aggregator switch in real time.',
    },
    {
      category: 'bills',
      q: 'Can I pay utility bills on weekends and public holidays?',
      a: 'Yes. Our automated bill settlement engine runs 24/7/365 without weekend or banking holiday cutoffs.',
    },
    {
      category: 'security',
      q: 'I forgot my 6-digit transaction PIN. How can I reset it?',
      a: 'Navigate to Security Settings > Reset Transaction PIN. For your protection, a one-time OTP verification code will be sent to your registered mobile phone and email.',
    },
    {
      category: 'security',
      q: 'What is an Idempotency Key shown on receipts?',
      a: 'An idempotency key is a cryptographic unique identifier that guarantees a transfer request is executed exactly once, even if your network disconnects or you accidentally click twice.',
    },
  ];

  const filtered = faqs.filter(f => {
    const matchesCat = selectedCategory === 'all' || f.category === selectedCategory;
    const matchesSearch = f.q.toLowerCase().includes(searchTerm.toLowerCase()) || f.a.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="py-12 bg-[#F4F6FA] text-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#850D22]">
            Support & Knowledge Base
          </span>
          <h1 className="text-4xl font-extrabold text-[#101A33] tracking-tight">
            Help Center & FAQs
          </h1>
          <p className="text-sm text-slate-600">
            Find immediate answers regarding account verification, limits, transfers, and security hygiene.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search help topics (e.g. KYC, transfer speed, bills)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-hidden focus:border-[#C8102E] shadow-sm"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'all', label: 'All Topics' },
            { id: 'general', label: 'Onboarding & KYC' },
            { id: 'transfers', label: 'Transfers & Remittance' },
            { id: 'bills', label: 'Utility Bills' },
            { id: 'security', label: 'Security & PIN' },
          ].map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${selectedCategory === c.id ? 'bg-[#101A33] text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'}`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* FAQs List */}
        <div className="space-y-3">
          {filtered.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-semibold text-xs text-[#101A33] hover:text-[#C8102E] transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <span className="text-base font-bold text-slate-400">
                  {openIndex === i ? '−' : '+'}
                </span>
              </button>
              {openIndex === i && (
                <div className="px-5 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="p-8 text-center text-xs text-slate-500 bg-white rounded-2xl border border-slate-200">
              No matching help topics found. Please refine your query or contact customer care below.
            </div>
          )}
        </div>

        {/* Contact Escalation */}
        <div className="p-6 bg-white rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs shadow-xs">
          <div>
            <span className="font-bold text-[#101A33] block">Cannot find what you are looking for?</span>
            <span className="text-slate-500">Our support engineers and compliance team are available 24/7.</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/contact')}
              className="px-4 py-2 bg-[#101A33] text-white rounded-xl font-bold hover:bg-[#1B2947] transition-colors"
            >
              Contact Support
            </button>
            <button
              onClick={() => navigate('/support-tickets')}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
            >
              My Support Tickets
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
