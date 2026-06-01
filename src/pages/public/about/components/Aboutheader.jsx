import React from "react";
import { UtensilsCrossed, Heart, Award } from "lucide-react";
import { LuSprout } from "react-icons/lu";
import { FaKitchenSet } from "react-icons/fa6";

export default function AboutHeader() {
  return (
<section className="bg-[#05110a] relative overflow-hidden font-sans">
      {/* Background Glow Elements */}
      <div className="absolute top-[-180px] left-[-180px] w-[400px] h-[400px] bg-[#c5a059]/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-180px] right-[-180px] w-[400px] h-[400px] bg-[#c5a059]/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Main Container */}
<div className="relative max-w-7xl mx-auto w-full px-4 lg:px-10 py-3 lg:py-20">
        {/* ───────────────── DESKTOP LAYOUT (lg and up) ───────────────── */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-12 xl:gap-16 items-center w-full">

          {/* LEFT COLUMN: TEXT CONTENT (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
<div className="flex items-center gap-3 mb-5">
  <div className="w-12 h-[1px] bg-[#c5a059]"></div>
  <span className="text-[#c5a059] uppercase tracking-[0.3em] text-[11px] font-bold">
    About LeKochi Café & Kitchen
  </span>
</div>

<h1 className="text-4xl xl:text-[52px] leading-[1.15] font-black tracking-tight text-white">
  Small Space. <br />
  <span className="text-[#c5a059]">Big Flavours.</span>
</h1>

<div className="mt-6 space-y-4 text-[#d4d4d4] text-sm xl:text-base leading-relaxed max-w-2xl">
  <p>
    Welcome to LeKochi, a name loved by food lovers since 2015.
    For nearly a decade, we have proudly served the authentic
    flavours of Kerala and South India, combining tradition,
    passion, and creativity in every dish we prepare.
  </p>

  <p>
    Today, LeKochi is evolving into a modern Café & Kitchen
    concept — a cozy space with limited seating, handcrafted
    flavours, and a warm contemporary atmosphere designed for
    relaxed dining and memorable experiences.
  </p>

  <p>
    Blending deep Kerala roots with a cute modern café culture,
    we bring you signature dosas, comforting curries, fresh
    snacks, chai, and South Indian favourites prepared fresh
    every day with quality ingredients and genuine hospitality.
  </p>

  <p>
    More than a restaurant, LeKochi is a new rhythm of Kerala
    flavours — where tradition meets modern comfort, creating
    an experience that feels both familiar and exciting.
  </p>
</div>

            {/* Balanced 3-Column Desktop Feature Grid */}
            <div className="grid grid-cols-3 gap-4 mt-8 max-w-2xl">
              <FeatureCard
                icon={<LuSprout size={22} />}
                title="Authentic"
                subtitle="Kerala Taste"
              />
              <FeatureCard
                icon={<UtensilsCrossed size={21} />}
                title="Fresh"
                subtitle="Ingredients"
              />
              <FeatureCard
                icon={<Heart size={21} />}
                title="Made with"
                subtitle="Love"
              />
              <FeatureCard
                icon={<FaKitchenSet size={22} />}
                title="Hygienic"
                subtitle="Kitchen"
              />
              <FeatureCard
                icon={<Award size={22} />}
                title="Premium"
                subtitle="Quality"
              />
              <SinceBadge />
            </div>
          </div>

          {/* RIGHT COLUMN: HERO IMAGE (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center xl:justify-end">
            <div className="relative rounded-[28px] overflow-hidden border border-white/10 w-full max-w-[420px] shadow-2xl group">
              <img
                src="https://i.pinimg.com/1200x/77/9f/08/779f0805eccc45883849c7f99e04c67c.jpg"
                alt="LeKochi Dining Room"
                className="w-full h-[68vh] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>


        {/* ───────────────── MOBILE LAYOUT (Base to md) ───────────────── */}
<div className="flex lg:hidden flex-col w-full py-1 overflow-hidden">
          {/* Mobile Header Titles */}
          <div className="text-center mb-5">
            <span className="text-[#c5a059] uppercase tracking-[0.25em] text-[10px]  block mb-1">
              Welcome To LeKochi
            </span>
<h1 className="text-2xl sm:text-2xl font-default text-white">
  ABOUT US
</h1>
            <div className="w-16 h-[1.5px] bg-[#c5a059] mx-auto mt-2.5"></div>
          </div>

          {/* Mobile Expanded Text Blocks */}
<div className="text-[#d4d4d4] text-[12px] sm:text-sm leading-relaxed mb-5 space-y-2.5 text-left px-1 max-w-xl mx-auto">
  <p>
    Welcome to LeKochi, a name loved by food lovers since 2015.
    For nearly 10 years, we have been serving authentic Kerala
    and South Indian flavours with passion, tradition, and creativity.
  </p>

  <p>
    Today, LeKochi is evolving into a modern Café & Kitchen —
    a cozy space with limited seating, handcrafted flavours,
    and a warm contemporary vibe designed for everyday comfort.
  </p>

  <p>
    Blending Kerala roots with a modern café experience,
    we serve signature dosas, snacks, chai, curries,
    and comforting favourites made fresh every day.
  </p>

  <p className="text-[#c5a059] font-medium">
    Small space. Big flavours. A new rhythm of Kerala flavours.
  </p>
</div>

          {/* Mobile Visual Banner Image */}
          <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl w-full max-w-xl mx-auto mb-3">
            <img
              src="https://i.pinimg.com/1200x/77/9f/08/779f0805eccc45883849c7f99e04c67c.jpg"
              alt="Restaurant"
              className="w-full h-[160px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05110a] via-transparent to-transparent"></div>
          </div>

          {/* Grid Layout Container - Safe alignment framework with zero overlapping components */}
          <div className="relative grid grid-cols-3 gap-2 max-w-xl w-full mx-auto pt-2">
            
            {/* Structural Column Layout Items */}
            <MobileFeatureCard
              icon={<LuSprout size={18} />}
              title="Authentic"
              subtitle="Kerala Taste"
            />
            <MobileFeatureCard
              icon={<UtensilsCrossed size={17} />}
              title="Fresh"
              subtitle="Ingredients"
            />
            <MobileFeatureCard
              icon={<Heart size={17} />}
              title="Made with"
              subtitle="Love"
            />
            <MobileFeatureCard
              icon={<FaKitchenSet size={18} />}
              title="Hygienic"
              subtitle="Kitchen"
            />
            <MobileFeatureCard
              icon={<Award size={18} />}
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

/* ───────────────── DESKTOP FEATURE CARD SUB-COMPONENT ───────────────── */
function FeatureCard({ icon, title, subtitle }) {
  return (
    <div className="bg-gradient-to-br from-[#101d15] to-[#08110c] border border-emerald-900/20 rounded-xl p-3.5 text-center flex flex-col items-center justify-center transition-all duration-300 hover:border-[#c5a059]/30">
      <div className="text-[#c5a059] mb-2">
        {icon}
      </div>
      <h4 className="text-white text-[11px] font-bold uppercase tracking-[0.12em] leading-tight">
        {title}
      </h4>
      <p className="text-gray-400 text-[10px] mt-1 leading-snug">
        {subtitle}
      </p>
    </div>
  );
}

/* ───────────────── MOBILE FEATURE CARD SUB-COMPONENT ───────────────── */
function MobileFeatureCard({ icon, title, subtitle }) {
  return (
    <div className="bg-emerald-950/20 border border-emerald-900/10 rounded-lg flex flex-col items-center justify-center py-2.5 px-1 text-center shadow-sm">
      <div className="text-[#c5a059] mb-1.5">
        {icon}
      </div>
      <h4 className="text-white text-[10px] font-bold tracking-wide leading-tight">
        {title}
      </h4>
      <p className="text-gray-400 text-[8px] mt-0.5 leading-none">
        {subtitle}
      </p>
    </div>
  );
}

/* ───────────────── SINCE BADGE SUB-COMPONENT ───────────────── */
function SinceBadge() {
  return (
    <div className="bg-gradient-to-br from-[#101d15] to-[#08110c] border border-emerald-900/20 rounded-xl lg:p-3.5 flex items-center justify-center transition-all duration-300 hover:border-[#c5a059]/30 shadow-sm">
      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#c5a059] flex flex-col items-center justify-center relative">
        {/* Animated Dash Accents */}
        <div className="absolute inset-0.5 border border-dashed border-[#c5a059]/30 rounded-full animate-spin [animation-duration:25s]"></div>
        <span className="text-[#c5a059] text-[6px] uppercase tracking-[0.1em] font-medium">
          Since
        </span>
        <span className="text-[#c5a059] text-[11px] font-black tracking-wide">
          2015
        </span>
      </div>
    </div>
  );
}