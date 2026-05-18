import React from 'react';

const PremiumDosaOffers = () => {
  // Premium Dosa data set with Dollar pricing
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
    <div className="w-full bg-black py-10 px-4 md:px-8 font-sans select-none">
      
      {/* Premium Header Line */}
      <div className="max-w-7xl mx-auto mb-8 flex items-center">
        <h2 className="text-lg md:text-xl font-bold tracking-widest text-zinc-300 uppercase whitespace-nowrap mr-4">
          Top Offers Today
        </h2>
        <div className="h-[1px] bg-gradient-to-r coding-linear from-cyan-500/50 via-zinc-800 to-transparent flex-grow" />
      </div>

      {/* Horizontal Touch Scroller */}
      <div className="max-w-7xl mx-auto flex items-center gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-none scroll-smooth">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="w-[200px] sm:w-[220px] aspect-square shrink-0 bg-gradient-to-b from-zinc-900 to-black border border-zinc-800 rounded-none p-5 flex flex-col items-center justify-between snap-start relative group transition-all duration-300 hover:border-zinc-700 hover:shadow-[0_0_15px_rgba(255,255,255,0.03)]"
          >
            {/* Subtle Top Metallic Glow Effect */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-zinc-700 to-transparent opacity-50" />
            
            {/* Header Content */}
            <div className="text-center w-full mt-2">
              <h3 className="text-sm font-bold tracking-widest text-zinc-400 group-hover:text-white transition-colors duration-200 uppercase">
                {offer.title}
              </h3>
              
              <div className="mt-1">
                <span 
                  className={`text-xl font-black tracking-tight ${
                    offer.isHighlight 
                      ? 'text-teal-400 drop-shadow-[0_2px_8px_rgba(45,212,191,0.2)]' 
                      : 'text-cyan-400 drop-shadow-[0_2px_8px_rgba(34,211,238,0.2)]'
                  }`}
                >
                  {offer.subTitle}
                </span>
              </div>
            </div>

            {/* Dosa Image Container with Sharp Frame Layout */}
            <div className="w-28 h-28 mb-1 flex items-center justify-center relative bg-zinc-950 p-1 border border-zinc-900 shadow-inner">
              <img
                src={offer.image}
                alt={`${offer.title} Dosa`}
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