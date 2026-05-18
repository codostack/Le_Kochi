import React from "react";

const dishes = [
  {
    id: 1,
    name: "Malabar Chicken Biriyani",
    subtitle: "Kerala’s Authentic Dum Biriyani",
    image:
      "https://images.unsplash.com/photo-1701579231305-d84d8af9a3fd?q=80&w=1400&auto=format&fit=crop",
    logo:
      "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",
    offer: "₹0 Delivery, ₹0 Packaging, ₹0 Platform Fees.",
    bg: "from-orange-500/20 to-red-500/10",
  },
  {
    id: 2,
    name: "Wood Fire Pizza",
    subtitle: "Thin Crust Italian Style Pizza",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1400&auto=format&fit=crop",
    logo:
      "https://cdn-icons-png.flaticon.com/512/3132/3132693.png",
    offer: "Free Coke on orders above ₹499",
    bg: "from-yellow-500/20 to-orange-500/10",
  },
  {
    id: 3,
    name: "Beef Fry & Porotta",
    subtitle: "Signature Kerala Night Combo",
    image:
      "https://images.unsplash.com/photo-1604908176997-431f5e7c1c47?q=80&w=1400&auto=format&fit=crop",
    logo:
      "https://cdn-icons-png.flaticon.com/512/5787/5787016.png",
    offer: "Flat ₹100 OFF on combo meals",
    bg: "from-red-500/20 to-orange-500/10",
  },
];

export default function SignatureDishPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] py-6 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-black text-[#111] tracking-tight">
            Signature Dishes
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Discover trending dishes from top restaurants
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-5">
          {dishes.map((dish) => (
            <div
              key={dish.id}
              className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-200"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-[230px] object-cover"
                />

                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${dish.bg}`}
                />

                {/* Logo */}
                <div className="absolute bottom-[-34px] right-5">
                  <div className="w-[74px] h-[74px] rounded-full bg-white shadow-lg border-4 border-white flex items-center justify-center overflow-hidden">
                    <img
                      src={dish.logo}
                      alt="logo"
                      className="w-[44px] h-[44px] object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-5 pt-5 pb-4">
                <h2 className="text-[32px] font-black text-[#111] leading-tight">
                  {dish.name}
                </h2>

                <p className="text-gray-500 text-[15px] mt-1 font-medium">
                  {dish.subtitle}
                </p>

                <div className="mt-4 border-t border-gray-200 pt-3 flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>

                  <span className="text-gray-600 text-[14px] font-semibold">
                    {dish.offer}
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-5">
                  <button className="flex-1 h-[48px] rounded-2xl bg-[#111] text-white font-bold hover:opacity-90 transition">
                    Order Now
                  </button>

                  <button className="w-[48px] h-[48px] rounded-2xl border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition">
                    ❤️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}