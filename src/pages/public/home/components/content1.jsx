import React from 'react';

const PremiumDosaOffers = () => {

    const offers = [
    {
      id: 1,
      title: "MASALA",
      subTitle: "$4.99",
      image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=400&q=80",
      isHighlight: false,
    },
    {
      id: 2,
      title: "GHEE ROAST",
      subTitle: "$5.99",
      image: "https://foodgood.in/wp-content/uploads/2025/06/gheeroast-dosa-1024x683.png",
      isHighlight: false,
    },
    {
      id: 3,
      title: "CHEESE",
      subTitle: "$6.49",
      image: "https://images.raasakarts.com/insecure/fit/1000/1000/ce/0/plain/https://raasakarts.s3.ap-south-1.amazonaws.com/3fa229/prods/yKf7u949BHBnyVxhL7cpyMOeP3FlR3ewy9DrNk0s.jpg@webp",
      isHighlight: false,
    },
    {
      id: 4,
      title: "DIET LITE",
      subTitle: "GUILT FREE",
      image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=400&q=80",
      isHighlight: true,
    }
  ];

  return (
    <div className="w-full bg-black py-6 px-4 font-sans select-none">
      
      {/* Premium Header Line */}
      <div className="max-w-5xl mx-auto mb-5 flex items-center">
        <h2 className="text-xs md:text-sm font-bold tracking-widest text-zinc-400 uppercase whitespace-nowrap mr-3">
          Top Offers Today
        </h2>
        <div className="h-[1px] bg-gradient-to-r from-cyan-500/30 via-zinc-800 to-transparent flex-grow" />
      </div>

      {/* Grid to force exactly 3 boxes per view horizontally */}
      <div className="max-w-5xl mx-auto grid grid-cols-3 gap-3 md:gap-4">
        {offers.slice(0, 3).map((offer) => (
          <div
            key={offer.id}
            className="w-full min-h-[170px] sm:min-h-[190px] bg-gradient-to-b from-zinc-900 to-black border border-zinc-800 rounded-xl p-3 pt-4 pb-4 flex flex-col items-center justify-between relative group transition-all duration-300 hover:border-zinc-700 hover:shadow-[0_0_15px_rgba(255,255,255,0.03)] overflow-hidden"
          >
            {/* Top Metallic Glow */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-zinc-600 to-transparent opacity-50" />
            
            {/* Header Content */}
            <div className="text-center w-full">
              <h3 className="text-[10px] md:text-xs font-bold tracking-wider text-zinc-400 group-hover:text-white transition-colors duration-200 uppercase truncate">
                {offer.title}
              </h3>
              <div className="mt-0.5">
                <span 
                  className={`text-sm md:text-base font-black tracking-tight ${
                    offer.isHighlight ? 'text-teal-400' : 'text-cyan-400'
                  }`}
                >
                  {offer.subTitle}
                </span>
              </div>
            </div>

            {/* Downsized Image Container */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center relative bg-zinc-950 p-0.5 border border-zinc-900 rounded-lg overflow-hidden">
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremiumDosaOffers;