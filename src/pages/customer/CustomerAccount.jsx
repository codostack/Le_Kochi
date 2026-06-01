import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  HelpCircle, 
  MoreVertical, 
  User, 
  LogOut, 
  Settings, 
  ChevronRight, 
  CreditCard, 
  Clock, 
  ShoppingBag,
  ArrowLeft
} from 'lucide-react';

export default function AccountCenter() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-[#041a13] text-white font-sans antialiased pb-12">
      {/* Top Header Section */}
      <header className="max-w-4xl mx-auto px-4 pt-6 pb-4 border-b border-zinc-800">
        <div className="flex items-start justify-between">
          
          {/* Left Side: Back button and Address Details */}
          <div className="flex items-start space-x-3 max-w-[70%]">
            <Link 
              to="/" 
              className="p-2 bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300 hover:text-yellow-400 rounded-full transition-colors mt-1 flex items-center justify-center"
              aria-label="Go to Home"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="p-2 bg-zinc-800/60 rounded-xl mt-1 text-yellow-400">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Delivering To</h2>
              <h1 className="text-lg font-bold text-white mt-0.5 truncate">Home</h1>
              <p className="text-sm text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                42, Orchid Elegance, Near Central Park, Palakkad, Kerala - 678001
              </p>
            </div>
          </div>

          {/* Right Side: Help & Options */}
          <div className="flex items-center space-x-4 relative" ref={menuRef}>
            {/* Help Button */}
            <Link 
              to="/customer/help"
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-zinc-800/60 hover:bg-zinc-800 rounded-full transition-all text-sm font-medium border border-zinc-700/50 text-zinc-200"
            >
              <HelpCircle className="w-4 h-4 text-yellow-400" />
              <span>Help</span>
            </Link>

            {/* Three Dots Action Button */}
            <div className="relative">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-full transition-all ${isMenuOpen ? 'bg-yellow-400 text-black' : 'bg-zinc-800/60 hover:bg-zinc-800 text-zinc-200'}`}
                aria-label="Account Options"
              >
                <MoreVertical className="w-5 h-5" />
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <Link 
                    to="/customer/edit"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-yellow-400 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>Edit Account</span>
                  </Link>
                  <Link 
                    to="/customer/settings"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-yellow-400 transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </Link>
                  <div className="border-t border-zinc-800 my-1"></div>
                  <Link 
                    to="/customer/logout"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-950/30 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </Link>
                </div>
              )}
            </div>
          </div>

        </div>
      </header>

      {/* Main Bottom Content Section */}
      <main className="max-w-4xl mx-auto px-4 mt-8 space-y-6">
        
        {/* Saved Addresses Summary */}
        <section className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-5 hover:border-zinc-700 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-400/10 text-yellow-400 rounded-lg">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold tracking-wide">Saved Addresses</h3>
            </div>
            <Link to="/customer/address-management" className="text-xs font-semibold text-yellow-400 hover:underline">Manage All</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
              <span className="text-xs font-bold bg-zinc-800 px-2 py-0.5 rounded text-zinc-300">Home</span>
              <p className="text-xs text-zinc-400 mt-2 line-clamp-2">42, Orchid Elegance, Near Central Park, Palakkad...</p>
            </div>
            <Link 
              to="/customer/address-management"
              className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 flex items-center justify-center border-dashed cursor-pointer hover:bg-zinc-900 transition-colors"
            >
              <span className="text-xs font-semibold text-zinc-500">+ Add New Address</span>
            </Link>
          </div>
        </section>

        {/* Payment History Card */}
        <Link 
          to="/customer/payment-history"
          className="block bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-5 hover:border-zinc-700 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-400/10 text-yellow-400 rounded-lg">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold tracking-wide group-hover:text-yellow-400 transition-colors">Payment History</h3>
                <p className="text-xs text-zinc-400 mt-0.5">Saved cards, wallets, and recent transactions</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:text-yellow-400 transition-all group-hover:translate-x-0.5" />
          </div>
        </Link>

        {/* Past Orders Section */}
        <section className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-5 hover:border-zinc-700 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-400/10 text-yellow-400 rounded-lg">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold tracking-wide">Past Orders</h3>
            </div>
            <Link to="/customer/past-orders" className="text-xs font-semibold text-yellow-400 hover:underline">View History</Link>
          </div>

          {/* Sample Past Order Item */}
          <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-sm font-bold text-white">Burger Lounge</h4>
                <p className="text-xs text-zinc-500 mt-0.5">Town Centre, Palakkad</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-yellow-400">₹450.00</span>
                <div className="flex items-center text-[10px] text-zinc-400 mt-1 space-x-1">
                  <Clock className="w-3 h-3 text-emerald-500" />
                  <span className="text-emerald-500 font-medium">Delivered</span>
                </div>
              </div>
            </div>
            <div className="border-t border-zinc-900 pt-2 flex items-center justify-between text-xs">
              <span className="text-zinc-400 truncate max-w-[70%]">1x Classic Cheesy Burger, 1x Peri Peri Fries</span>
              <button className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-md text-[11px] transition-colors">
                Reorder
              </button>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}