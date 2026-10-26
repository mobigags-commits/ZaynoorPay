import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, ShieldCheck, ArrowRight, Check, Trash2, Info } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationAsRead, clearAllNotifications, navigate } = useApp();

  return (
    <div className="py-8 bg-[#F4F6FA] text-slate-800 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#850D22]">Activity Inbox</span>
            <h1 className="text-2xl font-extrabold text-[#101A33] tracking-tight">
              Notifications & Security Alerts
            </h1>
          </div>
          {notifications.length > 0 && (
            <button
              onClick={clearAllNotifications}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-rose-600 border border-slate-200 rounded-xl bg-slate-50 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          )}
        </div>

        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => markNotificationAsRead(n.id)}
              className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${n.read ? 'bg-white border-slate-200' : 'bg-white border-[#C8102E]/30 shadow-xs ring-1 ring-[#C8102E]/10'}`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-xl shrink-0 ${n.type === 'transaction' ? 'bg-emerald-50 text-emerald-600' : n.type === 'security' ? 'bg-rose-50 text-[#C8102E]' : 'bg-blue-50 text-blue-600'}`}>
                  {n.type === 'transaction' ? <ShieldCheck className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-xs text-[#101A33]">{n.title}</h3>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-[#C8102E]" />
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{n.message}</p>
                  <span className="text-[10px] text-slate-400 font-mono block pt-1">{n.timestamp}</span>
                </div>
              </div>

              {!n.read && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    markNotificationAsRead(n.id);
                  }}
                  className="p-1 text-slate-400 hover:text-slate-700"
                  title="Mark as read"
                >
                  <Check className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}

          {notifications.length === 0 && (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-2">
              <Bell className="w-8 h-8 text-slate-300 mx-auto" />
              <h3 className="font-bold text-sm text-[#101A33]">All Caught Up!</h3>
              <p className="text-xs text-slate-400">You have no unread transaction or security notifications.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
