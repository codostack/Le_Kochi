import React from 'react';
import { MapPin, Phone, Clock, ShoppingBag, Leaf, Flame, Heart, Star, } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Path adjusted as per your setup
// import bgImage from '../../../../assets/images/WhatsApp Image 2026-05-14 at 4.31.29 PM (1).jpeg';

const KeralaFlavoursHero = () => {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-hidden mt-[-120px]">
      
      {/* Background Image Container */}
 <div className="absolute inset-0 z-0 flex items-center justify-center ">
  {/* Centered Image Container */}
  <div className="relative w-full max-w-4xl h-[55%] md:h-[60%] overflow-hidden">
    <img 
      src="https://i.pinimg.com/1200x/18/dc/25/18dc251f518fd249f3522643ce3a626b.jpg" 
      alt="Dosa Background" 
      className="w-full h-full object-cover opacity-90"
    />
    
    {/* Gradient Overlay centered with the image */}
    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent"></div>
    
    {/* Optional: Soft vignettes on top and bottom to blend with background */}
    <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black to-transparent"></div>
    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black to-transparent"></div>
  </div>
</div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 md:pt-20 pb-40 md:pb-32 mt-[50px]">
        <div className="max-w-2xl text-left mt-5">
          <p className="italic text-lg md:text-2xl font-serif mb-1 text-gray-200">A New Rhythm of</p>
          {/* <h1 className=" font-black tracking-tighter leading-none mb-4">
   
          </h1> */}

            <h1 className=" font-serif text-2xl tracking-widest">
                      <span className="text-5xl md:text-8xl text-[#c5a059] block">KERALA</span>
            <span className=" text-5xl md:text-8xl text-white block">FLAVOURS</span>
            </h1>
          <div className="flex items-center justify-start gap-3 mb-4 md:mb-6">
            <p className="text-[#c5a059] font-bold tracking-widest text-[10px] md:text-sm uppercase">
              Authentic Kerala Cuisine
            </p>
            <div className="h-[1.5px] w-8 bg-red-600"></div>
          </div>

          <div className="space-y-1 mb-8 md:mb-12">
             <p className="text-[10px] md:text-sm tracking-[0.2em] font-bold text-gray-300">SINCE 2015</p>
             <p className="text-sm md:text-xl tracking-widest text-gray-300 uppercase">61+ Dosa Varieties</p>
          </div>

          {/* Desktop Features Grid */}
          <div className="hidden md:grid grid-cols-4 gap-4 mb-12 ml-[-55px]">
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

          {/* Mobile Badge */}
          <div className="flex md:hidden justify-start mb-10">
             <div className="border border-yellow-600/30 rounded-full p-1">
                <div className="border border-yellow-600 rounded-full w-16 h-16 flex flex-col items-center justify-center">
                    <span className="text-[7px] uppercase text-yellow-500 tracking-tighter">Since</span>
                    <span className="text-lg font-bold text-yellow-500 leading-none">2015</span>
                    <div className="flex gap-0.5 mt-0.5">
                        <Star size={6} className="fill-yellow-500 text-yellow-500"/>
                        <Star size={6} className="fill-yellow-500 text-yellow-500"/>
                        <Star size={6} className="fill-yellow-500 text-yellow-500"/>
                    </div>
                </div>
             </div>
          </div>

{/* Action Buttons */}
<div className="grid grid-cols-2 md:flex md:flex-row gap-3 mt-[80px]">
  
  <button
    onClick={() => navigate("/menu")}
    className="bg-[#c5a059] hover:bg-yellow-600 text-black font-bold py-3 px-4 rounded-md flex items-center justify-center gap-2 transition-colors uppercase text-[11px] md:text-sm"
  >
    View Menu
  </button>

  <button
    onClick={() => window.open("https://wa.me/919999999999", "_blank")}
    className="border border-gray-600 bg-black/60 md:bg-transparent md:border-red-600 hover:bg-red-600/10 text-white font-bold py-3 px-4 rounded-md flex items-center justify-center gap-2 transition-colors uppercase text-[11px] md:text-sm"
  >
    Join Whatsapp
  </button>
</div>
        </div>
      </div>

      {/* Footer Info Bar */}
<div className="absolute bottom-0 w-full bg-[rgb(10,10,10)]/90 border-t border-gray-900 backdrop-blur-md z-20">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-6">
          <div className="grid grid-cols-3 md:grid-cols-4 gap-1 md:gap-8 items-center mb-4 md:mb-0">
            
            <div className="flex items-center md:items-start text-left gap-2 md:gap-4">
              {/* Fixed sizing: removed md:size namespace */}
              <MapPin className="text-yellow-500 w-4 h-4 md:w-5 md:h-5" />
              <div>
<p className="font-bold text-[9px] md:text-sm">
  Brampton, Ontario, Canada
</p>                <p className="text-[8px] md:text-xs text-gray-500">Canada</p>
              </div>
            </div>

            <div className="flex items-center md:items-start text-left gap-2 md:gap-4 md:border-l border-gray-800 md:pl-8">
              <Phone className="text-yellow-500 w-4 h-4 md:w-5 md:h-5" />
              <div>
                <p className="font-bold text-[9px] md:text-sm">9057940444</p>
                <p className="text-[8px] md:text-xs text-gray-500">Call Us</p>
              </div>
            </div>

            <div className="flex items-center md:items-start text-left gap-2 md:gap-4 md:border-l border-gray-800 md:pl-8">
              <Clock className="text-yellow-500 w-4 h-4 md:w-5 md:h-5" />
              <div>
                <p className="font-bold text-[9px] md:text-sm">11 AM - 11 PM</p>
                <p className="text-[8px] md:text-xs text-gray-500">Everyday</p>
              </div>
            </div>

<button
  onClick={() => navigate("/menu")}
  className="hidden md:flex relative z-20 bg-red-700 hover:bg-red-800 text-white font-bold py-4 px-6 rounded items-center justify-between transition-colors uppercase text-sm cursor-pointer"
>
  <span>Order Online</span>
  <ShoppingBag size={18} />
</button>
          </div>

<button
  onClick={() => navigate("/menu")}
  className="md:hidden relative z-20 w-full bg-red-800 text-white font-bold py-3.5 rounded-md flex items-center justify-center gap-3 uppercase text-xs mt-2 mb-8 cursor-pointer"
>
  <span>Order Online</span>
  <ShoppingBag size={16} />
</button>
        </div>
      </div>
    </div>
  );
};

export default KeralaFlavoursHero;