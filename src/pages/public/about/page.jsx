import React from "react";
import { UtensilsCrossed, Heart, Award } from "lucide-react";
import { LuSprout } from "react-icons/lu";
import { FaKitchenSet } from "react-icons/fa6";

export default function AboutHeader() {
  return (
  <section className="min-h-screen bg-[#05110a] relative flex items-center overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-[-180px] left-[-180px] w-[400px] h-[400px] bg-[#c5a059]/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="absolute bottom-[-180px] right-[-180px] w-[400px] h-[400px] bg-[#c5a059]/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Main Wrapper */}
     <div className="relative max-w-7xl mx-auto w-full px-5 lg:px-10 flex items-center">

        {/* ───────────────── DESKTOP LAYOUT ───────────────── */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-10 items-center w-full">

          {/* LEFT CONTENT */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-[1px] bg-[#c5a059]"></div>

              <span className="text-[#c5a059] uppercase tracking-[0.3em] text-[10px]">
                Welcome To LeKochi
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl xl:text-[58px] leading-tight font-serif text-white">
              Authentic Kerala
              <span className="block text-[#c5a059]">
                Dining Experience
              </span>
            </h1>

            <div className="mt-6 space-y-4 text-[#d4d4d4] text-sm md:text-base leading-7 max-w-xl">
              <p>
                At LeKochi Café & Kitchen, every dish tells a story rooted in Kerala tradition, crafted with authentic spices and fresh local ingredients.
              </p>

              <p>
                Since 2015, we have created unforgettable dining moments with rich flavours, warm hospitality, and a modern South Indian culinary experience.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-8">

              <FeatureCard
                icon={<LuSprout size={20} />}
                title="Authentic"
                subtitle="Kerala Taste"
              />

              <FeatureCard
                icon={<UtensilsCrossed size={20} />}
                title="Fresh"
                subtitle="Ingredients"
              />

              <FeatureCard
                icon={<Heart size={20} />}
                title="Made with"
                subtitle="Love"
              />

              <FeatureCard
                icon={<FaKitchenSet size={22} />}
                title="Hygienic"
                subtitle="Kitchen"
              />

              <FeatureCard
                icon={<Award size={20} />}
                title="Premium"
                subtitle="Quality"
              />

              <SinceBadge />
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center">

            <div className="relative rounded-[28px] overflow-hidden border border-white/10 w-full max-w-[520px]">

              <img
                src="https://i.pinimg.com/1200x/77/9f/08/779f0805eccc45883849c7f99e04c67c.jpg"
                alt="Restaurant"
                className="w-full h-[72vh] object-cover"
              />
            </div>
          </div>
        </div>

        {/* ───────────────── MOBILE LAYOUT ───────────────── */}
   <div className="flex lg:hidden flex-col  min-h-[100svh] justify-center py-3 overflow-x-hidden">

          {/* Title */}
          <div className="text-center mb-2">

            <h1 className="text-[#c5a059] font-serif text-2xl tracking-widest">
              ABOUT US
            </h1>

            <p className="text-white font-serif text-sm mt-0.5 tracking-widest opacity-80">
              Our Story
            </p>
          </div>

          {/* Body Text */}
          <div className="text-[#d4d4d4] text-[11px] leading-4 mb-3 space-y-1 text-left px-2">

            <p>
              LeKochi Café & Kitchen started with a passion to bring authentic Kerala flavours to Brampton.
            </p>

            <p>
              Since 2015, we have been serving fresh, delicious and memorable dining experiences.
            </p>
          </div>

          {/* Mobile Image */}
          <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl w-full mb-3">

            <img
              src="https://i.pinimg.com/1200x/77/9f/08/779f0805eccc45883849c7f99e04c67c.jpg"
              alt="Restaurant"
              className="w-full h-[145px] object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>

          {/* Feature Grid */}
          <div className="relative grid grid-cols-3 gap-y-1">

            {/* Vertical Dividers */}
            <div className="absolute left-1/3 top-2 bottom-2 w-[1px] bg-[#c5a059]/20"></div>

            <div className="absolute left-2/3 top-2 bottom-2 w-[1px] bg-[#c5a059]/20"></div>

            <MobileFeatureCard
              icon={<LuSprout size={20} />}
              title="Authentic"
              subtitle="Kerala Taste"
            />

            <MobileFeatureCard
              icon={<UtensilsCrossed size={20} />}
              title="Fresh"
              subtitle="Ingredients"
            />

            <MobileFeatureCard
              icon={<Heart size={20} />}
              title="Made with"
              subtitle="Love"
            />

            <MobileFeatureCard
              icon={<FaKitchenSet size={20} />}
              title="Hygienic"
              subtitle="Kitchen"
            />

            <MobileFeatureCard
              icon={<Award size={20} />}
              title="Premium"
              subtitle="Quality"
            />

            <SinceBadge />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────── MOBILE FEATURE CARD ───────────────── */
function MobileFeatureCard({ icon, title, subtitle }) {
  return (
    <div className="flex flex-col items-center justify-center py-2 px-1 text-center">

      <div className="text-[#c5a059] mb-1">
        {icon}
      </div>

      <h4 className="text-white text-[10px] font-serif leading-tight">
        {title}
      </h4>

      <p className="text-white text-[8px] mt-0.5 leading-tight">
        {subtitle}
      </p>
    </div>
  );
}

/* ───────────────── SINCE BADGE ───────────────── */
function SinceBadge() {
  return (
    <div className="flex items-center justify-center lg:bg-gradient-to-br lg:from-[#101d15] lg:to-[#08110c] lg:border lg:border-[#c5a059]/20 lg:rounded-2xl lg:p-3">

      <div className="w-12 h-12 rounded-full border border-[#c5a059] flex flex-col items-center justify-center relative scale-90 lg:scale-100">

        <div className="absolute inset-1 border border-dashed border-[#c5a059]/40 rounded-full animate-spin [animation-duration:20s]"></div>

        <span className="text-[#c5a059] text-[6px] uppercase tracking-[0.1em]">
          Since
        </span>

        <span className="text-[#c5a059] text-xs font-bold font-serif">
          2015
        </span>
      </div>
    </div>
  );
}

/* ───────────────── DESKTOP FEATURE CARD ───────────────── */
function FeatureCard({ icon, title, subtitle }) {
  return (
    <div className="bg-gradient-to-br from-[#101d15] to-[#08110c] border border-white/3 rounded-2xl p-3 text-center">

      <div className="text-[#c5a059] flex justify-center mb-2">
        {icon}
      </div>

      <h4 className="text-white text-[10px] uppercase tracking-[0.15em] leading-4">
        {title}
      </h4>

      <p className="text-gray-400 text-[10px] mt-1 leading-4">
        {subtitle}
      </p>
    </div>
  );
}