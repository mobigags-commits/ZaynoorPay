import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, BookOpen, Clock, User } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const { navigate } = useApp();
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const articles = [
    {
      id: 'understanding-digital-remittance-2026',
      title: 'How Instant Clearing Corridors are Transforming Cross-Border Remittance',
      summary: 'Explore how ISO 20022 messaging, direct settlement switches, and transparent FX margins are eliminating the 4-day delays of traditional legacy wire transfers.',
      author: 'Dr. Tariq Al-Hassan',
      role: 'Head of Macro-Financial Research',
      date: 'October 18, 2026',
      readTime: '6 min read',
      tag: 'Remittance',
      image: '/src/assets/images/blog_digital_remittance_1792997933531.jpg',
    },
    {
      id: 'double-entry-accounting-fintech',
      title: 'Why Double-Entry Cryptographic Ledgers are Mandatory for Digital Wallets',
      summary: 'A deep architectural dive into why balances must never be stored as arbitrary mutable database rows, and how balanced debit/credit legs prevent phantom liquidity.',
      author: 'Aris K. Ahmed',
      role: 'Chief Technology Architect',
      date: 'October 12, 2026',
      readTime: '8 min read',
      tag: 'Engineering',
      image: '/src/assets/images/about_fintech_team_1792997932115.jpg',
    },
    {
      id: 'protecting-your-pin-totp',
      title: 'The Evolution of 2FA: From Vulnerable SMS OTPs to Hardware Security Keys',
      summary: 'Learn why telecom SIM-swap attacks have rendered SMS codes obsolete and how time-based rolling algorithms (TOTP) and WebAuthn guarantee wallet defense.',
      author: 'Maryam Siddiqui, CISSP',
      role: 'Principal Security Officer',
      date: 'October 04, 2026',
      readTime: '5 min read',
      tag: 'Security',
      image: '/src/assets/images/card_virtual_titanium_1792997932600.jpg',
    },
  ];

  const filtered = selectedTag === 'all' ? articles : articles.filter(a => a.tag === selectedTag);

  return (
    <div className="py-12 bg-[#F4F6FA] text-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#850D22]">
            Financial Education & Research
          </span>
          <h1 className="text-4xl font-extrabold text-[#101A33] tracking-tight">
            Zaynoor Insights & Literacy
          </h1>
          <p className="text-sm text-slate-600">
            Authoritative perspectives on cross-border liquidity, security engineering, and modern payments.
          </p>
        </div>

        {/* Tag Filters (Functional Buttons) */}
        <div className="flex items-center justify-center gap-2">
          {['all', 'Remittance', 'Engineering', 'Security'].map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${selectedTag === tag ? 'bg-[#101A33] text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'}`}
            >
              {tag === 'all' ? 'All Articles' : tag}
            </button>
          ))}
        </div>

        {/* Featured Article Marquee */}
        {filtered.length > 0 && (
          <div
            onClick={() => navigate(`/blog/${filtered[0].id}`)}
            className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer grid grid-cols-1 lg:grid-cols-12"
          >
            <div className="lg:col-span-6 overflow-hidden">
              <img
                src={filtered[0].image}
                alt={filtered[0].title}
                className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="lg:col-span-6 p-8 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                {/* Zero-Pill Metadata per frontend-design */}
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-[#850D22]">{filtered[0].tag}</span>
                  <span aria-hidden="true">·</span>
                  <span>{filtered[0].date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{filtered[0].readTime}</span>
                </div>

                <h2 className="text-2xl font-bold text-[#101A33] group-hover:text-[#C8102E] transition-colors">
                  {filtered[0].title}
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {filtered[0].summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">{filtered[0].author}</span>
                  <span className="text-[10px] text-slate-400">{filtered[0].role}</span>
                </div>
                <span className="text-xs font-bold text-[#850D22] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Secondary Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.slice(1).map((article) => (
            <div
              key={article.id}
              onClick={() => navigate(`/blog/${article.id}`)}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-[#850D22]">{article.tag}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#101A33] group-hover:text-[#C8102E] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                <span className="font-semibold text-slate-800">{article.author}</span>
                <span className="text-[#850D22] font-bold flex items-center gap-1">
                  Read <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
