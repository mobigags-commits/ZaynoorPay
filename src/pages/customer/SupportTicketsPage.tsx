import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, Plus, Send, Clock, CheckCircle2, ChevronRight, User } from 'lucide-react';

export const SupportTicketsPage: React.FC = () => {
  const { tickets, createTicket, replyTicket, user } = useApp();
  const [selectedTicketId, setSelectedTicketId] = useState<string>(tickets[0]?.id || '');
  const [replyText, setReplyText] = useState('');
  const [showNewModal, setShowNewModal] = useState(false);

  // New ticket state
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<'account' | 'transaction' | 'security' | 'billing'>('account');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [initialMsg, setInitialMsg] = useState('');

  const selectedTicket = tickets.find(t => t.id === selectedTicketId) || tickets[0];

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedTicket) return;
    replyTicket(selectedTicket.id, replyText);
    setReplyText('');
  };

  const handleCreateNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !initialMsg.trim()) return;
    createTicket({ subject, category, priority }, initialMsg);
    setSubject('');
    setInitialMsg('');
    setShowNewModal(false);
  };

  return (
    <div className="py-8 bg-[#F4F6FA] text-slate-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#850D22]">Customer Care</span>
            <h1 className="text-2xl font-extrabold text-[#101A33] tracking-tight">
              Support Desk & Inquiries
            </h1>
          </div>
          <button
            onClick={() => setShowNewModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#C8102E] hover:bg-[#850D22] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Ticket</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* Left Tickets List */}
          <div className="md:col-span-5 bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-2">
            <h3 className="text-xs font-bold text-[#101A33] uppercase tracking-wider px-2 py-1">
              Active Cases ({tickets.length})
            </h3>
            <div className="space-y-1.5 max-h-[500px] overflow-y-auto">
              {tickets.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTicketId(t.id)}
                  className={`w-full p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${selectedTicket?.id === t.id ? 'border-[#C8102E] bg-rose-50/20 shadow-xs ring-1 ring-[#C8102E]' : 'border-slate-100 hover:border-slate-200'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-[#850D22]">{t.id}</span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded font-mono ${t.status === 'open' ? 'bg-amber-100 text-amber-800' : t.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'}`}>
                      {t.status.replace('_', ' ')}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-[#101A33] mt-1 line-clamp-1">{t.subject}</h4>
                  <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-mono">
                    <span>Priority: {t.priority.toUpperCase()}</span>
                    <span>{t.lastUpdated}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Ticket Thread View */}
          <div className="md:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between min-h-[500px] space-y-4">
            {selectedTicket ? (
              <>
                <div className="pb-3 border-b border-slate-100 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#850D22]">{selectedTicket.id}</span>
                    <span className="text-[11px] text-slate-400 font-mono">Created: {selectedTicket.createdAt}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#101A33]">{selectedTicket.subject}</h3>
                </div>

                {/* Message Bubble Feed */}
                <div className="flex-1 space-y-3 overflow-y-auto max-h-[340px] pr-2">
                  {selectedTicket.messages.map((m) => {
                    const isUser = m.sender === 'user';
                    return (
                      <div key={m.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                        <div className={`max-w-[85%] p-3.5 rounded-2xl text-xs space-y-1 ${isUser ? 'bg-[#101A33] text-white rounded-br-xs' : 'bg-slate-100 text-slate-800 rounded-bl-xs'}`}>
                          <div className="flex items-center justify-between gap-4 text-[10px] opacity-75">
                            <span className="font-bold">{m.senderName}</span>
                            <span className="font-mono">{m.timestamp}</span>
                          </div>
                          <p className="leading-relaxed">{m.text}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Reply Form */}
                <form onSubmit={handleSendReply} className="pt-3 border-t border-slate-100 flex gap-2">
                  <input
                    type="text"
                    placeholder="Type your response..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:border-[#C8102E]"
                  />
                  <button
                    type="submit"
                    className="py-2.5 px-4 bg-[#C8102E] hover:bg-[#850D22] text-white rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send</span>
                  </button>
                </form>
              </>
            ) : (
              <div className="p-12 text-center text-xs text-slate-400">Select a case to inspect communication thread.</div>
            )}
          </div>

        </div>

        {/* Create Modal */}
        {showNewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4 text-xs">
              <h3 className="text-base font-bold text-[#101A33]">Open New Support Case</h3>
              <form onSubmit={handleCreateNew} className="space-y-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Subject</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Brief description of the problem..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  >
                    <option value="account">Account & KYC Limits</option>
                    <option value="transaction">Transfers & Payment Delays</option>
                    <option value="billing">Utility Bill Settlement</option>
                    <option value="security">Security & 2FA Tokens</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Initial Message</label>
                  <textarea
                    rows={4}
                    value={initialMsg}
                    onChange={(e) => setInitialMsg(e.target.value)}
                    placeholder="Provide full details..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                    required
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowNewModal(false)}
                    className="py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-[#C8102E] text-white rounded-xl font-bold hover:bg-[#850D22]"
                  >
                    Submit Case
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
