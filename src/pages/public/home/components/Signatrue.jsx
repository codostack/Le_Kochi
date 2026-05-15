import React, { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SignatureDishes = () => {
  const scrollRef = useRef(null);

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

  // Duplicating for the continuous loop effect
  const allDishes = [...dishes, ...dishes];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const autoScroll = () => {
      const isMobile = window.innerWidth < 640;
      // Scroll by half the container width on mobile (to move 2 dishes)
      const scrollAmount = isMobile ? scrollContainer.offsetWidth : scrollContainer.offsetWidth;

      if (scrollContainer.scrollLeft + scrollContainer.offsetWidth >= scrollContainer.scrollWidth - 20) {
        scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    };

    const interval = setInterval(autoScroll, 4000);
    return () => clearInterval(interval);
  }, []);

  const manualScroll = (direction) => {
    const scrollAmount = scrollRef.current.offsetWidth;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-black text-white py-12 px-2 overflow-hidden">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="h-[1px] w-8 bg-red-600"></span>
          <h2 className="text-[#FFD700] text-xl md:text-3xl font-bold tracking-[0.2em] uppercase">
            Signature Dishes
          </h2>
          <span className="h-[1px] w-8 bg-red-600"></span>
        </div>
        <p className="text-gray-400 italic text-[10px] md:text-sm">
          Experience the real taste of Kerala
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Navigation Arrows */}
        <button
          onClick={() => manualScroll("left")}
          className="absolute left-[-10px] top-1/2 -translate-y-1/2 z-30 text-[#FFD700] hover:scale-110 transition-transform"
        >
          <ChevronLeft size={36} strokeWidth={1.5} />
        </button>

        <button
          onClick={() => manualScroll("right")}
          className="absolute right-[-10px] top-1/2 -translate-y-1/2 z-30 text-[#FFD700] hover:scale-110 transition-transform"
        >
          <ChevronRight size={36} strokeWidth={1.5} />
        </button>

        {/* Scroller Container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 no-scrollbar snap-x snap-mandatory px-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {allDishes.map((dish, index) => (
            <div
              key={index}
              className="
                min-w-[calc(50%-8px)] 
                md:min-w-[calc(25%-12px)] 
                snap-start bg-[#0a0a0a] rounded-xl border border-white/5 overflow-hidden flex-shrink-0
              "
            >
              {/* Image with rounded corners as per your image */}
              <div className="relative h-36 sm:h-44 md:h-56 overflow-hidden m-2 rounded-lg">
                <img
                  src={dish.image}
                  alt={dish.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>

              <div className="p-3 text-center">
                <h3 className="text-[#FFD700] font-semibold text-[9px] md:text-sm tracking-wide h-8 flex items-center justify-center leading-tight">
                  {dish.title}
                </h3>
                
                {/* Description hidden on mobile to keep it clean like the sample */}
                <p className="hidden md:block text-gray-400 text-[10px] mt-2 mb-4">
                  {dish.description}
                </p>

                <button className="mt-2 border border-[#FFD700]/50 px-3 py-1 text-[8px] md:text-[10px] uppercase tracking-tighter hover:bg-[#FFD700] hover:text-black transition-colors">
                  View More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default SignatureDishes;