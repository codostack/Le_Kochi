import React from "react";
import {
  Leaf,
  UtensilsCrossed,
  Heart,
  ShieldCheck,
  Award,
} from "lucide-react";

export default function AboutHeader() {
  return (
<section className="min-h-screen overflow-x-hidden bg-[#05110a] relative flex items-center py-16 lg:py-0">      
      {/* Background Glow */}

      <div className="relative max-w-7xl mx-auto  w-full px-6 pb-10 lg:px-10 flex items-center">

        {/* Layout: Stacks on mobile, 2-cols on desktop */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 items-center w-full">

          {/* 1. TEXT CONTENT - Appears first on mobile */}
          <div className="order-1 lg:order-1 text-center lg:text-left">
            
            {/* Small Heading */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
             
              <span className="text-[#c5a059] uppercase  text-[30px]">
                About Us
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl md:text-4xl xl:text-[58px] leading-tight font-serif text-white">
            
   Our Story
              
              
            </h1>

            {/* Paragraphs */}
            <div className="mt-6 space-y-4 text-[#d4d4d4] text-sm md:text-base leading-7 max-w-xl mx-auto lg:mx-0">
              <p>
                At LeKochi Café & Kitchen, every dish tells a story rooted in
                Kerala tradition, crafted with authentic spices and fresh local
                ingredients.
              </p>
              <p>
                Since 2015, we have created unforgettable dining moments with
                rich flavours, warm hospitality, and a modern South Indian
                culinary experience.
              </p>
            </div>
          </div>

          {/* 2. IMAGE - Appears second on mobile */}
          <div className="order-2 lg:order-2 relative flex justify-center w-full">
            <div className="relative rounded-[28px] overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.7)] w-full max-w-[520px]">
              <img
                src="https://i.pinimg.com/1200x/77/9f/08/779f0805eccc45883849c7f99e04c67c.jpg"
                alt="Restaurant"
                className="w-full h-[50vh] lg:h-[72vh] object-cover"
              />
              
              {/* Overlay - Hidden on mobile to match your image, shown on desktop */}
              <div className="hidden lg:block absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

              {/* Bottom Text - Desktop Only */}
              <div className="hidden lg:block absolute bottom-5 left-5 bg-black/50 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 max-w-[220px]">
                <p className="text-[#c5a059] uppercase tracking-[0.25em] text-[9px] mb-1">
                  LeKochi Signature
                </p>
                <h3 className="text-white text-lg font-serif leading-snug">
                  Where tradition meets modern elegance.
                </h3>
              </div>
            </div>

            {/* Floating Experience - Desktop Only */}
            <div className="absolute -left-4 top-10 bg-[#101d15]/90 backdrop-blur-xl border border-[#c5a059]/20 rounded-2xl px-5 py-4 shadow-2xl hidden lg:block">
              <div className="text-[#c5a059] text-2xl font-serif">10+</div>
              <p className="text-gray-300 text-[10px] uppercase tracking-[0.25em] mt-1 leading-4">
                Years of <br /> Excellence
              </p>
            </div>
          </div>

          {/* 3. FEATURES GRID - Appears third on mobile, under the image on desktop */}
          {/* Note: In desktop view, this will naturally sit under the text in col 1 because of the order. */}
          <div className="order-3 lg:col-start-1 lg:row-start-2 mt-2 lg:mt-[-40px]">
            <div className="grid grid-cols-3 gap-3">
              <FeatureCard icon={<Leaf size={20} />} title="Authentic" subtitle="Kerala Taste" />
              <FeatureCard icon={<UtensilsCrossed size={20} />} title="Fresh" subtitle="Ingredients" />
              <FeatureCard icon={<Heart size={20} />} title="Made with" subtitle="Love" />
              <FeatureCard icon={<ShieldCheck size={20} />} title="Hygienic" subtitle="Kitchen" />
              <FeatureCard icon={<Award size={20} />} title="Premium" subtitle="Quality" />

              {/* Since Badge */}
              <div className="bg-gradient-to-br from-[#101d15] to-[#08110c] border border-[#c5a059]/20 rounded-2xl p-3 flex items-center justify-center relative overflow-hidden">
                <div className="w-16 h-16 rounded-full border border-[#c5a059] flex flex-col items-center justify-center relative">
                  <div className="absolute inset-1 border border-dashed border-[#c5a059]/40 rounded-full animate-spin [animation-duration:20s]"></div>
                  <span className="text-[#c5a059] text-[7px] uppercase tracking-[0.25em]">Since</span>
                  <span className="text-[#c5a059] text-lg font-bold">2015</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, subtitle }) {
  return (
    <div className="bg-gradient-to-br from-[#101d15] to-[#08110c] border border-white/5 rounded-2xl p-3 text-center flex flex-col items-center justify-center">
      <div className="text-[#c5a059] mb-2">{icon}</div>
      <h4 className="text-white text-[9px] uppercase tracking-[0.15em] leading-4 font-semibold">{title}</h4>
      <p className="text-gray-400 text-[8px] mt-1 leading-4">{subtitle}</p>
    </div>
  );
}