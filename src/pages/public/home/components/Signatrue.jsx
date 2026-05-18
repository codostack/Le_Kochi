import React from 'react';

const DosaRestaurantCard = () => {
  // Array containing 4 distinct dosa items
  const restaurants = [
    {
      id: 1,
      title: "Mojo Dosa - 2X Fillings",
      tagline: "India's Highest Rated Dosa Delivery Chain",
      image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80", // Masala Dosa
      logoBg: "bg-orange-500",
      logoText: "MOJO DOSA",
    },
    {
      id: 2,
      title: "LeanCrust Dosa",
      tagline: "The Thin & Crispy Experts",
      image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", // Plain Crispy Dosa
      logoBg: "bg-yellow-600",
      logoText: "Lean Dosa",
    },
    {
      id: 3,
      title: "The Ghee Roast Co.",
      tagline: "Authentic Clarified Butter Classics",
      image: "https://foodgood.in/wp-content/uploads/2025/06/gheeroast-dosa-1024x683.png", // Ghee Roast
      logoBg: "bg-amber-700",
      logoText: "Ghee Roast",
    },
    {
      id: 4,
      title: "Cheese Burst Dosa",
      tagline: "Modern Fusion Loaded with Cheese",
      image: "https://images.raasakarts.com/insecure/fit/1000/1000/ce/0/plain/https://raasakarts.s3.ap-south-1.amazonaws.com/3fa229/prods/yKf7u949BHBnyVxhL7cpyMOeP3FlR3ewy9DrNk0s.jpg@webp", // Fusion Dosa
      logoBg: "bg-red-600",
      logoText: "Cheese Dosa",
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 md:p-8">
      {/* Section Header */}
      <div className="max-w-md mx-auto mb-6 flex items-center md:max-w-4xl lg:max-w-6xl">
        <span className="text-xs font-bold tracking-wider text-gray-400 uppercase mr-3">
          RESTAURANTS
        </span>
        <div className="h-px bg-zinc-800 flex-grow" />
      </div>

      {/* Responsive Grid System */}
      {/* 1 Column on Mobile, 2 on Tablet/Medium Screens, 3 or 4 on Desktop */}
      <div className="grid grid-cols-1 gap-6 max-w-md mx-auto md:max-w-4xl md:grid-cols-2 lg:max-w-6xl lg:grid-cols-4">
        {restaurants.map((item) => (
          <div 
            key={item.id} 
            className="bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden shadow-xl hover:border-zinc-800 transition-all duration-300"
          >
            {/* Image Container with Aspect Ratio */}
            <div className="relative aspect-[16/10] w-full bg-zinc-900">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover"
              />
              
              {/* Overlapping Floating Brand Logo Badge */}
              <div className="absolute -bottom-5 right-4 z-10">
                <div className={`${item.logoBg} w-16 h-16 rounded-full flex flex-col items-center justify-center p-2 text-center shadow-lg transform hover:scale-105 transition-transform duration-200`}>
                  <span className="text-[10px] font-black uppercase tracking-tight leading-none text-white break-words w-full">
                    {item.logoText}
                  </span>
                </div>
              </div>
            </div>

            {/* Card Content Details */}
            <div className="p-5 pt-7">
              <h3 className="text-xl font-bold tracking-tight text-white mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-zinc-400 font-medium mb-4 line-clamp-1">
                {item.tagline}
              </p>

              <hr className="border-zinc-900 mb-3" />

              {/* Offer / Perks Footer */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-emerald-400 font-semibold">
                {/* Verified Icon */}
                <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a.75.75 0 00-.708.523l-.747 2.417a.75.75 0 01-.395.45l-2.22 1.11a.75.75 0 00-.361.815l.395 2.5a.75.75 0 01-.137.533L.367 13.843a.75.75 0 00.342.823l2.25 1.125a.75.75 0 01.413.413l1.125 2.25a.75.75 0 00.823.342l2.04-.68a.75.75 0 01.533-.137l2.5.395a.75.75 0 00.815-.36l1.11-2.22a.75.75 0 01.45-.396l2.417-.747a.75.75 0 00.523-.708V12a.75.75 0 01.22-.53l1.72-1.72a.75.75 0 000-1.06l-1.72-1.72A.75.75 0 0115 6.44V4.955a.75.75 0 00-.523-.708l-2.417-.747a.75.75 0 01-.45-.395L10.5 1.01a.75.75 0 00-.815-.361l-2.5.395a.75.75 0 01-.533-.137L4.955.367a.75.75 0 00-.708.523l-.747 2.417a.75.75 0 01-.395.45l-2.22 1.11zM14 8.5a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                </svg>
                <span>₹0 Delivery, ₹0 Packaging, ₹0 Platform Fees.</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DosaRestaurantCard;