import React from 'react';
import { Utensils, MessageCircle, MapPin, Phone, Clock, ShoppingBag, Leaf, Flame, Heart, Star } from 'lucide-react';

// Path adjusted as per your previous setup
import bgImage from '../../../../assets/images/WhatsApp Image 2026-05-14 at 4.31.29 PM (1).jpeg';

const KeralaFlavoursHero = () => {
  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-hidden mt-[-120px]">
      
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img 
          src={bgImage} 
          alt="Dosa Background" 
          className="w-full h-full object-cover opacity-60 object-center"
        />
        {/* Gradient: On mobile it fades from top, on desktop it fades from left */}
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-black via-black/60 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12 md:pt-20 pb-40 md:pb-32 mt-[100px]">
        <div className="max-w-2xl text-center md:text-left">
          <p className="italic text-xl md:text-2xl font-serif mb-2 text-gray-200">A New Rhythm of</p>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-4">
            <span className="text-yellow-500 block">KERALA</span>
            <span className="text-white block">FLAVOURS</span>
          </h1>

          <div className="flex items-center justify-center md:justify-start gap-3 mb-4 md:mb-6">
            <p className="text-yellow-500 font-bold tracking-widest text-xs md:text-sm uppercase">
              Authentic Kerala Cuisine
            </p>
            <div className="h-[2px] w-8 bg-red-600"></div>
          </div>

          <div className="space-y-1 mb-8 md:mb-12">
             <p className="text-xs md:text-sm tracking-[0.2em] font-bold text-gray-300">SINCE 2015</p>
             <p className="text-lg md:text-xl tracking-widest text-gray-300">61+ DOSA VARIETIES</p>
          </div>

          {/* Features Grid - Hidden on mobile to match image_a0afbd.png badge style */}
          <div className="hidden md:grid grid-cols-4 gap-4 mb-12">
            {[
              { icon: <Leaf className="text-yellow-500" />, title: "Authentic", sub: "Kerala Taste" },
              { icon: <Flame className="text-yellow-500" />, title: "Fresh", sub: "Ingredients" },
              { icon: <Heart className="text-yellow-500" />, title: "Made with", sub: "Love" },
              { icon: <Star className="text-yellow-500" />, title: "Since", sub: "2015" }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="mb-2 p-2 border border-yellow-500/50 rounded-full">
                  {item.icon}
                </div>
                <p className="text-[10px] font-bold uppercase">{item.title}</p>
                <p className="text-[10px] text-gray-400">{item.sub}</p>
              </div>
            ))}
          </div>

          {/* Mobile Badge (The Circular "Since 2015" Badge) */}
          <div className="flex md:hidden justify-center mb-8">
             <div className="border-2 border-yellow-600/50 rounded-full p-1">
                <div className="border border-yellow-600 rounded-full w-20 h-20 flex flex-col items-center justify-center">
                    <span className="text-[8px] uppercase text-yellow-500">Since</span>
                    <span className="text-xl font-bold text-yellow-500">2015</span>
                    <div className="flex gap-1 mt-1">
                        <Star size={8} className="fill-yellow-500 text-yellow-500"/>
                        <Star size={8} className="fill-yellow-500 text-yellow-500"/>
                        <Star size={8} className="fill-yellow-500 text-yellow-500"/>
                    </div>
                </div>
             </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-4 px-4 md:px-0">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 md:py-3 px-8 rounded-lg flex items-center justify-center gap-2 transition-colors uppercase text-sm">
              <Utensils size={18} />
              View Menu
            </button>
            <button className="border-2 border-gray-800 bg-black/40 md:bg-transparent md:border-red-600 hover:bg-red-600/10 text-white font-bold py-4 md:py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors uppercase text-sm">
              <MessageCircle size={18} className="text-yellow-500" />
              Join WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* Footer Info Bar */}
      <div className="absolute bottom-0 w-full bg-[rgb(13,12,8)] border-t border-gray-800 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 md:py-6">
          {/* Info Grid */}
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-8 items-center mb-4 md:mb-0">
            
            <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-1 md:gap-4">
              <MapPin className="text-yellow-500" size={18} />
              <div>
                <p className="font-bold text-[10px] md:text-sm">Brampton, ON</p>
                <p className="hidden md:block text-xs text-gray-400">Canada</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-1 md:gap-4 md:border-l border-gray-800 md:pl-8">
              <Phone className="text-yellow-500" size={18} />
              <div>
                <p className="font-bold text-[10px] md:text-sm">(905) 456-2015</p>
                <p className="hidden md:block text-xs text-gray-400">Call us</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-1 md:gap-4 md:border-l border-gray-800 md:pl-8">
              <Clock className="text-yellow-500" size={18} />
              <div>
                <p className="font-bold text-[10px] md:text-sm">11 AM – 11 PM</p>
                <p className="hidden md:block text-xs text-gray-400">Everyday</p>
              </div>
            </div>

            {/* Desktop Button */}
            <button className="hidden md:flex bg-red-700 hover:bg-red-800 text-white font-bold py-4 px-6 rounded items-center justify-between transition-colors uppercase text-sm">
              <span>Order Online</span>
              <ShoppingBag size={18} />
            </button>
          </div>

          {/* Mobile Order Online Button - Full Width */}
          <button className="md:hidden w-full bg-red-700 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-3 uppercase text-sm mt-2">
            <span>Order Online</span>
            <ShoppingBag size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default KeralaFlavoursHero;