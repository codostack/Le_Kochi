import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SignatureDishes = () => {
  const dishes = [
    {
      title: "KOZHI CHADACHU KOOTIYADHU",
      description: "Traditional Kerala Chicken Curry",
      image: "https://i.pinimg.com/736x/09/3e/b1/093eb102de31c782c0d230f915473e2f.jpg",
    },
    {
      title: "FISH MANGO CURRY",
      description: "Kerala Style Fish Curry",
      image: "https://i.pinimg.com/736x/09/3e/b1/093eb102de31c782c0d230f915473e2f.jpg",
    },
    {
      title: "MASALA DOSA",
      description: "Crispy & Delicious 61+ Varieties",
      image: "https://i.pinimg.com/736x/09/3e/b1/093eb102de31c782c0d230f915473e2f.jpg",
    },
    {
      title: "KERALA SNACKS",
      description: "Traditional Snacks & Refreshments",
      image: "https://i.pinimg.com/736x/09/3e/b1/093eb102de31c782c0d230f915473e2f.jpg",
    },
  ];

  return (
    <section className="bg-black text-white py-12 px-4">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-4 mb-2">
          <span className="h-[2px] w-12 bg-red-600"></span>

          <h2 className="text-[#FFD700] text-2xl md:text-3xl font-bold tracking-wider uppercase">
            Signature Dishes
          </h2>

          <span className="h-[2px] w-12 bg-red-600"></span>
        </div>

        <p className="text-gray-300 italic text-sm md:text-base">
          Experience the real taste of Kerala
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <button className="absolute left-0 top-1/2 -translate-y-1/2 z-10 text-[#FFD700]">
          <ChevronLeft size={48} strokeWidth={1} />
        </button>

        <button className="absolute right-0 top-1/2 -translate-y-1/2 z-10 text-[#FFD700]">
          <ChevronRight size={48} strokeWidth={1} />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-10">
          {dishes.map((dish, index) => (
            <div
              key={index}
              className="bg-[#0a0a0a] rounded-2xl border border-white/10 overflow-hidden"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.title}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>

              <div className="p-5 text-center">
                <h3 className="text-[#FFD700] font-bold text-sm min-h-[40px]">
                  {dish.title}
                </h3>

                <p className="text-gray-400 text-xs mt-3 mb-6">
                  {dish.description}
                </p>

                <button className="border border-[#FFD700] px-5 py-2 text-xs uppercase tracking-widest hover:bg-[#FFD700] hover:text-black transition-all duration-300">
                  View More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignatureDishes;