import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MessageSquare, 
  MessageCircle, 
  Bell, 
  Trash2, 
  ShieldAlert,
  ChevronRight
} from 'lucide-react';

export default function SettingsPage() {
  // Toggle states for communication preferences
  const [preferences, setPreferences] = useState({
    smsAllow: true,
    whatsappAllow: true,
    recommendations: true,
    reminders: false,
  });

  // Handler to flip true/false switches
  const handleToggle = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-[#041a13] text-white font-sans antialiased">
      
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-[#041a13]/90 backdrop-blur-md border-b border-zinc-800/80 px-4 py-4">
        <div className="max-w-xl mx-auto flex items-center space-x-4">
          <button 
            onClick={() => window.history.back()} 
            className="p-2 -ml-2 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-yellow-400 rounded-full transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-bold tracking-tight">Settings</h1>
            <p className="text-xs text-zinc-400">Manage your communication and privacy</p>
          </div>
        </div>
      </header>

      {/* Settings Main Content */}
      <main className="max-w-xl mx-auto px-4 mt-6 space-y-6">

        {/* Section 1: Notifications & Alerts */}
        <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-zinc-800/60">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Communication Preferences</h2>
          </div>

          <div className="divide-y divide-zinc-800/40">
            
            {/* Toggle Item: SMS Alerts */}
            <div className="p-4 flex items-center justify-between hover:bg-zinc-900/20 transition-colors">
              <div className="flex items-start space-x-3 max-w-[75%]">
                <div className="p-2 bg-zinc-800/60 rounded-xl mt-0.5 text-yellow-400">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-200">SMS Notifications</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">Receive transactional text updates, invoices, and billing receipts</p>
                </div>
              </div>
              <button 
                onClick={() => handleToggle('smsAllow')}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-all duration-300 ${preferences.smsAllow ? 'bg-yellow-400' : 'bg-zinc-700'}`}
              >
                <div className={`bg-black w-4 h-4 rounded-full shadow-md transform transition-all duration-300 ${preferences.smsAllow ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            {/* Toggle Item: WhatsApp Order Updates */}
            <div className="p-4 flex items-center justify-between hover:bg-zinc-900/20 transition-colors">
              <div className="flex items-start space-x-3 max-w-[75%]">
                <div className="p-2 bg-zinc-800/60 rounded-xl mt-0.5 text-emerald-500">
                  <MessageCircle className="w-4 h-4 fill-emerald-500/20" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-200">WhatsApp Updates</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">Get live status tracking tracking cards and delivery alerts directly on WhatsApp</p>
                </div>
              </div>
              <button 
                onClick={() => handleToggle('whatsappAllow')}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-all duration-300 ${preferences.whatsappAllow ? 'bg-yellow-400' : 'bg-zinc-700'}`}
              >
                <div className={`bg-black w-4 h-4 rounded-full shadow-md transform transition-all duration-300 ${preferences.whatsappAllow ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            {/* Toggle Item: Smart Recommendations */}
            

            {/* Toggle Item: Meal Reminders */}
            <div className="p-4 flex items-center justify-between hover:bg-zinc-900/20 transition-colors">
              <div className="flex items-start space-x-3 max-w-[75%]">
                <div className="p-2 bg-zinc-800/60 rounded-xl mt-0.5 text-yellow-400">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-200">Meal Reminders</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">Get subtle prompts around your usual breakfast, lunch, or dinner routines so you never order late</p>
                </div>
              </div>
              <button 
                onClick={() => handleToggle('reminders')}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-all duration-300 ${preferences.reminders ? 'bg-yellow-400' : 'bg-zinc-700'}`}
              >
                <div className={`bg-black w-4 h-4 rounded-full shadow-md transform transition-all duration-300 ${preferences.reminders ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

          </div>
        </div>

        {/* Section 2: Danger Zone Block */}
        <div className="bg-red-950/10 border border-red-900/30 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-red-900/20 bg-red-950/20">
            <h2 className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" /> Account Safety
            </h2>
          </div>
          
          <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-red-950/20 transition-colors group">
            <div className="flex items-start space-x-3 max-w-[80%]">
              <div className="p-2 bg-red-950/40 border border-red-900/30 rounded-xl mt-0.5 text-red-400">
                <Trash2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-red-200 group-hover:text-red-400 transition-colors">Delete Account</h3>
                <p className="text-xs text-zinc-500 mt-0.5">Permanently remove your digital profile data, order history tracking parameters, and saved credit logs</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-red-400 transition-colors transform group-hover:translate-x-0.5" />
          </div>
        </div>

      </main>
    </div>
  );
}