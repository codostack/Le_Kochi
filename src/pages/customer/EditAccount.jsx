import React, { useState } from 'react';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  CheckCircle2,
  Lock
} from 'lucide-react';

export default function EditAccount() {
  // Input form states loaded with initial profile data
  const [profile, setProfile] = useState({
    name: 'Rahul Nair',
    email: 'rahul.nair@example.com',
    phone: '9876543210'
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
    if (isSaved) setIsSaved(false); // Reset saved badge if user edits again
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API Database Save Action
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 4000); // Fade out alert message after 4s
  };

  return (
    <div className="min-h-screen bg-[#041a13] text-white font-sans antialiased">
      
      {/* Sticky Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#041a13]/90 backdrop-blur-md border-b border-zinc-800/80 px-4 py-4">
        <div className="max-w-xl mx-auto flex items-center space-x-4">
          <button 
            onClick={() => window.history.back()} 
            className="p-2 -ml-2 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-yellow-400 rounded-full transition-colors"
            aria-label="Go back to previous page"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-bold tracking-tight">Edit Profile</h1>
            <p className="text-xs text-zinc-400">Update your account details</p>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-xl mx-auto px-4 mt-8">
        
        {/* Success Alert Banner Notification */}
        {isSaved && (
          <div className="mb-6 p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-xl flex items-center space-x-3 text-emerald-400 animate-in fade-in slide-in-from-top-2 duration-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <p className="text-xs font-medium">Changes saved successfully! Your profile details are now up to date.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Form Input Group Wrapper */}
          <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-5 space-y-5">
            
            {/* Input Element: Full Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-yellow-400 transition-colors">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={profile.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full bg-zinc-950/80 border border-zinc-800 focus:border-yellow-400/50 rounded-xl pl-11 pr-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Input Element: Email Address */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-yellow-400 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={profile.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full bg-zinc-950/80 border border-zinc-800 focus:border-yellow-400/50 rounded-xl pl-11 pr-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Input Element: Phone Number */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
                  Phone Number
                </label>
                <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5" /> Verified
                </span>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-yellow-400 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                {/* Prefix Country Code display */}
                <span className="absolute inset-y-0 left-10 flex items-center pr-1 text-sm font-bold font-mono text-zinc-500 select-none">
                  +91
                </span>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  pattern="[0-9]{10}"
                  value={profile.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  className="w-full bg-zinc-950/80 border border-zinc-800 focus:border-yellow-400/50 rounded-xl pl-20 pr-4 py-3 text-sm font-mono tracking-wide text-zinc-200 placeholder-zinc-600 focus:outline-none transition-all"
                />
              </div>
            </div>

          </div>

          {/* Bottom Call-To-Action Save Button Container */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-extrabold text-sm py-3.5 rounded-xl transition-all shadow-lg active:scale-[0.99] tracking-wide"
            >
              Save Changes
            </button>
          </div>

        </form>

        {/* Security Privacy Info Note footer */}
        <p className="text-center text-[11px] text-zinc-500 mt-6 leading-relaxed px-4">
          Your privacy matters to us. Your contact numbers or data profile attributes are encrypted and strictly restricted to delivery fulfillments.
        </p>

      </main>
    </div>
  );
}