import { useState } from "react";

const foodImage =
  "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1200&auto=format&fit=crop";

const services = [
  {
    title: "Corporate\nCatering",
    icon: (
      <svg viewBox="0 0 40 40" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="12" r="5" stroke="#C9A84C" strokeWidth="1.8" />
        <path d="M12 30c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M10 18h20" stroke="#C9A84C" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Private\nEvents",
    icon: (
      <svg viewBox="0 0 40 40" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="14" cy="15" r="4" stroke="#C9A84C" strokeWidth="1.8" />
        <circle cx="26" cy="15" r="4" stroke="#C9A84C" strokeWidth="1.8" />
        <path d="M8 30c0-4 3-7 6-7" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M32 30c0-4-3-7-6-7" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Birthday\nParties",
    icon: (
      <svg viewBox="0 0 40 40" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="18" width="24" height="12" rx="2" stroke="#C9A84C" strokeWidth="1.8" />
        <path d="M14 18v-4" stroke="#C9A84C" strokeWidth="1.8" />
        <path d="M20 18v-4" stroke="#C9A84C" strokeWidth="1.8" />
        <path d="M26 18v-4" stroke="#C9A84C" strokeWidth="1.8" />
        <circle cx="14" cy="12" r="1.5" fill="#C9A84C" />
        <circle cx="20" cy="12" r="1.5" fill="#C9A84C" />
        <circle cx="26" cy="12" r="1.5" fill="#C9A84C" />
      </svg>
    ),
  },
  {
    title: "Weddings\n& More",
    icon: (
      <svg viewBox="0 0 40 40" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="15" cy="20" r="6" stroke="#C9A84C" strokeWidth="1.8" />
        <circle cx="25" cy="20" r="6" stroke="#C9A84C" strokeWidth="1.8" />
      </svg>
    ),
  },
];

export default function CateringPage() {
  const [pressed, setPressed] = useState(false);

  const EnquireBtn = ({ className = "" }) => (
    <button
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      className={`bg-[#D2A74B] text-[#111] font-bold uppercase tracking-widest
        rounded-xl transition-transform duration-100
        shadow-[0_4px_28px_rgba(210,167,75,0.45)]
        ${pressed ? "scale-95 brightness-90" : ""}
        ${className}`}
    >
      Enquire Now
    </button>
  );

  return (
    <div className="bg-[#05110a] text-white min-h-screen">

      {/* ═══════════════ MOBILE (below lg) ═══════════════
            Total visible area = 100svh - top navbar (~56px) - bottom navbar (~70px)
            We set exact height so nothing overflows and no scroll ever happens.
      ══════════════════════════════════════════════════ */}
      <div
        className="flex lg:hidden flex-col overflow-hidden"
        style={{ height: "calc(100svh - 56px - 70px)" }}
      >
        {/* Ambient glow */}
        <div className="absolute top-0 left-0 w-[200px] h-[200px] bg-[#c9a84c]/8 blur-[80px] rounded-full pointer-events-none z-0" />

        {/* Top text — no top padding, header is right above */}
        <div className="flex-shrink-0 pt-[2vh] px-6 text-center z-10">
          <h1 className="text-[#D2A74B] font-serif text-[6.5vw] font-bold uppercase tracking-[0.12em] leading-none whitespace-nowrap">
            Catering &amp; Events
          </h1>
          <h2 className="text-white font-serif text-[3.8vw] mt-[0.6vh] font-semibold tracking-wide leading-none">
            For Every Occasion
          </h2>
          <p className="text-[#cccccc] text-[2.8vw] leading-[1.6] mt-[1vh]">
            From small gatherings to corporate events,<br />
            we serve authentic Kerala flavours<br />
            that leave a lasting impression.
          </p>
        </div>

        {/* Service icons */}
        <div className="flex-shrink-0 grid grid-cols-4 px-3 mt-[1.5vh] z-10">
          {services.map((s, i) => (
            <div key={i} className={`flex flex-col items-center text-center py-1 ${i < 3 ? "border-r border-white/10" : ""}`}>
              <div className="flex items-center justify-center mb-[0.5vh]">
                {s.icon}
              </div>
              <span className="text-white text-[2.5vw] leading-[1.35] whitespace-pre-line">
                {s.title}
              </span>
            </div>
          ))}
        </div>

        {/* Image — flex-1 fills every remaining pixel */}
        <div className="relative flex-1 min-h-0 mt-[1.5vh]">
          <div className="absolute inset-0 overflow-hidden">
            <img src={foodImage} alt="Catering" className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
          </div>
          {/* Button sits inside image area, clear of bottom edge */}
          <div className="absolute bottom-5 left-5 z-10">
            <EnquireBtn className="text-[3.2vw] px-7 py-3" />
          </div>
        </div>
      </div>

      {/* ═══════════════ DESKTOP (lg and above) ═══════════════ */}
      <div className="hidden lg:flex min-h-screen items-center justify-center px-10 xl:px-20 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-14 items-center w-full py-16">

          {/* LEFT — text content */}
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-[1px] bg-[#c9a84c]" />
              <span className="text-[#c9a84c] uppercase tracking-[0.3em] text-[10px]">
                LeKochi Catering
              </span>
            </div>

            <h1 className="text-white font-serif text-5xl xl:text-[56px] font-bold leading-tight">
              Catering &amp;{" "}
              <span className="text-[#D2A74B]">Events</span>
            </h1>
            <h2 className="text-[#D2A74B] font-serif text-2xl mt-2 font-medium tracking-wide">
              For Every Occasion
            </h2>

            <p className="text-[#cccccc] text-base leading-[1.8] mt-6 max-w-md">
              From intimate gatherings to grand corporate events, we bring
              authentic Kerala flavours to every table — crafted with
              tradition, warmth, and a passion for unforgettable dining.
            </p>

            {/* Service cards */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {services.map((s, i) => (
                <div key={i} className="flex items-center gap-4 bg-white/3 border border-white/5 rounded-2xl px-4 py-3">
                  <div className="w-12 h-12 rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/8 flex items-center justify-center flex-shrink-0">
                    {s.icon}
                  </div>
                  <span className="text-white text-sm leading-snug whitespace-pre-line font-light tracking-wide">
                    {s.title}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8">
              <EnquireBtn className="text-sm px-10 py-4" />
            </div>
          </div>

          {/* RIGHT — image */}
          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
            <img
              src={foodImage}
              alt="Catering Setup"
              className="w-full h-[70vh] object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            {/* Floating tag */}
            <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 max-w-[200px]">
              <p className="text-[#c9a84c] text-[9px] uppercase tracking-[0.25em] mb-1">
                LeKochi Signature
              </p>
              <p className="text-white text-sm font-serif leading-snug">
                Authentic flavours, every occasion.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Desktop ambient glow */}
      <div className="hidden lg:block absolute top-0 left-0 w-[400px] h-[400px] bg-[#c9a84c]/5 blur-[120px] rounded-full pointer-events-none" />
    </div>
  );
}