import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Smartphone, 
  LogOut, 
  ShieldCheck, 
  Globe
} from 'lucide-react';

export default function LogoutPage() {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Simulated device data mirroring a realistic food delivery application session
  const currentDevice = {
    model: "Apple iPhone 15 Pro",
    os: "iOS 17.4",
    location: "Palakkad, Kerala, India",
    status: "Active Now",
    ipAddress: "192.168.1.45"
  };

  const handleLogout = () => {
    setIsLoggingOut(true);
    // Simulate auth token clearance and redirect
    setTimeout(() => {
      localStorage.removeItem("token");
      alert("Logged out successfully!");
      navigate("/login");
      setIsLoggingOut(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#041a13] text-white font-sans antialiased">
      
      {/* Top Sticky Header Navigation */}
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
            <h1 className="text-lg font-bold tracking-tight">Logout & Security</h1>
            <p className="text-xs text-zinc-400">Manage your active sessions</p>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-xl mx-auto px-4 mt-8 space-y-6">
        
        {/* Active Session Info Box */}
        <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-zinc-800/60 bg-zinc-900/20 flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Current Device</h2>
            <span className="flex items-center gap-1 text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
              {currentDevice.status}
            </span>
          </div>

          <div className="p-5 space-y-4">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-zinc-800/80 border border-zinc-700/50 text-yellow-400 rounded-xl">
                <Smartphone className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-zinc-100">{currentDevice.model}</h3>
                <p className="text-xs text-zinc-400">{currentDevice.os} App Session</p>
              </div>
            </div>

            {/* Session Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-zinc-400 border-t border-zinc-800/60">
              <div className="flex items-center space-x-2">
                <Globe className="w-3.5 h-3.5 text-zinc-600" />
                <span>{currentDevice.location}</span>
              </div>
             
            </div>
          </div>
        </div>

        {/* Informational Security Banner */}
        <div className="p-4 bg-zinc-950/60 border border-zinc-900 rounded-xl flex items-start space-x-3">
          <ShieldCheck className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
          <p className="text-xs text-zinc-400 leading-relaxed">
            Logging out clears your encrypted active access tokens on this device. You will need to verify via an OTP code to gain delivery account access next time.
          </p>
        </div>

        {/* Main Action Block */}
        <div className="pt-4">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-zinc-800 text-white font-extrabold text-sm py-4 rounded-xl transition-all shadow-lg shadow-red-950/20 active:scale-[0.99] flex items-center justify-center space-x-2 tracking-wide"
          >
            <LogOut className="w-4 h-4" />
            <span>{isLoggingOut ? "Logging out safely..." : "Log Out from Device"}</span>
          </button>
        </div>

      </main>
    </div>
  );
}