import React from 'react';
import { UtensilsCrossed, Leaf, ShieldCheck, Soup } from 'lucide-react';

const Headercontent4 = () => {
  const features = [
    {
      icon: <UtensilsCrossed className="text-[#c5a059]" size={28} />,
      title: "61+ Dosa Varieties",
      sub: "Wide Range"
    },
    {
      icon: <Leaf className="text-[#c5a059]" size={28} />,
      title: "Authentic Kerala Taste",
      sub: "Traditional Recipes"
    },
    {
      icon: <ShieldCheck className="text-[#c5a059]" size={28} />,
      title: "Hygienic & Fresh",
      sub: "Premium Quality"
    },
    {
      icon: <Soup className="text-[#c5a059]" size={28} />,
      title: "Catering Available",
      sub: "For All Occasions"
    }
  ];

  // Duplicate the array to ensure seamless looping
  const displayFeatures = [...features, ...features, ...features];

  return (
    <div className="bg-black py-8 overflow-hidden border-y border-white/5">
      {/* Background Reference Image (Hidden or as backdrop) */}
      {/* <img src="WhatsApp Image 2026-05-14 at 10.10.25 6.jpg" className="hidden" alt="reference" /> */}

      <div className="relative flex">
        <div className="flex animate-scroll-right whitespace-nowrap">
          {displayFeatures.map((item, index) => (
            <div 
              key={index} 
              className="flex items-center space-x-4 px-12 border-r border-white/10"
            >
              <div className="flex-shrink-0">
                {item.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-sm tracking-wide uppercase">
                  {item.title}
                </span>
                <span className="text-gray-400 text-xs font-light">
                  {item.sub}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Headercontent4;