import React from 'react';

const LeKochiCoupon = () => {
  const couponData = {
    brand: 'Le Kochi',
    code: 'COCHIN30',
    savings: 'Save ₹125 on your next order',
    condition: '10% off on orders above ₹400. Max discount: ₹150.',
    discountPercent: '10% OFF'
  };

  return (
    // Clean, compact wrapper with no full-screen height forcing unwanted vertical spaces
    <div className="w-full max-w-md bg-black p-2 select-none font-sans mx-auto">
      
      {/* Main Container - Sharp styling with minimal spacing */}
      <div className="flex w-full h-[130px] overflow-hidden rounded-xl bg-zinc-950 border border-yellow-400/40 shadow-lg">
        
        {/* Left Section - Solid Brand Accent */}
        <div className="w-[60px] flex-shrink-0 bg-yellow-400 flex flex-col items-center justify-between py-4 relative">
          {/* Small Top Branding Header */}
          <span className="text-[9px] font-black tracking-tighter text-black uppercase opacity-80">
         
          </span>
          
          {/* Perfectly Centered Vertical Value Text */}
          <div className="text-xl font-black uppercase text-black -rotate-90 origin-center whitespace-nowrap tracking-tighter">
            {couponData.discountPercent}
          </div>

          {/* Minimal visual balance dot */}
          <div className="w-1.5 h-1.5 bg-black/30 rounded-full" />
        </div>
        
        {/* Right Section - Content Area */}
        <div className="flex-grow p-4 flex flex-col justify-between text-yellow-400 min-w-0">
          
          {/* Header Area: Branding Text & Code Action */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase leading-none mb-1">
                {couponData.brand}
              </p>
              <h2 className="text-xl font-black uppercase tracking-wide text-yellow-400 truncate">
                {couponData.code}
              </h2>
            </div>
            
            <button className="px-3 py-1 text-xs border border-yellow-400/60 rounded font-bold tracking-wider hover:bg-yellow-400 hover:text-black transition-all duration-150 uppercase shrink-0">
              Apply
            </button>
          </div>
          
          {/* Savings Highlight */}
          <p className="text-xs font-bold text-teal-400 truncate">
            {couponData.savings}
          </p>
          
          {/* Divider Line */}
          <div className="h-px w-full border-t border-dashed border-zinc-800" />
          
          {/* Condition Info Text */}
          <p className="text-[11px] font-medium text-zinc-400 truncate">
            {couponData.condition}
          </p>
          
        </div>
        
      </div>
    </div>
  );
};

export default LeKochiCoupon;