import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Share2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { AdSlot } from '../../components/common/AdSlot';

export const BlogArticlePage: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="py-12 bg-[#F4F6FA] text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Link */}
        <button
          onClick={() => navigate('/blog')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#101A33] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Financial Education Insights</span>
        </button>

        {/* Article Container */}
        <article className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
          
          {/* Metadata Header */}
          <div className="space-y-4 pb-6 border-b border-slate-100">
            {/* Zero-pill metadata */}
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-bold text-[#850D22]">Global Remittance Infrastructure</span>
              <span aria-hidden="true">·</span>
              <span>Published October 18, 2026</span>
              <span aria-hidden="true">·</span>
              <span>6 min read</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#101A33] tracking-tight leading-tight">
              How Instant Clearing Corridors are Transforming Cross-Border Remittance
            </h1>

            {/* Author Byline */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#101A33] text-white flex items-center justify-center font-bold text-xs">
                  TA
                </div>
                <div>
                  <span className="font-bold text-xs text-slate-900 block">Dr. Tariq Al-Hassan</span>
                  <span className="text-[11px] text-slate-500">Head of Macro-Financial Research · Reviewed by Compliance Committee</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Peer-Reviewed</span>
              </div>
            </div>
          </div>

          {/* Lead Photo */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xs">
            <img
              src="/src/assets/images/blog_digital_remittance_1792997933531.jpg"
              alt="Digital Remittance Mobile Interface and Official Payout Receipt"
              className="w-full h-80 object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Article Prose */}
          <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
            <p className="text-base font-medium text-slate-900 leading-relaxed">
              For over four decades, cross-border remittance was plagued by the structural friction of correspondent banking. A transfer dispatched from London or Dubai to a family in Lahore or Karachi would navigate up to four intermediate clearing banks, each levying non-transparent handling surcharges and compounding foreign exchange spread losses.
            </p>

            <h2 className="text-xl font-bold text-[#101A33] pt-4">1. The Shift to ISO 20022 Direct Messaging</h2>
            <p>
              The emergence of modernized payment standards, specifically ISO 20022 and direct instant payment switches such as Pakistan’s Raast and the UK’s Faster Payments Service, has revolutionized the underlying clearing physics. Rather than batch-processing settlement queues overnight, cryptographic API endpoints validate sender liquidity and credit beneficiary IBANs in under 60 seconds.
            </p>

            <h2 className="text-xl font-bold text-[#101A33] pt-4">2. Radical Transparency in Foreign Exchange</h2>
            <p>
              Traditional money transfer operators frequently advertise "zero transfer fee" promotions, while concealing a 3.5% to 5.0% margin between the interbank mid-market rate and the consumer payout rate. At ZaynoorPay, the foundational concept of <em>Noor</em> dictates that foreign exchange quotations are derived directly from mid-market liquidity pools. The exact rate and the modest fixed clearing fee are explicitly locked before the customer confirms.
            </p>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <span className="font-bold text-[#101A33] block">Key Takeaway for Remitters:</span>
              <p className="text-slate-600">
                Always evaluate the <strong>net payout figure</strong> received in local currency rather than relying solely on low upfront wire fees. High-volume corridors now deliver within minutes without custodial risk.
              </p>
            </div>

            <h2 className="text-xl font-bold text-[#101A33] pt-4">3. Ensuring Full Regulatory & AML Governance</h2>
            <p>
              Instant speed does not compromise compliance. Every outbound and inbound remittance undergoes automated sanctions screening against OFAC, FATF, and United Nations watchlists in real-time. By utilizing verified KYC tiers, wallets maintain strict compliance while empowering users with seamless cross-border mobility.
            </p>
          </div>

          {/* AdSense Prepared Insertion */}
          <AdSlot slotId="blog-article-footer" format="rectangle" />

          {/* Article Footer */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Topics: Remittance, Fintech Architecture, ISO 20022</span>
            <button
              onClick={() => navigate('/international-transfers')}
              className="px-4 py-2 bg-[#101A33] text-white rounded-xl font-bold hover:bg-[#1B2947] transition-colors"
            >
              Try Remittance Calculator →
            </button>
          </div>

        </article>

      </div>
    </div>
  );
};
