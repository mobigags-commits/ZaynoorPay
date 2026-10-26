import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertTriangle, ArrowLeft, Activity, ShieldCheck } from 'lucide-react';

export const AdminSystemStatusPage: React.FC = () => {
  const { navigate } = useApp();

  const services = [
    { name: 'Core Double-Entry Settlement Engine', status: 'Operational', latency: '12ms', uptime: '99.99%' },
    { name: 'Customer Web Portal & React Engine', status: 'Operational', latency: '18ms', uptime: '99.98%' },
    { name: 'Mobile App API & WebSocket Push Rail', status: 'Operational', latency: '24ms', uptime: '99.98%' },
    { name: 'Raast Direct Central Bank Switch (ISO 20022)', status: 'Operational', latency: '45ms', uptime: '99.95%' },
    { name: '1Link Interbank Network Gateway', status: 'Operational', latency: '60ms', uptime: '99.94%' },
    { name: 'Visa & Mastercard Acquiring Rail', status: 'Operational', latency: '85ms', uptime: '99.99%' },
    { name: 'Identity & Sanctions Screening Engine', status: 'Operational', latency: '110ms', uptime: '100.0%' },
  ];

  return (
    <div className="py-12 bg-[#F4F6FA] text-slate-800 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
          <span className="text-xs font-mono text-slate-400">Refreshed 10 seconds ago</span>
        </div>

        {/* Big Overall Banner */}
        <div className="p-8 bg-emerald-50 rounded-3xl border border-emerald-200 text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-emerald-950">
            All ZaynoorPay Financial Systems Operational
          </h1>
          <p className="text-xs text-emerald-800">
            Current 30-Day Platform Uptime: <strong className="font-mono">99.98%</strong> across all domestic and international clearing nodes.
          </p>
        </div>

        {/* Services List */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-[#101A33]">System Component Health</h2>

          <div className="divide-y divide-slate-100 text-xs">
            {services.map((s, idx) => (
              <div key={idx} className="py-3.5 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">{s.name}</span>
                  <span className="text-[11px] text-slate-400 font-mono">Response: {s.latency} · 30d: {s.uptime}</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-600 font-bold font-mono text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>{s.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Incidents */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-3 text-xs">
          <h3 className="text-sm font-bold text-[#101A33]">Recent Maintenance & Incidents</h3>
          <p className="text-slate-500">
            No unexpected outages or data degradations recorded in the past 90 days.
          </p>
        </div>

      </div>
    </div>
  );
};
