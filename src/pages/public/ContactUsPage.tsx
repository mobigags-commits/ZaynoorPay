import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { ApiClient } from '../../services/api';

export const ContactUsPage: React.FC = () => {
  const { createTicket, user } = useApp();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<'account' | 'transaction' | 'security' | 'billing'>('transaction');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!subject.trim() || !message.trim()) {
      setErrorMsg('Please complete all mandatory fields.');
      return;
    }

    createTicket(
      {
        subject,
        category,
        priority,
      },
      message
    );

    // Dispatch to real backend REST API endpoint
    ApiClient.submitContact({
      name,
      email,
      subject,
      message,
    }).catch(() => {});

    setSubmitted(true);
    setSubject('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <div className="py-12 bg-[#F4F6FA] text-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#850D22]">
            Always Responsive
          </span>
          <h1 className="text-4xl font-extrabold text-[#101A33] tracking-tight">
            Contact Support & Operations
          </h1>
          <p className="text-sm text-slate-600">
            Have questions about remittance limits, merchant integrations, or account safety? Our teams are standing by.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-base font-bold text-[#101A33]">Submit an Official Inquiry or Ticket</h2>

            {submitted && (
              <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Ticket registered successfully. Our operations desk will respond within 30 minutes.</span>
              </div>
            )}

            {errorMsg && (
              <div className="p-3 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Inquiry Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                  >
                    <option value="transaction">Payment or Transfer Status</option>
                    <option value="account">Account Limits & KYC Tiers</option>
                    <option value="billing">Utility Bill Query</option>
                    <option value="security">Security & Fraud Escalation</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Priority Level</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                  >
                    <option value="low">Low (General Inquiry)</option>
                    <option value="medium">Medium (Standard Request)</option>
                    <option value="high">High (Urgent Transfer)</option>
                    <option value="urgent">Critical (Account Compromise)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Subject</label>
                <input
                  type="text"
                  placeholder="Summary of your inquiry..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Detailed Message</label>
                <textarea
                  rows={4}
                  placeholder="Provide transaction reference or issue details..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#C8102E] hover:bg-[#850D22] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry Ticket</span>
              </button>
            </form>
          </div>

          {/* Right: Offices & Emergency Numbers */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-[#101A33] uppercase tracking-wider">
                Regional Hubs
              </h3>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <MapPin className="w-4 h-4 text-[#C8102E] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#101A33] block">Lahore Financial Operations</span>
                    <span className="text-[11px] text-slate-500">Level 8, Tricon Corporate Tower, Main Gulberg, Lahore, Pakistan</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <MapPin className="w-4 h-4 text-[#101A33] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#101A33] block">London Remittance Hub</span>
                    <span className="text-[11px] text-slate-500">25 Bank Street, Canary Wharf, London E14 5JP, United Kingdom</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <MapPin className="w-4 h-4 text-[#D6B36A] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#101A33] block">Dubai Middle East Gateway</span>
                    <span className="text-[11px] text-slate-500">Gate Precinct 4, DIFC, Dubai, United Arab Emirates</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3 text-xs">
              <h3 className="text-xs font-bold text-[#101A33] uppercase tracking-wider">
                Helpline Contacts
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone className="w-4 h-4 text-[#C8102E]" />
                  <span className="font-mono font-semibold">+92 (042) 111-929-667</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Mail className="w-4 h-4 text-[#101A33]" />
                  <span className="font-mono">support@zaynoorpay.com</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>24/7/365 Continuous Financial Desk</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
